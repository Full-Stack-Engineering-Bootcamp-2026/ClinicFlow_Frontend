import type {
 ScheduleStatusFilter,
} from "../types/schedule.types"
interface ScheduleFiltersProps {
  specializations: string[]
  selectedSpecialization: string
   selectedStatus: ScheduleStatusFilter
 onSpecializationChange: (value: string) => void
 onStatusChange: (value: ScheduleStatusFilter) => void
}

export default function ScheduleFilters({
  specializations,
  selectedSpecialization,
  selectedStatus,
  onSpecializationChange,
  onStatusChange,
}: ScheduleFiltersProps) {
  return (
    <div className="grid gap-3 sm:grid-cols-2">
 <select
 value={selectedSpecialization}
 onChange={(e) =>
 onSpecializationChange(e.target.value)
 }
 className="h-9 rounded-md border border-input bg-background px-3 text-sm"
 >
 <option value="">All Specializations</option>

         {specializations.map((specialization) => (
 <option
 key={specialization}
 value={specialization}
          >
            {specialization}
 </option>
 ))}
 </select>
          
      <select
 value={selectedStatus}
 onChange={(e) =>
 onStatusChange(e.target.value as ScheduleStatusFilter)
 }
 className="h-9 rounded-md border border-input bg-background px-3 text-sm"
 >
 <option value="ALL">All Status</option>
 <option value="WORKING">Working</option>
 <option value="ON_LEAVE">On Leave</option>
 </select>
    </div>
  )
}