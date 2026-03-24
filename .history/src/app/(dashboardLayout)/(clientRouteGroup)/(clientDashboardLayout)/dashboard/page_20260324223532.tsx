// Dashboard.tsx
"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p>Loading...</p>;
  if (!user) return <p className="text-red-600">No user logged in</p>;

  return <div>Welcome {user.name}</div>;
}