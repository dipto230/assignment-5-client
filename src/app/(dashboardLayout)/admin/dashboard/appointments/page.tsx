"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { appointmentService } from "@/services/appointmentService";

interface Appointment {
  id: string;
  client: { id: string; name: string; email: string };
  lawyer: { id: string; name: string; email: string };
  schedule: { startDateTime: string; endDateTime: string };
  payment: { amount: number; status: string };
  status: string;
  createdAt: string;
  updatedAt: string;
}

export default function AdminAppointments() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["appointments", page],
    queryFn: () => appointmentService.getAll(page, limit),
    placeholderData: (prev) => prev,
  });

  const statusMutation = useMutation({
    mutationFn: ({ id, status }: { id: string; status: string }) =>
      appointmentService.changeStatus(id, status),
    onSuccess: () =>
      queryClient.invalidateQueries({ queryKey: ["appointments", page] }),
  });

  if (isLoading) return <div className="p-8">Loading appointments...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">All Appointments</h1>

      {data?.data?.data?.length ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Lawyer</TableHead>
                <TableHead>Schedule</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {data?.data?.data?.map((a: Appointment) => (
                <TableRow key={a.id}>
                  <TableCell>{a.id}</TableCell>

                  <TableCell>
                    {a.client.name} ({a.client.email})
                  </TableCell>

                  <TableCell>
                    {a.lawyer.name} ({a.lawyer.email})
                  </TableCell>

                  <TableCell>
                    {new Date(a.schedule.startDateTime).toLocaleString()} -{" "}
                    {new Date(a.schedule.endDateTime).toLocaleString()}
                  </TableCell>

                  <TableCell>{a.status}</TableCell>

                  <TableCell>
                    {a.payment.amount} - {a.payment.status}
                  </TableCell>

                  <TableCell>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() =>
                        statusMutation.mutate({
                          id: a.id,
                          status:
                            a.status === "SCHEDULED"
                              ? "COMPLETED"
                              : "SCHEDULED",
                        })
                      }
                    >
                      Toggle Status
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
              Page {page} of {data?.data?.meta?.totalPages}
            </span>

            <Button
              disabled={page === data?.data?.meta?.totalPages}
              onClick={() => setPage((prev) => prev + 1)}
            >
              Next
            </Button>
          </div>
        </>
      ) : (
        <p>No appointments found.</p>
      )}
    </div>
  );
}