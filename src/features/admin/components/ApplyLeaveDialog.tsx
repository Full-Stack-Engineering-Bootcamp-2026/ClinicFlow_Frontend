import { useState } from "react"

import { Button } from "@/components/ui/button"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type {
  AdminDoctorScheduleRow,
  ApplyLeaveRequest,
} from "../types/schedule.types"

interface ApplyLeaveDialogProps {
  doctor: AdminDoctorScheduleRow
  trigger: React.ReactNode
  isSaving?: boolean
  onApplyLeave: (payload: ApplyLeaveRequest) => Promise<void>
}

export default function ApplyLeaveDialog({
  doctor,
  trigger,
  isSaving = false,
  onApplyLeave,
}: ApplyLeaveDialogProps) {
  const [open, setOpen] = useState(false)
  const [date, setDate] = useState("")
  const [reason, setReason] = useState("")

  const handleSubmit = async () => {
    await onApplyLeave({
      doctorId: doctor.doctorId,
      date,
      reason: reason.trim() || undefined,
    })

    setDate("")
    setReason("")
    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>{trigger}</DialogTrigger>

      <DialogContent>
        <DialogHeader>
          <DialogTitle>Apply Leave</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div>
            <p className="font-medium">{doctor.doctorName}</p>
            <p className="text-sm text-muted-foreground">
              {doctor.specialization}
            </p>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Leave Date</label>
            <input
              type="date"
              value={date}
              onChange={(event) => setDate(event.target.value)}
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm"
            />
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">Reason</label>
            <textarea
              rows={3}
              value={reason}
              onChange={(event) => setReason(event.target.value)}
              className="w-full rounded-md border border-input bg-background p-3 text-sm"
              placeholder="Doctor personal leave"
            />
          </div>

          <div className="flex justify-end gap-2">
            <Button
              type="button"
              variant="outline"
              disabled={isSaving}
              onClick={() => setOpen(false)}
            >
              Cancel
            </Button>
            <Button
              type="button"
              disabled={!date || isSaving}
              onClick={handleSubmit}
            >
              {isSaving ? "Applying..." : "Apply Leave"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}