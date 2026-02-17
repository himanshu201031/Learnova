import { supabase, handleSupabaseError } from '../lib/supabase';

/**
 * Storage Service
 * Handles file uploads and signed URL generation
 */
export const storageService = {
    /**
     * Upload course thumbnail
     */
    async uploadCourseThumbnail(file: File, courseId: string) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${courseId}-${Date.now()}.${fileExt}`;
            const filePath = `thumbnails/${fileName}`;

            const { data, error } = await supabase.storage
                .from('course-thumbnails')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('course-thumbnails')
                .getPublicUrl(filePath);

            return { data: { path: data.path, url: publicUrl }, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Upload course video
     */
    async uploadCourseVideo(file: File, lessonId: string) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${lessonId}-${Date.now()}.${fileExt}`;
            const filePath = `videos/${fileName}`;

            const { data, error } = await supabase.storage
                .from('course-videos')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: false,
                });

            if (error) throw error;

            return { data: { path: data.path }, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Get signed URL for private video
     */
    async getVideoSignedUrl(videoPath: string, expiresIn: number = 3600) {
        try {
            const { data, error } = await supabase.storage
                .from('course-videos')
                .createSignedUrl(videoPath, expiresIn);

            if (error) throw error;
            return { data: data.signedUrl, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Upload user avatar
     */
    async uploadAvatar(file: File, userId: string) {
        try {
            const fileExt = file.name.split('.').pop();
            const fileName = `${userId}.${fileExt}`;
            const filePath = `${userId}/${fileName}`;

            const { data, error } = await supabase.storage
                .from('avatars')
                .upload(filePath, file, {
                    cacheControl: '3600',
                    upsert: true,
                });

            if (error) throw error;

            // Get public URL
            const { data: { publicUrl } } = supabase.storage
                .from('avatars')
                .getPublicUrl(filePath);

            return { data: { path: data.path, url: publicUrl }, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },

    /**
     * Delete file from storage
     */
    async deleteFile(bucket: string, filePath: string) {
        try {
            const { error } = await supabase.storage
                .from(bucket)
                .remove([filePath]);

            if (error) throw error;
            return { error: null };
        } catch (error) {
            return { error: handleSupabaseError(error) };
        }
    },

    /**
     * List files in a folder
     */
    async listFiles(bucket: string, folder: string) {
        try {
            const { data, error } = await supabase.storage
                .from(bucket)
                .list(folder);

            if (error) throw error;
            return { data, error: null };
        } catch (error) {
            return { data: null, error: handleSupabaseError(error) };
        }
    },
};
