"use client";

import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";
import { useState } from "react";

interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
}

interface LawyerSchedule {
  schedule: Schedule;
  lawyerId: string;
  scheduleId: string;
  isBooked: boolean;
}

export default function MySchedulePage() {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const [selectedSchedules, setSelectedSchedules] = useState<string[]>([]);
  const [updateSchedules, setUpdateSchedules] = useState<{ id: string; shouldDelete: boolean }[]>([]);

  // ✅ Fetch lawyer schedules
  const { data: schedules = [], isLoading, isError, refetch } = useQuery<LawyerSchedule[]>({
    queryKey: ["myLawyerSchedules", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/lawyer-schedules/my-lawyer-schedules");
      return res.data.data;
    },
  });

  // ✅ Create schedules
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/api/v1/lawyer-schedules/create-my-lawyer-schedule", {
        scheduleIds: selectedSchedules,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLawyerSchedules", user?.id] });
      setSelectedSchedules([]);
    },
  });

  // ✅ Update schedules
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.patch("/api/v1/lawyer-schedules/update-my-lawyer-schedule", {
        scheduleIds: updateSchedules,
      });
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myLawyerSchedules", user?.id] });
      setUpdateSchedules([]);
    },
  });

  // ✅ Delete schedule
  const deleteMutation = useMutation({
    mutationFn: async (scheduleId: string) => {
      const res = await apiClient.delete(`/api/v1/lawyer-schedules/delete-my-lawyer-schedule/${scheduleId}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myLawyerSchedules", user?.id] }),
  });

  if (loading) return <div className="p-6 text-gray-500">Loading user...</div>;
  if (!user) return <div className="p-6 text-red-500">No User ❌</div>;
  if (isLoading) return <div className="p-6 text-gray-500">Loading schedules...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading schedules</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">My Schedules</h1>

      {/* CREATE NEW SCHEDULE */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Add New Schedule IDs (comma-separated)</label>
        <input
          type="text"
          placeholder="Schedule IDs: abc,def,ghi"
          className="border rounded px-3 py-2 w-full mb-2"
          value={selectedSchedules.join(",")}
          onChange={(e) => setSelectedSchedules(e.target.value.split(",").map(s => s.trim()))}
        />
        <button
          onClick={() => createMutation.mutate()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Schedules
        </button>
      </div>

      {/* UPDATE SCHEDULE */}
      <div className="mb-6">
        <label className="block text-sm font-medium text-gray-700 mb-2">Update / Delete Schedules</label>
        {schedules.map((s) => (
          <div key={s.scheduleId} className="flex items-center justify-between mb-2 p-2 border rounded bg-white">
            <span>{s.schedule.startDateTime} - {s.schedule.endDateTime}</span>
            <div className="flex gap-2">
              <button
                className="px-2 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                onClick={() => setUpdateSchedules([...updateSchedules, { id: s.scheduleId, shouldDelete: true }])}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {updateSchedules.length > 0 && (
          <button
            onClick={() => updateMutation.mutate()}
            className="mt-2 px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
          >
            Apply Updates
          </button>
        )}
      </div>

      {/* SCHEDULE LIST */}
      <div className="mt-6">
        <h2 className="text-lg font-medium mb-2">Current Schedules</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {schedules.map((s) => (
            <div key={s.scheduleId} className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition flex justify-between">
              <div>
                <p><span className="text-gray-400">Start:</span> {new Date(s.schedule.startDateTime).toLocaleString()}</p>
                <p><span className="text-gray-400">End:</span> {new Date(s.schedule.endDateTime).toLocaleString()}</p>
                <p><span className="text-gray-400">Booked:</span> {s.isBooked ? "Yes" : "No"}</p>
              </div>
              <button
                onClick={() => deleteMutation.mutate(s.scheduleId)}
                className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
              >
                Delete
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}