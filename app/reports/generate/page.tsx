"use client"

import { useEffect, useState } from "react"
import { useSearchParams } from "next/navigation"
import Link from "next/link"
import { jsPDF } from "jspdf"
import { ArrowLeft, Download, FileText, Printer } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Separator } from "@/components/ui/separator"

// Mock incident data - in a real app, this would be fetched from an API
const mockIncidents = {
  "INC-1234": {
    id: "INC-1234",
    type: "Accident",
    location: "Highway 101, Mile 45",
    status: "Resolved",
    priority: "High",
    time: "10:23 AM",
    date: "2023-04-28",
    coordinates: [34.052235, -118.243683],
    responders: ["Patrol Unit 7", "Highway Patrol 3"],
    description: "Multi-vehicle collision with possible injuries. Traffic blocked in both directions.",
    actions: [
      { time: "10:25 AM", action: "Units dispatched to scene", by: "Dispatcher: Alex Morgan" },
      { time: "10:32 AM", action: "Units arrived on scene", by: "Officer: John Smith" },
      { time: "10:45 AM", action: "Traffic diverted to alternate routes", by: "Highway Patrol 3" },
      { time: "11:20 AM", action: "Scene cleared, traffic resumed", by: "Officer: John Smith" },
    ],
    casualties: "2 minor injuries",
    vehiclesInvolved: "3 vehicles",
    weatherConditions: "Clear",
    roadConditions: "Dry",
  },
  "MED-1234": {
    id: "MED-1234",
    type: "Traffic Accident",
    location: "Highway 101, Mile 45",
    status: "Resolved",
    priority: "Critical",
    time: "10:23 AM",
    date: "2023-04-28",
    coordinates: [34.052235, -118.243683],
    responders: ["Ambulance 7", "Paramedic Unit 3"],
    description: "Multi-vehicle collision with 3 injured. One critical condition reported.",
    actions: [
      { time: "10:25 AM", action: "Medical units dispatched to scene", by: "Dispatcher: Alex Morgan" },
      { time: "10:35 AM", action: "Medical units arrived on scene", by: "Paramedic: Sarah Johnson" },
      { time: "10:40 AM", action: "Triage initiated", by: "Paramedic: Sarah Johnson" },
      { time: "10:55 AM", action: "Critical patient transported to Central Hospital", by: "Ambulance 7" },
      { time: "11:10 AM", action: "Remaining patients treated on scene", by: "Paramedic Unit 3" },
    ],
    casualties: "3 injured (1 critical, 2 minor)",
    treatmentProvided: "IV fluids, wound dressing, spinal immobilization",
    hospitalDestination: "Central Hospital",
    patientStatus: "Stable during transport",
  },
  "FIRE-1234": {
    id: "FIRE-1234",
    type: "Vehicle Fire",
    location: "Highway 101, Mile 45",
    status: "Resolved",
    priority: "High",
    time: "10:23 AM",
    date: "2023-04-28",
    coordinates: [34.052235, -118.243683],
    responders: ["Engine 7", "Tanker 3"],
    description: "Truck on fire on the highway shoulder. Possible hazardous materials.",
    actions: [
      { time: "10:25 AM", action: "Fire units dispatched to scene", by: "Dispatcher: Alex Morgan" },
      { time: "10:38 AM", action: "Fire units arrived on scene", by: "Officer: Michael Chen" },
      { time: "10:40 AM", action: "Fire suppression initiated", by: "Engine 7" },
      { time: "10:55 AM", action: "Fire contained", by: "Engine 7" },
      { time: "11:15 AM", action: "Fire extinguished, scene cleared", by: "Officer: Michael Chen" },
    ],
    fireType: "Class B - Flammable liquid",
    resourcesUsed: "Water, foam",
    hazardousMaterials: "Diesel fuel",
    damageAssessment: "Vehicle total loss, no structural damage to highway",
  },
}

