import { Avatar, AvatarFallback } from "@/components/ui/avatar"
//import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { recentActivities } from "../mock/dashboard.mock"

// const statusVariant = {
//   Verified: "default",
//   "On Duty": "secondary",
//   Flagged: "destructive",
// } as const

export default function RecentStaffActivity() {
  return (
    <Card className="border-border shadow-sm">
  <CardHeader className="pb-3">
    <CardTitle className="text-base font-semibold">
      Recent Staff Activity
    </CardTitle>
  </CardHeader>

  <CardContent className="space-y-3">
    {recentActivities.map((activity) => (
      <div
        key={activity.id}
        className="flex items-center gap-3 rounded-lg border border-border p-3"
      >
        <Avatar className="h-9 w-9">
          <AvatarFallback>
            {activity.name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div>
          <p className="text-sm font-medium text-foreground">
            {activity.name}
          </p>

          <p className="text-xs text-muted-foreground">
            {activity.role}
          </p>
        </div>
      </div>
    ))}
  </CardContent>
</Card>
  )
}