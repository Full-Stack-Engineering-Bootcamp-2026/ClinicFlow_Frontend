export interface PatientHistoryResponse {

  patient: {
    id: number;

    fullName: string;

    gender: string;

    age: number;

    bloodGroup: string;
  };
  
  visitHistory: {
    consultationId: number;

    appointmentDate: string;

    diagnosis: string;

    doctorName: string;

    status: string;
  }[];
}