"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

export default function Page() {
  const { user, loading } = useAuth();

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/stats");
      return res.data;
    },
  });

  const stats = data?.data;

  if (loading) return <div className="p-6 text-gray-400">Auth Loading...</div>;
  if (!user) return <div className="p-6 text-red-500">No User ❌</div>;
  if (queryLoading)
    return <div className="p-6 text-gray-400">Stats Loading...</div>;

  return (
    <div className="min-h-screen bg-[#020617] text-white p-8">
      
      {/* HEADER */}
      <div className="mb-10 border-b border-white/10 pb-4">
        <h1 className="text-4xl font-semibold tracking-wide">
          Admin Dashboard
        </h1>
        <p className="text-gray-400 mt-2 text-sm">
          Welcome back, {user.name}
        </p>
      </div>

      {/* STATS SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        
        <div className="bg-gradient-to-br from-indigo-600/20 to-purple-600/10 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm mb-2">Total Lawyers</p>
          <h2 className="text-3xl font-bold">{stats?.totalLawyers ?? 0}</h2>
        </div>

        <div className="bg-gradient-to-br from-cyan-600/20 to-blue-600/10 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm mb-2">Total Clients</p>
          <h2 className="text-3xl font-bold">{stats?.totalClients ?? 0}</h2>
        </div>

        <div className="bg-gradient-to-br from-emerald-600/20 to-teal-600/10 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm mb-2">Appointments</p>
          <h2 className="text-3xl font-bold">{stats?.totalAppointments ?? 0}</h2>
        </div>

        <div className="bg-gradient-to-br from-pink-600/20 to-rose-600/10 border border-white/10 p-6 rounded-xl backdrop-blur-md hover:scale-[1.02] transition">
          <p className="text-gray-400 text-sm mb-2">Consultation Notes</p>
          <h2 className="text-3xl font-bold">{stats?.totalConsultationNotes ?? 0}</h2>
        </div>

      </div>

      {/* LOWER SECTION */}
      <div className="mt-12 grid md:grid-cols-2 gap-6">
        
        {/* ADMIN INFO */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4">Admin Info</h2>

          <div className="space-y-2 text-gray-300 text-sm">
            <p><span className="text-gray-400">Name:</span> {user.name}</p>
            <p><span className="text-gray-400">Email:</span> {user.email}</p>
            <p><span className="text-gray-400">Role:</span> {user.role}</p>
          </div>
        </div>

        {/* ACTIVITY */}
        <div className="bg-white/5 border border-white/10 rounded-xl p-6 backdrop-blur-md">
          <h2 className="text-xl font-semibold mb-4">Recent Activity</h2>

          <p className="text-gray-400 text-sm">
            No recent activity available.
          </p>
        </div>

      </div>
    </div>
  );
}