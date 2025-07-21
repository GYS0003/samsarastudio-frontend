'use client';

import { motion } from 'framer-motion';
import React from 'react';
import Link from 'next/link';
import clsx from 'clsx';

export default function GradientButton({
  children = 'Explore',
  onClick,
  href,
  className = '',
  type = 'button',
  as = 'button',
}) {
  const baseClasses = clsx(
    'bg-violet-600 hover:bg-violet-400 text-white font-semibold',
    'px-4 py-2 sm:px-5 sm:py-2 md:px-6 md:py-2',
    'text-xs sm:text-sm md:text-md',
    'rounded-lg shadow-lg cursor-pointer transition-all duration-200 ease-in-out'
  );

  // Render as button
  if (as === 'button') {
    return (
      <motion.button
        whileHover={{ scale: 1.05 }}
        transition={{ type: 'spring', stiffness: 300 }}
        type={type}
        onClick={onClick}
        className={clsx(baseClasses, className)}
      >
        {children}
      </motion.button>
    );
  }

  // Render as link
  if (as === 'link' && href) {
    return (
      <Link href={href} passHref>
        <motion.div
          whileHover={{ scale: 1.05 }}
          transition={{ type: 'spring', stiffness: 300 }}
          className={clsx(baseClasses, className)}
        >
          {children}
        </motion.div>
      </Link>
    );
  }

  return null;
}
