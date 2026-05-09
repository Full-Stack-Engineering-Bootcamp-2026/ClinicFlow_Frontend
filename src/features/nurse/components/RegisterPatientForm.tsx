import { useForm, Controller } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { FaPhoneAlt } from "react-icons/fa"
import { Button } from "@/components/ui/button"

import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { RegisterPatientFormData } from "../types"

const registerPatientSchema = z.object({
  fullName: z.string().min(1, "Full name is required"),

  mobileNumber: z
    .string()
    .regex(/^[0-9]{10}$/, "Enter a valid 10 digit mobile number"),

  dateOfBirth: z
    .string()
    .min(1, "Date of birth is required")
    .refine((date) => new Date(date) <= new Date(), {
      message: "Date of birth cannot be in the future",
    }),

  gender: z.string().min(1, "Gender is required"),

  bloodGroup: z.string().min(1, "Blood group is required"),

  address: z.string().optional(),

  medicalNotes: z.string().optional(),
})

type RegisterPatientFormProps = {
  onSubmit: (data: RegisterPatientFormData) => void

  isSubmitting?: boolean
}

export default function RegisterPatientForm({
  onSubmit,
  isSubmitting = false,
}: RegisterPatientFormProps) {
  const {
    register,
    control,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm<RegisterPatientFormData>({
    resolver: zodResolver(registerPatientSchema),

    defaultValues: {
      fullName: "",
      mobileNumber: "",
      dateOfBirth: "",
      gender: "",
      bloodGroup: "",
      address: "",
      medicalNotes: "",
    },
  })

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">Full Name *</label>

          <input
            type="text"
            placeholder="John Doe"
            {...register("fullName")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          {errors.fullName && (
            <p className="mt-1 text-xs text-red-500">
              {errors.fullName.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Mobile Number *
          </label>

          <div className="flex items-center rounded-md border border-border bg-background px-3">
            <FaPhoneAlt className="mr-2 text-xs text-muted-foreground" />

            <input
              type="text"
              placeholder="1234567890"
              {...register("mobileNumber")}
              className="w-full bg-transparent py-2 text-sm outline-none"
            />
          </div>

          {errors.mobileNumber && (
            <p className="mt-1 text-xs text-red-500">
              {errors.mobileNumber.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">
            Date of Birth *
          </label>

          <input
            type="date"
            max={new Date().toISOString().split("T")[0]}
            {...register("dateOfBirth")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          {errors.dateOfBirth && (
            <p className="mt-1 text-xs text-red-500">
              {errors.dateOfBirth.message}
            </p>
          )}
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Gender *</label>

          <Controller
            control={control}
            name="gender"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select Gender" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="MALE">Male</SelectItem>

                  <SelectItem value="FEMALE">Female</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.gender && (
            <p className="mt-1 text-xs text-red-500">{errors.gender.message}</p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Blood Group *
          </label>

          <Controller
            control={control}
            name="bloodGroup"
            render={({ field }) => (
              <Select
                onValueChange={field.onChange}
                value={field.value || undefined}
              >
                <SelectTrigger className="w-full bg-background">
                  <SelectValue placeholder="Select Blood Group" />
                </SelectTrigger>

                <SelectContent>
                  <SelectItem value="A+">A+</SelectItem>
                  <SelectItem value="A-">A-</SelectItem>
                  <SelectItem value="B+">B+</SelectItem>
                  <SelectItem value="B-">B-</SelectItem>
                  <SelectItem value="AB+">AB+</SelectItem>
                  <SelectItem value="AB-">AB-</SelectItem>
                  <SelectItem value="O+">O+</SelectItem>
                  <SelectItem value="O-">O-</SelectItem>
                </SelectContent>
              </Select>
            )}
          />

          {errors.bloodGroup && (
            <p className="mt-1 text-xs text-red-500">
              {errors.bloodGroup.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">Address</label>

          <textarea
            rows={3}
            {...register("address")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          {errors.address && (
            <p className="mt-1 text-xs text-red-500">
              {errors.address.message}
            </p>
          )}
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Medical Notes (Optional)
          </label>

          <textarea
            rows={4}
            {...register("medicalNotes")}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />

          {errors.medicalNotes && (
            <p className="mt-1 text-xs text-red-500">
              {errors.medicalNotes.message}
            </p>
          )}
        </div>
      </div>

      <div className="flex justify-end gap-3">
        <Button
          type="button"
          variant="outline"
          onClick={() => reset()}
          className="cursor-pointer"
          disabled={isSubmitting}
        >
          Clear Form
        </Button>

        <Button
          type="submit"
          className="cursor-pointer max-w-40"
          disabled={isSubmitting}
        >
          {isSubmitting ? "Registering..." : "Register Patient"}
        </Button>
      </div>
    </form>
  )
}
