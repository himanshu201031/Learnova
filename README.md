# Learnova 🚀

Learnova is a premium, full-stack e-learning platform built with modern web technologies. It combines a stunning neo-brutalist frontend with a powerful Supabase backend to deliver a complete learning management system.

## ✨ Features

### Frontend
- **Neo-Brutalist Design**: Vibrant colors, bold typography, and sharp borders for a unique, premium look
- **Dynamic Horizontal Scrolling**: Immersive "Skills That Pay" section with smooth, spring-based horizontal navigation
- **Optimized Performance**: 
  - **Code Splitting**: Route-based lazy loading with React.lazy and Suspense
  - **Image Optimization**: Custom blur-up lazy loading for all course thumbnails and banners
- **Responsive & Dark Mode**: Fully optimized for all devices with a sleek, automated dark mode

### Backend
- **Authentication**: Supabase Auth with email/password and OAuth (Google, GitHub)
- **Database**: PostgreSQL with Row Level Security (RLS)
- **Real-time Features**: Live notifications, forum updates, and progress tracking
- **File Storage**: Secure video hosting with signed URLs
- **Payments**: Stripe integration for course purchases
- **Gamification**: Achievement system with XP rewards
- **Community**: Forum with posts, comments, and upvoting

## 🛠 Tech Stack

### Frontend
- **Framework**: React 19 + TypeScript
- **Build Tool**: Vite
- **Styling**: Vanilla CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: Context API

### Backend
- **Database**: Supabase (PostgreSQL)
- **Authentication**: Supabase Auth (JWT)
- **Storage**: Supabase Storage
- **Realtime**: Supabase Realtime (WebSocket)
- **Edge Functions**: Deno Runtime
- **Payments**: Stripe
- **Client SDK**: @supabase/supabase-js

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ and npm
- A Supabase account (free tier available)
- (Optional) Stripe account for payments

### Installation

1. **Clone the repository**
```bash
git clone https://github.com/himanshu201031/Learnova.git
cd learnova
```

2. **Install dependencies**
```bash
npm install
```

3. **Set up environment variables**
```bash
cp .env.example .env
```

Edit `.env` and add your Supabase credentials:
```env
VITE_SUPABASE_URL=your_supabase_project_url
VITE_SUPABASE_ANON_KEY=your_supabase_anon_key
VITE_STRIPE_PUBLISHABLE_KEY=your_stripe_publishable_key
```

4. **Set up the database**

Follow the detailed instructions in [SUPABASE_SETUP.md](./SUPABASE_SETUP.md) to:
- Create a Supabase project
- Run database migrations
- Configure authentication providers
- Set up storage buckets

### Development

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Build

```bash
npm run build
npm run preview
```

## 📚 Documentation

- **[Backend Architecture](./BACKEND_ARCHITECTURE.md)** - Complete backend documentation
- **[Supabase Setup Guide](./SUPABASE_SETUP.md)** - Step-by-step setup instructions
- **[Database Schema](./supabase/migrations/)** - SQL migration files

## 🏗️ Project Structure

```
learnova/
├── components/          # React components
│   ├── layout/         # Layout components (Header, Footer)
│   ├── pages/          # Page components
│   ├── sections/       # Section components
│   └── ui/             # Reusable UI components
├── contexts/           # React Context providers
├── services/           # Backend service layer
│   ├── auth.service.ts
│   ├── course.service.ts
│   ├── enrollment.service.ts
│   └── ...
├── lib/                # Utility libraries
│   ├── supabase.ts     # Supabase client
│   └── database.types.ts
├── supabase/           # Supabase configuration
│   ├── migrations/     # Database migrations
│   └── functions/      # Edge Functions
├── types.ts            # TypeScript type definitions
└── App.tsx             # Main application component
```

## 🔐 Security

- **Row Level Security (RLS)** enabled on all database tables
- **JWT-based authentication** with automatic token refresh
- **Signed URLs** for private video content
- **Webhook signature verification** for Stripe payments
- **Environment variables** for sensitive credentials

## 🌟 Key Features Implemented

- ✅ User authentication (email/password, OAuth)
- ✅ Course browsing and search
- ✅ Course enrollment system
- ✅ Video lesson player with progress tracking
- ✅ Payment processing with Stripe
- ✅ Community forum with real-time updates
- ✅ Achievement and gamification system
- ✅ Real-time notifications
- ✅ User profiles and dashboards
- ✅ Instructor course management
- ✅ File upload (videos, thumbnails, avatars)

## 🚧 Roadmap

- [ ] Live video streaming for classes
- [ ] Quiz and assessment system
- [ ] Certificate generation
- [ ] Mobile app (React Native)
- [ ] AI-powered course recommendations
- [ ] Multi-language support
- [ ] Advanced analytics dashboard

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is licensed under the MIT License.

## 👨‍💻 Author

Built with ❤️ by [Himanshu](https://github.com/himanshu201031)

## 🙏 Acknowledgments

- [Supabase](https://supabase.com) - Backend infrastructure
- [Stripe](https://stripe.com) - Payment processing
- [Framer Motion](https://www.framer.com/motion/) - Animations
- [Lucide](https://lucide.dev) - Icons

