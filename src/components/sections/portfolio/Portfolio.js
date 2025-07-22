"use client";

import React from 'react';
import Banner from './Banner';
import Footer from '@/components/layout/footer/Footer';
import OurProductsSection from './OurProductsSection';
import Gallery from '../aboutus/Gallary';
import LetsTalk from '../aboutus/LetsTalk';
import IndustriesServedSection from './IndustriesServedSection';

const Portfolio = () => {
  
  return (
    <div
      className="h-screen overflow-y-scroll scrollbar-hide"
    >
      <section className="snap-start"><Banner /></section>
      <section className="snap-start"><IndustriesServedSection /></section>
      <section className="snap-start"><OurProductsSection /></section>
      <section className="snap-start"><Gallery /></section>
      <section className="snap-start"><LetsTalk /></section>
      <section className="snap-start"><Footer /></section>
    </div>
  );
};

export default Portfolio;
