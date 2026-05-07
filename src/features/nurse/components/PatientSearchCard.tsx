import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"

type PatientSearchCardProps = {
  value: string

  onChange: (value: string) => void

  onSearch?: () => void
}

export default function PatientSearchCard({
  value,
  onChange,
  onSearch,
}: PatientSearchCardProps) {
  return (
    <div className="rounded-2xl bg-card p-6 shadow-sm">
      <div className="mb-5">
        <h2 className="text-lg font-semibold">Search Patient</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Search by patient name
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex flex-1 items-center rounded-xl border border-border bg-background px-3">
          <Search className="h-4 w-4 text-muted-foreground" />

          <input
            type="text"
            value={value}
            onChange={(e) => onChange(e.target.value)}
            placeholder="Enter patient name"
            className="w-full bg-transparent px-3 py-3 text-sm outline-none placeholder:text-muted-foreground"
          />
        </div>

        <Button
          onClick={onSearch}
          className=" cursor-pointer rounded-xl "
        >
          Search
        </Button>
      </div>
    </div>
  )
}
