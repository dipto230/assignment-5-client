"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { scheduleService } from "@/services/schedule.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function ScheduleManagement() {
  const queryClient = useQueryClient();
  const [newSchedule, setNewSchedule] = useState({
    startDateTime: "",
    endDateTime: "",
  });

  // Fetch schedules
  const { data: schedules, isLoading } = useQuery({
    queryKey: ["schedules"],
    queryFn: () => scheduleService.getAll(),
    select: (res) => res.data.data, // extract the actual schedules array
  });

  // Create schedule
  const createMutation = useMutation({
   mutationFn: () => {
  const [startDate, startTime] = newSchedule.startDateTime.split("T");
  const [endDate, endTime] = newSchedule.endDateTime.split("T");

  const payload = {
    startDate,
    endDate,
    startTime,
    endTime,
  };

  console.log("Sending payload:", payload); // DEBUG

  return scheduleService.create(payload);
},,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules"] }); 
      setNewSchedule({ startDateTime: "", endDateTime: "" });
    },
  });

  // Delete schedule
  const deleteMutation = useMutation({
    mutationFn: (id: string) => scheduleService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["schedules"] }), 
  });

  if (isLoading) return <div className="p-8">Loading schedules...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
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
        <Button
          onClick={() => createMutation.mutate()}
          className="bg-blue-600 text-white"
        >
          Create
        </Button>
      </div>

      {/* Table of schedules */}
      {schedules && schedules.length > 0 ? (
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>ID</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {schedules.map((s: any) => (
              <TableRow key={s.id}>
                <TableCell>{s.id}</TableCell>
                <TableCell>
                  {new Date(s.startDateTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  {new Date(s.endDateTime).toLocaleString()}
                </TableCell>
                <TableCell>
                  <Button
                    variant="destructive"
                    size="sm"
                    onClick={() => deleteMutation.mutate(s.id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p>No schedules found.</p>
      )}
    </div>
  );
}