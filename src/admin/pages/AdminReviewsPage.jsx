import { useMemo } from "react";
import { toast } from "sonner";
import { deleteReview, getReviews, updateReview } from "@/admin/data/adminApi";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader } from "@/admin/ui/AdminPrimitives";

export default function AdminReviewsPage() {
  const v = useAdminSync();
  const reviews = useMemo(() => getReviews(), [v]);

  return (
    <div>
      <PageHeader title="Reviews" description="Approve or remove patron feedback." />
      <div className="space-y-4">
        {reviews.map((r) => (
          <div key={r.id} className="border border-border/40 bg-surface-container p-5">
            <p className="font-display text-lg">{r.customerName}</p>
            <p className="text-xs text-muted-foreground">{r.productId}</p>
            <p className="mt-2 font-body text-sm">{r.text}</p>
            <p className="mt-2 text-xs text-gold">{"★".repeat(r.rating)}</p>
            <div className="mt-4 flex flex-wrap gap-2">
              <button
                type="button"
                className="bg-primary px-4 py-2 text-xs uppercase text-on-primary"
                onClick={() => {
                  updateReview(r.id, { status: "approved" });
                  toast.success("Approved");
                }}
              >
                Approve
              </button>
              <button
                type="button"
                className="border border-border/40 px-4 py-2 text-xs uppercase"
                onClick={() => {
                  updateReview(r.id, { status: "rejected" });
                  toast.success("Rejected");
                }}
              >
                Reject
              </button>
              <button
                type="button"
                className="ml-auto text-xs uppercase text-destructive"
                onClick={() => {
                  if (confirm("Delete?")) {
                    deleteReview(r.id);
                    toast.success("Removed");
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
