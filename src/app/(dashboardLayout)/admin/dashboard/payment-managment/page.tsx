"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { paymentService } from "@/services/payment.service";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

export default function AdminPayments() {
  const queryClient = useQueryClient();
  const [page, setPage] = useState(1);
  const limit = 10;

  // ✅ FIXED HERE
  const { data, isLoading } = useQuery({
    queryKey: ["payments", page],
    queryFn: () => paymentService.getAll(page, limit),
    placeholderData: (prev) => prev,
  });

  const deleteMutation = useMutation({
    mutationFn: (id: string) => paymentService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["payments"] }),
  });

  if (isLoading) return <div className="p-8">Loading payments...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Payments</h1>

      {/* ✅ FIXED HERE */}
      {data?.data?.data?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Appointment ID</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Created At</TableHead>
                <TableHead>Actions</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {/* ✅ FIXED HERE */}
              {data?.data?.data?.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.appointmentId}</TableCell>
                  <TableCell>₹{p.amount}</TableCell>

                  <TableCell>
                    {p.status === "PAID" ? (
                      <span className="text-green-600 font-semibold">
                        {p.status}
                      </span>
                    ) : (
                      <span className="text-red-600 font-semibold">
                        {p.status}
                      </span>
                    )}
                  </TableCell>

                  <TableCell>
                    {new Date(p.createdAt).toLocaleString()}
                  </TableCell>

                  <TableCell>
                    <Button
                      variant="destructive"
                      size="sm"
                      onClick={() => deleteMutation.mutate(p.id)}
                    >
                      Delete
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>

          {/* Pagination */}
          <div className="mt-4 flex justify-center gap-2">
            <Button
              disabled={page === 1}
              onClick={() => setPage((prev) => prev - 1)}
            >
              Previous
            </Button>

            {/* ✅ FIXED HERE */}
            <span className="flex items-center px-2">
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
        <p>No payments found.</p>
      )}
    </div>
  );
}