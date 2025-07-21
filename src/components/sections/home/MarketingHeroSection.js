"use client";

import React from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import Link from "next/link";
import illustration from '@/assets/Home/DigitalMarketing.jpg'
import Google from '@/assets/patners/Google.png';
import BRG from '@/assets/patners/BRG.jpg';
import BSE from '@/assets/patners/BSE.png';
import DBS from '@/assets/patners/DBS.png';
import FIS from '@/assets/patners/FIS.png';
import BlurText from "@/components/ui/Animations/BannerAnimation";

const logos = [BRG, BSE, DBS, FIS, Google];

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
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
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
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="w-full flex flex-col items-center justify-center md:items-start  md:w-1/2"
        >
          <h2 className="text-2xl sm:text-3xl md:text-4xl text-center md:text-left font-bold gradient-text-violet mb-6">
            Transform your brand with <br />
            expert digital marketing solutions
          </h2>
          <p className="text-gray-700 dark:text-gray-200 text-lg md:text-xl mb-8">
            We help businesses grow their online presence, boost engagement, and drive measurable
            results through data-driven strategies. With a proven track record of delivering
            impactful campaigns, we focus on scalable, customized solutions across SEO, social media,
            content, and more.
          </p>
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
      </div>
{/* 
      <div className="w-full overflow-hidden ">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="relative z-10 text-center my-4"
        >
          <BlurText
            text="Trusted Software Development Partners"
            delay={350}
            animateBy="words"
            direction="top"
            className="text-2xl sm:text-3xl  md:text-4xl font-semibold"
          />
        </motion.div>

        <div className="relative z-10 overflow-hidden">
          <motion.div
            className="flex w-max gap-8 py-2"
            animate={{ x: ['0%', '-50%'] }}
            transition={{
              repeat: Infinity,
              ease: 'linear',
              duration: 15,
            }}
          >
            {[...logos, ...logos].map((src, i) => (
              <LogoCard key={i} src={src} />
            ))}
          </motion.div>
        </div>
      </div> */}
    </motion.section>
  );
};

// const LogoCard = ({ src }) => (
//   <motion.div
//     whileHover={{ scale: 1.05 }}
//     className="min-w-[120px] sm:min-w-[140px] md:min-w-[160px] h-[60px] sm:h-[70px] md:h-[80px] flex justify-center items-center bg-transparent p-2"
//   >
//     <Image
//       src={src}
//       alt="partner logo"
//       width={160}
//       height={80}
//       className="object-contain w-full h-full mix-blend-multiply dark:mix-blend-screen"
//     />
//   </motion.div>
// );

export default MarketingHeroSection;