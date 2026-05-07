import PatientSearchCard from "../components/PatientSearchCard"
import PatientCard from "../components/PatientCard"
import AppointmentDetailsCard from "../components/AppointmentDetailsCard"
import BookingSummaryCard from "../components/BookingSummaryCard"
import { useEffect, useState } from "react"
import type { Doctor } from "../types"

export default function BookAppointmentPage() {
  const [searchTerm, setSearchTerm] = useState("")

  const [doctor, setDoctor] = useState("")

  const [visitType, setVisitType] = useState("")

  const [appointmentDate, setAppointmentDate] = useState("")

  const [doctors, setDoctors] = useState<Doctor[]>([])

  useEffect(() => {
    setDoctors([
      {
        id: "1",
        name: "Dr. John Smith",
      },
      {
        id: "2",
        name: "Dr. Sarah Williams",
      },
      {
        id: "3",
        name: "Dr. Michael Jones",
      },
      
    ])
  }, [])
  const patients = [
    {
      id: 1,
      fullName: "John Robertson",
      patientId: "P-1023",
      phoneNumber: "+91 9876543210",
      isReturning: true,
    },
    {
      id: 2,
      fullName: "Emma Watson",
      patientId: "P-1024",
      phoneNumber: "+91 9988776655",
      isReturning: false,
    },
    {
      id: 3,
      fullName: "Michael Jordan",
      patientId: "P-1025",
      phoneNumber: "+91 9871234567",
      isReturning: true,
    },
    {
      id: 1,
      fullName: "John Robertson",
      patientId: "P-1023",
      phoneNumber: "+91 9876543210",
      isReturning: true,
    },
    {
      id: 2,
      fullName: "Emma Watson",
      patientId: "P-1024",
      phoneNumber: "+91 9988776655",
      isReturning: false,
    },
    {
      id: 3,
      fullName: "Michael Jordan",
      patientId: "P-1025",
      phoneNumber: "+91 9871234567",
      isReturning: true,
    },
  ]
  return (
    <div className="grid grid-cols-1 gap-6 lg:grid-cols-12">
      <div className="space-y-6 lg:col-span-8">
        <PatientSearchCard value={searchTerm} onChange={setSearchTerm} />

        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
          {patients.map((patient, index) => (
            <PatientCard
              key={patient.id}
              fullName={patient.fullName}
              patientId={patient.patientId}
              phoneNumber={patient.phoneNumber}
              isReturning={patient.isReturning}
              selected={index === 1}
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
            patientName="Emma Watson"
            patientId="P-1024"
            doctorName="Dr. Sarah Williams"
            visitType="Standard Consultation"
            appointmentDate="2026-05-08"
          />
        </div>
      </div>
    </div>
  )
}
