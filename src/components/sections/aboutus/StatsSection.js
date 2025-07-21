'use client'

import { motion } from 'framer-motion';
import React, { useEffect } from 'react';
import counterUp from "@/components/utils/helpers/counter";
import GradientButton from '@/components/ui/GradientButton';

const StatsSection = () => {
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        when: "beforeChildren"
      }
    }
  };

  const itemVariants = {
    hidden: { y: 30, opacity: 0, scale: 0.95 },
    visible: {
      y: 0,
      opacity: 1,
      scale: 1,
      transition: {
        duration: 0.6,
        ease: "backOut"
      }
    }
  };

  const statVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.8,
        ease: "easeOut"
      }
    }
  };

  const stats = [
    {
      value: 98,
      title: "Client Satisfaction & Project Success",
      description: "We deliver tailored software solutions that exceed expectations, empowering businesses to grow smarter and faster."
    },
    {
      value: 92,
      title: "Digital Growth & Innovation Success",
      description: "We empower businesses to evolve through intelligent strategies – from reimagining systems to launching agile solutions."
    },
    {
      value: 87,
      title: "Enhanced Workflow & Productivity",
      description: "Our smart software eliminates bottlenecks, automates processes, and empowers teams to work efficiently."
    }
  ];

  useEffect(() => {
    counterUp();
  }, []);

  return (
    <motion.section
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="relative z-10 min-h-screen w-full  flex flex-col justify-center items-center py-22 md:py-20 px-4 md:px-10 lg:px-20"
    >
      <div className="max-w-7xl mx-auto w-full">
        {/* Title with enhanced animations */}
        <motion.div 
          className="text-center mb-14"
          initial={{ opacity: 0, y: -30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold gradient-text-violet font-sans mb-2"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.8 }}
          >
            Real Results, Trusted by Clients
          </motion.h2>
          
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-xl mx-auto text-base md:text-lg font-light"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.4, duration: 0.8 }}
          >
            Proven strategies and measurable impact — we let the numbers speak.
          </motion.p>
        </motion.div>

        {/* Cards with enhanced animations */}
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: "-100px" }}
          variants={containerVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-6"
        >
          {stats.map((stat, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              custom={index}
              whileHover={{ 
                y: -10,
                boxShadow: '0 20px 30px rgba(0,0,0,0.1)',
                transition: { duration: 0.3 }
              }}
              className="rounded-2xl p-6 border shadow-md hover:shadow-lg transition duration-300 border-gray-200 dark:border-gray-700 bg-white dark:bg-[#151a27]/10"
            >
              <div className="flex flex-col items-center text-center space-y-4">
                {/* Animated percentage value */}
                <motion.div 
                  variants={statVariants}
                  className="text-5xl font-black gradient-text-violet counter font-mono"
                >
                  <span data-countup-number={stat.value}>{stat.value}</span>%
                </motion.div>
                
                {/* Title with animation */}
                <motion.h3 
                  className="text-lg font-semibold text-gray-800 dark:text-white font-sans"
                  variants={statVariants}
                  transition={{ delay: 0.1 }}
                >
                  {stat.title}
                </motion.h3>
                
                {/* Description with animation */}
                <motion.p 
                  className="text-sm text-gray-600 dark:text-gray-400 font-light leading-relaxed"
                  variants={statVariants}
                  transition={{ delay: 0.2 }}
                >
                  {stat.description}
                </motion.p>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* CTA Button with enhanced animation */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ 
            delay: 0.6,
            type: "spring",
            stiffness: 100,
            damping: 15
          }}
          className="mt-12 flex justify-center"
        >
          <GradientButton as={'link'} href={'/portfolio'}>
            <motion.span
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: 0.2 }}
            >
              See Our Success Stories
            </motion.span>
          </GradientButton>
        </motion.div>
      </div>
      

    </motion.section>
  );
};

export default StatsSection;