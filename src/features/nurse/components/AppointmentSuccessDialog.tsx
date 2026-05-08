import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"

import { Button } from "@/components/ui/button"

import { CheckCircle2 } from "lucide-react"
import type { AppointmentSuccessDialogProps } from "../types"



export default function AppointmentSuccessDialog({
  open,
  onOpenChange,
  queueNumber,
  appointmentId,
  patientName,
  doctorName,
  appointmentDate,
  visitType,
  onGoToQueue,
}: AppointmentSuccessDialogProps) {
  return (
    <Dialog
      open={open}
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-md">
        
        <DialogHeader>
          <div className="mb-4 flex justify-center">
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#ddf9f3]">
              <CheckCircle2 className="h-7 w-7 text-[#006c4e]" />
            </div>
          </div>

          <DialogTitle className="text-center text-xl">
            Appointment Confirmed
          </DialogTitle>

          <DialogDescription className="text-center">
            Patient appointment has been successfully booked
          </DialogDescription>
        </DialogHeader>

        <div className="my-6 rounded-2xl bg-[#eef5ff] p-5 text-center">
          
          <p className="text-xs font-medium tracking-wide text-muted-foreground">
            QUEUE NUMBER
          </p>

          <p className="mt-2 text-4xl font-bold text-[#2156a5]">
            {queueNumber}
          </p>
        </div>

        <div className="space-y-4">
          
          <div className="flex justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Patient
            </p>

            <p className="text-right text-sm font-medium">
              {patientName}
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Doctor
            </p>

            <p className="text-right text-sm font-medium">
              {doctorName}
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Visit Type
            </p>

            <p className="text-right text-sm font-medium">
              {visitType}
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Date
            </p>

            <p className="text-right text-sm font-medium">
              {appointmentDate}
            </p>
          </div>

          <div className="flex justify-between gap-4">
            <p className="text-sm text-muted-foreground">
              Appointment ID
            </p>

            <p className="text-right text-sm font-medium">
              {appointmentId}
            </p>
          </div>
        </div>

        <DialogFooter className="mt-6">
          <Button
            onClick={onGoToQueue}
            className="w-full cursor-pointer"
          >
            Go To Live Queue
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}