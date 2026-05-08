import type { Profile } from "../types/profile"

interface Props {
  profile: Profile
  onEdit: () => void
  onResetPassword: () => void
}

const ProfileCard = ({
  profile,
  onEdit,
  onResetPassword,
}: Props) => {
  return (
    <div className="bg-white rounded-2xl border p-6 flex items-center justify-between shadow-sm">
      <div className="flex items-center gap-4">
        <img
          src={
            profile.profileImage ||
            "https://i.pravatar.cc/150?img=12"
          }
          alt="profile"
          className="w-20 h-20 rounded-full object-cover border"
        />

        <div>
          <h2 className="text-2xl font-semibold">{profile.name}</h2>

          <p className="text-sm text-gray-500 mt-1">
            {profile.role}
          </p>

          <p className="text-sm text-gray-500">
            {profile.department}
          </p>
        </div>
      </div>

      <div className="flex flex-col gap-3">
        <button
          onClick={onEdit}
          className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg text-sm"
        >
          Edit Profile
        </button>

        <button
          onClick={onResetPassword}
          className="border border-blue-600 text-blue-600 hover:bg-blue-50 px-5 py-2 rounded-lg text-sm"
        >
          Reset Password
        </button>
      </div>
    </div>
  )
}

export default ProfileCard