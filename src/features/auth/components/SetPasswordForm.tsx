import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

import { z } from "zod"

import { useState } from "react"

import {
  useNavigate,
  useSearchParams,
} from "react-router-dom"

import {
  ArrowRight,
  ShieldCheck,
} from "lucide-react"

import { resetPasswordApi } from "../services/authApi"

const setPasswordSchema = z
  .object({
    newPassword: z
      .string()
      .min(
        6,
        "New password must be at least 6 characters"
      ),

    confirmPassword: z
      .string()
      .min(
        6,
        "Confirm your password"
      ),
  })
  .refine(
    (data) =>
      data.newPassword ===
      data.confirmPassword,
    {
      message:
        "Passwords do not match",

      path: ["confirmPassword"],
    }
  )

type SetPasswordFormData = z.infer<
  typeof setPasswordSchema
>

export default function SetPasswordForm() {
  const navigate = useNavigate()

  const [searchParams] =
    useSearchParams()

  const token =
    searchParams.get("token") || ""

  const [isSubmitting, setIsSubmitting] =
    useState(false)

  const [successMessage, setSuccessMessage] =
    useState("")

  const [errorMessage, setErrorMessage] =
    useState("")

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<SetPasswordFormData>({
    resolver: zodResolver(
      setPasswordSchema
    ),
  })

  const onSubmit = async (
    data: SetPasswordFormData
  ) => {
    try {
      setIsSubmitting(true)

      setErrorMessage("")

      await resetPasswordApi(
        token,
        data.newPassword
      )

      setSuccessMessage(
        "Password set successfully. Redirecting to login..."
      )

      setTimeout(() => {
        navigate("/login")
      }, 2000)
    } catch (error) {
      if (error instanceof Error) {
        setErrorMessage(
          error.message
        )
      } else {
        setErrorMessage(
          "Failed to set password"
        )
      }
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="space-y-4"
    >
      <div>
        <label className="mb-1 block text-sm font-medium">
          New Password
        </label>

        <input
          type="password"
          {...register(
            "newPassword"
          )}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />

        {errors.newPassword && (
          <p className="mt-1 text-xs text-red-500">
            {
              errors.newPassword
                .message
            }
          </p>
        )}
      </div>

      <div>
        <label className="mb-1 block text-sm font-medium">
          Confirm Password
        </label>

        <input
          type="password"
          {...register(
            "confirmPassword"
          )}
          className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
        />

        {errors.confirmPassword && (
          <p className="mt-1 text-xs text-red-500">
            {
              errors
                .confirmPassword
                .message
            }
          </p>
        )}
      </div>

      {successMessage && (
        <p className="text-sm text-green-600">
          {successMessage}
        </p>
      )}

      {errorMessage && (
        <p className="text-sm text-red-500">
          {errorMessage}
        </p>
      )}

      <button
        type="submit"
        disabled={isSubmitting}
        className="flex w-full cursor-pointer items-center justify-center gap-2 rounded-md bg-primary py-2 text-primary-foreground transition hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? (
          "Setting Password..."
        ) : (
          <>
            Set Password and Continue

            <ArrowRight className="h-4 w-4" />
          </>
        )}
      </button>

      <div className="flex items-center justify-center gap-2 pt-2">
        <ShieldCheck className="h-4 w-4 text-[#006c4e]" />

        <p className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
          HIPAA Compliant Encryption
        </p>
      </div>
    </form>
  )
}