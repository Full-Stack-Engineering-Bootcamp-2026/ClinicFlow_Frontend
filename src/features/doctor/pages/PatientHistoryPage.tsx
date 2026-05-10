import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import PatientSummaryCard from "../component/history/PatientSummaryCard"
import VisitHistoryTable from "../component/history/VisitHistoryTable"
import VisitDetailsCard from "../component/history/VisitDetailsCard"

import {
  getConsultationHistoryDetails,
  getPatientHistory,
} from "../services/patient-history.service"

import type { ConsultationHistoryDetailsResponse } from "../types/consultation-api.types"

import type { PatientHistoryResponse } from "../types/patient-history.types"

const PatientHistoryPage = () => {
  const { patientId } = useParams()

  const navigate = useNavigate()

  const [historyData, setHistoryData] = useState<PatientHistoryResponse | null>(
    null
  )

  const [selectedDetails, setSelectedDetails] =
    useState<ConsultationHistoryDetailsResponse | null>(null)

  const [loading, setLoading] = useState(true)

  const [detailsLoading, setDetailsLoading] = useState(false)

  const [error, setError] = useState("")

  useEffect(() => {
    const fetchHistory = async () => {
      try {
        setLoading(true)

        const data = await getPatientHistory(Number(patientId))

        setHistoryData(data)

        if (data.visitHistory.length > 0) {
          fetchVisitDetails(data.visitHistory[0].consultationId)
        }
      } catch (error: any) {
        console.error(
          "Patient History Error:",
          error?.response?.data || error.message
        )

        setError(
          error?.response?.data?.message || "Failed to load patient history"
        )
      } finally {
        setLoading(false)
      }
    }

    if (patientId) {
      fetchHistory()
    }
  }, [patientId])

  const fetchVisitDetails = async (consultationId: number) => {
    try {
      setDetailsLoading(true)

      const data = await getConsultationHistoryDetails(consultationId)

      setSelectedDetails(data)
    } catch (error: any) {
      console.error(
        "Visit Details Error:",
        error?.response?.data || error.message
      )
    } finally {
      setDetailsLoading(false)
    }
  }

  if (loading) {
    return <div className="p-6">Loading patient history...</div>
  }

  if (error || !historyData) {
    return <div className="p-6 text-red-500">{error}</div>
  }

  return (
    <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 px-6 pt-3 pb-6">
      <Button
        variant="outline"
        className="w-fit cursor-pointer"
        onClick={() => navigate(-1)}
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back
      </Button>

      <PatientSummaryCard patient={historyData.patient} />

      <VisitHistoryTable
        visits={historyData.visitHistory}
        onViewDetails={fetchVisitDetails}
      />

      <VisitDetailsCard details={selectedDetails} loading={detailsLoading} />
    </div>
  )
}

export default PatientHistoryPage
