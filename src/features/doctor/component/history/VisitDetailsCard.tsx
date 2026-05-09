import { Card, CardContent, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import type { ConsultationHistoryDetailsResponse } from "../../types/consultation-api.types";

interface VisitDetailsCardProps {
  details: ConsultationHistoryDetailsResponse | null;
  loading: boolean;
}

const VisitDetailsCard = ({ details, loading }: VisitDetailsCardProps) => {
  if (!details) {
    return (
      <Card>
        <CardContent className="p-10 text-center text-muted-foreground">
          Select a consultation to view details
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="border border-border">
      <CardHeader className="flex flex-row items-start justify-between gap-4 border-b border-border pb-5">
        <div className="space-y-1">
          <h2 className="text-xl font-semibold">
            Visit Detail: {details.appointmentDate}
          </h2>
          <p className="text-sm text-muted-foreground">
            Confirmed Diagnosis: {details.consultation.diagnosis}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-6 p-6">
        <div className="grid gap-6 lg:grid-cols-2">
          <div className="space-y-6">
            <div className="space-y-3">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Clinical Notes
              </p>
              <div className="rounded-xl border border-border bg-muted/20 p-5 text-sm leading-7">
                {details.consultation.clinicalNotes || "No clinical notes available"}
              </div>
            </div>

            <div className="rounded-xl border border-border bg-muted/20 p-5">
              <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                Next Review
              </p>
              <p className="mt-2 text-sm font-medium">
                {details.prescription.followUpDate || "No follow up date"}
              </p>
              <p className="mt-2 text-sm text-muted-foreground">
                {details.prescription.followUpNotes || "No follow up notes"}
              </p>
            </div>
          </div>

          <div className="space-y-4">
            <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
              Prescribed Medications
            </p>

            {details.prescription.medicines.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                No medicines prescribed
              </div>
            ) : (
              details.prescription.medicines.map((medicine, index) => (
                <div key={index} className="rounded-xl border border-border p-4">
                  <div className="space-y-2">
                    <h3 className="font-semibold">{medicine.medicineName}</h3>
                    <p className="text-sm text-muted-foreground">
                      {medicine.dosage} • {medicine.frequency}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      Duration: {medicine.durationDays} Days
                    </p>
                    <p className="text-sm">
                      {medicine.instructions}
                    </p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default VisitDetailsCard;