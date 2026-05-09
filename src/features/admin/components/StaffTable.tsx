import {
 Card,
 CardContent,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import {
 Dialog,
 DialogContent,
 DialogDescription,
 DialogHeader,
 DialogTitle,
} from "@/components/ui/dialog"
import { Trash2 } from "lucide-react"
import { useState } from "react"

import type { StaffResponse } from "../types/staff.types"

interface StaffTableProps {
 staff: StaffResponse[]
 isLoading?: boolean
 isDeleting?: boolean
 onDeactivate: (staffId: number) => Promise<void>
}

export default function StaffTable({
 staff,
 isLoading = false,
 isDeleting = false,
 onDeactivate,
}: StaffTableProps) {
 const [selectedStaff, setSelectedStaff] =
 useState<StaffResponse | null>(null)

 const handleConfirmDeactivate = async () => {
 if (!selectedStaff) return

 await onDeactivate(selectedStaff.id)
 setSelectedStaff(null)
 }

 return (
 <>
 <Card>
 <CardContent className="overflow-x-auto p-0">
 <table className="w-full min-w-[760px]">
 <thead className="border-b bg-muted/30">
 <tr className="text-left text-sm text-muted-foreground">
 <th className="p-4">Name</th>
 <th className="p-4">Role</th>
 <th className="p-4">Email</th>
 <th className="p-4">Action</th>
 <th className="p-4">Status</th>
 </tr>
 </thead>

 <tbody>
 {isLoading &&
 Array.from({ length: 5 }).map((_, index) => (
 <tr
 key={index}
 className="border-b last:border-0"
 >
 <td
 colSpan={5}
 className="p-4"
 >
 <div className="h-8 animate-pulse rounded-md bg-muted" />
 </td>
 </tr>
 ))}

 {!isLoading && staff.length === 0 && (
 <tr>
 <td
 colSpan={5}
 className="p-6 text-center text-sm text-muted-foreground"
 >
 No staff found.
 </td>
 </tr>
 )}

 {!isLoading && staff.map((staffMember) => (
 <tr
 key={staffMember.id}
 className="border-b last:border-0"
 >
 <td className="p-4 font-medium">
 {staffMember.fullName}
 </td>

 <td className="p-4">
 <Badge variant="secondary">
 {staffMember.role}
 </Badge>
 </td>

 <td className="p-4 text-muted-foreground">

 {staffMember.email}
 </td>

 <td className="p-4">
 <Button
 type="button"
 variant="destructive"
 size="sm"
 disabled={!staffMember.isActive || isDeleting}
 onClick={() => setSelectedStaff(staffMember)}
 >
 <Trash2 />
 Deactivate
 </Button>
 </td>

 <td className="p-4">
 <span
 className={`inline-flex items-center gap-2 text-sm ${
 staffMember.isActive
 ? "text-green-600"
 : "text-muted-foreground"
 }`}
 >
 <span className="h-2 w-2 rounded-full bg-current" />
 {staffMember.isActive ? "Active" : "Inactive"}
 </span>
 </td>
 </tr>
 ))}
 </tbody>
 </table>
 </CardContent>
 </Card>

 <Dialog
 open={Boolean(selectedStaff)}
 onOpenChange={(open) => {
 if (!open) setSelectedStaff(null)
 }}
 >
 <DialogContent>
 <DialogHeader>
 <DialogTitle>
 Deactivate staff account?
 </DialogTitle>

 <DialogDescription>
 This will disable login access for{" "}
 {selectedStaff?.fullName}.
 </DialogDescription>
 </DialogHeader>

 <div className="flex justify-end gap-3">
 <Button
 type="button"
 variant="outline"
 onClick={() => setSelectedStaff(null)}
 disabled={isDeleting}
 >
 Cancel
 </Button>

 <Button
 type="button"
 variant="destructive"
 disabled={isDeleting}
 onClick={handleConfirmDeactivate}
 >
 {isDeleting ? "Deactivating..." : "Deactivate"}
 </Button>
 </div>
 </DialogContent>
 </Dialog>
 </>
 )
}
