import { useSyncExternalStore } from "react";
import { getAdminVersion, subscribeAdmin } from "@/admin/data/adminApi";

export function useAdminSync() {
  return useSyncExternalStore(subscribeAdmin, getAdminVersion, getAdminVersion);
}
