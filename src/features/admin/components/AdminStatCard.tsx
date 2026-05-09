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
      <CardContent className="flex min-h-24 flex-col gap-2 p-3">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-medium uppercase text-muted-foreground">
              {title}
            </p>

            <h2 className="text-xl font-bold tracking-tight text-foreground">
              {value}
            </h2>
          </div>

          {icon && (
            <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-muted">
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
            <p className="text-[11px] text-muted-foreground">{subtitle}</p>
          )}
        </div>
      </CardContent>
    </Card>
  )
}