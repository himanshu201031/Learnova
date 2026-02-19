import React, { useState, useEffect } from 'react';
import { Page } from './types';
import { AnimatePresence, motion } from 'framer-motion';
import { AuthProvider } from './contexts/AuthContext';
import { CartProvider } from './contexts/CartContext';
import CartDrawer from './components/ui/CartDrawer';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { Preloader } from './components/ui/Preloader';
import LoadingSpinner from './components/ui/LoadingSpinner';

// Lazy Loaded Pages
const Home = React.lazy(() => import('./components/pages/Home'));
const Pricing = React.lazy(() => import('./components/pages/Pricing'));
const Mentors = React.lazy(() => import('./components/pages/Mentors'));
const Courses = React.lazy(() => import('./components/pages/Courses'));
const Login = React.lazy(() => import('./components/pages/Login'));
const FeaturesPage = React.lazy(() => import('./components/pages/FeaturesPage'));
const Dashboard = React.lazy(() => import('./components/pages/Dashboard'));
const Achievements = React.lazy(() => import('./components/pages/Achievements'));
const CoursePlayer = React.lazy(() => import('./components/pages/CoursePlayer'));
const Community = React.lazy(() => import('./components/pages/Community'));

import { useAuth } from './contexts/AuthContext';

function AppContent() {
  const [currentPage, setCurrentPage] = useState<Page>('home');
  const { isAuthenticated, isLoading } = useAuth();

  // Detect OAuth callback URL (e.g. after Google/GitHub redirect)
  const isCallbackPage = window.location.pathname.startsWith('/auth/callback');

  useEffect(() => {
    if (isCallbackPage && !isLoading && isAuthenticated) {
      // Auth has resolved and succeeded — clean up and move to dashboard
      window.history.replaceState(null, '', '/');
      setCurrentPage('dashboard');
    }
  }, [isCallbackPage, isLoading, isAuthenticated, setCurrentPage]);

  useEffect(() => {
    // If user is authenticated and on login/home, move to dashboard
    const authPages: Page[] = ['home', 'login'];
    if (isAuthenticated && authPages.includes(currentPage)) {
      setCurrentPage('dashboard');
    }
  }, [isAuthenticated, currentPage]);

  const renderPage = () => {
    // Show a branded loading screen during OAuth callback processing
    if (isCallbackPage) {
      return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center gap-6">
          <div className="text-piku-lime font-black text-5xl tracking-tighter italic">LEARNOVA</div>
          <div className="flex items-center gap-3 text-white/60 font-mono text-sm">
            <svg className="animate-spin w-5 h-5 text-piku-lime" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
            </svg>
            Signing you in…
          </div>
        </div>
      );
    }

    if (isLoading) return <LoadingSpinner />;

    switch (currentPage) {
      case 'features':
        return <FeaturesPage onNavigate={setCurrentPage} />;
      case 'pricing':
        return <Pricing onNavigate={setCurrentPage} />;
      case 'mentors':
        return <Mentors onNavigate={setCurrentPage} />;
      case 'courses':
        return <Courses onNavigate={setCurrentPage} />;
      case 'dashboard':
        return isAuthenticated ? <Dashboard /> : <Login onNavigate={setCurrentPage} />;
      case 'achievements':
        return isAuthenticated ? <Achievements /> : <Login onNavigate={setCurrentPage} />;
      case 'course-player':
        return isAuthenticated ? <CoursePlayer onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case 'community':
        return isAuthenticated ? <Community onNavigate={setCurrentPage} /> : <Login onNavigate={setCurrentPage} />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      default:
        return <Home onNavigate={setCurrentPage} />;
    }
  };

  // Logic to determine if Footer should be shown
  const showFooter = !['login', 'features', 'courses', 'mentors', 'pricing', 'dashboard', 'achievements', 'course-player'].includes(currentPage);

  // Logic to determine if Navbar should be shown (usually hidden on auth pages)
  const showNavbar = !['login', 'course-player'].includes(currentPage);

  return (
    <div className="min-h-screen bg-white dark:bg-black text-black dark:text-white font-sans transition-colors duration-500">
      {showNavbar && <Navbar currentPage={currentPage} onNavigate={setCurrentPage} />}
      <CartDrawer />

      {/* Page Transition Wrapper */}
      <React.Suspense fallback={<LoadingSpinner />}>
        <motion.main
          key={currentPage}
          initial={{ opacity: 0, scale: 0.98, filter: "blur(10px)" }}
          animate={{ opacity: 1, scale: 1, filter: "blur(0px)" }}
          transition={{ duration: 1.5, ease: [0.22, 1, 0.36, 1] }} // Slow, smooth ease-out
          className="w-full"
        >
          {renderPage()}
        </motion.main>
      </React.Suspense>

      {showFooter && <Footer onNavigate={setCurrentPage} />}
    </div>
  );
}

function App() {
  const [loading, setLoading] = useState(true);

  // Handle Preloader logic
  if (loading) {
    return (
      <AnimatePresence mode='wait'>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
    );
  }

  return (
    <AuthProvider>
      <CartProvider>
        <AppContent />
      </CartProvider>
    </AuthProvider >
  );
}

export default App;