import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import type {
  QueueTableProps,
} from "../types"

export default function QueueTable({
  patients,
}: QueueTableProps) {
  return (
    <div className="overflow-hidden rounded-xl border border-border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>
              Queue
            </TableHead>

            <TableHead>
              Patient
            </TableHead>

            <TableHead className="text-right">
              Action
            </TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {patients.length > 0 ? (
            patients.map((patient) => (
              <TableRow
                key={
                  patient.appointmentId
                }
              >
                <TableCell className="font-medium">
                  #
                  {
                    patient.queueNumber
                  }
                </TableCell>

                <TableCell>
                  {
                    patient.patientName
                  }
                </TableCell>

                

                <TableCell className="text-right">
                  <Button
                    variant="ghost"
                    size="sm"
                    className="cursor-pointer"
                  >
                    View Patient
                  </Button>
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell
                colSpan={3}
                className="py-6 text-center text-sm text-muted-foreground"
              >
                No waiting patients
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  )
}