"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { FaUsers, FaCogs, FaHeadphones, FaSatelliteDish } from "react-icons/fa";

const reasons = [
  {
    id: "01",
    title: "Expert Team",
    description:
      "Skilled professionals with deep expertise in cutting-edge technologies and agile methodologies.",
    icon: <FaUsers size={32} />,
    gradient: "from-pink-500 to-purple-600",
  },
  {
    id: "02",
    title: "Tailored Solutions",
    description:
      "We deliver custom software that aligns perfectly with your business goals and workflows.",
    icon: <FaCogs size={32} />,
    gradient: "from-purple-500 to-pink-500",
  },
  {
    id: "03",
    title: "Quality & Reliability",
    description:
      "Rigorous testing and quality control ensure stable, secure, and high-performing solutions.",
    icon: <FaSatelliteDish size={32} />,
    gradient: "from-blue-500 to-pink-500",
  },
  {
    id: "04",
    title: "Ongoing Support",
    description:
      "We provide dedicated post-launch support, updates, and continuous optimization.",
    icon: <FaHeadphones size={32} />,
    gradient: "from-purple-500 to-pink-400",
  },
];

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen justify-center   px-4 py-16 relative z-10 text-gray-800 dark:text-white flex flex-col items-center"
    >
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5 }}
        className="text-3xl md:text-4xl font-bold mb-12 text-center"
      >
        Why Choose Us
      </motion.h2>

      <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-4 md:gap-10 w-full max-w-6xl">
        {reasons.map((reason, index) => (
          <motion.div
            key={reason.id}
            initial={{ opacity: 0, y: 50 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: index * 0.15 }}
            className="flex flex-col items-center text-center px-4"
          >
            <div
              className={`relative mb-4 w-24 h-24 flex items-center text-white justify-center rounded-full bg-gradient-to-br ${reason.gradient} shadow-lg`}
            >
              {reason.icon}
              <span className="absolute top-0 left-0 bg-white/20 text-gray-800 dark:text-white  text-xs px-2 py-1 rounded-full -translate-y-2 -translate-x-2">
                {reason.id}
              </span>
            </div>
            <h3 className="text-lg font-semibold mb-2">{reason.title}</h3>
            <p className="text-sm text-gray-700 dark:text-gray-300">{reason.description}</p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default WhyChooseUs;
