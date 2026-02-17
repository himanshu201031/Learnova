import React from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import {
    Search,
    Gamepad2,
    TrendingUp,
    Trophy,
    Users,
    Star,
    Sparkles,
    Smartphone,
    Award,
    Video,
    ArrowUpRight,
    Zap,
    Layout,
    Box,
    Layers,
    Fingerprint,
    Shield,
    Globe,
    Code,
    Terminal
} from 'lucide-react';
import Button from '../ui/Button';

// Enhanced Feature Data
const featuresData = [
    {
        title: "Course Catalog",
        desc: "Browse 850+ courses by category, difficulty, or instructor.",
        icon: Search,
        span: "md:col-span-2",
        color: "bg-piku-lime",
        stat: "850+"
    },
    {
        title: "Interactive Labs",
        desc: "Embedded quizzes & live code sandboxes.",
        icon: Gamepad2,
        span: "md:col-span-1",
        color: "bg-white dark:bg-zinc-900",
        stat: "v2.4"
    },
    {
        title: "Progress Dashboard",
        desc: "Visual charts, heatmaps & learning streaks.",
        icon: TrendingUp,
        span: "md:col-span-1",
        color: "bg-piku-cyan",
        stat: "LIVE"
    },
    {
        title: "Gamification Engine",
        desc: "Global leaderboards, badges & XP system.",
        icon: Trophy,
        span: "md:col-span-2",
        color: "bg-piku-purple text-white",
        stat: "#1 RANK"
    },
    {
        title: "Community Forums",
        desc: "Collaborate, ask questions, find peers.",
        icon: Users,
        span: "md:col-span-1",
        color: "bg-white dark:bg-zinc-900",
        stat: "ONLINE"
    },
    {
        title: "Pro Mentors",
        desc: "Verified instructor ratings & 1-on-1 booking.",
        icon: Star,
        span: "md:col-span-1",
        color: "bg-piku-cream",
        stat: "5.0"
    },
    {
        title: "AI Recommendations",
        desc: "Smart learning path suggestions tailored to you.",
        icon: Sparkles,
        span: "md:col-span-2",
        color: "bg-black text-white dark:bg-white dark:text-black",
        stat: "BETA"
    },
    {
        title: "Mobile Native",
        desc: "Seamless responsive UI for iOS & Android.",
        icon: Smartphone,
        span: "md:col-span-1",
        color: "bg-white dark:bg-zinc-900",
        stat: "iOS/AND"
    },
    {
        title: "Verified Certs",
        desc: "Blockchain-backed secure certificates.",
        icon: Award,
        span: "md:col-span-1",
        color: "bg-orange-300",
        stat: "SECURE"
    },
    {
        title: "4K Live Streams",
        desc: "Real-time sessions with near-zero latency.",
        icon: Video,
        span: "md:col-span-2",
        color: "bg-white dark:bg-zinc-900",
        stat: "60FPS"
    }
];

const FeatureCard: React.FC<{ feature: any; index: number }> = ({ feature, index }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.05 }}
            whileHover={{ y: -8, rotate: 1 }}
            className={`group relative ${feature.color} border-4 border-black dark:border-white ${feature.span} min-h-[320px] overflow-hidden rounded-[2.5rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] hover:shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:hover:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] transition-all duration-300 flex flex-col justify-between p-8`}
        >
            {/* Background Pattern */}
            <div className="absolute inset-0 opacity-10 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-14 h-14 rounded-2xl border-2 border-current flex items-center justify-center transition-transform duration-300 group-hover:scale-110 group-hover:rotate-12 bg-white/20 backdrop-blur-sm shadow-sm`}>
                        <feature.icon size={28} strokeWidth={2.5} />
                    </div>
                    <div className="font-black text-xs uppercase tracking-widest border-2 border-current px-3 py-1 rounded-full bg-white/20 backdrop-blur-sm">
                        {feature.stat}
                    </div>
                </div>

                <h3 className="font-black text-3xl md:text-3xl lg:text-4xl mb-3 leading-tight tracking-tight">
                    {feature.title}
                </h3>
                <p className="font-bold text-lg opacity-80 leading-relaxed max-w-[90%]">
                    {feature.desc}
                </p>
            </div>

            <div className="relative z-10 flex items-center justify-end mt-4">
                <motion.button
                    whileHover={{ scale: 1.2 }}
                    className="w-12 h-12 rounded-full bg-black text-white dark:bg-white dark:text-black flex items-center justify-center border-2 border-transparent group-hover:border-white/50"
                >
                    <ArrowUpRight size={24} />
                </motion.button>
            </div>
        </motion.div>
    );
};

