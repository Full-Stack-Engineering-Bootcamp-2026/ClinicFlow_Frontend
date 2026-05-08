import { Check } from "lucide-react"

import { Button } from "@/components/ui/button"
import type { PatientCardProps } from "../types"



export default function PatientCard({
  fullName,
  patientId,
  phoneNumber,
  isReturning,
  selected = false,
  onSelect,
  onViewHistory,
}: PatientCardProps) {
  return (
    <div
      onClick={onSelect}
      className={`h-full cursor-pointer rounded-2xl border p-4 transition-all hover:shadow-sm ${
        selected
          ? "border-[#bfd7ff] bg-[#eef5ff]"
          : "border-border bg-card hover:border-primary/30"
      }`}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#d2e4ff] text-sm font-semibold text-[#2156a5]">
            {fullName
              .split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>

          <div>
            <h3 className="text-sm font-semibold">
              {fullName}
            </h3>

            <p className="text-xs text-muted-foreground">
              {patientId}
            </p>

            <p className="text-xs text-muted-foreground">
              {phoneNumber}
            </p>
          </div>
        </div>

        {selected && (
          <div className="flex h-6 w-6 items-center justify-center rounded-full bg-[#2156a5]">
            <Check className="h-3 w-3 text-white" />
          </div>
        )}
      </div>

      <div className="mt-4 flex items-center justify-between">
        <span
          className={`rounded-full px-2 py-0.5 text-[9px] font-medium tracking-wide ${
            isReturning
              ? "bg-[#eef7f2] text-[#4d8b68]"
              : "bg-[#eef4ff] text-[#4b6cb7]"
          }`}
        >
          {isReturning
            ? "RETURNING"
            : "NEW"}
        </span>

        <Button
          variant="ghost"
          size="sm"
          onClick={(e) => {
            e.stopPropagation()

            if (isReturning) {
              onViewHistory?.()
            } else {
              onSelect?.()
            }
          }}
          className="h-auto cursor-pointer px-2 py-1 text-[11px] text-muted-foreground hover:text-foreground"
        >
          {isReturning
            ? "View History"
            : "Select Patient"}
        </Button>
      </div>
    </div>
  )
}