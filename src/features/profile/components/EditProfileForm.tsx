import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import type { Profile } from "../types/profile"
import { profileSchema, type ProfileFormData } from "../types/profileSchema"
import { useNavigate } from "react-router-dom"

interface Props {
  profile: Profile
  isEditing: boolean
  onSave: (data: ProfileFormData) => void
  onCancel: () => void
}

const EditProfileForm = ({ profile, isEditing, onSave, onCancel }: Props) => {
  const { register,setValue, handleSubmit, reset, formState: { errors } } = useForm<ProfileFormData>({
    resolver: zodResolver(profileSchema),
    defaultValues: {
      name: profile.name,
      phoneNumber: profile.phoneNumber,
      specialization: profile.specialization,
    },
  })

  useEffect(() => {
    reset({ name: profile.name, phoneNumber: profile.phoneNumber, specialization: profile.specialization })
  }, [profile, reset])

  return (
    <div className="bg-card border rounded-2xl p-6 shadow-sm mt-6">
      <form onSubmit={handleSubmit(onSave)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Full Name</label>
            <input type="text" disabled={!isEditing} {...register("name")} className="w-full border rounded-lg px-4 py-2 bg-background disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary" />
            {errors.name && <p className="text-destructive text-sm mt-1">{errors.name.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Email</label>
            <input type="email" value={profile.email} disabled className="w-full border rounded-lg px-4 py-2 bg-muted" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Phone Number</label>
            <input type="text" disabled={!isEditing} {...register("phoneNumber")} className="w-full border rounded-lg px-4 py-2 bg-background disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary" />
            {errors.phoneNumber && <p className="text-destructive text-sm mt-1">{errors.phoneNumber.message}</p>}
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Role</label>
            <input type="text" value={profile.role} disabled className="w-full border rounded-lg px-4 py-2 bg-muted" />
          </div>

          <div>
            <label className="block text-sm font-medium mb-2 text-foreground">Specialization</label>
            <select disabled={!isEditing} {...register("specialization")} className="w-full border rounded-lg px-4 py-2 bg-background disabled:bg-muted focus:outline-none focus:ring-2 focus:ring-primary">
              <option value="">Select Specialization</option>
              <option value="Orthopedic Surgery">Orthopedic Surgery</option>
              <option value="Neurology">Neurology</option>
              <option value="Cardiology">Cardiology</option>
              <option value="Dermatology">Dermatology</option>
            </select>
            {errors.specialization && <p className="text-destructive text-sm mt-1">{errors.specialization.message}</p>}
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end gap-3 mt-8">
            <button type="button" onClick={onCancel} className="border px-5 py-2 rounded-lg hover:bg-muted transition">Cancel</button>
            <button type="submit" className="bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2 rounded-lg transition">Save Changes</button>
          </div>
        )}
      </form>
    </div>
  )
}

export default EditProfileForm