import { Navigate, useLocation } from "react-router-dom";
import { useAdminAuth } from "@/admin/context/AdminAuthContext";

/** @param {{ children: React.ReactNode }} props */
export default function AdminProtectedRoute({ children }) {
  const { isAuthenticated } = useAdminAuth();
  const loc = useLocation();
  if (!isAuthenticated) {
    return <Navigate to="/admin/login" replace state={{ from: loc.pathname }} />;
  }
  return children;
}
