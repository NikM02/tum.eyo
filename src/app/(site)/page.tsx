import HeroSlider from '@/components/HeroSlider'
import About from '@/components/About'
import Services from '@/components/Services'
import Portfolio from '@/components/Portfolio'
import FAQ from '@/components/FAQ'
import Contact from '@/components/Contact'

import { fetchSliders, fetchAbout, fetchPortfolio, fetchFAQs, fetchServices, fetchContactInfo } from '@/lib/api'

// Prevent Next.js from aggressively caching if the API is dynamic
export const dynamic = 'force-dynamic'

export default async function Home() {
  const [sliders, aboutData, portfolioItems, faqs, services, contactInfo] = await Promise.all([
    fetchSliders(),
    fetchAbout(),
    fetchPortfolio(),
    fetchFAQs(),
    fetchServices(),
    fetchContactInfo(),
  ])

  return (
    <div className="w-full">
      <HeroSlider slides={sliders} />
      <About data={aboutData} />
      <Services services={services} />
      <Portfolio items={portfolioItems} />
      <FAQ faqs={faqs} />
      <Contact info={contactInfo} />
    </div>
  )
}
