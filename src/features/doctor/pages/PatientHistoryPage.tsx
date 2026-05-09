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

import {
  getPatientHistory,
} from "../services/patient-history.service";

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
    loading,
    setLoading,
  ] = useState(true);

  const [
    error,
    setError,
  ] = useState("");


  useEffect(() => {

    const fetchPatientHistory =
      async () => {

        try {

          setLoading(true);

          const data =
            await getPatientHistory(
              Number(patientId)
            );

          setHistoryData(data);

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
      fetchPatientHistory();
    }

  }, [patientId]);

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

          <h1 className="text-3xl font-bold">

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
          visits={historyData.visitHistory}
        />

      </div>
    </div>
  );
};

export default PatientHistoryPage;