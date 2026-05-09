import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { FileText, X } from "lucide-react";
import type { ConsultationHistoryDetailsResponse } from "../../types/consultation-api.types";

interface PrescriptionDetailsModalProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  details: ConsultationHistoryDetailsResponse | null;
  loading: boolean;
}

const PrescriptionDetailsModal = ({ open, onOpenChange, details, loading }: PrescriptionDetailsModalProps) => {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
<DialogContent className="sm:max-w-[500px] w-[95vw] rounded-2xl p-0 overflow-hidden">      {loading ? (
          <div className="p-8">Loading prescription...</div>
        ) : !details ? (
          <div className="p-8 text-muted-foreground">No prescription details found</div>
        ) : (
          <>
            <DialogHeader className="border-b border-border px-6 py-5">
              <div className="flex items-start justify-between">
                <div className="space-y-1">
                  <DialogTitle className="text-2xl font-bold">Prescription Details</DialogTitle>
                  <p className="text-sm text-muted-foreground">
                    Visit Date: {details.appointmentDate}
                  </p>
                </div>

                <Button variant="ghost" size="icon" onClick={() => onOpenChange(false)}>
                </Button>
              </div>
            </DialogHeader>

            <div className="space-y-6 px-6 py-5">
              <div className="grid gap-4 md:grid-cols-2">
                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    Prescribed By
                  </p>
                  <p className="mt-2 font-medium">{details.doctorName}</p>
                </div>

                <div className="rounded-xl border border-border p-4">
                  <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                    License No.
                  </p>
                  <p className="mt-2 font-medium">MD-772911</p>
                </div>
              </div>

              <div className="space-y-4">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Medications
                </p>

                {details.prescription.medicines.length === 0 ? (
                  <div className="rounded-xl border border-dashed border-border p-6 text-center text-sm text-muted-foreground">
                    No medicines prescribed
                  </div>
                ) : (
                  details.prescription.medicines.map((medicine, index) => (
                    <div key={index} className="rounded-xl border border-border p-4">
                      <div className="flex items-start justify-between gap-4">
                        <div className="space-y-1">
                          <h3 className="font-semibold">{medicine.medicineName}</h3>
                          <p className="text-sm text-muted-foreground">
                            {medicine.dosage} • {medicine.frequency}
                          </p>
                          <p className="text-sm text-muted-foreground">{medicine.instructions}</p>
                        </div>

                        <div className="rounded-md bg-muted px-3 py-1 text-xs font-medium">
                          {medicine.durationDays} Days
                        </div>
                      </div>
                    </div>
                  ))
                )}
              </div>

              <div className="space-y-3">
                <p className="text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                  Doctor's Advice
                </p>
                <div className="rounded-xl border border-orange-200 bg-orange-50 p-5 text-sm leading-7 text-orange-900 dark:border-orange-900/40 dark:bg-orange-950/20 dark:text-orange-200">
                  {details.prescription.generalInstructions || "No instructions available"}
                </div>
              </div>
            </div>

            <div className="flex items-center justify-end gap-3 border-t border-border px-6 py-5">
              <Button variant="outline" onClick={() => onOpenChange(false)}>
                Close
              </Button>

              <Button className="gap-2">
                <FileText className="h-4 w-4" />
                Print PDF
              </Button>
            </div>
          </>
        )}
      </DialogContent>
    </Dialog>
  );
};

export default PrescriptionDetailsModal;