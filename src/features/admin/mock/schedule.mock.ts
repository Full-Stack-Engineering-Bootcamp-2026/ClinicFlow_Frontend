import type { DoctorSchedule } from "../types/schedule.types"

export const doctorSchedules: DoctorSchedule[] = [
  {
    id: 1,

    doctorName: "Dr. Sarah Jenkins",

    specialization: "General Medicine",

    dayOfWeek: "MON",

    startTime: "09:00",

    endTime: "13:00",

    maxAppointments: 20,

    isActive: true,

    leaveExceptions: [],
  },

  {
    id: 2,

    doctorName: "Dr. Sarah Jenkins",

    specialization: "General Medicine",

    dayOfWeek: "WED",

    startTime: "09:00",

    endTime: "13:00",

    maxAppointments: 20,

    isActive: true,

    leaveExceptions: [],
  },

  {
    id: 3,

    doctorName: "Dr. Sarah Jenkins",

    specialization: "General Medicine",

    dayOfWeek: "FRI",

    startTime: "09:00",

    endTime: "17:00",

    maxAppointments: 30,

    isActive: true,

    leaveExceptions: [
      {
        id: 1,

        doctorScheduleId: 3,

        exceptionDate: "2025-06-13",

        reason: "Doctor personal leave",
      },
    ],
  },
]