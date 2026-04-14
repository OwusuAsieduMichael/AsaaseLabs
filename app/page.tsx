import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Products from '@/components/Products'
import WhyChooseUs from '@/components/WhyChooseUs'
import Process from '@/components/Process'
import Founder from '@/components/Founder'
import Testimonials from '@/components/Testimonials'
import CTA from '@/components/CTA'
import Footer from '@/components/Footer'
import Navbar from '@/components/Navbar'

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navbar />
      <Hero />
      <About />
      <Services />
      <Products />
      <WhyChooseUs />
      <Process />
      <Founder />
      
      {/* Sections after Founder with professional backgrounds */}
      <div className="relative">
        {/* Background pattern overlay */}
        <div className="absolute inset-0 pattern-grid-large opacity-50 pointer-events-none"></div>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent pointer-events-none"></div>
        
        <div className="relative z-10">
          <Testimonials />
          <CTA />
        </div>
      </div>
      
      <Footer />
    </main>
  )
}
