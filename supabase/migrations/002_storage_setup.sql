-- =============================================
-- Storage Buckets Setup
-- =============================================

-- Create storage buckets
INSERT INTO storage.buckets (id, name, public) VALUES
  ('course-thumbnails', 'course-thumbnails', true),
  ('course-videos', 'course-videos', false),
  ('certificates', 'certificates', false),
  ('avatars', 'avatars', true);

-- =============================================
-- Storage Policies
-- =============================================

-- Course Thumbnails (Public Read, Instructor Write)
CREATE POLICY "Public can view course thumbnails"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'course-thumbnails');

CREATE POLICY "Instructors can upload course thumbnails"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'course-thumbnails' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('instructor', 'admin')
    )
  );

CREATE POLICY "Instructors can update own course thumbnails"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'course-thumbnails' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('instructor', 'admin')
    )
  );

-- Course Videos (Private - Enrolled Users Only)
CREATE POLICY "Enrolled users can view course videos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'course-videos' AND
    (
      -- User is enrolled in the course
      EXISTS (
        SELECT 1 FROM enrollments e
        JOIN lessons l ON l.course_id = e.course_id
        WHERE e.user_id = auth.uid()
        AND storage.objects.name LIKE '%' || l.id::text || '%'
      )
      OR
      -- User is the instructor
      EXISTS (
        SELECT 1 FROM courses c
        JOIN lessons l ON l.course_id = c.id
        WHERE c.instructor_id = auth.uid()
        AND storage.objects.name LIKE '%' || l.id::text || '%'
      )
    )
  );

CREATE POLICY "Instructors can upload course videos"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'course-videos' AND
    EXISTS (
      SELECT 1 FROM profiles
      WHERE id = auth.uid() AND role IN ('instructor', 'admin')
    )
  );

-- Certificates (Private - User's Own Only)
CREATE POLICY "Users can view own certificates"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'certificates' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

-- Avatars (Public Read, Own Write)
CREATE POLICY "Public can view avatars"
  ON storage.objects FOR SELECT
  USING (bucket_id = 'avatars');

CREATE POLICY "Users can upload own avatar"
  ON storage.objects FOR INSERT
  WITH CHECK (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can update own avatar"
  ON storage.objects FOR UPDATE
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );

CREATE POLICY "Users can delete own avatar"
  ON storage.objects FOR DELETE
  USING (
    bucket_id = 'avatars' AND
    (storage.foldername(name))[1] = auth.uid()::text
  );
