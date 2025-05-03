"use client";

import { AdminMiddleware } from "@/components/admin-middleware";

export function AdminWrapper({ children }: { children: React.ReactNode }) {
  return <AdminMiddleware>{children}</AdminMiddleware>;
}
