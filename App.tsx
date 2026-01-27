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
const Signup = React.lazy(() => import('./components/pages/Signup'));
const FeaturesPage = React.lazy(() => import('./components/pages/FeaturesPage'));
const Dashboard = React.lazy(() => import('./components/pages/Dashboard'));
const Achievements = React.lazy(() => import('./components/pages/Achievements'));
const CoursePlayer = React.lazy(() => import('./components/pages/CoursePlayer'));
const Community = React.lazy(() => import('./components/pages/Community'));

function App() {
  const [loading, setLoading] = useState(true);
  const [currentPage, setCurrentPage] = useState<Page>('home');

  // Handle Preloader logic
  if (loading) {
    return (
      <AnimatePresence mode='wait'>
        {loading && <Preloader onComplete={() => setLoading(false)} />}
      </AnimatePresence>
    );
  }

  const renderPage = () => {
    switch (currentPage) {
      case 'features':
        return <FeaturesPage />;
      case 'pricing':
        return <Pricing />;
      case 'mentors':
        return <Mentors />;
      case 'courses':
        return <Courses />;
      case 'dashboard':
        return <Dashboard />;
      case 'achievements':
        return <Achievements />;
      case 'course-player':
        return <CoursePlayer onNavigate={setCurrentPage} />;
      case 'community':
        return <Community />;
      case 'login':
        return <Login onNavigate={setCurrentPage} />;
      case 'signup':
        return <Signup onNavigate={setCurrentPage} />;
      default:
        return <Home />;
    }
  };

  // Logic to determine if Footer should be shown
  const showFooter = !['login', 'signup', 'features', 'courses', 'mentors', 'pricing', 'dashboard', 'achievements', 'course-player'].includes(currentPage);

  // Logic to determine if Navbar should be shown (usually hidden on auth pages)
  const showNavbar = !['login', 'signup', 'course-player'].includes(currentPage);

  return (
    <AuthProvider>
      <CartProvider>
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
      </CartProvider>
    </AuthProvider >
  );
}

export default App;