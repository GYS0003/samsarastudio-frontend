'use client';

import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { Search } from 'lucide-react';
import Link from 'next/link';
import { getAllJobs } from '@/services/apis';

export default function Career() {
  const [search, setSearch] = useState('');
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchJobs = async () => {
      try {
        const jobData = await getAllJobs();
        setJobs(jobData);
      } catch (err) {
        console.error("Failed to fetch jobs:", err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchJobs();
  }, []);

  const filteredJobs = jobs.filter(job =>
    job.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <section className="relative z-10 min-h-screen flex flex-col justify-center items-center text-black dark:text-white py-22 transition-colors duration-500">
        <h2 className="text-2xl md:text-3xl font-bold rounded-xl py-1 px-4 border-2 border-gray-700 dark:border-gray-500 mb-4 text-center">We’re hiring!</h2>
      <div className="bg-black w-full dark:bg-transparent p-4 text-white">

        <h2 className="text-3xl md:text-4xl font-bold mb-4 text-center">Be part of our mission</h2>
        <p className="text-center text-sm md:text-base max-w-2xl mx-auto mb-5 text-gray-200 dark:text-gray-300">
        We’re looking for passionate people to join us on our mission.We value
flat hieraechies , clear communication,and full ownership and responsibility
        </p>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.7 }}
        className="max-w-5xl mx-auto w-full"
      >
        <div className="font-bold text-xl px-5 py-4">Available Positions</div>

        <div className="mb-8 flex px-5 items-center gap-2 max-w-lg mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search job title..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full px-4 py-3 rounded-md bg-gray-100 dark:bg-white/10 backdrop-blur text-black dark:text-white placeholder-gray-500 dark:placeholder-gray-300 focus:outline-none"
            />
            <Search className="absolute right-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-500 dark:text-white" />
          </div>
        </div>

        {loading ? (
          <p className="text-center text-gray-500">Loading jobs...</p>
        ) : (
          <div className="space-y-6">
            {filteredJobs.map((job, index) => (
              <Link key={job._id} href={`/careers/${job.id}`} passHref className="block">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index }}
                  className="flex flex-row justify-between px-5 items-start md:items-center border-b border-gray-200 dark:border-white/20 pb-4 cursor-pointer hover:bg-gray-50 dark:hover:bg-white/5 transition-colors duration-200 rounded"
                >
                  <div>
                    <h4 className="text-lg font-semibold">{job.title}</h4>
                    <div className='flex '>
                    <p className="text-sm py-1 px-2 rounded-xl border border-gray-300 dark:border-gray-500 mr-1 text-gray-600 dark:text-gray-300">
                       {job.location}
                    </p>  
                    <p className="text-sm py-1 px-2 rounded-xl border mr-1 border-gray-300 dark:border-gray-500 text-gray-600 dark:text-gray-300">
                       {job.experience}
                    </p>
                    <span className="text-sm py-1 px-2 rounded-xl border border-gray-300 dark:border-gray-500  text-gray-600 dark:text-gray-300">
                       {job.type}
                    </span>
                    </div>
                  </div>
                  <div className="flex flex-col md:flex-row md:items-center md:gap-6 mt-2 md:mt-0">
                    <span className="text-blue-500 hover:underline text-sm">
                      View Details →
                    </span>
                  </div>
                </motion.div>
              </Link>
            ))}
          </div>
        )}
      </motion.div>
    </section>
  );
}
