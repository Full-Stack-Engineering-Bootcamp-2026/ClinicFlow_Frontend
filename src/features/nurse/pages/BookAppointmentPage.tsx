import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { X } from "lucide-react"
import type { RootState } from "@/app/store"
import PatientSearchCard from "../components/PatientSearchCard"
import PatientCard from "../components/PatientCard"
import AppointmentDetailsCard from "../components/AppointmentDetailsCard"
import BookingSummaryCard from "../components/BookingSummaryCard"
import AppointmentSuccessDialog from "../components/AppointmentSuccessDialog"
import { useNavigate } from "react-router-dom"

import {
  getActiveDoctorsApi,
  searchPatientsApi,
  bookAppointmentApi,
} from "../services/nurseApi"

import type {
  BookAppointmentResponse,
  Doctor,
  PatientSearchResult,
} from "../types"

export default function BookAppointmentPage() {
  const navigate = useNavigate()

  const [searchTerm, setSearchTerm] = useState("")
  const [doctor, setDoctor] = useState("")
  const [visitType, setVisitType] = useState("")
  const [appointmentDate, setAppointmentDate] = useState("")
  const [doctors, setDoctors] = useState<Doctor[]>([])
  const [openSuccessDialog, setOpenSuccessDialog] = useState(false)
  const [bookingError, setBookingError] = useState("")
  const [patients, setPatients] = useState<PatientSearchResult[]>([])
  const [isSearching, setIsSearching] = useState(false)
  const [isBooking, setIsBooking] = useState(false)
  const [bookingData, setBookingData] =
    useState<BookAppointmentResponse | null>(null)

  const [selectedPatient, setSelectedPatient] =
    useState<PatientSearchResult | null>(null)

  const token = useSelector((state: RootState) => state.auth.token)

  const selectedDoctor = doctors.find(
    (doc) => doc.doctorId.toString() === doctor
  )

  const handleConfirmBooking = async () => {
    if (!selectedPatient) {
      setBookingError("Please select a patient")

      return
    }

    if (!doctor || !visitType || !appointmentDate) {
      setBookingError("Please complete appointment details")

      return
    }

    try {
      setIsBooking(true)

      setBookingError("")

      const response = await bookAppointmentApi(token!, {
        doctorId: Number(doctor),

        patientId: selectedPatient.patientId,

        patientName: selectedPatient.fullName,

        patientPhone: selectedPatient.mobile,

        appointmentDate,

        visitType,

        notes: "",
      })

      setBookingData(response)

      setOpenSuccessDialog(true)
    } catch (error) {
      if (error instanceof Error) {
        setBookingError(error.message)
      } else {
        setBookingError("Failed to book appointment")
      }
    } finally {
      setIsBooking(false)
    }
  }

  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        const data = await getActiveDoctorsApi(token!)

        setDoctors(data)
      } catch (error) {
        console.error(error)
      }
    }

    if (token) {
      fetchDoctors()
    }
  }, [token])

  useEffect(() => {
    if (!searchTerm.trim()) {
      setPatients([])

      return
    }

    const timeoutId = setTimeout(async () => {
      try {
        setIsSearching(true)

        const data = await searchPatientsApi(token!, searchTerm)

        setPatients(data)
      } catch (error) {
        console.error(error)
      } finally {
        setIsSearching(false)
      }
    }, 500)

    return () => clearTimeout(timeoutId)
  }, [searchTerm, token])

  const handleCancelBooking = () => {
    setSearchTerm("")
    setPatients([])
    setSelectedPatient(null)
    setDoctor("")
    setVisitType("")
    setAppointmentDate("")
    setBookingError("")
  }
  return (
    <>
      {bookingError && (
        <div className="mb-4 rounded-2xl bg-red-50 p-4 shadow-sm">
          <div className="flex items-center gap-3">
            <div className="flex h-9 w-9 items-center justify-center rounded-full bg-red-500">
              <X className="h-5 w-5 text-white" />
            </div>

            <p className="text-sm font-medium text-red-600">{bookingError}</p>
          </div>
        </div>
      )}

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
        <div className="space-y-6 lg:col-span-8">
          <PatientSearchCard value={searchTerm} onChange={setSearchTerm} />

          {isSearching && (
            <p className="text-sm text-muted-foreground">
              Searching patients...
            </p>
          )}

          {!isSearching && searchTerm && patients.length === 0 && (
            <p className="text-sm text-muted-foreground">No patients found</p>
          )}

          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
            {patients.map((patient) => (
              <PatientCard
                key={patient.patientId}
                fullName={patient.fullName}
                patientId={`P-${patient.patientId}`}
                phoneNumber={patient.mobile}
                isReturning={patient.patientType === "REGULAR"}
                selected={selectedPatient?.patientId === patient.patientId}
                onSelect={() => setSelectedPatient(patient)}
              />
            ))}
          </div>

          <AppointmentDetailsCard
            doctor={doctor}
            onDoctorChange={setDoctor}
            visitType={visitType}
            onVisitTypeChange={setVisitType}
            appointmentDate={appointmentDate}
            onAppointmentDateChange={setAppointmentDate}
            doctors={doctors}
          />
        </div>

        <div className="lg:col-span-4">
          <div className="lg:sticky lg:top-4">
            <BookingSummaryCard
              patientName={selectedPatient?.fullName || "-"}
              patientId={
                selectedPatient ? `P-${selectedPatient.patientId}` : "-"
              }
              doctorName={selectedDoctor?.fullName || "-"}
              visitType={visitType || "-"}
              appointmentDate={appointmentDate || "-"}
              onConfirm={handleConfirmBooking}
              onCancel={handleCancelBooking}
              isBooking={isBooking}
            />
          </div>
        </div>
      </div>

      <AppointmentSuccessDialog
        open={openSuccessDialog}
        onOpenChange={setOpenSuccessDialog}
        queueNumber={bookingData?.queueLabel || ""}
        appointmentId={bookingData?.appointmentId?.toString() || ""}
        patientName={bookingData?.patientName || ""}
        doctorName={bookingData?.doctorName || ""}
        appointmentDate={bookingData?.appointmentDate || ""}
        visitType={visitType}
        onGoToQueue={() => {
          setOpenSuccessDialog(false)
          navigate("/nurse/live-queue")
        }}
      />
    </>
  )
}
