import axiosInstance from "@/lib/axios";

import type {
  QueueDashboardResponse,
  CallNextRequest,
  CallNextResponse,
} from "../types/queue.types";


export const getQueueDashboard =
  async (): Promise<QueueDashboardResponse> => {

    const response =
      await axiosInstance.get(
        "/doctor/queue/dashboard"
      );

    return response.data.data;
};


export const callNextPatient =
  async (
    payload: CallNextRequest
  ): Promise<CallNextResponse> => {

    const response =
      await axiosInstance.post(
        "/doctor/queue/call-next",
        payload
      );

    return response.data.data;
};