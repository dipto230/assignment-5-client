"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function LawyerDashboardPage() {
  const { user, loading, logout } = useAuth();

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["lawyerStats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/lawyer/stats");
      return res.data;
    },
  });

  const stats = data?.data;

  if (loading)
    return <div className="p-6 text-gray-500">Auth Loading...</div>;
  if (!user)
    return <div className="p-6 text-red-500">No User ❌</div>;
  if (queryLoading)
    return <div className="p-6 text-gray-500">Stats Loading...</div>;

  return (
    <div className="min-h-screen bg-[#f8fafc] text-gray-900 px-10 py-10 relative">

      {/* Logout Button */}
      <button
        onClick={logout}
        className="absolute top-5 right-5 bg-red-500 text-white px-4 py-2 rounded-md text-sm hover:bg-red-600 transition"
      >
        Logout
      </button>

      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold tracking-tight">
          Lawyer Dashboard
        </h1>
        <p className="text-gray-500 mt-1 text-sm">
          Welcome back, {user.name}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-5">
        {[
          { label: "Total Appointments", value: stats?.totalAppointments },
          { label: "My Consultation Notes", value: stats?.totalConsultationNotes },
          { label: "Upcoming Schedule", value: stats?.upcomingSchedules },
          { label: "Total Reviews", value: stats?.totalReviews },
        ].map((item, i) => (
          <div
            key={i}
            className="bg-white border border-gray-200 rounded-lg p-5 hover:shadow-md hover:border-gray-300 transition-all duration-200"
          >
            <p className="text-gray-400 text-xs uppercase tracking-wide">
              {item.label}
            </p>
            <h2 className="text-2xl font-semibold mt-2">
              {item.value ?? 0}
            </h2>
          </div>
        ))}
      </div>

      {/* LOWER INFO */}
      <div className="mt-10 grid md:grid-cols-2 gap-5">

        {/* LAWYER INFO */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-medium mb-4">Lawyer Info</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p><span className="text-gray-400">Name:</span> {user.name}</p>
            <p><span className="text-gray-400">Email:</span> {user.email}</p>
            <p><span className="text-gray-400">Role:</span> {user.role}</p>
          </div>
        </div>

        {/* SYSTEM OVERVIEW */}
        <div className="bg-white border border-gray-200 rounded-lg p-5">
          <h2 className="text-lg font-medium mb-4">System Overview</h2>
          <div className="space-y-2 text-sm text-gray-600">
            <p>{stats?.totalAppointments} appointments scheduled</p>
            <p>{stats?.totalConsultationNotes} consultation notes</p>
            <p>{stats?.upcomingSchedules} upcoming schedules</p>
            <p>{stats?.totalReviews} total reviews</p>
          </div>
        </div>

      </div>

    </div>
  );
}