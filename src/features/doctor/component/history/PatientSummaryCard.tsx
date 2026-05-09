import {
  Card,
  CardContent,
} from "@/components/ui/card";

interface PatientSummaryCardProps {

  patient: {
    id: number;

    fullName: string;

    gender: string;

    age: number;

    bloodGroup: string;
  };
}

const PatientSummaryCard = ({
  patient,
}: PatientSummaryCardProps) => {

  return (

    <Card>

      <CardContent className="flex flex-col gap-4 p-6 md:flex-row md:items-center md:justify-between">

        <div className="space-y-1">

          <h2 className="text-2xl font-bold">

            {patient.fullName}

          </h2>

          <p className="text-muted-foreground">

            {patient.age} Years • {patient.gender}

          </p>

        </div>


        <div className="space-y-1 text-sm">

          <p>

            <span className="font-semibold">
              Blood Group:
            </span>

            {" "}
            {patient.bloodGroup}

          </p>

        </div>

      </CardContent>
    </Card>
  );
};

export default PatientSummaryCard;