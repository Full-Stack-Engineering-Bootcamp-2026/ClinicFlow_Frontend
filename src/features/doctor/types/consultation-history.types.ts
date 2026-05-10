import type {
  Medicine,
} from "./consultation.types";

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