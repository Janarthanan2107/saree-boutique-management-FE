import { useMemo } from "react";
import { toast } from "sonner";
import { getContacts, updateContact } from "@/admin/data/adminApi";
import { useAdminSync } from "@/admin/hooks/useAdminSync";

export default function AdminContactsPage() {
  const version = useAdminSync();
  const items = useMemo(() => getContacts(), [version]);

  const mark = (id, resolved) => {
    updateContact(id, { resolved });
    toast.success(resolved ? "Marked resolved" : "Reopened");
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl text-foreground">Contact enquiries</h1>
        <p className="mt-2 font-body text-sm text-muted-foreground">Messages from the Contact page.</p>
      </div>

      <div className="space-y-4">
        {items.length === 0 ? (
          <p className="font-body text-sm text-muted-foreground">No messages yet.</p>
        ) : (
          items.map((m) => (
            <div
              key={m.id}
              className={`border border-[#e5dfd4] bg-[#faf8f5] p-6 shadow-sm ${m.resolved ? "opacity-70" : ""}`}
            >
              <div className="flex flex-col gap-2 md:flex-row md:items-start md:justify-between">
                <div>
                  <p className="font-display text-lg text-foreground">{m.name}</p>
                  <p className="font-body text-xs text-muted-foreground">{m.email}</p>
                  <p className="mt-1 font-body text-xs text-muted-foreground">
                    {new Date(m.createdAt).toLocaleString()}
                  </p>
                </div>
                <span className="rounded-full border border-[#e5dfd4] px-3 py-1 font-body text-xs uppercase tracking-wide">
                  {m.resolved ? "Resolved" : "Open"}
                </span>
              </div>
              <p className="mt-4 font-body text-sm leading-relaxed text-foreground">{m.message}</p>
              <div className="mt-4 flex gap-2">
                {!m.resolved ? (
                  <button
                    type="button"
                    onClick={() => mark(m.id, true)}
                    className="bg-primary px-4 py-2 font-body text-xs uppercase tracking-wide text-on-primary"
                  >
                    Mark resolved
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={() => mark(m.id, false)}
                    className="border border-[#e5dfd4] px-4 py-2 font-body text-xs uppercase tracking-wide"
                  >
                    Reopen
                  </button>
                )}
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}
