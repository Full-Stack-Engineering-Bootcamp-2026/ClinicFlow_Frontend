import { useNavigate } from "react-router-dom"

import { Card, CardContent } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import type { ConsultationPageData } from "../../types/consultation.types"

interface PatientHeaderCardProps {
  consultationData: ConsultationPageData
}

const PatientHeaderCard = ({ consultationData }: PatientHeaderCardProps) => {
  const navigate = useNavigate()

  const { patient, queueNumber, appointmentId } = consultationData

  const handlePatientHistory = () => {
    navigate(`/doctor/patients/${patient.id}/history`)
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-5">
        <div className="flex flex-col gap-5 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-20 w-20 flex-col items-center justify-center rounded-2xl border bg-muted">
              <span className="text-xs tracking-wide text-muted-foreground uppercase">
                Queue
              </span>

              <span className="mt-1 text-2xl font-bold text-primary">
                #{queueNumber}
              </span>
            </div>

            <div className="space-y-1.5">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">
                  {patient.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {patient.gender} • {patient.age} years
                </p>
              </div>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Patient ID:</span>

                  <span className="text-sm text-muted-foreground">
                    #{patient.id}
                  </span>
                </div>

                <div className="flex items-center gap-2">
                  <span className="text-sm font-medium">Appointment:</span>

                  <span className="text-sm text-muted-foreground">
                    #{appointmentId}
                  </span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex flex-col items-start gap-2.5 lg:items-end">
            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">
              In Consultation
            </div>

            <Button
              variant="outline"
              className="cursor-pointer"
              onClick={handlePatientHistory}
            >
              Patient History
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PatientHeaderCard
