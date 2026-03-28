"use client";

import Sidebar from "@/components/dashboard/Sidebar";
import { AuthProvider } from "@/providers/AuthProvider";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
    <div className="flex min-h-screen">
      
      {/* 🔥 Sidebar */}
      <Sidebar />

      {/* 🔥 Page Content */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>

      </div>
      </AuthProvider>
  );
}