import { useMemo, useState } from "react";
import { toast } from "sonner";
import { deleteJournalPost, getJournalPosts, upsertJournalPost } from "@/admin/data/adminApi";
import { BUNDLED_IMAGE_KEYS, resolveAsset } from "@/admin/data/assetKeys";
import { useAdminSync } from "@/admin/hooks/useAdminSync";
import { PageHeader, PrimaryButton } from "@/admin/ui/AdminPrimitives";

export default function AdminJournalPage() {
  const v = useAdminSync();
  const posts = useMemo(() => getJournalPosts(), [v]);
  const [draft, setDraft] = useState(null);

  const startNew = () =>
    setDraft({
      id: `story-${Date.now()}`,
      title: "",
      category: "Style",
      coverImageKey: "journal-fashion-editorial",
      content: "",
      publishDate: new Date().toISOString().slice(0, 10),
      status: "draft",
      excerpt: "",
    });

  const save = () => {
    if (!draft?.title?.trim()) {
      toast.error("Title required");
      return;
    }
    upsertJournalPost(draft);
    toast.success("Saved");
    setDraft(null);
  };

  return (
    <div>
      <PageHeader
        title="Journal"
        description="Stories shown on the public Journal when published."
        action={<PrimaryButton onClick={startNew}>New story</PrimaryButton>}
      />
      <div className="space-y-3">
        {posts.map((p) => (
          <div key={p.id} className="flex flex-wrap items-center justify-between gap-3 border border-border/40 bg-surface-container p-4">
            <div className="flex items-center gap-3">
              <img src={resolveAsset(p.coverImageKey)} alt="" className="h-12 w-16 object-cover" />
              <div>
                <p className="font-display">{p.title}</p>
                <p className="text-xs uppercase text-muted-foreground">{p.status}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button type="button" className="text-xs uppercase text-gold" onClick={() => setDraft({ ...p })}>
                Edit
              </button>
              <button
                type="button"
                className="text-xs uppercase text-destructive"
                onClick={() => {
                  if (confirm("Delete?")) {
                    deleteJournalPost(p.id);
                    toast.success("Deleted");
                  }
                }}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>

      {draft ? (
        <div className="fixed inset-0 z-[70] flex items-center justify-center bg-primary/40 p-4">
          <div className="max-h-[90vh] w-full max-w-lg overflow-y-auto border border-border/40 bg-surface-container p-6">
            <h3 className="font-display text-xl">Story</h3>
            <div className="mt-4 space-y-3">
              <input
                className="w-full border-b border-border/60 bg-transparent py-2 text-sm"
                placeholder="Title"
                value={draft.title}
                onChange={(e) => setDraft({ ...draft, title: e.target.value })}
              />
              <textarea
                className="w-full border border-border/40 bg-surface p-2 text-sm"
                rows={4}
                placeholder="HTML or plain text"
                value={draft.content}
                onChange={(e) => setDraft({ ...draft, content: e.target.value })}
              />
              <select
                className="w-full border border-border/40 bg-surface px-3 py-2 text-sm"
                value={draft.coverImageKey}
                onChange={(e) => setDraft({ ...draft, coverImageKey: e.target.value })}
              >
                {BUNDLED_IMAGE_KEYS.map((k) => (
                  <option key={k} value={k}>
                    {k}
                  </option>
                ))}
              </select>
              <select
                className="w-full border border-border/40 bg-surface px-3 py-2 text-sm"
                value={draft.status}
                onChange={(e) => setDraft({ ...draft, status: e.target.value })}
              >
                <option value="draft">Draft</option>
                <option value="published">Published</option>
              </select>
            </div>
            <div className="mt-6 flex gap-2">
              <PrimaryButton onClick={save}>Save</PrimaryButton>
              <button type="button" className="px-4 py-3 text-xs uppercase" onClick={() => setDraft(null)}>
                Cancel
              </button>
            </div>
          </div>
        </div>
      ) : null}
    </div>
  );
}
