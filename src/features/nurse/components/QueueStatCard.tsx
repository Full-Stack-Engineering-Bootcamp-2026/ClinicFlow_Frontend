import type { QueueStatCardProps } from "../types"

export default function QueueStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor,
  iconColor,
}: QueueStatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-4 shadow-sm">
      <div className="flex items-start gap-3">
        
        <div
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: iconBgColor,
          }}
        >
          <Icon
            className="h-5 w-5"
            style={{
              color: iconColor,
            }}
          />
        </div>

        <div className="min-w-0">
          <p className="text-xs text-muted-foreground">
            {title}
          </p>

          <div className="mt-1 flex items-baseline gap-1">
            <h3 className="text-2xl font-bold leading-none">
              {value}
            </h3>

            <span className="text-sm font-medium text-muted-foreground">
              {subtitle}
            </span>
          </div>
        </div>
      </div>
    </div>
  )
}