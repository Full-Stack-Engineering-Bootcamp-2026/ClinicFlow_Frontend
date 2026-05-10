import { Clock3, Activity, CheckCircle2, CalendarDays } from "lucide-react"

import type { QueueStats } from "../../types/queue.types"

interface QueueStatsCardsProps {
  stats: QueueStats
}

const QueueStatsCards = ({ stats }: QueueStatsCardsProps) => {
  const cards = [
    {
      title: "Waiting",

      value: stats.waiting,

      subtitle: "Patients",

      icon: Clock3,

      iconBgColor: "#fef3c7",

      iconColor: "#d97706",
    },

    {
      title: "In Progress",

      value: stats.inProgress,

      subtitle: "Active",

      icon: Activity,

      iconBgColor: "#dbeafe",

      iconColor: "#2563eb",
    },

    {
      title: "Completed",

      value: stats.completed,

      subtitle: "Done",

      icon: CheckCircle2,

      iconBgColor: "#dcfce7",

      iconColor: "#16a34a",
    },

    {
      title: "Total Today",

      value: stats.totalToday,

      subtitle: "Cases",

      icon: CalendarDays,

      iconBgColor: "#f3e8ff",

      iconColor: "#9333ea",
    },
  ]

  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-4">
      {cards.map((card) => {
        const Icon = card.icon

        return (
          <div
            key={card.title}
            className="rounded-2xl border border-border bg-card p-4 shadow-sm"
          >
            <div className="flex items-start gap-3">
              <div
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl"
                style={{
                  backgroundColor: card.iconBgColor,
                }}
              >
                <Icon
                  className="h-5 w-5"
                  style={{
                    color: card.iconColor,
                  }}
                />
              </div>

              <div className="min-w-0">
                <p className="text-xs text-muted-foreground">{card.title}</p>

                <div className="mt-1 flex items-baseline gap-1">
                  <h3 className="text-2xl leading-none font-bold">
                    {card.value}
                  </h3>

                  <span className="text-sm font-medium text-muted-foreground">
                    {card.subtitle}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )
      })}
    </div>
  )
}

export default QueueStatsCards
