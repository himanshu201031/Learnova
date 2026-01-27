import React from 'react';
import { motion } from 'framer-motion';

interface LogoProps {
  className?: string;
  iconClassName?: string;
  textClassName?: string;
  showText?: boolean;
  color?: string;
}

export const Logo: React.FC<LogoProps> = ({ 
  className = "", 
  iconClassName = "w-12 h-12", 
  textClassName = "text-3xl",
  showText = true,
  color = "currentColor"
}) => {
  return (
    <div className={`flex items-center gap-3 select-none ${className}`}>
      <motion.div 
        className={`relative ${iconClassName}`}
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.95 }}
      >
        <svg viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full drop-shadow-sm">
           {/* Book Base */}
           <path 
             d="M15 75 C15 75 35 85 50 75 C65 85 85 75 85 75 V50 C85 50 65 60 50 50 C35 60 15 50 15 50 V75Z" 
             stroke={color}
             strokeWidth="6" 
             strokeLinecap="round"
             strokeLinejoin="round"
             className="fill-white dark:fill-black"
           />
           {/* Center Spine */}
           <path 
             d="M50 75 V50" 
             stroke={color}
             strokeWidth="4" 
             strokeLinecap="round"
           />
           
           {/* Graduation Cap */}
           <motion.path
             initial={{ y: -5 }}
             animate={{ y: 0 }}
             transition={{ repeat: Infinity, repeatType: "reverse", duration: 2 }}
             d="M50 20 L85 35 L50 50 L15 35 L50 20 Z"
             fill={color}
             stroke={color}
             strokeWidth="4"
             strokeLinejoin="round"
           />
           {/* Tassel */}
           <path 
             d="M85 35 V45" 
             stroke={color}
             strokeWidth="3"
             strokeLinecap="round"
           />
           <circle cx="85" cy="45" r="2" fill={color} />

           {/* Decorative Sparkle (Lime) */}
           <motion.path
             animate={{ scale: [1, 1.2, 1], rotate: [0, 90, 0] }}
             transition={{ duration: 4, repeat: Infinity }}
             d="M85 10 L88 18 L96 21 L88 24 L85 32 L82 24 L74 21 L82 18 Z"
             className="fill-piku-lime dark:fill-piku-purple stroke-black dark:stroke-white"
             strokeWidth="1"
           />
        </svg>
      </motion.div>
      {showText && (
        <div className={`font-black italic tracking-tighter ${textClassName}`}>
          <span className={color === 'white' ? 'text-white' : 'text-black dark:text-white'}>learnova</span>
        </div>
      )}
    </div>
  );
};