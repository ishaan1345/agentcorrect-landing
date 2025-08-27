import Hero from '@/components/Hero'
import DualPaths from '@/components/DualPaths'
import WhyItWins from '@/components/WhyItWins'
import Credibility from '@/components/Credibility'
import Gallery from '@/components/Gallery'
import HowItWorks from '@/components/HowItWorks'
import Pricing from '@/components/Pricing'
import Security from '@/components/Security'
import Testimonials from '@/components/Testimonials'
import FAQ from '@/components/FAQ'
import FooterBar from '@/components/FooterBar'
import CTASticky from '@/components/CTASticky'

export default function Home() {
  return (
    <main id="main">
      <Hero />
      <DualPaths />
      <WhyItWins />
      <Credibility />
      <Gallery />
      <HowItWorks />
      <Pricing />
      <Security />
      <Testimonials />
      <FAQ />
      <FooterBar />
      <CTASticky />
    </main>
  )
}