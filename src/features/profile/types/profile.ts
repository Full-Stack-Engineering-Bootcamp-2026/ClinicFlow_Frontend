export interface Profile {
  id: number
  name: string
  email: string
  phoneNumber: string
  role: string
  department: string
  specialization: string
  profileImage?: string
}

export interface UpdateProfileRequest {
  name: string
  phoneNumber: string
  specialization: string
}