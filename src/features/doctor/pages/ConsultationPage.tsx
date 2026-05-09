import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import PatientHeaderCard from "../component/consultation/PatientHeaderCard";
import ConsultationDetailsCard from "../component/consultation/ConsultationDetailsCard";
import PrescribedMedicinesCard from "../component/consultation/PrescribedMedicinesCard";
import FollowUpCard from "../component/consultation/FollowUpCard";
import SubmitSection from "../component/consultation/SubmitSection";
import { getConsultationPage, completeConsultation } from "../services/consultation.service";
import type { ConsultationFormData, ConsultationPageData } from "../types/consultation.types";
import { useNavigate } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";


const ConsultationPage = () => {
    const { appointmentId } = useParams();
    const [consultationData, setConsultationData] = useState<ConsultationPageData | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitLoading, setSubmitLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

    const [formData, setFormData] = useState<ConsultationFormData>({
        diagnosis: "",
        clinicalNotes: "",
        generalInstructions: "",
        followUpDate: "",
        followUpNotes: "",
        medicines: [],
    });

    const navigate = useNavigate();

    const fetchConsultationPage = async () => {
        try {
            setLoading(true);
            const response = await getConsultationPage(Number(appointmentId));

            setConsultationData({
                appointmentId: response.appointmentId,
                queueNumber: response.queueNumber,
                patient: {
                    id: response.patient.id,
                    name: response.patient.name,
                    age: response.patient.age,
                    gender: response.patient.gender,
                },
            });

            setFormData({
                diagnosis: response.consultation.diagnosis ?? "",
                clinicalNotes: response.consultation.clinicalNotes ?? "",
                generalInstructions: response.prescription.generalInstructions ?? "",
                followUpDate: response.prescription.followUpDate ?? "",
                followUpNotes: response.prescription.followUpNotes ?? "",
                medicines: response.prescription.medicines ?? [],
            });
        } catch (error: any) {
            console.error("Consultation API Error:", error?.response?.data || error.message);
            setError(error?.response?.data?.message || "Failed to load consultation");
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        if (appointmentId) fetchConsultationPage();
    }, [appointmentId]);

    const handleSubmitConsultation = async () => {
        try {
            setSubmitLoading(true);
            await completeConsultation({
                appointmentId: Number(appointmentId),
                diagnosis: formData.diagnosis,
                clinicalNotes: formData.clinicalNotes,
                generalInstructions: formData.generalInstructions,
                followUpDate: formData.followUpDate,
                followUpNotes: formData.followUpNotes,
                medicines: formData.medicines,
            });
            alert(
                "Consultation completed successfully"
            );

            navigate("/doctor/queue");
        } catch (error: any) {
            console.error("Complete Consultation Error:", error?.response?.data || error.message);
            alert(error?.response?.data?.message || "Failed to complete consultation");
        } finally {
            setSubmitLoading(false);
        }
    };

    if (loading) return <div className="p-6">Loading consultation...</div>;
    if (error || !consultationData) return <div className="p-6 text-destructive">{error}</div>;

    return (
        <div className="min-h-screen bg-background">
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Consultation</h1>
                    <p className="text-sm text-muted-foreground">Complete patient consultation</p>
                </div>
                <Button
                    variant="outline"
                    className="w-fit"
                    onClick={() => navigate("/doctor/queue")}
                >
                    <ArrowLeft className="mr-2 h-4 w-4" />

                    Back to Queue
                </Button>

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

                <SubmitSection onSubmit={handleSubmitConsultation} loading={submitLoading} />
            </div>
        </div>
    );
};

export default ConsultationPage;