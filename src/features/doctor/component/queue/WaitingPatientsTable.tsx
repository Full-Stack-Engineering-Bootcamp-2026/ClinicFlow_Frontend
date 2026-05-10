import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { callNextPatient } from "../../services/queue.service"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Button } from "@/components/ui/button"
import type { WaitingPatient } from "../../types/queue.types"
import { toast } from "sonner"
interface WaitingPatientsTableProps {
  patients: WaitingPatient[]
  onPatientCalled: () => Promise<void>
}

const WaitingPatientsTable = ({
  patients,
  onPatientCalled,
}: WaitingPatientsTableProps) => {
  const handleCallNext = async (appointmentId: number) => {
    try {
      await callNextPatient({
        appointmentId,
      })

      await onPatientCalled()

      toast.success("Patient moved to current consultation")
    } catch (error: any) {
      console.error("Call Next Error:", error?.response?.data || error.message)

      toast.error(
        error?.response?.data?.message || "Failed to call next patient"
      )
    }
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">
          Upcoming Patients
        </CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-30 pl-6">Queue</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Gender / Age</TableHead>
                <TableHead>Booked At</TableHead>
                <TableHead className="pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell
                    colSpan={5}
                    className="h-32 text-center text-muted-foreground"
                  >
                    No waiting patients
                  </TableCell>
                </TableRow>
              ) : (
                patients.map((patient) => (
                  <TableRow key={patient.appointmentId}>
                    <TableCell className="pl-6">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted text-sm font-semibold text-primary">
                        #{patient.queueNumber}
                      </div>
                    </TableCell>

                    <TableCell>
                      <span className="font-medium">{patient.patientName}</span>
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {patient.gender} • {patient.age} yrs
                    </TableCell>

                    <TableCell className="text-muted-foreground">
                      {patient.bookedAt}
                    </TableCell>

                    <TableCell className="pr-6 text-right">
                      <Button
                        onClick={() => handleCallNext(patient.appointmentId)}
                        className="cursor-pointer"
                      >
                        Call Next
                      </Button>
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  )
}

export default WaitingPatientsTable
