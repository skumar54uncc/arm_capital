'use client'

import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps'
import { useState } from 'react'

// World map TopoJSON URL (free, no API key needed)
const geoUrl = 'https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json'

// Primary focus countries (ISO 3 codes and name mappings)
const PRIMARY_FOCUS_COUNTRIES = [
  'USA', // United States
  'CAN', // Canada
  'GBR', // United Kingdom
  'FRA', // France
  'DEU', // Germany
  'ITA', // Italy
  'IND', // India
  'CHN', // China
  'JPN', // Japan
]


interface WorldMapProps {
  hoveredRegion: string | null
  setHoveredRegion: (region: string | null) => void
}

export default function WorldMap({ hoveredRegion, setHoveredRegion }: WorldMapProps) {
  const [isClient, setIsClient] = useState(false)

  if (typeof window !== 'undefined' && !isClient) {
    setIsClient(true)
  }

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary-900/50">
        <div className="text-primary-400 text-sm">Loading map...</div>
      </div>
    )
  }

  return (
    <div className="w-full h-full relative">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [0, 20],
        }}
        className="w-full h-full"
      >
        <Geographies geography={geoUrl}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const countryCode = geo.properties.ISO_A3
              const countryName = geo.properties.NAME
              const isPrimaryFocus = PRIMARY_FOCUS_COUNTRIES.includes(countryCode)
              
              // Match country names (handle variations like "United States of America" vs "United States")
              const normalizedName = countryName === 'United States of America' ? 'United States' : countryName
              const isHovered = hoveredRegion && normalizedName === hoveredRegion

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={isPrimaryFocus ? '#0ea5e9' : '#475569'}
                  stroke={isPrimaryFocus ? '#1e40af' : '#334155'}
                  strokeWidth={isPrimaryFocus ? 0.5 : 0.2}
                  style={{
                    default: {
                      outline: 'none',
                      opacity: isPrimaryFocus ? 0.9 : 0.25,
                      transition: 'all 0.3s ease',
                    },
                    hover: {
                      outline: 'none',
                      opacity: isHovered ? 1 : (isPrimaryFocus ? 1 : 0.35),
                      cursor: isPrimaryFocus ? 'pointer' : 'default',
                      fill: isPrimaryFocus ? '#38bdf8' : '#475569',
                    },
                    pressed: {
                      outline: 'none',
                    },
                  }}
                  onMouseEnter={() => {
                    if (isPrimaryFocus) {
                      const countryName = geo.properties.NAME
                      // Normalize country name for matching
                      const normalizedName = countryName === 'United States of America' ? 'United States' : countryName
                      setHoveredRegion(normalizedName)
                    }
                  }}
                  onMouseLeave={() => {
                    setHoveredRegion(null)
                  }}
                />
              )
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  )
}
