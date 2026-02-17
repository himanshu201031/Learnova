import { supabase, handleSupabaseError } from '../lib/supabase';

/**
 * Community Service
 * Handles forum posts and comments
 */
export const communityService = {
    /**
     * Get all forum posts
     */
    async getForumPosts(filters?: { courseId?: string; limit?: number; offset?: number }) {
        try {
            let query = supabase
                .from('forum_posts')
                .select(`
          *,
          user:profiles!user_id(
            id,
            full_name,
            avatar_url
          ),
          course:courses(
            id,
            title,
            slug
          )
        `)
                .order('created_at', { ascending: false });

            if (filters?.courseId) {
                query = query.eq('course_id', filters.courseId);
            }

            if (filters?.limit) {
                query = query.limit(filters.limit);
            }

            if (filters?.offset) {
                query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
            }

            const { data, error } = await query;

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get a single forum post with comments
     */
    async getForumPost(postId: string) {
        try {
            const { data, error } = await supabase
                .from('forum_posts')
                .select(`
          *,
          user:profiles!user_id(
            id,
            full_name,
            avatar_url
          ),
          course:courses(
            id,
            title,
            slug
          )
        `)
                .eq('id', postId)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Create a new forum post
     */
    async createForumPost(postData: {
        title: string;
        content: string;
        course_id?: string;
    }) {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('forum_posts')
                .insert([
                    {
                        ...postData,
                        user_id: user.id,
                    },
                ])
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Update a forum post
     */
    async updateForumPost(postId: string, updates: { title?: string; content?: string }) {
        try {
            const { data, error } = await supabase
                .from('forum_posts')
                .update(updates)
                .eq('id', postId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Delete a forum post
     */
    async deleteForumPost(postId: string) {
        try {
            const { error } = await supabase
                .from('forum_posts')
                .delete()
                .eq('id', postId);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Upvote a forum post
     */
    async upvotePost(postId: string) {
        try {
            const { data, error } = await supabase.rpc('increment_post_upvotes', {
                post_id: postId,
            });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get comments for a post
     */
    async getPostComments(postId: string) {
        try {
            const { data, error } = await supabase
                .from('forum_comments')
                .select(`
          *,
          user:profiles!user_id(
            id,
            full_name,
            avatar_url
          )
        `)
                .eq('post_id', postId)
                .order('created_at', { ascending: true });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Create a comment on a post
     */
    async createComment(postId: string, content: string) {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('forum_comments')
                .insert([
                    {
                        post_id: postId,
                        user_id: user.id,
                        content,
                    },
                ])
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Update a comment
     */
    async updateComment(commentId: string, content: string) {
        try {
            const { data, error } = await supabase
                .from('forum_comments')
                .update({ content })
                .eq('id', commentId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Delete a comment
     */
    async deleteComment(commentId: string) {
        try {
            const { error } = await supabase
                .from('forum_comments')
                .delete()
                .eq('id', commentId);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Subscribe to new posts in realtime
     */
    subscribeToNewPosts(callback: (payload: any) => void) {
        return supabase
            .channel('forum_posts')
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'forum_posts',
            }, callback)
            .subscribe();
    },

    /**
     * Subscribe to new comments in realtime
     */
    subscribeToNewComments(postId: string, callback: (payload: any) => void) {
        return supabase
            .channel(`forum_comments:${postId}`)
            .on('postgres_changes', {
                event: 'INSERT',
                schema: 'public',
                table: 'forum_comments',
                filter: `post_id=eq.${postId}`,
            }, callback)
            .subscribe();
    },
};
