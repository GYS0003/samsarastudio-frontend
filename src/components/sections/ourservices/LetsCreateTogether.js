"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import BgBanner from "@/assets/BgBanner.jpg"; 
import GradientButton from "@/components/ui/GradientButton";
// Replace with actual path

const LetsCreateTogether = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      className="relative min-h-screen flex flex-col items-center justify-center px-4 md:px-10 py-16 overflow-hidden "
    >
    
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
        className="relative z-10 text-center text-gray-800 dark:text-gray-100 "
      >
        <h2 className="text-2xl md:text-4xl font-bold mb-4">
          Let’s create together.
        </h2>
        <p className="text-sm md:text-base font-medium mb-6">
          <span className="font-semibold ">You have a vision.</span>{" "}
          We have a way to get you there.
        </p>
      </motion.div>
        <GradientButton as={'link'} href={'/aboutus/lets-talk'}>Schedule a meeting</GradientButton>
    </section>
  );
};

export default LetsCreateTogether;
