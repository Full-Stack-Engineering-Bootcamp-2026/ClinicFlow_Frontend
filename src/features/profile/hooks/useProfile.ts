import { useEffect, useState } from "react"
import { toast } from "sonner"
import { getMyProfile, updateProfile, uploadProfilePhoto } from "../services/profileService"
import type { Profile } from "../types/profile"
import type { ProfileFormData } from "../types/profileSchema"

export const useProfile = () => {
  const [profile, setProfile] = useState<Profile | null>(null)
  const [loading, setLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [selectedImage, setSelectedImage] = useState<File | null>(null)
  const [selectedImagePreview, setSelectedImagePreview] = useState("")

  const fetchProfile = async () => {
    try {
      const data = await getMyProfile()
      setProfile(data)
    } catch (error) {
      toast.error("Failed to load profile")
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProfile()
  }, [])

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) {
      return toast.error("Only JPG, PNG or WEBP allowed")
    }
    if (file.size > 2 * 1024 * 1024) {
      return toast.error("Image size must be below 2MB")
    }

    setSelectedImage(file)
    setSelectedImagePreview(URL.createObjectURL(file))
  }

  const handleSave = async (data: ProfileFormData) => {
    const loadingToast = toast.loading("Updating profile...")
    try {
      let imageUrl = profile?.profileImage || ""
      if (selectedImage) {
        imageUrl = await uploadProfilePhoto(selectedImage)
      }
      
      const updatedProfile = await updateProfile(data)
      setProfile({ ...updatedProfile, profileImage: imageUrl })
      setIsEditing(false)
      setSelectedImage(null)
      toast.dismiss(loadingToast)
      toast.success("Profile updated successfully")
    } catch (error) {
      toast.dismiss(loadingToast)
      toast.error("Failed to update profile")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    setSelectedImage(null)
    setSelectedImagePreview("")
    fetchProfile() 
  }

  return {
    profile,
    loading,
    isEditing,
    setIsEditing,
    selectedImagePreview,
    handleImageChange,
    handleSave,
    handleCancel,
  }
}