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

// Create custom marker icon with better styling
const createCustomIcon = (color: string = '#0284c7', isHovered: boolean = false) => {
  const size = isHovered ? 16 : 12
  return L.divIcon({
    className: 'custom-marker',
    html: `<div style="
      width: ${size}px;
      height: ${size}px;
      background-color: ${color};
      border: 3px solid #fff;
      border-radius: 50%;
      box-shadow: 0 2px 8px rgba(14, 165, 233, 0.4), 0 0 0 ${isHovered ? '4px' : '0px'} rgba(14, 165, 233, 0.2);
      transition: all 0.3s ease;
      cursor: pointer;
    "></div>`,
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
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
        center={[20, 0]}
        zoom={1.5}
        minZoom={1}
        maxZoom={5}
        style={{ height: '100%', width: '100%', zIndex: 0 }}
        className="light-map"
        scrollWheelZoom={true}
        zoomControl={true}
      >
        {/* Light theme tile layer - CartoDB Positron (FREE, no API key needed, lighter and cleaner) */}
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>'
          url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
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
                  radius={3000000}
                  pathOptions={{
                    fillColor: '#0ea5e9',
                    fillOpacity: 0.12,
                    color: '#0ea5e9',
                    weight: 2.5,
                    opacity: 0.5,
                    dashArray: '10, 5',
                  }}
                />
              )}
              
              <Marker
                position={[lat, lon]}
                icon={createCustomIcon(isHovered ? '#0ea5e9' : '#0284c7', isHovered)}
                eventHandlers={{
                  mouseover: () => setHoveredRegion(region.name),
                  mouseout: () => setHoveredRegion(null),
                }}
              >
                <Popup closeButton={false} autoClose={false} closeOnClick={false}>
                  <div className="text-primary-50">
                    <h3 className="font-bold mb-1 text-sm text-accent-400">{region.name}</h3>
                    <p className="text-xs text-primary-300">{region.description}</p>
                  </div>
                </Popup>
              </Marker>
            </div>
          )
        })}
      </MapContainer>
      
      <style jsx global>{`
        .light-map .leaflet-container {
          background-color: #1e293b !important;
          border-radius: 4px;
        }
        .light-map .leaflet-tile-container img {
          filter: brightness(0.85) contrast(1.05) saturate(0.9);
          opacity: 0.95;
        }
        .light-map .leaflet-control-zoom {
          border: 1px solid rgba(14, 165, 233, 0.3) !important;
          background-color: rgba(15, 23, 42, 0.9) !important;
          backdrop-filter: blur(10px);
        }
        .light-map .leaflet-control-zoom a {
          background-color: rgba(15, 23, 42, 0.8) !important;
          color: #94a3b8 !important;
          border-bottom: 1px solid rgba(14, 165, 233, 0.2) !important;
        }
        .light-map .leaflet-control-zoom a:hover {
          background-color: rgba(14, 165, 233, 0.2) !important;
          color: #0ea5e9 !important;
        }
        .light-map .leaflet-control-attribution {
          background-color: rgba(15, 23, 42, 0.8) !important;
          color: #64748b !important;
          font-size: 10px !important;
          padding: 4px 8px !important;
          border-top: 1px solid rgba(14, 165, 233, 0.2) !important;
        }
        .custom-marker {
          background: transparent !important;
          border: none !important;
        }
        .leaflet-popup-content-wrapper {
          background-color: rgba(15, 23, 42, 0.95) !important;
          color: #e2e8f0 !important;
          border-radius: 6px;
          border: 1px solid rgba(14, 165, 233, 0.3) !important;
          box-shadow: 0 4px 12px rgba(0, 0, 0, 0.3) !important;
        }
        .leaflet-popup-tip {
          background-color: rgba(15, 23, 42, 0.95) !important;
          border: 1px solid rgba(14, 165, 233, 0.3) !important;
        }
        .leaflet-popup-content {
          margin: 12px 16px !important;
        }
      `}</style>
    </>
  )
}
