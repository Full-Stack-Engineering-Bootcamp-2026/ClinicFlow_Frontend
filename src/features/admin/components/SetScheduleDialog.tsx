import { useMemo, useState } from "react"

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { Input } from "@/components/ui/input"

import type { DoctorSchedule, LeaveException } from "../types/schedule.types"

interface SetScheduleDialogProps {
  schedules: DoctorSchedule[]

  onApplyLeave: (doctorName: string, leave: LeaveException) => void

  // OPTIONAL
  preselectedDoctorName?: string

  hideSearch?: boolean

  trigger?: React.ReactNode
}

export default function SetScheduleDialog({
  schedules,
  onApplyLeave,
  preselectedDoctorName,
  hideSearch = false,
  trigger,
}: SetScheduleDialogProps) {
  const [search, setSearch] = useState("")

  const [selectedDoctor, setSelectedDoctor] = useState(
    preselectedDoctorName || ""
  )

  const [exceptionDate, setExceptionDate] = useState("")

  const [reason, setReason] = useState("")

  // UNIQUE DOCTORS
  const doctors = useMemo(() => {
    return Array.from(new Set(schedules.map((schedule) => schedule.doctorName)))
  }, [schedules])

  // FILTERED DOCTORS
  const filteredDoctors = doctors.filter((doctor) =>
    doctor.toLowerCase().includes(search.toLowerCase())
  )

  // CURRENT DOCTOR WEEKLY SCHEDULE
  const currentDoctorSchedules = schedules.filter(
    (schedule) => schedule.doctorName === selectedDoctor
  )

  const handleApply = () => {
    if (!selectedDoctor || !exceptionDate) {
      return
    }

    onApplyLeave(selectedDoctor, {
      id: Date.now(),

      doctorScheduleId: 0,

      exceptionDate,

      reason,
    })

    setSearch("")
    setSelectedDoctor("")
    setExceptionDate("")
    setReason("")
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        {trigger || <Button className="gap-2">Set Schedule</Button>}
      </DialogTrigger>

      <DialogContent className="max-h-[90vh] max-w-lg overflow-y-auto">
        <DialogHeader>
          <DialogTitle>Apply Doctor Leave</DialogTitle>
        </DialogHeader>

        <div className="space-y-5 pt-2">
          {!hideSearch && (
  <>
    {/* SEARCH */}
    <div className="space-y-2">
      <label className="text-sm font-medium">
        Search Doctor
      </label>

      <Input
        placeholder="Search doctor name..."
        value={search}
        onChange={(e) =>
          setSearch(
            e.target.value
          )
        }
      />
    </div>

    {/* SEARCH RESULTS */}
    {search && (
      <div className="max-h-40 overflow-y-auto rounded-lg border border-border">
        {filteredDoctors.map(
          (doctor) => (
            <button
              key={doctor}
              type="button"
              onClick={() => {
                setSelectedDoctor(
                  doctor
                )

                setSearch("")
              }}
              className="w-full border-b border-border px-4 py-3 text-left text-sm transition-colors last:border-0 hover:bg-muted"
            >
              {doctor}
            </button>
          )
        )}
      </div>
    )}
  </>
)}

          {/* DOCTOR SCHEDULE */}
          {selectedDoctor && (
            <div className="space-y-4 rounded-xl border border-border p-4">
              <div>
                <p className="font-semibold">{selectedDoctor}</p>

                <p className="text-sm text-muted-foreground">
                  Weekly recurring schedule
                </p>
              </div>

              <div className="flex flex-wrap gap-3">
                {currentDoctorSchedules.map((schedule) => (
                  <div
                    key={schedule.id}
                    className="rounded-lg border border-primary/20 bg-primary/5 px-4 py-3"
                  >
                    <p className="text-sm font-semibold text-primary">
                      {schedule.dayOfWeek}
                    </p>

                    <p className="mt-1 text-xs text-muted-foreground">
                      {schedule.startTime} - {schedule.endTime}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* DATE */}
          {selectedDoctor && (
            <div className="space-y-5 rounded-xl border border-border p-4">
              <div className="space-y-2">
                <label className="text-sm font-medium">Leave Date</label>

                <input
                  type="date"
                  value={exceptionDate}
                  onChange={(e) => setExceptionDate(e.target.value)}
                  className="h-10 w-full rounded-md border border-input bg-background px-3"
                />
              </div>

              <div className="space-y-2">
                <label className="text-sm font-medium">Reason</label>

                <textarea
                  rows={4}
                  value={reason}
                  onChange={(e) => setReason(e.target.value)}
                  className="w-full rounded-md border border-input bg-background p-3 text-sm"
                  placeholder="Doctor personal leave"
                />
              </div>
            </div>
          )}

          {/* FOOTER */}
          <div className="flex justify-end gap-3">
            <Button
              variant="outline"
              onClick={() => {
                setSearch("")
                setSelectedDoctor("")
                setExceptionDate("")
                setReason("")
              }}
            >
              Cancel
            </Button>

            <Button
              disabled={!selectedDoctor || !exceptionDate}
              onClick={handleApply}
            >
              Apply Leave
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
