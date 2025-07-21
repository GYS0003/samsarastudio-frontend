"use client";

import React, { useRef } from "react";
import { motion, useInView, stagger } from "framer-motion";
import {
  FaCheckCircle,
  FaComments,
  FaCogs,
  FaRocket,
  FaShieldAlt,
  FaChartLine,
} from "react-icons/fa";
import Link from "next/link";

const reasons = [
  {
    icon: <FaCheckCircle />,
    title: "Proven Digital Success",
    description:
      "Our track record reflects consistent results, showcasing our expertise in executing impactful digital marketing campaigns.",
    color: "gradient-text-violet",
  },
  {
    icon: <FaComments />,
    title: "Transparency & Communication",
    description:
      "We ensure that information is shared openly, creating a sense of accountability and inclusiveness.",
    color: "gradient-text-violet",
  },
  {
    icon: <FaCogs />,
    title: "Advanced Tools & Technologies",
    description:
      "We use AI, machine learning, and automation to deliver efficient, data-driven strategies for better ROI.",
    color: "gradient-text-violet",
  },
  {
    icon: <FaRocket />,
    title: "Growth-Centric Approach",
    description:
      "Our strategies are laser-focused on helping your brand grow across every digital touchpoint.",
    color: "gradient-text-violet",
  },
  {
    icon: <FaShieldAlt />,
    title: "Security & Compliance",
    description:
      "We prioritize data security and adhere to global standards to keep your business and customers safe.",
    color: "gradient-text-violet",
  },
  {
    icon: <FaChartLine />,
    title: "Performance Analytics",
    description:
      "We track what matters most and adjust campaigns dynamically for continuous improvement.",
    color: "gradient-text-violet",
  },
];

// Animation variants
const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.6,
      ease: "easeOut",
    },
  },
};

const textVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.8,
      ease: "easeOut",
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
      ease: "easeOut",
    },
  }),
};

const WhyChooseUs = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.3 });
  const MotionLink = motion(Link);

  return (
    <section ref={ref} className="relative px-6 py-20 lg:px-24 overflow-hidden">
      {/* Background Decoration */}
      <motion.div 
        className="absolute inset-y-0 left-0 w-1/2 bg-gradient-to-br from-blue-200/20 to-transparent dark:from-blue-900/10 z-0 rounded-full blur-3xl"
        initial={{ opacity: 0 }}
        animate={isInView ? { opacity: 1 } : {}}
        transition={{ duration: 1 }}
      />

      <div className="max-w-7xl mx-auto grid lg:grid-cols-2 gap-12 relative z-10 items-center">
        {/* Left Content */}
        <motion.div
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={containerVariants}
        >
          <motion.div variants={itemVariants}>
            <motion.h4 
              className="text-sm font-bold gradient-text-violet uppercase tracking-wide mb-2"
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 }}
            >
              Why Choose Us
            </motion.h4>
          </motion.div>

          <motion.h2 
            className="text-3xl md:text-4xl font-extrabold text-gray-900 dark:text-white mb-4 leading-tight"
            variants={textVariants}
          >
            Where Expertise Meets <br />
            <motion.span 
              className="gradient-text-violet"
              initial={{ opacity: 0 }}
              animate={isInView ? { 
                opacity: 1,
                transition: { delay: 0.5 } 
              } : {}}
            >
              Exceptional Results
            </motion.span>
          </motion.h2>

          <motion.p 
            className="text-gray-700 dark:text-gray-300 mb-6 leading-relaxed text-sm md:text-base"
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { delay: 0.7 } 
            } : {}}
          >
            Where expertise drives innovation and passion fuels performance. We bring deep knowledge
            and unparalleled dedication to every project, delivering exceptional results that meet
            expectations.
          </motion.p>

          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { 
              opacity: 1,
              transition: { delay: 0.9 } 
            } : {}}
          >
            <MotionLink
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.97 }}
              href={'/aboutus/lets-talk'}
              className="inline-flex items-center gap-2 px-5 py-3 btn-primary text-white rounded-xl shadow-md text-sm font-semibold transition-all"
            >
              Contact Us <span className="text-xl">↗</span>
            </MotionLink>
          </motion.div>
        </motion.div>

        {/* Right - Scrollable Cards */}
        <motion.div 
          className="h-[400px] sm:h-[500px] overflow-y-auto pr-2 custom-scrollbar space-y-6"
          initial="hidden"
          animate={isInView ? "visible" : "hidden"}
          variants={{
            visible: {
              transition: {
                staggerChildren: 0.1,
                delayChildren: 0.4,
              },
            },
          }}
        >
          {reasons.map((item, i) => (
            <motion.div
              key={i}
              custom={i}
              variants={cardVariants}
              className="rounded-xl p-5 border border-gray-200 dark:border-gray-700 shadow-md dark:shadow-lg transition-all bg-white dark:bg-gray-800 hover:shadow-lg dark:hover:shadow-xl hover:-translate-y-1"
            >
              <div className="flex items-start gap-4">
                <motion.div 
                  className="text-xl md:text-2xl text-purple-400 bg-white dark:bg-black/30 p-2 rounded-full shadow"
                  whileHover={{ scale: 1.1, rotate: 5 }}
                >
                  {item.icon}
                </motion.div>
                <div>
                  <motion.h3 
                    className={`text-lg md:text-xl font-bold mb-1 ${item.color} tracking-wide`}
                    initial={{ opacity: 0 }}
                    animate={isInView ? { 
                      opacity: 1,
                      transition: { delay: 0.5 + i * 0.1 } 
                    } : {}}
                  >
                    {item.title}
                  </motion.h3>
                  <motion.p 
                    className="text-sm md:text-base text-gray-800 dark:text-gray-300"
                    initial={{ opacity: 0 }}
                    animate={isInView ? { 
                      opacity: 1,
                      transition: { delay: 0.6 + i * 0.1 } 
                    } : {}}
                  >
                    {item.description}
                  </motion.p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};

export default WhyChooseUs;