import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import type { ConsultationHistoryDetailsResponse } from "../../types/consultation-api.types";

interface ConsultationDetailsViewerProps {
  details: ConsultationHistoryDetailsResponse | null;
  loading: boolean;
}

const ConsultationDetailsViewer = ({ details, loading }: ConsultationDetailsViewerProps) => {
  if (loading) {
    return (
      <Card className="border border-border">
        <CardContent className="p-6">
          Loading consultation details...
        </CardContent>
      </Card>
    );
  }

  if (!details) {
    return (
      <Card className="border border-border">
        <CardContent className="p-10 text-center text-muted-foreground">
          Select a consultation to view details
        </CardContent>
      </Card>
    );
  }

  return (
    <div className="space-y-6">
      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Consultation Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          <div className="space-y-2">
            <p className="text-sm font-medium">Diagnosis</p>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              {details.consultation.diagnosis || "No diagnosis available"}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Clinical Notes</p>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              {details.consultation.clinicalNotes || "No clinical notes available"}
            </div>
          </div>
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Prescribed Medicines</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          {details.prescription.medicines.length === 0 ? (
            <div className="rounded-lg border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
              No medicines prescribed
            </div>
          ) : (
            details.prescription.medicines.map((medicine, index) => (
              <div key={index} className="rounded-xl border border-border p-4">
                <div className="flex flex-col gap-2 md:flex-row md:items-center md:justify-between">
                  <div>
                    <h3 className="font-semibold">{medicine.medicineName}</h3>
                    <p className="text-sm text-muted-foreground">{medicine.medicineCategory}</p>
                  </div>
                  <div className="rounded-md bg-muted px-3 py-1 text-sm">
                    {medicine.durationDays} Days
                  </div>
                </div>

                <div className="mt-4 grid gap-3 text-sm md:grid-cols-3">
                  <div>
                    <p className="text-muted-foreground">Dosage</p>
                    <p className="font-medium">{medicine.dosage}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Frequency</p>
                    <p className="font-medium">{medicine.frequency}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Unit</p>
                    <p className="font-medium">{medicine.medicineUnit}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-muted-foreground text-sm">Instructions</p>
                  <p className="text-sm font-medium">{medicine.instructions}</p>
                </div>
              </div>
            ))
          )}
        </CardContent>
      </Card>

      <Card className="border border-border">
        <CardHeader>
          <CardTitle>Follow Up Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-5">
          <div className="space-y-2">
            <p className="text-sm font-medium">General Instructions</p>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              {details.prescription.generalInstructions || "No instructions available"}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Follow Up Date</p>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              {details.prescription.followUpDate || "No follow up date"}
            </div>
          </div>

          <div className="space-y-2">
            <p className="text-sm font-medium">Follow Up Notes</p>
            <div className="rounded-lg border border-border bg-muted/30 p-4 text-sm">
              {details.prescription.followUpNotes || "No follow up notes"}
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default ConsultationDetailsViewer;