"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/providers/AuthProvider";

export default function AdminDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { user, loading } = useAuth();

  if (loading) return <div>Loading...</div>;
  if (!user) return <div>No User ❌</div>;

  return (
    <div className="flex min-h-screen">
      <div className="w-64 bg-gray-100 border-r">
        <AdminSidebar />
      </div>

      <div className="flex-1 p-6">{children}</div>
    </div>
  );
}