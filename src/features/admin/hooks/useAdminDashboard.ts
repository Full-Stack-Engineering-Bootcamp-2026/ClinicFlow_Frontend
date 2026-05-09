import { useEffect, useMemo, useState } from "react"

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
    trend: "neutral",
  },
  {
    title: "Active Doctors",
    value: data.activeDoctors,
    subtitle: "Available doctors",
    trend: "neutral",
  },
  {
    title: "Appointments",
    value: data.totalAppointments,
    subtitle: "All appointments",
    trend: "neutral",
  },
  {
    title: "Completed",
    value: data.completedAppointments,
    subtitle: `${data.cancelledAppointments} cancelled`,
    trend: "neutral",
  },
]

const mapSchedule = (
  data: AdminDashboardData["doctorSchedule"]
): ScheduleItem[] =>
  data.map((item, index) => {
    const date = new Date(item.date)

    return {
      id: index + 1,
      day: item.day,
      date: String(date.getDate()).padStart(2, "0"),
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
    action: staff.isActive ? "Active" : "Inactive",
    time: "",
    status: staff.isActive ? "On Duty" : "Flagged",
  }))

export function useAdminDashboard(token: string | null) {
  const [data, setData] = useState<AdminDashboardData | null>(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState("")

  useEffect(() => {
    if (!token) {
      setIsLoading(false)
      return
    }

    const loadDashboard = async () => {
      try {
        setIsLoading(true)
        setError("")

        const [summary, doctorSchedule, recentStaff] = await Promise.all([
          getDashboardSummary(token),
          getDoctorScheduleDashboard(token, getWeekStart()),
          getRecentStaff(token),
        ])

        setData({ summary, doctorSchedule, recentStaff })
      } catch (err) {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard"
        )
      } finally {
        setIsLoading(false)
      }
    }

    loadDashboard()
  }, [token])

  const stats = useMemo(() => (data ? mapStats(data.summary) : []), [data])

  const schedules = useMemo(
    () => (data ? mapSchedule(data.doctorSchedule) : []),
    [data]
  )
  const refetch = () => {
    if (!token) return

    setIsLoading(true)
    setError("")

    Promise.all([
      getDashboardSummary(token),
      getDoctorScheduleDashboard(token, getWeekStart()),
      getRecentStaff(token),
    ])
      .then(([summary, doctorSchedule, recentStaff]) => {
        setData({ summary, doctorSchedule, recentStaff })
      })
      .catch((err) => {
        setError(
          err instanceof Error ? err.message : "Failed to load dashboard"
        )
      })
      .finally(() => {
        setIsLoading(false)
      })
  } 

  const recentActivities = useMemo(
    () => (data ? mapRecentStaff(data.recentStaff) : []),
    [data]
  )

  return {
    stats,
    schedules,
    recentActivities,
    isLoading,
    error,
    refetch,
  }
}
