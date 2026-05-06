import { Button } from "@/components/ui/button"

import AddStaffDialog from "../components/AddStaffDialog"
import StaffTable from "../components/StaffTable"

export default function StaffManagementPage() {
  return (
    <div className="space-y-6 p-6">
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold">
            Staff Management
          </h1>

          <p className="text-muted-foreground">
            Manage clinical staff, roles and access.
          </p>
        </div>

        <AddStaffDialog
          trigger={
            <Button>
              Add Staff
            </Button>
          }
        />
      </div>

      <div className="grid gap-4 md:grid-cols-[2fr_1fr]">
        <div className="grid gap-4 md:grid-cols-2">
          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>All Roles</option>
          </select>

          <select className="h-10 rounded-md border border-input bg-background px-3 text-sm">
            <option>All Status</option>
          </select>
        </div>

        <div className="rounded-xl bg-primary p-5 text-primary-foreground">
          <p className="text-sm opacity-80">
            TOTAL STAFF
          </p>

          <h2 className="mt-2 text-4xl font-bold">
            42
          </h2>
        </div>
      </div>

      <StaffTable />
    </div>
  )
}