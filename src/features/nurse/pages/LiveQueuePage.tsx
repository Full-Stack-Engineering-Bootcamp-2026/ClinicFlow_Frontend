import DoctorQueueCard from "../components/DoctorQueueCard"
import QueueStatCard from "../components/QueueStatCard"

import { Users, Clock3, Stethoscope, TriangleAlert } from "lucide-react"

import { useNavigate } from "react-router-dom"

import { Button } from "@/components/ui/button"

import { Plus } from "lucide-react"

function LiveQueuePage() {
  const navigate = useNavigate()
  const liveQueueData = {
    stats: {
      totalWaitingPatients: 2,
      activeDoctors: 1,
      urgentCases: 0,
      averageWaitTime: 18,
    },

    doctorQueues: [
      {
        doctorId: 1,

        doctorName: "Dr Rishi",

        specialization: "Cardiology",

        queueState: "ACTIVE",

        servingNow: null,

        nextUp: null,

        lastServed: null,

        waitingCount: 5,

        waitingPatients: [
          {
            appointmentId: 1,

            queueNumber: 1,

            patientName: "Rohan Sharma",

            mobile: "9876543210",

            status: "IN_PROGRESS",
          },

          {
            appointmentId: 2,

            queueNumber: 2,

            patientName: "Shrishti Patil",

            mobile: "9876547896",

            status: "WAITING",
          },

          {
            appointmentId: 3,

            queueNumber: 3,

            patientName: "Rahul Verma",

            mobile: "9876541111",

            status: "WAITING",
          },

          {
            appointmentId: 4,

            queueNumber: 4,

            patientName: "Sneha Kulkarni",

            mobile: "9876512345",

            status: "WAITING",
          },

          {
            appointmentId: 5,

            queueNumber: 5,

            patientName: "Aman Gupta",

            mobile: "9876509876",

            status: "WAITING",
          },
        ],
      },

      {
        doctorId: 2,

        doctorName: "Dr Sarah Wilson",

        specialization: "Dermatology",

        queueState: "BREAK",

        servingNow: null,

        nextUp: null,

        lastServed: null,

        waitingCount: 2,

        waitingPatients: [
          {
            appointmentId: 6,

            queueNumber: 11,

            patientName: "Neha Joshi",

            mobile: "9988776655",

            status: "WAITING",
          },

          {
            appointmentId: 7,

            queueNumber: 12,

            patientName: "Karan Mehta",

            mobile: "9988771122",

            status: "WAITING",
          },
        ],
      },

      {
        doctorId: 3,

        doctorName: "Dr Michael Lee",

        specialization: "Neurology",

        queueState: "YET_TO_START",

        servingNow: null,

        nextUp: null,

        lastServed: null,

        waitingCount: 0,

        waitingPatients: [],
      },

      {
        doctorId: 4,

        doctorName: "Dr Emily Carter",

        specialization: "Pediatrics",

        queueState: "ACTIVE",

        servingNow: null,

        nextUp: null,

        lastServed: null,

        waitingCount: 3,

        waitingPatients: [
          {
            appointmentId: 8,

            queueNumber: 21,

            patientName: "Aryan Singh",

            mobile: "9123456789",

            status: "IN_PROGRESS",
          },

          {
            appointmentId: 9,

            queueNumber: 22,

            patientName: "Priya Nair",

            mobile: "9000011111",

            status: "WAITING",
          },

          {
            appointmentId: 10,

            queueNumber: 23,

            patientName: "Tanvi Shah",

            mobile: "9555512345",

            status: "WAITING",
          },
        ],
      },
    ],
  }
  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h1 className="text-2xl font-semibold">Live Queue</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Monitor live patient queues across doctors
          </p>
        </div>

        <Button
          onClick={() => navigate("/nurse/book-appointment")}
          className="cursor-pointer"
        >
          <Plus className="mr-2 h-4 w-4" />
          Book New Appointment
        </Button>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        <QueueStatCard
          title="Total Waiting"
          value={liveQueueData.stats.totalWaitingPatients}
          subtitle="Patients"
          icon={Users}
          iconBgColor="#dbeafe"
          iconColor="#2563eb"
        />

        <QueueStatCard
          title="Avg. Wait Time"
          value={liveQueueData.stats.averageWaitTime}
          subtitle="Mins"
          icon={Clock3}
          iconBgColor="#dcfce7"
          iconColor="#16a34a"
        />

        <QueueStatCard
          title="Active Doctors"
          value={liveQueueData.stats.activeDoctors}
          subtitle="On-duty"
          icon={Stethoscope}
          iconBgColor="#fef3c7"
          iconColor="#d97706"
        />

        <QueueStatCard
          title="Urgent Cases"
          value={liveQueueData.stats.urgentCases}
          subtitle="Pending"
          icon={TriangleAlert}
          iconBgColor="#fee2e2"
          iconColor="#dc2626"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {liveQueueData.doctorQueues.map((queue) => (
          <DoctorQueueCard key={queue.doctorId} queue={queue} />
        ))}
      </div>
    </div>
  )
}

export default LiveQueuePage
