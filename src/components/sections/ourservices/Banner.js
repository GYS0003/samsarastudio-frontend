"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import BlurText from "@/components/ui/Animations/BannerAnimation";

const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  const text = "Digital Transformation Engineering".split("");

  const containerVariants = {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: 0.06,
      },
    },
  };

  const letterVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section
      ref={ref} // ✅ Attach the ref here
      data-aos="fade-up"
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-gray-800 dark:text-white select-none px-4 py-8 md:px-10 lg:px-20"
    >
      <div className="relative z-10 flex-grow flex flex-col justify-center items-center text-left">
        <BlurText
          text="Our Services"
          delay={350}
          animateBy="words"
          direction="top"
          className="text-3xl sm:text-3xl text-wrap md:text-4xl lg:text-5xl font-semibold text-center"
        />

        <div className="text-center px-4">
          <motion.span
            className="text-3xl sm:text-3xl md:text-4xl lg:text-5xl font-bold leading-snug bg-gradient-to-r from-pink-500 via-orange-400 to-indigo-500 bg-clip-text text-transparent inline-block"
            variants={containerVariants}
            initial="hidden"
            animate={isInView ? "visible" : "hidden"} // ✅ Trigger animation
            style={{
              backgroundSize: "200% 200%",
              backgroundPosition: "0% 50%",
            }}
          >
            {text.map((char, index) => (
              <motion.span key={index} variants={letterVariants}>
                {char}
              </motion.span>
            ))}
          </motion.span>
        </div>
      </div>
    </section>
  );
};

export default Banner;
