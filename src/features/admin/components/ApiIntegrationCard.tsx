import { Card, CardContent } from "@/components/ui/card"

export default function ApiIntegrationCard() {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="space-y-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
          API
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Integrated API
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            Connect your lab results and pharmacy inventory seamlessly.
          </p>
        </div>

        <button className="text-sm font-medium text-primary">
          Configure
        </button>
      </CardContent>
    </Card>
  )
}