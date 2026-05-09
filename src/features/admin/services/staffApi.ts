import { apiRequest } from "@/lib/api"
import type {
  CreateStaffRequest,
  CreateStaffResponse,
  RoleResponse,
  StaffFilters,
  StaffPageResponse,
} from "../types/staff.types"

const buildStaffQuery = (filters: StaffFilters) => {
  const params = new URLSearchParams({
    page: String(filters.page),
    size: String(filters.size),
  })

  if (filters.search.trim()) {
    params.set("search", filters.search.trim())
  }

  if (filters.role) {
    params.set("role", filters.role)
  }

  if (filters.status !== "ALL") {
    params.set("isActive", String(filters.status === "ACTIVE"))
  }

  return params.toString()
}

export function getStaff(
  token: string,
  filters: StaffFilters
) {
  return apiRequest<StaffPageResponse>(
    `/admin/staff?${buildStaffQuery(filters)}`,
    { token }
  )
}

export function getRoles(token: string) {
  return apiRequest<RoleResponse[]>("/admin/roles", {
    token,
  })
}

export function createStaff(
  token: string,
  payload: CreateStaffRequest
) {
  return apiRequest<CreateStaffResponse>("/admin/staff", {
    token,
    method: "POST",
    body: JSON.stringify(payload),
  })
}

export function deactivateStaff(
  token: string,
  staffId: number
) {
  return apiRequest<void>(`/admin/staff/${staffId}/active`, {
    token,
    method: "PATCH",
    body: JSON.stringify({ isActive: false }),
  })
}