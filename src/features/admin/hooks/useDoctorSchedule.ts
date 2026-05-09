import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

import {
  applyDoctorLeave,
  changeDoctorSchedule,
  getAdminDoctorSchedules,
} from "../services/scheduleApi"
import type {
  AdminDoctorSchedulePage,
  ApplyLeaveRequest,
  ChangeDoctorScheduleRequest,
  ScheduleFilters,
} from "../types/schedule.types"

const formatDateForApi = (date: Date) =>
  date.toISOString().slice(0, 10)

const getWeekStart = () => {
  const today = new Date()
  const day = today.getDay()
  const distanceFromMonday = day === 0 ? -6 : 1 - day
  const monday = new Date(today)

  monday.setDate(today.getDate() + distanceFromMonday)

  return formatDateForApi(monday)
}

const initialFilters: ScheduleFilters = {
  page: 0,
  size: 5,
  specialization: "",
  status: "ALL",
}

export function useDoctorSchedules(token: string | null) {
  const [weekStart] = useState(getWeekStart)
  const [filters, setFilters] =
    useState<ScheduleFilters>(initialFilters)
  const [schedulePage, setSchedulePage] =
    useState<AdminDoctorSchedulePage | null>(null)
  const [allDoctors, setAllDoctors] = useState<
    AdminDoctorSchedulePage["content"]
  >([])
  const [isLoading, setIsLoading] = useState(true)
  const [isSaving, setIsSaving] = useState(false)
  const [error, setError] = useState("")

  const fetchSchedules = useCallback(async () => {
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError("")
      const [pageData, allDoctorData] = await Promise.all([
        getAdminDoctorSchedules(token, weekStart, filters),
        getAdminDoctorSchedules(token, weekStart, {
          page: 0,
          size: 200,
          specialization: "",
          status: "ALL",
        }),
      ])

      setSchedulePage(pageData)
      setAllDoctors(allDoctorData.content)
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load doctor schedules"
      )
    } finally {
      setIsLoading(false)
    }
  }, [filters, token, weekStart])

  useEffect(() => {
    fetchSchedules()
  }, [fetchSchedules])

  const updateFilters = useCallback(
    (nextFilters: Partial<ScheduleFilters>) => {
      setFilters((current) => ({
        ...current,
        ...nextFilters,
        page: nextFilters.page ?? 0,
      }))
    },
    []
  )

  const handleChangeSchedule = async (
    payload: ChangeDoctorScheduleRequest
  ) => {
    if (!token) return

    try {
      setIsSaving(true)
      await changeDoctorSchedule(token, payload)
      toast.success("Doctor schedule changed")
      await fetchSchedules()
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to change schedule"
      )
    } finally {
      setIsSaving(false)
    }
  }

  const handleApplyLeave = async (
    payload: ApplyLeaveRequest
  ) => {
    if (!token) return

    try {
      setIsSaving(true)
      await applyDoctorLeave(token, payload)
      toast.success("Doctor leave applied")
      await fetchSchedules()
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to apply leave"
      )
    } finally {
      setIsSaving(false)
    }
  }

  return {
    weekStart,
    filters,
    updateFilters,
    schedulePage,
    schedules: schedulePage?.content ?? [],
    allDoctors,
    stats: schedulePage?.stats,
    specializations: schedulePage?.specializations ?? [],
    isLoading,
    isSaving,
    error,
    changeSchedule: handleChangeSchedule,
    applyLeave: handleApplyLeave,
  }
}