import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const loadingTexts = [
    "BOOT_SEQUENCE_INIT...",
    "LOADING_MODULES...",
    "ESTABLISHING_LINK...",
    "RENDERING_FUTURE..."
];

export const Preloader: React.FC<{ onComplete: () => void }> = ({ onComplete }) => {
    const [progress, setProgress] = useState(0);
    const [currentText, setCurrentText] = useState(loadingTexts[0]);

    useEffect(() => {
        // Progress Timer
        const timer = setInterval(() => {
            setProgress(prev => {
                if (prev >= 100) {
                    clearInterval(timer);
                    setTimeout(onComplete, 800);
                    return 100;
                }
                // Random jump
                const jump = Math.random() > 0.8 ? 5 : 1;
                return Math.min(prev + jump, 100);
            });
        }, 40);

        // Text Cycle
        const textTimer = setInterval(() => {
            setCurrentText(loadingTexts[Math.floor(Math.random() * loadingTexts.length)]);
        }, 600);

        return () => {
            clearInterval(timer);
            clearInterval(textTimer);
        };
    }, [onComplete]);

    return (
        <motion.div
            className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-black text-piku-lime font-mono overflow-hidden"
            exit={{ y: "-100%", transition: { duration: 0.8, ease: "easeInOut" } }}
        >
            <div className="relative z-10 flex flex-col items-center">
                <div className="text-9xl md:text-[12rem] font-black tracking-tighter leading-none mb-4 mix-blend-difference">
                    {progress}%
                </div>
                
                <div className="w-64 h-2 bg-zinc-900 rounded-full overflow-hidden border border-zinc-800">
                    <motion.div 
                        className="h-full bg-piku-lime"
                        style={{ width: `${progress}%` }}
                    />
                </div>

                <div className="mt-4 text-sm font-bold tracking-[0.2em] opacity-80">
                    {currentText}
                </div>
            </div>

            {/* Background Grid */}
            <div className="absolute inset-0 bg-[linear-gradient(rgba(0,255,0,0.05)_1px,transparent_1px),linear-gradient(90deg,rgba(0,255,0,0.05)_1px,transparent_1px)] bg-[size:40px_40px] pointer-events-none"></div>
            
            {/* Scanline */}
            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-piku-lime/5 to-transparent animate-scan pointer-events-none h-32 w-full top-0"></div>
        </motion.div>
    );
};