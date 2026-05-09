import { Button } from "@/components/ui/button"

interface ScheduleFiltersProps {
  selectedSpecialization: string
  selectedStatus: string

  onSpecializationChange: (
    value: string
  ) => void

  onStatusChange: (
    value: string
  ) => void
}

export default function ScheduleFilters({
  selectedSpecialization,
  selectedStatus,
  onSpecializationChange,
  onStatusChange,
}: ScheduleFiltersProps) {
  return (
    <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
      <div className="flex flex-wrap gap-3">
        <select
          value={selectedSpecialization}
          onChange={(e) =>
            onSpecializationChange(e.target.value)
          }
          className="h-10 rounded-md border border-input bg-background px-3 text-sm"
        >
          <option value="">
            All Departments
          </option>

          <option value="General Medicine">
            General Medicine
          </option>

          <option value="Pediatrics">
            Pediatrics
          </option>

          <option value="Cardiology">
            Cardiology
          </option>
        </select>

        <div className="flex rounded-lg bg-muted p-1">
          <Button
            size="sm"
            variant={
              selectedStatus === "Working"
                ? "default"
                : "ghost"
            }
            onClick={() =>
              onStatusChange("Working")
            }
          >
            Working
          </Button>

          <Button
            size="sm"
            variant={
              selectedStatus === "On Leave"
                ? "default"
                : "ghost"
            }
            onClick={() =>
              onStatusChange("On Leave")
            }
          >
            On Leave
          </Button>
        </div>
      </div>
    </div>
  )
}