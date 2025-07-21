import React from 'react'
import PageWrapper from '@/components/wrappers/PageWrapper';
import Portfolio from '@/components/sections/portfolio/Portfolio';

export const metadata = {
  title: 'Our Work | Portfolio | Samsara Studio',
  description:
    'Explore Samsara Studio’s portfolio featuring impactful digital marketing campaigns, creative branding, and performance-driven solutions delivered to clients across industries.',
  keywords: [
    'Samsara Studio Portfolio',
    'Digital Marketing Case Studies',
    'Creative Campaigns',
    'Social Media Marketing Work',
    'SEO Success Stories',
    'Content Strategy Projects',
    'Branding Portfolio',
    'Marketing Agency Work Samples',
    'Client Work Samsara Studio',
    'Digital Campaign Showcase',
  ],
  metadataBase: new URL('https://www.samsarastudio.com'),
  openGraph: {
    title: 'Our Work | Portfolio | Samsara Studio',
    description:
      'Take a look at our portfolio and see how Samsara Studio has helped brands grow with powerful creative and data-driven marketing solutions.',
    url: 'https://www.samsarastudio.com/portfolio',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/portfolio-og.jpg', // Replace with actual image path
        width: 1200,
        height: 630,
        alt: 'Samsara Studio Portfolio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Our Work | Portfolio | Samsara Studio',
    description:
      'Discover how Samsara Studio delivers impactful digital experiences through our portfolio of brand stories and campaigns.',
    images: ['/assets/og/portfolio-og.jpg'], // Replace with actual image path
    site: '@samsarastudio', // Replace with your official Twitter handle
  },
  alternates: {
    canonical: 'https://www.samsarastudio.com/portfolio',
  },
};


const page = () => {
  return (
     <div className="font-[family-name:var(--font-geist-sans)]">
      <PageWrapper>
        <Portfolio/>
      </PageWrapper>
    </div>
  )
}

export default page
