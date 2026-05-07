export interface LeaveException {
  id: number

  doctorScheduleId: number

  exceptionDate: string

  reason: string
}

export interface DoctorSchedule {
  id: number

  doctorName: string

  specialization: string

  dayOfWeek: string

  startTime: string

  endTime: string

  maxAppointments: number

  isActive: boolean

  leaveExceptions: LeaveException[]
}