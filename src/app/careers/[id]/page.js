
import DetailMain from "@/components/sections/career/DetailMain";
import PageWrapper from "@/components/wrappers/PageWrapper";
import React from "react";
export const metadata = {
  title: 'Careers | Samsara Studio',
  description:
    'Join Samsara Studio and shape the future of digital marketing. We’re hiring creative thinkers, designers, marketers, and strategists. Explore our job openings and grow with us.',
  keywords: [
    'Samsara Studio Careers',
    'Jobs at Samsara Studio',
    'Digital Marketing Jobs',
    'Creative Agency Hiring',
    'Social Media Jobs',
    'SEO Careers',
    'Marketing Strategist Openings',
    'Content Marketing Jobs',
    'Hiring at Samsara Studio',
    'Join Samsara Team',
  ],
  metadataBase: new URL('https://www.samsarastudio.com'),
  openGraph: {
    title: 'Careers | Samsara Studio',
    description:
      'Discover career opportunities at Samsara Studio. Join our creative team and help shape powerful digital campaigns for brands across the world.',
    url: 'https://www.samsarastudio.com/careers',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/careers-og.jpg', 
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
      'Explore open positions at Samsara Studio. Work with an innovative digital marketing team driving brand success online.',
    images: ['/assets/og/careers-og.jpg'], 
    site: '@samsarastudio',
  },
  alternates: {
    canonical: 'https://www.samsarastudio.com/careers',
  },
};


const page = ({params}) => {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <DetailMain params={params} />
      </PageWrapper>
    </div>
  );
};

export default page;
