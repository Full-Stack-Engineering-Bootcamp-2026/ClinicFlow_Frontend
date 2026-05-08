import type{
  DashboardStat,
  StaffActivity,
  ScheduleItem,
  AdminStatCardProps,
  QuickAction
} from "../types/dashboard.types"

export const quickActions: QuickAction[] = [
  {
    id: 1,
    label: "Add Staff",
  },
  {
    id: 2,
    label: "Manage Schedules",
  },
]

export const recentActivities = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    role: "Chief Surgeon",
  },
  {
    id: 2,
    name: "Nurse Michael Chen",
    role: "Head Nurse",
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    role: "Pediatrician",
  },
]

export const adminStats: AdminStatCardProps[] = [
  {
    title: "Total Staff",
    value: 124,
    subtitle: "Registered Staff",
    trend: "neutral",
  },
  {
    title: "Active Doctors",
    value: 18,
    subtitle: "Today",
    trend: "neutral",
  },
  {
    title: "Appointments",
    value: 82,
    subtitle: "Today",
    trend: "neutral",
  },
  {
    title: "Completed",
    value: 54,
    subtitle: "Today",
    trend: "neutral",
  },
]
export const schedules: ScheduleItem[] = [
  {
    id: 1,
    day: "MON",
    date: "12",
    title: "General Surgery",
    doctors: 4,
    appointments: 12,
  },
  {
    id: 2,
    day: "TUE",
    date: "13",
    title: "Cardiology",
    doctors: 2,
    appointments: 8,
  },
  {
    id: 3,
    day: "WED",
    date: "14",
    title: "Pediatrics",
    doctors: 6,
    appointments: 22,
  },
]
