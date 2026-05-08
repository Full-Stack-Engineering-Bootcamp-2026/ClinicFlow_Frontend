export interface QueueStats {
  waiting: number;
  inProgress: number;
  completed: number;
  totalToday: number;
}

export interface CurrentPatient {
  appointmentId: number;
  queueNumber: number;
  patientName: string;
  gender: string;
  age: number;
  reason: string;
}

export interface WaitingPatient {
  appointmentId: number;
  queueNumber: number;
  patientName: string;
  gender: string;
  age: number;
  bookedAt: string;
}

export interface QueueDashboardResponse {
  stats: QueueStats;
  currentPatient: CurrentPatient | null;
  waitingPatients: WaitingPatient[];
}

export interface CallNextRequest {
  appointmentId: number;
}

export interface CallNextResponse {
  message: string;
  appointmentId: number;
}