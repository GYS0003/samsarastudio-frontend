'use client';

import React, { useEffect, useRef, useState } from 'react';
import { motion, useInView } from 'framer-motion';
import Image from 'next/image';
import { getGalleryImages } from '@/services/apis';

export default function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchImages = async () => {
    try {
      setLoading(true);
      const data = await getGalleryImages();
      setImages(data);
    } catch (err) {
      console.error('Failed to load gallery images:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchImages();
  }, []);

  return (
    <section
      ref={ref}
      className="min-h-screen relative z-10 text-gray-800 dark:text-gray-200 py-16 px-4"
    >
      <motion.h2
        initial={{ opacity: 0, y: 30 }}
        animate={isInView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.6 }}
        className="text-center text-2xl md:text-3xl lg:text-4xl font-bold mb-10"
      >
        Samsara Studio Gallery
      </motion.h2>

      {loading ? (
        <p className="text-center text-gray-300">Loading images...</p>
      ) : (
        <motion.div
          className="columns-1 sm:columns-2 md:columns-3 max-w-6xl mx-auto px-4"
          initial="hidden"
          animate={isInView ? 'visible' : 'hidden'}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.15,
              },
            },
          }}
        >
          {images.map((img, idx) => (
            <motion.div
              key={img._id || idx}
              className="mb-4 overflow-hidden shadow-lg break-inside-avoid group"
              variants={{
                hidden: { opacity: 0, y: 30 },
                visible: { opacity: 1, y: 0 },
              }}
              whileHover={{ scale: 1.02 }}
              transition={{ duration: 0.3 }}
            >
              {/* Note: If using external URLs (e.g. Cloudinary), use regular <img /> */}
              <img
                src={img.imageUrl}
                alt={`Gallery ${idx + 1}`}
                className="w-full h-auto rounded-md transition duration-300 group-hover:opacity-90"
              />
            </motion.div>
          ))}
        </motion.div>
      )}
    </section>
  );
}
