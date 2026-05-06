import { Button } from "@/components/ui/button"

import AddStaffDialog from "./AddStaffDialog"

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      <AddStaffDialog
        trigger={
          <Button>
            Add Staff
          </Button>
        }
      />

      <Button variant="outline">
        Manage Schedules
      </Button>
    </div>
  )
}