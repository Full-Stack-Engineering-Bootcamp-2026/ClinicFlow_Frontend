import type { AdminStatCardProps } from "../types/dashboard.types"

export default function AdminStatCard({
  title,
  value,
  subtitle,
  icon: Icon,
  iconBgColor,
  iconColor,
}: AdminStatCardProps) {
  return (
    <div className="rounded-2xl border border-border bg-card p-3 shadow-sm">
      <div className="flex items-center gap-3">
        <div
          className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl"
          style={{
            backgroundColor: iconBgColor,
          }}
        >
          {Icon ? (
            <Icon
              className="h-4 w-4"
              style={{
                color: iconColor,
              }}
            />
          ) : null}
        </div>

        <div className="min-w-0">
          <p className="text-[11px] text-muted-foreground">{title}</p>

          <div className="mt-0.5 flex flex-col">
            <h3 className="text-xl leading-none font-bold">{value}</h3>

            <span className="text-xs text-muted-foreground">{subtitle}</span>
          </div>
        </div>
      </div>
    </div>
  )
}
