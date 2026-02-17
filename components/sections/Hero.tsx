import React, { useRef } from 'react';
import { motion, useScroll, useTransform, useSpring, useMotionValue } from 'framer-motion';
import { ArrowRight, Play, Star, Zap } from 'lucide-react';
import Button from '../ui/Button';

import { Page } from '../../types';

interface HeroProps {
  onNavigate: (page: Page) => void;
}

const Hero: React.FC<HeroProps> = ({ onNavigate }) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollY } = useScroll();

  // Mouse Parallax Logic
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  const handleMouseMove = (e: React.MouseEvent) => {
    const { clientX, clientY } = e;
    const { innerWidth, innerHeight } = window;
    mouseX.set(clientX / innerWidth - 0.5);
    mouseY.set(clientY / innerHeight - 0.5);
  };

  const springConfig = { damping: 25, stiffness: 150 };
  const moveX = useSpring(useTransform(mouseX, [-0.5, 0.5], [-20, 20]), springConfig);
  const moveY = useSpring(useTransform(mouseY, [-0.5, 0.5], [-20, 20]), springConfig);
  const moveXReverse = useSpring(useTransform(mouseX, [-0.5, 0.5], [20, -20]), springConfig);
  const moveYReverse = useSpring(useTransform(mouseY, [-0.5, 0.5], [20, -20]), springConfig);

  // Scroll Parallax
  const yImage = useTransform(scrollY, [0, 500], [0, 100]);
  const opacityText = useTransform(scrollY, [0, 300], [1, 0]);

  return (
    <section
      ref={containerRef}
      onMouseMove={handleMouseMove}
      className="relative pt-28 pb-48 md:pt-32 md:pb-64 bg-piku-cyan dark:bg-black overflow-hidden min-h-[90vh] flex flex-col justify-center transition-colors duration-500"
    >
      {/* Abstract Background Elements */}
      <motion.div
        style={{ x: moveXReverse, y: moveYReverse }}
        className="absolute top-20 right-20 w-48 h-48 md:w-64 md:h-64 bg-white/20 rounded-full blur-3xl z-0 pointer-events-none"
      />

      <div className="container mx-auto px-4 md:px-6 relative z-10">
        <div className="grid lg:grid-cols-2 gap-8 lg:gap-16 items-center">

          {/* Text Content */}
          <motion.div
            style={{ opacity: opacityText }}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="text-center lg:text-left"
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 bg-white dark:bg-black border-2 border-black dark:border-white rounded-full px-4 py-2 mb-6 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)] dark:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] hover:-translate-y-1 transition-transform"
            >
              <span className="relative flex h-3 w-3">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-piku-green opacity-75"></span>
                <span className="relative inline-flex rounded-full h-3 w-3 bg-piku-green"></span>
              </span>
              <span className="text-xs md:text-sm font-black tracking-wide uppercase dark:text-white">New Cohort Enrolling</span>
            </motion.div>

            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black leading-[0.9] mb-6 text-black dark:text-white tracking-tighter mix-blend-multiply dark:mix-blend-normal">
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="block"
                >
                  MASTER
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-white dark:text-black drop-shadow-[4px_4px_0px_rgba(0,0,0,1)] dark:drop-shadow-[4px_4px_0px_rgba(255,255,255,1)] stroke-black"
                  style={{ WebkitTextStroke: "2px currentColor" }}
                >
                  THE FUTURE
                </motion.span>
              </span>
              <span className="block overflow-hidden pb-2">
                <motion.span
                  initial={{ y: "100%" }}
                  animate={{ y: 0 }}
                  transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
                  className="block text-transparent bg-clip-text bg-gradient-to-r from-piku-purple to-blue-600 dark:from-piku-lime dark:to-piku-cyan"
                >
                  TODAY.
                </motion.span>
              </span>
            </h1>

            <motion.p
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl text-black dark:text-gray-300 font-bold mb-8 max-w-lg mx-auto lg:mx-0 leading-relaxed lg:border-l-8 lg:border-black dark:lg:border-white lg:pl-6"
            >
              Stop watching tutorials. Start building. Expert-led courses in coding, design, and business.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6 }}
              className="flex flex-wrap justify-center lg:justify-start gap-4"
            >
              <Button onClick={() => onNavigate('login')} size="lg" className="text-base md:text-lg h-14 md:h-16 px-8 border-black shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:border-white dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0px_0px_rgba(0,0,0,1)] transition-all">
                Start Learning <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
              <Button onClick={() => onNavigate('courses')} size="lg" variant="secondary" className="text-base md:text-lg h-14 md:h-16 px-8 border-black dark:border-white shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)]">
                <Play className="mr-2 w-5 h-5 fill-black dark:fill-white" /> Courses
              </Button>
            </motion.div>
          </motion.div>

          {/* Hero Images Collage */}
          <motion.div
            style={{ y: yImage, x: moveX, rotateY: moveX }}
            className="relative h-[300px] md:h-[450px] lg:h-[550px] w-full max-w-[500px] mx-auto perspective-1000 mt-8 lg:mt-0"
          >
            {/* Main Image Card */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8, rotate: 6 }}
              animate={{ opacity: 1, scale: 1, rotate: 6 }}
              transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
              className="absolute inset-0 rounded-[2.5rem] overflow-hidden shadow-[12px_12px_0px_0px_rgba(0,0,0,1)] dark:shadow-[12px_12px_0px_0px_rgba(255,255,255,1)] border-[4px] border-black dark:border-white z-10 bg-white group"
            >
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors z-10" />
              <img src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80" alt="Students learning" className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110 grayscale group-hover:grayscale-0" />

              {/* Floating Badge on Image */}
              <div className="absolute top-4 right-4 md:top-6 md:right-6 z-20">
                <div className="w-16 h-16 md:w-20 md:h-20 bg-piku-lime rounded-full border-4 border-black flex items-center justify-center animate-spin-slow">
                  <svg viewBox="0 0 100 100" className="w-full h-full p-1">
                    <path id="curve" d="M 50 50 m -37 0 a 37 37 0 1 1 74 0 a 37 37 0 1 1 -74 0" fill="transparent" />
                    <text className="text-[14px] font-bold uppercase tracking-widest">
                      <textPath href="#curve">
                        • Certified • Certified •
                      </textPath>
                    </text>
                  </svg>
                  <Star className="absolute text-black w-6 h-6 md:w-8 md:h-8" fill="black" />
                </div>
              </div>
            </motion.div>

            {/* Floating Element 1 - Sale Tag */}
            <motion.div
              style={{ x: moveXReverse, y: moveYReverse }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.8 }}
              className="absolute -left-4 md:-left-12 top-10 md:top-20 z-30"
            >
              <div className="bg-piku-purple text-white p-4 md:p-6 rounded-2xl border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] -rotate-12 hover:rotate-0 transition-transform cursor-pointer group">
                <div className="text-xs font-black uppercase tracking-widest mb-1 opacity-80">Launch Offer</div>
                <h3 className="font-black text-3xl md:text-4xl leading-none group-hover:scale-110 transition-transform">50%<br /><span className="text-lg md:text-xl">OFF</span></h3>
              </div>
            </motion.div>

            {/* Floating Element 2 - Lightning */}
            <motion.div
              style={{ x: moveX, y: moveY }}
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 1 }}
              className="absolute -right-4 md:-right-8 bottom-10 md:bottom-20 z-30"
            >
              <div className="bg-piku-lime p-3 md:p-5 rounded-[2rem] border-4 border-black dark:border-white shadow-[8px_8px_0px_0px_rgba(0,0,0,1)] dark:shadow-[8px_8px_0px_0px_rgba(255,255,255,1)] animate-bounce">
                <Zap size={32} className="text-black fill-black md:w-10 md:h-10" />
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>

      {/* Enhanced Marquee Section - Adjusted positioning to not cover content */}
      <div className="absolute bottom-10 left-0 w-full z-20 pointer-events-none">
        {/* Layer 1: Solid Strip */}
        <div className="absolute bottom-0 w-[110%] -left-[5%] bg-piku-lime border-y-4 border-black transform -rotate-2 shadow-lg overflow-hidden py-3 md:py-4">
          <div className="flex animate-marquee whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center mx-8">
                <span className="text-2xl md:text-4xl font-black text-black uppercase italic tracking-tighter">LEARN FAST</span>
                <Star className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-6 text-black fill-black" />
                <span className="text-2xl md:text-4xl font-black text-white text-stroke-black uppercase italic tracking-tighter" style={{ WebkitTextStroke: '1px black' }}>BUILD FASTER</span>
                <div className="w-6 h-6 md:w-8 md:h-8 mx-4 md:mx-6 bg-black rounded-full" />
              </div>
            ))}
          </div>
        </div>

        {/* Layer 2: Outline Strip (Reverse direction) */}
        <div className="absolute bottom-0 w-[110%] -left-[5%] bg-black/90 backdrop-blur-sm border-y-4 border-white transform rotate-1 overflow-hidden py-3 md:py-4 mix-blend-hard-light">
          <div className="flex animate-marquee-reverse whitespace-nowrap">
            {[...Array(10)].map((_, i) => (
              <div key={i} className="flex items-center mx-8">
                <span className="text-xl md:text-3xl font-black text-transparent text-stroke-white uppercase tracking-widest" style={{ WebkitTextStroke: '1px white' }}>GET CERTIFIED</span>
                <Zap className="w-5 h-5 md:w-6 md:h-6 mx-4 md:mx-6 text-piku-cyan fill-piku-cyan" />
                <span className="text-xl md:text-3xl font-black text-white uppercase tracking-widest">GET HIRED</span>
                <div className="w-5 h-5 md:w-6 md:h-6 mx-4 md:mx-6 border-2 border-white rounded-full" />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;