"use client"

import { useState } from "react"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"

interface Incident {
  id: string
  type: string
  location: string
  status: string
  priority: string
  time: string
  responders: string[]
}

interface PoliceIncidentTableProps {
  incidents: Incident[]
  onSelectIncident: (incident: Incident) => void
  selectedIncidentId: string | undefined
}

export function PoliceIncidentTable({ incidents, onSelectIncident, selectedIncidentId }: PoliceIncidentTableProps) {
  const [deployDialogOpen, setDeployDialogOpen] = useState(false)
  const [selectedIncidentForDeploy, setSelectedIncidentForDeploy] = useState<Incident | null>(null)
  const [selectedUnits, setSelectedUnits] = useState<string[]>([])

  // Available units for deployment
  const availableUnits = [
    "Patrol Unit 1",
    "Patrol Unit 2",
    "Patrol Unit 3",
    "Highway Patrol 1",
    "Highway Patrol 2",
    "K-9 Unit 1",
    "SWAT Team",
  ]

  const handleDeployClick = (incident: Incident) => {
    setSelectedIncidentForDeploy(incident)
    setSelectedUnits([])
    setDeployDialogOpen(true)
  }

  const handleDeployUnits = () => {
    // In a real application, this would call an API to deploy the units
    console.log(`Deploying units to incident ${selectedIncidentForDeploy?.id}:`, selectedUnits)

    // Close the dialog
    setDeployDialogOpen(false)

    // Show notification (in a real app, this would be a toast)
    alert(`Units deployed to incident ${selectedIncidentForDeploy?.id}`)
  }

  const toggleUnitSelection = (unit: string) => {
    setSelectedUnits((prev) => (prev.includes(unit) ? prev.filter((u) => u !== unit) : [...prev, unit]))
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>ID</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Priority</TableHead>
            <TableHead>Time</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {incidents.map((incident) => (
            <TableRow
              key={incident.id}
              className={selectedIncidentId === incident.id ? "bg-blue-50" : ""}
              onClick={() => onSelectIncident(incident)}
            >
              <TableCell className="font-medium">{incident.id}</TableCell>
              <TableCell>{incident.type}</TableCell>
              <TableCell>{incident.location}</TableCell>
              <TableCell>
                <Badge
                  className={
                    incident.status === "Responding"
                      ? "bg-green-500"
                      : incident.status === "Pending"
                        ? "bg-yellow-500"
                        : "bg-blue-500"
                  }
                >
                  {incident.status}
                </Badge>
              </TableCell>
              <TableCell>
                <Badge
                  variant="outline"
                  className={
                    incident.priority === "High"
                      ? "border-red-500 text-red-500"
                      : incident.priority === "Medium"
                        ? "border-yellow-500 text-yellow-500"
                        : "border-blue-500 text-blue-500"
                  }
                >
                  {incident.priority}
                </Badge>
              </TableCell>
              <TableCell>{incident.time}</TableCell>
              <TableCell>
                <div className="flex gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      handleDeployClick(incident)
                    }}
                  >
                    Deploy Units
                  </Button>
                  <Button
                    size="sm"
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation()
                      window.open(`/reports/generate?id=${incident.id}`, "_blank")
                    }}
                  >
                    Report
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Dialog open={deployDialogOpen} onOpenChange={setDeployDialogOpen}>
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Deploy Units</DialogTitle>
            <DialogDescription>
              Select units to deploy to incident {selectedIncidentForDeploy?.id} at{" "}
              {selectedIncidentForDeploy?.location}
            </DialogDescription>
          </DialogHeader>

          <div className="grid gap-4 py-4">
            <div className="space-y-2">
              <Label>Incident Priority</Label>
              <Select defaultValue={selectedIncidentForDeploy?.priority.toLowerCase()}>
                <SelectTrigger>
                  <SelectValue placeholder="Select priority" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="high">High</SelectItem>
                  <SelectItem value="medium">Medium</SelectItem>
                  <SelectItem value="low">Low</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label>Available Units</Label>
              <div className="grid grid-cols-2 gap-2 border rounded-md p-3 max-h-[200px] overflow-y-auto">
                {availableUnits.map((unit) => (
                  <div key={unit} className="flex items-center space-x-2">
                    <Checkbox
                      id={unit}
                      checked={selectedUnits.includes(unit)}
                      onCheckedChange={() => toggleUnitSelection(unit)}
                    />
                    <label
                      htmlFor={unit}
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      {unit}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="space-y-2">
              <Label>Estimated Arrival Time</Label>
              <Select defaultValue="5">
                <SelectTrigger>
                  <SelectValue placeholder="Select ETA" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="2">2 minutes</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20+ minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>

          <DialogFooter>
            <Button variant="outline" onClick={() => setDeployDialogOpen(false)}>
              Cancel
            </Button>
            <Button onClick={handleDeployUnits} disabled={selectedUnits.length === 0}>
              Deploy {selectedUnits.length} Units
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  )
}
