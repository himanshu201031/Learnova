import { supabase } from '../lib/supabase';

/**
 * Payment Service
 * Handles Stripe payment integration
 */
export const paymentService = {
    /**
     * Create a checkout session for course enrollment
     */
    async createCheckoutSession(courseId: string) {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('User not authenticated');
            }

            // Call Supabase Edge Function
            const { data, error } = await supabase.functions.invoke('create-checkout-session', {
                body: {
                    courseId,
                    userId: user.id,
                },
            });

            if (error) throw error;

            return { data, error: null };
        } catch (error: any) {
            console.error('Create checkout session failed:', error);
            return { data: null, error: error.message };
        }
    },

    /**
     * Get user's payment history
     */
    async getPaymentHistory(userId: string) {
        try {
            const { data, error } = await supabase
                .from('payments')
                .select(`
          *,
          course:courses(
            id,
            title,
            thumbnail_url
          )
        `)
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error: any) {
            console.error('Get payment history failed:', error);
            return { data: null, error: error.message };
        }
    },

    /**
     * Get payment by ID
     */
    async getPayment(paymentId: string) {
        try {
            const { data, error } = await supabase
                .from('payments')
                .select(`
          *,
          course:courses(
            id,
            title,
            thumbnail_url
          )
        `)
                .eq('id', paymentId)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error: any) {
            console.error('Get payment failed:', error);
            return { data: null, error: error.message };
        }
    },
};
