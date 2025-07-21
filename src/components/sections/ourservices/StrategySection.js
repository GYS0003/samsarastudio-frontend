"use client";

import React, { useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import { FaRocket } from 'react-icons/fa';

// Updated creative design: rotating orbit rings with moving orbs around a rocket launch
export default function StrategySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-100px' });

  // Orb positions: angle and radius for circular path
  const orbs = [
    { label: '127k Users', angle: 0, radius: 100, delay: 0.3 },
    { label: '$25.7k Rev', angle: 120, radius: 100, delay: 0.5 },
    { label: '75% Launch', angle: 240, radius: 100, delay: 0.7 }
  ];

  // generate keyframes for each orb translateX/Y
  const orbAnimation = (angle, radius, delay) => {
    const rad = (angle * Math.PI) / 180;
    const x = Math.cos(rad) * radius;
    const y = Math.sin(rad) * radius;
    return {
      hidden: { opacity: 0, scale: 0 },
      visible: {
        opacity: 1,
        scale: 1,
        x: [0, x, 0],
        y: [0, y, 0],
        transition: {
          delay,
          duration: 2,
          repeat: Infinity,
          ease: 'easeInOut'
        }
      }
    };
  };

  return (
    <section
      ref={ref}
      className="w-full flex justify-center items-center px-4 py-16 md:py-20 relative z-10 min-h-screen font-sans "
    >
      <div className="max-w-7xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
        {/* Left: Rotating rings with moving orbs */}
        <div className="relative flex justify-center pb-10 items-center">
          {/* Orbit ring */}
          <motion.div
            className="absolute w-[260px] h-[260px] border-2 border-dashed border-violet-200 rounded-full"
            animate={inView ? { rotate: 360 } : {}}
            transition={{ duration: 20, ease: 'linear', repeat: Infinity }}
          />
          <motion.div
            className="absolute w-[200px] h-[200px] border-2 border-dashed border-violet-300 rounded-full"
            animate={inView ? { rotate: -360 } : {}}
            transition={{ duration: 30, ease: 'linear', repeat: Infinity }}
          />

          {/* Rocket at center */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: 'spring', stiffness: 260, damping: 20, delay: 0.2 }}
            className="relative text-violet-500 text-7xl z-10"
          >
            <FaRocket />
          </motion.div>

          {/* Orbiting orbs */}
          {orbs.map((orb, i) => (
            <motion.div
              key={i}
              variants={orbAnimation(orb.angle, orb.radius, orb.delay)}
              initial="hidden"
              animate={inView ? 'visible' : 'hidden'}
              className="absolute bg-white dark:bg-gray-800 p-3 rounded-full shadow-lg flex items-center justify-center w-16 h-16 text-sm text-center"
            >
              {orb.label}
            </motion.div>
          ))}
        </div>

        {/* Right: Text content */}
        <motion.div
          initial={{ opacity: 0, x: 50 }}
          animate={inView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <motion.h4
            initial={{ opacity: 0 }}
            animate={inView ? { opacity: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.6 }}
            className="text-sm text-violet-600 uppercase font-semibold tracking-wide"
          >
            Our Strategy
          </motion.h4>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.6, duration: 0.7 }}
            className="text-2xl md:text-3xl font-serif font-bold text-gray-800 dark:text-white leading-tight"
          >
            Strategic Marketing Tailored for <br className="hidden md:block" />
            <span className="text-violet-600">Your Time & Growth</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.8, duration: 0.7 }}
            className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-light"
          >
            Time is valuable, and growth is essential. That’s why our approach is molded around
            your goals and audience. We manage your marketing so you can focus on running your business.
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 1.0, duration: 0.7 }}
            className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-light"
          >
            Whether you’re scaling, entering new markets, or rebranding, our team becomes an extension
            of yours—agile, accountable, and always growth-focused.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
}
