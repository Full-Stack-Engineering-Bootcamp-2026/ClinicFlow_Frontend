import { useEffect, useState } from "react"
import { toast } from "sonner"
import { useDispatch } from "react-redux"

import {
  updateProfileImage,
  updateUserProfile,
} from "@/features/auth/authSlice"

import {
  getMyProfile,
  updateProfile,
  uploadProfilePhoto,
} from "../services/profileService"

import type { Profile } from "../types/profile"
import type { ProfileFormData } from "../types/profileSchema"

import axiosInstance from "@/lib/axios"

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)

  const [loading, setLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)

  const [selectedImagePreview, setSelectedImagePreview] = useState("")

  const [profileImageUrl, setProfileImageUrl] = useState("")

  const dispatch = useDispatch()

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile()

      setProfile(data)

      dispatch(
        updateUserProfile({
          name: data.name,
          officialRole: data.officialRole,
        })
      )
    } catch (error) {
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  const fetchProfileImage = async () => {
    try {
      const response = await axiosInstance.get("/profile/photo/view", {
        responseType: "blob",
      })

      const imageUrl = URL.createObjectURL(response.data)

      setProfileImageUrl(imageUrl)

      dispatch(updateProfileImage(imageUrl))
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    const loadData = async () => {
      await fetchProfile()

      await fetchProfileImage()
    }

    loadData()
  }, [])

  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    try {
      const file = e.target.files?.[0]

      if (!file) return

      if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
        return toast.error("Only JPG, PNG or WEBP allowed")
      }

      if (file.size > 2 * 1024 * 1024) {
        return toast.error("Image size must be below 2MB")
      }

      const preview = URL.createObjectURL(file)

      setSelectedImagePreview(preview)

      const loadingToast = toast.loading("Uploading photo...")

      await uploadProfilePhoto(file)

      await fetchProfileImage()

      toast.dismiss(loadingToast)

      toast.success("Profile photo updated")
    } catch (error) {
      toast.error("Failed to upload image")
    }
  }

  const handleSave = async (data: ProfileFormData) => {
    const loadingToast = toast.loading("Updating profile...")

    try {
      const updatedProfile = await updateProfile(data)

      setProfile(updatedProfile)

      dispatch(
        updateUserProfile({
          name: updatedProfile.name,
          officialRole: updatedProfile.officialRole,
        })
      )

      setIsEditing(false)

      toast.dismiss(loadingToast)

      toast.success("Profile updated successfully")
    } catch (error) {
      toast.dismiss(loadingToast)

      toast.error("Failed to update profile")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)

    setSelectedImagePreview("")

    fetchProfile()

    fetchProfileImage()
  }

  return {
    profile,
    loading,
    isEditing,
    setIsEditing,
    selectedImagePreview,
    profileImageUrl,
    handleImageChange,
    handleSave,
    handleCancel,
  }
}
