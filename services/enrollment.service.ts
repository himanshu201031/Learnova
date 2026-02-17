import { supabase, handleSupabaseError } from '../lib/supabase';

/**
 * Enrollment Service
 * Handles course enrollments and progress tracking
 */
export const enrollmentService = {
    /**
     * Enroll user in a course
     */
    async enrollInCourse(courseId: string) {
        try {
            const { data: { user } } = await supabase.auth.getUser();

            if (!user) {
                throw new Error('User not authenticated');
            }

            const { data, error } = await supabase
                .from('enrollments')
                .insert([
                    {
                        user_id: user.id,
                        course_id: courseId,
                        progress_percentage: 0,
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
     * Get user's enrollments
     */
    async getUserEnrollments(userId: string) {
        try {
            const { data, error } = await supabase
                .from('enrollments')
                .select(`
          *,
          course:courses(
            id,
            title,
            slug,
            description,
            thumbnail_url,
            level,
            category,
            instructor:profiles!instructor_id(
              id,
              full_name,
              avatar_url
            )
          )
        `)
                .eq('user_id', userId)
                .order('enrolled_at', { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Check if user is enrolled in a course
     */
    async isEnrolled(userId: string, courseId: string) {
        try {
            const { data, error } = await supabase
                .from('enrollments')
                .select('id')
                .eq('user_id', userId)
                .eq('course_id', courseId)
                .single();

            if (error && error.code !== 'PGRST116') throw error; // PGRST116 = no rows returned
            return { data: !!data, error: null };
        } catch (error) {
            return { data: false, error: handleSupabaseError(error) };
        }
    },

    /**
     * Update enrollment progress
     */
    async updateProgress(enrollmentId: string, progressPercentage: number) {
        try {
            const updates: any = { progress_percentage: progressPercentage };

            // If 100% complete, set completed_at
            if (progressPercentage >= 100) {
                updates.completed_at = new Date().toISOString();
            }

            const { data, error } = await supabase
                .from('enrollments')
                .update(updates)
                .eq('id', enrollmentId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get lesson progress for a user
     */
    async getLessonProgress(userId: string, lessonId: string) {
        try {
            const { data, error } = await supabase
                .from('lesson_progress')
                .select('*')
                .eq('user_id', userId)
                .eq('lesson_id', lessonId)
                .single();

            if (error && error.code !== 'PGRST116') throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Update lesson progress
     */
    async updateLessonProgress(
        userId: string,
        lessonId: string,
        progress: {
            completed?: boolean;
            watched_duration?: number;
            notes?: string;
        }
    ) {
        try {
            const { data, error } = await supabase
                .from('lesson_progress')
                .upsert(
                    {
                        user_id: userId,
                        lesson_id: lessonId,
                        ...progress,
                        last_watched_at: new Date().toISOString(),
                    },
                    {
                        onConflict: 'user_id,lesson_id',
                    }
                )
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get all lesson progress for a course
     */
    async getCourseProgress(userId: string, courseId: string) {
        try {
            const { data, error } = await supabase
                .from('lesson_progress')
                .select(`
          *,
          lesson:lessons!inner(
            id,
            course_id,
            title,
            lesson_order
          )
        `)
                .eq('user_id', userId)
                .eq('lesson.course_id', courseId);

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Calculate course completion percentage
     */
    async calculateCourseCompletion(userId: string, courseId: string) {
        try {
            // Get total lessons in course
            const { data: lessons, error: lessonsError } = await supabase
                .from('lessons')
                .select('id')
                .eq('course_id', courseId);

            if (lessonsError) throw lessonsError;

            const totalLessons = lessons?.length || 0;
            if (totalLessons === 0) return { data: 0, error: null };

            // Get completed lessons
            const { data: progress, error: progressError } = await supabase
                .from('lesson_progress')
                .select('id')
                .eq('user_id', userId)
                .eq('completed', true)
                .in('lesson_id', lessons.map(l => l.id));

            if (progressError) throw progressError;

            const completedLessons = progress?.length || 0;
            const percentage = Math.round((completedLessons / totalLessons) * 100);

            return { data: percentage, error: null };
        } catch (error) {
            return { data: 0, error: handleSupabaseError(error) };
        }
    },
};
