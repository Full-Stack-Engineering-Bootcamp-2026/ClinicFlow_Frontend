import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { schedules } from "../mock/dashboard.mock"

export default function DoctorSchedule() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Doctor Schedule
        </CardTitle>

        <span className="text-sm text-primary">This Week</span>
      </CardHeader>

      <CardContent className="space-y-4">
        {schedules.map((schedule) => (
          <div
            key={schedule.id}
            className="flex gap-4 rounded-xl border border-border p-4"
          >
            <div className="flex h-14 w-14 flex-col items-center justify-center rounded-lg bg-muted">
              <span className="text-xs text-muted-foreground">
                {schedule.day}
              </span>

              <span className="font-semibold text-foreground">
                {schedule.date}
              </span>
            </div>

            <div className="space-y-1">
              <p className="font-medium text-foreground">
                {schedule.title}
              </p>

              <p className="text-sm text-muted-foreground">
                {schedule.doctors} Doctors •{" "}
                {schedule.appointments} Appointments
              </p>
            </div>
          </div>
        ))}

        <div className="rounded-xl bg-primary/10 p-4">
          <p className="font-medium text-primary">
            Staff Alert
          </p>

          <p className="mt-2 text-sm text-muted-foreground">
            System flagged 2 schedule overlaps for Wednesday.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}