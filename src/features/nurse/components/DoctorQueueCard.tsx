import QueueTable from "./QueueTable"

import type { DoctorQueueCardProps } from "../types"

const queueStatusConfig = {
  ACTIVE: {
    bg: "bg-green-100",
    text: "text-green-700",
  },

  YET_TO_START: {
    bg: "bg-yellow-100",
    text: "text-yellow-700",
  },

  BETWEEN_CONSULTATIONS: {
    bg: "bg-blue-100",
    text: "text-blue-700",
  },

  BREAK: {
    bg: "bg-gray-100",
    text: "text-gray-700",
  },
}

export default function DoctorQueueCard({ queue }: DoctorQueueCardProps) {
  const servingNow = queue.waitingPatients.find(
    (patient) => patient.status === "IN_PROGRESS"
  )

  const waitingPatients = queue.waitingPatients.filter(
    (patient) => patient.status === "WAITING"
  )

  const nextUp = waitingPatients[0]

  const remainingQueue = waitingPatients.slice(1)

  const statusStyle =
    queueStatusConfig[queue.queueState as keyof typeof queueStatusConfig]

  return (
    <div className="rounded-2xl border border-border bg-card p-5 shadow-sm">
      <div className="flex items-start justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#dbeafe] text-sm font-semibold text-[#2563eb]">
            {queue.doctorName
              .split(" ")
              .map((name) => name[0])
              .slice(0, 2)
              .join("")
              .toUpperCase()}
          </div>

          <div>
            <h3 className="text-sm font-semibold">{queue.doctorName}</h3>

            <p className="text-xs text-muted-foreground">
              {queue.specialization}
            </p>
          </div>
        </div>

        <span
          className="rounded-full px-2 py-1 text-[10px] font-medium"
          style={{
            backgroundColor: statusStyle.bg,
            color: statusStyle.text,
          }}
        >
          {queue.queueState.replaceAll("_", " ")}
        </span>
      </div>

      {!servingNow && !nextUp ? (
        <div className="mt-6 rounded-xl border border-dashed border-border py-8 text-center">
          <p className="text-sm text-muted-foreground">No patients in queue</p>
        </div>
      ) : (
        <>
          <div className="mt-5 grid grid-cols-2 gap-3">
            <div className="rounded-xl bg-[#fffdfc] p-3">
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Serving Now
              </p>

              {servingNow ? (
                <div className="mt-2">
                  <div className="flex items-end gap-2">
                    <h4 className="text-xl font-bold text-[#a88051]">
                      #{servingNow.queueNumber}
                    </h4>

                    <p className="mb-0.5 truncate text-sm text-muted-foreground">
                      {servingNow.patientName}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">-</p>
              )}
            </div>

            <div className="rounded-xl bg-[#eef5ff] p-3">
              <p className="text-[10px] font-medium tracking-wide text-muted-foreground uppercase">
                Next Up
              </p>

              {nextUp ? (
                <div className="mt-2">
                  <div className="flex items-end gap-2">
                    <h4 className="text-xl font-bold text-[#2563eb]">
                      #{nextUp.queueNumber}
                    </h4>

                    <p className="mb-0.5 truncate text-sm text-muted-foreground">
                      {nextUp.patientName}
                    </p>
                  </div>
                </div>
              ) : (
                <p className="mt-3 text-sm text-muted-foreground">-</p>
              )}
            </div>
          </div>

          <div className="mt-5 h-40 overflow-y-scroll ">
            <QueueTable patients={remainingQueue} />
          </div>
        </>
      )}
    </div>
  )
}
