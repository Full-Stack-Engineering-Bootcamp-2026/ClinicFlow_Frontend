import { Avatar, AvatarFallback } from "@/components/ui/avatar"

import { Card, CardContent } from "@/components/ui/card"

interface PatientSummaryCardProps {
  patient: {
    id: number

    fullName: string

    gender: string

    age: number

    bloodGroup: string
  }
}

const PatientSummaryCard = ({ patient }: PatientSummaryCardProps) => {
  const initials = patient.fullName
    .split(" ")
    .map((name) => name[0])
    .join("")
    .slice(0, 2)
    .toUpperCase()

  return (
    <Card className="border border-border shadow-sm">
      <CardContent className="p-4">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:gap-8">
          <div className="flex items-center gap-3">
            <Avatar className="h-11 w-11 border border-primary/20 bg-primary/10">
              <AvatarFallback className="bg-primary/10 text-sm font-semibold text-primary">
                {initials}
              </AvatarFallback>
            </Avatar>

            <div>
              <h2 className="text-base font-semibold">{patient.fullName}</h2>

              <p className="text-sm text-muted-foreground">
                Patient ID #{patient.id}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <span className="rounded-md bg-muted px-3 py-1 text-xs font-medium">
              {patient.gender}
            </span>

            <span className="rounded-md bg-muted px-3 py-1 text-xs font-medium">
              {patient.bloodGroup}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default PatientSummaryCard
