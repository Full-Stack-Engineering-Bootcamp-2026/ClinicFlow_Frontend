import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import { useDispatch } from "react-redux"
import type { AppDispatch } from "@/app/store"
import { Link, useNavigate } from "react-router-dom"
import { setAuth } from "../authSlice"
import { loginApi } from "../services/authApi"
import { useState } from "react"

const loginSchema = z.object({
  email: z.string().min(1, "Email is required").email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
})

type LoginFormData = z.infer<typeof loginSchema>

export default function LoginForm() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const [isSubmitting, setIsSubmitting] = useState(false)

  const [errorMessage, setErrorMessage] = useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  })

  const onSubmit = async (data: LoginFormData) => {
    try {
      setIsSubmitting(true)

      setErrorMessage("")

      const response = await loginApi(data.email, data.password)

      dispatch(setAuth(response.token))

      navigate("/")
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(error.message)
      } else {
        setErrorMessage("Login failed")
      }
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

      <div>
        <label className="mb-1 block text-sm font-medium">Password</label>
        <input
          type="password"
          {...register("password")}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />
        {errors.password && (
          <p className="mt-1 text-xs text-red-500">{errors.password.message}</p>
        )}
      </div>

      <div className="text-right">
        <Link
          to="/forgot-password"
          className="text-sm text-primary hover:underline"
        >
          Forgot password?
        </Link>
      </div>

      {errorMessage && <p className="text-sm text-red-500">{errorMessage}</p>}
      <button
  type="submit"
  disabled={isSubmitting}
  className="w-full rounded-md bg-primary py-2 text-primary-foreground cursor-pointer transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
>
  {isSubmitting ? "Logging in..." : "Login"}
</button>
    </form>
  )
}
