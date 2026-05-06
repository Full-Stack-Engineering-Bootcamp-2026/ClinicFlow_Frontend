import type { AdminStatCardProps } from "../types/dashboard.types"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const trendStyles = {
  up: "bg-primary/10 text-primary",
  down: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
}

export default function AdminStatCard({
  title,
  value,
  change,
  subtitle,
  trend = "neutral",
  icon,
}: AdminStatCardProps) {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="flex flex-col gap-4 p-5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              {title}
            </p>

            <h2 className="text-3xl font-bold tracking-tight text-foreground">
              {value}
            </h2>
          </div>

          {icon && (
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-muted">
              {icon}
            </div>
          )}
        </div>

        <div className="flex items-center justify-between">
          {change && (
            <span
              className={cn(
                "rounded-full px-2.5 py-1 text-xs font-medium",
                trendStyles[trend]
              )}
            >
              {change}
            </span>
          )}

          {subtitle && (
            <p className="text-xs text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}