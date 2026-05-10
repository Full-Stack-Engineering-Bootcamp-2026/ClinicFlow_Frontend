import axiosInstance from "@/lib/axios";

import type { ConsultationPageResponse ,CompleteConsultationRequest} from "../types/consultation-api.types";

export const getConsultationPage =
  async (
    appointmentId: number
  ): Promise<ConsultationPageResponse> => {

    const response =
      await axiosInstance.get(
        `/doctor/queue/consultations/appointment/${appointmentId}`
      );

    return response.data.data;
};


export const completeConsultation =
  async (
    payload: CompleteConsultationRequest
  ) => {

    const response =
      await axiosInstance.post(
        "/doctor/queue/consultations/complete",
        payload
      );

    return response.data.data;
};