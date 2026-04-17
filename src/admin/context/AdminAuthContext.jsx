import { createContext, useCallback, useContext, useEffect, useMemo, useState } from "react";
import {
  getSession,
  initAdminData,
  loginAdmin,
  logoutAdmin,
  subscribeAdmin,
} from "@/admin/data/adminApi";

const AdminAuthContext = createContext(null);

export function AdminAuthProvider({ children }) {
  const [session, setSession] = useState(() => (typeof window !== "undefined" ? getSession() : null));

  useEffect(() => {
    initAdminData();
    setSession(getSession());
  }, []);

  useEffect(() => {
    const unsub = subscribeAdmin(() => setSession(getSession()));
    return unsub;
  }, []);

  const login = useCallback((email, password) => {
    const r = loginAdmin(email, password);
    if (r.ok) setSession(getSession());
    return r;
  }, []);

  const logout = useCallback(() => {
    logoutAdmin();
    setSession(null);
  }, []);

  const value = useMemo(
    () => ({
      session,
      isAuthenticated: Boolean(session?.role === "admin"),
      login,
      logout,
    }),
    [session, login, logout],
  );

  return <AdminAuthContext.Provider value={value}>{children}</AdminAuthContext.Provider>;
}

export function useAdminAuth() {
  const ctx = useContext(AdminAuthContext);
  if (!ctx) throw new Error("useAdminAuth must be used within AdminAuthProvider");
  return ctx;
}
