"use client";

import React from 'react';
import Footer from '@/components/layout/footer/Footer';
import Career from './Career';

const CareerMain = () => {
  

  return (
    <div
      className="h-screen overflow-y-scroll scrollbar-hide"
    >
      <section className="snap-start"><Career /></section>
      <section className="snap-start"><Footer /></section>
    </div>
  );
};

export default CareerMain;
