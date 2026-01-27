import React from 'react';
import { motion } from 'framer-motion';
import { Star } from 'lucide-react';

const cardVariants = {
  hidden: { opacity: 0, y: 50 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.8,
      ease: [0.22, 1, 0.36, 1]
    }
  })
};

const Stats: React.FC = () => {
  return (
    <section className="py-24 bg-white dark:bg-zinc-900 border-y border-black/5 dark:border-white/10 overflow-hidden transition-colors duration-500">
      <div className="container mx-auto px-6">
        <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
          
          {/* Rating Card */}
          <motion.div 
            custom={0}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="rounded-3xl border-4 border-black dark:border-white p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-black transition-colors"
          >
            <motion.h3 
              initial={{ opacity: 0, scale: 0.5 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3, type: "spring" }}
              className="text-5xl font-black text-black dark:text-white mb-2"
            >
                4.9
            </motion.h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold mb-4">Student Satisfaction</p>
            <div className="flex justify-center gap-1 text-orange-400">
                {[1,2,3,4,5].map((i) => (
                    <motion.div
                        key={i}
                        initial={{ opacity: 0, rotate: -30 }}
                        whileInView={{ opacity: 1, rotate: 0 }}
                        transition={{ delay: 0.5 + (i * 0.1) }}
                    >
                        <Star fill="currentColor" size={24} />
                    </motion.div>
                ))}
            </div>
          </motion.div>

          {/* Completion Rate Card */}
          <motion.div 
            custom={1}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="rounded-3xl border-4 border-black dark:border-white p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-black transition-colors"
          >
            <motion.h3 
               initial={{ opacity: 0, scale: 0.5 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.5, type: "spring" }}
               className="text-5xl font-black text-black dark:text-white mb-2"
            >
                94%
            </motion.h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold">Completion Rate</p>
            <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 0.8 }}
                className="mt-4 text-sm font-bold bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 px-3 py-1 rounded-full inline-block origin-left"
            >
                Industry Leading
            </motion.div>
          </motion.div>

           {/* Learners Card */}
           <motion.div 
            custom={2}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={cardVariants}
            whileHover={{ y: -10, transition: { duration: 0.3 } }}
            className="rounded-3xl border-4 border-black dark:border-white p-8 text-center shadow-[6px_6px_0px_0px_rgba(0,0,0,1)] dark:shadow-[6px_6px_0px_0px_rgba(255,255,255,1)] bg-white dark:bg-black transition-colors"
          >
            <motion.h3 
               initial={{ opacity: 0, scale: 0.5 }}
               whileInView={{ opacity: 1, scale: 1 }}
               transition={{ delay: 0.7, type: "spring" }}
               className="text-5xl font-black text-black dark:text-white mb-2"
            >
                1M+
            </motion.h3>
            <p className="text-gray-500 dark:text-gray-400 font-bold">Active Learners</p>
            <motion.div 
                initial={{ scaleX: 0 }}
                whileInView={{ scaleX: 1 }}
                transition={{ delay: 1.0 }}
                className="mt-4 text-sm font-bold bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 px-3 py-1 rounded-full inline-block origin-left"
            >
                Global Community
            </motion.div>
          </motion.div>

        </div>
      </div>
    </section>
  );
};

export default Stats;