"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, Clock, Heart, MapPin, Stethoscope } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Progress } from "@/components/ui/progress"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentMap } from "@/components/incident-map"
import { EMSIncidentTable } from "@/components/ems-incident-table"

// Mock data
const activeIncidents = [
  {
    id: "MED-1234",
    type: "Traffic Accident",
    location: "Highway 101, Mile 45",
    status: "En Route",
    priority: "Critical",
    time: "10:23 AM",
    coordinates: [34.052235, -118.243683],
    responders: ["Ambulance 7", "Paramedic Unit 3"],
    description: "Multi-vehicle collision with 3 injured. One critical condition reported.",
    estimatedArrival: "2 minutes",
  },
  {
    id: "MED-1235",
    type: "Medical Emergency",
    location: "Highway 5, Rest Stop 12",
    status: "Pending",
    priority: "High",
    time: "10:45 AM",
    coordinates: [34.0522, -118.2436],
    responders: ["Ambulance 12"],
    description: "Possible heart attack at highway rest stop.",
    estimatedArrival: "7 minutes",
  },
  {
    id: "MED-1236",
    type: "Minor Injuries",
    location: "Highway 405, Mile 23",
    status: "On Scene",
    priority: "Medium",
    time: "11:05 AM",
    coordinates: [34.0522, -118.2437],
    responders: ["Paramedic Unit 5"],
    description: "Minor injuries from fender bender. Two patients with non-life-threatening injuries.",
    estimatedArrival: "On site",
  },
]

const hospitalStatus = [
  { name: "Central Hospital", distance: "5.2 miles", beds: 12, specialties: ["Trauma", "Cardiac"] },
  { name: "Mercy Medical Center", distance: "8.7 miles", beds: 5, specialties: ["Pediatric", "Burn Unit"] },
  { name: "St. John's Hospital", distance: "12.3 miles", beds: 20, specialties: ["General", "Orthopedic"] },
]

export default function EMSDashboard() {
  const [selectedIncident, setSelectedIncident] = useState(activeIncidents[0])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-green-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-green-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">EMS Emergency Response Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white border-white">
            Paramedic: Sarah Johnson
          </Badge>
          <Badge variant="outline" className="text-white border-white">
            Unit: Ambulance 7
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medical Emergencies Map</CardTitle>
                <CardDescription>Real-time location of all active medical incidents</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] w-full bg-gray-200 relative">
                  <IncidentMap incidents={activeIncidents} selectedIncident={selectedIncident} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medical Incident Management</CardTitle>
                <CardDescription>Track and respond to active medical emergencies</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Active Incidents</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active">
                    <EMSIncidentTable
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
                  <CardTitle>Medical Incident Details</CardTitle>
                  <Badge
                    className={
                      selectedIncident.priority === "Critical"
                        ? "bg-red-500"
                        : selectedIncident.priority === "High"
                          ? "bg-orange-500"
                          : selectedIncident.priority === "Medium"
                            ? "bg-yellow-500"
                            : "bg-blue-500"
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
                    <AlertTriangle className="h-4 w-4 text-red-500" />
                    <span className="text-sm font-medium">Type: {selectedIncident.type}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-gray-500" />
                    <span className="text-sm font-medium">Time: {selectedIncident.time}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-green-500" />
                    <span className="text-sm font-medium">Location: {selectedIncident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Stethoscope className="h-4 w-4 text-green-500" />
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
                      <Badge key={i} variant="outline" className="bg-green-50">
                        {unit}
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
                        : selectedIncident.estimatedArrival === "2 minutes"
                          ? 80
                          : 40
                    }
                    className="h-2"
                  />
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-green-600 hover:bg-green-700">Update Status</Button>
                <Button className="flex-1" variant="outline">
                  Request Additional Units
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Hospital Status</CardTitle>
                <CardDescription>Nearby medical facilities</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {hospitalStatus.map((hospital, i) => (
                    <div key={i} className="p-3 bg-green-50 rounded-md">
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="font-medium">{hospital.name}</h4>
                        <Badge variant="outline" className="bg-white">
                          {hospital.distance}
                        </Badge>
                      </div>
                      <div className="flex items-center gap-2 mb-2">
                        <Heart className="h-4 w-4 text-red-500" />
                        <span className="text-sm">Available beds: {hospital.beds}</span>
                      </div>
                      <div className="flex flex-wrap gap-1">
                        {hospital.specialties.map((specialty, j) => (
                          <Badge key={j} variant="secondary" className="bg-white">
                            {specialty}
                          </Badge>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button variant="outline" className="w-full">
                  View All Hospitals
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Medical Resources</CardTitle>
                <CardDescription>Available units and equipment</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex justify-between p-2 bg-green-50 rounded-md">
                    <span className="text-sm font-medium">Ambulances</span>
                    <Badge>7 Available</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-green-50 rounded-md">
                    <span className="text-sm font-medium">Paramedic Units</span>
                    <Badge>4 Available</Badge>
                  </div>
                  <div className="flex justify-between p-2 bg-green-50 rounded-md">
                    <span className="text-sm font-medium">Medical Helicopters</span>
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
