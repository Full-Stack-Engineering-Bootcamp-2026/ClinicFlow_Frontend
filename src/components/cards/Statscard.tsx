import React from 'react'

import { Card, CardContent } from "@/components/ui/card";
import { cn } from "@/lib/utils";


interface StatsCardProps {
  title: string;
  value: string;
  icon: React.ReactNode;
  color?: "blue" | "green" | "yellow" | "red";
}

const colorStyles = {
  blue: "bg-blue-50 text-blue-600",
  green: "bg-green-50 text-green-600",
  yellow: "bg-yellow-50 text-yellow-600",
  red: "bg-red-50 text-red-600",
};




function Statscard({title,value,icon,color='blue'}:StatsCardProps) {
  return (
    <div>
         <Card className="rounded-2xl shadow-sm">
      <CardContent className="flex items-center justify-between p-4">
        <div>
          <p className="text-sm text-muted-foreground">{title}</p>
          <h2 className="text-xl font-semibold">{value}</h2>
        </div>

        <div className={cn("p-3 rounded-xl", colorStyles[color])}>
          {icon}
        </div>
      </CardContent>
    </Card>
      
    </div>
  )
}

export default Statscard
