import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
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

      <Button
  asChild
  variant="outline"
>
  <Link to="/doctor-schedules">
    Manage Doctor Schedules
  </Link>
</Button>
    </div>
  )
}