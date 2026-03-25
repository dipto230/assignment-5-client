"use client";

import AdminSidebar from "@/components/AdminSidebar";
import { useAuth } from "@/providers/AuthProvider";

export default function AdminDashboardLayout({ children }) {
  const { user, loading } = useAuth();

  console.log("ADMIN LAYOUT USER 👉", user);

  if (loading) return <div>Loading...</div>;

  if (!user) return <div>No User Found ❌</div>;

  return (
    <>
      <AdminSidebar />
      <div>
        <p>Logged in as: {user.email}</p>
        {children}
      </div>
    </>
  );
}