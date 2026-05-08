import { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { callNextPatient } from "../../services/queue.service";
import type { WaitingPatient } from "../../types/queue.types";

interface WaitingPatientsTableProps {
  patients: WaitingPatient[];
  onRefresh: () => void;
}

const WaitingPatientsTable = ({ patients, onRefresh }: WaitingPatientsTableProps) => {
  const [loadingId, setLoadingId] = useState<number | null>(null);

  const handleCallNext = async (appointmentId: number) => {
    try {
      setLoadingId(appointmentId);
      await callNextPatient({ appointmentId });
      await onRefresh();
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingId(null);
    }
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-3">
        <CardTitle className="text-lg font-semibold">Upcoming Patients</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead className="w-[120px] pl-6">Queue</TableHead>
                <TableHead>Patient Name</TableHead>
                <TableHead>Gender / Age</TableHead>
                <TableHead>Booked At</TableHead>
                <TableHead className="pr-6 text-right">Action</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {patients.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={5} className="h-32 text-center text-muted-foreground">
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
                        size="sm"
                        disabled={loadingId === patient.appointmentId}
                        onClick={() => handleCallNext(patient.appointmentId)}
                      >
                        {loadingId === patient.appointmentId ? "Loading..." : "Call Next"}
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
  );
};

export default WaitingPatientsTable;