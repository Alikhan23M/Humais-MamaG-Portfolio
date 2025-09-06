import Hero from '../components/Hero'
import About from '../components/About'
import Services from '../components/Services'
import Testimonials from '../components/Testimonials'
import Contact from '../components/Contact'
import Footer from '../components/Footer'
import Portfolio from '@/components/Portfolio'


export default function Home() {
  return (
    <main className="min-h-screen">
      <Hero />
      <About />
      <Services />
      <Portfolio />
      <Testimonials />
      <Contact />
      <Footer />
    </main>
  )
}