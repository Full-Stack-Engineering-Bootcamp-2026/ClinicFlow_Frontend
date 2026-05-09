import { useEffect, useState } from "react";
import QueueStatsCards from "../component/queue/QueueStatsCards";
import CurrentServingCard from "../component/queue/CurrentServingCard";
import WaitingPatientsTable from "../component/queue/WaitingPatientsTable";
import { getQueueDashboard } from "../services/queue.service";
import type { QueueDashboardResponse } from "../types/queue.types";

const QueuePage = () => {
  const [dashboardData, setDashboardData] = useState<QueueDashboardResponse | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

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

  useEffect(() => {
    fetchDashboard();
  }, []);

  if (loading) return <div className="p-6">Loading dashboard...</div>;
  if (error || !dashboardData) return <div className="p-6 text-destructive">{error}</div>;

  return (
    <div className="min-h-screen bg-background">
      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">Doctor Queue Dashboard</h1>
          <p className="text-sm text-muted-foreground">Manage patient queue and consultations</p>
        </div>

        <QueueStatsCards stats={dashboardData.stats} />

        <CurrentServingCard currentPatient={dashboardData.currentPatient} />

        <WaitingPatientsTable patients={dashboardData.waitingPatients} />
      </div>
    </div>
  );
};

export default QueuePage;