"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient"; // axios instance
import {
  Table,
  TableHeader,
  TableBody,
  TableHead,
  TableRow,
  TableCell,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";

// Fetch payments function
const fetchPayments = async (page = 1, limit = 10) => {
  const res = await apiClient.get(`/api/v1/payments?page=${page}&limit=${limit}`);
  return res.data;
};

export default function AdminPayments() {
  const [page, setPage] = useState(1);
  const limit = 10;

  const { data, isLoading } = useQuery({
    queryKey: ["payments", page],
    queryFn: () => fetchPayments(page, limit),
    keepPreviousData: true,
  });

  if (isLoading) return <div className="p-8">Loading payments...</div>;

  return (
    <div className="p-8 max-w-6xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Admin Payments</h1>

      {data?.data?.length > 0 ? (
        <>
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Payment ID</TableHead>
                <TableHead>Appointment ID</TableHead>
                <TableHead>Client</TableHead>
                <TableHead>Lawyer</TableHead>
                <TableHead>Amount</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Transaction ID</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {data.data.map((p: any) => (
                <TableRow key={p.id}>
                  <TableCell>{p.id}</TableCell>
                  <TableCell>{p.appointment.id}</TableCell>
                  <TableCell>{p.appointment.client?.name || "-"}</TableCell>
                  <TableCell>{p.appointment.lawyer?.name || "-"}</TableCell>
                  <TableCell>₹{p.amount}</TableCell>
                  <TableCell>{p.status}</TableCell>
                  <TableCell>{p.transactionId}</TableCell>
                  <TableCell>
                    {new Date(p.createdAt).toLocaleString()}
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
            <span className="flex items-center px-2">
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
        <p>No payments found.</p>
      )}
    </div>
  );
}