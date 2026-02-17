import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Page } from '../../types';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';
import { ArrowLeft, Star, Zap, Lock } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface LoginProps {
    onNavigate: (page: Page) => void;
}

const Login: React.FC<LoginProps> = ({ onNavigate }) => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { login, signInWithGoogle, signInWithGithub } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            await login(email, password);
            // Redirect to dashboard on successful login
            onNavigate('dashboard');
        } catch (err) {
            setError('Invalid email or password');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-piku-cream dark:bg-black transition-colors duration-500 font-sans">
            {/* Left Side - Neo-Brutalist Artwork */}
            <div className="hidden lg:flex w-1/2 bg-piku-lime border-r-4 border-black relative overflow-hidden flex-col justify-between p-12">
                {/* Pattern Background */}
                <div className="absolute inset-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle, #000 2px, transparent 2px)', backgroundSize: '40px 40px' }}></div>

                {/* Floating Elements */}
                <motion.div
                    animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
                    transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-32 h-32 bg-piku-purple rounded-full border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center z-10"
                >
                    <Star size={60} className="text-white fill-white" />
                </motion.div>

                <motion.div
                    animate={{ y: [0, 30, 0], rotate: [0, -10, 0] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute bottom-40 left-20 w-24 h-24 bg-piku-cyan transform rotate-12 border-4 border-black shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center z-10"
                >
                    <Zap size={40} className="text-black fill-black" />
                </motion.div>

                {/* Content */}
                <div className="relative z-20">
                    <Logo iconClassName="w-16 h-16" textClassName="text-4xl" />
                </div>

                <div className="relative z-20 max-w-xl">
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-white border-4 border-black p-8 shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] rounded-3xl transform -rotate-2"
                    >
                        <h1 className="text-6xl font-black italic mb-4 leading-[0.9] tracking-tighter">
                            WELCOME <br /> BACK.
                        </h1>
                        <p className="text-xl font-bold border-l-4 border-black pl-4">
                            "Learning is the only thing the mind never exhausts, never fears, and never regrets."
                        </p>
                    </motion.div>
                </div>

                <div className="relative z-20 font-mono text-sm font-bold tracking-widest">
                    SECURE_LOGIN_v2.0 // ENCRYPTED
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20 relative bg-white dark:bg-zinc-900">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => onNavigate('home')}
                    className="absolute top-8 left-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black dark:text-white hover:text-piku-purple transition-colors group z-30"
                >
                    <div className="w-10 h-10 bg-white dark:bg-black rounded-full border-2 border-black dark:border-white flex items-center justify-center group-hover:-translate-x-1 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                        <ArrowLeft size={16} strokeWidth={3} />
                    </div>
                    Back to Home
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, y: 50 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-full max-w-md relative"
                >
                    {/* Decoration behind form */}
                    <div className="absolute -top-12 -right-12 w-24 h-24 bg-piku-yellow rounded-full border-4 border-black opacity-20 animate-bounce hidden md:block"></div>

                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-5xl md:text-6xl font-black mb-4 text-black dark:text-white tracking-tighter italic uppercase">Entrance</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                            Instant access to your learning galaxy.
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-4 border-red-600 rounded-xl">
                            <p className="text-red-600 font-bold text-center">{error}</p>
                        </div>
                    )}

                    <div className="space-y-4">
                        <button
                            onClick={() => signInWithGoogle()}
                            className="w-full flex items-center justify-center gap-4 px-6 py-8 border-4 border-black dark:border-white rounded-3xl font-black text-2xl hover:bg-piku-lime dark:hover:bg-piku-lime hover:text-black transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] bg-white dark:bg-black group"
                        >
                            <span className="w-10 h-10 flex items-center justify-center bg-white rounded-full border-2 border-black group-hover:scale-110 transition-transform">
                                <img src="https://www.google.com/favicon.ico" alt="Google" className="w-6 h-6" />
                            </span>
                            Sign in with Google
                        </button>

                        <button
                            onClick={() => signInWithGithub()}
                            className="w-full flex items-center justify-center gap-4 px-6 py-8 border-4 border-black dark:border-white rounded-3xl font-black text-2xl hover:bg-piku-purple dark:hover:bg-piku-purple hover:text-white transition-all shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] bg-white dark:bg-black group"
                        >
                            <span className="w-10 h-10 flex items-center justify-center bg-black rounded-full border-2 border-white group-hover:scale-110 transition-transform">
                                <img src="https://github.com/favicon.ico" alt="GitHub" className="w-6 h-6 invert" />
                            </span>
                            Sign in with GitHub
                        </button>
                    </div>

                    <div className="mt-12 text-center text-xs font-bold text-gray-500 uppercase tracking-widest opacity-50">
                        Secure Authentication by Supabase
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Login;