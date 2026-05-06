import {
  Home,
  Users,
  Calendar,
  UserCog,
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
      title: "Dashboard",
      path: "/",
      icon: Home,
    },
    {
      title: "Live Queue",
      path: "/live-queue",
      icon: Calendar,
    },
    {
      title: "Register Patient",
      path: "/patients/register",
      icon: Users,
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