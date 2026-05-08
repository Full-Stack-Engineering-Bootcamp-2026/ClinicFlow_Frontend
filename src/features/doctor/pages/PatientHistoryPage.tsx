import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import PatientSummaryCard from "../component/history/PatientSummaryCard";
import VisitHistoryTable from "../component/history/VisitHistoryTable";
import type { PatientHistoryResponse } from "../types/patient-history.types";

const patientHistoryData: PatientHistoryResponse = {
  patient: {
    id: 1,
    fullName: "Marcus Thompson",
    gender: "Male",
    age: 34,
    bloodGroup: "O+",
  },
  visitHistory: [
    {
      appointmentDate: "2026-05-01",
      diagnosis: "Viral Fever",
      doctorName: "Dr. Adrian Miller",
      status: "COMPLETED",
    },
    {
      appointmentDate: "2026-04-10",
      diagnosis: "Hypertension",
      doctorName: "Dr. Adrian Miller",
      status: "COMPLETED",
    },
    {
      appointmentDate: "2026-03-18",
      diagnosis: "Migraine",
      doctorName: "Dr. Sarah Wilson",
      status: "COMPLETED",
    },
  ],
};

const PatientHistoryPage = () => {
  const navigate = useNavigate();

  const handleGoBack = () => {
    navigate(-1);
  };

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <Button variant="outline" size="icon" onClick={handleGoBack}>
              <ArrowLeft className="h-4 w-4" />
            </Button>

            <div>
              <h1 className="text-3xl font-bold tracking-tight">Patient History</h1>
              <p className="text-sm text-muted-foreground">View patient consultation history</p>
            </div>
          </div>
        </div>

        <PatientSummaryCard patient={patientHistoryData.patient} />
        <VisitHistoryTable visits={patientHistoryData.visitHistory} />
      </div>
    </div>
  );
};

export default PatientHistoryPage;