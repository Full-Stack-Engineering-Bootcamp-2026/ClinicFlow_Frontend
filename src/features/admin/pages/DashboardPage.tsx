import AdminStatsSection from "../components/AdminStatsSection"
//import ApiIntegrationCard from "../components/ApiIntegrationCard"
import DoctorSchedule from "../components/DoctorSchedule"
//import GrowthAnalyticsCard from "../components/GrowthAnalyticsCard"
import QuickActions from "../components/QuickActions"
import RecentStaffActivity from "../components/RecentStaffActivity"
//import SecurityCard from "../components/SecurityCard"
import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"
import { useAdminDashboard } from "../hooks/useAdminDashboard"

export default function DashboardPage() {
 const token = useSelector((state: RootState) => state.auth.token)
 const {
 stats,
 schedules,
 recentActivities,
 isLoading,
 error,
 refetch,
 } = useAdminDashboard(token)

 return (
 <div className="space-y-4 p-4">
 {error && (
 <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
 {error}
 </div>
 )}

 <AdminStatsSection stats={stats} isLoading={isLoading} />

 <div className="flex justify-end">
 <QuickActions onStaffCreated={refetch} />
 </div>

 <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
 <RecentStaffActivity
 activities={recentActivities}
 isLoading={isLoading}
 />
 <DoctorSchedule
 schedules={schedules}
 isLoading={isLoading}
 />
 </div>

 {/* <div className="grid gap-6 lg:grid-cols-[2fr_1fr_1fr]">
 <GrowthAnalyticsCard />
 <ApiIntegrationCard />
 <SecurityCard />
 </div> */}
 </div>
 )
}
