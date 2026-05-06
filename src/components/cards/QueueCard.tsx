import React from 'react'


import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";


interface Patient {
  id: string;
  name: string;
}

interface QueueCardProps {
  doctorName: string;
  specialization: string;
  serving: string;
  next: string;
  queue: Patient[];
  status?: "active" | "break";
}

function QueueCard({  doctorName,
  specialization,
  serving,
  next,
  queue,
  status = "active",}:QueueCardProps) {
  return (
    <div>
          <Card className="rounded-2xl shadow-sm">

        <CardHeader className="flex flex-row items-center justify-between pb-2">
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarImage src="/doctor.png" />
            <AvatarFallback>DR</AvatarFallback>
          </Avatar>

          <div>
            <h3 className="font-semibold">{doctorName}</h3>
            <p className="text-sm text-muted-foreground">
              {specialization} 
            </p>
          </div>
        </div>

        <Badge variant={status === "active" ? "default" : "secondary"}>
          {status === "active" ? "Active" : "Break"}
        </Badge>
      </CardHeader>

        <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-2">
          <div className="bg-orange-50 p-3 rounded-xl">
            <p className="text-xs text-muted-foreground">Serving Now</p>
            <p className="font-semibold">{serving}</p>
          </div>

          <div className="bg-blue-50 p-3 rounded-xl">
            <p className="text-xs text-muted-foreground">Next Up</p>
            <p className="font-semibold">{next}</p>
          </div>
        </div>

            <div className="space-y-2">
          {queue.length === 0 ? (
            <p className="text-sm text-muted-foreground">
              No patients in queue
            </p>
          ) : (
            queue.map((p, i) => (
              <div
                key={p.id}
                className="flex justify-between text-sm border-b pb-1"
              >
                <span>#{i + 1} {p.name}</span>
                <button className="text-blue-500 text-xs">
                  View
                </button>
              </div>
            ))
          )}
        </div>

        </CardContent>
      </Card>
    </div>
  )
}

export default QueueCard
