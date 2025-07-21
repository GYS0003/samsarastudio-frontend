import Home from '@/components/sections/home/Home';
import PageWrapper from '@/components/wrappers/PageWrapper';
import Footer from '@/components/layout/footer/Footer'
import Header from '@/components/layout/header/Header'
import BookCall from '@/components/sections/aboutus/LetsConnect/BookCall';

export const metadata = {
  title: 'Let’s Talk | Book a Meeting | Samsara Studio',
  description:
    'Ready to elevate your brand? Book a meeting with Samsara Studio to explore custom digital marketing strategies tailored to your business goals.',
  keywords: [
    'Book a Meeting',
    'Let’s Talk',
    'Contact Samsara Studio',
    'Schedule Strategy Call',
    'Digital Marketing Consultation',
    'Social Media Marketing',
    'SEO Services',
    'Content Strategy',
    'Samsara Studio Meeting',
  ],
  metadataBase: new URL('https://www.samsarastudio.com'),
  alternates: {
    canonical: 'https://www.samsarastudio.com/lets-talk',
  },
  openGraph: {
    title: 'Let’s Talk | Book a Meeting | Samsara Studio',
    description:
      'Speak with Samsara Studio’s digital marketing experts. Let’s discuss how we can help grow your brand through strategic digital solutions.',
    url: 'https://www.samsarastudio.com/lets-talk',
    siteName: 'Samsara Studio',
    locale: 'en_IN',
    type: 'website',
    images: [
      {
        url: '/assets/og/lets-talk-og.jpg', // Replace with actual image path
        width: 1200,
        height: 630,
        alt: 'Book a Meeting with Samsara Studio',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Let’s Talk | Book a Meeting | Samsara Studio',
    description:
      'Book your strategy session with Samsara Studio to explore data-driven, creative digital marketing solutions.',
    site: '@samsarastudio', // Replace with your real Twitter handle
    images: ['/assets/og/lets-talk-og.jpg'], // Replace with actual image path
  },
  robots: {
    index: true,
    follow: true,
    nocache: false,
  },
};


export default function Page() {
  return (
    <div className="font-[family-name:var(--font-geist-sans)] scrollbar-hide">
      <PageWrapper>

      <main className="min-h-screen scrollbar-hide"> <BookCall /></main>
       
      </PageWrapper>
    </div>
  );
}
