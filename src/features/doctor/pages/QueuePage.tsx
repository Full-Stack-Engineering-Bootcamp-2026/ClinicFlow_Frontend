import QueueStatsCards
  from "../component/queue/QueueStatsCards";

import CurrentServingCard
  from "../component/queue/CurrentServingCard";

import WaitingPatientsTable
  from "../component/queue/WaitingPatientsTable";

import type {
  QueueDashboardResponse,
} from "../types/queue.types";

const dashboardData:
  QueueDashboardResponse = {

  stats: {
    waiting: 12,
    inProgress: 1,
    completed: 8,
    totalToday: 21,
  },

  currentPatient: {
    appointmentId: 101,
    queueNumber: 14,
    patientName: "Sarah McAlister",
    gender: "Female",
    age: 34,
    reason: "Regular Checkup",
  },

  waitingPatients: [
    {
      appointmentId: 102,
      queueNumber: 15,
      patientName: "Thomas Wright",
      gender: "Male",
      age: 42,
      bookedAt: "09:15 AM",
    },

    {
      appointmentId: 103,
      queueNumber: 16,
      patientName: "Emily Chen",
      gender: "Female",
      age: 28,
      bookedAt: "09:30 AM",
    },

    {
      appointmentId: 104,
      queueNumber: 17,
      patientName: "Robert Williams",
      gender: "Male",
      age: 51,
      bookedAt: "09:40 AM",
    },
  ],
};

const QueuePage = () => {

  return (
    <div className="min-h-screen bg-background">

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">

        {/* PAGE HEADER */}
        <div className="flex flex-col gap-2">

          <h1 className="text-3xl font-bold tracking-tight">
            Doctor Queue Dashboard
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage patient queue and consultations
          </p>

        </div>

        {/* STATS */}
        <QueueStatsCards
          stats={dashboardData.stats}
        />

        {/* CURRENT PATIENT */}
        <CurrentServingCard
          currentPatient={
            dashboardData.currentPatient
          }
        />

        {/* WAITING TABLE */}
        <WaitingPatientsTable
          patients={
            dashboardData.waitingPatients
          }
        />

      </div>
    </div>
  );
};

export default QueuePage;