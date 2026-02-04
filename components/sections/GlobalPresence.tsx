'use client'

import { motion } from 'framer-motion'
import { useInView } from 'framer-motion'
import { useRef, useEffect, useState } from 'react'
import { MapPin } from 'lucide-react'

const regions = [
  { name: 'North America', coordinates: [-95, 40], description: 'US and Canadian equity markets' },
  { name: 'Europe', coordinates: [10, 54], description: 'UK, Continental Europe' },
  { name: 'Asia Pacific', coordinates: [120, 30], description: 'India, China, Japan, and broader APAC' },
  { name: 'Emerging Markets', coordinates: [80, 20], description: 'Select emerging market opportunities' },
]

export default function GlobalPresence() {
  const ref = useRef(null)
  const mapContainerRef = useRef<HTMLDivElement>(null)
  const isInView = useInView(ref, { once: true, margin: '-100px' })
  const [hoveredRegion, setHoveredRegion] = useState<string | null>(null)
  const [mapInstance, setMapInstance] = useState<any>(null)

  useEffect(() => {
    // Try to load Mapbox if token is available
    const token = process.env.NEXT_PUBLIC_MAPBOX_TOKEN
    
    if (token && typeof window !== 'undefined' && mapContainerRef.current && !mapInstance) {
      // Dynamically import Mapbox library
      import('mapbox-gl').then((mapboxgl) => {
        // Import CSS dynamically (TypeScript ignore for CSS import)
        // @ts-ignore
        import('mapbox-gl/dist/mapbox-gl.css')
        
        // @ts-ignore
        mapboxgl.default.accessToken = token
        
        const map = new mapboxgl.default.Map({
          container: mapContainerRef.current!,
          style: 'mapbox://styles/mapbox/dark-v11', // Dark theme for institutional look
          center: [20, 30],
          zoom: 1.5,
          attributionControl: false,
        })

        map.on('load', () => {
          // Add region markers
          regions.forEach((region) => {
            const [lon, lat] = region.coordinates
            
            // Create marker element
            const el = document.createElement('div')
            el.className = 'map-marker'
            el.style.width = '12px'
            el.style.height = '12px'
            el.style.borderRadius = '50%'
            el.style.backgroundColor = '#0284c7'
            el.style.border = '2px solid #fff'
            el.style.cursor = 'pointer'
            el.style.transition = 'all 0.3s'
            
            el.addEventListener('mouseenter', () => {
              el.style.backgroundColor = '#0ea5e9'
              el.style.transform = 'scale(1.3)'
              setHoveredRegion(region.name)
            })
            
            el.addEventListener('mouseleave', () => {
              el.style.backgroundColor = '#0284c7'
              el.style.transform = 'scale(1)'
              setHoveredRegion(null)
            })

            // Add marker to map
            new mapboxgl.default.Marker(el)
              .setLngLat([lon, lat])
              .addTo(map)
          })

          // Add region polygons/highlights
          const regionPolygons: Record<string, number[][]> = {
            'North America': [
              [-130, 25], [-100, 25], [-100, 50], [-130, 50], [-130, 25]
            ],
            'Europe': [
              [-10, 35], [40, 35], [40, 70], [-10, 70], [-10, 35]
            ],
            'Asia Pacific': [
              [100, 0], [150, 0], [150, 50], [100, 50], [100, 0]
            ],
            'Emerging Markets': [
              [60, 5], [100, 5], [100, 35], [60, 35], [60, 5]
            ],
          }

          Object.entries(regionPolygons).forEach(([name, coordinates]) => {
            map.addSource(`region-${name}`, {
              type: 'geojson',
              data: {
                type: 'Feature',
                properties: {},
                geometry: {
                  type: 'Polygon',
                  coordinates: [coordinates],
                },
              },
            })

            map.addLayer({
              id: `region-${name}`,
              type: 'fill',
              source: `region-${name}`,
              paint: {
                'fill-color': '#0ea5e9',
                'fill-opacity': 0.1,
              },
            })

            map.addLayer({
              id: `region-${name}-outline`,
              type: 'line',
              source: `region-${name}`,
              paint: {
                'line-color': '#0ea5e9',
                'line-opacity': 0.3,
                'line-width': 1,
              },
            })
          })
        })

        setMapInstance(map)

        // Cleanup
        return () => {
          map.remove()
        }
      }).catch((err) => {
        // Mapbox not available, using SVG fallback
      })
    }
  }, [mapInstance])

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
            className="relative h-[500px] bg-primary-900/50 border border-primary-800 overflow-hidden"
          >
            {/* Mapbox Container */}
            <div
              ref={mapContainerRef}
              className="w-full h-full"
              style={{ display: mapInstance ? 'block' : 'none' }}
            />

            {/* SVG Default World Map */}
            {!mapInstance && (
              <svg
                viewBox="0 0 1000 500"
                className="w-full h-full"
                style={{ filter: 'brightness(0.9)' }}
              >
                <defs>
                  <linearGradient id="oceanGradient" x1="0%" y1="0%" x2="0%" y2="100%">
                    <stop offset="0%" stopColor="#0a1c2d" stopOpacity="0.3" />
                    <stop offset="100%" stopColor="#102a43" stopOpacity="0.2" />
                  </linearGradient>
                  <filter id="glow">
                    <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
                    <feMerge>
                      <feMergeNode in="coloredBlur"/>
                      <feMergeNode in="SourceGraphic"/>
                    </feMerge>
                  </filter>
                </defs>
                
                {/* Ocean Background */}
                <rect width="1000" height="500" fill="url(#oceanGradient)" />
                
                {/* World Map Paths - More detailed continent shapes */}
                
                {/* North America - More detailed shape */}
                <path
                  d="M 120 80 L 180 75 L 240 85 L 280 100 L 320 120 L 350 140 L 360 170 L 370 200 L 365 230 L 350 260 L 330 280 L 300 290 L 270 295 L 240 290 L 210 280 L 180 270 L 150 250 L 130 220 L 120 190 L 115 160 L 110 130 L 115 100 Z"
                  fill={hoveredRegion === 'North America' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('North America')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  filter={hoveredRegion === 'North America' ? 'url(#glow)' : undefined}
                />
                
                {/* Canada/Alaska */}
                <path
                  d="M 80 40 L 200 35 L 250 50 L 280 70 L 300 90 L 320 110 L 300 120 L 250 115 L 200 100 L 150 90 L 100 70 L 80 50 Z"
                  fill={hoveredRegion === 'North America' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('North America')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* South America */}
                <path
                  d="M 280 280 L 320 285 L 350 300 L 370 330 L 380 360 L 375 390 L 360 410 L 340 420 L 310 425 L 280 420 L 250 410 L 230 390 L 220 360 L 225 330 L 240 300 L 260 285 Z"
                  fill="rgba(14, 165, 233, 0.1)"
                  stroke="rgba(14, 165, 233, 0.3)"
                  strokeWidth="1.5"
                />
                
                {/* Europe - More detailed */}
                <path
                  d="M 480 60 L 520 65 L 550 75 L 570 90 L 580 110 L 575 130 L 565 150 L 550 165 L 530 170 L 510 168 L 490 160 L 475 145 L 470 125 L 472 105 L 478 85 Z"
                  fill={hoveredRegion === 'Europe' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Europe')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  filter={hoveredRegion === 'Europe' ? 'url(#glow)' : undefined}
                />
                
                {/* UK */}
                <path
                  d="M 470 90 L 485 92 L 490 100 L 485 108 L 475 110 L 468 105 L 465 98 Z"
                  fill={hoveredRegion === 'Europe' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Europe')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Africa */}
                <path
                  d="M 520 180 L 560 185 L 590 200 L 610 230 L 620 270 L 615 310 L 605 340 L 585 360 L 560 370 L 535 375 L 510 370 L 490 360 L 475 340 L 470 310 L 475 280 L 485 250 L 500 220 L 515 195 Z"
                  fill="rgba(14, 165, 233, 0.1)"
                  stroke="rgba(14, 165, 233, 0.3)"
                  strokeWidth="1.5"
                />
                
                {/* Middle East */}
                <path
                  d="M 580 200 L 620 205 L 640 220 L 645 240 L 635 255 L 620 260 L 600 255 L 585 245 L 580 225 Z"
                  fill={hoveredRegion === 'Emerging Markets' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Emerging Markets')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Asia - More detailed */}
                <path
                  d="M 640 50 L 720 55 L 780 70 L 820 95 L 850 130 L 870 170 L 880 210 L 875 250 L 860 280 L 835 300 L 800 310 L 760 305 L 720 295 L 685 280 L 660 260 L 645 235 L 640 205 L 642 175 L 648 145 L 655 115 L 660 85 L 655 65 Z"
                  fill={hoveredRegion === 'Asia Pacific' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Asia Pacific')}
                  onMouseLeave={() => setHoveredRegion(null)}
                  filter={hoveredRegion === 'Asia Pacific' ? 'url(#glow)' : undefined}
                />
                
                {/* India */}
                <path
                  d="M 680 240 L 720 245 L 740 260 L 745 280 L 735 295 L 715 300 L 695 295 L 680 285 L 675 265 L 678 250 Z"
                  fill={hoveredRegion === 'Asia Pacific' || hoveredRegion === 'Emerging Markets' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Asia Pacific')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* China */}
                <path
                  d="M 750 180 L 820 185 L 850 200 L 860 225 L 855 250 L 840 270 L 815 275 L 790 270 L 770 255 L 755 235 L 750 210 Z"
                  fill={hoveredRegion === 'Asia Pacific' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Asia Pacific')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Japan */}
                <path
                  d="M 880 200 L 895 202 L 900 210 L 895 218 L 885 220 L 878 215 L 875 205 Z"
                  fill={hoveredRegion === 'Asia Pacific' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Asia Pacific')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Australia */}
                <path
                  d="M 800 380 L 860 385 L 890 400 L 900 420 L 890 435 L 870 440 L 840 435 L 815 425 L 800 410 L 795 395 Z"
                  fill="rgba(14, 165, 233, 0.1)"
                  stroke="rgba(14, 165, 233, 0.3)"
                  strokeWidth="1.5"
                />
                
                {/* Southeast Asia */}
                <path
                  d="M 780 320 L 820 325 L 850 340 L 860 360 L 850 375 L 830 380 L 805 375 L 785 365 L 775 345 Z"
                  fill={hoveredRegion === 'Asia Pacific' ? 'rgba(14, 165, 233, 0.25)' : 'rgba(14, 165, 233, 0.12)'}
                  stroke="rgba(14, 165, 233, 0.4)"
                  strokeWidth="1.5"
                  className="transition-all duration-300 cursor-pointer"
                  onMouseEnter={() => setHoveredRegion('Asia Pacific')}
                  onMouseLeave={() => setHoveredRegion(null)}
                />
                
                {/* Region markers */}
                {regions.map((region) => {
                  const [lon, lat] = region.coordinates
                  const x = ((lon + 180) / 360) * 1000
                  const y = ((90 - lat) / 180) * 500
                  const isHovered = hoveredRegion === region.name
                  
                  return (
                    <g key={region.name}>
                      {/* Pulsing outer circle */}
                      {isHovered && (
                        <circle
                          cx={x}
                          cy={y}
                          r={20}
                          fill="rgba(14, 165, 233, 0.2)"
                          className="animate-ping"
                        />
                      )}
                      
                      {/* Marker circle */}
                      <circle
                        cx={x}
                        cy={y}
                        r={isHovered ? 10 : 8}
                        fill={isHovered ? '#0ea5e9' : '#0284c7'}
                        stroke="#fff"
                        strokeWidth="2"
                        className="cursor-pointer transition-all duration-300"
                        onMouseEnter={() => setHoveredRegion(region.name)}
                        onMouseLeave={() => setHoveredRegion(null)}
                      />
                      
                      {/* Tooltip */}
                      {isHovered && (
                        <g>
                          <rect
                            x={x + 15}
                            y={y - 35}
                            width="200"
                            height="55"
                            fill="rgba(15, 23, 42, 0.98)"
                            stroke="#0ea5e9"
                            strokeWidth="1"
                            rx="4"
                            className="backdrop-blur-sm"
                          />
                          <text
                            x={x + 25}
                            y={y - 15}
                            fill="#fff"
                            fontSize="13"
                            fontWeight="600"
                            fontFamily="system-ui"
                          >
                            {region.name}
                          </text>
                          <text
                            x={x + 25}
                            y={y + 5}
                            fill="#94a3b8"
                            fontSize="11"
                            fontFamily="system-ui"
                          >
                            {region.description}
                          </text>
                        </g>
                      )}
                    </g>
                  )
                })}
              </svg>
            )}
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

      <style jsx global>{`
        .mapboxgl-ctrl-logo,
        .mapboxgl-ctrl-attrib {
          display: none !important;
        }
        .map-marker {
          box-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
        }
      `}</style>
    </section>
  )
}
