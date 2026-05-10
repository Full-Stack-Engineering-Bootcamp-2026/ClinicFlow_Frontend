import { useCallback, useEffect, useMemo, useState } from "react"

import {
  Users,
  UserRound,
  Calendar,
  CircleCheckBig,
  CircleX,
} from "lucide-react"

import {
  getDashboardSummary,
  getDoctorScheduleDashboard,
  getRecentStaff,
} from "../services/dashboardApi"

import type {
  AdminDashboardData,
  AdminStatCardProps,
  ScheduleItem,
  StaffActivity,
} from "../types/dashboard.types"

const formatDateForApi = (date: Date) => date.toISOString().slice(0, 10)

const getWeekStart = () => {
  const today = new Date()

  const day = today.getDay()

  const distanceFromMonday = day === 0 ? -6 : 1 - day

  const monday = new Date(today)

  monday.setDate(today.getDate() + distanceFromMonday)

  return formatDateForApi(monday)
}

const mapStats = (
  data: AdminDashboardData["summary"]
): AdminStatCardProps[] => [
  {
    title: "Total Staff",
    value: data.totalStaff,
    subtitle: "Registered Staff",
    icon: Users,
    iconBgColor: "#E0F2FE",
    iconColor: "#0284C7",
  },
  {
    title: "Active Doctors",
    value: data.activeDoctors,
    subtitle: "Available doctors",
    icon: UserRound,
    iconBgColor: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    title: "Appointments",
    value: data.totalAppointments,
    subtitle: "All appointments",
    icon: Calendar,
    iconBgColor: "#FEF3C7",
    iconColor: "#D97706",
  },
  {
    title: "Completed",
    value: data.completedAppointments,
    subtitle: "All completed",
    icon: CircleCheckBig,
    iconBgColor: "#DCFCE7",
    iconColor: "#16A34A",
  },
  {
    title: "Cancelled",
    value: data.cancelledAppointments,
    subtitle: "Cancelled appointments",
    icon: CircleX,
    iconBgColor: "#FEE2E2",
    iconColor: "#DC2626",
  },
]

const mapSchedule = (
  data: AdminDashboardData["doctorSchedule"]
): ScheduleItem[] =>
  data.map((item, index) => {
    const [, , dayOfMonth] = item.date.split("-")

    return {
      id: index + 1,

      day: item.day,

      date: dayOfMonth,

      title: "Doctor Availability",

      doctors: item.doctorCount,

      appointments: item.appointmentCount,
    }
  })

const mapRecentStaff = (
  data: AdminDashboardData["recentStaff"]
): StaffActivity[] =>
  data.content.map((staff) => ({
    id: staff.id,

    name: staff.fullName,

    role: staff.role,

    officialRole: staff.officialRole,

    action: staff.isActive ? "Active" : "Inactive",

    time: "",

    status: staff.isActive ? "On Duty" : "Flagged",
  }))

export function useAdminDashboard(token: string | null) {
  const [data, setData] = useState<AdminDashboardData | null>(null)

  const [recentStaffPage, setRecentStaffPage] = useState(0)

  const [isLoading, setIsLoading] = useState(true)

  const [error, setError] = useState("")

  const loadDashboard = useCallback(async () => {
    if (!token) {
      setIsLoading(false)

      return
    }

    try {
      setIsLoading(true)

      setError("")

      const [summary, doctorSchedule, recentStaff] = await Promise.all([
        getDashboardSummary(token),

        getDoctorScheduleDashboard(token, getWeekStart()),

        getRecentStaff(token, recentStaffPage, 5),
      ])

      setData({
        summary,

        doctorSchedule,

        recentStaff,
      })
    } catch (err) {
      setError(err instanceof Error ? err.message : "Failed to load dashboard")
    } finally {
      setIsLoading(false)
    }
  }, [recentStaffPage, token])

  useEffect(() => {
    loadDashboard()
  }, [loadDashboard])

  const stats = useMemo(() => (data ? mapStats(data.summary) : []), [data])

  const schedules = useMemo(
    () => (data ? mapSchedule(data.doctorSchedule) : []),
    [data]
  )

  const recentActivities = useMemo(
    () => (data ? mapRecentStaff(data.recentStaff) : []),
    [data]
  )

  return {
    stats,

    schedules,

    recentActivities,

    recentStaffPageInfo: data?.recentStaff,

    setRecentStaffPage,

    isLoading,

    error,

    refetch: loadDashboard,
  }
}
