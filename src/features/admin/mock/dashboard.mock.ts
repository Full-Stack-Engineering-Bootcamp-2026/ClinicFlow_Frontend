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

export const recentActivities: StaffActivity[] = [
  {
    id: 1,
    name: "Dr. Sarah Jenkins",
    role: "Chief Surgeon",
    action: "Updated Patient Record",
    time: "10:45 AM",
    status: "Verified",
  },
  {
    id: 2,
    name: "Nurse Michael Chen",
    role: "Head Nurse",
    action: "Clocked In",
    time: "08:00 AM",
    status: "On Duty",
  },
  {
    id: 3,
    name: "Dr. Elena Rodriguez",
    role: "Pediatrician",
    action: "Cancelled Consultation",
    time: "Yesterday",
    status: "Flagged",
  },
]

export const adminStats: AdminStatCardProps[] = [
  {
    title: "Total Staff",
    value: 124,
    change: "+4%",
    trend: "up",
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
    change: "-2%",
    trend: "down",
  },
  {
    title: "Completed",
    value: 54,
    subtitle: "65% Progress",
    trend: "up",
  },
]
export const schedules: ScheduleItem[] = [
  {
    id: 1,
    day: "MON",
    date: "12",
    title: "General Surgery Rotation",
    doctors: 4,
    appointments: 12,
  },
  {
    id: 2,
    day: "TUE",
    date: "13",
    title: "Cardiology Clinic",
    doctors: 2,
    appointments: 8,
  },
  {
    id: 3,
    day: "WED",
    date: "14",
    title: "Pediatric Screening",
    doctors: 6,
    appointments: 22,
  },
]
