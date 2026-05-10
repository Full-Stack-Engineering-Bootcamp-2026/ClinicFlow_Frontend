import axiosInstance from "@/lib/axios";

import type {
  PatientHistoryResponse,
} from "../types/patient-history.types";

import type {
  ConsultationHistoryDetailsResponse,
} from "../types/consultation-api.types";



export const getPatientHistory =
  async (
    patientId: number
  ): Promise<PatientHistoryResponse> => {

    const response =
      await axiosInstance.get(
        `/patients/${patientId}/history`
      );

    return response.data.data;
};



export const getConsultationHistoryDetails =
  async (
    consultationId: number
  ): Promise<ConsultationHistoryDetailsResponse> => {

    const response =
      await axiosInstance.get(
        `/patients/consultations/${consultationId}`
      );

    return response.data.data;
};