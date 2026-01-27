import React, { useRef, useState, useLayoutEffect, useEffect } from 'react';
import { motion, useScroll, useTransform, useSpring } from 'framer-motion';
import { Star, Users, TrendingUp, ArrowUpRight, Shield, Database, Cloud, Code, Terminal, Cpu, Globe, Zap } from 'lucide-react';

// Logo Component
const SkillLogo: React.FC<{ name: string; className?: string }> = ({ name, className }) => {
    const getIcon = () => {
        switch (name) {
            case "Python": return <Terminal className={className} />;
            case "React": return <Code className={className} />;
            case "Cyber Sec": return <Shield className={className} />;
            case "Data": return <Database className={className} />;
            case "Cloud": return <Cloud className={className} />;
            case "AI/ML": return <Cpu className={className} />;
            case "DevOps": return <Globe className={className} />;
            default: return <Zap className={className} />;
        }
    };

    return (
        <div className="w-full h-full flex items-center justify-center font-black text-xl text-black">
            {getIcon()}
        </div>
    );
};

interface SkillData {
    name: string;
    salary: string;
    students: string;
    rating: number;
    growth: string;
    desc: string;
}

const skills: SkillData[] = [
    { name: "Python", salary: "$120k", students: "45k+", rating: 4.8, growth: "+25%", desc: "The language of AI & Data." },
    { name: "React", salary: "$115k", students: "32k+", rating: 4.9, growth: "+30%", desc: "Build modern UIs fast." },
    { name: "Cyber Sec", salary: "$130k", students: "18k+", rating: 4.9, growth: "+45%", desc: "Protect the digital world." },
    { name: "UI Design", salary: "$95k", students: "12k+", rating: 4.8, growth: "+40%", desc: "Design interfaces that work." },
    { name: "Data", salary: "$125k", students: "25k+", rating: 4.9, growth: "+35%", desc: "Make decisions with data." },
    { name: "Cloud", salary: "$140k", students: "22k+", rating: 4.8, growth: "+28%", desc: "Master AWS & Azure." },
    { name: "AI/ML", salary: "$160k", students: "40k+", rating: 4.9, growth: "+60%", desc: "Build the future intelligence." },
    { name: "DevOps", salary: "$135k", students: "15k+", rating: 4.7, growth: "+20%", desc: "Streamline deployment." },
    { name: "Mobile", salary: "$110k", students: "28k+", rating: 4.8, growth: "+18%", desc: "iOS & Android mastery." },
    { name: "Blockchain", salary: "$150k", students: "8k+", rating: 4.6, growth: "+50%", desc: "Decentralize the web." },
    { name: "Product", salary: "$125k", students: "14k+", rating: 4.7, growth: "+22%", desc: "Lead product vision." },
    { name: "Marketing", salary: "$90k", students: "35k+", rating: 4.6, growth: "+15%", desc: "Growth hacking & SEO." },
];

const colors = [
    'bg-piku-lime border-piku-lime',
    'bg-piku-cyan border-piku-cyan',
    'bg-piku-purple text-white border-piku-purple',
    'bg-piku-cream border-yellow-400',
    'bg-white border-white',
    'bg-orange-300 border-orange-500',
    'bg-emerald-300 border-emerald-500',
    'bg-blue-300 border-blue-500',
    'bg-red-300 border-red-500',
    'bg-indigo-300 border-indigo-500 text-white',
    'bg-pink-300 border-pink-500',
    'bg-yellow-300 border-yellow-500',
];

