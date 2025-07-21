'use client';

import { usePathname } from 'next/navigation';
import Link from 'next/link';
import { ChevronRight } from 'lucide-react';
import Image from 'next/image';
import BgBanner from "@/assets/BgBanner.jpg";

const Breadcrumbs = () => {
  const pathname = usePathname();
  const segments = pathname.split('/').filter(Boolean);

  return (
    <section
      data-aos="fade-up"
      className="relative  w-full flex flex-col justify-between text-white select-none px-4  md:px-8 lg:px-10 bg-white/10 dark:bg-black/10"
    >
      {/* <div className="absolute inset-0 z-0 select-none">
        <Image
          src={BgBanner}
          alt="Background Banner"
          fill
          className="object-cover opacity-30 blur-md pointer-events-none"
          draggable={false}
          priority
        />
      </div> */}

      {/* Breadcrumb */}
      <nav className="text-sm text-gray-300 mb-4 relative z-10" aria-label="Breadcrumb">
        <ol className="flex items-center space-x-1 sm:space-x-2">
          <li>
            <Link href="/" className="hover:underline hover:underline-offset-4 text-white">
              Home
            </Link>
          </li>
          {segments.map((seg, index) => {
            const href = '/' + segments.slice(0, index + 1).join('/');
            const isLast = index === segments.length - 1;

            return (
              <li key={href} className="flex items-center space-x-1">
                <ChevronRight className="h-4 w-4 font-bold text-gray-200" />
                {isLast ? (
                  <span className="text-white font-semibold capitalize">
                    {seg.replace(/-/g, ' ')}
                  </span>
                ) : (
                  <Link href={href} className="hover:underline text-white capitalize">
                    {seg.replace(/-/g, ' ')}
                  </Link>
                )}
              </li>
            );
          })}
        </ol>
      </nav>
    </section>
  );
};

export default Breadcrumbs;
