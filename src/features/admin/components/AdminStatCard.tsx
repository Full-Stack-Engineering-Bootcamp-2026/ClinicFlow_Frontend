import type { AdminStatCardProps } from "../types/dashboard.types"

import { Card, CardContent } from "@/components/ui/card"
import { cn } from "@/lib/utils"

const trendStyles = {
  up: "bg-primary/10 text-primary",
  down: "bg-destructive/10 text-destructive",
  neutral: "bg-muted text-muted-foreground",
}

const cardAccentStyles = [
  "border-primary/20 bg-primary/10",
  "border-emerald-500/20 bg-emerald-500/10",
  "border-sky-500/20 bg-sky-500/10",
  "border-violet-500/20 bg-violet-500/10",
  "border-rose-500/20 bg-rose-500/10",
]

export default function AdminStatCard({
  title,
  value,
  change,
  subtitle,
  trend = "neutral",
  icon,
  accentIndex = 0,
}: AdminStatCardProps) {
  return (
    <Card
      className={cn(
        "border shadow-sm transition-colors hover:border-primary/30 hover:bg-primary/10",
        cardAccentStyles[accentIndex % cardAccentStyles.length]
      )}
    >
      <CardContent className="flex min-h-16 flex-col gap-1.5 p-2.5">
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <p className="text-[11px] font-medium text-muted-foreground uppercase">
              {title}
            </p>

            <p className="text-xl font-bold tracking-tight text-foreground">
              {value}
            </p>
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