"use client";

import React, { useEffect, useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import { FiArrowUpRight } from "react-icons/fi";
import { getOnlyCategories } from "@/services/apis";
import Link from "next/link";

const IndustriesServedSection = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const [categories, setCategories] = useState([]);
  const MotionLink = motion(Link);
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getOnlyCategories();
        setCategories(data);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchData();
  }, []);



  return (
    <section
      ref={ref}
      className="min-h-screen relative z-10 pt-16 px-4 sm:px-8 md:px-16 flex flex-col justify-center"
    >
      <motion.h2
        className="text-3xl md:text-4xl font-extrabold text-center mb-8 tracking-tight"
        initial={{ opacity: 0, y: 20 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
      >
        Industries We Serve
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 max-w-5xl mx-auto"
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
        variants={{
          visible: {
            transition: {
              staggerChildren: 0.15,
            },
          },
        }}
      >
        {categories.map((industry) => (
          <MotionLink
            key={industry._id}
            href={`/portfolio/${industry._id}`}
            className="p-6 rounded-xl border border-gray-200 dark:border-gray-700 hover:bg-gray-100 dark:hover:bg-white/10 shadow-sm hover:shadow-md transition duration-300 text-center font-medium text-lg cursor-pointer scroll-mt-20 flex items-center justify-between gap-2 group"
            variants={{
              hidden: { opacity: 0, y: 20 },
              visible: { opacity: 1, y: 0 },
            }}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
          >
            <span className="flex-grow">{industry.name}</span>
            <FiArrowUpRight className="text-xl text-gray-500 group-hover:text-primary transition" />
          </MotionLink>
        ))}
      </motion.div>
    </section>
  );
};

export default IndustriesServedSection;
