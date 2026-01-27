
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { TrendingUp, Layers, ArrowRight, Sparkles, Star, Zap, Hash } from 'lucide-react';

// Categories data
const categories = [
  { title: 'Web Development', count: '120 Courses', img: 'https://images.unsplash.com/photo-1498050108023-c5249f4df085?auto=format&fit=crop&w=600&q=80', color: 'bg-yellow-100 dark:bg-zinc-900', type: 'professional', growth: '+125%' },
  { title: 'Data Science', count: '85 Courses', img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=600&q=80', color: 'bg-purple-100 dark:bg-zinc-900', type: 'professional', growth: '+200%' },
  { title: 'UX/UI Design', count: '64 Courses', img: 'https://images.unsplash.com/photo-1561070791-2526d30994b5?auto=format&fit=crop&w=600&q=80', color: 'bg-blue-100 dark:bg-zinc-900', type: 'creative', growth: '+85%' },
  { title: 'Digital Marketing', count: '45 Courses', img: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80', color: 'bg-cyan-100 dark:bg-zinc-900', type: 'professional', growth: '+60%' },
  { title: 'Graphic Design', count: '90 Courses', img: 'https://images.unsplash.com/photo-1626785774573-4b799312afc2?auto=format&fit=crop&w=600&q=80', color: 'bg-emerald-100 dark:bg-zinc-900', type: 'creative', growth: '+45%' },
  { title: 'Photography', count: '30 Courses', img: 'https://images.unsplash.com/photo-1516035069371-29a1b244cc32?auto=format&fit=crop&w=600&q=80', color: 'bg-orange-100 dark:bg-zinc-900', type: 'creative', growth: '+30%' },
  { title: 'Business Analytics', count: '55 Courses', img: 'https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=600&q=80', color: 'bg-pink-100 dark:bg-zinc-900', type: 'professional', growth: '+150%' },
  { title: 'Video Editing', count: '28 Courses', img: 'https://images.unsplash.com/photo-1574717432707-c67805681501?auto=format&fit=crop&w=600&q=80', color: 'bg-indigo-100 dark:bg-zinc-900', type: 'creative', growth: '+90%' },
  { title: 'Mobile Dev', count: '70 Courses', img: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=600&q=80', color: 'bg-red-100 dark:bg-zinc-900', type: 'professional', growth: '+110%' },
];

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1
    }
  }
};

const itemVariants = {
  hidden: { opacity: 0, y: 50, scale: 0.9 },
  visible: { 
    opacity: 1, 
    y: 0, 
    scale: 1,
    transition: { type: "spring", stiffness: 100, damping: 20 } 
  },
  exit: { opacity: 0, scale: 0.9, transition: { duration: 0.2 } }
};

