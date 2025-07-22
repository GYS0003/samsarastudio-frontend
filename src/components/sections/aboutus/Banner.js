"use client";

import React from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import BannerImage from "@/assets/AboutUs/AboutUsBanner.png";
import Link from "next/link";

const points = [
  "Marketing Professional",
  "High Business Increase",
  "Latest Technologies",
  "Measurable results",
];

// Animation Variants
const containerVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const fadeUpVariant = {
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
};

const fadeVariant = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8 } },
};

const Banner = () => {
  return (
    <section className="relative z-10 min-h-screen py-22 px-4 md:px-10 lg:px-20 max-w-7xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 items-center">
        {/* Left Side */}
        <motion.div
          className="relative flex justify-center items-center"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={fadeUpVariant}
        >
          <Image
            src={BannerImage}
            alt="Business woman"
            width={540}
            height={602}
            className="z-10 relative rounded-xl object-cover"
          />
             <motion.div
            className="absolute -bottom-6 left-4 z-20 bg-gradient-to-r text-white from-violet-600 to-violet-500 border border-gray-200 dark:border-gray-800 bg-white/10 font-semibold px-6 py-3 rounded-lg shadow-lg max-w-[230px] text-sm text-center"
            variants={fadeVariant}
          >
            Helped 4k of businesses to achieve top ranking
          </motion.div>
       
        </motion.div>

        {/* Right Side */}
        <motion.div
          className="space-y-5"
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          variants={containerVariants}
        >
          <motion.h4
            className="uppercase underline underline-offset-2 text-sm gradient-text-violet font-semibold tracking-wide"
            variants={fadeUpVariant}
          >
            About Us
          </motion.h4>

          <motion.h2
            className="text-2xl sm:text-3xl font-bold text-gray-800 dark:text-white leading-snug"
            variants={fadeUpVariant}
          >
            Driving Business Growth Through
            <br />
            <span className="gradient-text-violet">Innovation and Expertise</span>
          </motion.h2>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
            variants={fadeUpVariant}
          >
            {`In today’s fast-evolving digital landscape, staying ahead requires
            more than just strategy—it demands vision. At Samsara Studio, we
            take a proactive and innovative approach to digital marketing. Our
            team blends deep industry insight with cutting-edge technologies
            like AI and machine learning to craft custom solutions that deliver
            measurable results.`}
          </motion.p>

          <motion.p
            className="text-gray-600 dark:text-gray-300 text-sm sm:text-base leading-relaxed"
            variants={fadeUpVariant}
          >
           {`We don’t just follow trends—we create strategies that shape them.
            Whether you’re a startup or an established brand, we help you grow,
            scale, and succeed online.`}
          </motion.p>

          {/* CTA & Points */}
          <motion.div
            className="grid grid-cols-1 sm:grid-cols-2 gap-2 mt-4 p-2 rounded-xl border border-gray-300 dark:border-white/10 shadow-sm bg-white dark:bg-gray-900 space-y-2"
            variants={fadeUpVariant}
          >
            <div>
              <h3 className="font-semibold text-sm text-gray-800 dark:text-white">
                Need Custom?
              </h3>
              <p className="text-xs text-gray-500 dark:text-gray-400 pb-3">
                We completed 85% success project in business
              </p>
              <Link href={'/aboutus/lets-talk'} className="px-4 mt-3 py-2 rounded-md text-white btn-primary text-sm font-medium transition">
                {"Let's Talk →"}
              </Link>
            </div>

            <motion.ul
              className="text-xs space-y-2 pt-3"
              variants={containerVariants}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
            >
              {points.map((point, index) => (
                <motion.li
                  key={index}
                  className="text-gray-700 dark:text-gray-300 flex items-center gap-2"
                  variants={fadeUpVariant}
                >
                  <span className="w-2 h-2 rounded-full bg-violet-400" />
                  {point}
                </motion.li>
              ))}
            </motion.ul>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
};

export default Banner;
