import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { schedules } from "../mock/dashboard.mock"

export default function DoctorSchedule() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-base font-semibold">
          Doctor Schedule
        </CardTitle>

        <span className="text-sm text-primary">This Week</span>
      </CardHeader>

      <CardContent className="space-y-3">
        {schedules.map((schedule) => (
          <div
  key={schedule.id}
  className="flex items-center justify-between rounded-lg border border-border p-3"
>
  <div className="flex gap-3">
    <div className="flex h-11 w-11 flex-col items-center justify-center rounded-md bg-muted">
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
