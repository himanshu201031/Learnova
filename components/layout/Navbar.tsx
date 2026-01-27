import React, { useState, useEffect } from 'react';
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from 'framer-motion';
import { Menu, X, Sun, Moon, User, LogOut, Settings, Bell, ShoppingBag } from 'lucide-react';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';
import { Page } from '../../types';
import { useAuth } from '../../contexts/AuthContext';
import { useCart } from '../../contexts/CartContext';
import NotificationCenter from '../ui/NotificationCenter';

interface NavbarProps {
  currentPage: Page;
  onNavigate: (page: Page) => void;
}

const Navbar: React.FC<NavbarProps> = ({ currentPage, onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isDark, setIsDark] = useState(false);
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [notificationsOpen, setNotificationsOpen] = useState(false);
  const { scrollY } = useScroll();
  const { user, isAuthenticated, logout } = useAuth();
  const { cart, setIsCartOpen } = useCart();

  useMotionValueEvent(scrollY, "change", (latest) => {
    setIsScrolled(latest > 20);
  });

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
  }, [mobileMenuOpen]);

  // Dark Mode Toggle Logic
  useEffect(() => {
    if (isDark) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDark]);

  const navLinks: { name: string; value: Page }[] = [
    { name: 'Features', value: 'features' },
    { name: 'Courses', value: 'courses' },
    { name: 'Community', value: 'community' as Page },
    { name: 'Pricing', value: 'pricing' },
    ...(isAuthenticated ? [{ name: 'Dashboard', value: 'dashboard' as Page }] : []),
  ];

  const handleLogout = () => {
    logout();
    setProfileMenuOpen(false);
    onNavigate('home');
  };

  const handleNavClick = (page: Page) => {
    onNavigate(page);
    setMobileMenuOpen(false);
    window.scrollTo(0, 0);
  };

  return (
    <>
      <motion.header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${isScrolled
          ? 'py-3 bg-white/95 dark:bg-black/95 backdrop-blur-md border-b-2 border-black dark:border-white shadow-[0px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_4px_0px_0px_rgba(255,255,255,1)]'
          : 'py-6 bg-transparent'
          }`}
      >
        <div className="container mx-auto px-6 flex items-center justify-between">
          {/* Logo */}
          <div
            className="cursor-pointer relative z-50"
            onClick={() => handleNavClick('home')}
          >
            <Logo iconClassName="w-10 h-10 md:w-12 md:h-12" textClassName="text-2xl md:text-3xl hidden sm:block" />
          </div>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-2 bg-white/80 dark:bg-black/80 backdrop-blur-sm px-2 py-1.5 rounded-full border-2 border-black/10 dark:border-white/20 shadow-sm">
            {navLinks.map((link) => (
              <button
                key={link.name}
                onClick={() => handleNavClick(link.value)}
                className={`relative px-6 py-2.5 rounded-full font-bold text-sm transition-all duration-300 ${currentPage === link.value
                  ? 'text-white dark:text-black'
                  : 'text-black dark:text-white hover:text-black dark:hover:text-white'
                  }`}
              >
                <span className="relative z-10">{link.name}</span>
                {currentPage === link.value && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-black dark:bg-white rounded-full shadow-[2px_2px_0px_0px_rgba(100,100,100,0.5)]"
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
                )}
                {/* Hover Effect for non-active items */}
                {currentPage !== link.value && (
                  <motion.div
                    className="absolute inset-0 bg-piku-lime/50 rounded-full opacity-0 hover:opacity-100 transition-opacity duration-200 z-0 scale-90 hover:scale-100"
                    initial={false}
                  />
                )}
              </button>
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center gap-4">
            {/* Dark Mode Toggle */}
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-12 h-12 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
            >
              {isDark ? <Sun size={20} /> : <Moon size={20} />}
            </button>

            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                {/* Cart Button */}
                <button
                  onClick={() => setIsCartOpen(true)}
                  className="w-12 h-12 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none relative"
                >
                  <ShoppingBag size={20} />
                  {cart.length > 0 && (
                    <span className="absolute top-0 right-0 w-5 h-5 bg-piku-lime border-2 border-black rounded-full text-[10px] font-black text-black flex items-center justify-center transform translate-x-1 -translate-y-1">
                      {cart.length}
                    </span>
                  )}
                </button>

                {/* Notification Bell */}
                <div className="relative">
                  <button
                    onClick={() => setNotificationsOpen(!notificationsOpen)}
                    className="w-12 h-12 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-white dark:bg-black text-black dark:text-white hover:bg-gray-100 dark:hover:bg-zinc-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)] active:translate-x-[2px] active:translate-y-[2px] active:shadow-none"
                  >
                    <Bell size={20} />
                    <span className="absolute top-0 right-0 w-4 h-4 bg-piku-purple border-2 border-white dark:border-black rounded-full text-[10px] font-black text-white flex items-center justify-center transform translate-x-1 -translate-y-1">
                      3
                    </span>
                  </button>
                  <NotificationCenter isOpen={notificationsOpen} onClose={() => setNotificationsOpen(false)} />
                </div>

                {/* Profile Dropdown */}
                <div className="relative">
                  <button
                    onClick={() => setProfileMenuOpen(!profileMenuOpen)}
                    className="flex items-center gap-3 px-4 py-2 rounded-full border-2 border-black dark:border-white bg-white dark:bg-black hover:bg-gray-50 dark:hover:bg-zinc-800 transition-all shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
                  >
                    <div className="w-8 h-8 rounded-full border-2 border-black dark:border-white overflow-hidden">
                      <img src={user.avatar || `https://api.dicebear.com/7.x/avataaars/svg?seed=${user.email}`} alt={user.name} />
                    </div>
                    <span className="font-bold text-sm text-black dark:text-white hidden lg:block">{user.name}</span>
                  </button>

                  <AnimatePresence>
                    {profileMenuOpen && (
                      <motion.div
                        initial={{ opacity: 0, y: -10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: -10 }}
                        className="absolute right-0 mt-2 w-56 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-2xl shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,0.3)] overflow-hidden z-50"
                      >
                        <div className="p-4 border-b-2 border-black/10 dark:border-white/10">
                          <p className="font-black text-black dark:text-white">{user.name}</p>
                          <p className="text-sm font-bold text-gray-500 dark:text-gray-400">{user.email}</p>
                        </div>
                        <div className="p-2">
                          <button
                            onClick={() => { handleNavClick('dashboard'); setProfileMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left"
                          >
                            <User size={18} className="text-black dark:text-white" />
                            <span className="font-bold text-black dark:text-white">Dashboard</span>
                          </button>
                          <button
                            onClick={() => { handleNavClick('profile'); setProfileMenuOpen(false); }}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-gray-100 dark:hover:bg-zinc-800 transition-colors text-left"
                          >
                            <Settings size={18} className="text-black dark:text-white" />
                            <span className="font-bold text-black dark:text-white">Settings</span>
                          </button>
                          <button
                            onClick={handleLogout}
                            className="w-full flex items-center gap-3 px-4 py-3 rounded-xl hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-left"
                          >
                            <LogOut size={18} className="text-red-600 dark:text-red-400" />
                            <span className="font-bold text-red-600 dark:text-red-400">Logout</span>
                          </button>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>
            ) : (
              <>
                <Button
                  size="md"
                  variant="secondary"
                  className="hidden lg:inline-flex bg-white hover:bg-gray-50 font-bold border-2 border-black dark:border-white dark:bg-black dark:text-white dark:hover:bg-zinc-800 dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                  onClick={() => handleNavClick('login')}
                >
                  Log In
                </Button>
                <Button
                  size="md"
                  variant="primary"
                  onClick={() => handleNavClick('signup')}
                  className="dark:border-white dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                >
                  Get Started
                </Button>
              </>
            )}
          </div>

          {/* Mobile Toggle */}
          <div className="md:hidden flex items-center gap-4">
            <button
              onClick={() => setIsDark(!isDark)}
              className="w-10 h-10 rounded-full border-2 border-black dark:border-white flex items-center justify-center bg-white dark:bg-black text-black dark:text-white shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>
            <motion.button
              whileTap={{ scale: 0.9 }}
              className="relative z-50 text-black dark:text-white p-2 bg-white dark:bg-black border-2 border-black dark:border-white rounded-lg shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] active:shadow-none active:translate-x-[4px] active:translate-y-[4px] transition-all"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X size={24} strokeWidth={3} /> : <Menu size={24} strokeWidth={3} />}
            </motion.button>
          </div>
        </div>
      </motion.header>

      {/* Mobile Menu Overlay */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            animate={{ opacity: 1, clipPath: "circle(150% at 100% 0%)" }}
            exit={{ opacity: 0, clipPath: "circle(0% at 100% 0%)" }}
            transition={{ duration: 0.5, ease: "easeInOut" }}
            className="fixed inset-0 z-40 bg-piku-lime dark:bg-piku-purple flex flex-col"
          >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="flex flex-col gap-6 md:gap-8 items-center justify-center flex-1 pb-20 relative z-10 px-6">
              {navLinks.map((link, i) => (
                <motion.button
                  key={link.name}
                  custom={i}
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  onClick={() => handleNavClick(link.value)}
                  className="text-4xl md:text-6xl font-black italic text-black dark:text-white hover:text-white dark:hover:text-black transition-colors relative group"
                >
                  {link.name}
                  <span className="block h-2 w-0 bg-black dark:bg-white group-hover:w-full transition-all duration-300 mt-2"></span>
                </motion.button>
              ))}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
                className="flex flex-col gap-4 w-full max-w-sm mt-8 md:mt-12"
              >
                <Button className="w-full bg-white text-black border-2 border-black text-xl h-14 md:h-16 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]" variant="secondary" onClick={() => handleNavClick('login')}>Log In</Button>
                <Button className="w-full bg-black text-white hover:bg-gray-900 border-none text-xl h-14 md:h-16 shadow-[6px_6px_0px_0px_rgba(255,255,255,0.5)]" variant="dark" onClick={() => handleNavClick('signup')}>Get Started</Button>
              </motion.div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;