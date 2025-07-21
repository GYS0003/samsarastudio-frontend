"use client";

import React, { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import OP1 from "@/assets/OurProducts/OP1.png";
import OP2 from "@/assets/OurProducts/OP2.png";

const OurProductsSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true });

  return (
    <section
      ref={ref}
      id="our-products"
      className="min-h-screen flex flex-col justify-center items-center px-6 md:px-16 py-16 relative z-10 transition-colors duration-300"
    >
      <div className="text-center mb-5 md:mb-12">
        <h2 className="text-3xl sm:text-4xl font-bold text-gray-800 dark:text-white">
          Our Own Products
        </h2>
        <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto mt-2">
          Explore our in-house creations built to inspire, grow, and connect.
        </p>
      </div>

      <div className="grid md:grid-cols-2 gap-4 md:gap-10">
        {/* Product 1 */}
        <Link href="/samsara-adventures">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="cursor-pointer bg-white/10 dark:bg-white/5 backdrop-blur-md p-4 rounded-xl border border-blue-500/20 text-gray-800 dark:text-white hover:shadow-xl hover:shadow-blue-500/20 transition duration-300"
          >
            <div className="w-full h-50 relative">
              <Image
                src={OP1}
                alt="Samsara Adventures"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold my-2">Samsara Adventures</h3>
            <p className="tex-gray-800/90 dark:text-white/90 text-sm">
              Samsara Adventures offers unforgettable travel experiences that
              blend adventure, culture, and natural beauty. From guided treks and
              wildlife tours to immersive cultural journeys, we craft trips that
              inspire and transform.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-blue-700 dark:text-blue-100 space-y-1">
              <li>Eco-conscious expeditions</li>
              <li>Expert-led curated travel</li>
              <li>Multi-day and local tours</li>
            </ul>
          </motion.div>
        </Link>

        {/* Product 2 (Updated to GYS Technologies) */}
        <Link href="/gys-technologies">
          <motion.div
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="cursor-pointer bg-white/10 dark:bg-white/5 backdrop-blur-md p-4 rounded-xl border border-blue-500/20 text-gray-800 dark:text-white hover:shadow-xl hover:shadow-blue-500/20 transition duration-300"
          >
            <div className="w-full h-50 relative">
              <Image
                src={OP2}
                alt="GYS Technologies"
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h3 className="text-2xl font-semibold my-2">GYS Technologies</h3>
            <p className="text-gray-800/90 dark:text-white/90 text-sm">
              GYS Technologies is a cutting-edge tech firm providing innovative digital
              solutions that drive business transformation. Custom software
              development and cloud infrastructure to AI integrations and tech consulting,
              we build technology that delivers impact.
            </p>
            <ul className="list-disc list-inside mt-4 text-sm text-blue-600 dark:text-blue-100 space-y-1">
              <li>Custom software and web platforms</li>
              <li>AI-driven automation & analytics</li>
              <li>Full-stack development & DevOps</li>
            </ul>
          </motion.div>
        </Link>
      </div>
    </section>
  );
};

export default OurProductsSection;
