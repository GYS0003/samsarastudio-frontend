'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import Link from 'next/link';
import { getServices } from '@/services/apis';
import { usePathname } from 'next/navigation';

const ServicesWeOffer = () => {
  const [services, setServices] = useState([]);
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true });
  const pathname = usePathname();

  useEffect(() => {
    const fetchServices = async () => {
      try {
        const data = await getServices(); // Should return [{ id, title, description, imageUrl }]
        setServices(data);
      } catch (error) {
        console.error('Error fetching services:', error);
      }
    };

    fetchServices();
  }, []);

  // Scroll to section if #services present in URL
  useEffect(() => {
    if (typeof window !== 'undefined') {
      const hash = window.location.hash;
      if (hash === '#services') {
        setTimeout(() => {
          if (sectionRef.current) {
            sectionRef.current.scrollIntoView({ behavior: 'smooth' });
            sectionRef.current.classList.add('ring-2', 'ring-indigo-500');
            setTimeout(() => {
              sectionRef.current.classList.remove('ring-2', 'ring-indigo-500');
            }, 2000);
          }
        }, 100);
      }
    }
  }, [pathname]);

  return (
    <section
      ref={sectionRef}
      className="relative min-h-screen w-full flex flex-col justify-center items-center text-gray-800 dark:text-white select-none px-4 py-16 sm:py-16 md:py-10 lg:py-14 xl:py-22 md:px-10 lg:px-20"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-3xl md:text-4xl font-bold text-center mb-12"
      >
        Services We Offer
      </motion.h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto py-4 max-w-7xl w-full">
        {services.length === 0 ? (
          <p className="text-center w-full col-span-full">No services found.</p>
        ) : (
          services.map((service, idx) => (
            <Link href={`/services/${service.id}`} key={service.id}>
              <motion.div
                initial={{ opacity: 0, y: 50 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: idx * 0.1 }}
                className="bg-white/10 backdrop-blur-md rounded-xl overflow-hidden shadow-xl border border-white/20 hover:scale-[1.03] transition-transform duration-300"
              >
                <div className="relative w-full h-48">
                  <Image
                    src={service.imageUrl}
                    alt={service.title}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-semibold text-indigo-400 mb-2">
                    {service.title}
                  </h3>
                  <p className="text-sm text-gray-800 dark:text-gray-200">
                    {service.description}
                  </p>
                </div>
                <div className="flex justify-center pb-4">
                  <div className="w-8 h-8 bg-indigo-600 text-white flex items-center justify-center rounded-full">
                    <span>→</span>
                  </div>
                </div>
              </motion.div>
            </Link>
          ))
        )}
      </div>
    </section>
  );
};

export default ServicesWeOffer;
