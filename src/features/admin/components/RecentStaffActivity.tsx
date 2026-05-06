import { Avatar, AvatarFallback } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { recentActivities } from "../mock/dashboard.mock"

const statusVariant = {
  Verified: "default",
  "On Duty": "secondary",
  Flagged: "destructive",
} as const

export default function RecentStaffActivity() {
  return (
    <Card className="border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Recent Staff Activity
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-4">
        {recentActivities.map((activity) => (
          <div
            key={activity.id}
            className="flex items-center justify-between rounded-xl border border-border p-4"
          >
            <div className="flex items-center gap-4">
              <Avatar>
                <AvatarFallback>
                  {activity.name.charAt(0)}
                </AvatarFallback>
              </Avatar>

              <div>
                <p className="font-medium text-foreground">
                  {activity.name}
                </p>

                <p className="text-sm text-muted-foreground">
                  {activity.role}
                </p>
              </div>
            </div>

            <div className="hidden text-sm text-muted-foreground md:block">
              {activity.action}
            </div>

            <div className="text-sm text-muted-foreground">
              {activity.time}
            </div>

            <Badge variant={statusVariant[activity.status]}>
              {activity.status}
            </Badge>
          </div>
        ))}
      </CardContent>
    </Card>
  )
}