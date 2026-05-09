import { useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"
import { useSelector } from "react-redux"
import { toast } from "react-toastify"

import {
 Dialog,
 DialogContent,
 DialogHeader,
 DialogTitle,
 DialogDescription,
 DialogTrigger,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"

import {
 addStaffSchema,
 type AddStaffFormValues,
} from "../types/staff.schema"
import type { RootState } from "@/app/store"
import { createStaff, getRoles } from "../services/staffApi"
import type { RoleResponse } from "../types/staff.types"

interface AddStaffDialogProps {
 trigger: React.ReactNode
 onStaffCreated?: () => void
}

export default function AddStaffDialog({
 trigger,
 onStaffCreated,
}: AddStaffDialogProps) {
 const token = useSelector((state: RootState) => state.auth.token)
 const [open, setOpen] = useState(false)
 const [roles, setRoles] = useState<RoleResponse[]>([])
 const [isSubmitting, setIsSubmitting] = useState(false)
 const [isLoadingRoles, setIsLoadingRoles] = useState(false)

 const {
 register,
 handleSubmit,
 formState: { errors },
 reset,
 } = useForm<AddStaffFormValues>({
 resolver: zodResolver(addStaffSchema),
 defaultValues: {
 fullName: "",
 email: "",
 roleId: 0,
 phone: "",
 password: "",
 officialRole: "",
 specialization: "",
 },
 })

 const handleOpenChange = async (nextOpen: boolean) => {
 setOpen(nextOpen)

 if (!nextOpen || !token || roles.length > 0) return

 try {
 setIsLoadingRoles(true)
 setRoles(await getRoles(token))
 } catch (error) {
 toast.error(
 error instanceof Error
 ? error.message
 : "Failed to load roles"
 )
 } finally {
 setIsLoadingRoles(false)
 }
 }

const onSubmit = async (data: AddStaffFormValues) => {
 if (!token) {
 toast.error("Please login again")
 return
 }

 try {
 setIsSubmitting(true)

 await createStaff(token, {
 ...data,
 officialRole: data.officialRole?.trim() || undefined,
 specialization:
 data.specialization?.trim() || undefined,
 })

 toast.success("Staff account created")

 onStaffCreated?.()

 reset()

 setOpen(false)
 } catch (error) {
 toast.error(
 error instanceof Error
 ? error.message
 : "Failed to create staff account"
 )
 } finally {
 setIsSubmitting(false)
 }
 }

 return (
 <Dialog open={open} onOpenChange={handleOpenChange}>
 <DialogTrigger asChild>
 {trigger}
 </DialogTrigger>

 <DialogContent className="sm:max-w-xl">
 <DialogHeader>
 <DialogTitle>
 Add Staff Account
 </DialogTitle>

 <DialogDescription>
 Register a new clinical staff member
 </DialogDescription>
 </DialogHeader>

 <form
 onSubmit={handleSubmit(onSubmit)}
 className="space-y-5 pt-4"
 >
 <div className="space-y-2">
 <label className="text-sm font-medium">
 Full Name
 </label>

<Input
 placeholder="Dr. Helena Hills"
 {...register("fullName")}
 />

 {errors.fullName && (
 <p className="text-sm text-destructive">
 {errors.fullName.message}
 </p>
 )}
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">
 Email Address
 </label>

 <Input
 type="email"
 placeholder="staff@clinicflow.com"
 {...register("email")}
 />

 {errors.email && (
 <p className="text-sm text-destructive">
 {errors.email.message}
 </p>
 )}
 </div>

<div className="grid gap-4 md:grid-cols-2">
 <div className="space-y-2">
 <label className="text-sm font-medium">
 Role
 </label>

 <select
 {...register("roleId", {
 valueAsNumber: true,
 })}
 className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
 disabled={isLoadingRoles}
 >
 <option value={0}>
 {isLoadingRoles
 ? "Loading roles..."
 : "Select Role"}
 </option>

{roles.map((role) => (
 <option
 key={role.id}
 value={role.id}
 >
 {role.name}
 </option>
 ))}
 </select>

 {errors.roleId && (
 <p className="text-sm text-destructive">
 {errors.roleId.message}
 </p>
 )}
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">
 Phone Number
 </label>

 <Input
 placeholder="+91 9876543210"
 {...register("phone")}
 />

 {errors.phone && (
 <p className="text-sm text-destructive">
 {errors.phone.message}
 </p>
 )}
 </div>
 </div>

 <div className="grid gap-4 md:grid-cols-2">
 <div className="space-y-2">
 <label className="text-sm font-medium">
 Official Role
 </label>

 <Input
 placeholder="Senior Cardiologist"
 {...register("officialRole")}
 />
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">
 Specialization
 </label>

 <Input
 placeholder="Cardiology"
 {...register("specialization")}
 />
 </div>
 </div>

 <div className="space-y-2">
 <label className="text-sm font-medium">
 Temporary Password
 </label>

 <Input
 type="password"
 placeholder="********"
 {...register("password")}
 />

 {errors.password && (
 <p className="text-sm text-destructive">
 {errors.password.message}
 </p>
 )}
 </div>

 <div className="flex justify-end gap-3 pt-4">
 <Button
 type="button"
 variant="outline"
 onClick={() => setOpen(false)}
 >
 Cancel
 </Button>

 <Button
 type="submit"
 disabled={isSubmitting}
 >
 {isSubmitting
 ? "Creating..."
 : "Create Staff Account"}
 </Button>
 </div>
 </form>
 </DialogContent>
 </Dialog>
 )
}
