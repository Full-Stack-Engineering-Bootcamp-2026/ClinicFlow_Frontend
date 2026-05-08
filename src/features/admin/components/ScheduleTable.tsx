import { Pencil } from "lucide-react"

import { Button } from "@/components/ui/button"

import {
  Card,
  CardContent,
} from "@/components/ui/card"
import SetScheduleDialog from "./SetScheduleDialog"
import type { DoctorSchedule, LeaveException } from "../types/schedule.types"

interface ScheduleTableProps {
  schedules: DoctorSchedule[]

  currentPage: number

  totalPages: number

  onPageChange: (
    page: number
  ) => void

  onApplyLeave: (
    doctorName: string,
    leave: LeaveException
  ) => void
}

export default function ScheduleTable({
  schedules,
  currentPage,
  totalPages,
  onPageChange,
  onApplyLeave,
}: ScheduleTableProps) {
  return (
    <Card className="border-border">
      <CardContent className="p-0">
        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead className="border-b bg-muted/40">
              <tr className="text-left text-xs uppercase tracking-wide text-muted-foreground">
                <th className="p-4">
                  Doctor
                </th>

                <th className="p-4">
                  Day
                </th>

                <th className="p-4">
                  Time
                </th>

                <th className="p-4">
                  Capacity
                </th>

                <th className="p-4">
                  Leave Exceptions
                </th>

                <th className="p-4">
                  Actions
                </th>
              </tr>
            </thead>

            <tbody>
              {schedules.map((schedule) => (
                <tr
                  key={schedule.id}
                  className="border-b hover:bg-muted/20"
                >
                  <td className="p-4">
                    <div>
                      <p className="font-medium">
                        {schedule.doctorName}
                      </p>

                      <p className="text-sm text-muted-foreground">
                        {
                          schedule.specialization
                        }
                      </p>
                    </div>
                  </td>

                  <td className="p-4">
                    <div className="inline-flex h-8 w-8 items-center justify-center rounded-md bg-primary text-xs font-medium text-primary-foreground">
                      {schedule.dayOfWeek}
                    </div>
                  </td>

                  <td className="p-4">
                    {schedule.startTime} -{" "}
                    {schedule.endTime}
                  </td>

                  <td className="p-4">
                    {
                      schedule.maxAppointments
                    }
                  </td>

                  <td className="p-4">
                    <div className="space-y-2">
                      {schedule.leaveExceptions
                        .length === 0 ? (
                        <span className="text-sm text-muted-foreground">
                          No leaves
                        </span>
                      ) : (
                        schedule.leaveExceptions.map(
                          (leave) => (
                            <div
                              key={leave.id}
                              className="rounded-md bg-destructive/10 p-2 text-xs text-destructive"
                            >
                              <p>
                                {
                                  leave.exceptionDate
                                }
                              </p>

                              <p>
                                {leave.reason}
                              </p>
                            </div>
                          )
                        )
                      )}
                    </div>
                  </td>

                  <td className="p-4">
                    <SetScheduleDialog
  schedules={schedules}
  onApplyLeave={onApplyLeave}
  preselectedDoctorName={
    schedule.doctorName
  }
  hideSearch
  trigger={
    <Button
      size="sm"
      variant="ghost"
      className="gap-2"
    >
      <Pencil className="h-4 w-4" />
      Edit
    </Button>
  }
/>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* PAGINATION */}
        <div className="flex items-center justify-between border-t p-4">
          <p className="text-sm text-muted-foreground">
            Showing schedules
          </p>

          <div className="flex gap-2">
            {Array.from({
              length: totalPages,
            }).map((_, index) => {
              const page = index + 1

              return (
                <Button
                  key={page}
                  size="icon"
                  variant={
                    currentPage === page
                      ? "default"
                      : "outline"
                  }
                  onClick={() =>
                    onPageChange(page)
                  }
                >
                  {page}
                </Button>
              )
            })}
          </div>
        </div>
      </CardContent>
    </Card>
  )
}