import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"

import { Button } from "@/components/ui/button"

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"

import { Trash2, Plus } from "lucide-react"

import AddMedicineDialog from "./AddMedicineDialog"

import type {
  ConsultationFormData,
  Medicine,
} from "../../types/consultation.types"

interface PrescribedMedicinesCardProps {
  formData: ConsultationFormData

  setFormData: React.Dispatch<React.SetStateAction<ConsultationFormData>>
}

const PrescribedMedicinesCard = ({
  formData,
  setFormData,
}: PrescribedMedicinesCardProps) => {
  const handleRemoveMedicine = (index: number) => {
    const updatedMedicines = formData.medicines.filter((_, i) => i !== index)

    setFormData((prev) => ({
      ...prev,

      medicines: updatedMedicines,
    }))
  }

  const handleAddMedicine = (medicine: Medicine) => {
    setFormData((prev) => ({
      ...prev,

      medicines: [...prev.medicines, medicine],
    }))
  }

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader className="flex flex-row items-center justify-between">
        <CardTitle className="text-lg font-semibold">
          Prescribed Medicines
        </CardTitle>

        <AddMedicineDialog onAddMedicine={handleAddMedicine} />
      </CardHeader>

      <CardContent className="p-0">
        {formData.medicines.length === 0 ? (
          <div className="flex flex-col items-center justify-center gap-2 py-6">
            <div className="flex h-12 w-12 items-center justify-center rounded-full bg-muted">
              <Plus className="h-5 w-5 text-muted-foreground" />
            </div>

            <div className="space-y-1 text-center">
              <p className="font-medium">No medicines added</p>

              <p className="text-sm text-muted-foreground">
                Add prescribed medicines for the patient
              </p>
            </div>
          </div>
        ) : (
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Medicine</TableHead>

                  <TableHead>Dosage</TableHead>

                  <TableHead>Frequency</TableHead>

                  <TableHead>Duration</TableHead>

                  <TableHead>Instructions</TableHead>

                  <TableHead className="text-right">Action</TableHead>
                </TableRow>
              </TableHeader>

              <TableBody>
                {formData.medicines.map((medicine, index) => (
                  <TableRow key={index}>
                    <TableCell>
                      <div className="flex flex-col">
                        <span className="font-medium">
                          {medicine.medicineName}
                        </span>

                        <span className="text-xs text-muted-foreground">
                          {medicine.medicineCategory}
                        </span>
                      </div>
                    </TableCell>

                    <TableCell>{medicine.dosage}</TableCell>

                    <TableCell>{medicine.frequency}</TableCell>

                    <TableCell>{medicine.durationDays} days</TableCell>

                    <TableCell className="max-w-55 truncate text-muted-foreground">
                      {medicine.instructions || "-"}
                    </TableCell>

                    <TableCell className="text-right">
                      <Button
                        variant="ghost"
                        size="icon"
                        className="cursor-pointer"
                        onClick={() => handleRemoveMedicine(index)}
                      >
                        <Trash2 className="h-4 w-4 text-destructive" />
                      </Button>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        )}
      </CardContent>
    </Card>
  )
}

export default PrescribedMedicinesCard
