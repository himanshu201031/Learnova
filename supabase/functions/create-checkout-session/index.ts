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

const corsHeaders = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
    // Handle CORS preflight requests
    if (req.method === 'OPTIONS') {
        return new Response('ok', { headers: corsHeaders });
    }

    try {
        const { courseId, userId } = await req.json();

        if (!courseId || !userId) {
            throw new Error('Missing required parameters');
        }

        // Get course details
        const { data: course, error: courseError } = await supabase
            .from('courses')
            .select('id, title, price, stripe_price_id')
            .eq('id', courseId)
            .single();

        if (courseError || !course) {
            throw new Error('Course not found');
        }

        // Check if user is already enrolled
        const { data: existingEnrollment } = await supabase
            .from('enrollments')
            .select('id')
            .eq('user_id', userId)
            .eq('course_id', courseId)
            .single();

        if (existingEnrollment) {
            throw new Error('User already enrolled in this course');
        }

        const lineItem: Stripe.Checkout.SessionCreateParams.LineItem = course.stripe_price_id
            ? { price: course.stripe_price_id, quantity: 1 }
            : {
                price_data: {
                    currency: 'usd',
                    product_data: {
                        name: course.title,
                        description: `Enrollment for ${course.title}`,
                    },
                    unit_amount: Math.round(course.price * 100),
                },
                quantity: 1,
            };

        // Create Stripe Checkout session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [lineItem],
            mode: 'payment',
            success_url: `${req.headers.get('origin')}/courses/${courseId}?success=true`,
            cancel_url: `${req.headers.get('origin')}/courses/${courseId}?canceled=true`,
            metadata: {
                courseId,
                userId,
            },
        });

        // Create pending payment record
        await supabase.from('payments').insert([
            {
                user_id: userId,
                course_id: courseId,
                stripe_session_id: session.id,
                amount: course.price,
                currency: 'USD',
                status: 'pending',
            },
        ]);

        return new Response(
            JSON.stringify({ sessionId: session.id, url: session.url }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 200,
            }
        );
    } catch (error) {
        return new Response(
            JSON.stringify({ error: error.message }),
            {
                headers: { ...corsHeaders, 'Content-Type': 'application/json' },
                status: 400,
            }
        );
    }
});
