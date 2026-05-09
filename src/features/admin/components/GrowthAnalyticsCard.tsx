import { Card, CardContent } from "@/components/ui/card"

export default function GrowthAnalyticsCard() {
  return (
    <Card className="overflow-hidden border-border shadow-sm">
      <CardContent className="relative h-full min-h-[260px] p-0">
        <div className="absolute inset-0 bg-primary/80" />

        <div className="relative flex h-full flex-col justify-end p-6 text-primary-foreground">
          <p className="text-sm uppercase tracking-wider">
            Growth Analytics
          </p>

          <h2 className="mt-2 text-3xl font-bold">
            Clinical Performance is up 12%
          </h2>

          <p className="mt-3 max-w-md text-sm text-primary-foreground/80">
            Your facility reached a record patient throughput this month.
          </p>
        </div>
      </CardContent>
    </Card>
  )
}