import { Button } from "@/components/ui/button"

import { quickActions } from "../mock/dashboard.mock"

export default function QuickActions() {
  return (
    <div className="flex flex-wrap gap-3">
      {quickActions.map((action) => (
        <Button
          key={action.id}
          variant={action.id === 1 ? "default" : "outline"}
        >
          {action.label}
        </Button>
      ))}
    </div>
  )
}