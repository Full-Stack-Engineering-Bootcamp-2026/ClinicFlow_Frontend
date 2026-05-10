import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import type { ConsultationFormData } from "../../types/consultation.types";

interface FollowUpCardProps {
  formData: ConsultationFormData;
  setFormData: React.Dispatch<React.SetStateAction<ConsultationFormData>>;
}

const FollowUpCard = ({ formData, setFormData }: FollowUpCardProps) => {
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
        <CardTitle className="text-lg font-semibold">Follow Up</CardTitle>
      </CardHeader>

      <CardContent className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="followUpDate">Follow Up Date</Label>
          <Input id="followUpDate" type="date" name="followUpDate" value={formData.followUpDate} onChange={handleChange} />
        </div>

        <div className="space-y-2">
          <Label htmlFor="generalInstructions">General Instructions</Label>
          <Textarea
            id="generalInstructions"
            name="generalInstructions"
            placeholder="Enter general instructions"
            className="min-h-36 resize-y"
            value={formData.generalInstructions}
            onChange={handleChange}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="followUpNotes">Follow Up Notes</Label>
          <Textarea
            id="followUpNotes"
            name="followUpNotes"
            placeholder="Enter follow up notes"
            className="min-h-36 resize-y"
            value={formData.followUpNotes}
            onChange={handleChange}
          />
        </div>
      </CardContent>
    </Card>
  );
};

export default FollowUpCard;