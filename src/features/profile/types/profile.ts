export interface Profile {
  id: number
  name: string
  email: string
  phoneNumber: string
  role: string
  officialRole: string;
  specialization: string;
  profileImage?: string
  createdAt: string;
}

export interface UpdateProfileRequest {
  name: string
  phoneNumber: string
  specialization: string
}