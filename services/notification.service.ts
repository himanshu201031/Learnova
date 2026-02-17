import { supabase, handleSupabaseError } from '../lib/supabase';

/**
 * Notification Service
 * Handles user notifications
 */
export const notificationService = {
    /**
     * Get user notifications
     */
    async getNotifications(userId: string, filters?: { unreadOnly?: boolean; limit?: number }) {
        try {
            let query = supabase
                .from('notifications')
                .select('*')
                .eq('user_id', userId)
                .order('created_at', { ascending: false });

            if (filters?.unreadOnly) {
                query = query.eq('read', false);
            }

            if (filters?.limit) {
                query = query.limit(filters.limit);
            }

            const { data, error } = await query;

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get unread notification count
     */
    async getUnreadCount(userId: string) {
        try {
            const { count, error } = await supabase
                .from('notifications')
                .select('*', { count: 'exact', head: true })
                .eq('user_id', userId)
                .eq('read', false);

            if (error) throw error;
            return { data: count || 0, error: null };
        } catch (error) {
            return { data: 0, error: handleSupabaseError(error) };
        }
    },

    /**
     * Mark notification as read
     */
    async markAsRead(notificationId: string) {
        try {
            const { data, error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('id', notificationId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Mark all notifications as read
     */
    async markAllAsRead(userId: string) {
        try {
            const { error } = await supabase
                .from('notifications')
                .update({ read: true })
                .eq('user_id', userId)
                .eq('read', false);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Delete a notification
     */
    async deleteNotification(notificationId: string) {
        try {
            const { error } = await supabase
                .from('notifications')
                .delete()
                .eq('id', notificationId);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Delete all notifications for a user
     */
    async deleteAllNotifications(userId: string) {
        try {
            const { error } = await supabase
                .from('notifications')
                .delete()
                .eq('user_id', userId);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Subscribe to new notifications in realtime
     */
    subscribeToNotifications(userId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`notifications:${userId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'notifications',
                filter: `user_id=eq.${userId}`,
            }, callback)
            .subscribe();
    },
};
