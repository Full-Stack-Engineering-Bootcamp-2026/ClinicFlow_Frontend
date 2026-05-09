import type {
  Medicine,
} from "./consultation.types";

export interface ConsultationPageResponse {

  appointmentId: number;

  queueNumber: number;

  patient: {
    id: number;
    name: string;
    age: number;
    gender: string;
  };

  consultation: {
    id: number;

    diagnosis: string | null;

    clinicalNotes: string | null;
  };

  prescription: {
    id: number;

    generalInstructions: string | null;

    followUpDate: string | null;

    followUpNotes: string | null;

    medicines: Medicine[];
  };
}

export interface CompleteConsultationRequest {

  appointmentId: number;

  diagnosis: string;

  clinicalNotes: string;

  generalInstructions: string;

  followUpDate: string;

  followUpNotes: string;

  medicines: Medicine[];
}
export interface ConsultationHistoryDetailsResponse {

  consultationId: number;

  appointmentDate: string;

  doctorName: string;

  patient: {
    id: number;

    fullName: string;

    gender: string;

    age: number;

    bloodGroup: string;
  };

  consultation: {
    id: number;

    diagnosis: string;

    clinicalNotes: string;
  };

  prescription: {
    id: number;

    generalInstructions: string;

    followUpDate: string;

    followUpNotes: string;

    medicines: Medicine[];
  };
}