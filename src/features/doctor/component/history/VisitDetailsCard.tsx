import { Card, CardContent, CardHeader } from "@/components/ui/card"

import type { ConsultationHistoryDetailsResponse } from "../../types/consultation-api.types"

interface VisitDetailsCardProps {
  details: ConsultationHistoryDetailsResponse | null

  loading: boolean
}

const VisitDetailsCard = ({ details, loading }: VisitDetailsCardProps) => {
  if (!details) {
    return (
      <Card className="border border-border shadow-sm">
        <CardContent className="p-8 text-center text-muted-foreground">
          Select a consultation to view details
        </CardContent>
      </Card>
    )
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="border-b border-border pb-4">
        <div className="space-y-1">
          <h2 className="text-lg font-semibold">
            Visit Detail: {details.appointmentDate}
          </h2>

          <p className="text-sm text-muted-foreground">
            Confirmed Diagnosis: {details.consultation.diagnosis}
          </p>
        </div>
      </CardHeader>

      <CardContent className="space-y-5 p-5">
        <div className="grid gap-5 lg:grid-cols-2">
          <div className="space-y-5">
            <div className="space-y-3">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
                Clinical Notes
              </p>

              <div className="rounded-xl border border-border p-4 text-sm leading-6">
                {details.consultation.clinicalNotes ||
                  "No clinical notes available"}
              </div>
            </div>

            <div className="rounded-xl border border-border p-4">
              <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
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
            <p className="text-xs font-semibold tracking-wide text-muted-foreground uppercase">
              Prescribed Medications
            </p>

            {details.prescription.medicines.length === 0 ? (
              <div className="rounded-xl border border-dashed border-border p-5 text-center text-sm text-muted-foreground">
                No medicines prescribed
              </div>
            ) : (
              details.prescription.medicines.map((medicine, index) => (
                <div
                  key={index}
                  className="rounded-xl border border-border p-3.5"
                >
                  <div className="space-y-1.5">
                    <h3 className="font-semibold">{medicine.medicineName}</h3>

                    <p className="text-sm text-muted-foreground">
                      {medicine.dosage} • {medicine.frequency}
                    </p>

                    <p className="text-sm text-muted-foreground">
                      Duration: {medicine.durationDays} Days
                    </p>

                    <p className="text-sm">{medicine.instructions}</p>
                  </div>
                </div>
              ))
            )}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default VisitDetailsCard
