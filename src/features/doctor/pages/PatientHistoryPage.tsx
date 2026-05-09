import {
  useEffect,
  useState,
} from "react";

import {
  useParams,
} from "react-router-dom";

import PatientSummaryCard
  from "../component/history/PatientSummaryCard";

import VisitHistoryTable
  from "../component/history/VisitHistoryTable";

import VisitDetailsCard
  from "../component/history/VisitDetailsCard";

import {
  getConsultationHistoryDetails,
  getPatientHistory,
} from "../services/patient-history.service";

import type {
  ConsultationHistoryDetailsResponse,
} from "../types/consultation-api.types";

import type {
  PatientHistoryResponse,
} from "../types/patient-history.types";


const PatientHistoryPage = () => {

  const { patientId } = useParams();

  const [
    historyData,
    setHistoryData,
  ] = useState<
    PatientHistoryResponse | null
  >(null);

  const [
    selectedDetails,
    setSelectedDetails,
  ] = useState<
    ConsultationHistoryDetailsResponse | null
  >(null);

  const [
    loading,
    setLoading,
  ] = useState(true);

  const [
    detailsLoading,
    setDetailsLoading,
  ] = useState(false);

  const [
    error,
    setError,
  ] = useState("");

  useEffect(() => {

    const fetchHistory =
      async () => {

        try {

          setLoading(true);

          const data =
            await getPatientHistory(
              Number(patientId)
            );

          setHistoryData(data);

          if (
            data.visitHistory.length > 0
          ) {

            fetchVisitDetails(
              data.visitHistory[0]
                .consultationId
            );
          }

        } catch (error: any) {

          console.error(
            "Patient History Error:",
            error?.response?.data ||
            error.message
          );

          setError(
            error?.response?.data?.message ||
            "Failed to load patient history"
          );

        } finally {

          setLoading(false);
        }
      };

    if (patientId) {
      fetchHistory();
    }

  }, [patientId]);
  const fetchVisitDetails =
    async (
      consultationId: number
    ) => {

      try {

        const data =
          await getConsultationHistoryDetails(
            consultationId
          );

        setSelectedDetails(data);

      } catch (error: any) {

        console.error(
          "Visit Details Error:",
          error?.response?.data ||
          error.message
        );

      } finally {

        setDetailsLoading(false);
      }
    };
  if (loading) {

    return (
      <div className="p-6">
        Loading patient history...
      </div>
    );
  }

  if (error || !historyData) {

    return (
      <div className="p-6 text-red-500">

        {error}

      </div>
    );
  }
  return (

    <div className="min-h-screen bg-background">

      <div className="mx-auto flex w-full max-w-7xl flex-col gap-6 p-6">
        <div className="space-y-1">

          <h1 className="text-3xl font-bold tracking-tight">

            Patient History

          </h1>

          <p className="text-sm text-muted-foreground">

            View patient consultation history

          </p>
        </div>
        <PatientSummaryCard
          patient={historyData.patient}
        />
        <VisitHistoryTable
          visits={
            historyData.visitHistory
          }
          onViewDetails={
            fetchVisitDetails
          }
        />



        {/* VISIT DETAILS */}
        <VisitDetailsCard
          details={selectedDetails}
          loading={detailsLoading}
        />

      </div>
    </div>
  );
};

export default PatientHistoryPage;