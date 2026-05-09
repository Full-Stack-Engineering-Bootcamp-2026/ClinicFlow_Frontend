import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

import type { AppointmentDetailsCardProps } from "../types"

export default function AppointmentDetailsCard({
  doctors,
  doctor,
  onDoctorChange,
  visitType,
  onVisitTypeChange,
  appointmentDate,
  onAppointmentDateChange,
}: AppointmentDetailsCardProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Appointment Details</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Select appointment details
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
        <div>
          <label className="mb-1 block text-sm font-medium">
            Assign Doctor
          </label>

          <Select value={doctor} onValueChange={onDoctorChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select Doctor" />
            </SelectTrigger>

            <SelectContent>
              {doctors.map((doctor) => (
                <SelectItem
                  key={doctor.doctorId}
                  value={doctor.doctorId.toString()}
                >
                  {doctor.fullName} • {doctor.specialization}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div>
          <label className="mb-1 block text-sm font-medium">Visit Type</label>

          <Select value={visitType} onValueChange={onVisitTypeChange}>
            <SelectTrigger className="w-full bg-background">
              <SelectValue placeholder="Select Visit Type" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="STANDARD">Standard Consultation</SelectItem>

              <SelectItem value="URGENT">Urgent</SelectItem>

              <SelectItem value="FOLLOW_UP">Follow Up</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="md:col-span-2">
          <label className="mb-1 block text-sm font-medium">
            Appointment Date
          </label>

          <input
            type="date"
            min={new Date().toISOString().split("T")[0]}
            value={appointmentDate}
            onChange={(e) => onAppointmentDateChange(e.target.value)}
            className="w-full rounded-md border border-border bg-background px-3 py-2 text-sm"
          />
        </div>
      </div>
    </div>
  )
}
