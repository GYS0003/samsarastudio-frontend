"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import GradientButton from "@/components/ui/GradientButton";

const ThinkBuildGrow = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="min-h-screen relative z-10 flex flex-col justify-center items-center px-4 py-16 text-center text-white bg-gradient-to-b from-pink-700 to-purple-700 dark:bg-none"

    >
      {/* Animated container */}
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6, ease: "easeOut" }}
        className="space-y-6 max-w-3xl"
      >
        <h2 className="text-3xl md:text-5xl font-bold tracking-wide">
          <span className="text-white ">Think</span>{" "}
          <span className="text-purple-400">.</span>{" "}
          <span className="text-white">Build</span>{" "}
          <span className="text-purple-400">.</span>{" "}
          <span className="text-white">Grow</span>
        </h2>

        <p className="text-sm md:text-lg text-gray-300">
          Our portfolio showcases our expertise in <strong>App Development</strong>,{" "}
          <strong>Web Development</strong>, <strong>UI/UX Designing</strong>. Each
          project reflects our <strong>creativity</strong>, <strong>strategy</strong>,
          and <strong>commitment</strong> to excellence.
        </p>

        <motion.div
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.97 }}
          className="inline-block"
        >
            <GradientButton as={'link'} href={'/portfolio'}>Explore Our Portfolio</GradientButton>
          
        </motion.div>
      </motion.div>
    </section>
  );
};

export default ThinkBuildGrow;
