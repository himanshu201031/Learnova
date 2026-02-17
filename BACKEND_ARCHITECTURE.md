# Learnova Backend Architecture Documentation

## 📋 Table of Contents

1. [Overview](#overview)
2. [Technology Stack](#technology-stack)
3. [Database Schema](#database-schema)
4. [Service Layer](#service-layer)
5. [Authentication & Authorization](#authentication--authorization)
6. [API Usage Examples](#api-usage-examples)
7. [Realtime Features](#realtime-features)
8. [File Storage](#file-storage)
9. [Payments Integration](#payments-integration)
10. [Security Best Practices](#security-best-practices)

---

## Overview

Learnova uses **Supabase** as its Backend-as-a-Service (BaaS) solution, providing:

- **PostgreSQL Database** with Row Level Security (RLS)
- **Authentication** with JWT tokens
- **Storage** for videos, thumbnails, and certificates
- **Realtime** subscriptions via WebSockets
- **Edge Functions** for serverless logic
- **Built-in API** with automatic REST endpoints

---

## Technology Stack

| Component | Technology |
|-----------|-----------|
| Database | PostgreSQL (via Supabase) |
| Auth | Supabase Auth (JWT-based) |
| Storage | Supabase Storage |
| Realtime | Supabase Realtime (WebSocket) |
| Edge Functions | Deno Runtime |
| Payments | Stripe |
| Client SDK | @supabase/supabase-js |

---

## Database Schema

### Core Tables

#### 1. **profiles**
Extends auth.users with additional user information.

```sql
- id (uuid, PK, FK to auth.users)
- full_name (text)
- avatar_url (text)
- role (text: 'student' | 'instructor' | 'admin')
- bio (text)
- created_at (timestamp)
```

#### 2. **courses**
Stores course information.

```sql
- id (uuid, PK)
- title (text)
- slug (text, unique)
- description (text)
- instructor_id (uuid, FK to profiles)
- price (numeric)
- level (text)
- category (text)
- thumbnail_url (text)
- status (text: 'draft' | 'published' | 'archived')
- search_vector (tsvector) -- for full-text search
- created_at, updated_at (timestamp)
```

#### 3. **lessons**
Course content broken into lessons.

```sql
- id (uuid, PK)
- course_id (uuid, FK to courses)
- title (text)
- description (text)
- video_url (text)
- duration (integer, seconds)
- lesson_order (integer)
- created_at (timestamp)
```

#### 4. **enrollments**
Tracks user course enrollments.

```sql
- id (uuid, PK)
- user_id (uuid, FK to profiles)
- course_id (uuid, FK to courses)
- progress_percentage (numeric, 0-100)
- enrolled_at (timestamp)
- completed_at (timestamp, nullable)
```

#### 5. **lesson_progress**
Tracks individual lesson completion.

```sql
- id (uuid, PK)
- user_id (uuid, FK to profiles)
- lesson_id (uuid, FK to lessons)
- completed (boolean)
- watched_duration (integer, seconds)
- notes (text)
- last_watched_at (timestamp)
```

#### 6. **payments**
Payment transaction records.

```sql
- id (uuid, PK)
- user_id (uuid, FK to profiles)
- course_id (uuid, FK to courses)
- stripe_session_id (text)
- amount (numeric)
- currency (text)
- status (text: 'pending' | 'completed' | 'failed' | 'refunded')
- created_at (timestamp)
```

#### 7. **forum_posts** & **forum_comments**
Community discussion features.

#### 8. **achievements** & **user_achievements**
Gamification system.

#### 9. **notifications**
User notification system.

---

## Service Layer

All backend operations are abstracted into service modules located in `/services`:

### Available Services

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

### Service Architecture

Each service follows this pattern:

```typescript
export const serviceNameService = {
  async methodName(params) {
    try {
      const { data, error } = await supabase
        .from('table')
        .select('*')
        .eq('field', value);
      
      if (error) throw error;
      return { data, error: null };
    } catch (error) {
      return { data: null, error: handleSupabaseError(error) };
    }
  }
};
```

---

## Authentication & Authorization

### Sign Up

```typescript
import { authService } from './services';

const { data, error } = await authService.signUp({
  email: 'user@example.com',
  password: 'securePassword123',
  fullName: 'John Doe',
});
```

### Sign In

```typescript
const { data, error } = await authService.signIn({
  email: 'user@example.com',
  password: 'securePassword123',
});
```

### OAuth (Google/GitHub)

```typescript
await authService.signInWithOAuth('google');
await authService.signInWithOAuth('github');
```

### Get Current User

```typescript
const { data: user } = await authService.getCurrentUser();
const { data: profile } = await authService.getUserProfile(user.id);
```

### Row Level Security (RLS)

All tables have RLS enabled. Examples:

**Students can only view their own enrollments:**
```sql
CREATE POLICY "Users can view own enrollments"
  ON enrollments FOR SELECT
  USING (auth.uid() = user_id);
```

**Instructors can manage their own courses:**
```sql
CREATE POLICY "Instructors can update own courses"
  ON courses FOR UPDATE
  USING (auth.uid() = instructor_id);
```

---

## API Usage Examples

### Fetching Courses

```typescript
import { courseService } from './services';

// Get all published courses
const { data: courses } = await courseService.getCourses();

// Filter by category
const { data: webCourses } = await courseService.getCourses({
  category: 'Web Development',
  limit: 10,
});

// Search courses
const { data: results } = await courseService.searchCourses('react');

// Get single course
const { data: course } = await courseService.getCourseBySlug('react-masterclass');
```

### Enrolling in a Course

```typescript
import { enrollmentService, paymentService } from './services';

// Free course enrollment
const { data: enrollment } = await enrollmentService.enrollInCourse(courseId);

// Paid course enrollment (via Stripe)
const { data: session } = await paymentService.createCheckoutSession(courseId);
if (session?.url) {
  window.location.href = session.url; // Redirect to Stripe Checkout
}
```

### Tracking Progress

```typescript
import { enrollmentService } from './services';

// Update lesson progress
await enrollmentService.updateLessonProgress(userId, lessonId, {
  completed: true,
  watched_duration: 1200, // 20 minutes
});

// Calculate course completion
const { data: percentage } = await enrollmentService.calculateCourseCompletion(
  userId,
  courseId
);

// Update enrollment progress
await enrollmentService.updateProgress(enrollmentId, percentage);
```

### Community Features

```typescript
import { communityService } from './services';

// Create forum post
const { data: post } = await communityService.createForumPost({
  title: 'How to use React Hooks?',
  content: 'I need help understanding useEffect...',
  course_id: courseId,
});

// Add comment
const { data: comment } = await communityService.createComment(
  postId,
  'Here is how you can use useEffect...'
);

// Upvote post
await communityService.upvotePost(postId);
```

---

## Realtime Features

### Subscribe to Notifications

```typescript
import { notificationService } from './services';

const subscription = notificationService.subscribeToNotifications(
  userId,
  (payload) => {
    console.log('New notification:', payload.new);
    // Update UI with new notification
  }
);

// Cleanup
subscription.unsubscribe();
```

### Subscribe to Forum Comments

```typescript
import { communityService } from './services';

const subscription = communityService.subscribeToNewComments(
  postId,
  (payload) => {
    console.log('New comment:', payload.new);
    // Add comment to UI in real-time
  }
);
```

---

## File Storage

### Upload Course Thumbnail

```typescript
import { storageService } from './services';

const file = event.target.files[0];
const { data, error } = await storageService.uploadCourseThumbnail(
  file,
  courseId
);

console.log('Thumbnail URL:', data.url);
```

### Upload Course Video

```typescript
const { data } = await storageService.uploadCourseVideo(file, lessonId);
console.log('Video path:', data.path);
```

### Get Signed URL for Video

```typescript
// Videos are private, need signed URL
const { data: signedUrl } = await storageService.getVideoSignedUrl(
  videoPath,
  3600 // Expires in 1 hour
);

// Use in video player
<video src={signedUrl} controls />
```

---

## Payments Integration

### Stripe Checkout Flow

1. **Frontend**: User clicks "Enroll Now"
2. **Create Session**: Call `paymentService.createCheckoutSession(courseId)`
3. **Redirect**: User redirected to Stripe Checkout
4. **Payment**: User completes payment
5. **Webhook**: Stripe sends event to Edge Function
6. **Enrollment**: Edge Function creates enrollment and notification
7. **Redirect**: User redirected back to course page

### Edge Functions

Located in `/supabase/functions`:

- **create-checkout-session**: Creates Stripe Checkout session
- **stripe-webhook**: Handles Stripe webhook events

---

## Security Best Practices

### ✅ Implemented

- **Row Level Security (RLS)** on all tables
- **JWT-based authentication** with automatic token refresh
- **Signed URLs** for private video access
- **Service role key** never exposed to frontend
- **HTTPS only** for all API calls
- **Input validation** in Edge Functions
- **Webhook signature verification** for Stripe

### 🔒 Environment Variables

Never commit these to version control:

```env
VITE_SUPABASE_URL=https://xxx.supabase.co
VITE_SUPABASE_ANON_KEY=eyJ... (safe for frontend)
SUPABASE_SERVICE_ROLE_KEY=eyJ... (NEVER expose to frontend)
STRIPE_SECRET_KEY=sk_test_... (backend only)
STRIPE_WEBHOOK_SECRET=whsec_... (backend only)
```

### 🛡️ RLS Policy Examples

```sql
-- Students can only view published courses
CREATE POLICY "Anyone can view published courses"
  ON courses FOR SELECT
  USING (status = 'published');

-- Users can only view their own progress
CREATE POLICY "Users can view own progress"
  ON lesson_progress FOR SELECT
  USING (auth.uid() = user_id);

-- Only enrolled users can access course videos
CREATE POLICY "Enrolled users can view course videos"
  ON storage.objects FOR SELECT
  USING (
    bucket_id = 'course-videos' AND
    EXISTS (
      SELECT 1 FROM enrollments
      WHERE user_id = auth.uid()
      AND course_id = (/* extract from path */)
    )
  );
```

---

## Database Functions

Custom PostgreSQL functions for complex operations:

### Increment Post Upvotes

```sql
SELECT increment_post_upvotes('post-uuid');
```

### Get Course Statistics

```sql
SELECT * FROM get_course_stats('course-uuid');
```

### Get User Learning Stats

```sql
SELECT * FROM get_user_learning_stats('user-uuid');
```

---

## Performance Optimizations

1. **Indexes** on frequently queried columns
2. **Full-text search** using PostgreSQL tsvector
3. **Connection pooling** via Supabase
4. **CDN** for public assets (thumbnails, avatars)
5. **Signed URLs** with expiration for videos
6. **Realtime subscriptions** instead of polling

---

## Monitoring & Debugging

### Supabase Dashboard

- **Logs**: View Edge Function logs
- **Database**: Query editor and table browser
- **Auth**: User management
- **Storage**: File browser
- **API**: Auto-generated documentation

### Client-Side Debugging

```typescript
// Enable Supabase client logging
const supabase = createClient(url, key, {
  auth: {
    debug: true,
  },
});
```

---

## Next Steps

- [ ] Set up production Supabase project
- [ ] Configure custom domain
- [ ] Set up Stripe production keys
- [ ] Deploy Edge Functions
- [ ] Configure email templates
- [ ] Set up monitoring and alerts
- [ ] Implement rate limiting
- [ ] Add analytics tracking

---

## Support & Resources

- [Supabase Documentation](https://supabase.com/docs)
- [Stripe Documentation](https://stripe.com/docs)
- [PostgreSQL Documentation](https://www.postgresql.org/docs/)
- [Learnova Setup Guide](./SUPABASE_SETUP.md)
