-- =============================================
-- 004_security_and_performance.sql
-- Optimizes RLS initialization plans, secures functions, 
-- and adds missing performance indexes.
-- =============================================

-- 1. SECURE FUNCTIONS WITH SEARCH_PATH
-- This prevents search path hijacking vulnerabilities.
ALTER FUNCTION public.courses_search_trigger() SET search_path = public;
ALTER FUNCTION public.handle_new_user() SET search_path = public;
ALTER FUNCTION public.update_updated_at_column() SET search_path = public;
ALTER FUNCTION public.increment_post_upvotes(post_id UUID) SET search_path = public;
ALTER FUNCTION public.get_course_stats(course_id_param UUID) SET search_path = public;
ALTER FUNCTION public.get_user_learning_stats(user_id_param UUID) SET search_path = public;

-- 2. OPTIMIZE RLS POLICIES (Fixes "Auth RLS Initialization Plan")
-- Using (SELECT auth.uid()) ensures the function is evaluated once per query 
-- instead of for every row, significantly improving performance.

-- PROFILES
DROP POLICY IF EXISTS "Users can view own profile" ON profiles;
CREATE POLICY "Users can view own profile" ON profiles FOR SELECT USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own profile" ON profiles;
CREATE POLICY "Users can update own profile" ON profiles FOR UPDATE USING (id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Admins can view all profiles" ON profiles;
CREATE POLICY "Admins can view all profiles" ON profiles FOR SELECT USING (
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = (SELECT auth.uid()) AND role = 'admin'
  )
);

-- COURSES
DROP POLICY IF EXISTS "Instructors can view own courses" ON courses;
CREATE POLICY "Instructors can view own courses" ON courses FOR SELECT USING (instructor_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Instructors can create courses" ON courses;
CREATE POLICY "Instructors can create courses" ON courses FOR INSERT WITH CHECK (
  instructor_id = (SELECT auth.uid()) AND
  EXISTS (
    SELECT 1 FROM profiles
    WHERE id = (SELECT auth.uid()) AND role IN ('instructor', 'admin')
  )
);

DROP POLICY IF EXISTS "Instructors can update own courses" ON courses;
CREATE POLICY "Instructors can update own courses" ON courses FOR UPDATE USING (instructor_id = (SELECT auth.uid()));

-- ENROLLMENTS
DROP POLICY IF EXISTS "Users can view own enrollments" ON enrollments;
CREATE POLICY "Users can view own enrollments" ON enrollments FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can create own enrollments" ON enrollments;
CREATE POLICY "Users can create own enrollments" ON enrollments FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own enrollments" ON enrollments;
CREATE POLICY "Users can update own enrollments" ON enrollments FOR UPDATE USING (user_id = (SELECT auth.uid()));

-- LESSONS
DROP POLICY IF EXISTS "Instructors can manage own course lessons" ON lessons;
CREATE POLICY "Instructors can manage own course lessons" ON lessons FOR ALL USING (
  EXISTS (
    SELECT 1 FROM courses
    WHERE courses.id = lessons.course_id AND courses.instructor_id = (SELECT auth.uid())
  )
);

-- LESSON PROGRESS
DROP POLICY IF EXISTS "Users can view own progress" ON lesson_progress;
CREATE POLICY "Users can view own progress" ON lesson_progress FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can manage own progress" ON lesson_progress;
CREATE POLICY "Users can manage own progress" ON lesson_progress FOR ALL USING (user_id = (SELECT auth.uid()));

-- PAYMENTS
DROP POLICY IF EXISTS "Users can view own payments" ON payments;
CREATE POLICY "Users can view own payments" ON payments FOR SELECT USING (user_id = (SELECT auth.uid()));

-- FORUM POSTS
DROP POLICY IF EXISTS "Authenticated users can create posts" ON forum_posts;
CREATE POLICY "Authenticated users can create posts" ON forum_posts FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own posts" ON forum_posts;
CREATE POLICY "Users can update own posts" ON forum_posts FOR UPDATE USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own posts" ON forum_posts;
CREATE POLICY "Users can delete own posts" ON forum_posts FOR DELETE USING (user_id = (SELECT auth.uid()));

-- FORUM COMMENTS
DROP POLICY IF EXISTS "Authenticated users can create comments" ON forum_comments;
CREATE POLICY "Authenticated users can create comments" ON forum_comments FOR INSERT WITH CHECK (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own comments" ON forum_comments;
CREATE POLICY "Users can update own comments" ON forum_comments FOR UPDATE USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can delete own comments" ON forum_comments;
CREATE POLICY "Users can delete own comments" ON forum_comments FOR DELETE USING (user_id = (SELECT auth.uid()));

-- USER ACHIEVEMENTS
DROP POLICY IF EXISTS "Users can view own achievements" ON user_achievements;
CREATE POLICY "Users can view own achievements" ON user_achievements FOR SELECT USING (user_id = (SELECT auth.uid()));

-- NOTIFICATIONS
DROP POLICY IF EXISTS "Users can view own notifications" ON notifications;
CREATE POLICY "Users can view own notifications" ON notifications FOR SELECT USING (user_id = (SELECT auth.uid()));

DROP POLICY IF EXISTS "Users can update own notifications" ON notifications;
CREATE POLICY "Users can update own notifications" ON notifications FOR UPDATE USING (user_id = (SELECT auth.uid()));

-- 3. FIX VIEW SECURITY (SECURITY INVOKER)
-- Ensures the view respects RLS policies of the user querying it.
DROP VIEW IF EXISTS course_completion_rate;
CREATE VIEW course_completion_rate WITH (security_invoker = true) AS
SELECT
  course_id,
  COUNT(*) as total_enrollments,
  COUNT(*) FILTER (WHERE completed_at IS NOT NULL) as completed_enrollments,
  ROUND(
    (COUNT(*) FILTER (WHERE completed_at IS NOT NULL)::NUMERIC / 
    NULLIF(COUNT(*), 0) * 100), 2
  ) as completion_percentage
FROM enrollments
GROUP BY course_id;

-- 4. ADD MISSING PERFORMANCE INDEXES
-- Improves performance on common JOIN and filter operations.
CREATE INDEX IF NOT EXISTS idx_forum_comments_user_id ON public.forum_comments(user_id);
CREATE INDEX IF NOT EXISTS idx_payments_course_id ON public.payments(course_id);
CREATE INDEX IF NOT EXISTS idx_user_achievements_achievement_id ON public.user_achievements(achievement_id);
CREATE INDEX IF NOT EXISTS idx_lesson_progress_watched_at ON public.lesson_progress(last_watched_at);
CREATE INDEX IF NOT EXISTS idx_notifications_created_at ON public.notifications(created_at);
