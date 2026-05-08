import { useMemo, useState } from "react"
import SetScheduleDialog from "../components/SetScheduleDialog"
import {
  CalendarDays,
  Download,
} from "lucide-react"
import type { LeaveException } from "../types/schedule.types"
import { Button } from "@/components/ui/button"

import ScheduleFilters from "../components/ScheduleFilters"
import ScheduleTable from "../components/ScheduleTable"

import { doctorSchedules as initialSchedules } from "../mock/schedule.mock"

export default function ManageSchedulePage() {
    const [doctorSchedules, setDoctorSchedules] =
  useState(initialSchedules)

  const handleApplyLeave = (
  doctorName: string,
  leave: LeaveException
) => {
  setDoctorSchedules((prev) =>
    prev.map((schedule) => {
      // derive weekday from selected leave date
      const leaveDay =
        new Date(
          leave.exceptionDate
        )
          .toLocaleDateString("en-US", {
            weekday: "short",
          })
          .toUpperCase()
          .slice(0, 3)

      // apply leave only to matching weekday row
      if (
        schedule.doctorName ===
          doctorName &&
        schedule.dayOfWeek === leaveDay
      ) {
        return {
          ...schedule,

          leaveExceptions: [
            ...schedule.leaveExceptions,
            leave,
          ],
        }
      }

      return schedule
    })
  )
}
  const [
    selectedSpecialization,
    setSelectedSpecialization,
  ] = useState("")

  const [
    selectedStatus,
    setSelectedStatus,
  ] = useState("Working")

  const [currentPage, setCurrentPage] =
    useState(1)

  const itemsPerPage = 2

  const filteredSchedules = useMemo(() => {
    let filtered = doctorSchedules

    if (selectedSpecialization) {
      filtered = filtered.filter(
        (doctor) =>
          doctor.specialization ===
          selectedSpecialization
      )
    }

    return filtered
  }, [selectedSpecialization])

  // PAGINATION
  const totalPages = Math.ceil(
    filteredSchedules.length / itemsPerPage
  )

  const paginatedSchedules =
    filteredSchedules.slice(
      (currentPage - 1) * itemsPerPage,
      currentPage * itemsPerPage
    )

  return (
    <div className="space-y-8 p-6">
      {/* HEADER */}
      <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
        <div>
          <p className="text-sm text-muted-foreground">
            Admin / Doctor Schedules
          </p>

          <h1 className="text-3xl font-bold tracking-tight">
            Doctor Schedules
          </h1>
        </div>

        <SetScheduleDialog
  schedules={doctorSchedules}
  onApplyLeave={handleApplyLeave}
/>
      </div>

      {/* STATS */}
      <div className="grid gap-4 md:grid-cols-3">
        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Active Clinicians
          </p>

          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-4xl font-bold">
              24
            </h2>

            <span className="rounded-md bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
              +2
            </span>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            Queue Capacity Today
          </p>

          <h2 className="mt-3 text-4xl font-bold">
            320
          </h2>
        </div>

        <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
          <p className="text-xs uppercase tracking-wide text-muted-foreground">
            On Leave This Week
          </p>

          <div className="mt-3 flex items-center gap-3">
            <h2 className="text-4xl font-bold">
              3
            </h2>

            <span className="rounded-md bg-amber-500/10 px-2 py-1 text-xs font-medium text-amber-600">
              Upcoming
            </span>
          </div>
        </div>
      </div>

      {/* TABLE SECTION */}
      <div className="space-y-5 rounded-2xl border border-border bg-card p-5 shadow-sm">
        <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
          <ScheduleFilters
            selectedSpecialization={
              selectedSpecialization
            }
            selectedStatus={selectedStatus}
            onSpecializationChange={
              setSelectedSpecialization
            }
            onStatusChange={
              setSelectedStatus
            }
          />

          <Button
            variant="ghost"
            size="icon"
          >
            <Download className="h-5 w-5" />
          </Button>
        </div>

        <ScheduleTable
  schedules={paginatedSchedules}
  currentPage={currentPage}
  totalPages={totalPages}
  onPageChange={setCurrentPage}
  onApplyLeave={handleApplyLeave}
/>
      </div>

      {/* LOWER CARDS */}
      <div className="grid gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="rounded-2xl bg-primary p-8 text-primary-foreground shadow-sm">
          <h2 className="text-3xl font-bold">
            Automated Optimization
          </h2>

          <p className="mt-4 max-w-lg text-primary-foreground/80">
            Queue availability automatically adjusts
            based on real-time check-ins and doctor
            speed averages.
          </p>

          <div className="mt-8 flex gap-4">
            <Button variant="secondary">
              Review Analytics
            </Button>

            <Button variant="outline">
              Learn More
            </Button>
          </div>
        </div>

        <div className="rounded-2xl border border-border bg-card p-6 shadow-sm">
          <h3 className="text-xl font-semibold">
            Queue Alerts
          </h3>

          <p className="mt-4 text-muted-foreground">
            No critical overlaps detected for the
            upcoming 7 days.
          </p>

          <div className="mt-6 rounded-lg bg-muted p-3 text-sm font-medium text-primary">
            Status: Optimized
          </div>
        </div>
      </div>
    </div>
  )
}