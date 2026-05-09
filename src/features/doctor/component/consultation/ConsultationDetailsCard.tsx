import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ConsultationFormData } from "../../types/consultation.types";

interface ConsultationDetailsCardProps {
  formData: ConsultationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ConsultationFormData>>;
}

const ConsultationDetailsCard = ({ formData, setFormData }: ConsultationDetailsCardProps) => {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  return (
    <Card className="border border-border shadow-sm">
      <CardHeader>
        <CardTitle className="text-lg font-semibold">
          Consultation Details
        </CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="diagnosis">Diagnosis</Label>
          <Input
            id="diagnosis"
            name="diagnosis"
            placeholder="Enter diagnosis"
            value={formData.diagnosis}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="clinicalNotes">Clinical Notes</Label>
          <Textarea
            id="clinicalNotes"
            name="clinicalNotes"
            placeholder="Enter clinical notes"
            className="min-h-[180px] resize-none"
            value={formData.clinicalNotes}
            onChange={handleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default ConsultationDetailsCard;