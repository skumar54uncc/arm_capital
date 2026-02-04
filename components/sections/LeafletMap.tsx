'use client'

import { useEffect, useState } from 'react'
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet'
import L from 'leaflet'
import 'leaflet/dist/leaflet.css'

// Fix for default marker icon in Next.js
if (typeof window !== 'undefined') {
  delete (L.Icon.Default.prototype as any)._getIconUrl
  L.Icon.Default.mergeOptions({
    iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon-2x.png',
    iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-icon.png',
    shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png',
  })
}

// Create custom marker icon
const createCustomIcon = (color: string = '#0284c7') => {
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: 12px;
      height: 12px;
      background-color: ${color};
      border: 2px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 4px rgba(0,0,0,0.3);
    "></div>`,
    iconSize: [12, 12],
    iconAnchor: [6, 6],
  })
}

interface Region {
  name: string
  coordinates: [number, number]
  description: string
}

interface LeafletMapProps {
  regions: Region[]
  hoveredRegion: string | null
  setHoveredRegion: (region: string | null) => void
}

export default function LeafletMap({ regions, hoveredRegion, setHoveredRegion }: LeafletMapProps) {
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  if (!isClient) {
    return (
      <div className="w-full h-full flex items-center justify-center bg-primary-900/50">
        <div className="text-primary-400 text-sm">Loading map...</div>
      </div>
    )
  }

  return (
    <>
      <MapContainer
        center={[30, 20]}
        zoom={2}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className="dark-map"
        scrollWheelZoom={false}
      >
        {/* Dark theme tile layer - CartoDB Dark Matter (FREE, no API key needed) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
          subdomains="abcd"
        />
        
        {/* Region markers */}
        {regions.map((region) => {
          const [lon, lat] = region.coordinates
          const isHovered = hoveredRegion === region.name
          
          return (
            <div key={region.name}>
              {/* Highlight circle on hover */}
              {isHovered && (
                <Circle
                  center={[lat, lon]}
                  radius={2000000}
                  pathOptions={{
                    fillColor: '#0ea5e9',
                    fillOpacity: 0.15,
                    color: '#0ea5e9',
                    weight: 2,
                    opacity: 0.4,
                  }}
                />
              )}
              
              <Marker
                position={[lat, lon]}
                icon={createCustomIcon(isHovered ? '#0ea5e9' : '#0284c7')}
                eventHandlers={{
                  mouseover: () => setHoveredRegion(region.name),
                  mouseout: () => setHoveredRegion(null),
                }}
              >
                <Popup>
                  <div className="text-primary-950">
                    <h3 className="font-bold mb-1 text-sm">{region.name}</h3>
                    <p className="text-xs">{region.description}</p>
                  </div>
                </Popup>
              </Marker>
            </div>
          )
        })}
      </MapContainer>
      
      <style jsx global>{`
        .dark-map .leaflet-container {
          background-color: #0a1c2d !important;
        }
        .dark-map .leaflet-tile-container img {
          filter: brightness(0.8) contrast(1.1);
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background-color: #fff !important;
          color: #1e293b !important;
          border-radius: 4px;
        }
        .leaflet-popup-tip {
          background-color: #fff !important;
        }
      `}</style>
    </>
  )
}
