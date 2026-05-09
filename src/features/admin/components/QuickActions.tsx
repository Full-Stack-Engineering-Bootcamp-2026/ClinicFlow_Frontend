import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import AddStaffDialog from "./AddStaffDialog"

interface QuickActionsProps {
 onStaffCreated?: () => void
}

export default function QuickActions({
 onStaffCreated,
}: QuickActionsProps) {
 return (
 <div className="flex flex-wrap gap-3">
 <AddStaffDialog
 onStaffCreated={onStaffCreated}
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