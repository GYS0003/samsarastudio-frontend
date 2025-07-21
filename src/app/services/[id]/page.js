import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import OurServices from '@/components/sections/ourservices/OurServices';
import Service from '@/components/sections/ourservices/services/Service';
import Footer from '@/components/layout/footer/Footer';
export const metadata = {
  title: 'Our Services | GYS Technologies',
  description:
    'Explore the wide range of custom digital services offered by GYS Technologies, including web development, mobile apps, UI/UX design, cloud solutions, and more.',
  keywords: [
    'GYS Technologies Services',
    'Software Development',
    'Web Development India',
    'Mobile App Development',
    'UI/UX Design Services',
    'Custom Software Solutions',
    'Cloud Development',
    'Tech Services Company',
    'IT Solutions Provider',
  ],
  metadataBase: new URL('https://www.gystechnologies.com'),
  openGraph: {
    title: 'Our Services | GYS Technologies',
    description:
      'Discover how GYS Technologies empowers businesses with cutting-edge web, mobile, and cloud solutions tailored to your needs.',
    url: 'https://www.gystechnologies.com/services',
    siteName: 'GYS Technologies',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/services-og.jpg', // Replace with actual OG image path
        width: 1200,
        height: 630,
        alt: 'GYS Technologies Services Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | GYS Technologies',
    description:
      'Unlock your digital potential with GYS Technologies — from mobile apps to scalable cloud platforms.',
    images: ['/assets/og/services-og.jpg'], // Replace with actual Twitter OG image path
    site: '@gystechnologies',
  },
  alternates: {
    canonical: 'https://www.gystechnologies.com/services',
  },
};


const page = ({params}) => {
  return (
    <div className="relative font-[family-name:var(--font-geist-sans)]">
    
      <PageWrapper>
        <Service params={params}/>
        <Footer/>
      </PageWrapper>
    </div>
  );
};

export default page;


