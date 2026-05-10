import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { VisitHistory } from "../../types/patient-history.types";

interface VisitHistoryTableProps {
  visits: VisitHistory[];
  onViewDetails: (consultationId: number) => void;
}

const VisitHistoryTable = ({ visits, onViewDetails }: VisitHistoryTableProps) => {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle>Complete Visit History</CardTitle>
      </CardHeader>

      <CardContent className="overflow-x-auto">
        {visits.length === 0 ? (
          <div className="py-10 text-center text-sm text-muted-foreground">
            No visit history found
          </div>
        ) : (
          <table className="w-full border-collapse">
            <thead>
              <tr className="border-b border-border text-left">
                <th className="pb-4 text-sm font-medium text-muted-foreground">Date</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Diagnosis</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Clinician</th>
                <th className="pb-4 text-sm font-medium text-muted-foreground">Status</th>
                <th className="pb-4 text-right text-sm font-medium text-muted-foreground">Action</th>
              </tr>
            </thead>

            <tbody>
              {visits.map((visit) => (
                <tr key={visit.consultationId} className="border-b border-border last:border-none">
                  <td className="py-5 text-sm">
                    {visit.appointmentDate}
                  </td>

                  <td className="py-5 text-sm font-medium">
                    {visit.diagnosis}
                  </td>

                  <td className="py-5 text-sm text-muted-foreground">
                    {visit.doctorName}
                  </td>

                  <td className="py-5">
                    <div className="w-fit rounded-md bg-green-100 px-2 py-1 text-xs font-medium text-green-700 dark:bg-green-900/20 dark:text-green-400">
                      {visit.status}
                    </div>
                  </td>

                  <td className="py-5 text-right">
                    <Button
                      variant="ghost"
                      className="text-primary hover:text-primary"
                      onClick={() => onViewDetails(visit.consultationId)}
                    >
                      View Detail
                    </Button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </CardContent>
    </Card>
  );
};

export default VisitHistoryTable;