"use client"

import { useState } from "react"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { ArrowLeft, AlertTriangle, MapPin, Clock } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Textarea } from "@/components/ui/textarea"
import { CoordinatedMap } from "@/components/coordinated-map"
import { toast } from "@/components/ui/use-toast"

export default function CreateEmergency() {
  const router = useRouter()
  const [incidentType, setIncidentType] = useState("accident")
  const [priority, setPriority] = useState("high")
  const [services, setServices] = useState({
    police: true,
    ems: true,
    fire: false,
  })
  const [loading, setLoading] = useState(false)

  const handleCreateIncident = async () => {
    setLoading(true)

    try {
      // In a real app, this would be an API call to create the incident
      await new Promise((resolve) => setTimeout(resolve, 1500))

      // If high priority, send SMS notification
      if (priority === "critical" || priority === "high") {
        await sendHighPriorityNotification()
      }

      toast({
        title: "Emergency incident created",
        description: "All selected services have been notified and dispatched.",
      })

      // Redirect to the appropriate dashboard based on services selected
      if (services.police) {
        router.push("/dashboard/police")
      } else if (services.ems) {
        router.push("/dashboard/ems")
      } else if (services.fire) {
        router.push("/dashboard/fire")
      } else {
        router.push("/")
      }
    } catch (error) {
      console.error("Error creating incident:", error)
      toast({
        title: "Error creating incident",
        description: "There was a problem creating the emergency incident.",
        variant: "destructive",
      })
    } finally {
      setLoading(false)
    }
  }

  const sendHighPriorityNotification = async () => {
    try {
      // In a real app, this would call your SMS notification API
      const response = await fetch("/api/notifications/send-sms", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          phoneNumbers: ["+1234567890", "+1987654321"], // High authority phone numbers
          message: `HIGH PRIORITY EMERGENCY: ${incidentType.toUpperCase()} incident reported. Immediate response required.`,
          priority: priority,
        }),
      })

      if (!response.ok) {
        throw new Error("Failed to send SMS notification")
      }

      console.log("High priority notification sent")
    } catch (error) {
      console.error("Error sending notification:", error)
    }
  }

  return (
    <div className="flex min-h-screen flex-col">
      <header className="bg-purple-700 px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Link href="/">
            <Button variant="ghost" size="icon" className="text-white hover:bg-purple-600">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold text-white">Create Emergency Incident</h1>
        </div>
        <div className="flex items-center gap-2">
          <Badge variant="outline" className="text-white border-white">
            Dispatcher: Alex Morgan
          </Badge>
        </div>
      </header>

      <main className="flex-1 p-6 bg-gray-100">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div className="lg:col-span-2 space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Emergency Location</CardTitle>
                <CardDescription>Select the location of the emergency</CardDescription>
              </CardHeader>
              <CardContent className="p-0">
                <div className="h-[400px] w-full bg-gray-200 relative">
                  <CoordinatedMap />
                </div>
              </CardContent>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Emergency Details</CardTitle>
                <CardDescription>Provide information about the emergency</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div>
                      <Label htmlFor="location">Location Description</Label>
                      <Input id="location" placeholder="Highway 101, Mile 45" />
                    </div>

                    <div>
                      <Label>Incident Type</Label>
                      <RadioGroup defaultValue={incidentType} onValueChange={setIncidentType} className="mt-2">
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="accident" id="accident" />
                          <Label htmlFor="accident">Traffic Accident</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="medical" id="medical" />
                          <Label htmlFor="medical">Medical Emergency</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="fire" id="fire" />
                          <Label htmlFor="fire">Fire</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="crime" id="crime" />
                          <Label htmlFor="crime">Criminal Activity</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="disaster" id="disaster" />
                          <Label htmlFor="disaster">Natural Disaster</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <RadioGroupItem value="other" id="other" />
                          <Label htmlFor="other">Other</Label>
                        </div>
                      </RadioGroup>
                    </div>

                    <div>
                      <Label>Priority Level</Label>
                      <Select defaultValue={priority} onValueChange={setPriority}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select priority" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="critical">Critical - Immediate Life Threat</SelectItem>
                          <SelectItem value="high">High - Serious Situation</SelectItem>
                          <SelectItem value="medium">Medium - Requires Attention</SelectItem>
                          <SelectItem value="low">Low - Minor Incident</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div>
                      <Label>Services Required</Label>
                      <div className="mt-2 space-y-2">
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="police"
                            checked={services.police}
                            onCheckedChange={(checked) => setServices({ ...services, police: checked === true })}
                          />
                          <Label htmlFor="police">Police</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="ems"
                            checked={services.ems}
                            onCheckedChange={(checked) => setServices({ ...services, ems: checked === true })}
                          />
                          <Label htmlFor="ems">Emergency Medical Services</Label>
                        </div>
                        <div className="flex items-center space-x-2">
                          <Checkbox
                            id="fire"
                            checked={services.fire}
                            onCheckedChange={(checked) => setServices({ ...services, fire: checked === true })}
                          />
                          <Label htmlFor="fire">Fire Brigade</Label>
                        </div>
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="casualties">Estimated Casualties</Label>
                      <Select defaultValue="unknown">
                        <SelectTrigger id="casualties">
                          <SelectValue placeholder="Select number" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="unknown">Unknown</SelectItem>
                          <SelectItem value="none">None</SelectItem>
                          <SelectItem value="few">1-3 People</SelectItem>
                          <SelectItem value="several">4-10 People</SelectItem>
                          <SelectItem value="many">More than 10 People</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="description">Detailed Description</Label>
                      <Textarea
                        id="description"
                        placeholder="Provide as much detail as possible about the emergency situation"
                        className="h-[120px]"
                      />
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card>
              <CardHeader className="pb-2">
                <CardTitle>Response Summary</CardTitle>
                <CardDescription>Services that will be dispatched</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                {services.police && (
                  <div className="p-3 bg-blue-50 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-blue-600" />
                      <h4 className="font-medium">Police Response</h4>
                    </div>
                    <div className="pl-7 space-y-1 text-sm">
                      <p>Units: 2 Patrol Units, 1 Highway Patrol</p>
                      <p>ETA: ~5 minutes</p>
                    </div>
                  </div>
                )}

                {services.ems && (
                  <div className="p-3 bg-green-50 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-green-600" />
                      <h4 className="font-medium">Medical Response</h4>
                    </div>
                    <div className="pl-7 space-y-1 text-sm">
                      <p>Units: 2 Ambulances, 1 Paramedic Unit</p>
                      <p>ETA: ~7 minutes</p>
                    </div>
                  </div>
                )}

                {services.fire && (
                  <div className="p-3 bg-red-50 rounded-md">
                    <div className="flex items-center gap-2 mb-2">
                      <AlertTriangle className="h-5 w-5 text-red-600" />
                      <h4 className="font-medium">Fire Brigade Response</h4>
                    </div>
                    <div className="pl-7 space-y-1 text-sm">
                      <p>Units: 1 Fire Engine, 1 Tanker</p>
                      <p>ETA: ~8 minutes</p>
                    </div>
                  </div>
                )}

                {!services.police && !services.ems && !services.fire && (
                  <div className="p-4 text-center text-gray-500">No services selected</div>
                )}
              </CardContent>
              <CardFooter>
                <Button
                  className="w-full bg-purple-600 hover:bg-purple-700"
                  disabled={loading || (!services.police && !services.ems && !services.fire)}
                  onClick={handleCreateIncident}
                >
                  {loading ? (
                    <>
                      <div className="animate-spin h-4 w-4 mr-2 border-2 border-white border-t-transparent rounded-full"></div>
                      Creating Incident...
                    </>
                  ) : (
                    "Create Emergency Incident"
                  )}
                </Button>
              </CardFooter>
            </Card>

            <Card>
              <CardHeader className="pb-2">
                <CardTitle>High Priority Notification</CardTitle>
                <CardDescription>SMS alerts for critical incidents</CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center gap-2 p-3 bg-yellow-50 rounded-md">
                  <Clock className="h-5 w-5 text-yellow-600" />
                  <div>
                    <h4 className="font-medium">Automatic Notifications</h4>
                    <p className="text-sm text-gray-600">
                      {priority === "critical" || priority === "high"
                        ? "SMS notifications will be sent to high authority personnel due to high priority level."
                        : "No automatic SMS notifications for medium/low priority incidents."}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 p-3 bg-gray-50 rounded-md">
                  <MapPin className="h-5 w-5 text-gray-600" />
                  <div>
                    <h4 className="font-medium">Location Sharing</h4>
                    <p className="text-sm text-gray-600">GPS coordinates will be shared with all responding units.</p>
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
