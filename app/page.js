'use client'
import { useEffect } from 'react';
import { useRouter } from 'next/router'; // Or use usePathname from next/navigation for App Router

import Hero from '../components/Hero';
import About from '../components/About';
import Services from '../components/Services';
import Testimonials from '../components/Testimonials';
import Contact from '../components/Contact';
import Footer from '../components/Footer';
import Portfolio from '@/components/Portfolio';
import Strategy from '@/components/Strategy';

export default function Home() {
  // Use useRouter in Pages Router or usePathname in App Router
  // const { asPath } = useRouter(); // For Pages Router
  // const { pathname } = usePathname(); // For App Router

  useEffect(() => {
    // Get the hash from the URL
    // For Pages Router, you can use `window.location.hash`
    // For App Router, you'll need a similar approach or a different router hook
    const hash = window.location.hash;

    if (hash) {
      // Find the element with the matching id
      const element = document.getElementById(hash.substring(1));

      if (element) {
        // Scroll to the element
        element.scrollIntoView({ behavior: 'smooth' });
      }
    }
  }, []); // The empty dependency array ensures this runs once after the component mounts

  return (
    <main className="min-h-screen">
      <Hero id="home" />
      <About id="about" />
      <Strategy id="strategy" />
      <Services id="services" />
      <Portfolio id="portfolio" />
      <Testimonials id="testimonials" />
      <Contact id="contact" />
      <Footer />

    </main>
  );
}