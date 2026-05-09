import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { ScheduleItem } from "../types/dashboard.types"

interface DoctorScheduleProps {
  schedules: ScheduleItem[]
  isLoading?: boolean
}

export default function DoctorSchedule({
  schedules,
  isLoading = false,
}: DoctorScheduleProps) {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Doctor Schedule
        </CardTitle>

        <span className="text-sm text-primary">This Week</span>
      </CardHeader>

      <CardContent className="space-y-3">
        {isLoading &&
          Array.from({ length: 7 }).map((_, index) => (
            <div
              key={index}
              className="h-14 animate-pulse rounded-lg border border-border bg-muted"
            />
          ))}

        {!isLoading && schedules.length === 0 && (
          <p className="text-sm text-muted-foreground">
            No doctor schedule found for this week.
          </p>
        )}

        {!isLoading && schedules.map((schedule) => (
          <div
  key={schedule.id}
  className="flex items-center justify-between rounded-lg border border-border p-2.5"
>
  <div className="flex gap-3">
    <div className="flex h-10 w-10 flex-col items-center justify-center rounded-md bg-muted">
      <span className="text-[10px] text-muted-foreground">
        {schedule.day}
      </span>

      <span className="text-sm font-semibold">
        {schedule.date}
      </span>
    </div>

    <div>
      <p className="text-sm font-medium text-foreground">
        {schedule.title}
      </p>

      <p className="text-xs text-muted-foreground">
        {schedule.doctors} Doctors
      </p>
    </div>
  </div>

  <div className="text-right">
    <p className="text-sm font-semibold">
      {schedule.appointments}
    </p>

    <p className="text-[11px] text-muted-foreground">
      Appointments
    </p>
  </div>
</div>
        ))}

        {/* <div className="rounded-xl bg-primary/10 p-4">
          <p className="font-medium text-primary">
            Staff Alert
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            System flagged 2 schedule overlaps for Wednesday.
          </p>
        </div> */}
      </CardContent>
    </Card>
  )
}