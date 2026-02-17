import { serve } from 'https://deno.land/std@0.168.0/http/server.ts';
import Stripe from 'https://esm.sh/stripe@14.14.0?target=deno';
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const stripe = new Stripe(Deno.env.get('STRIPE_SECRET_KEY') || '', {
    apiVersion: '2023-10-16',
    httpClient: Stripe.createFetchHttpClient(),
});

const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
const supabaseServiceKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
const supabase = createClient(supabaseUrl, supabaseServiceKey);

const webhookSecret = Deno.env.get('STRIPE_WEBHOOK_SECRET')!;

serve(async (req) => {
    const signature = req.headers.get('stripe-signature');

    if (!signature) {
        return new Response('No signature', { status: 400 });
    }

    try {
        const body = await req.text();
        const event = stripe.webhooks.constructEvent(body, signature, webhookSecret);

        console.log('Webhook event:', event.type);

        switch (event.type) {
            case 'checkout.session.completed': {
                const session = event.data.object as Stripe.Checkout.Session;
                const { courseId, userId } = session.metadata || {};

                if (!courseId || !userId) {
                    throw new Error('Missing metadata');
                }

                // Update payment status
                await supabase
                    .from('payments')
                    .update({ status: 'completed' })
                    .eq('stripe_session_id', session.id);

                // Create enrollment
                await supabase.from('enrollments').insert([
                    {
                        user_id: userId,
                        course_id: courseId,
                        progress_percentage: 0,
                    },
                ]);

                // Create notification
                await supabase.from('notifications').insert([
                    {
                        user_id: userId,
                        title: 'Course Enrollment Successful',
                        message: 'You have successfully enrolled in the course!',
                        read: false,
                    },
                ]);

                console.log(`Enrollment created for user ${userId} in course ${courseId}`);
                break;
            }

            case 'checkout.session.expired': {
                const session = event.data.object as Stripe.Checkout.Session;

                // Update payment status to failed
                await supabase
                    .from('payments')
                    .update({ status: 'failed' })
                    .eq('stripe_session_id', session.id);

                console.log(`Checkout session expired: ${session.id}`);
                break;
            }

            case 'charge.refunded': {
                const charge = event.data.object as Stripe.Charge;
                const paymentIntent = charge.payment_intent as string;

                // Find payment by stripe session
                const { data: payment } = await supabase
                    .from('payments')
                    .select('id, user_id, course_id')
                    .eq('stripe_session_id', paymentIntent)
                    .single();

                if (payment) {
                    // Update payment status
                    await supabase
                        .from('payments')
                        .update({ status: 'refunded' })
                        .eq('id', payment.id);

                    // Remove enrollment
                    await supabase
                        .from('enrollments')
                        .delete()
                        .eq('user_id', payment.user_id)
                        .eq('course_id', payment.course_id);

                    // Create notification
                    await supabase.from('notifications').insert([
                        {
                            user_id: payment.user_id,
                            title: 'Payment Refunded',
                            message: 'Your payment has been refunded and enrollment removed.',
                            read: false,
                        },
                    ]);

                    console.log(`Refund processed for payment ${payment.id}`);
                }
                break;
            }

            default:
                console.log(`Unhandled event type: ${event.type}`);
        }

        return new Response(JSON.stringify({ received: true }), {
            headers: { 'Content-Type': 'application/json' },
            status: 200,
        });
    } catch (error) {
        console.error('Webhook error:', error);
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { 'Content-Type': 'application/json' },
                status: 400,
            }
        );
    }
});
