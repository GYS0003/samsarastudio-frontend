"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import RotatingText from "@/components/ui/Animations/RotatingText";
import BlurText from "@/components/ui/Animations/BannerAnimation";

const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <section
      ref={ref}
      className="relative min-h-screen pt-16 px-4 flex items-center justify-center text-white overflow-hidden "
    >
      <motion.div
        className="relative z-20 text-center max-w-4xl"
        initial={{ opacity: 0, y: 40 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.7, ease: "easeOut" }}
      >
        {/* Title */}
        <motion.h1
          className="text-3xl md:text-4xl text-gray-900 dark:text-gray-100 font-bold mb-6"
          initial={{ opacity: 0, y: -20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.2, duration: 0.6 }}
        >
          Portfolio
        </motion.h1>

        {/* Single line text with rotating part */}
        <motion.div
          className="flex flex-wrap items-center justify-center gap-2 text-xl sm:text-2xl md:text-3xl mb-8"
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4 }}
        >
          <BlurText
            text="Revolutionizing Digital Landscapes:"
            delay={0.6}
            animateBy="words"
            direction="top"
            className="font-medium text-gray-800 dark:text-gray-200  whitespace-nowrap"
          />
          
          <motion.div
            className="inline-flex"
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? { scale: 1, opacity: 1 } : {}}
            transition={{ delay: 1, type: "spring", stiffness: 300, damping: 25 }}
          >
            <RotatingText
              texts={[
                "Your Vision, Our Vision",
                "Your Success, Our Success",
                "Your Growth, Our Growth",
              ]}
              mainClassName="mx-2 px-3 bg-gradient-to-r from-violet-700 to-purple-600 text-gray-200 overflow-hidden py-1 justify-center rounded-lg"
              staggerFrom="last"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden font-bold"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={2000}
            />
          </motion.div>
        </motion.div>
      </motion.div>
    </section>
  );
};

export default Banner;