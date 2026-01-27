import React from 'react';
import { motion } from 'framer-motion';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'dark' | 'outline';
  size?: 'sm' | 'md' | 'lg';
  children: React.ReactNode;
  className?: string;
}

const Button: React.FC<ButtonProps> = ({ 
  variant = 'primary', 
  size = 'md', 
  children, 
  className = '',
  ...props 
}) => {
  const baseStyles = "inline-flex items-center justify-center rounded-full font-bold transition-all duration-300 focus:outline-none disabled:opacity-50 disabled:pointer-events-none relative overflow-hidden";
  
  const variants = {
    primary: "bg-piku-lime text-black border-2 border-black hover:border-black shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    secondary: "bg-white text-black border-2 border-black hover:bg-gray-50 shadow-[4px_4px_0px_0px_rgba(0,0,0,1)]",
    dark: "bg-black text-white border-2 border-black hover:text-white shadow-[4px_4px_0px_0px_rgba(100,100,100,0.5)]",
    outline: "bg-transparent border-2 border-black text-black hover:bg-black hover:text-white",
  };

  const sizes = {
    sm: "h-10 px-5 text-sm",
    md: "h-12 px-8 text-base",
    lg: "h-14 px-10 text-lg",
  };

  return (
    <motion.button
      whileHover={{ 
        scale: 1.02,
        x: 2,
        y: 2,
        boxShadow: "0px 0px 0px 0px rgba(0,0,0,1)",
      }}
      whileTap={{ scale: 0.95 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className={`${baseStyles} ${variants[variant]} ${sizes[size]} ${className}`}
      {...props}
    >
      {children}
    </motion.button>
  );
};

export default Button;