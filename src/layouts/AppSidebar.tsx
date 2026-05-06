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

import { LogOut } from "lucide-react"

import { useSelector } from "react-redux"
import type { RootState } from "@/app/store"

import { sidebarItems } from "@/layouts/sidebarItems"
import { CiMedicalCase } from "react-icons/ci"

import { NavLink } from "react-router-dom"

import { useDispatch } from "react-redux"
import { useNavigate } from "react-router-dom"

import type { AppDispatch } from "@/app/store"
import { logout } from "@/features/auth/authSlice"

export function AppSidebar() {
  const role = useSelector((state: RootState) => state.auth.user?.role)

  const menuItems = role ? sidebarItems[role] : []
  const dispatch = useDispatch<AppDispatch>()
  const navigate = useNavigate()

  const handleLogout = () => {
    dispatch(logout())
    navigate("/login")
  }

  const { state, setOpenMobile } = useSidebar()

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

      <SidebarContent className="bg-card px-2 pt-4 pb-2">
        <SidebarMenu className="space-y-1">
          {menuItems.map((item) => {
            const Icon = item.icon

            return (
              <SidebarMenuItem key={item.path}>
                <NavLink to={item.path} end={item.path === "/"}>
                  {({ isActive }) => (
                    <SidebarMenuButton
                      tooltip={item.title}
                      className={`flex cursor-pointer items-center gap-3 rounded-lg px-3 py-2 transition-all ${
                        isActive
                          ? "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground"
                          : "text-muted-foreground hover:bg-muted hover:text-foreground"
                      } `}
                      onClick={() => setOpenMobile(false)}
                    >
                      <Icon className="h-4 w-4 shrink-0" />
                      <span>{item.title}</span>
                    </SidebarMenuButton>
                  )}
                </NavLink>
              </SidebarMenuItem>
            )
          })}
        </SidebarMenu>
      </SidebarContent>

      <SidebarFooter className="bg-card px-2 py-2">
        <button
          className="flex w-full cursor-pointer items-center gap-3 rounded-lg px-3 py-2 text-muted-foreground transition-all hover:bg-red-50 hover:text-red-500"
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
