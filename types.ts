import React, { ReactNode } from 'react';

export type Page = 'home' | 'courses' | 'mentors' | 'pricing' | 'login' | 'signup' | 'features' | 'dashboard' | 'course-player' | 'community' | 'achievements' | 'profile';

export interface BaseProps {
  children?: ReactNode;
  className?: string;
}

export interface FeatureItem {
  title: string;
  description: string;
  icon: React.ComponentType<any>;
}

export interface TestimonialItem {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
}

export interface StatItem {
  label: string;
  value: string;
  prefix?: string;
  suffix?: string;
}

// User & Authentication
export interface User {
  id: string;
  email: string;
  name: string;
  avatar?: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt: Date;
  emailVerified: boolean;
}

export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
}

// Course Types
export interface Course {
  id: string;
  title: string;
  slug: string;
  description: string;
  instructor: Instructor;
  price: number;
  level: 'Beginner' | 'Intermediate' | 'Advanced' | 'All Levels';
  category: string;
  thumbnail: string;
  rating: number;
  studentsCount: number;
  duration: string;
  lessonsCount: number;
  tags: string[];
  popular?: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Lesson {
  id: string;
  courseId: string;
  title: string;
  description: string;
  videoUrl: string;
  duration: number; // in seconds
  order: number;
  resources?: Resource[];
  quizId?: string;
}

export interface Resource {
  id: string;
  name: string;
  type: 'pdf' | 'code' | 'link' | 'file';
  url: string;
  size?: number;
}

export interface Instructor {
  id: string;
  name: string;
  avatar: string;
  bio: string;
  expertise: string[];
  coursesCount: number;
  studentsCount: number;
  rating: number;
}

// Enrollment & Progress
export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  course: Course;
  progress: number; // 0-100
  enrolledAt: Date;
  completedAt?: Date;
  certificateIssued: boolean;
  lastAccessedAt: Date;
}

export interface LessonProgress {
  id: string;
  userId: string;
  lessonId: string;
  completed: boolean;
  watchedDuration: number; // in seconds
  notes?: string;
  bookmarks?: number[]; // timestamps
  lastWatchedAt: Date;
}

// Achievements & Gamification
export interface Achievement {
  id: string;
  name: string;
  description: string;
  icon: string;
  criteria: string;
  points: number;
  rarity: 'common' | 'rare' | 'epic' | 'legendary';
}

export interface UserAchievement {
  id: string;
  userId: string;
  achievement: Achievement;
  earnedAt: Date;
}

export interface UserStats {
  totalPoints: number;
  level: number;
  streak: number; // days
  coursesCompleted: number;
  hoursLearned: number;
  rank?: number;
}

// Community & Forum
export interface ForumPost {
  id: string;
  userId: string;
  user: User;
  courseId?: string;
  title: string;
  content: string;
  tags: string[];
  upvotes: number;
  downvotes: number;
  commentsCount: number;
  solved: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface ForumComment {
  id: string;
  postId: string;
  userId: string;
  user: User;
  content: string;
  upvotes: number;
  createdAt: Date;
}

// Notifications
export interface Notification {
  id: string;
  userId: string;
  type: 'course' | 'achievement' | 'community' | 'system';
  title: string;
  message: string;
  read: boolean;
  actionUrl?: string;
  createdAt: Date;
}

// Payments
export interface Payment {
  id: string;
  userId: string;
  courseId: string;
  amount: number;
  currency: string;
  status: 'pending' | 'completed' | 'failed' | 'refunded';
  paymentMethod: string;
  transactionId: string;
  createdAt: Date;
}

// Reviews
export interface Review {
  id: string;
  userId: string;
  user: User;
  courseId: string;
  rating: number; // 1-5
  comment: string;
  helpfulCount: number;
  createdAt: Date;
}