export default function GenerateReport() {
  const searchParams = useSearchParams()
  const incidentId = searchParams.get("id") || "INC-1234"
  const [incident, setIncident] = useState<any>(null)
  const [additionalNotes, setAdditionalNotes] = useState("")
  const [reportingOfficer, setReportingOfficer] = useState("")
  const [badgeNumber, setBadgeNumber] = useState("")

  useEffect(() => {
    // In a real app, this would fetch the incident data from an API
    setIncident(mockIncidents[incidentId] || mockIncidents["INC-1234"])
  }, [incidentId])

  const generatePDF = () => {
    if (!incident) return

    const doc = new jsPDF()

    doc.setFontSize(20)
    doc.text("Emergency Incident Report", 105, 15, { align: "center" })

   
    doc.setFontSize(12)
    doc.text(`Incident ID: ${incident.id}`, 20, 30)
    doc.text(`Type: ${incident.type}`, 20, 40)
    doc.text(`Location: ${incident.location}`, 20, 50)
    doc.text(`Date/Time: ${incident.date} ${incident.time}`, 20, 60)
    doc.text(`Priority: ${incident.priority}`, 20, 70)
    doc.text(`Status: ${incident.status}`, 20, 80)

     
    doc.setFontSize(14)
    doc.text("Description", 20, 95)
    doc.setFontSize(12)

     
    const splitDescription = doc.splitTextToSize(incident.description, 170)
    doc.text(splitDescription, 20, 105)

    let yPos = 105 + splitDescription.length * 7

    doc.setFontSize(14)
    doc.text("Responding Units", 20, yPos)
    doc.setFontSize(12)
    yPos += 10

    incident.responders.forEach((responder: string) => {
      doc.text(`• ${responder}`, 20, yPos)
      yPos += 7
    })

   yPos += 5
    doc.setFontSize(14)
    doc.text("Actions Taken", 20, yPos)
    doc.setFontSize(12)
    yPos += 10

    incident.actions.forEach((action: any) => {
      doc.text(`${action.time} - ${action.action} (${action.by})`, 20, yPos)
      yPos += 7
    })

    yPos += 5
    doc.setFontSize(14)
    doc.text("Additional Information", 20, yPos)
    doc.setFontSize(12)
    yPos += 10

    if (incident.id.startsWith("MED")) {
      doc.text(`Casualties: ${incident.casualties}`, 20, yPos)
      yPos += 7
      doc.text(`Treatment Provided: ${incident.treatmentProvided}`, 20, yPos)
      yPos += 7
      doc.text(`Hospital Destination: ${incident.hospitalDestination}`, 20, yPos)
      yPos += 7
      doc.text(`Patient Status: ${incident.patientStatus}`, 20, yPos)
      yPos += 7
    } else if (incident.id.startsWith("FIRE")) {
      doc.text(`Fire Type: ${incident.fireType}`, 20, yPos)
      yPos += 7
      doc.text(`Resources Used: ${incident.resourcesUsed}`, 20, yPos)
      yPos += 7
      doc.text(`Hazardous Materials: ${incident.hazardousMaterials}`, 20, yPos)
      yPos += 7
      doc.text(`Damage Assessment: ${incident.damageAssessment}`, 20, yPos)
      yPos += 7
    } else {
      doc.text(`Casualties: ${incident.casualties || "None"}`, 20, yPos)
      yPos += 7
      doc.text(`Vehicles Involved: ${incident.vehiclesInvolved || "N/A"}`, 20, yPos)
      yPos += 7
      doc.text(`Weather Conditions: ${incident.weatherConditions || "N/A"}`, 20, yPos)
      yPos += 7
      doc.text(`Road Conditions: ${incident.roadConditions || "N/A"}`, 20, yPos)
      yPos += 7
    }

    if (additionalNotes) {
      yPos += 5
      doc.setFontSize(14)
      doc.text("Additional Notes", 20, yPos)
      doc.setFontSize(12)
      yPos += 10

      const splitNotes = doc.splitTextToSize(additionalNotes, 170)
      doc.text(splitNotes, 20, yPos)
      yPos += splitNotes.length * 7
    }

    yPos += 10
    doc.text(`Reporting Officer: ${reportingOfficer || "Not specified"}`, 20, yPos)
    yPos += 7
    doc.text(`Badge Number: ${badgeNumber || "Not specified"}`, 20, yPos)
    yPos += 7
    doc.text(`Report Generated: ${new Date().toLocaleString()}`, 20, yPos)

    // Save the PDF
    doc.save(`incident-report-${incident.id}.pdf`)
  }

  if (!incident) {
    return <div className="flex items-center justify-center h-screen">Loading...</div>
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white px-6 py-3 flex items-center justify-between shadow-sm">
        <div className="flex items-center gap-2">
          <Link
            href={
              incident.id.startsWith("MED")
                ? "/dashboard/ems"
                : incident.id.startsWith("FIRE")
                  ? "/dashboard/fire"
                  : "/dashboard/police"
            }
          >
            <Button variant="ghost" size="icon">
              <ArrowLeft className="h-5 w-5" />
            </Button>
          </Link>
          <h1 className="text-xl font-bold">Incident Report Generator</h1>
        </div>
        <div className="flex items-center gap-2">
          <Button variant="outline" onClick={() => window.print()}>
            <Printer className="h-4 w-4 mr-2" />
            Print
          </Button>
          <Button onClick={generatePDF}>
            <Download className="h-4 w-4 mr-2" />
            Download PDF
          </Button>
        </div>
      </header>

      <main className="p-6">
        <div className="max-w-4xl mx-auto">
          <Card className="mb-6">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Incident Report: {incident.id}
              </CardTitle>
              <CardDescription>
                Generated on {new Date().toLocaleDateString()} at {new Date().toLocaleTimeString()}
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <h3 className="text-sm font-medium mb-1">Incident Type</h3>
                  <p>{incident.type}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Priority</h3>
                  <p>{incident.priority}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Location</h3>
                  <p>{incident.location}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Date/Time</h3>
                  <p>
                    {incident.date} {incident.time}
                  </p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Status</h3>
                  <p>{incident.status}</p>
                </div>
                <div>
                  <h3 className="text-sm font-medium mb-1">Coordinates</h3>
                  <p>
                    {incident.coordinates[0]}, {incident.coordinates[1]}
                  </p>
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-1">Description</h3>
                <p className="text-sm">{incident.description}</p>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Responding Units</h3>
                <ul className="list-disc pl-5 text-sm">
                  {incident.responders.map((responder: string, index: number) => (
                    <li key={index}>{responder}</li>
                  ))}
                </ul>
              </div>

              <div>
                <h3 className="text-sm font-medium mb-1">Actions Taken</h3>
                <div className="space-y-2 text-sm">
                  {incident.actions.map((action: any, index: number) => (
                    <div key={index} className="border-l-2 border-gray-200 pl-3">
                      <p className="font-medium">{action.time}</p>
                      <p>{action.action}</p>
                      <p className="text-gray-500 text-xs">{action.by}</p>
                    </div>
                  ))}
                </div>
              </div>

              <Separator />

              <div>
                <h3 className="text-sm font-medium mb-1">Additional Information</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  {incident.id.startsWith("MED") ? (
                    <>
                      <div>
                        <p className="font-medium">Casualties</p>
                        <p>{incident.casualties}</p>
                      </div>
                      <div>
                        <p className="font-medium">Treatment Provided</p>
                        <p>{incident.treatmentProvided}</p>
                      </div>
                      <div>
                        <p className="font-medium">Hospital Destination</p>
                        <p>{incident.hospitalDestination}</p>
                      </div>
                      <div>
                        <p className="font-medium">Patient Status</p>
                        <p>{incident.patientStatus}</p>
                      </div>
                    </>
                  ) : incident.id.startsWith("FIRE") ? (
                    <>
                      <div>
                        <p className="font-medium">Fire Type</p>
                        <p>{incident.fireType}</p>
                      </div>
                      <div>
                        <p className="font-medium">Resources Used</p>
                        <p>{incident.resourcesUsed}</p>
                      </div>
                      <div>
                        <p className="font-medium">Hazardous Materials</p>
                        <p>{incident.hazardousMaterials}</p>
                      </div>
                      <div>
                        <p className="font-medium">Damage Assessment</p>
                        <p>{incident.damageAssessment}</p>
                      </div>
                    </>
                  ) : (
                    <>
                      <div>
                        <p className="font-medium">Casualties</p>
                        <p>{incident.casualties || "None"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Vehicles Involved</p>
                        <p>{incident.vehiclesInvolved || "N/A"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Weather Conditions</p>
                        <p>{incident.weatherConditions || "N/A"}</p>
                      </div>
                      <div>
                        <p className="font-medium">Road Conditions</p>
                        <p>{incident.roadConditions || "N/A"}</p>
                      </div>
                    </>
                  )}
                </div>
              </div>

              <Separator />

              <div className="space-y-4">
                <div>
                  <Label htmlFor="notes">Additional Notes</Label>
                  <Textarea
                    id="notes"
                    placeholder="Enter any additional information about the incident"
                    value={additionalNotes}
                    onChange={(e) => setAdditionalNotes(e.target.value)}
                    className="h-24"
                  />
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="officer">Reporting Officer</Label>
                    <Input
                      id="officer"
                      placeholder="Enter name"
                      value={reportingOfficer}
                      onChange={(e) => setReportingOfficer(e.target.value)}
                    />
                  </div>
                  <div>
                    <Label htmlFor="badge">Badge Number</Label>
                    <Input
                      id="badge"
                      placeholder="Enter badge number"
                      value={badgeNumber}
                      onChange={(e) => setBadgeNumber(e.target.value)}
                    />
                  </div>
                </div>
              </div>
            </CardContent>
            <CardFooter>
              <Button onClick={generatePDF} className="w-full">
                <Download className="h-4 w-4 mr-2" />
                Generate PDF Report
              </Button>
            </CardFooter>
          </Card>
        </div>
      </main>
    </div>
  )
}
