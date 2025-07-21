'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { getServiceById } from '@/services/apis';

const Service = () => {
  const { id } = useParams();
  const [content, setContent] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchService = async () => {
      try {
        const data = await getServiceById(id);
        setContent(data);
      } catch (error) {
        console.error("Error loading service:", error);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchService();
  }, [id]);

  if (loading || !content) return <p className="text-center p-10">Loading...</p>;

  return (
    <div className="relative z-10 p-4 md:p-10 max-w-5xl mx-auto">
      {/* Hero */}
      <section className="text-center py-10">
        <h1 className="text-3xl md:text-4xl font-bold mb-4">{content.hero?.title}</h1>
        <p className="text-gray-600 dark:text-gray-300 mb-6">{content.hero?.subtitle}</p>
     
      </section>

      {/* Intro Section */}
      <section className="bg-gray-50 dark:bg-gray-800 p-6 rounded-lg mb-10 flex flex-col md:flex-row gap-6 items-center">
        <div className="md:w-1/2">
          <h2 className="text-2xl font-semibold mb-3">{content.intro?.title}</h2>
          <p className="text-gray-700 dark:text-gray-300">{content.intro?.description}</p>
        </div>
        {content.intro?.imageUrl && (
          <Image
            src={content.intro.imageUrl}
            alt={content.intro.title}
            width={500}
            height={300}
            className="w-full md:w-1/2 rounded-lg object-cover"
          />
        )}
      </section>

      {/* Features / Offerings */}
      {content.features && (
        <section className="mb-10">
          <h3 className="text-2xl font-semibold mb-6">{content.features.title}</h3>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            {content.features.items?.map((item, idx) => (
              <div
                key={item._id || idx}
                className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow border dark:border-white/10"
              >
                <h4 className="text-lg font-semibold mb-2">{item.title}</h4>
                <p className="text-sm text-gray-600 dark:text-gray-300">{item.description}</p>
              </div>
            ))}
          </div>
        </section>
      )}

      {/* Process Steps */}
      {content.steps && (
        <section>
          <h3 className="text-2xl font-semibold mb-6">{content.steps.title}</h3>
          <ol className="space-y-4">
            {content.steps.items?.map((step, index) => (
              <li key={step._id || index} className="flex gap-4">
                <div className="h-8 w-8 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold">
                  {index + 1}
                </div>
                <div className="text-left">
                  <h5 className="font-bold">{step.title}</h5>
                  <p className="text-sm text-gray-600 dark:text-gray-300">{step.description}</p>
                </div>
              </li>
            ))}
          </ol>
        </section>
      )}

      {/* CTA Button */}
      {content.callToAction?.text && (
        <div className="text-center mt-10">
          <Link
            href={content.callToAction.link || '/contact'}
            className="px-6 py-3 bg-secondary text-white rounded-md font-semibold hover:scale-105 transition-transform"
          >
            {content.callToAction.text}
          </Link>
        </div>
      )}
    </div>
  );
};

export default Service;
