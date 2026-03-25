"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
  const { user, loading } = useAuth();

  console.log("👤 USER 👉", user);
  console.log("⏳ LOADING 👉", loading);

  const { data, error, isLoading } = useQuery({
    queryKey: ["stats"],
    queryFn: async () => {
      console.log("🔥 QUERY RUN HOCHE");

      console.log("🌍 BASE URL 👉", apiClient.defaults.baseURL);

      try {
        const res = await apiClient.get("/api/v1/stats");

        console.log("📦 FULL RESPONSE 👉", res);
        console.log("📦 RESPONSE DATA 👉", res.data);

        return res;
      } catch (err) {
        console.error("❌ API ERROR 👉", err);
        throw err;
      }
    },
  });

  const stats = data?.data?.data;

  console.log("📊 FINAL STATS 👉", stats);
  console.log("⚠️ ERROR 👉", error);
  console.log("⏳ QUERY LOADING 👉", isLoading);

  if (loading || isLoading) return <div>Loading...</div>;

  if (error) return <div>API Error ❌</div>;

  return (
    <div>
      <h1>Dashboard</h1>

      <p>User: {user?.email}</p>

      <div className="grid grid-cols-4 gap-4 mt-4">
        <div>Total Lawyers: {stats?.totalLawyers}</div>
        <div>Total Clients: {stats?.totalClients}</div>
        <div>Total Appointments: {stats?.totalAppointments}</div>
        <div>Total Notes: {stats?.totalConsultationNotes}</div>
      </div>
    </div>
  );
}