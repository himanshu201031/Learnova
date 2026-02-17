import { supabase, handleSupabaseError } from '../lib/supabase';
import type { User } from '../types';

export interface SignUpData {
    email: string;
    password: string;
    fullName: string;
}

export interface SignInData {
    email: string;
    password: string;
}

/**
 * Authentication Service
 * Handles all authentication-related operations with Supabase
 */
export const authService = {
    /**
     * Sign up a new user
     */
    async signUp({ email, password, fullName }: SignUpData) {
        try {
            const { data, error } = await supabase.auth.signUp({
                email,
                password,
                options: {
                    data: {
                        full_name: fullName,
                    },
                    emailRedirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Sign in an existing user
     */
    async signIn({ email, password }: SignInData) {
        try {
            const { data, error } = await supabase.auth.signInWithPassword({
                email,
                password,
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Sign in with OAuth provider
     */
    async signInWithOAuth(provider: 'google' | 'github') {
        try {
            const { data, error } = await supabase.auth.signInWithOAuth({
                provider,
                options: {
                    redirectTo: `${window.location.origin}/auth/callback`,
                },
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Sign out the current user
     */
    async signOut() {
        try {
            const { error } = await supabase.auth.signOut();
            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Get the current session
     */
    async getSession() {
        try {
            const { data, error } = await supabase.auth.getSession();
            if (error) throw error;
            return { data: data.session, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get the current user
     */
    async getCurrentUser() {
        try {
            const { data, error } = await supabase.auth.getUser();
            if (error) throw error;
            return { data: data.user, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get user profile with role
     */
    async getUserProfile(userId: string): Promise<{ data: User | null; error: string | null }> {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .select('*')
                .eq('id', userId)
                .single();

            if (error) throw error;

            // Get auth user data
            const { data: authUser } = await supabase.auth.getUser();

            const user: User = {
                id: data.id,
                email: authUser.user?.email || '',
                name: data.full_name || '',
                avatar: data.avatar_url,
                role: data.role as 'student' | 'instructor' | 'admin',
                createdAt: new Date(data.created_at),
                emailVerified: authUser.user?.email_confirmed_at ? true : false,
            };

            return { data: user, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Update user profile
     */
    async updateProfile(userId: string, updates: { full_name?: string; avatar_url?: string; bio?: string }) {
        try {
            const { data, error } = await supabase
                .from('profiles')
                .update(updates)
                .eq('id', userId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Reset password
     */
    async resetPassword(email: string) {
        try {
            const { error } = await supabase.auth.resetPasswordForEmail(email, {
                redirectTo: `${window.location.origin}/auth/reset-password`,
            });

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Update password
     */
    async updatePassword(newPassword: string) {
        try {
            const { error } = await supabase.auth.updateUser({
                password: newPassword,
            });

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Listen to auth state changes
     */
    onAuthStateChange(callback: (event: string, session: any) => void) {
        return supabase.auth.onAuthStateChange(callback);
    },
};
