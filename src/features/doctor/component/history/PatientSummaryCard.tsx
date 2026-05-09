import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Pencil } from "lucide-react";

interface PatientSummaryCardProps {
  patient: {
    id: number;
    fullName: string;
    gender: string;
    age: number;
    bloodGroup: string;
  };
}

const PatientSummaryCard = ({ patient }: PatientSummaryCardProps) => {
  const initials = patient.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="flex flex-col gap-6 p-6 lg:flex-row lg:items-center lg:justify-between">
        <div className="flex items-center gap-5">
          <Avatar className="h-20 w-20 border border-border">
            <AvatarFallback className="text-xl font-semibold">
              {initials}
            </AvatarFallback>
          </Avatar>

          <div className="space-y-2">
            <div>
              <h2 className="text-2xl font-bold tracking-tight">
                {patient.fullName}
              </h2>
              <p className="text-sm text-muted-foreground">
                Patient ID #{patient.id}
              </p>
            </div>

            <div className="flex flex-wrap items-center gap-3 text-sm">
              <div className="rounded-md bg-muted px-3 py-1">
                {patient.age} Years
              </div>
              <div className="rounded-md bg-muted px-3 py-1">
                {patient.gender}
              </div>
              <div className="rounded-md bg-muted px-3 py-1">
                Blood Group: {patient.bloodGroup}
              </div>
            </div>
          </div>
        </div>

        <div>
          <Button variant="outline" className="gap-2">
            <Pencil className="h-4 w-4" />
            Edit Profile
          </Button>
        </div>
      </CardContent>
    </Card>
  );
};

export default PatientSummaryCard;