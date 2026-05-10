import { SidebarTrigger } from "@/components/ui/sidebar"

import { useSelector } from "react-redux"

import type { RootState } from "@/app/store"

import { useLocation, useNavigate } from "react-router-dom"

export function Navbar() {
  const navigate = useNavigate()

  const location = useLocation()

  const user = useSelector((state: RootState) => state.auth.user)

  const pageTitles: Record<string, string> = {
    "/dashboard": "Dashboard",

    "/staff-management": "Staff Management",

    "/doctor-schedules": "Doctor Schedules",

    "/nurse/live-queue": "Live Queue",

    "/nurse/register-patient": "Register Patient",

    "/nurse/book-appointment": "Book Appointment",

    "/doctor/queue": "Doctor Queue",

    "/profile": "Profile",
  }

  const currentPageTitle = pageTitles[location.pathname] || "ClinicFlow"

  const handleProfileClick = () => {
    navigate("/profile")
  }

  return (
    <div className="flex h-14 items-center justify-between bg-card px-4">
      <div className="flex items-center gap-3">
        <SidebarTrigger className="cursor-pointer" />

        <h1 className="text-xl font-semibold">{currentPageTitle}</h1>
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
  src={
    user?.profileImage
    ||
    "https://i.pravatar.cc/40"
  }
  className="
    h-8
    w-8
    rounded-full
    object-cover
    cursor-pointer
  "
/>
        </div>

        <img
          src="https://i.pravatar.cc/40"
          alt="Profile"
          className="h-8 w-8 rounded-full object-cover"
        />
      </button>
    </div>
  )
}
