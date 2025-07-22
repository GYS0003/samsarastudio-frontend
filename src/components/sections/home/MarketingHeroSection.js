"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import illustration from '@/assets/Home/DigitalMarketing.jpg'
import BlurText from "@/components/ui/Animations/BannerAnimation";

const MarketingHeroSection = () => {
  return (
    <motion.section
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.8 }}
      className="w-full relative min-h-screen pt-16 px-4 md:px-10 lg:px-20 flex flex-col justify-center"
    >
      <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 w-full mb-5">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="w-full md:w-1/2 h-[200px] sm:h-[250px] md:h-[300px] lg:h-[350px] relative"
        >
          <Image
            src={illustration}
            alt="Marketing Illustration"
            fill
            priority
            className="object-contain rounded-md"
            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 50vw"
          />
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="w-full flex flex-col items-center justify-center md:items-start md:w-1/2"
        >
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.6 }}
            className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left font-bold gradient-text-violet mb-6"
          >
            Transform your brand with <br />
            expert digital marketing solutions
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.7 }}
            className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mb-8"
          >
            We help businesses grow their online presence, boost engagement, and drive measurable
            results through data-driven strategies. With a proven track record of delivering
            impactful campaigns, we focus on scalable, customized solutions across SEO, social media,
            content, and more.
          </motion.p>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
          >
            <Link href="/services">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="btn-primary px-8 py-3 rounded-full font-semibold transition-all hover:shadow-lg"
              >
                Explore our services
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </motion.section>
  );
};

export default MarketingHeroSection;