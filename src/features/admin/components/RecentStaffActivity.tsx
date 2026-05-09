import { Avatar, AvatarFallback } from "@/components/ui/avatar"
//import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import type { StaffActivity } from "../types/dashboard.types"

// const statusVariant = {
// Verified: "default",
// "On Duty": "secondary",
// Flagged: "destructive",
// } as const

interface RecentStaffActivityProps {
 activities: StaffActivity[]
 isLoading?: boolean
}

export default function RecentStaffActivity({
 activities,
 isLoading = false,
}: RecentStaffActivityProps) {
 return (
 <Card className="border-border shadow-sm">
 <CardHeader className="pb-3">
 <CardTitle className="text-base font-semibold">
 Recent Staff Activity
 </CardTitle>
 </CardHeader>

 <CardContent className="space-y-3">
 {isLoading &&
 Array.from({ length: 3 }).map((_, index) => (
 <div
 key={index}
 className="h-16 animate-pulse rounded-lg border border-border bg-muted"
 />
 ))}

 {!isLoading && activities.length === 0 && (
 <p className="text-sm text-muted-foreground">
 No recent staff found.
 </p>
 )}

 {!isLoading && activities.map((activity) => (
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