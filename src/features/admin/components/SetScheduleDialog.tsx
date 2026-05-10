import { useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import type {
  AdminDoctorScheduleRow,
  ChangeDoctorScheduleRequest,
} from "../types/schedule.types"

interface SetScheduleDialogProps {
  doctors: AdminDoctorScheduleRow[]
  trigger?: React.ReactNode
  isSaving?: boolean
  onChangeSchedule: (
    payload: ChangeDoctorScheduleRequest
  ) => Promise<void>
}

export default function SetScheduleDialog({
  doctors,
  trigger,
  isSaving = false,
  onChangeSchedule,
}: SetScheduleDialogProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [date, setDate] = useState("")
  const [dates, setDates] = useState<string[]>([])
  const [reason, setReason] = useState("")

  const selectedDoctor = doctors.find(
    (doctor) => doctor.doctorId === selectedDoctorId
  )

  const filteredDoctors = useMemo(
    () =>
      doctors.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(search.toLowerCase())
      ),
    [doctors, search]
  )

  const addDate = () => {
    if (!date || dates.includes(date)) return

    setDates((current) => [...current, date].sort())
    setDate("")
  }

  const reset = () => {
    setSearch("")
    setSelectedDoctorId(null)
    setDate("")
    setDates([])
    setReason("")
  }

  const handleSubmit = async () => {
    if (!selectedDoctor || dates.length === 0) return

    await onChangeSchedule({
      doctorId: selectedDoctor.doctorId,
      dates,
      startTime: "09:00",
      endTime: "17:00",
      maxAppointments: 20,
      reason: reason.trim() || undefined,
    })

    reset()
    setOpen(false)
  }

  return (
    <Dialog
      open={open}
      onOpenChange={(nextOpen) => {
        setOpen(nextOpen)
        if (!nextOpen) reset()
      }}
    >
      <DialogTrigger asChild>
        {trigger || <Button>Set Schedule</Button>}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-xl overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Change Doctor Schedule</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="space-y-2">
            <label className="text-sm font-medium">Search Doctor</label>
            <Input
              value={search}
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search doctor by name"
            />
          </div>

          {search && (
            <div className="max-h-40 overflow-y-auto rounded-md border border-border">
              {filteredDoctors.map((doctor) => (
                <button
                  key={doctor.doctorId}
                  type="button"
                  onClick={() => {
                    setSelectedDoctorId(doctor.doctorId)
                    setSearch("")
                  }}
                  className="w-full border-b border-border px-3 py-2 text-left text-sm last:border-0 hover:bg-muted"
                >
                  {doctor.doctorName}
                  <span className="ml-2 text-xs text-muted-foreground">
                    {doctor.specialization}
                  </span>
                </button>
              ))}
            </div>
          )}

          {selectedDoctor && (
            <div className="rounded-lg border border-border p-3">
              <p className="font-medium">{selectedDoctor.doctorName}</p>
              <p className="text-sm text-muted-foreground">
                Current working days:{" "}
                {selectedDoctor.workingDays.length > 0
                  ? selectedDoctor.workingDays.join(", ")
                  : "No active schedule"}
              </p>
            </div>
          )}

          {selectedDoctor && (
            <div className="space-y-4 rounded-lg border border-border p-3">
              <div className="grid gap-2 sm:grid-cols-[1fr_auto]">
                <input
                  type="date"
                  value={date}
                  onChange={(event) => setDate(event.target.value)}
                  className="h-9 rounded-md border border-input bg-background px-3 text-sm"
                />
                <Button
                  type="button"
                  variant="outline"
                  disabled={!date}
                  onClick={addDate}
                >
                  Add Date
                </Button>
              </div>

              {dates.length > 0 && (
                <div className="flex flex-wrap gap-2">
                  {dates.map((selectedDate) => (
                    <button
                      key={selectedDate}
                      type="button"
                      onClick={() =>
                        setDates((current) =>
                          current.filter((item) => item !== selectedDate)
                        )
                      }
                      className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                    >
                      {selectedDate}
                    </button>
                  ))}
                </div>
              )}

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>
                <textarea
                  rows={3}
                  value={reason}
                  onChange={(event) => setReason(event.target.value)}
                  className="w-full rounded-md border border-input bg-background p-3 text-sm"
                  placeholder="Schedule change reason"
                />
              </div>
            </div>
          )}

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
              disabled={!selectedDoctor || dates.length === 0 || isSaving}
              onClick={handleSubmit}
            >
              {isSaving ? "Changing..." : "Change Schedule"}
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}