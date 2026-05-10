interface WeekDaySelectorProps {
  workingDays: string[]
  leaveDays: string[]

  onToggle: (
    day: string
  ) => void
}

const allDays = [
  "M",
  "T",
  "W",
  "T",
  "F",
]

export default function WeekDaySelector({
  workingDays,
  leaveDays,
  onToggle,
}: WeekDaySelectorProps) {
  return (
    <div className="flex gap-2">
      {allDays.map((day, index) => {
        const isWorking =
          workingDays[index]

        const isLeave =
          leaveDays.includes(day)

        return (
          <button
            key={`${day}-${index}`}
            type="button"
            onClick={() =>
              onToggle(day)
            }
            disabled={!isWorking}
            className={`flex h-10 w-10 items-center justify-center rounded-md text-sm font-medium transition-colors ${
              isLeave
                ? "bg-destructive text-destructive-foreground"
                : "bg-primary text-primary-foreground"
            }`}
          >
            {day}
          </button>
        )
      })}
    </div>
  )
}