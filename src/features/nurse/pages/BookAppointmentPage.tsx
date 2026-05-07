import PatientSearchCard from "../components/PatientSearchCard"
import PatientCard from "../components/PatientCard"
import AppointmentDetailsCard from "../components/AppointmentDetailsCard"
import BookingSummaryCard from "../components/BookingSummaryCard"
import { useState } from "react"

export default function BookAppointmentPage() {
  const [searchTerm, setSearchTerm] = useState("")
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
      id: 4,
      fullName: "Sophia Turner",
      patientId: "P-1026",
      phoneNumber: "+91 9123456780",
      isReturning: false,
    },
    {
      id: 5,
      fullName: "David Beckham",
      patientId: "P-1027",
      phoneNumber: "+91 9988123456",
      isReturning: true,
    },
    {
      id: 6,
      fullName: "Olivia Brown",
      patientId: "P-1028",
      phoneNumber: "+91 9876541230",
      isReturning: false,
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

        <AppointmentDetailsCard />
      </div>

      <div className="lg:col-span-4">
        <div className="lg:sticky lg:top-4">
          <BookingSummaryCard />
        </div>
      </div>
    </div>
  )
}
