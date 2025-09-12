"use client";

import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import Image from 'next/image';
import ClientLoader from '@/components/ui/ClientLoader'; // Assuming you have a loader component

export default function AboutPage() {
  const [aboutData, setAboutData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchAboutData = async () => {
      try {
        const response = await fetch('/api/detail-about');
        if (!response.ok) {
          throw new Error('Failed to fetch about data');
        }
        const data = await response.json();
        // console.log(data);
        setAboutData(data[0]);
      } catch (error) {
        console.error("Error fetching about data:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchAboutData();
  }, []);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
        <ClientLoader />
      </div>
    );
  }

  if (!aboutData) {
    return (
      <>
        <Navbar />
        <main className="min-h-screen flex items-center justify-center bg-gray-950 text-white">
          <p>Failed to load about page content.</p>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-gray-950 text-gray-300 relative overflow-hidden px-6 md:px-12 lg:px-16">
        {/* Background Glows */}
        <div className="absolute inset-0 z-0">
          <div className="absolute top-20 -left-20 w-72 h-72 bg-purple-500 rounded-full opacity-20 blur-3xl"></div>
          <div className="absolute bottom-20 -right-20 w-72 h-72 bg-pink-500 rounded-full opacity-20 blur-3xl"></div>
        </div>

        {/* Main About Section */}
        <section className="py-24 relative z-10">
          <div className="container mx-auto">
           {aboutData?.title !== '' && <h1 className="text-4xl sm:text-5xl font-extrabold mb-8 text-center bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent py-2">
              {aboutData?.title}
            </h1>}
            {aboutData?.description!== '' &&<p className="text-lg text-center max-w-4xl mx-auto">
              {aboutData?.description}
            </p> }
          </div>
        </section>

        {/* Dynamic Sections */}
        {aboutData?.sections?.map((section, index) => (
          <section key={index} className="pb-20 relative z-10">
            <h2 className="md:hidden text-center text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent py-1">
              {section.title}
            </h2>
            <div className={`container mx-auto flex flex-col items-center gap-12 ${section.imagePosition === 'right' ? 'md:flex-row-reverse' : 'md:flex-row'}`}>

              {/* Image Column */}
              <div className="w-full md:w-1/2 flex justify-center">
                {section.image && (
                  <Image
                    src={section.image}
                    alt={section.title || "Section Image"}
                    width={500}
                    height={400}
                    objectFit="cover"
                    className="rounded-2xl shadow-lg"
                  />
                )}
              </div>

              {/* Text Column */}
              <div className="w-full md:w-1/2">
                <h2 className="hidden md:block text-3xl sm:text-4xl font-bold mb-4 bg-gradient-to-r from-purple-400 to-pink-500 bg-clip-text text-transparent py-1">
                  {section.title}
                </h2>
                <p className="text-lg text-gray-300 md:text-justify">
                  {section.description}
                </p>
              </div>

            </div>
          </section>
        ))}
      </main>
      <Footer />
    </>
  );
}