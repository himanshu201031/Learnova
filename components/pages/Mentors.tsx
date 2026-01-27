import React from 'react';
import { motion } from 'framer-motion';
import Button from '../ui/Button';
import { Linkedin, Twitter, Globe, Star, Users, Briefcase, ArrowUpRight } from 'lucide-react';

const mentors = [
    { name: "Sarah Jenkins", role: "Senior Product Designer", ex: "Netflix", img: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=600&q=80", color: "bg-piku-purple", students: "2.4k", rating: 4.9 },
    { name: "David Chen", role: "Staff Engineer", ex: "Google", img: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=600&q=80", color: "bg-piku-cyan", students: "5k+", rating: 4.8 },
    { name: "Elena Rodriguez", role: "Head of Marketing", ex: "Spotify", img: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=600&q=80", color: "bg-piku-lime", students: "1.2k", rating: 5.0 },
    { name: "Michael Chang", role: "Data Scientist", ex: "Uber", img: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=600&q=80", color: "bg-orange-200", students: "800", rating: 4.7 },
    { name: "Amanda Low", role: "UX Researcher", ex: "Airbnb", img: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=600&q=80", color: "bg-piku-cream", students: "3.1k", rating: 4.9 },
    { name: "James Wilson", role: "DevOps Lead", ex: "Amazon", img: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=600&q=80", color: "bg-blue-200", students: "1.5k", rating: 4.8 },
];

type Mentor = typeof mentors[0];

const MentorCard: React.FC<{ m: Mentor; i: number }> = ({ m, i }) => {
    return (
        <motion.div
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: i * 0.1, duration: 0.6 }}
            className="group relative w-full h-[450px] rounded-[2rem] overflow-hidden border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[0px_0px_20px_rgba(255,255,255,0.1)] cursor-pointer"
        >
            {/* Background Image */}
            <div className="absolute inset-0 bg-black">
                <img 
                    src={m.img} 
                    alt={m.name} 
                    className="w-full h-full object-cover transition-all duration-700 group-hover:scale-110 opacity-80 group-hover:opacity-100 grayscale group-hover:grayscale-0" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-90 transition-opacity duration-300 group-hover:opacity-70" />
            </div>

            {/* Top Stats */}
            <div className="absolute top-6 left-6 z-10 flex gap-2">
                <div className="bg-white/10 backdrop-blur-md border border-white/20 text-white px-3 py-1 rounded-full text-xs font-bold flex items-center gap-1">
                    <Star size={12} className="fill-yellow-400 text-yellow-400" /> {m.rating}
                </div>
            </div>

            {/* Ex-Company Badge */}
            <div className="absolute top-6 right-6 z-10 transform translate-x-12 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 transition-all duration-300">
                <div className="bg-black text-white px-3 py-1 rounded-full text-xs font-bold border border-white/20 uppercase tracking-widest shadow-lg">
                    Ex-{m.ex}
                </div>
            </div>

            {/* Bottom Content - Slides Up */}
            <div className="absolute bottom-0 left-0 right-0 p-8 transform translate-y-16 group-hover:translate-y-0 transition-transform duration-500 ease-[cubic-bezier(0.23,1,0.32,1)] z-20">
                <div className="mb-6">
                    <h3 className="text-3xl font-black text-white leading-tight mb-1">{m.name}</h3>
                    <p className={`text-sm font-bold px-2 py-0.5 rounded w-fit text-black ${m.color}`}>{m.role}</p>
                </div>

                <div className="space-y-4 opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">
                    <div className="flex items-center gap-4 text-gray-300 text-sm font-medium">
                        <span className="flex items-center gap-1"><Users size={14}/> {m.students} Students</span>
                        <span className="flex items-center gap-1"><Briefcase size={14}/> 10+ Years Exp</span>
                    </div>

                    <div className="flex gap-3 pt-4 border-t border-white/20">
                         <Button size="sm" className="flex-1 bg-white text-black hover:bg-piku-lime border-none">
                            Book Session
                         </Button>
                         <div className="flex gap-2">
                            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                                <Linkedin size={18}/>
                            </button>
                            <button className="w-10 h-10 rounded-full bg-white/10 backdrop-blur border border-white/20 flex items-center justify-center text-white hover:bg-white hover:text-black transition-colors">
                                <Twitter size={18}/>
                            </button>
                         </div>
                    </div>
                </div>
            </div>
            
            {/* Hover Glow Border */}
            <div className="absolute inset-0 border-4 border-piku-lime opacity-0 group-hover:opacity-100 transition-opacity duration-500 rounded-[1.8rem] pointer-events-none" />
        </motion.div>
    );
};

const Mentors: React.FC = () => {
  return (
    <div className="pt-32 pb-20 bg-white dark:bg-black min-h-screen transition-colors duration-500">
       <div className="container mx-auto px-6">
            <div className="text-center mb-20 max-w-2xl mx-auto">
                 <motion.div 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="inline-flex items-center gap-2 bg-gray-100 dark:bg-zinc-900 dark:text-white border border-black/10 dark:border-white/20 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-widest mb-4"
                 >
                    <Users size={14} /> World Class Experts
                 </motion.div>
                 <motion.h1 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.1 }}
                    className="text-6xl font-black italic mb-6 dark:text-white"
                 >
                    Meet Your <span className="text-piku-lime bg-black dark:bg-white dark:text-black px-4 transform skew-x-[-10deg] inline-block">Mentors</span>
                 </motion.h1>
                 <motion.p 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-xl font-medium text-gray-600 dark:text-gray-400"
                 >
                    Learn directly from experts who have built the products you use every day.
                 </motion.p>
            </div>

            <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
                {mentors.map((m, i) => (
                    <MentorCard key={i} m={m} i={i} />
                ))}
            </div>
       </div>
    </div>
  );
};

export default Mentors;