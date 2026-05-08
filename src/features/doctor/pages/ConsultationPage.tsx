import { useState } from "react";
import { useParams } from "react-router-dom";
import PatientHeaderCard from "../component/consultation/PatientHeaderCard";
import ConsultationDetailsCard from "../component/consultation/ConsultationDetailsCard";
import PrescribedMedicinesCard from "../component/consultation/PrescribedMedicinesCard";
import FollowUpCard from "../component/consultation/FollowUpCard";
import SubmitSection from "../component/consultation/SubmitSection";
import type { ConsultationFormData, ConsultationPageData } from "../types/consultation.types";

const ConsultationPage = () => {
  const { appointmentId } = useParams();

  const consultationData: ConsultationPageData = {
    appointmentId: Number(appointmentId),
    queueNumber: 14,
    patient: {
      id: 1,
      name: "Sarah McAlister",
      age: 34,
      gender: "Female",
    },
  };

  const [formData, setFormData] = useState<ConsultationFormData>({
    diagnosis: "",
    clinicalNotes: "",
    generalInstructions: "",
    followUpDate: "",
    followUpNotes: "",
    medicines: [],
  });

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Consultation</h1>
          <p className="text-sm text-muted-foreground">Complete patient consultation</p>
        </div>

        <PatientHeaderCard consultationData={consultationData} />

        <div className="grid gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ConsultationDetailsCard formData={formData} setFormData={setFormData} />
            <PrescribedMedicinesCard formData={formData} setFormData={setFormData} />
          </div>

          <div>
            <FollowUpCard formData={formData} setFormData={setFormData} />
          </div>
        </div>

        <SubmitSection />
      </div>
    </div>
  );
};

export default ConsultationPage;