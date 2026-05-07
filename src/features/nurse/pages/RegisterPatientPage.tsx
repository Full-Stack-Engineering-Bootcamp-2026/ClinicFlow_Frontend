import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Check, X } from "lucide-react"
import RegisterPatientForm from "../components/RegisterPatientForm"

import type { RegisterPatientFormData } from "../types"

export default function RegisterPatientPage() {
  const navigate = useNavigate()

  const [successMessage, setSuccessMessage] = useState("")

  const [errorMessage, setErrorMessage] = useState("")

  const handleRegisterPatient = (data: RegisterPatientFormData) => {
    console.log(data)

    setErrorMessage("")

    setSuccessMessage("Patient registered successfully")
  }

  return (
    <div className="mx-auto max-w-4xl space-y-4">
      {(successMessage || errorMessage) && (
        <div
          className={`flex items-center justify-between rounded-2xl p-4 shadow-sm ${
            successMessage ? "bg-[#ddf9f3]" : "bg-red-50"
          }`}
        >
          <div className="flex items-center gap-3">
            <div
              className={`flex h-9 w-9 items-center justify-center rounded-full ${
                successMessage ? "bg-[#006c4e]" : "bg-red-500"
              }`}
            >
              {successMessage ? (
                <Check className="h-5 w-5 text-white" />
              ) : (
                <X className="h-5 w-5 text-white" />
              )}
            </div>

            <div>
              {successMessage && (
                <p className="text-sm font-medium text-[#006c4e]">
                  {successMessage}
                </p>
              )}

              {errorMessage && (
                <p className="text-sm font-medium text-red-600">
                  {errorMessage}
                </p>
              )}
            </div>
          </div>

          {successMessage && (
            <button
              onClick={() => navigate("/nurse/book-appointment")}
              className="rounded-md bg-primary px-4 py-2 text-sm text-primary-foreground cursor-pointer transition hover:opacity-90"
            >
              Book Appointment
            </button>
          )}
        </div>
      )}

      <div className="rounded-2xl bg-card p-6 shadow-sm">
        <div className="mb-6">
          <h1 className="text-2xl font-semibold">Patient Information</h1>

          <p className="mt-1 text-sm text-muted-foreground">
            Fields marked with * are mandatory
          </p>
        </div>

        <RegisterPatientForm onSubmit={handleRegisterPatient} />
      </div>
    </div>
  )
}
