"use client";

import Navbar from "@/components/shared/Navbar";
import { AuthProvider } from "@/providers/AuthProvider";

export default function CommonLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AuthProvider>
      <Navbar />
      {children}
    </AuthProvider>
  );
}