import AdminStatsSection from "../components/AdminStatsSection"
//import ApiIntegrationCard from "../components/ApiIntegrationCard"
import DoctorSchedule from "../components/DoctorSchedule"
//import GrowthAnalyticsCard from "../components/GrowthAnalyticsCard"
import QuickActions from "../components/QuickActions"
import RecentStaffActivity from "../components/RecentStaffActivity"
//import SecurityCard from "../components/SecurityCard"

export default function DashboardPage() {
  return (
    <div className="space-y-4 p-4">
      <AdminStatsSection />

      <div className="flex justify-end">
        <QuickActions />
      </div>

      <div className="grid gap-4 xl:grid-cols-[2fr_1fr]">
        <RecentStaffActivity />
        <DoctorSchedule />
      </div>

      {/* <div className="grid gap-6 lg:grid-cols-[2fr_1fr_1fr]">
        <GrowthAnalyticsCard />
        <ApiIntegrationCard />
        <SecurityCard />
      </div> */}
    </div>
  )
}