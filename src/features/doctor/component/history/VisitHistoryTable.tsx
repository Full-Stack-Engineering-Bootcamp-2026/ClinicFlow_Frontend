import {
  useNavigate,
} from "react-router-dom";

import type {
  VisitHistory,
} from "../../types/patient-history.types";

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

import {
  Button,
} from "@/components/ui/button";

interface VisitHistoryTableProps {

  visits: VisitHistory[];
}



const VisitHistoryTable = ({
  visits,
}: VisitHistoryTableProps) => {

  const navigate = useNavigate();


  return (

    <Card>

      <CardHeader>

        <CardTitle>
          Visit History
        </CardTitle>

      </CardHeader>


      <CardContent className="space-y-4">

        {visits.length === 0 ? (

          <div className="py-8 text-center text-muted-foreground">

            No consultation history found

          </div>

        ) : (

          visits.map((visit) => (

            <div
              key={visit.consultationId}
              className="flex flex-col gap-4 rounded-lg border border-border p-4 md:flex-row md:items-center md:justify-between"
            >

           
              <div className="space-y-1">

                <h3 className="font-semibold">

                  {visit.diagnosis}

                </h3>

                <p className="text-sm text-muted-foreground">

                  {visit.appointmentDate}

                </p>

                <p className="text-sm text-muted-foreground">

                  {visit.doctorName}

                </p>

              </div>


              <div className="flex items-center gap-4">

                <span className="text-sm font-medium">

                  {visit.status}

                </span>

                <Button
                  variant="outline"
                  onClick={() =>
                    navigate(
                      `/doctor/patients/consultations/${visit.consultationId}`
                    )
                  }
                >
                  View Details
                </Button>

              </div>

            </div>
          ))
        )}
      </CardContent>
    </Card>
  );
};

export default VisitHistoryTable;