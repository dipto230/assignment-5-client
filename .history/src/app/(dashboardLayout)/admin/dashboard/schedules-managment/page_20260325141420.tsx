"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { format } from "date-fns";

// --- API calls ---
const scheduleService = {
  getAll: () => apiClient.get("/api/v1/schedule"),
  create: (data: any) => apiClient.post("/api/v1/schedule", data),
  update: (id: string, data: any) => apiClient.patch(`/api/v1/schedule/${id}`, data),
  delete: (id: string) => apiClient.delete(`/api/v1/schedule/${id}`),
};

const ScheduleManagement = () => {
  const queryClient = useQueryClient();

  // form state for create/edit
  const [form, setForm] = useState({
    startDate: "",
    endDate: "",
    startTime: "",
    endTime: "",
  });
  const [editingId, setEditingId] = useState<string | null>(null);

  // Fetch schedules
  const { data, isLoading } = useQuery({
    queryKey: ["schedules"],
    queryFn: async () => {
      const res = await scheduleService.getAll();
      return res.data.data; // backend response: { data: [], meta: {} }
    },
  });

  // Create or Update Mutation
  const saveMutation = useMutation({
    mutationFn: async (payload: typeof form) => {
      if (editingId) {
        return scheduleService.update(editingId, payload);
      } else {
        return scheduleService.create(payload);
      }
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"]);
      setForm({ startDate: "", endDate: "", startTime: "", endTime: "" });
      setEditingId(null);
    },
  });

  // Delete Mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => scheduleService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(["schedules"]),
  });

  const handleEdit = (schedule: any) => {
    setEditingId(schedule.id);
    setForm({
      startDate: format(new Date(schedule.startDateTime), "yyyy-MM-dd"),
      endDate: format(new Date(schedule.endDateTime), "yyyy-MM-dd"),
      startTime: format(new Date(schedule.startDateTime), "HH:mm"),
      endTime: format(new Date(schedule.endDateTime), "HH:mm"),
    });
  };

  if (isLoading) return <div className="p-8">Loading schedules...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Schedule Management</h1>

      {/* Create / Edit Form */}
      <div className="border p-4 rounded mb-6">
        <h2 className="font-semibold mb-2">{editingId ? "Edit Schedule" : "New Schedule"}</h2>
        <div className="grid grid-cols-2 gap-4 mb-2">
          <input
            type="date"
            value={form.startDate}
            onChange={(e) => setForm({ ...form, startDate: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="date"
            value={form.endDate}
            onChange={(e) => setForm({ ...form, endDate: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="time"
            value={form.startTime}
            onChange={(e) => setForm({ ...form, startTime: e.target.value })}
            className="border p-2 rounded"
          />
          <input
            type="time"
            value={form.endTime}
            onChange={(e) => setForm({ ...form, endTime: e.target.value })}
            className="border p-2 rounded"
          />
        </div>
        <button
          onClick={() => saveMutation.mutate(form)}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {editingId ? "Update" : "Create"}
        </button>
        {editingId && (
          <button
            onClick={() => {
              setEditingId(null);
              setForm({ startDate: "", endDate: "", startTime: "", endTime: "" });
            }}
            className="ml-2 bg-gray-400 text-white px-4 py-2 rounded"
          >
            Cancel
          </button>
        )}
      </div>

      {/* Schedule List */}
      <div className="grid grid-cols-1 gap-4">
        {data.map((s: any) => (
          <div key={s.id} className="flex justify-between items-center border p-4 rounded">
            <div>
              <p>
                <strong>Start:</strong> {format(new Date(s.startDateTime), "yyyy-MM-dd HH:mm")}
              </p>
              <p>
                <strong>End:</strong> {format(new Date(s.endDateTime), "yyyy-MM-dd HH:mm")}
              </p>
            </div>
            <div className="flex gap-2">
              <button
                onClick={() => handleEdit(s)}
                className="bg-yellow-500 text-white px-3 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => deleteMutation.mutate(s.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ScheduleManagement;