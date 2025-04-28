"use client"

import { useEffect, useRef, useState } from "react"
import L from "leaflet"
import "leaflet/dist/leaflet.css"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"

interface Incident {
  id: string
  coordinates: [number, number]
  priority: string
  type: string
  location: string
  status: string
}

interface IncidentMapProps {
  incidents: Incident[]
  selectedIncident: Incident | null
  onSelectIncident?: (incident: Incident) => void
}

export function IncidentMap({ incidents, selectedIncident, onSelectIncident }: IncidentMapProps) {
  const mapRef = useRef<HTMLDivElement>(null)
  const [map, setMap] = useState<L.Map | null>(null)
  const [markers, setMarkers] = useState<L.Marker[]>([])
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

  // Add markers for incidents
  useEffect(() => {
    if (!map) return

    // Clear existing markers
    markers.forEach((marker) => marker.remove())
    const newMarkers: L.Marker[] = []

    // Add incident markers
    incidents.forEach((incident) => {
      const [lat, lng] = incident.coordinates

      // Determine marker color based on priority
      const markerColor =
        incident.priority === "Critical"
          ? "#ef4444"
          : incident.priority === "High"
            ? "#f97316"
            : incident.priority === "Medium"
              ? "#eab308"
              : "#3b82f6"

      // Create custom icon
      const icon = L.divIcon({
        className: "custom-div-icon",
        html: `
          <div style="background-color: ${markerColor}; width: 20px; height: 20px; border-radius: 50%; border: 2px solid white; display: flex; align-items: center; justify-content: center;">
            <span style="color: white; font-size: 12px; font-weight: bold;"></span>
          </div>
        `,
        iconSize: [20, 20],
        iconAnchor: [10, 10],
      })

      const marker = L.marker([lat, lng], { icon }).addTo(map)

      // Create popup content
      const popupContent = `
        <div class="p-2">
          <h3 class="font-bold">${incident.type}</h3>
          <p>${incident.location}</p>
          <p>Priority: ${incident.priority}</p>
          <p>Status: ${incident.status}</p>
        </div>
      `

      // Add popup to marker
      marker.bindPopup(popupContent)

      // Add click listener
      marker.on("click", () => {
        if (onSelectIncident) {
          onSelectIncident(incident)
        }
      })

      // If this is the selected incident, open its popup
      if (selectedIncident?.id === incident.id) {
        marker.openPopup()
      }

      newMarkers.push(marker)
    })

    setMarkers(newMarkers)

    // Center map on selected incident
    if (selectedIncident) {
      const [lat, lng] = selectedIncident.coordinates
      map.setView([lat, lng], 14)
    }
  }, [map, incidents, selectedIncident, onSelectIncident])

  return (
    <div className="relative h-full w-full">
      <div ref={mapRef} className="h-full w-full z-0" />

      <div className="absolute bottom-4 right-4 z-10 flex flex-col gap-2">
        <Button
          size="sm"
          variant="secondary"
          className="bg-white shadow-md"
          onClick={() => map?.setZoom((map?.getZoom() || 10) + 1)}
        >
          Zoom In
        </Button>
        <Button
          size="sm"
          variant="secondary"
          className="bg-white shadow-md"
          onClick={() => map?.setZoom((map?.getZoom() || 10) - 1)}
        >
          Zoom Out
        </Button>
      </div>

      <div className="absolute top-4 right-4 z-10 bg-white p-2 rounded shadow-md">
        <div className="text-xs font-medium mb-1">Incident Priority</div>
        <div className="flex flex-col gap-1">
          <div className="flex items-center gap-1">
            <Badge className="bg-red-500 h-3 w-3 p-0"></Badge>
            <span className="text-xs">Critical</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge className="bg-orange-500 h-3 w-3 p-0"></Badge>
            <span className="text-xs">High</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge className="bg-yellow-500 h-3 w-3 p-0"></Badge>
            <span className="text-xs">Medium</span>
          </div>
          <div className="flex items-center gap-1">
            <Badge className="bg-blue-500 h-3 w-3 p-0"></Badge>
            <span className="text-xs">Low</span>
          </div>
        </div>
      </div>
    </div>
  )
}
