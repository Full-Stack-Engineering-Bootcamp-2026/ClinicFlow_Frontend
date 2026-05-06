export interface DashboardStat {
  title: string
  value: number
  change?: string
  status?: string
}



export interface AdminStatCardProps {
  title: string
  value: number | string
  change?: string
  subtitle?: string
  trend?: "up" | "down" | "neutral"
  icon?: React.ReactNode
}
export interface StaffActivity {
  id: number
  name: string
  role: string
  action: string
  time: string
  status: "Verified" | "On Duty" | "Flagged"
}

export interface ScheduleItem {
  id: number
  day: string
  date: string
  title: string
  doctors: number
  appointments: number
}

export interface QuickAction {
  id: number
  label: string
}

export interface InfoCardProps {
  title: string
  description: string
  actionLabel: string
}