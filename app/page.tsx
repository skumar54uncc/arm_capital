import Navigation from '@/components/Navigation'
import Hero from '@/components/sections/Hero'
import AboutUs from '@/components/sections/AboutUs'
import OurEdge from '@/components/sections/OurEdge'
import InvestmentStrategy from '@/components/sections/InvestmentStrategy'
import GlobalPresence from '@/components/sections/GlobalPresence'
import Team from '@/components/sections/Team'
import PerformanceInsights from '@/components/sections/PerformanceInsights'
import ContactFooter from '@/components/sections/ContactFooter'

export default function Home() {
  return (
    <>
      <Navigation />
      <main className="min-h-screen">
        <Hero />
        <AboutUs />
        <OurEdge />
        <InvestmentStrategy />
        <GlobalPresence />
        <Team />
        <PerformanceInsights />
        <ContactFooter />
      </main>
    </>
  )
}
