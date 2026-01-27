
import React, { useRef, useState, useEffect } from 'react';
import { motion, useMotionValue, useSpring, useMotionTemplate, useTransform, useScroll } from 'framer-motion';
import { Video, Award, Users, Smartphone, Code, MessageCircle, ArrowRight, Layers, Box, Cpu, Terminal, Binary, Search, Activity, Target } from 'lucide-react';

const features = [
    { icon: Video, label: "4K Video Streams", desc: "Adaptive bitrate streaming for crystal clear learning.", span: "col-span-1 md:col-span-2 lg:col-span-4", stat: 4000, statLabel: "Pixels/Frame", color: "bg-white dark:bg-zinc-900", neon: "shadow-[0_0_20px_rgba(255,255,255,0.3)]" },
    { icon: Code, label: "Cloud IDE", desc: "Code directly in your browser with zero setup.", span: "col-span-1 md:col-span-2", stat: 0, statLabel: "Setup Time", color: "bg-black text-white dark:bg-white dark:text-black", inverse: true, neon: "shadow-[0_0_20px_rgba(0,0,0,0.5)] dark:shadow-[0_0_20px_rgba(255,255,255,0.8)]" },
    { icon: Smartphone, label: "Mobile First", desc: "Sync progress across iOS, Android, and Web.", span: "col-span-1 md:col-span-2 lg:col-span-3", stat: 100, statLabel: "% Synced", color: "bg-piku-cream dark:bg-zinc-800", neon: "shadow-[0_0_20px_rgba(254,248,230,0.5)]" },
    { icon: Award, label: "Certificates", desc: "Blockchain-verified certificates for LinkedIn.", span: "col-span-1 md:col-span-2 lg:col-span-3", stat: 50, statLabel: "Partners", color: "bg-piku-purple text-white", darkText: true, neon: "shadow-[0_0_20px_rgba(168,85,247,0.6)]" },
    { icon: Users, label: "Community", desc: "Join study groups and peer reviews.", span: "col-span-1 md:col-span-2", stat: 1000000, statLabel: "Peers", color: "bg-piku-cyan dark:bg-zinc-900", neon: "shadow-[0_0_20px_rgba(46,212,224,0.4)]" },
    { icon: MessageCircle, label: "Mentor Chat", desc: "Get unblocked fast with 1:1 expert help.", span: "col-span-1 md:col-span-2 lg:col-span-4", stat: 15, statLabel: "Min Response", color: "bg-piku-lime dark:bg-zinc-800", neon: "shadow-[0_0_20px_rgba(214,243,47,0.4)]" },
];

const CountUp: React.FC<{ end: number; duration?: number }> = ({ end, duration = 2 }) => {
    const [count, setCount] = useState(0);
    const nodeRef = useRef(null);

    useEffect(() => {
        const observer = new IntersectionObserver(
            (entries) => {
                if (entries[0].isIntersecting) {
                    let start = 0;
                    const increment = end / (duration * 60);
                    const timer = setInterval(() => {
                        start += increment;
                        if (start >= end) {
                            clearInterval(timer);
                            setCount(end);
                        } else {
                            setCount(Math.floor(start));
                        }
                    }, 1000 / 60);
                    observer.disconnect();
                }
            },
            { threshold: 0.5 }
        );

        if (nodeRef.current) observer.observe(nodeRef.current);
        return () => observer.disconnect();
    }, [end, duration]);

    return <span ref={nodeRef}>{count.toLocaleString()}{end === 0 ? '' : '+'}</span>;
};

