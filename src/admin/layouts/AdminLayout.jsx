import { useState } from "react";
import { Link, NavLink, Outlet, useLocation } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";
import { toast } from "sonner";
import BrandLogo from "@/components/BrandLogo";

const nav = [
  { to: "/admin", label: "Overview", end: true },
  { to: "/admin/products", label: "Products" },
  { to: "/admin/stock", label: "Stock" },
  { to: "/admin/orders", label: "Orders" },
  { to: "/admin/reviews", label: "Reviews" },
  { to: "/admin/journal", label: "Journal" },
  { to: "/admin/customers", label: "Customers" },
  { to: "/admin/contacts", label: "Enquiries" },
  { to: "/admin/settings", label: "Settings" },
];

function SidebarLinks({ onNavigate }) {
  return (
    <nav className="min-h-0 flex-1 space-y-1 overflow-y-auto px-3 py-6">
      {nav.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.end}
          onClick={onNavigate}
          className={({ isActive }) =>
            `flex items-center gap-3 rounded-md px-3 py-2.5 font-body text-sm transition-colors ${isActive
              ? "bg-primary text-on-primary"
              : "text-muted-foreground hover:bg-surface-highest hover:text-foreground"
            }`
          }
        >
          <span>{item.label}</span>
        </NavLink>
      ))}
    </nav>
  );
}

function SidebarFooter({ onAfterSignOut }) {
  const { logout, session } = useAdminAuth();
  return (
    <div className="shrink-0 border-t border-border/40 px-4 py-4">
      <p className="font-body text-xs text-muted-foreground">Signed in as</p>
      <p className="mt-0.5 font-display text-sm text-foreground">{session?.email ?? "Admin"}</p>
      <button
        type="button"
        onClick={() => {
          logout();
          toast.success("Signed out");
          onAfterSignOut?.();
        }}
        className="mt-3 w-full rounded-md px-2 py-1.5 text-left font-body text-xs uppercase tracking-[0.12em] text-muted-foreground transition-colors hover:bg-surface-highest hover:text-primary"
      >
        Sign out
      </button>
    </div>
  );
}

export default function AdminLayout() {
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-surface text-foreground">
      <aside className="sticky top-0 hidden h-[100dvh] max-h-[100dvh] w-64 shrink-0 flex-col self-start overflow-hidden border-r border-border/40 bg-surface-container lg:flex">
        <div className="shrink-0 border-b border-border/40 border-gold px-5 py-4">
          <BrandLogo variant="text" theme="light" className="w-full max-w-full" />
        </div>
        <SidebarLinks />
        <SidebarFooter />
      </aside>

      <AnimatePresence>
        {mobileOpen ? (
          <>
            <motion.button
              type="button"
              aria-label="Close menu"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-40 bg-primary/40 backdrop-blur-sm lg:hidden"
              onClick={() => setMobileOpen(false)}
            />
            <motion.aside
              initial={{ x: -280 }}
              animate={{ x: 0 }}
              exit={{ x: -280 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
              className="fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-border/40 bg-surface-container shadow-xl lg:hidden"
            >
              <div className="shrink-0 border-b border-border/40 border-gold px-5 py-4">
                <BrandLogo variant="text" theme="light" className="w-full max-w-full" />
              </div>
              <SidebarLinks onNavigate={() => setMobileOpen(false)} />
              <SidebarFooter onAfterSignOut={() => setMobileOpen(false)} />
            </motion.aside>
          </>
        ) : null}
      </AnimatePresence>

      <div className="flex min-w-0 flex-1 flex-col">
        <header className="sticky top-0 z-30 flex items-center justify-between border-b border-border/40 bg-surface/80 px-4 py-3 backdrop-blur-xl md:px-8">
          <div className="flex items-center gap-3">
            <button
              type="button"
              aria-label="Open menu"
              onClick={() => setMobileOpen(true)}
              className="-ml-1 rounded-md p-2 text-muted-foreground hover:bg-surface-highest lg:hidden"
            >
              <span className="block h-0.5 w-5 bg-gold" />
              <span className="mt-1 block h-0.5 w-5 bg-gold" />
              <span className="mt-1 block h-0.5 w-5 bg-gold" />
            </button>
            <p className="label-luxury">Atelier · Admin</p>
          </div>
          <Link
            to="/"
            target="_blank"
            rel="noopener noreferrer"
            className="font-body text-xs uppercase tracking-[0.15em] text-muted-foreground transition-colors hover:text-gold"
          >
            View storefront ↗
          </Link>
        </header>

        <main className="min-w-0 flex-1 px-4 py-8 md:px-8 md:py-12">
          <AnimatePresence mode="wait">
            <motion.div
              key={location.pathname}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.35, ease: [0.4, 0, 0.2, 1] }}
            >
              <Outlet />
            </motion.div>
          </AnimatePresence>
        </main>
      </div>
    </div>
  );
}
