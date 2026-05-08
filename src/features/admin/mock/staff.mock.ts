import type { StaffMember } from "../types/staff.types"

export const staffMembers: StaffMember[] = [
  {
    id: 1,
    name: "Dr. Aris Thorne",
    role: "DOCTOR",
    email: "a.thorne@clinicflow.med",
    status: "Active",
  },
  {
    id: 2,
    name: "Nurse Clara Smith",
    role: "NURSE",
    email: "c.smith@clinicflow.med",
    status: "Active",
  },
  {
    id: 3,
    name: "James Chen",
    role: "ADMIN",
    email: "j.chen@clinicflow.med",
    status: "Inactive",
  },
]