import { Avatar, AvatarFallback } from "@/components/ui/avatar"
//import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"

import type {
  StaffActivity,
  StaffPageResponse,
} from "../types/dashboard.types"

// const statusVariant = {
//   Verified: "default",
//   "On Duty": "secondary",
//   Flagged: "destructive",
// } as const

interface RecentStaffActivityProps {
  activities: StaffActivity[]
  pageInfo?: StaffPageResponse
  isLoading?: boolean
  onPageChange?: (page: number) => void
}

export default function RecentStaffActivity({
  activities,
  pageInfo,
  isLoading = false,
  onPageChange,
}: RecentStaffActivityProps) {
  const currentPage = pageInfo?.number ?? 0
  const totalPages = pageInfo?.totalPages ?? 0

  return (
    <Card className="h-fit border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between pb-3">
        <CardTitle className="text-base font-semibold">
          Recent Staff Activity
        </CardTitle>

        <span className="text-xs text-muted-foreground">
          5 per page
        </span>
      </CardHeader>

      <CardContent className="space-y-3">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[520px] text-sm">
            <thead className="border-b text-left text-xs text-muted-foreground">
              <tr>
                <th className="pb-2 font-medium">Name</th>
                <th className="pb-2 font-medium">Role</th>
                <th className="pb-2 font-medium">Official Role</th>
                <th className="pb-2 font-medium">Status</th>
              </tr>
            </thead>

            <tbody>
              {isLoading &&
                Array.from({ length: 5 }).map((_, index) => (
                  <tr key={index}>
                    <td colSpan={4} className="py-2">
                      <div className="h-9 animate-pulse rounded-md bg-muted" />
                    </td>
                  </tr>
                ))}

              {!isLoading && activities.length === 0 && (
                <tr>
                  <td
                    colSpan={4}
                    className="py-4 text-center text-sm text-muted-foreground"
                  >
                    No recent staff found.
                  </td>
                </tr>
              )}

              {!isLoading &&
                activities.map((activity) => (
                  <tr
                    key={activity.id}
                    className="border-b last:border-0"
                  >
                    <td className="py-2 pr-3">
                      <div className="flex items-center gap-2">
                        <Avatar className="h-8 w-8">
                          <AvatarFallback>
                            {activity.name.charAt(0)}
                          </AvatarFallback>
                        </Avatar>

                        <span className="font-medium text-foreground">
                          {activity.name}
                        </span>
                      </div>
                    </td>

                    <td className="py-2 pr-3 text-muted-foreground">
                      {activity.role}
                    </td>

                    <td className="py-2 pr-3 text-muted-foreground">
                      {activity.officialRole || "-"}
                    </td>

                    <td className="py-2 text-muted-foreground">
                      {activity.action}
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
        </div>

        {totalPages > 1 && (
          <div className="flex items-center justify-between pt-1">
            <span className="text-xs text-muted-foreground">
              Page {currentPage + 1} of {totalPages}
            </span>

            <div className="flex gap-2">
              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage === 0}
                onClick={() => onPageChange?.(currentPage - 1)}
              >
                Previous
              </Button>

              <Button
                type="button"
                variant="outline"
                size="sm"
                disabled={currentPage + 1 >= totalPages}
                onClick={() => onPageChange?.(currentPage + 1)}
              >
                Next
              </Button>
            </div>
          </div>
        )}
      </CardContent>
    </Card>
  )
}