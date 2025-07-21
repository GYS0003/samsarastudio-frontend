"use client";

import React from "react";
import { motion } from "framer-motion";

const stats = [
  {
    value: "60M",
    description: "By optimizing your website for search engine.",
    color: "gradient-text-violet",
  },
  {
    value: "80%",
    description: "Marketing Strategies are centered around your business goals.",
    color: "gradient-text-violet",
  },
  {
    value: "95%",
    description: "Tracking and analyzing the result of every SEO campaign.",
    color: "gradient-text-violet",
  },
  {
    value: "75k",
    description: "Success through precision: targeting the right metrics",
    color: "gradient-text-violet",
  },
];

// Animations
const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
      delayChildren: 0.2,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: "spring",
      stiffness: 80,
      damping: 20,
    },
  },
};

const ExpertiseStatsSection = () => {
  return (
    <section className="min-h-screen relative z-10 w-full  px-4 py-20 sm:px-6 lg:px-24 font-sans flex items-center">
      <div className="max-w-7xl mx-auto w-full grid md:grid-cols-2 gap-12 items-center">
        {/* Left - Animated Text */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.7, ease: "easeOut" }}
          viewport={{ once: true }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight font-sans">
            Where Expertise Meets{" "}
            <span className="gradient-text-violet">Exceptional Results</span>
          </h2>
          <p className="text-base text-gray-700 dark:text-gray-300 leading-relaxed font-light">
            The value of data-driven insights in business, marketing, or personal decision-making
            is crucial, but we also stress the importance of human intuition, creativity, and
            qualitative factors.
          </p>
        </motion.div>

        {/* Right - Animated Stats */}
        <motion.div
          className="grid grid-cols-1 sm:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {stats.map((item, i) => (
            <motion.div
              key={i}
              className="bg-white dark:bg-[#1f2937]/10 dark:border dark:border-zinc-800 rounded-xl shadow-md hover:shadow-xl transition-all p-6 h-full flex flex-col justify-center"
              variants={cardVariants}
            >
              <h3
                className={`text-4xl font-extrabold ${item.color} font-serif tracking-wide mb-2`}
              >
                {item.value}
              </h3>
              <p className="text-sm sm:text-base text-gray-800 dark:text-gray-300 font-medium">
                {item.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default ExpertiseStatsSection;
