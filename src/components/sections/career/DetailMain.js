"use client";

import React from 'react';
import Footer from '@/components/layout/footer/Footer';
import Detail from './Detail';

const DetailMain = () => {
  
  return (
    <div
      className="h-screen overflow-y-scroll scrollbar-hide "
    >
      <section className="snap-start"><Detail /></section>
      <section className="snap-start"><Footer /></section>
    </div>
  );
};

export default DetailMain;
