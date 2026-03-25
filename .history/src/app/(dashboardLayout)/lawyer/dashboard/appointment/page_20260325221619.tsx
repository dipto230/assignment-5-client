"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function AppointmentPage() {
  const { user, loading } = useAuth();

  // Fetch appointments
  const { data, isLoading } = useQuery({
    queryKey: ["appointments", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/lawyer/appointments");
      return res.data.data;
    },
  });

  if (loading) return <div>Loading user...</div>;
  if (!user) return <div>No User ❌</div>;
  if (isLoading) return <div>Loading appointments...</div>;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>

      {data.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="space-y-4">
          {data.map((appointment: any) => (
            <div
              key={appointment.id}
              className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <p><span className="text-gray-400">Client:</span> {appointment.clientName}</p>
              <p><span className="text-gray-400">Date:</span> {new Date(appointment.date).toLocaleString()}</p>
              <p><span className="text-gray-400">Status:</span> {appointment.status}</p>
              <p><span className="text-gray-400">Description:</span> {appointment.description}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}