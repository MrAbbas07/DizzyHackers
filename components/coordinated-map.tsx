"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { AlertTriangle } from "lucide-react"

export function CoordinatedMap() {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [marker, setMarker] = useState<L.Marker | null>(null)
  const [selectedLocation, setSelectedLocation] = useState<L.LatLng | null>(null)
  const leafletMap = useRef<L.Map | null>(null)

  // Initialize map
  useEffect(() => {
    if (!mapRef.current) return

    // Create map if it doesn't exist
    if (!leafletMap.current) {
      leafletMap.current = L.map(mapRef.current).setView([34.0522, -118.2437], 10)

      // Add OpenStreetMap tiles
      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
        maxZoom: 19,
      }).addTo(leafletMap.current)

      setMap(leafletMap.current)
    }

    // Cleanup on unmount
    return () => {
      if (leafletMap.current) {
        leafletMap.current.remove()
        leafletMap.current = null
      }
    }
  }, [])

  // Add click handler to map
  useEffect(() => {
    if (!map) return

    // Function to place marker
    const placeMarker = (location: L.LatLng) => {
      if (marker) {
        marker.remove()
      }

      // Create custom icon for emergency marker
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: `
          <div style="background-color: #9333ea; width: 24px; height: 24px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 12px; font-weight: bold;">!</span>
          </div>
        `,
        iconSize: [24, 24],
        iconAnchor: [12, 12],
      })

      const newMarker = L.marker(location, { icon }).addTo(map)
      setMarker(newMarker)
      setSelectedLocation(location)

      // Create popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold">Emergency Location</h3>
          <p>Lat: ${location.lat.toFixed(6)}</p>
          <p>Lng: ${location.lng.toFixed(6)}</p>
          <p class="text-sm text-purple-600 mt-1">Click to set as emergency location</p>
        </div>
      `

      // Add popup to marker
      newMarker.bindPopup(popupContent).openPopup()
    }

    // Add click listener to map
    const clickHandler = (e: L.LeafletMouseEvent) => {
      placeMarker(e.latlng)
    }

    map.on("click", clickHandler)

    return () => {
      map.off("click", clickHandler)
    }
  }, [map, marker])

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full z-0" />

      {selectedLocation && (
        <div className="absolute bottom-4 left-4 z-10 bg-white p-3 rounded-md shadow-md max-w-xs">
          <div className="flex items-center gap-2 mb-2">
            <AlertTriangle className="h-5 w-5 text-purple-600" />
            <h3 className="font-medium text-sm">Emergency Location Selected</h3>
          </div>
          <div className="text-xs text-gray-600 mb-3">
            <p>Latitude: {selectedLocation.lat.toFixed(6)}</p>
            <p>Longitude: {selectedLocation.lng.toFixed(6)}</p>
            <p className="mt-1">Nearest address will be determined automatically.</p>
          </div>
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              className="text-xs"
              onClick={() => {
                if (marker) {
                  marker.remove()
                  setMarker(null)
                  setSelectedLocation(null)
                }
              }}
            >
              Clear
            </Button>
            <Button size="sm" className="text-xs bg-purple-600 hover:bg-purple-700">
              Confirm Location
            </Button>
          </div>
        </div>
      )}

      <div className="absolute top-4 left-4 z-10 bg-white p-2 rounded shadow-md">
        <div className="text-xs font-medium mb-1">Click on the map to set emergency location</div>
      </div>
    </div>
  )
}
