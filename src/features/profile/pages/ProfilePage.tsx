import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import EditProfileForm from "../components/EditProfileForm"
import ProfileCard from "../components/ProfileCard"
import {
  getMyProfile,
  updateProfile,
} from "../services/profileService"
import type { Profile } from "../types/profile"

const ProfilePage=()=>{
     const navigate = useNavigate()

  const [profile, setProfile] = useState<Profile | null>(null)

  const [loading, setLoading] = useState(true)

  const [isEditing, setIsEditing] = useState(false)


  const fetchProfile = async () => {
    try {
      const data = await getMyProfile()
      setProfile(data)
    } catch (error) {
      console.error("Failed to fetch profile", error)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
      fetchProfile()
    }, [])


     const handleSave = async () => {
    if (!profile) return

    try {
      const updatedProfile = await updateProfile({
        name: profile.name,
        phoneNumber: profile.phoneNumber,
        specialization: profile.specialization,
      })

      setProfile(updatedProfile)

      setIsEditing(false)

      alert("Profile updated successfully")
    } catch (error) {
      console.error("Failed to update profile", error)
      alert("Failed to update profile")
    }
  }

  const handleCancel = () => {
    setIsEditing(false)
    fetchProfile()
  }

  if (loading) {
    return <div className="p-10">Loading...</div>
  }

  if (!profile) {
    return <div className="p-10">Profile not found</div>
  }

  return (
    <div className="p-6 bg-gray-50 min-h-screen">
      <div className="max-w-6xl mx-auto">
        <ProfileCard
          profile={profile}
          onEdit={() => setIsEditing(true)}
          onResetPassword={() => navigate("/reset-password")}
        />

        <EditProfileForm
          profile={profile}
          setProfile={setProfile}
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={handleCancel}
        />
      </div>
    </div>
  )
}

export default ProfilePage
