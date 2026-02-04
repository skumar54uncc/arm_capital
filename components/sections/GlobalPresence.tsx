'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'
import dynamic from 'next/dynamic'

const regions: Array<{ name: string; coordinates: [number, number]; description: string }> = [
  { name: 'North America', coordinates: [-95, 40], description: 'US and Canadian equity markets' },
  { name: 'Europe', coordinates: [10, 54], description: 'UK, Continental Europe' },
  { name: 'Asia Pacific', coordinates: [120, 30], description: 'India, China, Japan, and broader APAC' },
  { name: 'Emerging Markets', coordinates: [80, 20], description: 'Select emerging market opportunities' },
]

// Dynamically import Leaflet map component (client-side only)
const LeafletMap = dynamic(() => import('./LeafletMap'), { 
  ssr: false,
  loading: () => (
    <div className="w-full h-full flex items-center justify-center bg-primary-900/50">
      <div className="text-primary-400 text-sm">Loading map...</div>
    </div>
  )
})

export default function GlobalPresence() {
  const ref = useRef(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)

  return (
    <section id="presence" ref={ref} className="section-padding bg-primary-950">
      <div className="container-custom">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 30 }}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl md:text-5xl font-serif font-bold mb-4">
            Global Presence
          </h2>
          <p className="text-xl text-primary-300 max-w-2xl mx-auto">
            Research footprint and regional exposure across global equity markets
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Map Visualization */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -30 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative h-[500px] bg-primary-900/50 border border-primary-800 overflow-hidden rounded-sm"
          >
            <LeafletMap 
              regions={regions}
              hoveredRegion={hoveredRegion}
              setHoveredRegion={setHoveredRegion}
            />
          </motion.div>

          {/* Region Details */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            animate={isInView ? { opacity: 1, x: 0 } : { opacity: 0, x: 30 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="space-y-6"
          >
            {regions.map((region, index) => (
              <motion.div
                key={region.name}
                initial={{ opacity: 0, y: 20 }}
                animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ duration: 0.5, delay: 0.5 + index * 0.1 }}
                className={`p-6 bg-primary-900/50 border transition-all duration-300 cursor-pointer ${
                  hoveredRegion === region.name
                    ? 'border-primary-700 bg-primary-900/70'
                    : 'border-primary-800 hover:border-primary-700'
                }`}
                onMouseEnter={() => setHoveredRegion(region.name)}
                onMouseLeave={() => setHoveredRegion(null)}
              >
                <div className="flex items-start gap-4">
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 transition-colors ${
                    hoveredRegion === region.name ? 'bg-primary-700' : 'bg-primary-800'
                  }`}>
                    <MapPin className="w-5 h-5 text-accent-400" />
                  </div>
                  <div>
                    <h3 className="text-xl font-serif font-semibold mb-2 text-primary-50">
                      {region.name}
                    </h3>
                    <p className="text-primary-300 text-sm leading-relaxed">
                      {region.description}
                    </p>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.6, delay: 0.8 }}
          className="text-xs text-primary-500 text-center mt-12 italic"
        >
          Geographic exposure may vary based on market conditions and opportunity set. For illustrative purposes only.
        </motion.p>
      </div>
    </section>
  )
}
