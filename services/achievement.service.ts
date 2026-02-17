import { supabase, handleSupabaseError } from '../lib/supabase';

/**
 * Achievement Service
 * Handles gamification and achievements
 */
export const achievementService = {
    /**
     * Get all available achievements
     */
    async getAllAchievements() {
        try {
            const { data, error } = await supabase
                .from('achievements')
                .select('*')
                .order('xp_reward', { ascending: true });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get user's earned achievements
     */
    async getUserAchievements(userId: string) {
        try {
            const { data, error } = await supabase
                .from('user_achievements')
                .select(`
          *,
          achievement:achievements(
            id,
            name,
            description,
            xp_reward
          )
        `)
                .eq('user_id', userId)
                .order('earned_at', { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Award achievement to user
     */
    async awardAchievement(userId: string, achievementId: string) {
        try {
            const { data, error } = await supabase
                .from('user_achievements')
                .insert([
                    {
                        user_id: userId,
                        achievement_id: achievementId,
                    },
                ])
                .select(`
          *,
          achievement:achievements(*)
        `)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Check if user has achievement
     */
    async hasAchievement(userId: string, achievementId: string) {
        try {
            const { data, error } = await supabase
                .from('user_achievements')
                .select('id')
                .eq('user_id', userId)
                .eq('achievement_id', achievementId)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return { data: !!data, error: null };
        } catch (error) {
            return { data: false, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get user's total XP
     */
    async getUserTotalXP(userId: string) {
        try {
            const { data, error } = await supabase
                .from('user_achievements')
                .select(`
          achievement:achievements(xp_reward)
        `)
                .eq('user_id', userId);

            if (error) throw error;

            const totalXP = data?.reduce((sum, item: any) => {
                return sum + (item.achievement?.xp_reward || 0);
            }, 0) || 0;

            return { data: totalXP, error: null };
        } catch (error) {
            return { data: 0, error: handleSupabaseError(error) };
        }
    },

    /**
     * Check and award achievements based on user activity
     */
    async checkAndAwardAchievements(userId: string) {
        try {
            // Get all achievements
            const { data: allAchievements } = await this.getAllAchievements();
            if (!allAchievements) return { data: [], error: null };

            // Get user's current achievements
            const { data: userAchievements } = await this.getUserAchievements(userId);
            const earnedIds = new Set(userAchievements?.map((ua: any) => ua.achievement_id) || []);

            // Get user stats
            const { data: enrollments } = await supabase
                .from('enrollments')
                .select('*')
                .eq('user_id', userId);

            const completedCourses = enrollments?.filter(e => e.completed_at)?.length || 0;

            const newAchievements = [];

            // Check each achievement
            for (const achievement of allAchievements) {
                if (earnedIds.has(achievement.id)) continue;

                let shouldAward = false;

                // Achievement logic based on name
                if (achievement.name === 'Course Starter' && enrollments && enrollments.length >= 1) {
                    shouldAward = true;
                } else if (achievement.name === 'Dedicated Learner' && completedCourses >= 5) {
                    shouldAward = true;
                } else if (achievement.name === 'Knowledge Seeker' && completedCourses >= 10) {
                    shouldAward = true;
                } else if (achievement.name === 'Master Student' && completedCourses >= 25) {
                    shouldAward = true;
                }

                if (shouldAward) {
                    const { data } = await this.awardAchievement(userId, achievement.id);
                    if (data) newAchievements.push(data);
                }
            }

            return { data: newAchievements, error: null };
        } catch (error) {
            return { data: [], error: handleSupabaseError(error) };
        }
    },
};
