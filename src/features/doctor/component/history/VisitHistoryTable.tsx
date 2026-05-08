import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import type { VisitHistory } from "../../types/patient-history.types";

interface VisitHistoryTableProps {
  visits: VisitHistory[];
}

const VisitHistoryTable = ({ visits }: VisitHistoryTableProps) => {
  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">Visit History</CardTitle>
      </CardHeader>

      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Visit Date</TableHead>
                <TableHead>Diagnosis</TableHead>
                <TableHead>Doctor</TableHead>
                <TableHead>Status</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {visits.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="h-32 text-center text-muted-foreground">
                    No history found
                  </TableCell>
                </TableRow>
              ) : (
                visits.map((visit, index) => (
                  <TableRow key={index}>
                    <TableCell className="font-medium">{visit.appointmentDate}</TableCell>
                    <TableCell>{visit.diagnosis}</TableCell>
                    <TableCell className="text-muted-foreground">{visit.doctorName}</TableCell>
                    <TableCell>
                      <div className="inline-flex rounded-full bg-primary/10 px-3 py-1 text-xs font-medium text-primary">
                        {visit.status}
                      </div>
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

export default VisitHistoryTable;