import { toast } from "sonner"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type { VisitHistory } from "../../types/patient-history.types"

interface VisitHistoryTableProps {
  visits: VisitHistory[]

  onViewDetails: (consultationId: number) => void
}

const VisitHistoryTable = ({
  visits,
  onViewDetails,
}: VisitHistoryTableProps) => {
  const handleViewDetails = (visit: VisitHistory) => {
    if (visit.status === "IN_PROGRESS") {
      toast.info("Consultation is still in progress")

      return
    }

    onViewDetails(visit.consultationId)
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle>Complete Visit History</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        {visits.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No visit history found
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="pl-6">Date</TableHead>
                  <TableHead>Diagnosis</TableHead>
                  <TableHead>Clinician</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="pr-6 text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {visits.map((visit) => (
                  <TableRow key={visit.consultationId}>
                    <TableCell className="pl-6">
                      {visit.appointmentDate}
                    </TableCell>

                    <TableCell className="font-medium">
                      {visit.diagnosis}
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {visit.doctorName}
                    </TableCell>

                    <TableCell>
                      <div
                        className={`w-fit rounded-md px-2.5 py-1 text-xs font-medium ${
                          visit.status === "COMPLETED"
                            ? "bg-primary/10 text-primary"
                            : "bg-muted text-muted-foreground"
                        }`}
                      >
                        {visit.status}
                      </div>
                    </TableCell>

                    <TableCell className="pr-6 text-right">
                      <Button
                        variant="ghost"
                        className="cursor-pointer text-primary hover:text-primary"
                        onClick={() => handleViewDetails(visit)}
                      >
                        View Details
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default VisitHistoryTable
