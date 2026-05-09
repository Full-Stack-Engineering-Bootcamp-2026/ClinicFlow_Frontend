import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import type { RootState } from "@/app/store"

import AddStaffDialog from "../components/AddStaffDialog"
import StaffTable from "../components/StaffTable"
import { useStaffManagement } from "../hooks/useStaffManagement"

export default function StaffManagementPage() {
  const token = useSelector((state: RootState) => state.auth.token)
  const {
    filters,
    updateFilters,
    staff,
    staffPage,
    roles,
    isLoading,
    isDeleting,
    error,
    refetchStaff,
    deactivateStaff,
  } = useStaffManagement(token)
  const [searchText, setSearchText] =
    useState(filters.search)

  useEffect(() => {
    const timeout = window.setTimeout(() => {
      updateFilters({ search: searchText })
    }, 350)

    return () => window.clearTimeout(timeout)
  }, [searchText, updateFilters])

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-xl font-bold">
            Staff Management
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage clinical staff, roles and access.
          </p>
        </div>

        <AddStaffDialog
          onStaffCreated={refetchStaff}
          trigger={
            <Button>
              Add Staff
            </Button>
          }
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_160px]">
        <div className="grid gap-3 sm:grid-cols-3">
          <div className="relative">
            <Search className="pointer-events-none absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchText}
              onChange={(event) =>
                setSearchText(event.target.value)
              }
              placeholder="Search by name"
              className="h-9 pl-9"
            />
          </div>

          <select
            value={filters.role}
            onChange={(event) =>
              updateFilters({ role: event.target.value })
            }
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="">All Roles</option>

            {roles.map((role) => (
              <option
                key={role.id}
                value={role.name}
              >
                {role.name}
              </option>
            ))}
          </select>

          <select
            value={filters.status}
            onChange={(event) =>
              updateFilters({
                status: event.target.value as typeof filters.status,
              })
            }
            className="h-9 rounded-md border border-input bg-background px-3 text-sm"
          >
            <option value="ALL">All Status</option>
            <option value="ACTIVE">Active</option>
            <option value="INACTIVE">Inactive</option>
          </select>
        </div>

        <div className="rounded-lg bg-primary p-3 text-primary-foreground">
          <p className="text-xs opacity-80">
            TOTAL STAFF
          </p>

          <h2 className="mt-1 text-2xl font-bold">
            {staffPage?.totalElements ?? 0}
          </h2>
        </div>
      </div>

      {error && (
        <div className="rounded-md border border-destructive/30 bg-destructive/10 p-3 text-sm text-destructive">
          {error}
        </div>
      )}

      <StaffTable
        staff={staff}
        isLoading={isLoading}
        isDeleting={isDeleting}
        onDeactivate={deactivateStaff}
      />

      {staffPage && staffPage.totalPages > 1 && (
        <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
          <p className="text-xs text-muted-foreground">
            Page {staffPage.number + 1} of {staffPage.totalPages}
          </p>

          <div className="flex gap-2">
            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={staffPage.number === 0 || isLoading}
              onClick={() =>
                updateFilters({ page: staffPage.number - 1 })
              }
            >
              Previous
            </Button>

            <Button
              type="button"
              variant="outline"
              size="sm"
              disabled={
                staffPage.number + 1 >= staffPage.totalPages ||
                isLoading
              }
              onClick={() =>
                updateFilters({ page: staffPage.number + 1 })
              }
            >
              Next
            </Button>
          </div>
        </div>
      )}
    </div>
  )
}