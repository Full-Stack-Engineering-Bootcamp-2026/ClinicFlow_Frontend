import { useEffect, useState } from "react";
import QueueStatsCards from "../component/queue/QueueStatsCards";
import CurrentServingCard from "../component/queue/CurrentServingCard";
import WaitingPatientsTable from "../component/queue/WaitingPatientsTable";
import { getQueueDashboard } from "../services/queue.service";
import type { QueueDashboardResponse } from "../types/queue.types";
import CompletedConsultationsCard
    from "../component/queue/CompletedConsultationsCard";

import PrescriptionDetailsModal from "../component/queue/PrescriptionDetailsModal";

import { getConsultationHistoryDetails, } from "../services/patient-history.service";

import type { ConsultationHistoryDetailsResponse, } from "../types/consultation-api.types";

const QueuePage = () => {
    const [dashboardData, setDashboardData] = useState<QueueDashboardResponse | null>(null);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    const [
        prescriptionOpen,
        setPrescriptionOpen,
    ] = useState(false);

    const [
        prescriptionLoading,
        setPrescriptionLoading,
    ] = useState(false);

    const [
        prescriptionDetails,
        setPrescriptionDetails,
    ] = useState<
        ConsultationHistoryDetailsResponse | null
    >(null);

    const fetchDashboard = async () => {
        try {
            setLoading(true);
            const response = await getQueueDashboard();
            setDashboardData(response);
        } catch (error: any) {
            console.error("Dashboard API Error:", error?.response?.data || error.message);
            setError(error?.response?.data?.message || "Failed to load dashboard");
        } finally {
            setLoading(false);
        }
    };
    const handleViewPrescription =
        async (
            consultationId: number
        ) => {
            try {
                setPrescriptionOpen(true);
                setPrescriptionLoading(true);
                const data =
                    await getConsultationHistoryDetails(
                        consultationId
                    );
                setPrescriptionDetails(data);

            } catch (error: any) {
                console.error("Prescription Error:",error?.response?.data ||error.message);
            } finally {
                setPrescriptionLoading(false);
            }
        };

    useEffect(() => {
        fetchDashboard();
    }, []);

    if (loading) return <div className="p-6">Loading dashboard...</div>;
    if (error || !dashboardData) return <div className="p-6 text-destructive">{error}</div>;

    return (

        <div className="min-h-screen bg-background">
            <PrescriptionDetailsModal
                open={prescriptionOpen}
                onOpenChange={setPrescriptionOpen}
                details={prescriptionDetails}
                loading={prescriptionLoading}
            />
            <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
                <div className="flex flex-col gap-2">
                    <h1 className="text-3xl font-bold tracking-tight">Doctor Queue Dashboard</h1>
                    <p className="text-sm text-muted-foreground">Manage patient queue and consultations</p>
                </div>

                <QueueStatsCards stats={dashboardData.stats} />

                <CurrentServingCard currentPatient={dashboardData.currentPatient} />

                <WaitingPatientsTable patients={dashboardData.waitingPatients} />

                <CompletedConsultationsCard consultations={dashboardData.completedConsultations} onViewPrescription={
                    handleViewPrescription
                }
                />
            </div>
        </div>
    );
};

export default QueuePage;