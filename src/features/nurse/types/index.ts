import type { LucideIcon } from "lucide-react"

export type QueueStatCardProps = {
  title: string
  value: string | number
  subtitle: string
  icon: LucideIcon
  iconBgColor: string
  iconColor: string
}

export type DoctorQueueCardProps = {
  queue: DoctorQueue
}

export type QueueTableProps = {
  patients: WaitingPatient[]
}
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

export type AppointmentSuccessDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
  queueNumber: string
  appointmentId: string
  patientName: string
  doctorName: string
  appointmentDate: string
  visitType: string
  onGoToQueue: () => void
}


export type QueueStats = {
  totalWaitingPatients: number
  activeDoctors: number
  urgentCases: number
  averageWaitTime: number
}

export type WaitingPatient = {
  appointmentId: number
  queueNumber: number
  patientName: string
  mobile: string
  status: string
}

export type DoctorQueue = {
  doctorId: number
  doctorName: string
  specialization: string
  queueState: string
  servingNow: WaitingPatient | null
  nextUp: WaitingPatient | null
  lastServed: WaitingPatient | null
  waitingCount: number
  waitingPatients: WaitingPatient[]
}