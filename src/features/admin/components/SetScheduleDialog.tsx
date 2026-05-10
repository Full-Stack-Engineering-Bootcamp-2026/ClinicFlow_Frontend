import { useEffect, useMemo, useState } from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { useDebounce } from "../hooks/use-debounce"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
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
  weekStart: string
  trigger?: React.ReactNode
  isSaving?: boolean
  onChangeSchedule: (
    payload: ChangeDoctorScheduleRequest
  ) => Promise<void>
}

export default function SetScheduleDialog({
  doctors,
  weekStart,
  trigger,
  isSaving = false,
  onChangeSchedule,
}: SetScheduleDialogProps) {
  const [open, setOpen] = useState(false)
  const [search, setSearch] = useState("")
  const [selectedDoctorId, setSelectedDoctorId] = useState<number | null>(null)
  const [date, setDate] = useState("")
  const [dates, setDates] = useState<string[]>([])
  const [maxAppointments, setMaxAppointments] = useState("")
  const [reason, setReason] = useState("")
  const debouncedSearch = useDebounce(search)

  const selectedDoctor = doctors.find(
    (doctor) => doctor.doctorId === selectedDoctorId
  )

  const filteredDoctors = useMemo(
    () => {
      const searchTerm = debouncedSearch.trim().toLowerCase()

      if (!searchTerm) {
        return []
      }

      return doctors.filter((doctor) =>
        doctor.doctorName.toLowerCase().includes(debouncedSearch.toLowerCase())
      )
    },
    [debouncedSearch, doctors]
  )

  useEffect(() => {
    if (!selectedDoctor) {
      setMaxAppointments("")
      return
    }

    setMaxAppointments(String(selectedDoctor.maxAppointments))
  }, [selectedDoctor])

  const addDate = () => {
    if (!date || dates.includes(date)) return

    setDates((current) => [...current, date].sort())
    setDate("")
  }

  const formatDate = (dateValue: Date) => {
    const year = dateValue.getFullYear()
    const month = String(dateValue.getMonth() + 1).padStart(2, "0")
    const day = String(dateValue.getDate()).padStart(2, "0")

    return `${year}-${month}-${day}`
  }

  const setWorkingWeekDates = () => {
    if (!selectedDoctor) return

    const weekDayIndexes: Record<string, number> = {
      MON: 0,
      TUE: 1,
      WED: 2,
      THU: 3,
      FRI: 4,
      SAT: 5,
      SUN: 6,
    }

    const monday = new Date(`${weekStart}T00:00:00`)
    const nextDates = selectedDoctor.workingDays
      .map((day) => weekDayIndexes[day])
      .filter((index): index is number => index !== undefined)
      .map((index) => {
        const nextDate = new Date(monday)
        nextDate.setDate(monday.getDate() + index)
        return formatDate(nextDate)
      })
      .sort()

    setDates(nextDates)
  }

  const reset = () => {
    setSearch("")
    setSelectedDoctorId(null)
    setDate("")
    setDates([])
    setMaxAppointments("")
    setReason("")
  }

  const handleSubmit = async () => {
    const parsedMaxAppointments = Number(maxAppointments)

    if (
      !selectedDoctor ||
      dates.length === 0 ||
      !Number.isInteger(parsedMaxAppointments) ||
      parsedMaxAppointments < 1
    ) {
      return
    }

    await onChangeSchedule({
      doctorId: selectedDoctor.doctorId,
      dates,
      startTime: "09:00",
      endTime: "17:00",
      maxAppointments: parsedMaxAppointments,
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
              className="h-9 rounded-lg"
            />
          </div>

          {debouncedSearch.trim() && (
            <div className="space-y-2">
              <label className="text-sm font-medium">Select Doctor</label>
              <Select
                value={selectedDoctorId ? String(selectedDoctorId) : ""}
                onValueChange={(value) => {
                  setSelectedDoctorId(Number(value))
                  setSearch("")
                }}
              >
                <SelectTrigger className="h-9 w-full bg-background">
                  <SelectValue placeholder="Select Doctor" />
                </SelectTrigger>

                <SelectContent>
                  {filteredDoctors.length === 0 ? (
                    <SelectItem value="no-doctors" disabled>
                      No doctors found
                    </SelectItem>
                  ) : (
                    filteredDoctors.map((doctor) => (
                      <SelectItem
                        key={doctor.doctorId}
                        value={String(doctor.doctorId)}
                      >
                        {doctor.doctorName} - {doctor.specialization}
                      </SelectItem>
                    ))
                  )}
                </SelectContent>
              </Select>
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
              <div className="space-y-2">
                <label className="text-sm font-medium">
                  Max Appointments
                </label>
                <Input
                  type="number"
                  min={1}
                  step={1}
                  value={maxAppointments}
                  onChange={(event) =>
                    setMaxAppointments(event.target.value)
                  }
                  placeholder="Enter appointment capacity"
                  className="h-9 rounded-lg"
                />
              </div>

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

              <Button
                type="button"
                variant="outline"
                disabled={selectedDoctor.workingDays.length === 0}
                onClick={setWorkingWeekDates}
              >
                Apply To Working Week
              </Button>

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
              disabled={
                !selectedDoctor ||
                dates.length === 0 ||
                !maxAppointments ||
                Number(maxAppointments) < 1 ||
                isSaving
              }
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