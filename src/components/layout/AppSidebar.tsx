"use client";

import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
} from "@/components/ui/sidebar";


import { useSidebar } from "@/components/ui/sidebar";
import { Home, Users, Calendar } from "lucide-react";
import { NavLink } from 'react-router-dom';


export function AppSidebar() {

     const { state } = useSidebar();
  return (
    <Sidebar collapsible="icon">

      {/* Header */}
      <SidebarHeader className="h-14 flex items-center px-3 border-b">
        <span
          className={`
            font-semibold text-lg transition-all duration-200
            ${state === "collapsed" ? "opacity-0 w-0 overflow-hidden" : "opacity-100"}
          `}
        >
          ClinicFlow
        </span>
      </SidebarHeader>

      {/* Menu */}
      <SidebarContent className="px-2 py-2">
        <SidebarMenu className="space-y-1">

         <SidebarMenuItem>
    <NavLink to="/" end>
        {({ isActive }) => (
        <SidebarMenuButton
            tooltip="Dashboard"
            className={`
            flex items-center gap-3 px-3 py-2 rounded-lg transition-all
            ${
                isActive
                ? "bg-primary text-primary-foreground"
                : "text-muted-foreground hover:bg-muted hover:text-foreground"
            }
            `}
        >
            <Home className="h-4 w-4" />
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
        className={`
          flex items-center gap-3 px-3 py-2 rounded-lg transition-all
          ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }
        `}
      >
        <Users className="h-4 w-4" />
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
        className={`
          flex items-center gap-3 px-3 py-2 rounded-lg transition-all
          ${
            isActive
              ? "bg-primary text-primary-foreground"
              : "text-muted-foreground hover:bg-muted hover:text-foreground"
          }
        `}
      >
        <Calendar className="h-4 w-4" />
        <span>Appointments</span>
      </SidebarMenuButton>
    )}
  </NavLink>
</SidebarMenuItem>
        </SidebarMenu>
      </SidebarContent>

    </Sidebar>
  );
}