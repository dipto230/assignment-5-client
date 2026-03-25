"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function AppointmentPage() {
  const { user, loading } = useAuth();

  // Fetch appointments for logged-in lawyer
  const {
    data: appointments,
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery({
    queryKey: ["appointments", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      // Backend route: /api/v1/appointments/my-appointments
      const res = await apiClient.get("/appointments/my-appointments");
      return res.data.data; // dhore nichi backend { data: [...] }
    },
  });

  if (loading) return <div className="p-6 text-gray-500">Loading user...</div>;
  if (!user) return <div className="p-6 text-red-500">No User ❌</div>;
  if (isLoading) return <div className="p-6 text-gray-500">Loading appointments...</div>;
  if (isError) return (
    <div className="p-6 text-red-500">
      Error loading appointments: {(error as any)?.message || "Unknown error"}
      <button
        onClick={() => refetch()}
        className="ml-4 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
      >
        Retry
      </button>
    </div>
  );

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">My Appointments</h1>

      {appointments.length === 0 ? (
        <p className="text-gray-500">No appointments found.</p>
      ) : (
        <div className="grid md:grid-cols-2 gap-4">
          {appointments.map((appt: any) => (
            <div
              key={appt.id}
              className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              <p>
                <span className="text-gray-400 font-medium">Client:</span> {appt.clientName}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Date:</span>{" "}
                {new Date(appt.date).toLocaleString()}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Status:</span> {appt.status}
              </p>
              {appt.description && (
                <p>
                  <span className="text-gray-400 font-medium">Description:</span>{" "}
                  {appt.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}