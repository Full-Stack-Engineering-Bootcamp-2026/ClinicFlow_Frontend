import { z } from "zod"

export const addStaffSchema = z.object({
  fullName: z
    .string()
    .min(3, "Full name must be at least 3 characters"),

  email: z
    .string()
    .email("Enter a valid email address"),

  role: z
    .string()
    .min(1, "Please select a role"),

  phone: z
    .string()
    .min(10, "Phone number must be at least 10 digits"),

  password: z
    .string()
    .min(6, "Password must be at least 6 characters"),
})

export type AddStaffFormValues = z.infer<
  typeof addStaffSchema
>