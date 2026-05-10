import { useNavigate } from "react-router-dom"

import { useProfile } from "../hooks/useProfile"

import ProfileCard from "../components/ProfileCard"

import EditProfileForm from "../components/EditProfileForm"

const ProfilePage = () => {

  const navigate = useNavigate()

  const {

    profile,

    loading,

    isEditing,

    setIsEditing,

    selectedImagePreview,

    profileImageUrl,

    handleImageChange,

    handleSave,

    handleCancel,

  } = useProfile()

  if (loading) {

    return (
      <div className="p-10">
        Loading...
      </div>
    )
  }

  if (!profile) {

    return (
      <div className="p-10">
        Profile not found
      </div>
    )
  }

  return (

    <div className="min-h-screen bg-background p-6">

      <div className="max-w-6xl mx-auto">

        <ProfileCard
          profile={profile}
          isEditing={isEditing}
          selectedImagePreview={selectedImagePreview}
          profileImageUrl={profileImageUrl}
          onEdit={() => setIsEditing(true)}
          onResetPassword={() =>
            navigate("/reset-password")
          }
          onImageChange={handleImageChange}
        />

        <EditProfileForm
          profile={profile}
          isEditing={isEditing}
          onSave={handleSave}
          onCancel={handleCancel}
        />

      </div>

    </div>
  )
}

export default ProfilePage