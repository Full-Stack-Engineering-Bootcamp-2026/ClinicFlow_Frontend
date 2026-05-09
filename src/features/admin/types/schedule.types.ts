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
export type ScheduleStatusFilter = "ALL" | "WORKING" | "ON_LEAVE"

export interface AdminDoctorScheduleRow {
 doctorId: number
 doctorName: string
 specialization: string
 startTime: string
 endTime: string
 maxAppointments: number
 workingDays: string[]
 leaveDates: string[]
 onLeaveThisWeek: boolean
}

export interface AdminDoctorScheduleStats {
 activeClinicians: number
 queueCapacityToday: number
 onLeaveThisWeek: number
}

export interface AdminDoctorSchedulePage {
 content: AdminDoctorScheduleRow[]
 totalElements: number
 totalPages: number
 size: number
 number: number
 stats: AdminDoctorScheduleStats
 specializations: string[]
}

export interface ScheduleFilters {
 page: number
 size: number
 specialization: string
 status: ScheduleStatusFilter
}

export interface ChangeDoctorScheduleRequest {
 doctorId: number
 dates: string[]
 startTime?: string
 endTime?: string
 maxAppointments?: number
 reason?: string
}

export interface ApplyLeaveRequest {
 doctorId: number
 date: string
 reason?: string
}
