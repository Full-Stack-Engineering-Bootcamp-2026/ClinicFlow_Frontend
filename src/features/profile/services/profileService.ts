import axios from "axios"
import type { Profile, UpdateProfileRequest } from "../types/profile"

const API_URL = "http://localhost:8080/api/profile"

export const getMyProfile = async (): Promise<Profile> => {
  const token = localStorage.getItem("token")

  const response = await axios.get(`${API_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })

  return response.data
}

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<Profile> => {
  const token = localStorage.getItem("token")

  const response = await axios.put(`${API_URL}/me`, data, {
    headers: {
      Authorization: `Bearer ${token}`,
      "Content-Type": "application/json",
    },
  })

  return response.data.data
}