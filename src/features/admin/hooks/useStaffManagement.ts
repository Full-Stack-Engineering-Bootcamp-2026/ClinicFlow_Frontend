import { useCallback, useEffect, useState } from "react"
import { toast } from "react-toastify"

import {
  deactivateStaff,
  getRoles,
  getStaff,
} from "../services/staffApi"
import type {
  RoleResponse,
  StaffFilters,
  StaffPageResponse,
} from "../types/staff.types"

const initialFilters: StaffFilters = {
  page: 0,
  size: 5,
  search: "",
  role: "",
  status: "ALL",
}

export function useStaffManagement(token: string | null) {
  const [filters, setFilters] =
    useState<StaffFilters>(initialFilters)
  const [staffPage, setStaffPage] =
    useState<StaffPageResponse | null>(null)
  const [roles, setRoles] = useState<RoleResponse[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [isDeleting, setIsDeleting] = useState(false)
  const [error, setError] = useState("")

  const fetchStaff = useCallback(async () => {
    if (!token) {
      setIsLoading(false)
      return
    }

    try {
      setIsLoading(true)
      setError("")
      setStaffPage(await getStaff(token, filters))
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Failed to load staff"
      )
    } finally {
      setIsLoading(false)
    }
  }, [filters, token])

  const fetchRoles = useCallback(async () => {
    if (!token) return

    try {
      setRoles(await getRoles(token))
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to load roles"
      )
    }
  }, [token])

  useEffect(() => {
    fetchStaff()
  }, [fetchStaff])

  useEffect(() => {
    fetchRoles()
  }, [fetchRoles])

  const updateFilters = useCallback((
    nextFilters: Partial<StaffFilters>
  ) => {
    setFilters((current) => ({
      ...current,
      ...nextFilters,
      page: nextFilters.page ?? 0,
    }))
  }, [])

  const handleDeactivate = async (staffId: number) => {
    if (!token) return

    try {
      setIsDeleting(true)
      await deactivateStaff(token, staffId)
      toast.success("Staff account deactivated")
      await fetchStaff()
    } catch (err) {
      toast.error(
        err instanceof Error
          ? err.message
          : "Failed to deactivate account"
      )
    } finally {
      setIsDeleting(false)
    }
  }

  return {
    filters,
    updateFilters,
    staffPage,
    staff: staffPage?.content ?? [],
    roles,
    isLoading,
    isDeleting,
    error,
    refetchStaff: fetchStaff,
    deactivateStaff: handleDeactivate,
  }
}