const FeatureCard: React.FC<{ feature: any; index: number }> = ({ feature, index }) => {
    const ref = useRef<HTMLDivElement>(null);
    const x = useMotionValue(0);
    const y = useMotionValue(0);
    const mouseX = useSpring(x, { stiffness: 500, damping: 100 });
    const mouseY = useSpring(y, { stiffness: 500, damping: 100 });

    function onMouseMove({ currentTarget, clientX, clientY }: React.MouseEvent) {
        const { left, top, width, height } = currentTarget.getBoundingClientRect();
        x.set((clientX - left) / width - 0.5);
        y.set((clientY - top) / height - 0.5);
    }

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, scale: 0.95, y: 30 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true, margin: "-50px" }}
            transition={{ delay: index * 0.1, duration: 0.6, type: "spring" }}
            onMouseMove={onMouseMove}
            onMouseLeave={() => { x.set(0); y.set(0); }}
            className={`group relative ${feature.color} rounded-[2rem] p-8 border-2 border-black/10 dark:border-white/10 ${feature.span} min-h-[320px] flex flex-col justify-between overflow-hidden cursor-crosshair`}
        >
            {/* Dynamic Border Gradient */}
            <motion.div
                className="absolute -inset-[2px] rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity duration-500 z-0 bg-gradient-to-r from-transparent via-black/20 to-transparent dark:via-white/20"
                style={{
                    background: useMotionTemplate`linear-gradient(${mouseX}deg, transparent, rgba(0,0,0,0.2) 50%, transparent)`
                }}
            />

            {/* Cyber Grid Background */}
            <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.1] pointer-events-none" style={{ backgroundImage: 'linear-gradient(#000 1px, transparent 1px), linear-gradient(90deg, #000 1px, transparent 1px)', backgroundSize: '20px 20px' }}></div>

            {/* Scanning Line Effect */}
            <motion.div
                className="absolute top-0 left-0 w-full h-[2px] bg-current opacity-0 group-hover:opacity-20 z-10"
                animate={{ top: ['0%', '100%', '0%'] }}
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }}
            />

            <div className="relative z-10">
                <div className="flex justify-between items-start mb-6">
                    <div className={`w-16 h-16 rounded-2xl border-2 border-current flex items-center justify-center transition-all duration-300 group-hover:rotate-12 group-hover:scale-110 shadow-lg ${feature.inverse ? 'bg-white text-black' : 'bg-white dark:bg-white/10'}`}>
                        <feature.icon size={32} strokeWidth={2} className="opacity-80 group-hover:opacity-100" />
                    </div>
                    {/* Tech Decor */}
                    <div className="flex gap-1">
                        <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
                        <div className="w-2 h-2 rounded-full bg-current opacity-30"></div>
                    </div>
                </div>

                <h3 className={`font-black text-3xl md:text-4xl leading-tight mb-3 ${feature.darkText ? 'text-white' : 'text-black dark:text-white'} ${feature.inverse ? 'text-white dark:text-black' : ''}`}>
                    {feature.label}
                </h3>
                <p className={`font-bold text-base md:text-lg leading-relaxed max-w-sm opacity-60 group-hover:opacity-90 transition-opacity ${feature.darkText ? 'text-white' : 'text-black dark:text-white'} ${feature.inverse ? 'text-white dark:text-black' : ''}`}>
                    {feature.desc}
                </p>
            </div>

            <div className="relative z-10 mt-8 flex items-end justify-between border-t border-current/10 pt-6">
                <div>
                    <div className={`text-4xl md:text-6xl font-black tracking-tighter tabular-nums ${feature.darkText ? 'text-white' : 'text-black dark:text-white'} ${feature.inverse ? 'text-white dark:text-black' : ''}`}>
                        <CountUp end={feature.stat} />
                    </div>
                    <div className={`text-[10px] font-black uppercase tracking-[0.2em] mt-1 opacity-50 ${feature.darkText ? 'text-white' : 'text-black dark:text-white'} ${feature.inverse ? 'text-white dark:text-black' : ''}`}>
                        {feature.statLabel}
                    </div>
                </div>

                <div className={`w-12 h-12 rounded-full border-2 border-current flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-4 group-hover:translate-x-0 -rotate-45 group-hover:rotate-0`}>
                    <ArrowRight size={24} />
                </div>
            </div>
        </motion.div>
    );
};

