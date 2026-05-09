import type {
  ApiResponse,
  DashboardSummaryResponse,
  DoctorScheduleDashboardResponse,
  StaffPageResponse,
} from "../types/dashboard.types"

const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? "http://localhost:8080"

async function apiGet<T>(
  path: string,
  token: string
): Promise<T> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    method: "GET",
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  const result = (await response
    .json()
    .catch(() => null)) as ApiResponse<T> | null

  if (!response.ok || !result?.success) {
    throw new Error(result?.message || "Request failed")
  }

  return result.data
}

export function getDashboardSummary(token: string) {
  return apiGet<DashboardSummaryResponse>(
    "/admin/dashboard/summary",
    token
  )
}

export function getDoctorScheduleDashboard(
  token: string,
  startDate: string
) {
  return apiGet<DoctorScheduleDashboardResponse[]>(
    `/admin/dashboard/doctor-schedule?startDate=${startDate}`,
    token
  )
}

export function getRecentStaff (token: string) {
  
  return apiGet<StaffPageResponse>(
    "/admin/staff?page=0&size=3",
    token
  )
}