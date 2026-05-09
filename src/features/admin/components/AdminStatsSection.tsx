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
 <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
 {Array.from({ length: 4 }).map((_, index) => (
 <div
 key={index}
 className="h-32 animate-pulse rounded-lg border border-border bg-muted"
 />
 ))}
 </section>
 )
 }

 return (
 <section className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
 {stats.map((stat) => (
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