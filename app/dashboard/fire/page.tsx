"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Clock, Flame, MapPin, Truck } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentMap } from "@/components/incident-map"
import { FireIncidentTable } from "@/components/fire-incident-table"

// Mock data
const activeIncidents = [
  {
    id: "FIRE-1234",
    type: "Vehicle Fire",
    location: "Highway 101, Mile 45",
    status: "En Route",
    priority: "High",
    time: "10:23 AM",
    coordinates: [34.052235, -118.243683],
    responders: ["Engine 7", "Tanker 3"],
    description: "Truck on fire on the highway shoulder. Possible hazardous materials.",
    estimatedArrival: "5 minutes",
    hazardLevel: "Medium",
    resourcesNeeded: ["Water", "Foam"],
  },
  {
    id: "FIRE-1235",
    type: "Brush Fire",
    location: "Highway 5, Mile 78",
    status: "On Scene",
    priority: "Critical",
    time: "10:45 AM",
    coordinates: [34.0522, -118.2436],
    responders: ["Engine 12", "Brush Unit 5", "Helicopter 2"],
    description: "Brush fire near highway with rapid spread. Wind direction toward highway.",
    estimatedArrival: "On site",
    hazardLevel: "High",
    resourcesNeeded: ["Water", "Fire Retardant", "Bulldozers"],
  },
  {
    id: "FIRE-1236",
    type: "Structure Fire",
    location: "Highway 405, Rest Stop",
    status: "Pending",
    priority: "Medium",
    time: "11:05 AM",
    coordinates: [34.0522, -118.2437],
    responders: ["Engine 5", "Ladder 3"],
    description: "Small fire at highway rest stop building. Evacuation in progress.",
    estimatedArrival: "8 minutes",
    hazardLevel: "Low",
    resourcesNeeded: ["Water"],
  },
]

const waterSources = [
  { name: "Hydrant Network A", distance: "0.8 miles", pressure: "High", status: "Available" },
  { name: "Reservoir B", distance: "2.3 miles", pressure: "Medium", status: "Available" },
  { name: "Lake Access Point C", distance: "5.1 miles", pressure: "Low", status: "Available" },
]

export default function FireDashboard() {
  const [selectedIncident, setSelectedIncident] = useState(activeIncidents[0])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-red-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-red-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Fire Brigade Response Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white border-white">
            Officer: Michael Chen
          </Badge>
          <Badge variant="outline" className="text-white border-white">
            Unit: Engine 7
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Fire Incidents Map</CardTitle>
                <CardDescription>Real-time location of all active fire incidents</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] w-full bg-gray-200 relative">
                  <IncidentMap incidents={activeIncidents} selectedIncident={selectedIncident} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Fire Incident Management</CardTitle>
                <CardDescription>Track and respond to active fire emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Active Incidents</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active">
                    <FireIncidentTable
                      incidents={activeIncidents}
                      onSelectIncident={setSelectedIncident}
                      selectedIncidentId={selectedIncident?.id}
                    />
                  </TabsContent>
                  <TabsContent value="pending">
                    <div className="p-4 text-center text-gray-500">No pending incidents</div>
                  </TabsContent>
                  <TabsContent value="resolved">
                    <div className="p-4 text-center text-gray-500">No resolved incidents in the last 24 hours</div>
                  </TabsContent>
                </Tabs>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <div className="flex justify-between items-center">
                  <CardTitle>Fire Incident Details</CardTitle>
                  <Badge
                    className={
                      selectedIncident.priority === "Critical"
                        ? "bg-red-500"
                        : selectedIncident.priority === "High"
                          ? "bg-orange-500"
                          : "bg-yellow-500"
                    }
                  >
                    {selectedIncident.priority} Priority
                  </Badge>
                </div>
                <CardDescription>ID: {selectedIncident.id}</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 gap-4">
                  <div className="flex items-center gap-2">
                    <Flame className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Type: {selectedIncident.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Time: {selectedIncident.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Location: {selectedIncident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Truck className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Status: {selectedIncident.status}</span>
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Description:</h4>
                  <p className="text-sm text-gray-600">{selectedIncident.description}</p>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Assigned Units:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIncident.responders.map((unit, i) => (
                      <Badge key={i} variant="outline" className="bg-red-50">
                        {unit}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Resources Needed:</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedIncident.resourcesNeeded.map((resource, i) => (
                      <Badge key={i} variant="secondary">
                        {resource}
                      </Badge>
                    ))}
                  </div>
                </div>

                <div>
                  <div className="flex justify-between mb-1">
                    <h4 className="text-sm font-medium">ETA:</h4>
                    <span className="text-sm text-gray-600">{selectedIncident.estimatedArrival}</span>
                  </div>
                  <Progress
                    value={
                      selectedIncident.estimatedArrival === "On site"
                        ? 100
                        : selectedIncident.estimatedArrival === "5 minutes"
                          ? 60
                          : 30
                    }
                    className="h-2"
                  />
                </div>

                <div>
                  <h4 className="text-sm font-medium mb-1">Hazard Level:</h4>
                  <div className="flex items-center gap-2">
                    <AlertTriangle
                      className={
                        selectedIncident.hazardLevel === "High"
                          ? "text-red-500"
                          : selectedIncident.hazardLevel === "Medium"
                            ? "text-orange-500"
                            : "text-yellow-500"
                      }
                    />
                    <span className="text-sm">{selectedIncident.hazardLevel}</span>
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-red-600 hover:bg-red-700">Update Status</Button>
                <Button className="flex-1" variant="outline">
                  Request Additional Units
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Water Sources</CardTitle>
                <CardDescription>Nearby water access points</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {waterSources.map((source, i) => (
                    <div key={i} className="p-3 bg-red-50 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{source.name}</h4>
                        <Badge variant="outline" className="bg-white">
                          {source.distance}
                        </Badge>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-sm">Pressure: {source.pressure}</span>
                        <Badge variant="secondary" className="bg-green-100">
                          {source.status}
                        </Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Fire Resources</CardTitle>
                <CardDescription>Available units and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-red-50 rounded-md">
                    <span className="text-sm font-medium">Fire Engines</span>
                    <Badge>5 Available</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-red-50 rounded-md">
                    <span className="text-sm font-medium">Tankers</span>
                    <Badge>3 Available</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-red-50 rounded-md">
                    <span className="text-sm font-medium">Ladder Trucks</span>
                    <Badge>2 Available</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-red-50 rounded-md">
                    <span className="text-sm font-medium">Helicopters</span>
                    <Badge>1 Available</Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </main>
    </div>
  )
}
