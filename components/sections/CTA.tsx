import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionTemplate, useMotionValue } from 'framer-motion';
import Button from '../ui/Button';
import { Wifi, Battery, Play, ArrowRight, Bell, CheckCircle, MoreHorizontal, Heart, MessageSquare, Laptop, Smartphone, Cloud } from 'lucide-react';

const CTA: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "end start"]
  });

  const springConfig = { stiffness: 100, damping: 30, restDelta: 0.001 };
  
  const yTablet = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [200, 0, -50]), springConfig);
  const yPhone = useSpring(useTransform(scrollYProgress, [0, 0.5, 1], [300, 50, -100]), springConfig);
  
  const rotateTablet = useSpring(useTransform(scrollYProgress, [0, 1], [10, -5]), springConfig);
  const rotatePhone = useSpring(useTransform(scrollYProgress, [0, 1], [15, -15]), springConfig);

  const opacity = useTransform(scrollYProgress, [0, 0.3], [0, 1]);

  return (
    <section ref={sectionRef} className="py-32 md:py-48 bg-black overflow-hidden relative min-h-[120vh] flex flex-col items-center">
      {/* Dynamic Background Aura */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-tr from-piku-cyan/20 to-piku-purple/20 rounded-full blur-[120px] opacity-50 pointer-events-none animate-pulse duration-[5000ms]"></div>
      
      {/* Grid Pattern */}
      <div className="absolute inset-0 opacity-10" 
           style={{ 
             backgroundImage: 'linear-gradient(#333 1px, transparent 1px), linear-gradient(90deg, #333 1px, transparent 1px)', 
             backgroundSize: '40px 40px'
           }} 
      />

      <div className="container mx-auto px-4 md:px-6 text-center relative z-10">
        <motion.div 
          style={{ opacity }}
          className="max-w-5xl mx-auto mb-20 md:mb-32"
        >
          <div className="inline-flex items-center gap-2 bg-zinc-900 border border-zinc-800 px-6 py-2 rounded-full font-mono text-xs md:text-sm mb-8 text-piku-lime shadow-[0_0_20px_rgba(214,243,47,0.1)]">
             <Cloud size={14} /> INSTANT SYNC • v3.0 LIVE
          </div>
          
          <h2 className="text-6xl md:text-9xl font-black mb-8 text-white leading-[0.85] tracking-tighter mix-blend-screen">
            LEARN <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500">ANYWHERE,</span><br/>
            <span className="relative inline-block">
                ANYTIME.
                <motion.svg 
                    className="absolute -bottom-4 left-0 w-full h-4 text-piku-cyan" 
                    viewBox="0 0 100 10" 
                    preserveAspectRatio="none"
                    initial={{ pathLength: 0 }}
                    whileInView={{ pathLength: 1 }}
                    transition={{ duration: 1, delay: 0.5 }}
                >
                    <motion.path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                </motion.svg>
            </span>
          </h2>
          
          <p className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium leading-relaxed">
            Start a lesson on your laptop during breakfast. Finish it on your phone during your commute. Seamless.
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-6">
            <Button size="lg" className="bg-white text-black hover:bg-piku-cyan hover:border-black border-transparent shadow-[0_0_30px_rgba(255,255,255,0.2)] text-xl h-20 px-10">
                <Smartphone className="mr-2" /> Get the App
            </Button>
            <Button size="lg" variant="outline" className="text-white border-zinc-700 hover:bg-zinc-900 hover:text-white text-xl h-20 px-10">
                <Laptop className="mr-2" /> Web Portal
            </Button>
          </div>
        </motion.div>

        {/* 3D Device Ecosystem */}
        <div className="relative flex justify-center items-end w-full max-w-6xl mx-auto h-[500px] md:h-[700px] perspective-1000">
           
           {/* Sync Beam Effect */}
           <motion.div 
              style={{ opacity: useTransform(scrollYProgress, [0.4, 0.6], [0, 1]) }}
              className="absolute top-[40%] left-[30%] right-[20%] h-[2px] bg-gradient-to-r from-transparent via-piku-cyan to-transparent z-0 hidden md:block"
           >
              <div className="absolute top-1/2 left-0 w-full h-[10px] -translate-y-1/2 bg-piku-cyan blur-md opacity-50"></div>
              <motion.div 
                animate={{ x: ["0%", "100%"] }} 
                transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
                className="w-20 h-[4px] bg-white absolute top-1/2 -translate-y-1/2 blur-sm"
              />
           </motion.div>


           {/* Tablet (Main Dashboard) */}
           <motion.div 
              style={{ y: yTablet, rotateX: rotateTablet }}
              className="absolute bottom-0 z-10 w-[95%] md:w-[80%] aspect-[16/10] bg-zinc-950 rounded-[2.5rem] border-[12px] md:border-[20px] border-zinc-900 shadow-[0_20px_100px_rgba(0,0,0,0.8)] overflow-hidden ring-1 ring-white/10"
           >
              {/* Screen Content */}
              <div className="w-full h-full bg-black flex flex-col relative overflow-hidden">
                 {/* Header */}
                 <div className="h-16 border-b border-white/5 flex items-center justify-between px-8 bg-white/5 backdrop-blur-sm">
                    <div className="flex gap-8">
                        <div className="w-24 h-4 bg-white/10 rounded-full"></div>
                        <div className="flex gap-4">
                            <div className="w-16 h-4 bg-white/5 rounded-full"></div>
                            <div className="w-16 h-4 bg-white/5 rounded-full"></div>
                        </div>
                    </div>
                    <div className="flex gap-4">
                         <Bell className="text-white/40 w-5 h-5" />
                         <div className="w-8 h-8 rounded-full bg-gradient-to-br from-piku-purple to-blue-600"></div>
                    </div>
                 </div>
                 
                 {/* Main Area */}
                 <div className="flex-1 p-8 grid grid-cols-12 gap-8">
                     {/* Left Col */}
                     <div className="col-span-8 space-y-8">
                         {/* Hero Banner inside Tablet */}
                         <div className="h-64 rounded-3xl bg-gradient-to-br from-zinc-800 to-black border border-white/5 p-8 relative overflow-hidden group">
                             <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80')] bg-cover opacity-20 group-hover:scale-105 transition-transform duration-700"></div>
                             <div className="relative z-10">
                                 <div className="bg-piku-lime text-black text-xs font-black px-3 py-1 rounded-full w-fit mb-4">IN PROGRESS</div>
                                 <h3 className="text-4xl font-black text-white mb-2">Advanced Three.js</h3>
                                 <p className="text-gray-400 mb-6">Chapter 4: Shader Magic</p>
                                 <div className="w-full h-2 bg-white/10 rounded-full overflow-hidden">
                                     <div className="w-3/4 h-full bg-piku-cyan"></div>
                                 </div>
                             </div>
                             <div className="absolute right-8 bottom-8 w-12 h-12 bg-white rounded-full flex items-center justify-center cursor-pointer hover:scale-110 transition-transform">
                                 <Play className="fill-black ml-1" size={20} />
                             </div>
                         </div>

                         {/* List */}
                         <div className="space-y-4">
                             {[1,2].map(i => (
                                 <div key={i} className="h-16 rounded-xl bg-white/5 border border-white/5 flex items-center px-6 justify-between">
                                     <div className="flex items-center gap-4">
                                         <div className="w-10 h-10 rounded-lg bg-zinc-800 flex items-center justify-center">
                                             <div className="w-4 h-4 border-2 border-white/20 rounded-sm"></div>
                                         </div>
                                         <div className="w-48 h-3 bg-white/10 rounded-full"></div>
                                     </div>
                                     <div className="w-24 h-3 bg-white/5 rounded-full"></div>
                                 </div>
                             ))}
                         </div>
                     </div>

                     {/* Right Col */}
                     <div className="col-span-4 bg-zinc-900/50 rounded-3xl border border-white/5 p-6 flex flex-col items-center justify-center text-center">
                         <div className="w-32 h-32 rounded-full border-[8px] border-zinc-800 relative flex items-center justify-center mb-6">
                             <div className="absolute inset-0 border-[8px] border-piku-purple rounded-full border-l-transparent rotate-45"></div>
                             <span className="text-4xl font-black text-white">82<span className="text-base align-top">%</span></span>
                         </div>
                         <h4 className="text-white font-bold mb-2">Weekly Goal</h4>
                         <p className="text-gray-500 text-sm">You're crushing it! Keep the streak alive.</p>
                     </div>
                 </div>

                 {/* Glare */}
                 <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
              </div>
           </motion.div>

           {/* Phone (Notification/Mobile UI) */}
            <motion.div 
              style={{ y: yPhone, rotate: rotatePhone }}
              className="absolute bottom-[-40px] right-[5%] z-20 w-[200px] md:w-[280px] aspect-[9/19.5] bg-zinc-950 rounded-[3rem] border-[12px] border-zinc-900 shadow-[0_30px_80px_rgba(0,0,0,0.6)] overflow-hidden ring-1 ring-white/10"
           >
              {/* Screen Content */}
              <div className="w-full h-full bg-black relative">
                   <img src="https://images.unsplash.com/photo-1611162617474-5b21e879e113?auto=format&fit=crop&w=600&q=80" className="w-full h-full object-cover opacity-60" alt="Mobile content" />
                   
                   {/* Mobile Overlay UI */}
                   <div className="absolute inset-0 bg-gradient-to-b from-black/80 via-transparent to-black">
                       <div className="p-6 pt-12 flex justify-between items-center">
                           <div className="w-8 h-8 bg-white/20 backdrop-blur rounded-full flex items-center justify-center">
                               <ArrowRight className="rotate-180 text-white" size={14} />
                           </div>
                           <div className="text-white font-bold text-sm">LIVE</div>
                       </div>
                       
                       {/* Floating Notification */}
                       <motion.div 
                          initial={{ x: 100, opacity: 0 }}
                          whileInView={{ x: 0, opacity: 1 }}
                          transition={{ delay: 0.8, type: "spring" }}
                          className="absolute top-32 right-4 bg-white/10 backdrop-blur-md border border-white/20 p-3 rounded-2xl flex items-center gap-3 w-48 shadow-xl"
                       >
                           <div className="w-10 h-10 rounded-full bg-piku-lime flex items-center justify-center">
                               <CheckCircle size={20} className="text-black" />
                           </div>
                           <div>
                               <div className="text-xs text-white/60 font-bold uppercase">Lesson Complete</div>
                               <div className="text-sm text-white font-black">+50 XP Earned</div>
                           </div>
                       </motion.div>

                       <div className="absolute bottom-0 w-full p-6">
                           <div className="flex gap-4 mb-6">
                               <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-white text-xs font-bold border border-white/10">
                                   Discussion (12)
                               </div>
                               <div className="bg-white/10 backdrop-blur px-4 py-2 rounded-xl text-white text-xs font-bold border border-white/10">
                                   Resources
                               </div>
                           </div>
                           <h4 className="text-white text-xl font-black mb-2">System Design</h4>
                           <p className="text-gray-400 text-sm mb-4">Scaling distributed systems...</p>
                           
                           {/* Player Controls */}
                           <div className="flex items-center gap-4 text-white">
                               <Play className="fill-white" />
                               <div className="flex-1 h-1 bg-white/20 rounded-full">
                                   <div className="w-1/3 h-full bg-piku-cyan rounded-full"></div>
                               </div>
                               <span className="text-xs font-mono">12:30</span>
                           </div>
                       </div>
                   </div>
              </div>
           </motion.div>
        </div>
      </div>
    </section>
  );
};

export default CTA;