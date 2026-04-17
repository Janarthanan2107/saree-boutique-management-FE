import { useMemo, useState } from "react";
import { toast } from "sonner";
import { motion } from "framer-motion";
import { bulkUpdateStock, getProductsRaw, getSettings } from "@/admin/data/adminApi";
import { resolveAsset } from "@/admin/data/assetKeys";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader, PrimaryButton, Pill, StatCard } from "@/admin/ui/AdminPrimitives";

export default function AdminStockPage() {
  const v = useAdminSync();
  const products = useMemo(() => getProductsRaw(), [v]);
  const lowMax = useMemo(() => getSettings().lowStockThreshold ?? 3, [v]);
  const [edits, setEdits] = useState({});

  const summary = useMemo(
    () => ({
      out: products.filter((p) => p.stock === 0).length,
      low: products.filter((p) => p.stock > 0 && p.stock <= lowMax).length,
      healthy: products.filter((p) => p.stock > lowMax).length,
    }),
    [products, lowMax],
  );

  const sorted = useMemo(() => [...products].sort((a, b) => a.stock - b.stock), [products]);

  const dirtyCount = Object.keys(edits).length;

  const save = () => {
    const updates = Object.entries(edits).map(([id, val]) => ({
      id,
      stock: Math.max(0, Number(val) || 0),
    }));
    if (updates.length === 0) return;
    bulkUpdateStock(updates);
    setEdits({});
    toast.success(`Updated stock for ${updates.length} ${updates.length === 1 ? "piece" : "pieces"}`);
  };

  return (
    <>
      <PageHeader
        eyebrow="Inventory"
        title="Stock Management"
        description="Real-time stock levels with bulk-edit and low-stock alerts."
        action={
          <PrimaryButton onClick={save} disabled={dirtyCount === 0}>
            Save {dirtyCount > 0 ? `${dirtyCount} change${dirtyCount > 1 ? "s" : ""}` : ""}
          </PrimaryButton>
        }
      />

      <div className="mb-10 grid grid-cols-1 gap-4 sm:grid-cols-3 md:gap-6">
        <StatCard index={0} label="Out of stock" value={summary.out} />
        <StatCard index={1} label="Low stock" value={summary.low} sub={`≤ ${lowMax} units`} />
        <StatCard index={2} label="Healthy" value={summary.healthy} />
      </div>

      <div className="bg-surface-container">
        <div className="hidden grid-cols-12 border-b border-border/40 px-5 py-3 md:grid">
          <p className="col-span-5 label-luxury">Product</p>
          <p className="col-span-2 label-luxury">Weave</p>
          <p className="col-span-2 label-luxury">Status</p>
          <p className="col-span-3 label-luxury text-right">New stock</p>
        </div>

        {sorted.map((p, i) => {
          const value = edits[p.id] ?? String(p.stock);
          const tone = p.stock === 0 ? "danger" : p.stock <= lowMax ? "warn" : "success";
          return (
            <motion.div
              key={p.id}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: i * 0.02 }}
              className="grid grid-cols-12 items-center border-b border-border/40 px-5 py-4 last:border-b-0"
            >
              <div className="col-span-12 mb-3 flex items-center gap-3 md:col-span-5 md:mb-0">
                <img src={resolveAsset(p.imageKey)} alt="" className="h-14 w-14 shrink-0 object-cover" />
                <div className="min-w-0">
                  <p className="font-display text-base text-foreground">{p.title}</p>
                  <p className="truncate font-body text-xs text-muted-foreground">{p.category}</p>
                </div>
              </div>
              <p className="col-span-6 font-body text-sm text-muted-foreground md:col-span-2">{p.weaveType}</p>
              <div className="col-span-6 md:col-span-2">
                <Pill tone={tone}>
                  {p.stock === 0 ? "Out" : p.stock <= lowMax ? `Low · ${p.stock}` : `${p.stock} in stock`}
                </Pill>
              </div>
              <div className="col-span-12 mt-3 md:col-span-3 md:mt-0 md:text-right">
                <input
                  type="number"
                  min={0}
                  value={value}
                  onChange={(e) => setEdits((prev) => ({ ...prev, [p.id]: e.target.value }))}
                  className="w-full border-b border-border/60 bg-transparent py-2 text-right font-body text-sm text-foreground focus:border-gold focus:outline-none md:w-28"
                />
              </div>
            </motion.div>
          );
        })}
      </div>
    </>
  );
}
