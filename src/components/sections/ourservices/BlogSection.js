'use client';

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import Link from 'next/link';
import { getAllBlogs } from '@/services/apis';

const containerVariants = {
  hidden: {},
  visible: {
    transition: {
      staggerChildren: 0.15,
    },
  },
};

const cardVariants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i) => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.15,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const BlogSection = () => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      try {
        const data = await getAllBlogs();
        setBlogs(data);
      } catch (err) {
        console.error('Failed to fetch blogs:', err);
      } finally {
        setLoading(false);
      }
    })();
  }, []);

  if (loading) return <div className="text-center py-20 text-xl text-gray-700 dark:text-gray-300">Loading...</div>;

  return (
    <section className="relative z-10 w-full px-4 sm:px-8 lg:px-20 py-16 min-h-screen  text-gray-800 dark:text-white">
      <motion.h2
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="text-2xl sm:text-2xl md:text-3xl font-bold text-center mb-12"
      >
        <span className="gradient-text-violet">Update with us</span> and know our latest insights, blogs and news
      </motion.h2>

      <motion.div
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 max-w-7xl mx-auto"
        variants={containerVariants}
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true }}
      >
        {blogs.map((blog, index) => (
          <Link key={blog.id} href={`/services/blog/${blog.id}`} className="group">
            <motion.div
              custom={index}
              variants={cardVariants}
              whileHover={{ scale: 1.03 }}
              className="rounded-xl overflow-hidden border border-gray-200 dark:border-white/10 bg-white dark:bg-white/5 backdrop-blur-md shadow-md hover:shadow-lg transition-shadow duration-300 cursor-pointer"
            >
              <div className="overflow-hidden h-50">
                <motion.div whileHover={{ scale: 1.05 }} transition={{ duration: 0.5 }}>
                  <Image
                    src={blog.coverImage}
                    alt={blog.title}
                    width={600}
                    height={400}
                    className="object-cover w-full h-full"
                  />
                </motion.div>
              </div>
              <div className="p-5 space-y-2">
                <motion.div
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  transition={{ duration: 0.4, delay: index * 0.15 + 0.2 }}
                  className="text-sm text-gray-500 dark:text-gray-400"
                >
                  {blog.author} · {blog.date} · {blog.readTime}
                </motion.div>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  className="text-lg md:text-xl font-semibold text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors duration-300"
                >
                  {blog.title}
                </motion.h3>
                  <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.3 }}
                  className="text-sm md:text-medium line-clamp-2 text-gray-900 dark:text-white group-hover:text-violet-500 transition-colors duration-300"
                >
                  {blog.intro.text}
                </motion.h3>
                <motion.p
                  initial={{ x: -10, opacity: 0 }}
                  whileInView={{ x: 0, opacity: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.15 + 0.4 }}
                  className="text-sm text-violet-500 font-medium flex items-center gap-1 group-hover:underline"
                >
                  Read More{" "}
                  <motion.span animate={{ x: [0, 3, 0] }} transition={{ repeat: Infinity, duration: 1 }}>
                    →
                  </motion.span>
                </motion.p>
              </div>
            </motion.div>
          </Link>
        ))}
      </motion.div>

      {/* Glow Background Effects */}
      <div
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px] pointer-events-none"
        style={{
          background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
        }}
      />
    </section>
  );
};

export default BlogSection;
