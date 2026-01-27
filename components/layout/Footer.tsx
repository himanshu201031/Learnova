import React from 'react';
import { motion } from 'framer-motion';
import { Twitter, Instagram, Linkedin, Github, Send } from 'lucide-react';
import Button from '../ui/Button';
import { Logo } from '../ui/Logo';
import { Page } from '../../types';

interface FooterProps {
    onNavigate: (page: Page) => void;
}

const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  return (
    <footer className="bg-zinc-950 border-t-4 border-piku-lime text-white relative overflow-hidden transition-colors duration-500">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5 pointer-events-none" style={{ backgroundImage: 'radial-gradient(circle at 1px 1px, rgba(255,255,255,0.3) 1px, transparent 0)', backgroundSize: '20px 20px' }}></div>
      
      <div className="container mx-auto px-6 relative z-10">
        
        {/* Massive CTA */}
        <div className="py-20 md:py-32 border-b border-zinc-800 flex flex-col lg:flex-row items-start lg:items-end justify-between gap-12">
            <div>
                <h2 className="text-6xl md:text-9xl font-black italic leading-[0.85] tracking-tighter mb-8 text-white">
                    READY TO <br/>
                    <span className="text-piku-lime">LEVEL UP?</span>
                </h2>
                <div className="flex flex-col sm:flex-row gap-4">
                    <Button onClick={() => onNavigate('signup')} size="lg" className="text-xl px-12 h-16 bg-white text-black hover:bg-piku-lime hover:border-black border-none shadow-[8px_8px_0px_rgba(255,255,255,0.2)]">
                        Get Started Now
                    </Button>
                </div>
            </div>
            
            <div className="max-w-md w-full">
                <p className="text-xl font-bold opacity-70 mb-8 text-gray-300">
                    Join 1M+ developers, designers, and creators building the future with Learnova.
                </p>
                <div className="relative">
                    <input 
                        type="email" 
                        placeholder="Enter email for updates" 
                        className="w-full px-6 py-4 rounded-xl border-2 border-zinc-700 bg-zinc-900 text-white font-bold placeholder-zinc-500 focus:outline-none focus:border-white focus:shadow-[4px_4px_0px_0px_rgba(255,255,255,1)] transition-all"
                    />
                    <button className="absolute right-3 top-1/2 -translate-y-1/2 p-2 bg-white text-black rounded-lg hover:bg-piku-lime transition-colors">
                        <Send size={20} />
                    </button>
                </div>
            </div>
        </div>

        <div className="grid lg:grid-cols-12 gap-12 py-20 border-b border-zinc-800">
            {/* Brand Column */}
            <div className="lg:col-span-4">
                <Logo iconClassName="w-20 h-20" textClassName="text-6xl" color="white" />
                <div className="mt-8 flex gap-4">
                     {[Twitter, Instagram, Linkedin, Github].map((Icon, i) => (
                        <motion.a
                            key={i}
                            href="#"
                            whileHover={{ scale: 1.1, rotate: 5 }}
                            whileTap={{ scale: 0.9 }}
                            className="w-12 h-12 bg-zinc-900 text-white rounded-xl border border-zinc-700 flex items-center justify-center hover:bg-white hover:text-black hover:border-white transition-all shadow-[4px_4px_0px_0px_rgba(0,0,0,0.5)]"
                        >
                            <Icon size={20} strokeWidth={2.5} />
                        </motion.a>
                    ))}
                </div>
            </div>

            {/* Huge Links Columns */}
            <div className="lg:col-span-8 flex flex-col md:flex-row justify-between gap-12">
                {[
                    { title: "Platform", links: [{n: "Courses", v: "courses"}, {n: "Mentors", v: "mentors"}, {n: "Pricing", v: "pricing"}] },
                    { title: "Company", links: [{n: "About Us", v: "home"}, {n: "Careers", v: "home"}, {n: "Contact", v: "home"}] },
                    { title: "Legal", links: [{n: "Privacy", v: "home"}, {n: "Terms", v: "home"}] }
                ].map((col) => (
                    <div key={col.title} className="flex flex-col gap-4">
                        <h4 className="font-bold text-sm uppercase tracking-widest text-zinc-500 mb-4">{col.title}</h4>
                        {col.links.map(link => (
                            <button 
                                key={link.n}
                                onClick={() => onNavigate(link.v as Page)}
                                className="text-3xl md:text-4xl font-black text-gray-300 hover:text-piku-lime transition-colors text-left group flex items-center gap-2"
                            >
                                <span className="opacity-0 -ml-6 group-hover:opacity-100 group-hover:ml-0 transition-all duration-300 text-2xl text-piku-lime">→</span>
                                {link.n}
                            </button>
                        ))}
                    </div>
                ))}
            </div>
        </div>

        <div className="py-8 flex flex-col md:flex-row justify-between items-center gap-4 font-bold text-sm text-zinc-500">
            <div>© 2024 Learnova Inc.</div>
            <div className="flex gap-8">
                <span className="uppercase tracking-wider">Made with ⚡️ Creative</span>
            </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;