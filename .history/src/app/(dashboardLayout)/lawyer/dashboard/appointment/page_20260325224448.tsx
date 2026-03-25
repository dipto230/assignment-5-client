"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

interface Appointment {
  id: string;
  client?: { name: string };
  lawyer?: { name: string };
  schedule?: { startDateTime: string; endDateTime: string };
  date?: string;
  status: string;
  description?: string;
}

export default function AppointmentPage() {
  const { user, loading } = useAuth();

  // Fetch appointments for logged-in user (lawyer or client)
  const {
    data: appointments = [],
    isLoading,
    isError,
    error,
    refetch,
  } = useQuery<Appointment[]>({
    queryKey: ["appointments", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/appointments/my-appointments");
      return res.data.data; // backend returns { data: [...] }
    },
  });

  if (loading) return <div className="p-6 text-gray-500">Loading user...</div>;
  if (!user) return <div className="p-6 text-red-500">No User ❌</div>;
  if (isLoading) return <div className="p-6 text-gray-500">Loading appointments...</div>;

  if (isError)
    return (
      <div className="p-6 text-red-500">
        <p>Error loading appointments: {(error as any)?.message || "Unknown error"}</p>
        <button
          onClick={() => refetch()}
          className="mt-2 px-3 py-1 bg-blue-500 text-white rounded hover:bg-blue-600 transition"
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
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {appointments.map((appt) => (
            <div
              key={appt.id}
              className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition"
            >
              {user.role === "LAWYER" && appt.client && (
                <p>
                  <span className="text-gray-400 font-medium">Client:</span> {appt.client.name}
                </p>
              )}
              {user.role === "USER" && appt.lawyer && (
                <p>
                  <span className="text-gray-400 font-medium">Lawyer:</span> {appt.lawyer.name}
                </p>
              )}
              <p>
                <span className="text-gray-400 font-medium">Date:</span>{" "}
                {appt.schedule
                  ? new Date(appt.schedule.startDateTime).toLocaleString()
                  : appt.date
                  ? new Date(appt.date).toLocaleString()
                  : "N/A"}
              </p>
              <p>
                <span className="text-gray-400 font-medium">Status:</span> {appt.status}
              </p>
              {appt.description && (
                <p>
                  <span className="text-gray-400 font-medium">Description:</span> {appt.description}
                </p>
              )}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}