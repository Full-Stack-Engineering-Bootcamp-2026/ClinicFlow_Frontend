export type RegisterPatientFormData = {
  fullName: string
  mobileNumber: string
  dateOfBirth: string
  gender: string
  bloodGroup: string
  address?: string
  medicalNotes?: string
}

export type AppointmentDetailsCardProps = {
  doctors: Doctor[]

  doctor: string

  onDoctorChange: (value: string) => void

  visitType: string

  onVisitTypeChange: (value: string) => void

  appointmentDate: string

  onAppointmentDateChange: (value: string) => void
}

export type Doctor = {
  id: string
  name: string
}

export type PatientSearchCardProps = {
  value: string

  onChange: (value: string) => void

  onSearch?: () => void
}


export type PatientCardProps = {
  fullName: string
  patientId: string
  phoneNumber: string

  isReturning: boolean

  selected?: boolean

  onSelect?: () => void

  onViewHistory?: () => void
}

export type BookingSummaryCardProps = {
  patientName?: string

  patientId?: string

  doctorName?: string

  visitType?: string

  appointmentDate?: string

  estimatedWaitTime?: string

  onConfirm?: () => void

  onCancel?: () => void
}