'use client';

import React from 'react';
import { motion, useInView } from 'framer-motion';
import { Playfair_Display, Poppins } from 'next/font/google';
import { useRef } from 'react';
import BlurText from '@/components/ui/Animations/BannerAnimation';
import RotatingText from '@/components/ui/Animations/RotatingText';
import GradientText from '@/components/ui/Animations/GradientText';
import DotGrid from '@/components/ui/Animations/DotGrid';
import { SparklesCore } from '@/components/ui/sparkles';

// Load fonts
const playfair = Playfair_Display({
  subsets: ['latin'],
  weight: ['400', '700', '900'],
  variable: '--font-playfair',
});

const poppins = Poppins({
  subsets: ['latin'],
  weight: ['300', '500', '700'],
  variable: '--font-poppins',
});

const wordAnimation = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.08,
      delayChildren: 0.3
    }
  }
};

const letterAnimation = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      type: 'spring',
      damping: 12,
      stiffness: 200
    }
  }
};

const Banner = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1 }}
      className={`relative min-h-screen w-full  overflow-hidden flex justify-center items-center  text-gray-900 dark:text-white select-none ${playfair.variable} ${poppins.variable}`}
      ref={ref}
    >
      <div className="absolute inset-0 z-0 w-full h-full">
          <DotGrid
            dotSize={2}
            gap={20}
            baseColor="#393E46"
            activeColor="#5227FF"
            proximity={50}
            shockRadius={250}
            shockStrength={5}
            resistance={750}
            returnDuration={1.5}
          />
         
        <div className="relative -mt-125 h-196 w-screen overflow-hidden [mask-image:radial-gradient(50%_50%,white,transparent)] before:absolute before:inset-0 before:bg-[radial-gradient(circle_at_bottom_center,#e60a64,transparent_10%)] before:opacity-90 after:absolute after:-left-1/2 after:top-1/2 after:aspect-[1/0.7] after:w-[200%] hidden dark:block after:rounded-[100%] after:border-t after:border-gray-300 dark:after:border-gray-700 after:bg-white dark:after:bg-black">
          <SparklesCore
            id="tsparticles"
            background="transparent"
            particleDensity={400}
            speed={3}
            minSize={1}
            maxSize={2}
            particleColor="#000000"
            darkParticleColor="#ffffff"
            lightBackground="#ffffff"
            darkBackground="#471396"
            className="absolute inset-x-0 bottom-0 h-full w-full  [mask-image:radial-gradient(80%_80%,white,transparent_95%)]"
          />
        </div>
     
      </div>
      <div className="relative z-10  text-center flex flex-col items-center">
        {/* Animated Heading with Letter-by-Letter Effect */}
         
        <motion.h1
          className=" text-sm border border-violet-500 text-violet-400 bg-violet-600/10 px-2 py-1 rounded-4xl font-medium   "
          variants={wordAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          Digital Marketing
        </motion.h1>
        <motion.h1
          className=" text-5xl font-medium  leading-tight md:leading-snug mb-6"
          variants={wordAnimation}
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
        >
          <span className="inline-block text-transparent bg-clip-text bg-gradient-to-t from-violet-600 to-violet-400  overflow-hidden">
            {/* <motion.span
              className=" bg-clip-text text-transparent  inline-block"
              variants={letterAnimation}
            > */}
              {/* <GradientText
                colors={["#ff0080", "#7928ca", "#7A1CAC", "#AD49E1", "#ff0080"]}

                animationSpeed={3}
                showBorder={false}
                className="custom-class"
              > */}
                Creative Digital Marketing that Converts
              {/* </GradientText> */}
            {/* </motion.span> */}
          </span>

        </motion.h1>

        {/* Animated Subtitle with Multiple Effects */}
        <motion.div
          className="flex flex-row items-center justify-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? {
            opacity: 1,
            y: 0,
            transition: { delay: 0.6 }
          } : {}}
        >

          {/* <BlurText
            text="We create"
            delay={0.8}
            animateBy="words"
            direction="top"
            className="text-xl sm:text-2xl md:text-3xl font-bold text-center"
          /> */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={isInView ? {
              scale: 1,
              opacity: 1,
              transition: { delay: 1, type: 'spring' }
            } : {}}
          >
            <RotatingText
              texts={['We Build brands that connect', 'Marketing strategies that deliver', 'Visuals that speak', 'Tech that fuels your ambition']}
              mainClassName="mx-2 px-3  text-gray-800 dark:text-gray-200 text-2xl sm:text-2xl md:text-3xl overflow-hidden py-1 sm:py-2 justify-center rounded-lg"
              staggerFrom="first"
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "-120%" }}
              staggerDuration={0.025}
              splitLevelClassName="overflow-hidden  font-bold pb-1"
              transition={{ type: "spring", damping: 30, stiffness: 400 }}
              rotationInterval={4000}
            />
          </motion.div>


        </motion.div>
            {/* <motion.div>
            Partner with a leading digital marketing agency to increase brand awareness, lead generation & conversions.
            </motion.div> */}
        {/* Animated Buttons */}
        <motion.div
          className="flex flex-col  sm:flex-row gap-6"
          initial={{ opacity: 0 }}
          animate={isInView ? {
            opacity: 1,
            transition: { delay: 1.4 }
          } : {}}
        >

          <motion.a
            href="/services"
            whileHover={{
              scale: 1.05,
              boxShadow: '0 10px 30px rgba(255, 140, 0, 0.3)'
            }}
            whileTap={{ scale: 0.95 }}
            className="px-8 py-4 border mt-15 border-violet-600 bg-white/80 dark:bg-gray-900/80 font-semibold rounded-2xl hover:border-2  dark:text-white text-black shadow-lg transition-all duration-300 text-lg"
            style={{ fontFamily: 'var(--font-poppins)' }}
            initial={{ y: 20, opacity: 0 }}
            animate={isInView ? {
              y: 0,
              opacity: 1,
              transition: { delay: 1.5 }
            } : {}}
          >
            Explore our work
          </motion.a>
        </motion.div>
      </div>

    </motion.section>
  );
};

export default Banner;