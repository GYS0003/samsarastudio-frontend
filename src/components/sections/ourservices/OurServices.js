'use client';

import React from 'react';
import Footer from '@/components/layout/footer/Footer';
import LetsCreateTogether from './LetsCreateTogether';
import StrategySection from './StrategySection';
import BlogSection from './BlogSection';
import CoreServices from '../home/CoreServices';
const OurServices = () => {
  
  return (
    <section
    id='services'
    className="h-screen overflow-y-scroll  scrollbar-hide "
  >
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