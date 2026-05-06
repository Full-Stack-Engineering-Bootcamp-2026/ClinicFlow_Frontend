"use client";

import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar";
import { AppSidebar } from "./AppSidebar";
import { Navbar } from "./Navbar";
import { Outlet } from "react-router-dom";

export default function AppLayout() {
  return (
    <div className="flex min-h-screen overflow-hidden">
      <SidebarProvider>

      
        <AppSidebar />

   
        <SidebarInset className="flex flex-col min-h-screen ">

          
          <div className="sticky top-0 z-50">
            <Navbar />
          </div>

        
          <main className="flex-1 overflow-y-auto overflow-x-hidden p-4 bg-background">
            <Outlet />
          </main>

        </SidebarInset>

      </SidebarProvider>
    </div>
  );
}