const InnerPages: React.FC = () => {
    const targetRef = useRef<HTMLDivElement>(null);
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [scrollWidth, setScrollWidth] = useState(0);

    // Dynamic width calculation for precise scrolling
    useLayoutEffect(() => {
        const updateWidth = () => {
            if (scrollContainerRef.current) {
                // Calculate total scrollable width minus the viewport width
                // Adding a small buffer (50px) to ensure the last card is not cut off
                const totalWidth = scrollContainerRef.current.scrollWidth;
                const windowWidth = window.innerWidth;
                setScrollWidth(totalWidth - windowWidth);
            }
        };

        updateWidth();
        window.addEventListener("resize", updateWidth);
        return () => window.removeEventListener("resize", updateWidth);
    }, []);

    const { scrollYProgress } = useScroll({
        target: targetRef,
        offset: ["start start", "end end"]
    });

    const xTransform = useTransform(scrollYProgress, [0, 1], [0, -scrollWidth]);
    const x = useSpring(xTransform, {
        stiffness: 100,
        damping: 30,
        restDelta: 0.001
    });

    return (
        <section
            ref={targetRef}
            id="skills"
            className="relative h-[800vh] bg-black dark:bg-black"
        >
            {/* Background Noise Texture */}
            <div className="absolute inset-0 opacity-20 pointer-events-none fixed" style={{ backgroundImage: 'radial-gradient(circle, #333 1px, transparent 1px)', backgroundSize: '30px 30px' }}></div>

            <div className="sticky top-0 h-screen flex items-center overflow-hidden">
                {/* Progress Indicator */}
                <div className="absolute bottom-10 left-1/2 -translate-x-1/2 w-64 h-1 bg-white/10 rounded-full overflow-hidden z-50">
                    <motion.div
                        className="h-full bg-piku-lime origin-left"
                        style={{ scaleX: scrollYProgress }}
                    />
                </div>

                <motion.div
                    ref={scrollContainerRef}
                    style={{ x }}
                    className="flex gap-4 md:gap-8 px-4 md:px-24 items-center"
                >
                    {/* Header Section as First Item */}
                    <div className="flex-none w-[90vw] md:w-[600px] pr-8 md:pr-12">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            transition={{ duration: 0.8 }}
                        >
                            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full border border-white/20 bg-white/5 text-piku-lime text-xs md:text-sm font-mono mb-6">
                                <TrendingUp size={14} /> MARKET DEMAND
                            </div>
                            <h2 className="text-4xl md:text-8xl font-black text-piku-lime italic tracking-tighter drop-shadow-[6px_6px_0px_rgba(255,255,255,0.2)] mb-8">
                                SKILLS THAT <br /><span className="text-white text-stroke-lime">PAY.</span>
                            </h2>
                            <div className="inline-block">
                                <p className="text-lg md:text-3xl font-bold text-black bg-white inline-block px-6 py-3 md:px-8 md:py-4 rounded-full border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(100,100,100,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] uppercase tracking-wide">
                                    Avg. Salary increase of <span className="text-piku-purple">40%</span>
                                </p>
                            </div>
                            <p className="mt-8 text-lg md:text-xl text-gray-400 font-medium max-w-md leading-relaxed">
                                Master the tools used by top companies. From coding to leadership, we've got the roadmap for your career growth.
                            </p>
                            <div className="mt-8 flex gap-4 text-white/50 font-mono text-xs md:text-sm">
                                <span>SCROLL TO EXPLORE</span>
                                <ArrowUpRight className="animate-bounce" />
                            </div>
                        </motion.div>
                    </div>

                    {/* Cards */}
                    {skills.map((skill, i) => (
                        <div
                            key={skill.name}
                            className={`relative flex-none w-[85vw] md:w-[400px] ${colors[i % colors.length]} rounded-[2rem] md:rounded-[2.5rem] border-4 p-6 md:p-8 flex flex-col justify-between h-[450px] md:h-[550px] shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_30px_rgba(255,255,255,0.15)] group cursor-pointer transition-all duration-300 hover:-translate-y-4`}
                        >
                            {/* Holographic Overlay on Hover */}
                            <div className="absolute inset-0 bg-gradient-to-tr from-white/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity rounded-[2.2rem] pointer-events-none z-20" />

                            {/* Pattern Overlay */}
                            <div className="absolute inset-0 opacity-10 rounded-[2.2rem] pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle, black 1px, transparent 1px)', backgroundSize: '10px 10px' }}></div>

                            <div className="relative z-10">
                                <div className="flex justify-between items-start mb-8">
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white text-black rounded-3xl border-4 border-black flex items-center justify-center p-3 shadow-md group-hover:rotate-12 transition-transform duration-300">
                                        <SkillLogo name={skill.name} className="w-8 h-8 md:w-10 md:h-10" />
                                    </div>
                                    <div className="bg-black text-white px-3 py-1.5 rounded-xl text-xs md:text-sm font-bold flex items-center gap-1 shadow-sm border border-white/20">
                                        <TrendingUp size={14} /> {skill.growth}
                                    </div>
                                </div>

                                <h3 className="text-4xl md:text-6xl font-black mb-4 leading-none tracking-tight mix-blend-hard-light opacity-90">{skill.name}</h3>
                                <p className="font-bold text-base md:text-lg opacity-80 leading-tight mb-4">{skill.desc}</p>

                                <div className="flex items-center gap-2 text-base md:text-lg font-bold opacity-70 border-t-2 border-black/10 pt-4">
                                    <Users size={18} /> {skill.students} Students
                                </div>
                            </div>

                            <div className="space-y-6 relative z-10 mt-auto">
                                <div className="bg-white/40 backdrop-blur-md rounded-2xl p-4 md:p-5 border-2 border-black/5 shadow-inner">
                                    <div className="text-xs font-black uppercase opacity-60 mb-1 tracking-wider">Avg. Annual Salary</div>
                                    <div className="text-4xl md:text-5xl font-black tracking-tighter text-black">{skill.salary}</div>
                                </div>

                                <div className="flex items-center justify-between text-base font-bold">
                                    <div className="flex items-center gap-1 bg-black/5 px-3 py-1 rounded-full text-sm md:text-base">
                                        <Star size={18} fill="currentColor" className="text-black" /> {skill.rating}
                                    </div>
                                    <div className="flex items-center gap-2 group-hover:translate-x-2 transition-transform bg-black text-white px-4 py-2 md:px-5 md:py-3 rounded-full text-xs md:text-sm shadow-lg">
                                        View Path <ArrowUpRight size={16} />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}

                    {/* Final Spacer to ensure last card is fully visible and not touching edge */}
                    <div className="flex-none w-[10vw] md:w-[300px]" />
                </motion.div>
            </div>
        </section>
    );
};

export default InnerPages;