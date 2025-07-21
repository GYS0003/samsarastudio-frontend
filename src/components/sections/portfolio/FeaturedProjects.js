"use client";

import React, { useState, useEffect } from "react";
import { useParams } from "next/navigation";
import { motion, AnimatePresence } from "framer-motion";
import { getProjectsByCategoryId } from "@/services/apis";
import Image from "next/image";
import Link from "next/link";

const cardVariants = {
  initial: { opacity: 0, y: 30 },
  animate: { opacity: 1, y: 0, transition: { type: "spring", stiffness: 80 } },
  exit: { opacity: 0, y: -20, transition: { duration: 0.3 } },
};

export default function IndustryProjects() {
  const params = useParams();
  const categoryId = params?.id?.toString();

  const [projects, setProjects] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProjects = async () => {
      setLoading(true);
      try {
        const data = await getProjectsByCategoryId(categoryId);
        setProjects(data || []);
      } catch (err) {
        console.error("Error fetching projects:", err);
      } finally {
        setLoading(false);
      }
    };

    if (categoryId) fetchProjects();
  }, [categoryId]);

  return (
    <section className="min-h-screen relative z-10 pt-16 px-4 text-gray-800 dark:text-white">
      <h2 className="text-3xl md:text-4xl font-bold text-center mb-8">
        Projects by Industry
      </h2>

      {loading ? (
        <p className="text-center text-gray-500 dark:text-gray-400">Loading...</p>
      ) : projects.length === 0 ? (
        <p className="text-center text-gray-500 dark:text-gray-400">No projects found for this category.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 max-w-6xl mx-auto">
          <AnimatePresence mode="wait">
            {projects.map((proj) => (
              <motion.div
                key={proj._id}
                variants={cardVariants}
                initial="initial"
                animate="animate"
                exit="exit"
                className="bg-white dark:bg-white/10 border border-gray-200 dark:border-white/10 rounded-xl shadow hover:shadow-md transition p-5 flex flex-col"
              >
                {/* Image */}
                <div className="w-full h-48 relative mb-4 rounded-lg overflow-hidden ">
                  {proj.imageUrl && (
                    <Image
                      src={proj.imageUrl}
                      alt={proj.title}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 50vw"
                    />
                  )}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold mb-2 text-gray-900 dark:text-gray-100">
                  {proj.title}
                </h3>

                {/* Description */}
                <p className="text-sm text-gray-700 dark:text-gray-300 mb-4">
                  {proj.description}
                </p>

                {/* Buttons */}
                {/* <div className="mt-auto flex gap-2 flex-wrap justify-between">
                  <Link
                    href={`/${categoryId}/tech/${proj._id}`}
                    className="px-4 py-2 text-sm font-medium btn-primary text-white rounded-lg  transition"
                  >
                    View Tech
                  </Link>
                  <Link
                    href={`/${categoryId}/marketing/${proj._id}`}
                    className="px-4 py-2 text-sm font-medium border bg-violet-700/20 hover:bg-violet-500/20 border-violet-600 hover:border-violet-500 text-white rounded-lg  transition"
                  >
                    View Marketing
                  </Link>
                </div> */}
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}
    </section>
  );
}
