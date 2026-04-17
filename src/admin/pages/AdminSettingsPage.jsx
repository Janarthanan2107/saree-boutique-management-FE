import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";
import { getProductsRaw, getSettings, saveSettings } from "@/admin/data/adminApi";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader, PrimaryButton } from "@/admin/ui/AdminPrimitives";

export default function AdminSettingsPage() {
  const v = useAdminSync();
  const products = useMemo(() => getProductsRaw(), [v]);
  const [form, setForm] = useState(getSettings);

  useEffect(() => {
    setForm(getSettings());
  }, [v]);

  const toggleFeatured = (id) => {
    const cur = form.featuredProductIds || [];
    setForm({
      ...form,
      featuredProductIds: cur.includes(id) ? cur.filter((x) => x !== id) : [...cur, id],
    });
  };

  return (
    <div className="max-w-2xl">
      <PageHeader title="Settings" description="Brand, hero, featured grid, low-stock threshold." />
      <div className="space-y-4 border border-border/40 bg-surface-container p-6">
        <Field label="Brand name" value={form.brandName} onChange={(t) => setForm({ ...form, brandName: t })} />
        <Field label="Tagline" value={form.tagline} onChange={(t) => setForm({ ...form, tagline: t })} />
        <Field label="Hero eyebrow" value={form.heroEyebrow} onChange={(t) => setForm({ ...form, heroEyebrow: t })} />
        <Field label="Hero title line 1" value={form.heroTitleLine1} onChange={(t) => setForm({ ...form, heroTitleLine1: t })} />
        <Field label="Hero title line 2" value={form.heroTitleLine2} onChange={(t) => setForm({ ...form, heroTitleLine2: t })} />
        <Field label="Hero image key" value={form.heroImageKey} onChange={(t) => setForm({ ...form, heroImageKey: t })} />
        <div>
          <label className="text-xs uppercase text-muted-foreground">Low stock threshold (dashboard)</label>
          <input
            type="number"
            min={1}
            className="mt-1 w-32 border border-border/40 bg-surface px-3 py-2 text-sm"
            value={form.lowStockThreshold}
            onChange={(e) => setForm({ ...form, lowStockThreshold: Number(e.target.value) || 3 })}
          />
        </div>
        <p className="label-luxury pt-4">Featured on homepage</p>
        <div className="grid gap-2 sm:grid-cols-2">
          {products.map((p) => (
            <label key={p.id} className="flex cursor-pointer items-center gap-2 border border-border/40 px-2 py-2 text-sm">
              <input
                type="checkbox"
                checked={(form.featuredProductIds || []).includes(p.id)}
                onChange={() => toggleFeatured(p.id)}
              />
              <span className="truncate">{p.title}</span>
            </label>
          ))}
        </div>
        <PrimaryButton
          onClick={() => {
            saveSettings(form);
            toast.success("Saved");
          }}
        >
          Save settings
        </PrimaryButton>
      </div>
    </div>
  );
}

function Field({ label, value, onChange }) {
  return (
    <div>
      <label className="text-xs uppercase text-muted-foreground">{label}</label>
      <input className="mt-1 w-full border-b border-border/60 bg-transparent py-2 text-sm" value={value} onChange={(e) => onChange(e.target.value)} />
    </div>
  );
}
