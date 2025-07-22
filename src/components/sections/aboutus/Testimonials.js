"use client";

import React, { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion } from "framer-motion";
import { getTestimonials } from "@/services/apis";
import BlurText from "@/components/ui/Animations/BannerAnimation";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const containerRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);
  const animationRef = useRef();

  // 🔽 Fetch data from API
  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getTestimonials(); // should return array of { name, role, message, rating, imageUrl }
        setTestimonials([...data, ...data]); // duplicate for infinite scroll
      } catch (err) {
        console.error("Error loading testimonials:", err);
      }
    };

    fetchData();
  }, []);

  // 🔽 Auto-scroll
  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const scroll = () => {
      if (!isPaused && !isDragging) {
        container.scrollLeft += 0.5;
        if (container.scrollLeft >= container.scrollWidth / 2) {
          container.scrollLeft = 0;
        }
      }
      animationRef.current = requestAnimationFrame(scroll);
    };

    animationRef.current = requestAnimationFrame(scroll);

    return () => {
      cancelAnimationFrame(animationRef.current);
    };
  }, [isPaused, isDragging]);

  // 🔽 Drag-to-scroll handlers
  const handleMouseDown = (e) => {
    const container = containerRef.current;
    if (!container) return;

    setIsDragging(true);
    setStartX(e.pageX - container.offsetLeft);
    setScrollLeft(container.scrollLeft);
    container.style.scrollBehavior = "auto";
  };

  const handleMouseMove = (e) => {
    if (!isDragging || !containerRef.current) return;
    e.preventDefault();
    const x = e.pageX - containerRef.current.offsetLeft;
    const walk = (x - startX) * 2;
    containerRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    if (containerRef.current) {
      containerRef.current.style.scrollBehavior = "smooth";
    }
  };

  return (
    <section className=" flex flex-col justify-center items-center py-30 relative z-10 overflow-hidden">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="relative z-10 text-2xl sm:text-3xl md:text-4xl font-bold text-center my-6"
      >
         <BlurText
            text="Testimonials "
            delay={350}
            animateBy="words"
            direction="top"
            className="text-xl p-2 sm:text-2xl text-wrap md:text-2xl lg:text-3xl font-semibold text-center"
          />
      </motion.div>

      <div
        ref={containerRef}
        className="flex gap-8 w-full overflow-x-auto scrollbar-hide"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onMouseDown={handleMouseDown}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        style={{ cursor: isDragging ? "grabbing" : "grab" }}
      >
        {testimonials.map((item, index) => (
          <div
            key={index}
            className="min-w-[200px] max-w-[250px] md:min-w-[300px] md:max-w-[340px] bg-white dark:bg-violet-600/10 backdrop-blur-md shadow-md rounded-2xl border border-violet-300 dark:border-violet-500/80 p-6 text-center flex-shrink-0 my-4 transition-transform select-none hover:scale-105"
          >
            <div className="relative w-14 h-14 md:w-20 md:h-20 mx-auto mb-4">
              <Image
                src={item.imageUrl}
                alt={item.name}
                fill
                className="rounded-full object-cover"
              />
            </div>
            <h3 className="font-bold text-lg text-indigo-600 dark:text-indigo-400">
              {item.name}
            </h3>
            <p className="text-sm text-gray-600 dark:text-gray-300 mb-4">
              {item.occupation}
            </p>
            <p className="text-gray-700 dark:text-gray-100 text-sm mb-4">
              {item.feedback}
            </p>
            <div className="flex justify-center gap-1 text-yellow-500 text-lg">
              {Array.from({ length: item.rating }).map((_, i) => (
                <span key={i}>★</span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Testimonials;
