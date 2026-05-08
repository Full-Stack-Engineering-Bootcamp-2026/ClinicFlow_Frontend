import { Card, CardContent } from "@/components/ui/card";
import type { PatientSummary } from "../../types/patient-history.types";

interface PatientSummaryCardProps {
  patient: PatientSummary;
}

const PatientSummaryCard = ({ patient }: PatientSummaryCardProps) => {
  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-6">
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-primary/10 text-2xl font-bold text-primary">
              {patient.fullName.charAt(0)}
            </div>

            <div className="space-y-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{patient.fullName}</h2>
                <p className="text-sm text-muted-foreground">
                  {patient.gender} • {patient.age} years
                </p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Blood Group:</span>
                <span className="text-sm text-muted-foreground">{patient.bloodGroup}</span>
              </div>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSummaryCard;