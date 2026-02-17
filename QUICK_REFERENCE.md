# Learnova Backend - Quick Reference Guide

## 🚀 Quick Start Commands

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build
```

## 🔑 Environment Setup

Create `.env` file with:
```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ...
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

## 📦 Service Layer Imports

```typescript
import {
  authService,
  courseService,
  enrollmentService,
  storageService,
  communityService,
  notificationService,
  achievementService,
  paymentService,
} from './services';
```

## 🔐 Authentication

### Sign Up
```typescript
const { data, error } = await authService.signUp({
  email: 'user@example.com',
  password: 'password123',
  fullName: 'John Doe',
});
```

### Sign In
```typescript
const { data, error } = await authService.signIn({
  email: 'user@example.com',
  password: 'password123',
});
```

### OAuth
```typescript
await authService.signInWithOAuth('google');
await authService.signInWithOAuth('github');
```

### Sign Out
```typescript
await authService.signOut();
```

### Get Current User
```typescript
const { data: user } = await authService.getCurrentUser();
const { data: profile } = await authService.getUserProfile(user.id);
```

## 📚 Courses

### Get All Courses
```typescript
const { data: courses } = await courseService.getCourses();
```

### Filter Courses
```typescript
const { data: courses } = await courseService.getCourses({
  category: 'Web Development',
  level: 'Beginner',
  limit: 10,
});
```

### Search Courses
```typescript
const { data: results } = await courseService.searchCourses('react');
```

### Get Single Course
```typescript
const { data: course } = await courseService.getCourseBySlug('react-masterclass');
```

## 🎓 Enrollments

### Enroll in Course
```typescript
const { data } = await enrollmentService.enrollInCourse(courseId);
```

### Get User Enrollments
```typescript
const { data } = await enrollmentService.getUserEnrollments(userId);
```

### Check Enrollment
```typescript
const { data: isEnrolled } = await enrollmentService.isEnrolled(userId, courseId);
```

### Update Progress
```typescript
await enrollmentService.updateLessonProgress(userId, lessonId, {
  completed: true,
  watched_duration: 1200,
});
```

## 💳 Payments

### Create Checkout Session
```typescript
const { data: session } = await paymentService.createCheckoutSession(courseId);
if (session?.url) {
  window.location.href = session.url;
}
```

### Get Payment History
```typescript
const { data: payments } = await paymentService.getPaymentHistory(userId);
```

## 💬 Community

### Create Forum Post
```typescript
const { data: post } = await communityService.createForumPost({
  title: 'How to use React Hooks?',
  content: 'I need help...',
  course_id: courseId,
});
```

### Add Comment
```typescript
const { data: comment } = await communityService.createComment(
  postId,
  'Here is the answer...'
);
```

### Upvote Post
```typescript
await communityService.upvotePost(postId);
```

## 🔔 Notifications

### Get Notifications
```typescript
const { data: notifications } = await notificationService.getNotifications(userId);
```

### Mark as Read
```typescript
await notificationService.markAsRead(notificationId);
await notificationService.markAllAsRead(userId);
```

### Subscribe to Real-time Notifications
```typescript
const subscription = notificationService.subscribeToNotifications(
  userId,
  (payload) => {
    console.log('New notification:', payload.new);
  }
);

// Cleanup
subscription.unsubscribe();
```

## 🏆 Achievements

### Get User Achievements
```typescript
const { data: achievements } = await achievementService.getUserAchievements(userId);
```

### Get Total XP
```typescript
const { data: totalXP } = await achievementService.getUserTotalXP(userId);
```

### Check and Award Achievements
```typescript
const { data: newAchievements } = await achievementService.checkAndAwardAchievements(userId);
```

## 📁 File Storage

### Upload Thumbnail
```typescript
const file = event.target.files[0];
const { data } = await storageService.uploadCourseThumbnail(file, courseId);
console.log('URL:', data.url);
```

### Upload Video
```typescript
const { data } = await storageService.uploadCourseVideo(file, lessonId);
```

### Get Signed Video URL
```typescript
const { data: signedUrl } = await storageService.getVideoSignedUrl(
  videoPath,
  3600 // 1 hour
);
```

### Upload Avatar
```typescript
const { data } = await storageService.uploadAvatar(file, userId);
```

## 🔄 Real-time Subscriptions

### Forum Posts
```typescript
const subscription = communityService.subscribeToNewPosts((payload) => {
  console.log('New post:', payload.new);
});
```

### Forum Comments
```typescript
const subscription = communityService.subscribeToNewComments(postId, (payload) => {
  console.log('New comment:', payload.new);
});
```

### Notifications
```typescript
const subscription = notificationService.subscribeToNotifications(userId, (payload) => {
  console.log('New notification:', payload.new);
});
```

## 🛠️ Database Functions

### Get Course Stats
```sql
SELECT * FROM get_course_stats('course-uuid');
```

### Get User Learning Stats
```sql
SELECT * FROM get_user_learning_stats('user-uuid');
```

### Increment Post Upvotes
```sql
SELECT increment_post_upvotes('post-uuid');
```

## 🔒 Security Notes

- ✅ All tables have Row Level Security (RLS) enabled
- ✅ Use `VITE_SUPABASE_ANON_KEY` in frontend (safe)
- ❌ Never expose `SUPABASE_SERVICE_ROLE_KEY` to frontend
- ✅ Videos use signed URLs with expiration
- ✅ Stripe webhooks verify signatures

## 📊 Common Patterns

### Error Handling
```typescript
const { data, error } = await someService.someMethod();
if (error) {
  console.error('Error:', error);
  // Handle error
  return;
}
// Use data
```

### Loading States
```typescript
const [loading, setLoading] = useState(false);

const handleAction = async () => {
  setLoading(true);
  try {
    const { data, error } = await someService.someMethod();
    if (error) throw new Error(error);
    // Success
  } catch (err) {
    console.error(err);
  } finally {
    setLoading(false);
  }
};
```

### Protected Routes
```typescript
import { useAuth } from './contexts/AuthContext';

const ProtectedPage = () => {
  const { isAuthenticated, isLoading } = useAuth();
  
  if (isLoading) return <div>Loading...</div>;
  if (!isAuthenticated) return <Navigate to="/login" />;
  
  return <div>Protected Content</div>;
};
```

## 🐛 Debugging

### Enable Supabase Logging
```typescript
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(url, key, {
  auth: {
    debug: true,
  },
});
```

### Check RLS Policies
```sql
-- View policies for a table
SELECT * FROM pg_policies WHERE tablename = 'courses';
```

### Test Authentication
```typescript
const { data: { session } } = await supabase.auth.getSession();
console.log('Session:', session);
```

## 📚 Resources

- [Full Backend Documentation](./BACKEND_ARCHITECTURE.md)
- [Setup Guide](./SUPABASE_SETUP.md)
- [Supabase Docs](https://supabase.com/docs)
- [Stripe Docs](https://stripe.com/docs)
