"use client"

import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
} from "@/components/ui/sidebar"

import { useSidebar } from "@/components/ui/sidebar"

import { Home, Users, Calendar, LogOut } from "lucide-react"

import { CiMedicalCase } from "react-icons/ci"

import { NavLink } from "react-router-dom"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { AppDispatch } from "@/app/store"
import { logout } from "@/features/auth/authSlice"

export function AppSidebar() {
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const { state , setOpenMobile} = useSidebar()

  return (
    <Sidebar collapsible="icon" className="border-r-0 bg-card">
      <SidebarHeader
        className={`flex h-14 flex-row items-center bg-card ${state === "collapsed" ? "px-[8px]" : "px-3"} `}
      >
        <div className="flex size-8 shrink-0 items-center justify-center rounded-lg bg-primary">
          <CiMedicalCase className="text-xl text-white" />
        </div>

        <span
          className={`text-lg font-semibold whitespace-nowrap transition-all duration-200 ${
            state === "collapsed"
              ? "w-0 overflow-hidden opacity-0"
              : "ml-2 opacity-100"
          } `}
        >
          ClinicFlow
        </span>
      </SidebarHeader>

      <SidebarContent className="bg-card px-2 py-2">
        <SidebarMenu className="space-y-1">
          <SidebarMenuItem>
            <NavLink to="/" end>
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Dashboard"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  } `}
                  onClick={() => setOpenMobile(false)}
                >
                  <Home className="h-4 w-4 shrink-0" />
                  <span>Dashboard</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <NavLink to="/patients">
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Patients"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  } `}
                  onClick={() => setOpenMobile(false)}
                >
                  <Users className="h-4 w-4 shrink-0" />
                  <span>Patients</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>

          <SidebarMenuItem>
            <NavLink to="/appointments">
              {({ isActive }) => (
                <SidebarMenuButton
                  tooltip="Appointments"
                  className={`flex items-center gap-3 rounded-lg px-3 py-2 transition-all cursor-pointer ${
                    isActive
                      ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                      : "text-muted-foreground hover:bg-muted hover:text-foreground"
                  } `}
                  onClick={() => setOpenMobile(false)}
                >
                  <Calendar className="h-4 w-4 shrink-0" />
                  <span>Appointments</span>
                </SidebarMenuButton>
              )}
            </NavLink>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-card px-2 py-2">
        <button
          className="flex w-full items-center cursor-pointer gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-500"
          onClick={handleLogout}
        >
          <LogOut className="h-4 w-4 shrink-0" />

          <span
            className={`whitespace-nowrap transition-all duration-200 ${
              state === "collapsed"
                ? "w-0 overflow-hidden opacity-0"
                : "opacity-100"
            } `}
          >
            Logout
          </span>
        </button>
      </SidebarFooter>
    </Sidebar>
  )
}
