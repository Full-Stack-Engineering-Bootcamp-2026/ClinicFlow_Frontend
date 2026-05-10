import { Button } from "@/components/ui/button"

interface SubmitSectionProps {
  onSubmit?: () => void
  loading?: boolean
}

const SubmitSection = ({ onSubmit, loading = false }: SubmitSectionProps) => {
  return (
    <div className="flex justify-end border-t pt-6">
      <Button onClick={onSubmit} disabled={loading} className="cursor-pointer">
        {loading ? "Submitting..." : "Submit Consultation"}
      </Button>
    </div>
  )
}

export default SubmitSection
