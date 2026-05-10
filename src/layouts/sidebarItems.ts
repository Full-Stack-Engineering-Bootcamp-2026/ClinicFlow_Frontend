import {
  Home,
  Users,
  Calendar,
  UserCog,
  ClipboardPlus,
  Stethoscope,
} from "lucide-react"

import type { LucideIcon } from "lucide-react"

export interface SidebarItem {
  title: string

  path: string

  icon: LucideIcon
}

export const sidebarItems = {
  ADMIN: [
    {
      title: "Dashboard",

      path: "/dashboard",

      icon: Home,
    },

    {
      title:
        "Staff Management",

      path:
        "/staff-management",

      icon: UserCog,
    },

    {
      title:
        "Doctor Schedules",

      path:
        "/doctor-schedules",

      icon: Stethoscope,
    },

    {
      title:
        "Register Patient",

      path:
        "/nurse/register-patient",

      icon: Users,
    },

    {
      title: "Live Queue",

      path:
        "/nurse/live-queue",

      icon: Calendar,
    },
  ],

  NURSE: [
    {
      title: "Live Queue",

      path:
        "/nurse/live-queue",

      icon: Calendar,
    },

    {
      title:
        "Register Patient",

      path:
        "/nurse/register-patient",

      icon: Users,
    },

    {
      title:
        "Book Appointment",

      path:
        "/nurse/book-appointment",

      icon: ClipboardPlus,
    },
  ],

  DOCTOR: [
    {
      title: "Live Queue",

      path: "/doctor/queue",

      icon: Calendar,
    },
  ],
}