import { Page } from '../../types';

interface FeaturesPageProps {
    onNavigate: (page: Page) => void;
}

const FeaturesPage: React.FC<FeaturesPageProps> = ({ onNavigate }) => {
    const { scrollY } = useScroll();
    const yText = useTransform(scrollY, [0, 500], [0, 100]);

    return (
        <div className="min-h-screen bg-piku-cream dark:bg-black text-black dark:text-white font-sans transition-colors duration-500 overflow-x-hidden">

            {/* Hero Section */}
            <section className="relative pt-40 pb-32 overflow-hidden flex flex-col justify-center border-b-4 border-black dark:border-white bg-white dark:bg-zinc-900">
                <div className="absolute inset-0 opacity-5" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '40px 40px' }}></div>

                <div className="container mx-auto px-6 relative z-10 text-center">
                    <motion.div
                        initial={{ opacity: 0, scale: 0.9, rotate: -3 }}
                        animate={{ opacity: 1, scale: 1, rotate: -3 }}
                        className="inline-flex items-center gap-3 mb-8 px-6 py-3 border-4 border-black dark:border-white rounded-full bg-piku-lime text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)]"
                    >
                        <Zap size={20} className="fill-black" />
                        <span className="font-black text-sm tracking-widest uppercase">System Operational</span>
                    </motion.div>

                    <h1 className="text-6xl md:text-9xl lg:text-[10rem] font-black mb-8 leading-[0.85] tracking-tighter">
                        <motion.div style={{ y: yText }} className="relative z-10 flex flex-col items-center">
                            <span className="block text-black dark:text-white mix-blend-difference">UNLEASH</span>
                            <span className="block text-transparent bg-clip-text bg-gradient-to-b from-piku-purple to-blue-600 dark:from-piku-lime dark:to-green-400">POWERFUL</span>
                            <span className="block text-black dark:text-white text-stroke-black dark:text-stroke-white" style={{ WebkitTextStroke: '2px currentColor', color: 'transparent' }}>FEATURES</span>
                        </motion.div>
                    </h1>

                    <p className="text-xl md:text-3xl font-bold text-gray-500 dark:text-gray-400 max-w-3xl mx-auto mb-12 leading-relaxed">
                        We've built the ultimate learning engine. <br className="hidden md:block" />
                        <span className="mx-1 text-black dark:text-white bg-piku-cyan px-2 inline-block -rotate-2">Fast.</span>
                        <span className="mx-1 text-black dark:text-white bg-piku-lime px-2 inline-block rotate-2">Interactive.</span>
                        <span className="mx-1 text-white bg-black px-2 inline-block -rotate-1">Obsessive.</span>
                    </p>

                    <div className="flex justify-center gap-6">
                        <Button onClick={() => onNavigate('courses')} size="lg" className="h-20 px-12 text-xl bg-black text-white hover:bg-piku-lime hover:text-black border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                            Start Exploring <ArrowUpRight className="ml-2" size={24} />
                        </Button>
                    </div>
                </div>
            </section>

            {/* Tech Stack Marquee */}
            <section className="py-10 bg-piku-purple border-b-4 border-black dark:border-white overflow-hidden transform -skew-y-2 origin-top-left scale-110">
                <div className="flex animate-marquee whitespace-nowrap">
                    {Array(10).fill(['REACT', 'NEXT.JS', 'TYPESCRIPT', 'NODE.JS', 'PYTHON', 'DOCKER', 'AWS', 'GRAPHQL']).flat().map((tech, i) => (
                        <span key={i} className="mx-8 text-4xl font-black text-white italic opacity-50 hover:opacity-100 transition-opacity cursor-default">
                            {tech}
                        </span>
                    ))}
                </div>
            </section>

            {/* Main Features Grid */}
            <section className="py-32 relative z-20">
                <div className="container mx-auto px-6">
                    <div className="flex flex-col md:flex-row items-end justify-between mb-16 border-b-4 border-black/10 dark:border-white/10 pb-8 gap-8">
                        <div className="max-w-xl">
                            <h2 className="text-5xl md:text-6xl font-black italic mb-4 text-black dark:text-white tracking-tighter">SYSTEM MODULES</h2>
                            <p className="text-xl font-bold text-gray-500">Explore the core components of the Learnova engine.</p>
                        </div>
                        <div className="hidden md:flex gap-4">
                            <Layout size={40} className="text-black dark:text-white" />
                            <Box size={40} className="text-piku-lime" />
                            <Layers size={40} className="text-piku-purple" />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 auto-rows-fr">
                        {featuresData.map((feature, idx) => (
                            <FeatureCard key={idx} feature={feature} index={idx} />
                        ))}
                    </div>

                    {/* Security/Trust Block */}
                    <div className="mt-32 grid md:grid-cols-3 gap-8">
                        {[
                            { icon: Shield, title: "Enterprise Security", desc: "Bank-grade encryption for your data." },
                            { icon: Globe, title: "Global CDN", desc: "Lightning fast content delivery anywhere." },
                            { icon: Code, title: "Clean Architecture", desc: "Built on modern, scalable tech stack." }
                        ].map((item, i) => (
                            <motion.div
                                key={i}
                                whileHover={{ y: -5 }}
                                className="bg-white dark:bg-zinc-900 border-4 border-black dark:border-white p-8 rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]"
                            >
                                <item.icon size={40} className="mb-4 text-piku-purple" strokeWidth={2} />
                                <h3 className="text-2xl font-black mb-2 dark:text-white">{item.title}</h3>
                                <p className="font-bold text-gray-500">{item.desc}</p>
                            </motion.div>
                        ))}
                    </div>

                    {/* CTA Block */}
                    <div className="mt-32 rounded-[3rem] border-4 border-black dark:border-white bg-white dark:bg-zinc-900 p-12 md:p-24 text-center relative overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] group">
                        <div className="relative z-10">
                            <motion.div
                                initial={{ scale: 0.8, opacity: 0 }}
                                whileInView={{ scale: 1, opacity: 1 }}
                                className="inline-block p-6 rounded-full bg-black dark:bg-white text-white dark:text-black mb-8"
                            >
                                <Terminal size={60} strokeWidth={1.5} />
                            </motion.div>
                            <h2 className="text-6xl md:text-8xl font-black text-black dark:text-white mb-8 tracking-tighter leading-none">
                                ACCESS <br />
                                <span className="text-transparent bg-clip-text bg-gradient-to-r from-piku-purple to-piku-cyan">GRANTED</span>
                            </h2>
                            <Button onClick={() => onNavigate('login')} size="lg" className="bg-piku-cyan text-black border-4 border-black text-2xl px-16 h-20 shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] hover:shadow-none hover:translate-x-2 hover:translate-y-2">
                                Enter Platform
                            </Button>
                        </div>
                        {/* Decoration */}
                        <div className="absolute top-0 left-0 w-full h-4 bg-piku-purple border-b-4 border-black"></div>
                        <div className="absolute bottom-0 left-0 w-full h-4 bg-piku-lime border-t-4 border-black"></div>

                        {/* Animated Background */}
                        <div className="absolute inset-x-0 bottom-0 h-1/2 bg-gradient-to-t from-gray-100 to-transparent dark:from-zinc-800 opacity-50 group-hover:h-full transition-all duration-700 ease-in-out"></div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default FeaturesPage;