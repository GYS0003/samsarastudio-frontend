'use client';

import React, { useEffect, useRef } from 'react';
import Footer from '@/components/layout/footer/Footer';
import LetsCreateTogether from './LetsCreateTogether';
import StrategySection from './StrategySection';
import BlogSection from './BlogSection';
import CoreServices from '../home/CoreServices';
import Video from './Video';
const OurServices = () => {
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
    <section
    ref={containerRef}
    id='services'
    className="h-screen overflow-y-scroll scroll-mt-24 scrollbar-hide snap-y snap-mandatory scroll-smooth"
    style={{ scrollBehavior: 'smooth' }}
  >
    
        {/* <BreadCrumbs/> */}
        <section className="snap-start"><CoreServices  /></section>
        <section className="snap-start"><StrategySection /></section>
        <section className="snap-start"><BlogSection /></section>
        {/* <section className="snap-start"><Video/></section> */}
        <section className="snap-start"><LetsCreateTogether/></section>
        <section className="snap-start"><Footer/></section>
    </section>
  )
}

export default OurServices