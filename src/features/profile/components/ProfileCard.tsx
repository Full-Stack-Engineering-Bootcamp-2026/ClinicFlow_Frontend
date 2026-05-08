import { Camera } from "lucide-react"
import type { Profile } from "../types/profile"
import { useNavigate } from "react-router-dom"
import { useDispatch } from "react-redux"
import type{ AppDispatch } from "@/app/store"
import { logout } from "@/features/auth/authSlice"

interface Props {
  profile: Profile
  isEditing: boolean
  selectedImagePreview: string
  onEdit: () => void
  onResetPassword: () => void
  onImageChange: (e: React.ChangeEvent<HTMLInputElement>) => void
}

const ProfileCard = ({ profile, isEditing, selectedImagePreview, onEdit, onResetPassword, onImageChange }: Props) => {
  const joinedDate = new Date(profile.createdAt).toLocaleDateString("en-US", {
    year: "numeric", month: "short", day: "numeric",
  })
  const navigate = useNavigate()
  const dispatch=useDispatch<AppDispatch>()

  const handleReset=()=>{
    dispatch(logout())
    navigate("/forgot-password")
  }


  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
      <div className="flex items-center gap-5">
        <div className="relative">
          <img
            src={selectedImagePreview || profile.profileImage || "https://i.pravatar.cc/150?img=12"}
            alt="profile"
            className="w-24 h-24 rounded-full object-cover border"
          />
          {isEditing && (
            <>
              <label htmlFor="profile-upload" className="absolute bottom-0 right-0 bg-primary text-primary-foreground p-2 rounded-full cursor-pointer shadow-md hover:bg-primary/90 transition">
                <Camera size={16} />
              </label>
              <input id="profile-upload" type="file" accept="image/png,image/jpeg,image/webp" className="hidden" onChange={onImageChange} />
            </>
          )}
        </div>

        <div>
          <h2 className="text-2xl font-semibold text-foreground">{profile.name}</h2>
          <p className="text-sm text-primary mt-1 font-medium">{profile.role}</p>
          <p className="text-sm text-muted-foreground">{profile.department}</p>
          <div className="flex items-center gap-2 mt-3">
            <span className="bg-primary/10 text-primary text-xs px-3 py-1 rounded-full font-medium">Active</span>
            <span className="bg-muted text-muted-foreground text-xs px-3 py-1 rounded-full">Joined {joinedDate}</span>
          </div>
        </div>
      </div>

      <div className="flex flex-col sm:flex-row lg:flex-col gap-3">
        <button onClick={onEdit} className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg text-sm font-medium transition">
          Edit Profile
        </button>
        <button
          onClick={handleReset}
          className="border border-primary text-primary hover:bg-primary/10 px-5 py-2.5 rounded-lg text-sm font-medium transition"
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}

export default ProfileCard