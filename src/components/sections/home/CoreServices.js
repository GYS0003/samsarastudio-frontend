"use client";

import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getServices } from "@/services/apis"; // Ensure this returns full service data with intro.imageUrl

const CoreServices = () => {
  const [services, setServices] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await getServices(); // Should return an array of service objects
        setServices(data);
      } catch (err) {
        console.error("Failed to fetch services:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <motion.section
      initial="hidden"
      whileInView="visible"
      viewport={{ once: true }}
      transition={{ duration: 0.3 }}
      className="relative py-16 min-h-screen px-4 md:px-8 lg:px-12 max-w-[1440px] mx-auto text-center overflow-hidden">
      <h2 className="text-3xl md:text-4xl font-bold mb-10 gradient-text-violet z-10 relative">
        Our Core Services
      </h2>



      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-8 relative z-10">
        {services.map((service, index) => (
          <Link
            href={`/services/${service.id}`}
            key={service._id || index}
            className="block group"
          >
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl shadow-md hover:shadow-xl transition-all overflow-hidden border border-gray-200 dark:border-white/10 text-left flex flex-col h-full"
            >
              {service?.intro?.imageUrl && (
                <Image
                  src={service.intro.imageUrl}
                  alt={service.hero?.title || "Service"}
                  width={500}
                  height={300}
                  className="w-full h-44 object-cover"
                />
              )}
              <div className="p-5 flex flex-col justify-between items-center flex-grow">
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 text-center mb-2 group-hover:underline">
                  {service.hero?.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mb-4 text-center line-clamp-3">
                  {service.hero?.subtitle}
                </p>
                <button className="btn-primary cursor-pointer mt-auto px-4 py-2 rounded-lg text-center text-sm font-medium transition-all duration-300">
                  View More →
                </button>
              </div>
            </motion.div>
          </Link>
        ))}
      </div>
  
    </motion.section>
  );
};

export default CoreServices;
