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
  role: string
  phone: string
  password: string
}