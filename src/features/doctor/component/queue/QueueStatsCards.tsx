import {
  Card,
  CardContent,
} from "@/components/ui/card";

import type {
  QueueStats,
} from "../../types/queue.types";

interface QueueStatsCardsProps {
  stats: QueueStats;
}
import {
  Clock3,
  Activity,
  CheckCircle2,
  CalendarDays,
} from "lucide-react";

const QueueStatsCards = ({
  stats,
}: QueueStatsCardsProps) => {
  const cards = [
    {
      title: "Waiting",
      value: stats.waiting,
    },

    {
      title: "In Progress",
      value: stats.inProgress,
    },

    {
      title: "Completed",
      value: stats.completed,
    },

    {
      title: "Total Today",
      value: stats.totalToday,
    },
  ];

  return (
    <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4 xl:h-24 ">
      {cards.map((card) => (
        <Card className="" key={card.title}>
          <CardContent className=" p-5 py-1">
            <p className="text-sm text-muted-foreground ">
              {card.title}
            </p>

            <h2 className="text-3xl font-bold">
              {card.value}
            </h2>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default QueueStatsCards;