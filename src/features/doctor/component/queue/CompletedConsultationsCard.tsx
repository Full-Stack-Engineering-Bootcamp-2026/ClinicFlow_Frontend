import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import type { CompletedConsultation } from "../../types/queue.types"

interface CompletedConsultationsCardProps {
  consultations: CompletedConsultation[]
  onViewPrescription: (consultationId: number) => void
}

const CompletedConsultationsCard = ({
  consultations,
  onViewPrescription,
}: CompletedConsultationsCardProps) => {
  return (
    <Card className="border border-border">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Completed Consultations
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {consultations.length === 0 ? (
          <div className="py-8 text-center text-sm text-muted-foreground">
            No completed consultations today
          </div>
        ) : (
          consultations.map((consultation) => (
            <div
              key={consultation.consultationId}
              className="flex flex-col gap-4 rounded-lg border border-border p-4 sm:flex-row sm:items-center sm:justify-between"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-semibold">
                    #{consultation.queueNumber}
                  </span>

                  <span className="font-medium">
                    {consultation.patientName}
                  </span>
                </div>

                <p className="text-sm text-muted-foreground">
                  {consultation.diagnosis}
                </p>

                <p className="text-xs text-muted-foreground">
                  Completed at {consultation.completedAt}
                </p>
              </div>

              <Button
                variant="outline"
                className="cursor-pointer"
                onClick={() => onViewPrescription(consultation.consultationId)}
              >
                View Prescription
              </Button>
            </div>
          ))
        )}
      </CardContent>
    </Card>
  )
}

export default CompletedConsultationsCard
