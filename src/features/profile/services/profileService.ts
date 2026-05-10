import axiosInstance from "@/lib/axios"

import type {
  Profile,
  UpdateProfileRequest,
} from "../types/profile"

const API_URL =
  "http://localhost:8080/api/profile"



export const getMyProfile =
  async (): Promise<Profile> => {
    
    const response =
      await axiosInstance.get(
        "/profile/me"
      )

    return response.data.data
  }

export const updateProfile = async (
  data: UpdateProfileRequest
): Promise<Profile> => {

  const response =
    await axiosInstance.put(
      "/profile/me",
      data
    )

  return response.data.data

}

export const uploadProfilePhoto =
  async (
    file: File
  ): Promise<string> => {

    const formData =
      new FormData()

    formData.append(
      "file",
      file
    )

    const response =
      await axiosInstance.put(
        "/profile/photo",
        formData,
        {
          headers: {
            "Content-Type":
              "multipart/form-data",
          },
        }
      )

    return response.data.data
}