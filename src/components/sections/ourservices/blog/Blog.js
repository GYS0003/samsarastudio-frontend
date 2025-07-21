"use client";

import React, { useEffect, useState, useRef } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { motion, AnimatePresence } from 'framer-motion';
import { getBlogById } from '@/services/apis';

export default function Blog() {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);
  const contentRef = useRef(null);

  useEffect(() => {
    if (id) {
      (async () => {
        try {
          const data = await getBlogById(id);
          setBlog(data);
        } catch (err) {
          console.error(err);
        } finally {
          setLoading(false);
        }
      })();
    }
  }, [id]);

  if (loading) return <div className="text-center py-20 text-xl">Loading...</div>;
  if (!blog) return <div className="text-center py-20 text-xl">Blog not found.</div>;

  return (
    <section className="max-w-6xl relative z-10 mx-auto px-4 md:px-8 lg:px-16 pt-16 ">
      {/* Header */}
      <motion.header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="mb-8 space-y-2 text-center"
      >
        <h1 className="text-4xl font-extrabold leading-tight">{blog.title}</h1>
        <div className="text-sm text-gray-500 dark:text-gray-400">
          {blog.author} · {blog.date} · {blog.readTime}
        </div>
      </motion.header>

      <AnimatePresence>
        {/* Cover Image */}
        {blog.coverImage && (
          <motion.div key="coverImage"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full h-64 relative rounded-lg overflow-hidden mb-12"
          >
            <Image
              src={blog.coverImage}
              alt={blog.title}
              fill
              className="object-cover w-full h-full"
            />
          </motion.div>
        )}

        {/* Main Content */}
        <motion.article key="mainContent"
          ref={contentRef}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="space-y-8"
        >
          {/* Intro Section */}
          <div className="grid md:grid-cols-2 gap-8 mb-12 items-center">
            {blog.intro?.image && (
              <motion.div
                initial={{ scale: 0.9 }}
                whileInView={{ scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <Image
                  src={blog.intro.image}
                  alt="Intro"
                  width={600}
                  height={400}
                  className="rounded-lg w-full h-auto"
                />
              </motion.div>
            )}
            <div>
              <p className="text-lg leading-relaxed">{blog.intro?.text}</p>
             {blog.intro?.bulletPoints && (
  <ol className="list-decimal list-inside mt-4 space-y-2 pl-5">
    {blog.intro.bulletPoints.map((point, idx) => (
      <li key={idx} className="pl-2">{point}</li>
    ))}
  </ol>
)}
            </div>
          </div>

          {/* Body Tips */}
          {blog.tips && (
            <section className="mb-12">
              <motion.h2
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
                className="text-2xl font-bold mb-6"
              >
                Top Tips
              </motion.h2>
              <div className="grid gap-6 md:grid-cols-3">
                {blog.tips.map((tip, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.4, delay: idx * 0.1 }}
                    className="p-6 bg-gray-50 dark:bg-violet-800/10 border border-gray-300 dark:border-violet-600 rounded-lg shadow"
                  >
                    <h3 className="font-semibold text-center text-lg mb-2">{tip.title}</h3>
                  </motion.div>
                ))}
              </div>
            </section>
          )}

          {/* Conclusion */}
          {blog.conclusion && (
            <motion.section
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="border border-gray-300 dark:border-violet-600 bg-violet-600/10 rounded-lg p-8 flex flex-col md:flex-row items-center gap-6"
            >
              {blog.conclusion.image && (
                <div className="md:w-1/2">
                  <Image
                    src={blog.conclusion.image}
                    alt="Conclusion"
                    width={600}
                    height={400}
                    className="rounded-lg w-full h-auto"
                  />
                </div>
              )}
              <div className="md:w-1/2">
                <h3 className="text-2xl font-bold mb-4">
                  Conclusion: Turn Strategy Into Action
                </h3>
                <p className="text-gray-800 dark:text-gray-300 leading-relaxed">
                  {blog.conclusion.text}
                </p>
              </div>
            </motion.section>
          )}
        </motion.article>
      </AnimatePresence>
       <div
        className="absolute left-0 top-0 h-[500px] w-[500px] rounded-full opacity-20 blur-[120px]"
        style={{
          background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
        }}
      />
      <div
        className="absolute bottom-0 right-0 h-[300px] w-[300px] rounded-full opacity-10 blur-[100px]"
        style={{
          background: `radial-gradient(circle at center, #e60a64, transparent 70%)`,
        }}
      />
    </section>
  );
}
