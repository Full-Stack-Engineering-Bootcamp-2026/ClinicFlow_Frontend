import type { ChangeEvent } from "react"
import type { Profile } from "../types/profile"

interface Props {
  profile: Profile
  setProfile: React.Dispatch<React.SetStateAction<Profile | null>>
  isEditing: boolean
  onSave: () => void
  onCancel: () => void
}

const EditProfileForm = ({
  profile,
  setProfile,
  isEditing,
  onSave,
  onCancel,
}: Props) => {
  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target

    setProfile((prev) => {
      if (!prev) return prev

      return {
        ...prev,
        [name]: value,
      }
    })
  }

  return (
    <div className="bg-white rounded-2xl border p-6 shadow-sm mt-6">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <label className="block text-sm font-medium mb-2">
            Full Name
          </label>

          <input
            type="text"
            name="name"
            value={profile.name}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
          />
        </div>

         <div>
          <label className="block text-sm font-medium mb-2">
            Email
          </label>

          <input
            type="email"
            value={profile.email}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Phone Number
          </label>

          <input
            type="text"
            name="phoneNumber"
            value={profile.phoneNumber}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Role
          </label>

          <input
            type="text"
            value={profile.role}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Department
          </label>

          <input
            type="text"
            value={profile.department}
            disabled
            className="w-full border rounded-lg px-4 py-2 bg-gray-100"
          />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">
            Specialization
          </label>

          <select
            name="specialization"
            value={profile.specialization}
            onChange={handleChange}
            disabled={!isEditing}
            className="w-full border rounded-lg px-4 py-2 disabled:bg-gray-100"
          >
            <option value="Orthopedic Surgery">
              Orthopedic Surgery
            </option>

            <option value="Neurology">Neurology</option>

            <option value="Cardiology">Cardiology</option>

            <option value="Dermatology">Dermatology</option>
          </select>
          </div>
      </div>

      {isEditing && (
        <div className="flex justify-end gap-3 mt-8">
          <button
            onClick={onCancel}
            className="border px-5 py-2 rounded-lg"
          >
            Cancel
          </button>

          <button
            onClick={onSave}
            className="bg-blue-600 hover:bg-blue-700 text-white px-5 py-2 rounded-lg"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>
  )
}

export default EditProfileForm