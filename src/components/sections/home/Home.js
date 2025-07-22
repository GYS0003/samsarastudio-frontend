"use client";

import React from 'react';
import Banner from './Banner';
import ServicesProvided from './ServicesProvided';
import LetsTalk from './LetsTalk';
import Footer from '@/components/layout/footer/Footer';
import MarketingHeroSection from './MarketingHeroSection';
import CoreServices from './CoreServices';
import FeaturesSection from './FeaturesSection';
import CreativeSection from './CreativeSection';

const Home = () => {


  return (
    <div
      className="h-screen overflow-y-scroll scrollbar-hide "
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
