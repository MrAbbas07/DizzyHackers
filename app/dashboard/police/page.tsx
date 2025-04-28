"use client"

import { useState } from "react"
import Link from "next/link"
import { AlertTriangle, ArrowLeft, CheckCircle, Clock, MapPin, Shield } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { IncidentMap } from "@/components/incident-map"
import { PoliceIncidentTable } from "@/components/police-incident-table"
import { PoliceResourcesPanel } from "@/components/police-resources-panel"

// Mock data
const activeIncidents = [
  {
    id: "INC-1234",
    type: "Accident",
    location: "Highway 101, Mile 45",
    status: "Responding",
    priority: "High",
    time: "10:23 AM",
    coordinates: [34.052235, -118.243683],
    responders: ["Patrol Unit 7", "Highway Patrol 3"],
    description: "Multi-vehicle collision with possible injuries. Traffic blocked in both directions.",
  },
  {
    id: "INC-1235",
    type: "Criminal Activity",
    location: "Highway 5, Mile 78",
    status: "Pending",
    priority: "Medium",
    time: "10:45 AM",
    coordinates: [34.0522, -118.2436],
    responders: ["Patrol Unit 12"],
    description: "Reported suspicious activity near highway checkpoint.",
  },
  {
    id: "INC-1236",
    type: "Traffic Violation",
    location: "Highway 405, Mile 23",
    status: "In Progress",
    priority: "Low",
    time: "11:05 AM",
    coordinates: [34.0522, -118.2437],
    responders: ["Highway Patrol 5"],
    description: "Speeding vehicles reported in construction zone.",
  },
]

export default function PoliceDashboard() {
  const [selectedIncident, setSelectedIncident] = useState(activeIncidents[0])

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-blue-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-blue-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Police Emergency Response Dashboard</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white border-white">
            Officer: John Smith
          </Badge>
          <Badge variant="outline" className="text-white border-white">
            Unit: Highway Patrol 7
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Active Incidents Map</CardTitle>
                <CardDescription>Real-time location of all active incidents</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] w-full bg-gray-200 relative">
                  <IncidentMap incidents={activeIncidents} selectedIncident={selectedIncident} />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Incident Management</CardTitle>
                <CardDescription>Track and respond to active incidents</CardDescription>
              </CardHeader>
              <CardContent>
                <Tabs defaultValue="active">
                  <TabsList className="mb-4">
                    <TabsTrigger value="active">Active Incidents</TabsTrigger>
                    <TabsTrigger value="pending">Pending</TabsTrigger>
                    <TabsTrigger value="resolved">Resolved</TabsTrigger>
                  </TabsList>
                  <TabsContent value="active">
                    <PoliceIncidentTable
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
                  <CardTitle>Incident Details</CardTitle>
                  <Badge
                    className={
                      selectedIncident.priority === "High"
                        ? "bg-red-500"
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
                    <MapPin className="h-4 w-4 text-blue-500" />
                    <span className="text-sm font-medium">Location: {selectedIncident.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Shield className="h-4 w-4 text-green-500" />
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
                      <Badge key={i} variant="outline" className="bg-blue-50">
                        {unit}
                      </Badge>
                    ))}
                  </div>
                </div>
              </CardContent>
              <CardFooter className="flex gap-2">
                <Button className="flex-1 bg-blue-600 hover:bg-blue-700">Update Status</Button>
                <Button className="flex-1" variant="outline">
                  Request Backup
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Available Resources</CardTitle>
                <CardDescription>Nearby units and checkpoints</CardDescription>
              </CardHeader>
              <CardContent>
                <PoliceResourcesPanel />
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Supervision Chain</CardTitle>
                <CardDescription>Hierarchical reporting structure</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-2">
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Station Chief: Capt. Williams</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Sector Supervisor: Lt. Johnson</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
                  </div>
                  <div className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                    <div className="flex items-center gap-2">
                      <CheckCircle className="h-4 w-4 text-green-500" />
                      <span className="text-sm font-medium">Patrol Sergeant: Sgt. Davis</span>
                    </div>
                    <Button variant="ghost" size="sm">
                      Contact
                    </Button>
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
