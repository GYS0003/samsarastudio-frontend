import PageWrapper from '@/components/wrappers/PageWrapper';

import React from 'react';
import OurServices from '@/components/sections/ourservices/OurServices';
import Service from '@/components/sections/ourservices/services/Service';
import Footer from '@/components/layout/footer/Footer';
import Blog from '@/components/sections/ourservices/blog/Blog';

export const metadata = {
  title: 'Blog | Samsara Studio',
  description:
    'Explore the latest trends, strategies, and tips in digital marketing with Samsara Studio’s expert blog. Stay updated on SEO, branding, social media, and more.',
  keywords: [
    'Samsara Studio Blog',
    'Digital Marketing Blog',
    'SEO Trends',
    'Social Media Strategies',
    'Branding Tips',
    'Content Marketing Insights',
    'Influencer Marketing Blog',
    'Marketing Consultation',
    'Digital Strategy Guides',
    'Marketing Blog India',
  ],
  metadataBase: new URL('https://www.samsarastudio.co'),
  openGraph: {
    title: 'Digital Marketing Blog | Samsara Studio',
    description:
      'Read expert insights and industry updates from Samsara Studio on all things digital marketing — SEO, SMO, branding, and content creation.',
    url: 'https://www.samsarastudio.co/blog',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/blog-og.jpg', // Replace with actual OG image path
        width: 1200,
        height: 630,
        alt: 'Samsara Studio Digital Marketing Blog',
      },
    ],
  },
  alternates: {
    canonical: 'https://www.samsarastudio.co/blog',
  },
  other: {
    'instagram:profile': 'https://www.instagram.com/samsara.studio_/',
  },
};


const page = ({params}) => {
  return (
    <div className="relative font-[family-name:var(--font-geist-sans)]">
    
      <PageWrapper>
        <Blog params={params}/>
        <Footer/>
      </PageWrapper>
    </div>
  );
};

export default page;


