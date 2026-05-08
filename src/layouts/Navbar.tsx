"use client";

import { SidebarTrigger } from "@/components/ui/sidebar";

import { Bell, Settings } from "lucide-react";

import { useSelector } from "react-redux";

import type { RootState } from "@/app/store";
import { useNavigate } from "react-router-dom";

export function Navbar() {
  const navigate = useNavigate();
  const user = useSelector(
    (state: RootState) => state.auth.user
  );

  const handleClick=()=>{
   navigate("/profile");
  }

  return (
    <div className="h-14 flex items-center justify-between px-4 bg-card">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="cursor-pointer" />
      </div>

      <div className="flex items-center gap-4">
        <button className="p-2 rounded-md hover:bg-muted transition cursor-pointer">
          <Bell className="h-4 w-4 text-muted-foreground" />
        </button>

        <button className="p-2 rounded-md hover:bg-muted transition cursor-pointer">
          <Settings className="h-4 w-4 text-muted-foreground" />
        </button>

        <div className="flex items-center gap-2">
          <div className="text-right leading-tight">
            <p className="text-xs font-medium">
              {user?.name}
            </p>

            <p className="text-[11px] text-muted-foreground">
              {user?.officialRole}
            </p>
          </div>

          <img
            onClick={handleClick}
            src="https://i.pravatar.cc/40"
            className="h-8 w-8 rounded-full cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}