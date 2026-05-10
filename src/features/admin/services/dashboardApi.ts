import { apiRequest } from "@/lib/api"
import type {
  DashboardSummaryResponse,
  DoctorScheduleDashboardResponse,
  StaffPageResponse,
} from "../types/dashboard.types"

export function getDashboardSummary(token: string) {
  return apiRequest<DashboardSummaryResponse>("/admin/dashboard/summary", {
    token,
  })
}

export function getDoctorScheduleDashboard(token: string, startDate: string) {
  const params = new URLSearchParams({ startDate })

  return apiRequest<DoctorScheduleDashboardResponse[]>(
    `/admin/dashboard/doctor-schedule?${params.toString()}`,
    { token }
  )
}

export function getRecentStaff(token: string, page = 0, size = 5) {
  const params = new URLSearchParams({
    page: String(page),
    size: String(size),
  })

  return apiRequest<StaffPageResponse>(
    `/admin/dashboard/recent-staff?${params.toString()}`,
    { token }
  )
}
