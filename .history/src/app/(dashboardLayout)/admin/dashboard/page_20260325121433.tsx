"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
  const { user, loading } = useAuth();

  console.log("USER 👉", user);
  console.log("LOADING 👉", loading);

  if (loading) return <div>Loading...</div>;

  return (
    <div>
      <h1>Dashboard</h1>
      <pre>{JSON.stringify(user, null, 2)}</pre>
    </div>
  );
}