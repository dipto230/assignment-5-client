"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
  const { user, loading } = useAuth();

  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => apiClient.get("/api/v1/stats"),
  });

  const stats = data?.data?.data; // ✅ FIX

  if (loading) return <div>Loading...</div>;

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