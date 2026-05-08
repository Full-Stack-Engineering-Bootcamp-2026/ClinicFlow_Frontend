import axios from "axios"

import type {
  Profile,
  UpdateProfileRequest,
} from "../types/profile"

const API_URL =
  "http://localhost:8080/api/profile"

const mockProfile: Profile = {
  id: 1,
  name: "Dr. Sarah Jenkins",
  email: "doctor@gmail.com",
  phoneNumber: "9876543210",
  role: "Chief Surgeon",
  department: "Surgical Sciences",
  specialization: "Orthopedic Surgery",
  createdAt: "2025-05-08T10:30:00",
  profileImage:
    "https://i.pravatar.cc/150?img=12",
}

export const getMyProfile =
  async (): Promise<Profile> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(mockProfile)
      }, 500)
    })
  }

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<Profile> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        ...mockProfile,
        ...data,
      })
    }, 1000)
  })

  /*
  REAL API

  const token = localStorage.getItem("token")

  const response = await axios.put(
    `${API_URL}/me`,
    data,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    }
  )

  return response.data.data
  */
}

export const uploadProfilePhoto =
  async (
    file: File
  ): Promise<string> => {
    return new Promise((resolve) => {
      setTimeout(() => {
        resolve(
          URL.createObjectURL(file)
        )
      }, 1000)
    })

    /*
    REAL API

    const token = localStorage.getItem("token")

    const formData = new FormData()

    formData.append("file", file)

    const response = await axios.put(
      `${API_URL}/photo`,
      formData,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type":
            "multipart/form-data",
        },
      }
    )

    return response.data.profileImage
    */
  }