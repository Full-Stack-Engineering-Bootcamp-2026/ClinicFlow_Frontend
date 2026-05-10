import { useSelector } from "react-redux"
import { CalendarDays } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { RootState } from "@/app/store"
import AdminPagination from "../components/AdminPagination"
import SetScheduleDialog from "../components/SetScheduleDialog"
import ScheduleFilters from "../components/ScheduleFilters"
import ScheduleTable from "../components/ScheduleTable"
import { useDoctorSchedules } from "../hooks/useDoctorSchedule"

const statCards = [
  {
    key: "activeClinicians",
    label: "Active Clinicians",
  },
  {
    key: "queueCapacityToday",
    label: "Queue Capacity Today",
  },
  {
    key: "onLeaveThisWeek",
    label: "On Leave This Week",
  },
] as const

export default function ManageSchedulePage() {
  const token = useSelector((state: RootState) => state.auth.token)
  const {
    weekStart,
    filters,
    updateFilters,
    schedules,
    allDoctors,
    schedulePage,
    stats,
    specializations,
    isLoading,
    isSaving,
    error,
    changeSchedule,
    applyLeave,
  } = useDoctorSchedules(token)

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <SetScheduleDialog
          doctors={allDoctors}
          weekStart={weekStart}
          isSaving={isSaving}
          onChangeSchedule={changeSchedule}
          trigger={
            <Button>
              <CalendarDays />
              Set Schedule
            </Button>
          }
        />
      </div>

      <div className="grid gap-3 md:grid-cols-3">
        {statCards.map((card) => (
          <div
            key={card.key}
            className="rounded-lg border border-border bg-card p-3 shadow-sm"
          >
            <p className="text-xs text-muted-foreground uppercase">
              {card.label}
            </p>

            <p className="mt-2 text-2xl font-bold">{stats?.[card.key] ?? 0}</p>
          </div>
        ))}
      </div>

      <div className="space-y-4 rounded-lg border border-border bg-card p-4 shadow-sm">
        <div className="flex flex-col gap-3 lg:flex-row lg:items-center lg:justify-between">
          <ScheduleFilters
            specializations={specializations}
            selectedSpecialization={filters.specialization}
            selectedStatus={filters.status}
            onSpecializationChange={(specialization) =>
              updateFilters({ specialization })
            }
            onStatusChange={(status) => updateFilters({ status })}
          />
        </div>

        {error && (
          <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
            {error}
          </div>
        )}

        <ScheduleTable
          schedules={schedules}
          isLoading={isLoading}
          isSaving={isSaving}
          onApplyLeave={applyLeave}
        />

        {schedulePage && (
          <AdminPagination
            currentPage={schedulePage.number}
            totalPages={schedulePage.totalPages}
            isLoading={isLoading}
            onPageChange={(page) => updateFilters({ page })}
          />
        )}
      </div>
    </div>
  )
}
