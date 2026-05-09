export interface Medicine {
  medicineName: string;
  medicineCategory: string;
  medicineUnit: string;

  dosage: string;

  frequency: string;

  durationDays: number;

  instructions: string;
}

export interface ConsultationFormData {
  diagnosis: string;

  clinicalNotes: string;

  generalInstructions: string;

  followUpDate: string;

  followUpNotes: string;

  medicines: Medicine[];
}

export interface ConsultationPatient {
  id: number;

  name: string;

  age: number;

  gender: string;
}

export interface ConsultationPageData {
  appointmentId: number;

  queueNumber: number;

  patient: ConsultationPatient;
}