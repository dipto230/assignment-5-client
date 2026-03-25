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

interface Schedule {
  id: string;
  startDateTime: string;
  endDateTime: string;
  createdAt: string;
  updatedAt: string;
}

interface ScheduleResponse {
  data: Schedule[];
  meta: {
    page: number;
    limit: number;
    total: number;
    totalPages: number;
  };
}

export default function ScheduleManagement() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const [newSchedule, setNewSchedule] = useState({
    startDateTime: "",
    endDateTime: "",
  });

  // Fetch paginated schedules
  const { data, isLoading } = useQuery<ScheduleResponse>({
    queryKey: ["schedules", page],
    queryFn: () => scheduleService.getAll(page, limit),
    keepPreviousData: true,
  });

  // Create schedule mutation
  const createMutation = useMutation({
    mutationFn: () => scheduleService.create(newSchedule),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules", page] });
      setNewSchedule({ startDateTime: "", endDateTime: "" });
    },
  });

  // Delete schedule mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => scheduleService.delete(id),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["schedules", page] });
    },
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
      {data?.data.length ? (
        <>
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
              {data.data.map((s) => (
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

          {/* Pagination */}
          <div className="mt-4 flex justify-center items-center gap-4">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>
            <span>
              Page {page} of {data.meta.totalPages}
            </span>
            <Button
              disabled={page === data.meta.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p>No schedules found.</p>
      )}
    </div>
  );
}