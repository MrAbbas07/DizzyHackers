"use client"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Mock data for available resources
const availableResources = {
  patrolUnits: [
    { id: "PU-1", name: "Patrol Unit 1", status: "Available", location: "Highway 101, Mile 30" },
    { id: "PU-2", name: "Patrol Unit 2", status: "On Duty", location: "Highway 5, Mile 45" },
    { id: "PU-3", name: "Patrol Unit 3", status: "Responding", location: "Highway 405, Mile 10" },
  ],
  highwayPatrols: [
    { id: "HP-1", name: "Highway Patrol 1", status: "Available", location: "Highway 101, Mile 50" },
    { id: "HP-2", name: "Highway Patrol 2", status: "On Break", location: "Rest Stop 12" },
  ],
  checkpoints: [
    { id: "CP-1", name: "North Checkpoint", status: "Active", location: "Highway 101, Mile 60" },
    { id: "CP-2", name: "East Checkpoint", status: "Active", location: "Highway 5, Mile 80" },
    { id: "CP-3", name: "South Checkpoint", status: "Active", location: "Highway 405, Mile 30" },
  ],
  specialUnits: [
    { id: "K9-1", name: "K-9 Unit", status: "Available", location: "Central Station" },
    { id: "SWAT-1", name: "SWAT Team", status: "On Standby", location: "Central Station" },
  ],
}

export function PoliceResourcesPanel() {
  return (
    <Accordion type="single" collapsible className="w-full">
      <AccordionItem value="patrol-units">
        <AccordionTrigger className="text-sm font-medium">
          Patrol Units
          <Badge className="ml-2 bg-blue-100 text-blue-800">
            {availableResources.patrolUnits.filter((unit) => unit.status === "Available").length}/
            {availableResources.patrolUnits.length}
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {availableResources.patrolUnits.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                <div>
                  <div className="font-medium text-sm">{unit.name}</div>
                  <div className="text-xs text-gray-500">{unit.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      unit.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : unit.status === "On Duty"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {unit.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <span className="sr-only">Contact</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="highway-patrols">
        <AccordionTrigger className="text-sm font-medium">
          Highway Patrols
          <Badge className="ml-2 bg-blue-100 text-blue-800">
            {availableResources.highwayPatrols.filter((unit) => unit.status === "Available").length}/
            {availableResources.highwayPatrols.length}
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {availableResources.highwayPatrols.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                <div>
                  <div className="font-medium text-sm">{unit.name}</div>
                  <div className="text-xs text-gray-500">{unit.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      unit.status === "Available"
                        ? "bg-green-100 text-green-800"
                        : unit.status === "On Duty"
                          ? "bg-blue-100 text-blue-800"
                          : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {unit.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <span className="sr-only">Contact</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="checkpoints">
        <AccordionTrigger className="text-sm font-medium">
          Checkpoints
          <Badge className="ml-2 bg-blue-100 text-blue-800">
            {availableResources.checkpoints.filter((unit) => unit.status === "Active").length}/
            {availableResources.checkpoints.length}
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {availableResources.checkpoints.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                <div>
                  <div className="font-medium text-sm">{unit.name}</div>
                  <div className="text-xs text-gray-500">{unit.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      unit.status === "Active" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {unit.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <span className="sr-only">Contact</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>

      <AccordionItem value="special-units">
        <AccordionTrigger className="text-sm font-medium">
          Special Units
          <Badge className="ml-2 bg-blue-100 text-blue-800">
            {availableResources.specialUnits.filter((unit) => unit.status === "Available").length}/
            {availableResources.specialUnits.length}
          </Badge>
        </AccordionTrigger>
        <AccordionContent>
          <div className="space-y-2">
            {availableResources.specialUnits.map((unit) => (
              <div key={unit.id} className="flex items-center justify-between p-2 bg-blue-50 rounded-md">
                <div>
                  <div className="font-medium text-sm">{unit.name}</div>
                  <div className="text-xs text-gray-500">{unit.location}</div>
                </div>
                <div className="flex items-center gap-2">
                  <Badge
                    className={
                      unit.status === "Available" ? "bg-green-100 text-green-800" : "bg-yellow-100 text-yellow-800"
                    }
                  >
                    {unit.status}
                  </Badge>
                  <Button size="sm" variant="ghost" className="h-7 w-7 p-0">
                    <span className="sr-only">Contact</span>
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      width="16"
                      height="16"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      className="lucide lucide-phone"
                    >
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path>
                    </svg>
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </AccordionContent>
      </AccordionItem>
    </Accordion>
  )
}
