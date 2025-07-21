'use client'

import React from 'react';
import { motion } from 'framer-motion';
import {
  FaSearch, FaEnvelope, FaShareAlt, FaUsers,
  FaLaptopCode, FaBullhorn
} from 'react-icons/fa';

const services = [
  {
    title: 'Search Engine Optimization',
    description:
      'Improve your website visibility in search results through optimized content, structure, and performance to rank higher on Google, Bing, and Yahoo.',
    icon: <FaSearch className="text-4xl text-blue-600" />,
    image: '/assets/services/seo.jpg',
  },
  {
    title: 'Social Media Marketing',
    description:
      'Connect with audiences, drive traffic, and grow your brand on platforms like Facebook, Instagram, Twitter, and LinkedIn through engaging content.',
    icon: <FaShareAlt className="text-4xl text-pink-500" />,
    image: '/assets/services/smm.jpg',
  },
  {
    title: 'Email Marketing',
    description:
      'Build customer relationships and drive conversions with targeted, high-converting email campaigns that nurture leads.',
    icon: <FaEnvelope className="text-4xl text-indigo-600" />,
    image: '/assets/services/email.jpg',
  },
  {
    title: 'Affiliate Marketing',
    description:
      'Earn commission by promoting others’ products through blogs, websites, and social media. A performance-based marketing model.',
    icon: <FaUsers className="text-4xl text-green-600" />,
    image: '/assets/services/affiliate.jpg',
  },
  {
    title: 'Website Design & Development',
    description:
      'Create user-friendly, responsive, and stunning websites that blend aesthetics and functionality using modern web technologies.',
    icon: <FaLaptopCode className="text-4xl text-yellow-500" />,
    image: '/assets/services/web.jpg',
  },
  {
    title: 'Content Marketing',
    description:
      'Deliver value and build trust by producing informative and engaging content that positions your brand as an industry expert.',
    icon: <FaBullhorn className="text-4xl text-red-500" />,
    image: '/assets/services/content.jpg',
  },
];

const cardVariants = {
  hidden: { opacity: 0, y: 40 },
  visible: i => ({
    opacity: 1,
    y: 0,
    transition: {
      delay: i * 0.2,
      duration: 0.6,
      ease: 'easeOut',
    },
  }),
};

const DigitalServicesSection = () => {
  return (
    <section className="pt-16 px-6 md:px-12 relative z-10 lg:px-20 ">
      <div className="max-w-7xl mx-auto">
        <motion.h2
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-2xl sm:text-3xl md:text-4xl font-bold text-center text-gray-800 dark:text-white mb-12"
        >
          Digital marketing services aligned with{" "}
          <span className="text-primary">your goals</span>
        </motion.h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, i) => (
            <motion.div
              key={i}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              custom={i}
              variants={cardVariants}
              className="relative group bg-white hover:scale-110 dark:bg-gray-900 p-6 rounded-xl shadow-lg hover:shadow-xl transition duration-300 overflow-hidden"
            >
              {/* Background image on hover */}
              <div
                className="absolute inset-0 bg-cover bg-center opacity-0 group-hover:opacity-10 transition-opacity duration-500"
                style={{ backgroundImage: `url(${service.image})` }}
              />

              <div className="relative z-10 flex flex-col gap-4">
                <div className="flex justify-center">{service.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold text-center text-secondary dark:text-white">
                  {service.title}
                </h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 text-center leading-relaxed font-light">
                  {service.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default DigitalServicesSection;
