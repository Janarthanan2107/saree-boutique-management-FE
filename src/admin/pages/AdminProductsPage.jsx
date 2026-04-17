import { useMemo, useState } from "react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import {
  ADMIN_CATEGORIES,
  WEAVE_TYPES,
  deleteProduct,
  formatRupee,
  getProductsRaw,
  getSettings,
  upsertProduct,
} from "@/admin/data/adminApi";
import { BUNDLED_IMAGE_KEYS, resolveAsset } from "@/admin/data/assetKeys";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader, PrimaryButton, Pill } from "@/admin/ui/AdminPrimitives";

export default function AdminProductsPage() {
  const v = useAdminSync();
  const products = useMemo(() => getProductsRaw(), [v]);
  const lowThr = useMemo(() => getSettings().lowStockThreshold ?? 3, [v]);
  const [q, setQ] = useState("");

  const filtered = useMemo(() => {
    const s = q.trim().toLowerCase();
    return products.filter((p) => !s || p.title.toLowerCase().includes(s) || p.id.includes(s));
  }, [products, q]);

  return (
    <div>
      <PageHeader
        eyebrow="Catalogue"
        title="Products"
        description="Pricing and storytelling — adjust quantities on the Stock page."
        action={
          <Link
            to="/admin/stock"
            className="inline-flex items-center justify-center bg-primary px-6 py-3 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity hover:opacity-90"
          >
            Open stock
          </Link>
        }
      />
      <p className="mb-4 font-body text-sm text-muted-foreground">
        Tip: use <Link className="text-gold underline" to="/admin/stock">Stock</Link> for Ethereal-style bulk updates.
      </p>
      <input
        value={q}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search…"
        className="mb-6 max-w-md border border-border/40 bg-surface-container px-4 py-2 font-body text-sm outline-none focus:border-gold"
      />
      <div className="overflow-x-auto bg-surface-container">
        <table className="w-full min-w-[640px] text-left text-sm">
          <thead>
            <tr className="border-b border-border/40 font-body text-xs uppercase text-muted-foreground">
              <th className="px-4 py-3">Product</th>
              <th className="px-4 py-3">Price</th>
              <th className="px-4 py-3">Stock</th>
              <th className="px-4 py-3" />
            </tr>
          </thead>
          <tbody>
            {filtered.map((p) => (
              <tr key={p.id} className="border-b border-border/30">
                <td className="px-4 py-3">
                  <div className="flex items-center gap-3">
                    <img src={resolveAsset(p.imageKey)} alt="" className="h-12 w-10 object-cover" />
                    <span className="font-body">{p.title}</span>
                  </div>
                </td>
                <td className="px-4 py-3">{formatRupee(p.priceNum)}</td>
                <td className="px-4 py-3">
                  <Pill tone={p.stock === 0 ? "danger" : p.stock <= lowThr ? "warn" : "success"}>
                    {p.stock === 0 ? "Out" : p.stock <= lowThr ? `Low · ${p.stock}` : `${p.stock} in stock`}
                  </Pill>
                </td>
                <td className="px-4 py-3 text-right">
                  <ProductEditorButton product={p} onSaved={() => toast.success("Saved")} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

function ProductEditorButton({ product, onSaved }) {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(product);

  const save = () => {
    upsertProduct({
      ...form,
      priceNum: Number(form.priceNum) || 0,
      priceLabel: formatRupee(Number(form.priceNum) || 0),
      stock: Math.max(0, Number(form.stock) || 0),
    });
    onSaved();
    setOpen(false);
  };

  const remove = () => {
    if (!confirm("Delete product?")) return;
    deleteProduct(product.id);
    toast.success("Removed");
    setOpen(false);
  };

  return (
    <>
      <button
        type="button"
        onClick={() => {
          setForm({ ...product });
          setOpen(true);
        }}
        className="text-xs uppercase text-gold"
      >
        Edit
      </button>
      {open ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border/40 bg-surface-container p-6">
            <h3 className="font-display text-xl">Edit</h3>
            <div className="mt-4 space-y-3">
              <Field label="Title" value={form.title} onChange={(t) => setForm({ ...form, title: t })} />
              <label className="block font-body text-xs uppercase text-muted-foreground">Category</label>
              <select
                className="w-full border border-border/40 bg-surface px-3 py-2 text-sm"
                value={form.category}
                onChange={(e) => setForm({ ...form, category: e.target.value })}
              >
                {ADMIN_CATEGORIES.map((c) => (
                  <option key={c}>{c}</option>
                ))}
              </select>
              <label className="block font-body text-xs uppercase text-muted-foreground">Weave</label>
              <select
                className="w-full border border-border/40 bg-surface px-3 py-2 text-sm"
                value={form.weaveType}
                onChange={(e) => setForm({ ...form, weaveType: e.target.value })}
              >
                {WEAVE_TYPES.map((w) => (
                  <option key={w}>{w}</option>
                ))}
              </select>
              <Field label="Price (₹)" value={String(form.priceNum)} onChange={(t) => setForm({ ...form, priceNum: t })} />
              <Field label="Stock" value={String(form.stock)} onChange={(t) => setForm({ ...form, stock: t })} />
              <label className="block font-body text-xs uppercase text-muted-foreground">Image key</label>
              <select
                className="w-full border border-border/40 bg-surface px-3 py-2 text-sm"
                value={BUNDLED_IMAGE_KEYS.includes(form.imageKey) ? form.imageKey : "__custom__"}
                onChange={(e) => {
                  if (e.target.value !== "__custom__") setForm({ ...form, imageKey: e.target.value });
                }}
              >
                {BUNDLED_IMAGE_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <label className="block font-body text-xs uppercase text-muted-foreground">Description</label>
              <textarea
                className="w-full border border-border/40 bg-surface p-2 text-sm"
                rows={3}
                value={form.description}
                onChange={(e) => setForm({ ...form, description: e.target.value })}
              />
            </div>
            <div className="mt-6 flex gap-2">
              <PrimaryButton onClick={save}>Save</PrimaryButton>
              <button type="button" onClick={() => setOpen(false)} className="px-4 py-3 text-xs uppercase text-muted-foreground">
                Cancel
              </button>
              <button type="button" onClick={remove} className="ml-auto text-xs uppercase text-destructive">
                Delete
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="font-body text-xs uppercase text-muted-foreground">{label}</label>
      <input
        className="mt-1 w-full border-b border-border/60 bg-transparent py-2 text-sm outline-none focus:border-gold"
        value={value}
        onChange={(e) => onChange(e.target.value)}
      />
    </div>
  );
}
