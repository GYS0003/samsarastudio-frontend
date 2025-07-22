'use client';

import React from 'react';
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

  return (
    <div
      className="h-screen overflow-y-scroll scrollbar-hide "
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