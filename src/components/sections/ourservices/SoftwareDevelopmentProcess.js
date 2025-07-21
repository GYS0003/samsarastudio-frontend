"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";

const steps = [
  {
    step: "01",
    title: "Requirement Analysis",
    desc: "Understanding business needs and defining clear project goals.",
    icon: "🧠",
    color: "bg-cyan-600",
  },
  {
    step: "02",
    title: "Planning & Design",
    desc: "Crafting architecture, user flows, and UI/UX designs.",
    icon: "🗂️",
    color: "bg-indigo-600",
  },
  {
    step: "03",
    title: "Coding & Implementation",
    desc: "Translating designs into functional software using selected technologies.",
    icon: "💻",
    color: "bg-orange-500",
  },
  {
    step: "04",
    title: "Testing & QA",
    desc: "Ensuring functionality, performance, and security through thorough testing.",
    icon: "🧪",
    color: "bg-green-600",
  },
  {
    step: "05",
    title: "Deployment",
    desc: "Releasing the software to the live environment with full configuration.",
    icon: "🚀",
    color: "bg-pink-600",
  },
  {
    step: "06",
    title: "Maintenance & Optimization",
    desc: "Providing support, updates, and continuous improvements based on feedback.",
    icon: "🛠️",
    color: "bg-red-600",
  },
];

const SoftwareDevelopmentProcess = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen flex flex-col justify-center items-center px-4 py-16 md:px-10 lg:px-20 relative z-10"
    >
      <motion.h2
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl md:text-4xl font-bold text-gray-800 dark:text-white mb-12"
      >
        Software Development Process
      </motion.h2>

      <div className="grid gap-4  md:gap-8 md:grid-cols-2 lg:grid-cols-3">
        {steps.map((step, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: idx * 0.1, duration: 0.6 }}
            className="relative p-4 md:p-6 bg-white/30 dark:bg-white/10 backdrop-blur-md border border-white/20 rounded-xl shadow-md text-center"
          >
            <div
              className={`w-14 h-14 mx-auto flex items-center justify-center text-2xl text-white rounded-full ${step.color} mb-4`}
            >
              {step.icon}
            </div>
            <h3 className="text-lg font-semibold text-indigo-700 dark:text-indigo-400">
              {step.title}
            </h3>
            <p className="text-sm text-gray-700 dark:text-gray-300 mt-2">
              {step.desc}
            </p>
            <span className="absolute top-4 left-4 text-xs font-bold text-gray-500 dark:text-gray-300 opacity-80">
              {step.step}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default SoftwareDevelopmentProcess;
