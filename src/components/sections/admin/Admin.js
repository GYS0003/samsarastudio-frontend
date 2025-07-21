"use client";

import React, { useEffect, useRef } from 'react';


const Admin = () => {
  const containerRef = useRef(null);

  useEffect(() => {
    const container = containerRef.current;
    let isScrolling = false;

    const handleWheel = (e) => {
      if (isScrolling) return;
      isScrolling = true;

      const direction = e.deltaY > 0 ? 1 : -1;
      const sectionHeight = window.innerHeight;
      const scrollTo = container.scrollTop + direction * sectionHeight;

      container.scrollTo({
        top: scrollTo,
        behavior: 'smooth',
      });

      setTimeout(() => {
        isScrolling = false;
      }, 800); // Custom duration (ms)
    };

    container.addEventListener('wheel', handleWheel, { passive: false });
    return () => container.removeEventListener('wheel', handleWheel);
  }, []);

  return (
    <div
      ref={containerRef}
      className="h-screen overflow-y-scroll scrollbar-hide snap-y snap-mandatory scroll-smooth"
      style={{ scrollBehavior: 'smooth' }}
    >
  

    </div>
  );
};

export default Admin;
