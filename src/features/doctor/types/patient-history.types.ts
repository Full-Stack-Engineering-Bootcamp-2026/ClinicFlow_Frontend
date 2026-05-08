export interface PatientSummary {
  id: number;

  fullName: string;

  gender: string;

  age: number;

  bloodGroup: string;
}

export interface VisitHistory {
  appointmentDate: string;

  diagnosis: string;

  doctorName: string;

  status: string;
}

export interface PatientHistoryResponse {
  patient: PatientSummary;

  visitHistory: VisitHistory[];
}