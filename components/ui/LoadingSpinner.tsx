import React from 'react';
import { motion } from 'framer-motion';

const LoadingSpinner: React.FC = () => {
    return (
        <div className="flex h-[50vh] w-full items-center justify-center bg-transparent">
            <motion.div
                className="h-16 w-16 border-4 border-gray-200 border-t-black dark:border-zinc-800 dark:border-t-white rounded-full"
                animate={{ rotate: 360 }}
                transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
            />
        </div>
    );
};

export default LoadingSpinner;
