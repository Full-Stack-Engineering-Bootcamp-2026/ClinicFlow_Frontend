import axiosInstance from "@/lib/axios";

import type {
  PatientHistoryResponse,
} from "../types/patient-history-api.types";


export const getPatientHistory =
  async (
    patientId: number
  ): Promise<PatientHistoryResponse> => {

    const response =
      await axiosInstance.get(
        `/doctor/patients/${patientId}/history`
      );

    return response.data.data;
};