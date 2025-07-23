import CareerMain from "@/components/sections/career/CareerMain";
import PageWrapper from "@/components/wrappers/PageWrapper";
import React from "react";

export const metadata = {
  title: 'Careers | Samsara Studio',
  description:
    'Join Samsara Studio, a fast-growing digital marketing agency. Explore exciting career opportunities for marketers, strategists, designers, and content creators. Let’s grow together.',
  keywords: [
    'Careers at Samsara Studio',
    'Samsara Studio Jobs',
    'Digital Marketing Careers',
    'Creative Agency Hiring',
    'Marketing Jobs India',
    'Social Media Manager Jobs',
    'SEO Specialist Openings',
    'Content Writer Jobs',
    'Join Samsara Team',
    'Creative Marketing Jobs',
  ],
  metadataBase: new URL('https://www.samsarastudio.co'),
  openGraph: {
    title: 'Careers | Samsara Studio',
    description:
      'Discover exciting roles at Samsara Studio. Join our team of creatives, strategists, and marketers to build powerful digital campaigns.',
    url: 'https://www.samsarastudio.co/careers',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/careers-og.jpg', // Make sure this exists in your /public/assets/og folder
        width: 1200,
        height: 630,
        alt: 'Samsara Studio Careers',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Careers | Samsara Studio',
    description:
      'Explore open roles at Samsara Studio. Be part of an innovative digital marketing team helping brands grow online.',
    images: ['/assets/og/careers-og.jpg'],
    site: '@samsarastudio', // Remove or update based on real Twitter handle
  },
  alternates: {
    canonical: 'https://www.samsarastudio.co/careers',
  },
  other: {
    'instagram:profile': 'https://www.instagram.com/samsara.studio_/',
  },
};



const page = () => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <CareerMain />
      </PageWrapper>
    </div>
  );
};

export default page;
