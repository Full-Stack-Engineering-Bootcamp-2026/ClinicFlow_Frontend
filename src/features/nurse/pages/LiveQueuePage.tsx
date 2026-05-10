import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { useSelector } from "react-redux"
import { Users, Clock3, Stethoscope, TriangleAlert, Plus } from "lucide-react"
import type { RootState } from "@/app/store"
import { Button } from "@/components/ui/button"
import DoctorQueueCard from "../components/DoctorQueueCard"
import QueueStatCard from "../components/QueueStatCard"
import { getLiveQueueApi } from "../services/nurseApi"
import type { LiveQueueResponse } from "../types"

function LiveQueuePage() {
  const navigate = useNavigate()

  const token = useSelector((state: RootState) => state.auth.token)

  const [queueData, setQueueData] = useState<LiveQueueResponse | null>(null)

  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    const fetchLiveQueue = async () => {
      try {
        setIsLoading(true)

        const data = await getLiveQueueApi(token!)

        setQueueData(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsLoading(false)
      }
    }

    if (token) {
      fetchLiveQueue()
    }
  }, [token])

  if (isLoading) {
    return (
      <div className="flex h-100 items-center justify-center">
        <p className="text-sm text-muted-foreground">Loading live queue...</p>
      </div>
    )
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
          value={queueData?.stats.totalWaitingPatients || 0}
          subtitle="Patients"
          icon={Users}
          iconBgColor="#dbeafe"
          iconColor="#2563eb"
        />

        <QueueStatCard
          title="Avg. Wait Time"
          value={queueData?.stats.averageWaitTime || 0}
          subtitle="Mins"
          icon={Clock3}
          iconBgColor="#dcfce7"
          iconColor="#16a34a"
        />

        <QueueStatCard
          title="Active Doctors"
          value={queueData?.stats.activeDoctors || 0}
          subtitle="On-duty"
          icon={Stethoscope}
          iconBgColor="#fef3c7"
          iconColor="#d97706"
        />

        <QueueStatCard
          title="Urgent Cases"
          value={queueData?.stats.urgentCases || 0}
          subtitle="Pending"
          icon={TriangleAlert}
          iconBgColor="#fee2e2"
          iconColor="#dc2626"
        />
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-3">
        {queueData?.doctorQueues.map((queue) => (
          <DoctorQueueCard key={queue.doctorId} queue={queue} />
        ))}
      </div>
    </div>
  )
}

export default LiveQueuePage
