import { Card, CardContent } from "@/components/ui/card"

export default function SecurityCard() {
  return (
    <Card className="border-border shadow-sm">
      <CardContent className="space-y-4 p-6">
        <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-muted">
          🔒
        </div>

        <div>
          <h3 className="font-semibold text-foreground">
            Data Security
          </h3>

          <p className="mt-2 text-sm text-muted-foreground">
            HIPAA compliant encryption active for all patient files.
          </p>
        </div>

        <button className="text-sm font-medium text-primary">
          Audit Logs
        </button>
      </CardContent>
    </Card>
  )
}