export type Json =
    | string
    | number
    | boolean
    | null
    | { [key: string]: Json | undefined }
    | Json[]

export interface Database {
    public: {
        Tables: {
            profiles: {
                Row: {
                    id: string
                    full_name: string | null
                    avatar_url: string | null
                    role: 'student' | 'instructor' | 'admin'
                    bio: string | null
                    created_at: string
                }
                Insert: {
                    id: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'student' | 'instructor' | 'admin'
                    bio?: string | null
                    created_at?: string
                }
                Update: {
                    id?: string
                    full_name?: string | null
                    avatar_url?: string | null
                    role?: 'student' | 'instructor' | 'admin'
                    bio?: string | null
                    created_at?: string
                }
            }
            courses: {
                Row: {
                    id: string
                    title: string
                    slug: string
                    description: string | null
                    instructor_id: string
                    price: number
                    level: string | null
                    category: string | null
                    thumbnail_url: string | null
                    status: 'draft' | 'published' | 'archived'
                    created_at: string
                    updated_at: string
                }
                Insert: {
                    id?: string
                    title: string
                    slug: string
                    description?: string | null
                    instructor_id: string
                    price?: number
                    level?: string | null
                    category?: string | null
                    thumbnail_url?: string | null
                    status?: 'draft' | 'published' | 'archived'
                    created_at?: string
                    updated_at?: string
                }
                Update: {
                    id?: string
                    title?: string
                    slug?: string
                    description?: string | null
                    instructor_id?: string
                    price?: number
                    level?: string | null
                    category?: string | null
                    thumbnail_url?: string | null
                    status?: 'draft' | 'published' | 'archived'
                    created_at?: string
                    updated_at?: string
                }
            }
            lessons: {
                Row: {
                    id: string
                    course_id: string
                    title: string
                    description: string | null
                    video_url: string | null
                    duration: number | null
                    lesson_order: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    course_id: string
                    title: string
                    description?: string | null
                    video_url?: string | null
                    duration?: number | null
                    lesson_order: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    course_id?: string
                    title?: string
                    description?: string | null
                    video_url?: string | null
                    duration?: number | null
                    lesson_order?: number
                    created_at?: string
                }
            }
            enrollments: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string
                    progress_percentage: number
                    enrolled_at: string
                    completed_at: string | null
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id: string
                    progress_percentage?: number
                    enrolled_at?: string
                    completed_at?: string | null
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string
                    progress_percentage?: number
                    enrolled_at?: string
                    completed_at?: string | null
                }
            }
            lesson_progress: {
                Row: {
                    id: string
                    user_id: string
                    lesson_id: string
                    completed: boolean
                    watched_duration: number
                    notes: string | null
                    last_watched_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    lesson_id: string
                    completed?: boolean
                    watched_duration?: number
                    notes?: string | null
                    last_watched_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    lesson_id?: string
                    completed?: boolean
                    watched_duration?: number
                    notes?: string | null
                    last_watched_at?: string
                }
            }
            payments: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string
                    stripe_session_id: string | null
                    amount: number
                    currency: string
                    status: 'pending' | 'completed' | 'failed' | 'refunded'
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id: string
                    stripe_session_id?: string | null
                    amount: number
                    currency: string
                    status?: 'pending' | 'completed' | 'failed' | 'refunded'
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string
                    stripe_session_id?: string | null
                    amount?: number
                    currency?: string
                    status?: 'pending' | 'completed' | 'failed' | 'refunded'
                    created_at?: string
                }
            }
            forum_posts: {
                Row: {
                    id: string
                    user_id: string
                    course_id: string | null
                    title: string
                    content: string
                    upvotes: number
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    course_id?: string | null
                    title: string
                    content: string
                    upvotes?: number
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    course_id?: string | null
                    title?: string
                    content?: string
                    upvotes?: number
                    created_at?: string
                }
            }
            forum_comments: {
                Row: {
                    id: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at: string
                }
                Insert: {
                    id?: string
                    post_id: string
                    user_id: string
                    content: string
                    created_at?: string
                }
                Update: {
                    id?: string
                    post_id?: string
                    user_id?: string
                    content?: string
                    created_at?: string
                }
            }
            achievements: {
                Row: {
                    id: string
                    name: string
                    description: string
                    xp_reward: number
                }
                Insert: {
                    id?: string
                    name: string
                    description: string
                    xp_reward: number
                }
                Update: {
                    id?: string
                    name?: string
                    description?: string
                    xp_reward?: number
                }
            }
            user_achievements: {
                Row: {
                    id: string
                    user_id: string
                    achievement_id: string
                    earned_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    achievement_id: string
                    earned_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    achievement_id?: string
                    earned_at?: string
                }
            }
            notifications: {
                Row: {
                    id: string
                    user_id: string
                    title: string
                    message: string
                    read: boolean
                    created_at: string
                }
                Insert: {
                    id?: string
                    user_id: string
                    title: string
                    message: string
                    read?: boolean
                    created_at?: string
                }
                Update: {
                    id?: string
                    user_id?: string
                    title?: string
                    message?: string
                    read?: boolean
                    created_at?: string
                }
            }
        }
        Views: {
            [_ in never]: never
        }
        Functions: {
            [_ in never]: never
        }
        Enums: {
            [_ in never]: never
        }
    }
}
