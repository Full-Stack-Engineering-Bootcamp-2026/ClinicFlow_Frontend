import {
  Home,
  Users,
  Calendar,
  UserCog,
  ClipboardPlus,
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
      path: "/",
      icon: Home,
    },
    {
      title: "Staff Management",
      path: "/staff-management",
      icon: UserCog,
    },
    {
      title: "Register Patient",
      path: "/patients/register",
      icon: Users,
    },
    {
      title: "Live Queue",
      path: "/live-queue",
      icon: Calendar,
    },
  ],

  NURSE: [
    {
      title: "Live Queue",
      path: "/nurse/live-queue",
      icon: Calendar,
    },
    {
      title: "Register Patient",
      path: "/nurse/register-patient",
      icon: Users,
    },
    {
    title: "Book Appointment",
    path: "/nurse/book-appointment",
    icon: ClipboardPlus,
  },
  ],

  DOCTOR: [
    {
      title: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      title: "Live Queue",
      path: "/live-queue",
      icon: Calendar,
    },
  ],
}