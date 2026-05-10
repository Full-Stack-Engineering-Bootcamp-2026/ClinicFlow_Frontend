import { Button } from "@/components/ui/button";

interface SubmitSectionProps {
  onSubmit?: () => void;

  loading?: boolean;
}

const SubmitSection = ({
  onSubmit,
  loading = false,
}: SubmitSectionProps) => {

  return (
    <div className="flex items-center justify-end gap-3 border-t pt-6">

      <Button
        variant="outline"
      >
        Save Draft
      </Button>

      <Button
        onClick={onSubmit}

        disabled={loading}
      >

        {loading
          ? "Submitting..."
          : "Submit Consultation"}

      </Button>

    </div>
  );
};

export default SubmitSection;