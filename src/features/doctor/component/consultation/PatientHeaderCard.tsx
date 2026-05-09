import {
  useNavigate,
} from "react-router-dom";

import {
  Card,
  CardContent,
} from "@/components/ui/card";

import { Button } from "@/components/ui/button";

import type {
  ConsultationPageData,
} from "../../types/consultation.types";

interface PatientHeaderCardProps {
  consultationData: ConsultationPageData;
}

const PatientHeaderCard = ({
  consultationData,
}: PatientHeaderCardProps) => {

  const navigate = useNavigate();

  const {
    patient,
    queueNumber,
    appointmentId,
  } = consultationData;

  // NAVIGATE TO HISTORY
  const handlePatientHistory = () => {

    navigate(
      `/doctor/patients/${patient.id}/history`
    );
  };

  return (
    <Card className="border border-border shadow-sm">

      <CardContent className="p-6">

        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">

          {/* LEFT SECTION */}
          <div className="flex items-center gap-5">

            {/* QUEUE BOX */}
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border bg-muted">

              <span className="text-xs uppercase tracking-wide text-muted-foreground">
                Queue
              </span>

              <span className="mt-1 text-3xl font-bold text-primary">
                #{queueNumber}
              </span>

            </div>

            {/* PATIENT INFO */}
            <div className="space-y-2">

              <div>

                <h2 className="text-2xl font-semibold tracking-tight">
                  {patient.name}
                </h2>

                <p className="text-sm text-muted-foreground">
                  {patient.gender} •{" "}
                  {patient.age} years
                </p>

              </div>

              <div className="flex flex-wrap items-center gap-4">

                <div className="flex items-center gap-2">

                  <span className="text-sm font-medium">
                    Patient ID:
                  </span>

                  <span className="text-sm text-muted-foreground">
                    #{patient.id}
                  </span>

                </div>

                <div className="flex items-center gap-2">

                  <span className="text-sm font-medium">
                    Appointment:
                  </span>

                  <span className="text-sm text-muted-foreground">
                    #{appointmentId}
                  </span>

                </div>

              </div>
            </div>
          </div>

          {/* RIGHT SECTION */}
          <div className="flex flex-col items-start gap-3 lg:items-end">

            {/* STATUS */}
            <div className="rounded-full bg-primary/10 px-4 py-2 text-sm font-medium text-primary">

              In Consultation

            </div>

            {/* HISTORY BUTTON */}
            <Button
              variant="outline"
              onClick={handlePatientHistory}
            >
              Patient History
            </Button>

          </div>

        </div>
      </CardContent>
    </Card>
  );
};

export default PatientHeaderCard;