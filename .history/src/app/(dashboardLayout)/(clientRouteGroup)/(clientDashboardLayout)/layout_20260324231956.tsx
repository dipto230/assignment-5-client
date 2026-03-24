"use client";

import Sidebar from "@/components/dashboard/Sidebar";

export default function ClientDashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen">
      
      {/* 🔥 Sidebar */}
      <Sidebar />

      {/* 🔥 Page Content */}
      <main className="flex-1 bg-gray-100">
        {children}
      </main>

    </div>
  );
}