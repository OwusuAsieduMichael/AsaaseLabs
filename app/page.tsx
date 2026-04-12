import Hero from '@/components/Hero'
import About from '@/components/About'
import Services from '@/components/Services'
import Products from '@/components/Products'
import WhyChooseUs from '@/components/WhyChooseUs'
import Process from '@/components/Process'
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
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  )
}
