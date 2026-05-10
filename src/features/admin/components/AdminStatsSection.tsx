import AdminStatCard from "./AdminStatCard"

import type { AdminStatCardProps } from "../types/dashboard.types"

interface AdminStatsSectionProps {
  stats: AdminStatCardProps[]

  isLoading?: boolean
}

export default function AdminStatsSection({
  stats,
  isLoading = false,
}: AdminStatsSectionProps) {
  if (isLoading) {
    return (
      <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
        {Array.from({
          length: 5,
        }).map((_, index) => (
          <div
            key={index}
            className="h-24 animate-pulse rounded-2xl border border-border bg-muted"
          />
        ))}
      </section>
    )
  }

  return (
    <section className="grid gap-3 sm:grid-cols-2 lg:grid-cols-5">
      {stats.map((stat) => (
        <AdminStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          subtitle={stat.subtitle}
          icon={stat.icon}
          iconBgColor={stat.iconBgColor}
          iconColor={stat.iconColor}
        />
      ))}
    </section>
  )
}
