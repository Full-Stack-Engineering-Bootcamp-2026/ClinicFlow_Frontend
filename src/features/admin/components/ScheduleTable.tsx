import { CalendarX } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import type {
  AdminDoctorScheduleRow,
  ApplyLeaveRequest,
} from "../types/schedule.types"
import ApplyLeaveDialog from "../components/ApplyLeaveDialog"

const weekDays = ["MON", "TUE", "WED", "THU", "FRI", "SAT", "SUN"]

interface ScheduleTableProps {
  schedules: AdminDoctorScheduleRow[]
  isLoading?: boolean
  isSaving?: boolean
  onApplyLeave: (payload: ApplyLeaveRequest) => Promise<void>
}

export default function ScheduleTable({
  schedules,
  isLoading = false,
  isSaving = false,
  onApplyLeave,
}: ScheduleTableProps) {
  return (
    <Card className="border-border">
      <CardContent className="overflow-x-auto p-0">
        <table className="w-full min-w-[980px]">
          <thead className="border-b bg-muted/40">
            <tr className="text-left text-xs uppercase text-muted-foreground">
              <th className="p-3">Doctor</th>
              <th className="p-3">Days</th>
              <th className="p-3">Time</th>
              <th className="p-3">Capacity</th>
              <th className="p-3">Leave Exceptions</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>
            {isLoading &&
              Array.from({ length: 5 }).map((_, index) => (
                <tr key={index} className="border-b">
                  <td colSpan={6} className="p-3">
                    <div className="h-9 animate-pulse rounded-md bg-muted" />
                  </td>
                </tr>
              ))}

            {!isLoading && schedules.length === 0 && (
              <tr>
                <td
                  colSpan={6}
                  className="p-6 text-center text-sm text-muted-foreground"
                >
                  No doctor schedules found.
                </td>
              </tr>
            )}

            {!isLoading &&
              schedules.map((schedule) => (
                <tr
                  key={schedule.doctorId}
                  className="border-b last:border-0"
                >
                  <td className="p-3">
                    <p className="font-medium">
                      {schedule.doctorName}
                    </p>
                    <p className="text-xs text-muted-foreground">
                      {schedule.specialization}
                    </p>
                  </td>

                  <td className="p-3">
                    <div className="flex flex-wrap gap-1.5">
                      {weekDays.map((day) => {
                        const isWorking =
                          schedule.workingDays.includes(day)
                        const isLeaveDay =
                          schedule.leaveDates.some((date) => {
                            const leaveDay = new Date(date)
                              .toLocaleDateString("en-US", {
                                weekday: "short",
                              })
                              .toUpperCase()

                            return leaveDay === day
                          })

                        return (
                          <span
                            key={day}
                            className={`inline-flex h-7 w-10 items-center justify-center rounded-md text-xs font-medium ${
                              isWorking && !isLeaveDay
                                ? "bg-primary text-primary-foreground"
                                : "bg-muted text-muted-foreground"
                            }`}
                          >
                            {day}
                          </span>
                        )
                      })}
                    </div>
                  </td>

                  <td className="p-3 text-sm">
                    {schedule.startTime} - {schedule.endTime}
                  </td>

                  <td className="p-3 text-sm">
                    {schedule.maxAppointments}
                  </td>

                  <td className="p-3">
                    {schedule.leaveDates.length === 0 ? (
                      <span className="text-sm text-muted-foreground">
                        No leave
                      </span>
                    ) : (
                      <div className="flex flex-wrap gap-1.5">
                        {schedule.leaveDates.map((date) => (
                          <span
                            key={date}
                            className="rounded-md bg-destructive/10 px-2 py-1 text-xs text-destructive"
                          >
                            {date}
                          </span>
                        ))}
                      </div>
                    )}
                  </td>

                  <td className="p-3">
                    <ApplyLeaveDialog
                      doctor={schedule}
                      isSaving={isSaving}
                      onApplyLeave={onApplyLeave}
                      trigger={
                        <Button
                          type="button"
                          size="sm"
                          variant="outline"
                        >
                          <CalendarX />
                          Apply Leave
                        </Button>
                      }
                    />
                  </td>
                </tr>
              ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}