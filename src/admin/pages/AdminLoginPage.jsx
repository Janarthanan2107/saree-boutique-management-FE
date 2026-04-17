import { useState } from "react";
import { Link, Navigate, useLocation } from "react-router-dom";
import { motion } from "framer-motion";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";
import BrandLogo from "@/components/BrandLogo";
import { toast } from "sonner";

export default function AdminLoginPage() {
  const { isAuthenticated, login } = useAdminAuth();
  const loc = useLocation();
  const from = typeof loc.state?.from === "string" ? loc.state.from : "/admin";

  const [email, setEmail] = useState("admin@megamdrapes.com");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  if (isAuthenticated) return <Navigate to={from} replace />;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    const r = login(email, password);
    setLoading(false);
    if (!r.ok) {
      toast.error(r.error || "Sign in failed");
      return;
    }
    toast.success("Welcome back");
  };

  return (
    <div className="flex min-h-screen flex-col bg-surface px-6 py-16">
      <div className="mx-auto flex w-full max-w-md flex-1 flex-col justify-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="border border-border/40 bg-surface-container p-10 shadow-[0_24px_80px_-24px_rgba(40,30,20,0.12)]"
        >
          <Link to="/" className="inline-block">
            <BrandLogo variant="text" theme="light" />
          </Link>
          <p className="mt-3 font-body text-xs uppercase tracking-[0.2em] text-gold">Atelier console</p>
          <h1 className="mt-8 font-display text-3xl text-foreground">Sign in</h1>
          <p className="mt-2 font-body text-sm text-muted-foreground">
            Admin access. Set <code className="text-xs">VITE_ADMIN_PASSWORD</code> in production.
          </p>
          <form onSubmit={handleSubmit} className="mt-10 space-y-6">
            <div>
              <label htmlFor="adm-email" className="font-body text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Email
              </label>
              <input
                id="adm-email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="username"
                className="mt-2 w-full border-b border-border/60 bg-transparent py-2 font-body text-sm outline-none focus:border-gold"
              />
            </div>
            <div>
              <label htmlFor="adm-pass" className="font-body text-xs uppercase tracking-[0.12em] text-muted-foreground">
                Password
              </label>
              <input
                id="adm-pass"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                autoComplete="current-password"
                className="mt-2 w-full border-b border-border/60 bg-transparent py-2 font-body text-sm outline-none focus:border-gold"
              />
            </div>
            <PrimaryBtn type="submit" disabled={loading}>
              {loading ? "Signing in…" : "Continue"}
            </PrimaryBtn>
          </form>
          <p className="mt-8 text-center font-body text-xs text-muted-foreground">
            Demo password: <span className="text-foreground">megamdrapes</span>
          </p>
        </motion.div>
      </div>
    </div>
  );
}

function PrimaryBtn({ children, ...props }) {
  return (
    <button
      {...props}
      className="w-full bg-primary py-3.5 font-body text-xs uppercase tracking-[0.15em] text-on-primary transition-opacity hover:opacity-90 disabled:opacity-60"
    >
      {children}
    </button>
  );
}
