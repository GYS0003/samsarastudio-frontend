"use client";

import React, { useEffect, useRef } from 'react';
import Banner from './Banner';
import ServicesProvided from './ServicesProvided';
import LetsTalk from './LetsTalk';
import Footer from '@/components/layout/footer/Footer';
import MarketingHeroSection from './MarketingHeroSection';
import CoreServices from './CoreServices';
import FeaturesSection from './FeaturesSection';
import CreativeSection from './CreativeSection';

const Home = () => {
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
      <section className="snap-start"><ServicesProvided /></section>
      <section className="snap-start"><MarketingHeroSection /></section>
      <section className="snap-start"><CoreServices /></section>
      <section className="snap-start"><FeaturesSection /></section>
      <section className="snap-start"><CreativeSection /></section>

      <section className="snap-start"><LetsTalk /></section>
      <section className="snap-start"><Footer /></section>
    </div>
  );
};

export default Home;
