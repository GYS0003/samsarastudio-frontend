import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import OurServices from '@/components/sections/ourservices/OurServices';

export const metadata = {
  title: 'Our Services | Samsara Studio',
  description:
    'Explore the range of creative and performance-driven digital marketing services offered by Samsara Studio, including SEO, social media, branding, content strategy, and more.',
  keywords: [
    'Samsara Studio Services',
    'Digital Marketing Agency',
    'SEO Services',
    'Social Media Marketing',
    'Content Strategy',
    'Branding Services',
    'Performance Marketing',
    'Creative Marketing Solutions',
    'Marketing Agency India',
  ],
  metadataBase: new URL('https://www.samsarastudio.com'),
  openGraph: {
    title: 'Our Services | Samsara Studio',
    description:
      'Discover how Samsara Studio helps businesses grow through tailored digital marketing strategies and impactful creative services.',
    url: 'https://www.samsarastudio.com/services',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/services-og.jpg', // Replace with actual OG image path
        width: 1200,
        height: 630,
        alt: 'Samsara Studio Services',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Services | Samsara Studio',
    description:
      'From SEO to branding, discover the full suite of digital marketing services by Samsara Studio that drive real business results.',
    images: ['/assets/og/services-og.jpg'], // Replace with actual image path
    site: '@samsarastudio', // Replace with your verified Twitter handle
  },
  alternates: {
    canonical: 'https://www.samsarastudio.com/services',
  },
};



const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <OurServices/>
      </PageWrapper>
    </div>
  );
};

export default page;


