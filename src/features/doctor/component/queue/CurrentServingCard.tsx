import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";
import type { CurrentPatient } from "../../types/queue.types";

interface CurrentServingCardProps {
  currentPatient: CurrentPatient | null;
}

const CurrentServingCard = ({ currentPatient }: CurrentServingCardProps) => {
  const navigate = useNavigate();

  if (!currentPatient) {
    return (
      <Card>
        <CardContent className="flex h-[220px] items-center justify-center">
          <p className="text-sm text-muted-foreground">No patient is currently being served</p>
        </CardContent>
      </Card>
    );
  }

  const handleStartConsultation = () => {
    navigate(`/doctor/consultation/${currentPatient.appointmentId}`);
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="pb-2">
        <CardTitle className="text-lg font-semibold">Currently Serving</CardTitle>
      </CardHeader>

      <CardContent>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-center lg:justify-between">
          <div className="flex items-center gap-5">
            <div className="flex h-24 w-24 flex-col items-center justify-center rounded-2xl border bg-muted">
              <span className="text-xs uppercase tracking-wide text-muted-foreground">Queue</span>
              <span className="mt-1 text-3xl font-bold text-primary">#{currentPatient.queueNumber}</span>
            </div>

            <div className="space-y-2">
              <div>
                <h2 className="text-2xl font-semibold tracking-tight">{currentPatient.patientName}</h2>
                <p className="text-sm text-muted-foreground">{currentPatient.gender} • {currentPatient.age} years</p>
              </div>

              <div className="flex items-center gap-2">
                <span className="text-sm font-medium">Reason:</span>
                <span className="text-sm text-muted-foreground">{currentPatient.reason}</span>
              </div>
            </div>
          </div>

          <div className="flex flex-col gap-3 sm:flex-row lg:flex-col">
            <Button onClick={handleStartConsultation} className="min-w-[220px]">Start Consultation</Button>
            <Button variant="outline" className="min-w-[220px]">Hold Patient</Button>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default CurrentServingCard;