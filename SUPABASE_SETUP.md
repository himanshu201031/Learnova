# Supabase Backend Setup Guide

This guide will help you set up the Supabase backend for Learnova.

## Prerequisites

- A Supabase account (sign up at https://supabase.com)
- Node.js and npm installed

## Step 1: Create a Supabase Project

1. Go to https://app.supabase.com
2. Click "New Project"
3. Fill in the project details:
   - **Name**: Learnova
   - **Database Password**: Choose a strong password
   - **Region**: Select the closest region to your users
4. Click "Create new project"
5. Wait for the project to be provisioned (takes ~2 minutes)

## Step 2: Get Your Project Credentials

1. In your Supabase dashboard, go to **Settings** → **API**
2. Copy the following values:
   - **Project URL** (e.g., `https://xxxxx.supabase.co`)
   - **anon/public key** (starts with `eyJ...`)

## Step 3: Update Environment Variables

1. Open the `.env` file in your project root
2. Replace the placeholder values:

```env
VITE_SUPABASE_URL=https://your-project.supabase.co
VITE_SUPABASE_ANON_KEY=your-anon-key-here
```

## Step 4: Run Database Migrations

### Option A: Using Supabase Dashboard (Recommended for beginners)

1. Go to your Supabase dashboard
2. Navigate to **SQL Editor**
3. Click **New Query**
4. Copy and paste the contents of each migration file in order:
   - `supabase/migrations/001_initial_schema.sql`
   - `supabase/migrations/002_storage_setup.sql`
   - `supabase/migrations/003_functions.sql`
5. Click **Run** for each query

### Option B: Using Supabase CLI (Advanced)

```bash
# Install Supabase CLI
npm install -g supabase

# Login to Supabase
supabase login

# Link your project
supabase link --project-ref your-project-ref

# Push migrations
supabase db push
```

## Step 5: Configure Authentication

1. In Supabase dashboard, go to **Authentication** → **Providers**
2. Enable **Email** provider (enabled by default)
3. (Optional) Enable **Google** OAuth:
   - Toggle on Google provider
   - Add your Google OAuth credentials
4. (Optional) Enable **GitHub** OAuth:
   - Toggle on GitHub provider
   - Add your GitHub OAuth credentials

### Email Templates (Optional)

Customize email templates in **Authentication** → **Email Templates**:
- Confirmation email
- Password reset
- Magic link

## Step 6: Set Up Storage Buckets

The migration scripts should have created the buckets automatically. Verify in **Storage**:

- ✅ `course-thumbnails` (public)
- ✅ `course-videos` (private)
- ✅ `certificates` (private)
- ✅ `avatars` (public)

If not created, create them manually and apply the policies from `002_storage_setup.sql`.

## Step 7: Configure Row Level Security (RLS)

RLS policies are automatically created by the migration scripts. Verify they're enabled:

1. Go to **Database** → **Tables**
2. For each table, check that RLS is **enabled**
3. Click on a table → **Policies** to view the security rules

## Step 8: Test the Connection

1. Start your development server:
```bash
npm run dev
```

2. Try to sign up for a new account
3. Check your email for verification
4. Verify the user appears in **Authentication** → **Users**

## Step 9: (Optional) Set Up Stripe for Payments

1. Create a Stripe account at https://stripe.com
2. Get your **Publishable Key** from the Stripe dashboard
3. Add to `.env`:
```env
VITE_STRIPE_PUBLISHABLE_KEY=pk_test_your_key_here
```

4. Create a Stripe webhook endpoint (for production):
   - Use Supabase Edge Functions (see `edge-functions/` folder)
   - Or use a separate backend service

## Common Issues

### Issue: "Invalid API key"
- **Solution**: Double-check your `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` in `.env`

### Issue: "Row Level Security policy violation"
- **Solution**: Ensure all RLS policies are created correctly from the migration files

### Issue: "Storage bucket not found"
- **Solution**: Manually create the storage buckets in the Supabase dashboard

### Issue: "Email not sending"
- **Solution**: Check **Authentication** → **Email Templates** and ensure SMTP is configured

## Next Steps

- ✅ Set up your database schema
- ✅ Configure authentication
- ✅ Set up storage buckets
- 🔄 Create Edge Functions for payments (optional)
- 🔄 Deploy to production
- 🔄 Set up monitoring and analytics

## Useful Links

- [Supabase Documentation](https://supabase.com/docs)
- [Supabase Auth Guide](https://supabase.com/docs/guides/auth)
- [Row Level Security](https://supabase.com/docs/guides/auth/row-level-security)
- [Storage Guide](https://supabase.com/docs/guides/storage)

## Support

If you encounter any issues, check:
1. Supabase dashboard logs
2. Browser console for errors
3. Network tab for failed requests
4. Supabase community forum
