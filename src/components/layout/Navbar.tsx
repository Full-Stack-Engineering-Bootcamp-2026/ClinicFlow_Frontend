"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";
import { Bell, Settings } from "lucide-react";

export function Navbar() {
    return (
        <div className="h-14 flex items-center justify-between px-4 border-b bg-background">

           
            <div className="flex items-center gap-3">
                <SidebarTrigger />

                <h1 className="text-lg font-semibold">
                    Live Queue
                </h1>
            </div>

          
            <div className="flex items-center gap-4">

             
                <button className="p-2 rounded-md hover:bg-muted transition">
                    <Bell className="h-4 w-4 text-muted-foreground" />
                </button>

                <button className="p-2 rounded-md hover:bg-muted transition">
                    <Settings className="h-4 w-4 text-muted-foreground" />
                </button>

                {/* User Info */}
                <div className="flex items-center gap-2">
                    <div className="text-right leading-tight">
                        <p className="text-xs font-medium">Dr. Sarah Jenkins</p>
                        <p className="text-[11px] text-muted-foreground">
                            Chief Surgeon
                        </p>
                    </div>

                    <img
                        src="https://i.pravatar.cc/40"
                        className="h-8 w-8 rounded-full"
                    />
                </div>

            </div>
        </div>
    );
}