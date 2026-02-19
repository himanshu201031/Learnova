import { supabase, handleSupabaseError } from '../lib/supabase';
import type { Course } from '../types';

/**
 * Course Service
 * Handles all course-related operations
 */
export const courseService = {
    /**
     * Get all published courses
     */
    async getCourses(filters?: {
        category?: string;
        level?: string;
        search?: string;
        limit?: number;
        offset?: number;
    }) {
        try {
            let query = supabase
                .from('courses')
                .select(`
          *,
          instructor:profiles!instructor_id(
            id,
            full_name,
            avatar_url,
            bio
          )
        `)
                .eq('status', 'published')
                .order('created_at', { ascending: false });

            // Apply filters
            if (filters?.category) {
                query = query.eq('category', filters.category);
            }

            if (filters?.level) {
                query = query.eq('level', filters.level);
            }

            if (filters?.search) {
                query = query.textSearch('search_vector', filters.search);
            }

            if (filters?.limit) {
                query = query.limit(filters.limit);
            }

            if (filters?.offset) {
                query = query.range(filters.offset, filters.offset + (filters.limit || 10) - 1);
            }

            const { data, error } = await query;

            if (error) throw error;

            // Map DB fields to app types
            const mappedData: Course[] = data.map((c: any) => ({
                id: c.id,
                title: c.title,
                slug: c.slug,
                description: c.description,
                price: c.price,
                level: c.level,
                category: c.category,
                thumbnail: c.thumbnail_url,
                rating: c.rating || 0,
                studentsCount: c.students_count || 0,
                duration: c.duration || '0h',
                lessonsCount: c.lessons_count || 0,
                tags: c.tags || [],
                popular: c.popular || false,
                createdAt: new Date(c.created_at),
                updatedAt: new Date(c.updated_at),
                instructor: {
                    id: c.instructor?.id,
                    name: c.instructor?.full_name,
                    avatar: c.instructor?.avatar_url,
                    bio: c.instructor?.bio,
                    expertise: c.instructor?.expertise || [],
                    coursesCount: c.instructor?.courses_count || 0,
                    studentsCount: c.instructor?.students_count || 0,
                    rating: c.instructor?.rating || 0
                }
            }));

            return { data: mappedData, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get a single course by slug
     */
    async getCourseBySlug(slug: string) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select(`
          *,
          instructor:profiles!instructor_id(
            id,
            full_name,
            avatar_url,
            bio
          ),
          lessons(
            id,
            title,
            description,
            duration,
            lesson_order
          )
        `)
                .eq('slug', slug)
                .eq('status', 'published')
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get course by ID
     */
    async getCourseById(courseId: string) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select(`
          *,
          instructor:profiles!instructor_id(
            id,
            full_name,
            avatar_url,
            bio
          ),
          lessons(
            id,
            title,
            description,
            duration,
            lesson_order,
            video_url
          )
        `)
                .eq('id', courseId)
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get courses by instructor
     */
    async getCoursesByInstructor(instructorId: string) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select('*')
                .eq('instructor_id', instructorId)
                .order('created_at', { ascending: false });

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Create a new course (instructor only)
     */
    async createCourse(courseData: {
        title: string;
        slug: string;
        description: string;
        price: number;
        level: string;
        category: string;
        thumbnail_url?: string;
    }) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .insert([courseData])
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Update a course
     */
    async updateCourse(courseId: string, updates: Partial<Course>) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .update(updates)
                .eq('id', courseId)
                .select()
                .single();

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Delete a course
     */
    async deleteCourse(courseId: string) {
        try {
            const { error } = await supabase
                .from('courses')
                .delete()
                .eq('id', courseId);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * Get popular courses
     */
    async getPopularCourses(limit: number = 6) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select(`
          *,
          instructor:profiles!instructor_id(
            id,
            full_name,
            avatar_url
          ),
          enrollments(count)
        `)
                .eq('status', 'published')
                .order('created_at', { ascending: false })
                .limit(limit);

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Search courses
     */
    async searchCourses(searchTerm: string) {
        try {
            const { data, error } = await supabase
                .from('courses')
                .select(`
          *,
          instructor:profiles!instructor_id(
            id,
            full_name,
            avatar_url
          )
        `)
                .eq('status', 'published')
                .textSearch('search_vector', searchTerm);

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },
};
