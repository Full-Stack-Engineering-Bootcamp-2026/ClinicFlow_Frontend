import { useState } from "react"

import { useForm } from "react-hook-form"

import { zodResolver } from "@hookform/resolvers/zod"

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

interface AddStaffDialogProps {
  trigger: React.ReactNode
}

export default function AddStaffDialog({
  trigger,
}: AddStaffDialogProps) {
  const [open, setOpen] = useState(false)

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
      role: "",
      phone: "",
      password: "",
    },
  })

  const onSubmit = (data: AddStaffFormValues) => {
    console.log("Validated Staff Data:", data)

    reset()

    setOpen(false)
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
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
                {...register("role")}
                className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
              >
                <option value="">
                  Select Role
                </option>

                <option value="DOCTOR">
                  Doctor
                </option>

                <option value="NURSE">
                  Nurse
                </option>

                <option value="ADMIN">
                  Admin
                </option>
              </select>

              {errors.role && (
                <p className="text-sm text-destructive">
                  {errors.role.message}
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

            <Button type="submit">
              Create Staff Account
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}