import { Button } from "@/components/ui/button"

interface AdminPaginationProps {
  currentPage: number
  totalPages: number
  isLoading?: boolean
  onPageChange: (page: number) => void
}

export default function AdminPagination({
  currentPage,
  totalPages,
  isLoading = false,
  onPageChange,
}: AdminPaginationProps) {
  if (totalPages <= 1) return null

  return (
    <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
      <p className="text-xs text-muted-foreground">
        Page {currentPage + 1} of {totalPages}
      </p>

      <div className="flex gap-2">
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage === 0 || isLoading}
          onClick={() => onPageChange(currentPage - 1)}
        >
          Previous
        </Button>

        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={currentPage + 1 >= totalPages || isLoading}
          onClick={() => onPageChange(currentPage + 1)}
        >
          Next
        </Button>
      </div>
    </div>
  )
}