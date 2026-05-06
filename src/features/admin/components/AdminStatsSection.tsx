import AdminStatCard from "./AdminStatCard"

import { adminStats } from "../mock/dashboard.mock"

export default function AdminStatsSection() {
  return (
    <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
      {adminStats.map((stat) => (
        <AdminStatCard
          key={stat.title}
          title={stat.title}
          value={stat.value}
          change={stat.change}
          subtitle={stat.subtitle}
          trend={stat.trend}
        />
      ))}
    </section>
  )
}