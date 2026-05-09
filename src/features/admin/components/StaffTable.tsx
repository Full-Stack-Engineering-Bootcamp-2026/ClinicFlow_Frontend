import {
  Card,
  CardContent,
} from "@/components/ui/card"

import { Badge } from "@/components/ui/badge"

import { staffMembers } from "../mock/staff.mock"

export default function StaffTable() {
  return (
    <Card>
      <CardContent className="p-0">
        <table className="w-full">
          <thead className="border-b bg-muted/30">
            <tr className="text-left text-sm text-muted-foreground">
              <th className="p-4">Name</th>
              <th className="p-4">Role</th>
              <th className="p-4">Email</th>
              <th className="p-4">Status</th>
            </tr>
          </thead>

          <tbody>
            {staffMembers.map((staff) => (
              <tr
                key={staff.id}
                className="border-b last:border-0"
              >
                <td className="p-4 font-medium">
                  {staff.name}
                </td>

                <td className="p-4">
                  <Badge variant="secondary">
                    {staff.role}
                  </Badge>
                </td>

                <td className="p-4 text-muted-foreground">
                  {staff.email}
                </td>

                <td className="p-4">
                  <span
                    className={`inline-flex items-center gap-2 text-sm ${
                      staff.status === "Active"
                        ? "text-green-600"
                        : "text-muted-foreground"
                    }`}
                  >
                    <span className="h-2 w-2 rounded-full bg-current" />
                    {staff.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </CardContent>
    </Card>
  )
}