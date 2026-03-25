"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleService } from "@/services/schedule.service";

export default function ScheduleManagement() {
  const queryClient = useQueryClient();
  const [newSchedule, setNewSchedule] = useState({
    startDateTime: "",
    endDateTime: "",
  });

  // Fetch schedules, select only the array of schedules
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["schedules"],
    queryFn: () => scheduleService.getAll(),
    select: (res) => res.data.data, // extract the actual schedules array
  });

  // Create schedule mutation
  const createMutation = useMutation({
    mutationFn: () => scheduleService.create(newSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries(["schedules"] );
      setNewSchedule({ startDateTime: "", endDateTime: "" });
    },
  });

  // Delete schedule mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => scheduleService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(["schedules"]),
  });

  if (isLoading) return <div className="p-8">Loading schedules...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Schedule Management</h1>

      {/* Create new schedule */}
      <div className="mb-6 flex gap-2">
        <input
          type="datetime-local"
          value={newSchedule.startDateTime}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, startDateTime: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <input
          type="datetime-local"
          value={newSchedule.endDateTime}
          onChange={(e) =>
            setNewSchedule({ ...newSchedule, endDateTime: e.target.value })
          }
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => createMutation.mutate()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* List of schedules */}
      <div className="grid grid-cols-1 gap-4">
        {schedules && schedules.length > 0 ? (
          schedules.map((s: any) => (
            <div
              key={s.id}
              className="flex justify-between items-center border p-4 rounded"
            >
              <div>
                <p>
                  {new Date(s.startDateTime).toLocaleString()} -{" "}
                  {new Date(s.endDateTime).toLocaleString()}
                </p>
              </div>
              <button
                onClick={() => deleteMutation.mutate(s.id)}
                className="bg-red-600 text-white px-3 py-1 rounded"
              >
                Delete
              </button>
            </div>
          ))
        ) : (
          <p>No schedules found.</p>
        )}
      </div>
    </div>
  );
}