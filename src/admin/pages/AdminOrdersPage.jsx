import { useMemo, useState } from "react";
import { toast } from "sonner";
import { formatRupee, getOrders, updateOrder } from "@/admin/data/adminApi";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader } from "@/admin/ui/AdminPrimitives";

const STATUSES = ["Pending", "Processing", "Shipped", "Delivered", "Cancelled"];

export default function AdminOrdersPage() {
  const v = useAdminSync();
  const orders = useMemo(() => getOrders(), [v]);
  const [q, setQ] = useState("");
  const [statusFilter, setStatusFilter] = useState("All");

  const filtered = useMemo(() => {
    return orders.filter((o) => {
      const okS = statusFilter === "All" || o.status === statusFilter;
      const hay = `${o.id} ${o.customer?.email || ""}`.toLowerCase();
      const okQ = !q || hay.includes(q.toLowerCase());
      return okS && okQ;
    });
  }, [orders, q, statusFilter]);

  return (
    <div>
      <PageHeader title="Orders" description="Fulfillment and patron details." />
      <div className="mb-6 flex flex-col gap-3 md:flex-row">
        <input
          value={q}
          onChange={(e) => setQ(e.target.value)}
          placeholder="Search…"
          className="max-w-md border border-border/40 bg-surface-container px-4 py-2 font-body text-sm outline-none focus:border-gold"
        />
        <select
          value={statusFilter}
          onChange={(e) => setStatusFilter(e.target.value)}
          className="border border-border/40 bg-surface-container px-4 py-2 font-body text-sm outline-none"
        >
          <option value="All">All statuses</option>
          {STATUSES.map((s) => (
            <option key={s} value={s}>
              {s}
            </option>
          ))}
        </select>
      </div>
      <div className="space-y-4">
        {filtered.map((o) => (
          <div key={o.id} className="border border-border/40 bg-surface-container p-5">
            <div className="flex flex-wrap items-start justify-between gap-4">
              <div>
                <p className="font-mono text-xs text-muted-foreground">{o.id}</p>
                <p className="font-body text-sm">
                  {o.customer?.firstName} {o.customer?.lastName} · {o.customer?.email}
                </p>
                <p className="mt-2 font-display text-lg">{formatRupee(o.total)}</p>
              </div>
              <select
                value={o.status}
                onChange={(e) => {
                  updateOrder(o.id, { status: e.target.value });
                  toast.success("Updated");
                }}
                className="border border-border/40 bg-surface px-3 py-2 font-body text-xs uppercase"
              >
                {STATUSES.map((s) => (
                  <option key={s} value={s}>
                    {s}
                  </option>
                ))}
              </select>
            </div>
            <ul className="mt-3 font-body text-xs text-muted-foreground">
              {(o.items || []).map((it, i) => (
                <li key={i}>
                  {it.title} × {it.qty ?? it.quantity}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
    </div>
  );
}
