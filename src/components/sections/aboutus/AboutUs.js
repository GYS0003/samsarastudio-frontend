'use client';

import React, { useEffect, useRef } from 'react';
import Banner from '../aboutus/Banner'
import WhyChooseUs from './WhyChooseUs'
import StatsSection from './StatsSection';
import Footer from '@/components/layout/footer/Footer';
import OurTeam from '../aboutus/OurTeam';
import Gallery from './Gallary';
import LetsTalk from './LetsTalk';
import ExpertiseStatsSection from './ExpertiseStatsSection';
import Testimonials from './Testimonials';
const AboutUs = () => {
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
      }, 800);
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

      <section className="snap-start"><Banner /></section>
      <section className="snap-start"><ExpertiseStatsSection /></section>
      <section className="snap-start"><WhyChooseUs /></section>
      {/* <section className="snap-start"><OurTeam /></section> */}
      <section className="snap-start"><StatsSection /></section>
      <section className="snap-start"><Testimonials /></section>
      <section className="snap-start"><Gallery /></section>
      <section className="snap-start"><LetsTalk /></section>
      <section className="snap-start"><Footer /></section>
    </div>
  )
}

export default AboutUs