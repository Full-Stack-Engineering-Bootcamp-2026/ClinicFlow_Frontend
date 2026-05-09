import { apiRequest } from "@/lib/api"
import type {
  AdminDoctorSchedulePage,
  ApplyLeaveRequest,
  ChangeDoctorScheduleRequest,
  ScheduleFilters,
} from "../types/schedule.types"

const buildScheduleQuery = (
  startDate: string,
  filters: ScheduleFilters
) => {
  const params = new URLSearchParams({
    startDate,
    page: String(filters.page),
    size: String(filters.size),
    status: filters.status,
  })

  if (filters.specialization) {
    params.set("specialization", filters.specialization)
  }

  return params.toString()
}

export function getAdminDoctorSchedules(
  token: string,
  startDate: string,
  filters: ScheduleFilters
) {
  return apiRequest<AdminDoctorSchedulePage>(
    `/admin/schedules/admin-view?${buildScheduleQuery(
      startDate,
      filters
    )}`,
    { token }
  )
}

export function changeDoctorSchedule(
  token: string,
  payload: ChangeDoctorScheduleRequest
) {
  return apiRequest<void>("/admin/schedules/change", {
    token,
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function applyDoctorLeave(
  token: string,
  payload: ApplyLeaveRequest
) {
  return apiRequest<void>("/admin/leave", {
    token,
    method: "POST",
    body: JSON.stringify(payload),
  })
}