import { Button } from "@/components/ui/button"

import type { BookingSummaryCardProps } from "../types"

export default function BookingSummaryCard({
  patientName,
  patientId,
  doctorName,
  visitType,
  appointmentDate,
  onConfirm,
  onCancel,
  isBooking = false,
}: BookingSummaryCardProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <div className="mb-6">
        <h2 className="text-lg font-semibold">Booking Summary</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Review appointment details
        </p>
      </div>

      <div className="space-y-4">
        <div>
          <p className="text-xs text-muted-foreground">Patient</p>

          <p className="text-sm font-medium">{patientName || "-"}</p>

          <p className="text-xs text-muted-foreground">{patientId || "-"}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Practitioner</p>

          <p className="text-sm font-medium">{doctorName || "-"}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Visit Type</p>

          <p className="text-sm font-medium">{visitType || "-"}</p>
        </div>

        <div>
          <p className="text-xs text-muted-foreground">Appointment Date</p>

          <p className="text-sm font-medium">{appointmentDate || "-"}</p>
        </div>
      </div>

      <div className="mt-8 space-y-3">
        <Button
          onClick={onConfirm}
          className="w-full cursor-pointer"
          disabled={isBooking}
        >
          {isBooking ? "Booking..." : "Confirm Booking"}
        </Button>

        <Button
          variant="outline"
          onClick={onCancel}
          className="w-full cursor-pointer"
          disabled={isBooking}
        >
          Cancel
        </Button>
      </div>
    </div>
  )
}
