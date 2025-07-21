"use client";

import { motion, useInView } from "framer-motion";
import React, { useRef } from "react";
import { FaMobileAlt, FaLaptopCode, FaPalette,FaRobot } from "react-icons/fa";
import Link from "next/link";

const portfolioItems = [
  {
    title: "Mobile App Development",
    icon: <FaMobileAlt size={30} />,
    description: "High-performance mobile apps tailored for both Android and iOS platforms.",
    href: "#app-development",
  },
  {
    title: "Web Development",
    icon: <FaLaptopCode size={30} />,
    description: "Scalable, secure and SEO-optimized websites & portals for your business.",
    href: "#web-development",
  },
  {
    title: "AI & Blockchain",
    icon: <FaRobot size={30} />,
    description: "Seamless integration of AI/ML and blockchain for advanced digital solutions.",
    href: "#ai-blockchain",
  },
  {
    title: "Our Products",
    icon: <FaPalette size={30} />,
    description: "Explore our in-house products crafted with creativity and innovation.",
    href: "#our-products",
  },
];

const PortfolioSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen relative z-10 px-6 py-20 text-gray-800 dark:text-white flex flex-col md:flex-row items-center justify-center gap-10"
    >
      <motion.div
        initial={{ opacity: 0, x: -50 }}
        animate={isInView ? { opacity: 1, x: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="bg-purple-700 text-white p-10 rounded-xl w-full md:w-1/2 text-center md:text-left"
      >
        <h2 className="text-2xl md:text-3xl font-bold mb-4">Our Portfolio</h2>

        <p className="text-sm md:text-base text-purple-100 mb-4">
          At GYS Technologies, we transform ideas into powerful digital products across various industries. Each project reflects our deep commitment to:
        </p>

        <ul className="list-disc pl-5 text-sm text-purple-100 space-y-2">
          <li>Custom mobile and web app development</li>
          <li>Scalable backend infrastructure & APIs</li>
          <li>Cutting-edge AI/ML and Blockchain integrations</li>
          <li>Seamless user experiences with UI/UX excellence</li>
        </ul>

        <p className="mt-6 text-sm text-purple-200">
          Explore our work to see how we bring ideas to life — combining strategic thinking, technical expertise, and stunning design.
        </p>
      </motion.div>

      {/* Right Animated Block */}
      <div className="grid gap-6 w-full md:w-1/2">
        {portfolioItems.map((item, index) => (
          <Link key={item.title} href={item.href}>
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: index * 0.2 }}
              className="cursor-pointer bg-white/10 backdrop-blur-lg border border-white/20 rounded-xl p-6 shadow-md flex items-start gap-4 hover:bg-white/20 dark:hover:bg-white/10"
            >
              <div className="text-purple-400">{item.icon}</div>
              <div>
                <h3 className="font-semibold text-lg mb-1 text-gray-800 dark:text-white">
                  {item.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300">
                  {item.description}
                </p>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default PortfolioSection;
