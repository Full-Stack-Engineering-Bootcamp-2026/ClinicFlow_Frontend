export interface StaffMember {
 id: number
 name: string
 role: string
 email: string
 status: "Active" | "Inactive"
 avatar?: string
}

export interface AddStaffFormData {
 fullName: string
 email: string
 roleId: number
 phone: string
 password: string
 officialRole?: string
 specialization?: string
}

export type StaffStatusFilter = "ALL" | "ACTIVE" | "INACTIVE"

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

export interface StaffFilters {
 page: number
 size: number
 search: string
 role: string
 status: StaffStatusFilter
}

export interface RoleResponse {
 id: number
 name: string
}

export interface CreateStaffRequest {
 fullName: string
 email: string
 password: string
 roleId: number
 phone: string
 officialRole?: string
 specialization?: string
}

export interface CreateStaffResponse {
 id: number
 fullName: string
 email: string
 role: string
}
