import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import OurServices from '@/components/sections/ourservices/OurServices';
import AboutUs from '@/components/sections/aboutus/AboutUs';

export const metadata = {
  title: 'About Us | Samsara Studio',
  description:
    'Learn about Samsara Studio, our creative journey, digital marketing expertise, and how we help brands grow in the digital world.',
  keywords: [
    'Samsara Studio',
    'About Samsara',
    'Digital Marketing Agency',
    'Creative Marketing',
    'Social Media Marketing',
    'SEO Services India',
    'Content Marketing',
    'Brand Strategy',
  ],
  metadataBase: new URL('https://www.samsarastudio.com'),
  openGraph: {
    title: 'About Us | Samsara Studio',
    description:
      'Learn about Samsara Studio, our creative journey, digital marketing expertise, and how we help brands grow in the digital world.',
    url: 'https://www.samsarastudio.com/about',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/about-og.jpg', 
        width: 1200,
        height: 630,
        alt: 'About Samsara Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'About Us | Samsara Studio',
    description:
      'Discover who we are at Samsara Studio and how we craft impactful digital experiences for brands.',
    images: ['/assets/og/about-og.jpg'],
    site: '@samsarastudio', 
  },
  alternates: {
    canonical: 'https://www.samsarastudio.com/aboutus',
  },
};



const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <AboutUs/>
      </PageWrapper>
    </div>
  );
};

export default page;


