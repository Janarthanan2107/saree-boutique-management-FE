import { useMemo } from "react";
import { formatRupee, getCustomersFromOrders } from "@/admin/data/adminApi";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader } from "@/admin/ui/AdminPrimitives";

export default function AdminCustomersPage() {
  const v = useAdminSync();
  const rows = useMemo(() => getCustomersFromOrders(), [v]);

  return (
    <div>
      <PageHeader title="Customers" description="From checkout history." />
      <div className="overflow-x-auto bg-surface-container">
        <table className="w-full text-left text-sm">
          <thead>
            <tr className="border-b border-border/40 text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Email</th>
              <th className="px-4 py-3">Orders</th>
              <th className="px-4 py-3">LTV</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((c) => (
              <tr key={c.email} className="border-b border-border/30">
                <td className="px-4 py-3">{c.name || "—"}</td>
                <td className="px-4 py-3 text-xs text-muted-foreground">{c.email}</td>
                <td className="px-4 py-3">{c.orders.length}</td>
                <td className="px-4 py-3">{formatRupee(c.totalSpent)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
