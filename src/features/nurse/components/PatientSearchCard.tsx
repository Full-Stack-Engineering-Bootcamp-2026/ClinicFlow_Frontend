import { Search } from "lucide-react"

import type { PatientSearchCardProps } from "../types"

export default function PatientSearchCard({
  value,
  onChange,
}: PatientSearchCardProps) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-sm">
      
      <div className="mb-3">
        
        <h2 className="text-base font-semibold">
          Search Patient
        </h2>

        <p className="mt-0.5 text-xs text-muted-foreground">
          Search by patient name or mobile number
        </p>
      </div>

      <div className="flex items-center rounded-xl border border-border bg-background px-3">
        
        <Search className="h-4 w-4 text-muted-foreground" />

        <input
          type="text"
          value={value}
          onChange={(e) =>
            onChange(e.target.value)
          }
          placeholder="Search patient..."
          className="w-full bg-transparent px-3 py-2.5 text-sm outline-none placeholder:text-muted-foreground"
        />
      </div>
    </div>
  )
}