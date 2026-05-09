export interface DashboardStat {
 title: string
 value: number
 change?: string
 status?: string
}

export interface AdminStatCardProps {
 title: string
 value: number | string
 change?: string
 subtitle?: string
 trend?: "up" | "down" | "neutral"
 icon?: React.ReactNode
}
export interface StaffActivity {
 id: number
 name: string
 role: string
 action: string
 time: string
 status: "Verified" | "On Duty" | "Flagged"
}

export interface ScheduleItem {
 id: number
 day: string
 date: string
 title: string
 doctors: number
 appointments: number
}

export interface QuickAction {
 id: number
 label: string
}

export interface InfoCardProps {
 title: string
 description: string
 actionLabel: string
}

export interface ApiResponse<T> {
 success: boolean
 message: string
 data: T
 errorCode?: string
}

export interface DashboardSummaryResponse {
 totalStaff: number
 activeDoctors: number
 totalAppointments: number
 completedAppointments: number
 cancelledAppointments: number
}

export interface DoctorScheduleDashboardResponse {
 day: string
 date: string
 doctorCount: number
 appointmentCount: number
}

export interface StaffResponse {
 id: number
 fullName: string
 email: string
 role: string
 isActive: boolean
}

export interface StaffPageResponse {
 content: StaffResponse[]
 totalElements: number
 totalPages: number
 size: number
 number: number
}

export interface AdminDashboardData {
 summary: DashboardSummaryResponse
 doctorSchedule: DoctorScheduleDashboardResponse[]
 recentStaff: StaffPageResponse
}