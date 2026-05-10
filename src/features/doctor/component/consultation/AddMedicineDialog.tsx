import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Plus } from "lucide-react"
import { toast } from "sonner"
import type { Medicine } from "../../types/consultation.types"

interface AddMedicineDialogProps {
  onAddMedicine: (medicine: Medicine) => void
}

const initialState: Medicine = {
  medicineName: "",
  medicineCategory: "",
  medicineUnit: "",
  dosage: "",
  frequency: "",
  durationDays: 1,
  instructions: "",
}

const AddMedicineDialog = ({ onAddMedicine }: AddMedicineDialogProps) => {
  const [open, setOpen] = useState<boolean>(false)

  const [medicineData, setMedicineData] = useState<Medicine>(initialState)

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target

    setMedicineData((prev) => ({
      ...prev,

      [name]: name === "durationDays" ? Number(value) : value,
    }))
  }

  const handleSubmit = () => {
    if (
      !medicineData.medicineName.trim() ||
      !medicineData.dosage.trim() ||
      !medicineData.frequency.trim()
    ) {
      toast.error("Please fill all required medicine details")

      return
    }

    onAddMedicine(medicineData)

    setMedicineData(initialState)

    setOpen(false)

    toast.success("Medicine added successfully")
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button className="cursor-pointer">
          <Plus className="mr-2 h-4 w-4" />
          Add Medicine
        </Button>
      </DialogTrigger>

      <DialogContent className="sm:max-w-2xl">
        <DialogHeader>
          <DialogTitle>Add Medicine</DialogTitle>
        </DialogHeader>

        <div className="grid gap-5 py-4">
          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Medicine Name</Label>

              <Input
                name="medicineName"
                placeholder="Enter medicine name"
                value={medicineData.medicineName}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Medicine Category</Label>

              <Input
                name="medicineCategory"
                placeholder="Tablet / Syrup"
                value={medicineData.medicineCategory}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-3">
            <div className="space-y-2">
              <Label>Unit</Label>

              <Input
                name="medicineUnit"
                placeholder="Tablet"
                value={medicineData.medicineUnit}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Dosage</Label>

              <Input
                name="dosage"
                placeholder="1 tablet"
                value={medicineData.dosage}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Frequency</Label>

              <Input
                name="frequency"
                placeholder="1-0-1"
                value={medicineData.frequency}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="grid gap-4 md:grid-cols-2">
            <div className="space-y-2">
              <Label>Duration (Days)</Label>

              <Input
                type="number"
                name="durationDays"
                min={1}
                value={medicineData.durationDays}
                onChange={handleChange}
              />
            </div>

            <div className="space-y-2">
              <Label>Instructions</Label>

              <Input
                name="instructions"
                placeholder="After food"
                value={medicineData.instructions}
                onChange={handleChange}
              />
            </div>
          </div>

          <div className="flex justify-end">
            <Button className="cursor-pointer" onClick={handleSubmit}>
              Add Medicine
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

export default AddMedicineDialog
