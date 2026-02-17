-- =============================================
-- Additional Database Functions
-- =============================================

-- Function to increment post upvotes
CREATE OR REPLACE FUNCTION increment_post_upvotes(post_id UUID)
RETURNS INTEGER AS $$
DECLARE
  new_count INTEGER;
BEGIN
  UPDATE forum_posts
  SET upvotes = upvotes + 1
  WHERE id = post_id
  RETURNING upvotes INTO new_count;
  
  RETURN new_count;
END;
$$ LANGUAGE plpgsql SECURITY DEFINER;

-- Function to get course statistics
CREATE OR REPLACE FUNCTION get_course_stats(course_id_param UUID)
RETURNS TABLE (
  total_enrollments BIGINT,
  completed_count BIGINT,
  average_progress NUMERIC,
  total_lessons INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    COUNT(e.id) as total_enrollments,
    COUNT(e.completed_at) as completed_count,
    ROUND(AVG(e.progress_percentage), 2) as average_progress,
    (SELECT COUNT(*) FROM lessons WHERE course_id = course_id_param)::INTEGER as total_lessons
  FROM enrollments e
  WHERE e.course_id = course_id_param;
END;
$$ LANGUAGE plpgsql;

-- Function to get user learning statistics
CREATE OR REPLACE FUNCTION get_user_learning_stats(user_id_param UUID)
RETURNS TABLE (
  total_enrollments BIGINT,
  completed_courses BIGINT,
  in_progress_courses BIGINT,
  total_lessons_completed BIGINT,
  total_xp INTEGER
) AS $$
BEGIN
  RETURN QUERY
  SELECT
    (SELECT COUNT(*) FROM enrollments WHERE user_id = user_id_param) as total_enrollments,
    (SELECT COUNT(*) FROM enrollments WHERE user_id = user_id_param AND completed_at IS NOT NULL) as completed_courses,
    (SELECT COUNT(*) FROM enrollments WHERE user_id = user_id_param AND completed_at IS NULL AND progress_percentage > 0) as in_progress_courses,
    (SELECT COUNT(*) FROM lesson_progress WHERE user_id = user_id_param AND completed = true) as total_lessons_completed,
    (SELECT COALESCE(SUM(a.xp_reward), 0)::INTEGER 
     FROM user_achievements ua 
     JOIN achievements a ON ua.achievement_id = a.id 
     WHERE ua.user_id = user_id_param) as total_xp;
END;
$$ LANGUAGE plpgsql;
