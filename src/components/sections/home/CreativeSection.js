"use client";

import React, { useRef } from "react";
import { motion, useInView  } from "framer-motion";
import { FaCheck } from "react-icons/fa";
import Image from "next/image";
import Marketing from "@/assets/Home/Marketing.png";
import DecryptedText from "@/components/ui/Animations/DecryptedText";

const heroPoints = [
  "Performance driven approach",
  "Seamless User Experience",
  "Custom-Strategies for Every Brand",
  "End-to-End Marketing Solutions",
  "Insight-backed Creativity",
];

export default function CreativeSection() {
  const ref = useRef();
  const isInView = useInView(ref, { once: true });
  

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { delay: i * 0.1, duration: 0.5, ease: "easeOut" },
    }),
  };

  return (
    <section
      ref={ref}
      className="relative flex flex-col justify-center min-h-screen z-10 pt-14 px-4 pb-10 md:px-10 dark:bg-transparent transition-colors duration-300"
    >
      <div className="max-w-7xl mx-auto pt-8 grid md:grid-cols-2 gap-10 items-center">
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-3xl md:text-4xl font-extrabold gradient-text-violet mb-4 tracking-tight font-display">
            Creative Digital Marketing <br />That Delivers Real Results
          </h2>
          <p className="text-gray-600 dark:text-text-tertiary mb-6 text-sm md:text-base font-light leading-relaxed">
            At Samsara Studio, we specialize in building impactful digital experiences that help businesses grow online. Our campaigns are purpose-built for your brand's unique voice and audience.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {heroPoints.map((item, i) => (
              <motion.div
                key={i}
                className="flex items-start gap-2"
                initial="hidden"
                animate={isInView ? "visible" : "hidden"}
                custom={i}
                variants={itemVariants}
              >
                <span className="text-secondary mt-1">
                  <FaCheck size={14} />
                </span>
                <p className="text-sm text-gray-600 dark:text-white font-medium">
                  <DecryptedText
                    text={item}
                    speed={100}
                    maxIterations={20}
                    characters="ABCD1234!?"
                    className="revealed"
                    parentClassName="all-letters"
                    animateOn="view"
                    encryptedClassName="encrypted"
                    revealDirection="center"
                  />
                </p>
              </motion.div>
            ))}
          </div>
          <p className="mt-6 text-gray-600 dark:text-text-tertiary text-sm md:text-base font-light leading-relaxed">
            We don’t just execute—we collaborate. Every strategy we develop is backed by analytics and creativity, making sure your digital footprint reflects the value you provide. With our full-stack capabilities, you're equipped with everything you need to outperform your competition.
          </p>
        </motion.div>

        <motion.div
          className="relative group"
          initial={{ opacity: 0, x: 50 }}
          animate={isInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.6 }}
        >
          <div className="overflow-hidden rounded-xl">
            <Image
              src={Marketing}
              alt="Marketing"
              width={478}
              height={750}
              className="rounded-xl transition-transform duration-300 hover:scale-105 object-cover"
            />
          </div>
        </motion.div>
      </div>
    </section>
  );
}