const Features: React.FC = () => {
    const containerRef = useRef<HTMLDivElement>(null);
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start end", "end start"]
    });

    const rotate = useTransform(scrollYProgress, [0, 1], [0, 360]);
    const scale = useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1.2, 0.8]);

    return (
        <section ref={containerRef} id="features" className="py-32 bg-gray-50 dark:bg-black transition-colors duration-500 overflow-hidden relative">

            {/* Background Decorative Element */}
            <motion.div
                style={{ rotate, scale }}
                className="absolute top-1/4 -right-20 w-[600px] h-[600px] border-[40px] border-black/5 dark:border-white/5 rounded-full pointer-events-none z-0 flex items-center justify-center"
            >
                <div className="w-1/2 h-1/2 border-[20px] border-black/5 dark:border-white/5 rounded-full" />
            </motion.div>

            {/* Moving Background Tape / Ticker */}
            <div className="absolute top-40 -left-10 w-[110%] -rotate-2 z-0 opacity-[0.03] dark:opacity-[0.08] pointer-events-none overflow-hidden select-none">
                <div className="flex animate-marquee whitespace-nowrap text-[15rem] font-black text-black dark:text-white uppercase tracking-tighter">
                    <span>SYSTEM_CRITICAL // </span>
                    <span>USER_OBSESSED // </span>
                    <span>ENGINE_READY // </span>
                    <span>SYSTEM_CRITICAL // </span>
                </div>
            </div>

            <div className="container mx-auto px-6 relative z-10">
                <div className="flex flex-col lg:flex-row lg:items-center justify-between mb-24 gap-12">
                    <motion.div
                        initial={{ opacity: 0, x: -30 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        className="max-w-4xl"
                    >
                        <motion.div
                            whileHover={{ scale: 1.05, x: 5 }}
                            className="inline-flex items-center gap-3 mb-8 bg-white dark:bg-zinc-900 border-2 border-black dark:border-white px-5 py-2 rounded-full shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] cursor-pointer transition-all active:translate-x-1 active:translate-y-1 active:shadow-none"
                        >
                            <div className="w-6 h-6 bg-piku-purple rounded-full flex items-center justify-center animate-pulse">
                                <Activity size={12} className="text-white" />
                            </div>
                            <span className="font-black text-xs uppercase tracking-widest text-black dark:text-white">SYSTEM STATUS: OPTIMIZED</span>
                        </motion.div>

                        <h2 className="text-7xl md:text-9xl lg:text-[10rem] font-black text-black dark:text-white leading-[0.8] tracking-tighter mb-8">
                            <span className="relative">
                                BUILT FOR
                                <motion.span
                                    initial={{ width: 0 }}
                                    whileInView={{ width: '100%' }}
                                    transition={{ duration: 1, delay: 0.5 }}
                                    className="absolute -bottom-2 left-0 h-4 bg-piku-lime/40 dark:bg-piku-lime/20 -z-10"
                                />
                            </span> <br />
                            <span className="text-transparent bg-clip-text bg-gradient-to-r from-piku-purple via-piku-cyan to-piku-lime italic pr-4 relative">
                                OBSESSIVE
                                <div className="absolute -top-4 -right-8 w-16 h-16 border-2 border-black dark:border-white rounded-full flex items-center justify-center animate-spin-slow opacity-20">
                                    <Binary size={24} className="text-black dark:text-white" />
                                </div>
                            </span> <br />
                            LEARNERS<span className="text-piku-cyan">.</span>
                        </h2>

                        <div className="flex flex-wrap gap-4 items-center">
                            <div className="flex -space-x-3">
                                {[1, 2, 3, 4].map(i => (
                                    <div key={i} className="w-12 h-12 rounded-full border-2 border-black dark:border-white bg-gray-200 overflow-hidden shadow-sm">
                                        <img src={`https://api.dicebear.com/7.x/avataaars/svg?seed=${i * 123}`} alt="User" />
                                    </div>
                                ))}
                            </div>
                            <p className="text-xl font-bold text-gray-500 dark:text-gray-400">
                                Join <span className="text-black dark:text-white underline decoration-piku-lime decoration-4">12,402</span> learners currently online
                            </p>
                        </div>
                    </motion.div>

                    {/* Desktop Side Motif */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        className="hidden xl:flex flex-col gap-6"
                    >
                        <div className="p-6 bg-white dark:bg-zinc-900 border-4 border-black dark:border-white rounded-[2rem] shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)]">
                            <div className="flex items-center gap-4 mb-4">
                                <Terminal size={24} className="text-piku-purple" />
                                <span className="font-mono text-sm font-bold uppercase tracking-tighter">Terminal_v4.0</span>
                            </div>
                            <div className="space-y-2 font-mono text-xs opacity-60">
                                <p className="">&gt; Loading learning_engine...</p>
                                <p className="">&gt; Modules loaded: 14/14</p>
                                <p className="text-piku-green">&gt; Status: Ready to execute</p>
                            </div>
                        </div>
                        <div className="flex gap-4">
                            <div className="w-20 h-20 bg-piku-cyan rounded-3xl border-4 border-black flex items-center justify-center animate-bounce">
                                <Target size={32} />
                            </div>
                            <div className="w-20 h-20 bg-piku-lime rounded-full border-4 border-black flex items-center justify-center animate-spin-slow">
                                <Cpu size={32} />
                            </div>
                        </div>
                    </motion.div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-6 gap-6 max-w-[1400px] mx-auto perspective-1000">
                    {features.map((feature, index) => (
                        <FeatureCard key={index} feature={feature} index={index} />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Features;
