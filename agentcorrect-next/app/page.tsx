import HeroSplitScreen from '@/components/HeroSplitScreen'
import HowItWorksSimple from '@/components/HowItWorksSimple'
import PricingSimple from '@/components/PricingSimple'
import FooterBar from '@/components/FooterBar'

export default function Home() {
  return (
    <main id="main">
      <HeroSplitScreen />
      <HowItWorksSimple />
      <PricingSimple />
      <FooterBar />
    </main>
  )
}