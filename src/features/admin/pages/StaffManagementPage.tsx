import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import type { RootState } from "@/app/store"
import { useDebounce } from "../hooks/use-debounce"

import AddStaffDialog from "../components/AddStaffDialog"
import AdminPagination from "../components/AdminPagination"
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
  const [searchText, setSearchText] = useState(filters.search)
  const debouncedSearchText = useDebounce(searchText)

  useEffect(() => {
    updateFilters({ search: debouncedSearchText })
  }, [debouncedSearchText, updateFilters])

  return (
    <div className="space-y-4 p-4">
      <div className="flex flex-col gap-3 sm:flex-row sm:items-start sm:justify-between">
        <AddStaffDialog
          onStaffCreated={refetchStaff}
          trigger={<Button>Add Staff</Button>}
        />
      </div>

      <div className="grid gap-3 lg:grid-cols-[minmax(0,1fr)_160px] lg:items-start">
        <div className="grid items-center gap-3 sm:grid-cols-[minmax(240px,1fr)_minmax(160px,200px)_minmax(160px,200px)]">
          <div className="relative h-9 w-full">
            <Search className="pointer-events-none absolute top-1/2 left-3 z-10 size-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              value={searchText}
              onChange={(event) => setSearchText(event.target.value)}
              placeholder="Search by name"
              className="h-9 rounded-lg pl-9"
            />
          </div>

          <Select
            value={filters.role || "all"}
            onValueChange={(role) =>
              updateFilters({ role: role === "all" ? "" : role })
            }
          >
            <SelectTrigger className="h-9 w-full bg-background">
              <SelectValue placeholder="All Roles" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="all">All Roles</SelectItem>

              {roles.map((role) => (
                <SelectItem key={role.id} value={role.name}>
                  {role.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>

          <Select
            value={filters.status}
            onValueChange={(value) =>
              updateFilters({
                status: value as typeof filters.status,
              })
            }
          >
            <SelectTrigger className="h-9 w-full bg-background">
              <SelectValue placeholder="All Status" />
            </SelectTrigger>

            <SelectContent>
              <SelectItem value="ALL">All Status</SelectItem>
              <SelectItem value="ACTIVE">Active</SelectItem>
              <SelectItem value="INACTIVE">Inactive</SelectItem>
            </SelectContent>
          </Select>
        </div>

        <div className="rounded-lg bg-primary p-3 text-primary-foreground">
          <p className="text-xs opacity-80">TOTAL STAFF</p>

          <p className="mt-1 text-2xl font-bold">
            {staffPage?.totalElements ?? 0}
          </p>
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

      {staffPage && (
        <AdminPagination
          currentPage={staffPage.number}
          totalPages={staffPage.totalPages}
          isLoading={isLoading}
          onPageChange={(page) => updateFilters({ page })}
        />
      )}
    </div>
  )
}