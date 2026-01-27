
import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Page } from '../../types';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';
import { ArrowLeft, Rocket, Check, Sparkles, Zap } from 'lucide-react';
import { useAuth } from '../../contexts/AuthContext';

interface SignupProps {
    onNavigate: (page: Page) => void;
}

const Signup: React.FC<SignupProps> = ({ onNavigate }) => {
    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const { signup } = useAuth();

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const fullName = `${firstName} ${lastName}`.trim();
            await signup(email, password, fullName);
            // Redirect to dashboard on successful signup
            onNavigate('dashboard');
        } catch (err) {
            setError('Failed to create account. Please try again.');
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex bg-white dark:bg-black transition-colors duration-500 font-sans">
            {/* Left Side - Artwork */}
            <div className="hidden lg:flex w-1/2 bg-piku-purple border-r-4 border-black relative overflow-hidden flex-col justify-between p-12">
                {/* Animated Grid */}
                <div className="absolute inset-0 opacity-20"
                    style={{
                        backgroundImage: 'linear-gradient(#000 2px, transparent 2px), linear-gradient(90deg, #000 2px, transparent 2px)',
                        backgroundSize: '60px 60px'
                    }}>
                </div>

                {/* High Contrast Black & Lime Marquee */}
                <div className="absolute top-1/2 left-[-20%] w-[140%] bg-black border-y-[8px] border-piku-lime transform rotate-6 shadow-[0px_20px_40px_rgba(0,0,0,0.5)] z-10 py-5 overflow-hidden">
                    {/* Diagonal Stripes Pattern Overlay */}
                    <div className="absolute inset-0 opacity-20 pointer-events-none" style={{ backgroundImage: 'repeating-linear-gradient(45deg, #333 0, #333 10px, transparent 0, transparent 20px)' }}></div>

                    <div className="flex animate-marquee whitespace-nowrap relative z-10">
                        {[...Array(10)].map((_, i) => (
                            <div key={i} className="flex items-center mx-6">
                                <span className="text-5xl font-black italic text-piku-lime uppercase tracking-tighter mr-4">JOIN THE REVOLUTION</span>
                                <span className="text-5xl font-black italic text-transparent uppercase tracking-tighter text-stroke-white" style={{ WebkitTextStroke: '2px white' }}>JOIN THE REVOLUTION</span>
                                <Zap className="mx-8 w-10 h-10 fill-piku-lime text-piku-lime animate-pulse" />
                            </div>
                        ))}
                    </div>
                </div>

                {/* Floating Rocket */}
                <motion.div
                    animate={{ y: [0, -40, 0], x: [0, 20, 0] }}
                    transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-20 right-20 w-40 h-40 bg-white rounded-full border-4 border-black shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] flex items-center justify-center z-20"
                >
                    <Rocket size={60} className="text-black fill-piku-cyan" />
                </motion.div>

                <div className="relative z-20">
                    <Logo iconClassName="w-16 h-16" textClassName="text-4xl" color="white" />
                </div>

                <div className="relative z-20 mt-auto">
                    <div className="flex gap-4 mb-6">
                        {['Coding', 'Design', 'Business'].map((tag, i) => (
                            <span key={i} className="bg-black text-white px-4 py-2 rounded-full font-bold border-2 border-white/20 shadow-lg text-sm uppercase tracking-wider hover:scale-105 transition-transform cursor-default">
                                {tag}
                            </span>
                        ))}
                    </div>
                    <h1 className="text-7xl font-black text-white italic leading-[0.85] tracking-tighter drop-shadow-[4px_4px_0px_rgba(0,0,0,1)]">
                        START <br /> YOUR <br /> JOURNEY.
                    </h1>
                </div>
            </div>

            {/* Right Side - Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-6 lg:p-20 relative bg-white dark:bg-zinc-900">
                <motion.button
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    onClick={() => onNavigate('home')}
                    className="absolute top-8 left-8 flex items-center gap-2 text-sm font-black uppercase tracking-widest text-black dark:text-white hover:text-piku-lime transition-colors group z-30"
                >
                    <div className="w-10 h-10 bg-white dark:bg-black rounded-full border-2 border-black dark:border-white flex items-center justify-center group-hover:-translate-x-1 transition-transform shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] dark:shadow-[2px_2px_0px_0px_rgba(255,255,255,1)]">
                        <ArrowLeft size={16} strokeWidth={3} />
                    </div>
                    Back
                </motion.button>

                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5, type: "spring" }}
                    className="w-full max-w-lg"
                >
                    <div className="mb-10 text-center lg:text-left">
                        <h2 className="text-5xl md:text-6xl font-black mb-4 text-black dark:text-white tracking-tighter italic">SIGN UP</h2>
                        <p className="text-gray-500 dark:text-gray-400 font-bold text-lg">
                            Already have an account? <button onClick={() => onNavigate('login')} className="text-black dark:text-white underline decoration-4 decoration-piku-purple underline-offset-4 hover:bg-piku-purple hover:text-white hover:decoration-transparent transition-all px-1">Log In</button>
                        </p>
                    </div>

                    {error && (
                        <div className="mb-6 p-4 bg-red-100 border-4 border-red-600 rounded-xl">
                            <p className="text-red-600 font-bold text-center">{error}</p>
                        </div>
                    )}

                    <form onSubmit={handleSubmit} className="space-y-6">
                        <div className="grid grid-cols-2 gap-6">
                            <div className="group">
                                <label className="block text-xs font-black mb-2 uppercase tracking-widest text-black dark:text-white">First Name</label>
                                <input
                                    type="text"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                    required
                                    className="w-full px-4 py-4 rounded-xl border-4 border-black dark:border-white dark:bg-black dark:text-white focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] focus:-translate-y-1 transition-all font-bold text-lg"
                                    placeholder="Jane"
                                />
                            </div>
                            <div className="group">
                                <label className="block text-xs font-black mb-2 uppercase tracking-widest text-black dark:text-white">Last Name</label>
                                <input
                                    type="text"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    required
                                    className="w-full px-4 py-4 rounded-xl border-4 border-black dark:border-white dark:bg-black dark:text-white focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] focus:-translate-y-1 transition-all font-bold text-lg"
                                    placeholder="Doe"
                                />
                            </div>
                        </div>

                        <div className="group">
                            <label className="block text-xs font-black mb-2 uppercase tracking-widest text-black dark:text-white">Email Address</label>
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                className="w-full px-5 py-4 rounded-xl border-4 border-black dark:border-white dark:bg-black dark:text-white focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] focus:-translate-y-1 transition-all font-bold text-lg"
                                placeholder="name@example.com"
                            />
                        </div>

                        <div className="group">
                            <label className="block text-xs font-black mb-2 uppercase tracking-widest text-black dark:text-white">Password</label>
                            <input
                                type="password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                required
                                minLength={8}
                                className="w-full px-5 py-4 rounded-xl border-4 border-black dark:border-white dark:bg-black dark:text-white focus:outline-none focus:shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:focus:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] focus:-translate-y-1 transition-all font-bold text-lg"
                                placeholder="••••••••"
                            />
                            <div className="mt-2 flex gap-2">
                                {['8+ chars', 'Number', 'Symbol'].map(req => (
                                    <span key={req} className="text-[10px] font-bold uppercase bg-gray-100 dark:bg-zinc-800 text-gray-400 px-2 py-1 rounded flex items-center gap-1">
                                        <div className="w-1.5 h-1.5 rounded-full bg-gray-300"></div> {req}
                                    </span>
                                ))}
                            </div>
                        </div>

                        <motion.div
                            className="pt-4"
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                        >
                            <Button
                                type="submit"
                                disabled={loading}
                                className="w-full text-xl py-6 h-auto shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:shadow-none hover:translate-x-[4px] hover:translate-y-[4px] bg-piku-lime text-black border-black dark:border-white disabled:opacity-50"
                                size="lg"
                            >
                                {loading ? 'Creating Account...' : 'Create Account'}
                            </Button>
                        </motion.div>
                    </form>

                    <div className="mt-6 text-xs text-center font-bold text-gray-500 dark:text-gray-400">
                        By joining, you agree to our Terms and Privacy Policy.
                    </div>
                </motion.div>
            </div>
        </div>
    );
};

export default Signup;
