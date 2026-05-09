import { z } from "zod"

export const addStaffSchema = z.object({
 fullName: z
 .string()
 .min(3, "Full name must be at least 3 characters"),

 email: z
 .string()
 .email("Enter a valid email address"),

 roleId: z
 .number({
 error: "Please select a role",
 })
 .min(1, "Please select a role"),

 phone: z
 .string()
 .regex(/^[0-9]{10}$/, "Phone must be 10 digits"),

 password: z
 .string()
 .min(6, "Password must be at least 6 characters"),

 officialRole: z.string().optional(),

 specialization: z.string().optional(),
})

export type AddStaffFormValues = z.infer<
 typeof addStaffSchema
>
