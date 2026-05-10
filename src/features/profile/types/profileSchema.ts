import { z } from "zod"

export const profileSchema = z.object({
  name: z
    .string()
    .min(3, "Name must be at least 3 characters")
    .max(50, "Name is too long"),

  phoneNumber: z
    .string()
    .regex(
      /^[0-9]{10}$/,
      "Phone number must be 10 digits"
    ),

  specialization: z
    .string()
    .min(1, "Please select specialization"),
})

export type ProfileFormData = z.infer<
  typeof profileSchema
>