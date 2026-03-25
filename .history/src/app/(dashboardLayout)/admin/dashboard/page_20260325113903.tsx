"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

export default function Page() {
  const { data } = useQuery({
    queryKey: ["stats"],
    queryFn: () => apiClient.get("/stats"),
  });

  const stats = data?.data;

  return (
    <div className="grid grid-cols-4 gap-4">
      <div>Total Lawyers: {stats?.totalLawyers}</div>
      <div>Total Clients: {stats?.totalClients}</div>
      <div>Total Appointments: {stats?.totalAppointments}</div>
      <div>Total Notes: {stats?.totalConsultationNotes}</div>
    </div>
  );
}