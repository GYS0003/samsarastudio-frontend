"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import {
  FaChartLine, FaCogs, FaBullhorn, FaMobileAlt, FaHeadset,
  FaPaintBrush, FaSearch, FaAd, FaPercent, FaCheck,
} from "react-icons/fa";

const features = [
  {
    icon: <FaChartLine />,
    title: "Smart Strategy & Planning",
    description: "Craft data-driven strategies tailored to your brand goals.",
  },
  {
    icon: <FaPaintBrush />,
    title: "Creative Content Design",
    description: "Engaging visuals designed to convert across all platforms.",
  },
  {
    icon: <FaSearch />,
    title: "SEO Optimization",
    description: "Boost visibility with SEO best practices.",
  },
  {
    icon: <FaAd />,
    title: "Google Ads & Analytics",
    description: "Maximize ROI with targeted campaigns.",
  },
  {
    icon: <FaCogs />,
    title: "Easy Customization",
    description: "Flexible options to match your brand identity.",
  },
  {
    icon: <FaPercent />,
    title: "Performance Focused",
    description: "Optimized for speed and conversions.",
  },
  {
    icon: <FaHeadset />,
    title: "Dedicated Support",
    description: "Expert help to grow and troubleshoot.",
  },
  {
    icon: <FaMobileAlt />,
    title: "Responsive Design",
    description: "Great experiences on all devices.",
  },
  {
    icon: <FaBullhorn />,
    title: "Social Media Integration",
    description: "Seamless management across platforms.",
  },
];

export default function CombinedFeatureHeroSection() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true, margin: "0px 0px -100px 0px" });

  return (
    <section
      ref={ref}
      className="relative z-10 py-16 min-h-screen flex flex-col justify-center items-center px-4  md:px-6 dark:bg-transparent"

    >
      <div className="text-center mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 15 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-2xl md:text-3xl font-bold tracking-tight text-violet-600 dark:text-violet-400 font-display"
        >
          Expert Digital Marketing Solutions
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="mt-2 text-sm text-gray-600 dark:text-gray-300 max-w-xl mx-auto"
        >
          Exclusive features tailored for your brand
        </motion.p>
      </div>

      <div className="max-w-6xl mb-4 mx-auto">
        <motion.div 
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1
              }
            }
          }}
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={{
                hidden: { opacity: 0, y: 20 },
                visible: { 
                  opacity: 1, 
                  y: 0,
                  transition: { 
                    duration: 0.4,
                    ease: "easeOut"
                  }
                }
              }}
              whileHover={{ 
                y: -3,
                boxShadow: "0 6px 12px -3px rgba(0, 0, 0, 0.1)"
              }}
              className="bg-white dark:bg-gray-800/30 backdrop-blur-sm rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700/40 transition-all duration-250"
            >
              <div className="flex items-start gap-3">
                <div className="flex-shrink-0 w-9 h-9 rounded-lg bg-violet-500/10 dark:bg-violet-500/20 flex items-center justify-center text-violet-600 dark:text-violet-400">
                  {React.cloneElement(feature.icon, { size: 18 })}
                </div>
                <div className="flex-1">
                  <h3 className="text-base font-semibold text-gray-800 dark:text-gray-100 mb-1">
                    {feature.title}
                  </h3>
                  <p className="text-xs text-gray-600 dark:text-gray-300 leading-relaxed">
                    {feature.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}