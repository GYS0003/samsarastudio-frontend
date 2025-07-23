import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import OurServices from '@/components/sections/ourservices/OurServices';
import Service from '@/components/sections/ourservices/services/Service';
import Footer from '@/components/layout/footer/Footer';
export const metadata = {
  title: 'Services | Samsara Studio',
  description:
    'Boost your brand with Samsara Studio’s digital marketing expertise. From SEO, content creation, influencer marketing to IT support, we help businesses grow online.',
  keywords: [
    'Samsara Studio Digital Marketing',
    'Brand Marketing and Management',
    'Business Consultation',
    'Content Creation Services',
    'Influencer Marketing Agency',
    'SEO and SMO Services',
    'IT Support for Marketing',
    'Online Growth Solutions',
    'Digital Strategy Company',
    'Marketing Services India',
  ],
  metadataBase: new URL('https://www.samsarastudio.co'),
  openGraph: {
    title: 'Digital Marketing Services | Samsara Studio',
    description:
      'Samsara Studio offers end-to-end digital marketing services including SEO, content creation, influencer marketing, and business consultation.',
    url: 'https://www.samsarastudio.co/services',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/instagram-style-og.jpg', // Replace with actual path
        width: 1200,
        height: 630,
        alt: 'Samsara Studio Digital Marketing Overview',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Digital Marketing Services | Samsara Studio',
    description:
      'Grow your digital presence with Samsara Studio — experts in SEO, branding, influencer marketing and more.',
    images: ['/assets/og/instagram-style-og.jpg'],
    site: '@samsarastudio', // If not on Twitter, you can remove this
  },
  alternates: {
    canonical: 'https://www.samsarastudio.co/services',
  },
  other: {
    'instagram:profile': 'https://www.instagram.com/samsara.studio_/',
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


