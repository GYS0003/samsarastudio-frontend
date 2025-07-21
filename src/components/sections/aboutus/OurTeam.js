"use client";

import React, { useRef, useEffect, useState } from "react";
import { motion, useInView } from "framer-motion";
import { getTeam } from "@/services/apis";
import Image from "next/image";

const OurTeam = () => {
  const sectionRef = useRef(null);
  const isInView = useInView(sectionRef, { once: true, threshold: 0.2 });

  const [team, setTeam] = useState([]);

  useEffect(() => {
    const fetchTeam = async () => {
      try {
        const data = await getTeam(); // should return array of { name, role, imageUrl }
        setTeam(data || []);
      } catch (err) {
        console.error("Failed to fetch team:", err);
      }
    };

    fetchTeam();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative z-10 px-4 pt-16  flex flex-col justify-center items-center  text-gray-900 dark:text-white"
    >
      {/* Background effects */}
      <div className="absolute top-0 z-[0] h-full w-full bg-[radial-gradient(ellipse_70%_50%_at_40%_60%,rgba(120,119,198,0.15),rgba(255,255,255,0))] dark:bg-[radial-gradient(ellipse_70%_50%_at_40%_60%,rgba(120,119,198,0.05),rgba(0,0,0,0))]" />

      <div className="pointer-events-none absolute h-full w-full overflow-hidden opacity-50 [perspective:200px]">
        <div className="absolute inset-0 [transform:rotateX(35deg)]">
          <div className="animate-grid [background-image:linear-gradient(to_right,rgba(255,255,255,0.1)_1px,transparent_0),linear-gradient(to_bottom,rgba(255,255,255,0.1)_1px,transparent_0)] [background-repeat:repeat] [background-size:120px_120px] [height:300vh] [inset:0%_0px] [margin-left:-50%] [transform-origin:100%_0_0] [width:600vw]" />
        </div>
        {/* <div className="absolute inset-0 bg-gradient-to-t from-white via-transparent to-transparent dark:from-black" /> */}
      </div>

      {/* Heading */}
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-12 text-center relative z-10">
        Our Team
      </h2>

      {/* Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 w-full max-w-7xl px-4 relative z-10">
        {team.map((member, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 60 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: index * 0.2 }}
            className="rounded-2xl p-4 border bg-white dark:bg-white/5 backdrop-blur-md shadow-xl border-gray-200 dark:border-white/20 hover:shadow-lg transition-shadow duration-300"
          >
            <div className="w-full aspect-[3/4] mb-2 rounded-lg overflow-hidden">
              <Image
                src={member.imageUrl}
                alt={member.name}
                width={300}
                height={400}
                className="object-cover w-full h-full"
              />
            </div>
            <h3 className="font-semibold text-lg sm:text-xl text-center mb-1">
              {member.name}
            </h3>
            <p className="text-sm text-center text-gray-600 dark:text-gray-300 mb-3">
              {member.designation}
            </p>

            <div className="flex justify-center gap-5 text-indigo-600 dark:text-indigo-400 text-xl">
              {member.linkedin && (
                <a
                  href={member.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="LinkedIn"
                >
                  <i className="ri-linkedin-fill"></i>
                </a>
              )}
              {member.instagram && (
                <a
                  href={member.instagram}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label="Instagram"
                >
                  <i className="ri-instagram-fill"></i>
                </a>
              )}
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default OurTeam;