const Demos: React.FC = () => {
  const [activeTab, setActiveTab] = useState<'professional' | 'creative'>('professional');
  const filteredCategories = categories.filter(c => c.type === activeTab);

  return (
    <section id="courses" className="py-24 md:py-32 bg-piku-cream dark:bg-black relative overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Header */}
        <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
          <motion.div 
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            className="max-w-2xl"
          >
            <div className="flex items-center gap-3 mb-4">
                <span className="font-black text-xs md:text-sm tracking-widest uppercase border-2 border-black dark:border-white rounded-full px-4 py-1.5 bg-piku-lime text-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] flex items-center gap-2">
                   <Zap size={14} className="fill-black"/> Discover Your Path
                </span>
            </div>
            <h2 className="text-5xl md:text-8xl font-black text-black dark:text-white tracking-tighter leading-[0.9]">
              EXPLORE TOP <br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-piku-purple to-piku-cyan relative inline-block">
                CATEGORIES
                <svg className="absolute w-full h-4 -bottom-1 left-0 text-black dark:text-white opacity-20" viewBox="0 0 100 10" preserveAspectRatio="none">
                    <path d="M0 5 Q 50 15 100 5" stroke="currentColor" strokeWidth="3" fill="none" />
                </svg>
              </span>
            </h2>
          </motion.div>
          
          <div className="w-full md:w-auto">
            <div className="bg-white dark:bg-zinc-900 p-2 rounded-2xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] inline-flex gap-2 relative">
                {['professional', 'creative'].map((tab) => (
                    <button 
                        key={tab}
                        onClick={() => setActiveTab(tab as any)}
                        className={`px-8 py-3 rounded-xl font-black text-sm uppercase tracking-wide transition-all duration-300 relative z-10 ${activeTab === tab ? 'bg-black text-white dark:bg-white dark:text-black shadow-md' : 'hover:bg-gray-100 dark:hover:bg-zinc-800 text-gray-500'}`}
                    >
                        {tab}
                    </button>
                ))}
            </div>
          </div>
        </div>

        {/* Cards Grid */}
        <motion.div 
            key={activeTab} 
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid md:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-12 perspective-1000"
        >
            <AnimatePresence mode='wait'> 
            {filteredCategories.map((cat, idx) => (
                <motion.div
                    key={cat.title}
                    variants={itemVariants}
                    layout
                    className="group relative cursor-pointer"
                    whileHover={{ y: -8 }}
                >
                    {/* Main Card Body */}
                    <div className="relative h-[420px]">
                        {/* Shadow Block */}
                        <div className="absolute top-0 left-0 w-full h-full bg-black dark:bg-white rounded-[2.5rem] transform translate-x-4 translate-y-4 transition-transform duration-300 group-hover:translate-x-6 group-hover:translate-y-6 opacity-100"></div>

                        <div className="relative w-full h-full bg-white dark:bg-zinc-900 rounded-[2.5rem] border-4 border-black dark:border-white p-5 flex flex-col overflow-hidden transition-colors">
                             
                             {/* ID Hash - Top Right */}
                             <div className="absolute top-5 right-5 z-20 flex items-center gap-1 opacity-40">
                                <Hash size={10} />
                                <span className="text-[10px] font-mono font-bold">
                                    {Math.random().toString(36).substr(2, 6).toUpperCase()}
                                </span>
                             </div>

                             {/* Corner Brackets */}
                             <div className="absolute top-4 left-4 w-4 h-4 border-t-4 border-l-4 border-black dark:border-white z-20 opacity-20"></div>
                             <div className="absolute bottom-4 left-4 w-4 h-4 border-b-4 border-l-4 border-black dark:border-white z-20 opacity-20"></div>

                             {/* Image Area */}
                             <div className="relative h-3/5 rounded-[1.8rem] overflow-hidden border-2 border-black dark:border-white/20 bg-gray-100 mb-5 shadow-inner group-hover:shadow-none transition-shadow">
                                 <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-colors z-10" />
                                 <img src={cat.img} alt={cat.title} className="w-full h-full object-cover grayscale group-hover:grayscale-0 transition-all duration-700 scale-100 group-hover:scale-110" />
                                 
                                 {/* Floating Tags */}
                                 <div className="absolute top-3 left-3 z-20 flex flex-col gap-2">
                                     <div className="bg-white/90 backdrop-blur text-black px-3 py-1 rounded-lg text-[10px] font-black uppercase tracking-widest border border-black shadow-sm">
                                         TOP RATED
                                     </div>
                                 </div>
                                 
                                 <div className="absolute bottom-3 right-3 z-20">
                                     <div className="bg-piku-lime text-black px-3 py-1 rounded-lg border-2 border-black text-xs font-black shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] flex items-center gap-1">
                                        <TrendingUp size={12} /> {cat.growth}
                                     </div>
                                 </div>
                             </div>

                             {/* Content Area */}
                             <div className="flex-1 px-2 relative z-20 flex flex-col justify-between pb-2">
                                 <div>
                                     <div className="flex items-center justify-between mb-2">
                                         <h3 className="text-3xl font-black text-black dark:text-white leading-none uppercase tracking-tighter line-clamp-1">{cat.title}</h3>
                                     </div>
                                     
                                     <div className="w-full h-1 bg-gray-100 dark:bg-zinc-800 rounded-full mb-3 overflow-hidden">
                                         <div className="h-full bg-piku-purple w-12 group-hover:w-full transition-all duration-700 ease-out"></div>
                                     </div>

                                     <div className="flex justify-between items-center text-sm font-bold text-gray-500 dark:text-gray-400">
                                         <span className="flex items-center gap-2"><Layers size={14} /> {cat.count}</span>
                                     </div>
                                 </div>
                                 
                                 {/* Action Button - Integrated into card */}
                                 <motion.div 
                                    className="absolute bottom-1 right-1"
                                    whileHover={{ scale: 1.1, rotate: 0 }}
                                    whileTap={{ scale: 0.9 }}
                                 >
                                     <div className="w-14 h-14 bg-black dark:bg-white text-white dark:text-black rounded-2xl border-2 border-transparent flex items-center justify-center shadow-[4px_4px_0px_0px_rgba(0,0,0,0.2)] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,0.5)] transition-all cursor-pointer group-hover:bg-piku-lime group-hover:text-black group-hover:border-black">
                                         <ArrowRight size={24} strokeWidth={3} className="-rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                                     </div>
                                 </motion.div>
                             </div>
                             
                             {/* Texture Overlay */}
                             <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(#000 1px, transparent 1px)', backgroundSize: '4px 4px' }}></div>
                        </div>
                    </div>
                </motion.div>
            ))}
            </AnimatePresence>
        </motion.div>
      </div>
    </section>
  );
};

export default Demos;
