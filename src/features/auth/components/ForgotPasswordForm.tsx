import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { forgotPasswordApi } from "../api/authApi"
import { useState } from "react"
import { useNavigate } from "react-router-dom"

const forgotSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
})

type ForgotFormData = z.infer<typeof forgotSchema>

export default function ForgotPasswordForm() {
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [successMessage, setSuccessMessage] = useState("")
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<ForgotFormData>({
    resolver: zodResolver(forgotSchema),
  })

  const onSubmit = async (data: ForgotFormData) => {
    try {
      setIsSubmitting(true)

      await forgotPasswordApi(data.email)

      setSuccessMessage("Password reset link sent. Redirecting to login...")

      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      console.error(error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="mb-1 block text-sm font-medium">Email</label>
        <input
          type="email"
          {...register("email")}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        {errors.email && (
          <p className="mt-1 text-xs text-red-500">{errors.email.message}</p>
        )}
      </div>

      {successMessage && (
        <p className="text-sm text-green-600">{successMessage}</p>
      )}
      <button
        type="submit"
        disabled={isSubmitting}
        className="w-full rounded-md bg-primary py-2 text-primary-foreground cursor-pointer transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Sending..." : "Send Reset Link"}
      </button>
    </form>
  )
}
