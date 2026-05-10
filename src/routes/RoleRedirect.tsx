import { Navigate } from "react-router-dom"

import { useSelector } from "react-redux"

import type { RootState } from "@/app/store"

export default function RoleRedirect() {
  const user = useSelector((state: RootState) => state.auth.user)

  if (user?.role === "NURSE") {
    return <Navigate to="/nurse/live-queue" replace />
  }

  if (user?.role === "DOCTOR") {
    return <Navigate to="/doctor/queue" replace />
  }

  return <Navigate to="/dashboard" replace />
}
