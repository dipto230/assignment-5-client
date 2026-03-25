"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
  const { user, loading } = useAuth();

  console.log("👤 USER 👉", user);
  console.log("⏳ LOADING 👉", loading);

  const {
    data,
    isLoading: queryLoading,
    error,
  } = useQuery({
    queryKey: ["stats", user?.id],
    
    // 🔥 FIX 1: only run when user exists
    enabled: !!user,

    queryFn: async () => {
      console.log("🔥 QUERY RUN HOCHE");
      console.log("🌍 BASE URL 👉", apiClient.defaults.baseURL);

      const res = await apiClient.get("/api/v1/stats");

      console.log("📦 FULL RESPONSE 👉", res);
      console.log("📦 RESPONSE DATA 👉", res.data);

      return res.data;
    },
  });

  const stats = data?.data;

  console.log("📊 FINAL STATS 👉", stats);
  console.log("⚠️ ERROR 👉", error);
  console.log("⏳ QUERY LOADING 👉", queryLoading);

  if (loading) return <div>Auth Loading...</div>;

  if (!user) return <div>No User ❌</div>;

  if (queryLoading) return <div>Stats Loading...</div>;

  return (
    <div>
      <h1>Admin Dashboard</h1>

      <p>User: {user.email}</p>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>Total Lawyers: {stats?.totalLawyers}</div>
        <div>Total Clients: {stats?.totalClients}</div>
        <div>Total Appointments: {stats?.totalAppointments}</div>
        <div>Total Notes: {stats?.totalConsultationNotes}</div>
      </div>
    </div>
  );
}