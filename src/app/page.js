import Home from '@/components/sections/home/Home';
import PageWrapper from '@/components/wrappers/PageWrapper';

export const metadata = {
  title: 'Samsara Studio | Creative Digital Marketing Agency',
  description:
    'Samsara Studio is a creative digital marketing agency offering SEO, branding, content, and social media strategies that grow your brand with impact.',
  keywords: [
    'Samsara Studio',
    'Digital Marketing Agency',
    'Creative Agency India',
    'SEO Services',
    'Branding Agency',
    'Social Media Marketing',
    'Content Marketing',
    'Performance Marketing',
    'Marketing Studio',
    'Creative Digital Solutions',
  ],
  metadataBase: new URL('https://www.samsarastudio.co'),
  alternates: {
    canonical: 'https://www.samsarastudio.co',
  },
  openGraph: {
    title: 'Samsara Studio | Creative Digital Marketing Agency',
    description:
      'Discover Samsara Studio – your partner in SEO, branding, social media, and digital growth. We craft campaigns that inspire and convert.',
    url: 'https://www.samsarastudio.co',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/home-og.jpg', // Make sure this exists in /public/assets/og/
        width: 1200,
        height: 630,
        alt: 'Samsara Studio Homepage',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Samsara Studio | Creative Digital Marketing Agency',
    description:
      'From branding to digital campaigns, Samsara Studio helps businesses grow with strategy, creativity, and results.',
    images: ['/assets/og/home-og.jpg'],
    site: '@samsarastudio', // Optional if no active Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
  other: {
    'instagram:profile': 'https://www.instagram.com/samsara.studio_/',
  },
};


export default function Page() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)]   scrollbar-hide">
      <PageWrapper>

      <main className=" scrollbar-hide"> <Home /></main>
       
      </PageWrapper>
    </div>
  );
}
