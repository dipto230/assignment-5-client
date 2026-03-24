"use client";

import { useAuth } from "@/providers/AuthProvider";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-10">Loading...</p>;
  if (!user) return <p className="p-10 text-red-600">No user logged in</p>;

  const client = user?.client;
  const appointments = client?.appointments ?? [];
  const documents = client?.legalDocuments ?? [];

  const cancelledCount = appointments.filter(
    (a: any) => a.status === "CANCELLED"
  ).length;

  return (
    <div className="p-10 space-y-8">
      {/* HEADER */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold">Welcome, {user.name}</h1>
          <p className="text-gray-500">{user.email}</p>
        </div>
        <div className="text-sm bg-black text-white px-4 py-2 rounded-xl">
          {user.role}
        </div>
      </div>

      {/* STATS */}
      <div className="grid md:grid-cols-4 gap-6">
        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-sm text-gray-500">Appointments</h2>
            <p className="text-3xl font-bold">{appointments.length}</p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-sm text-gray-500">Cancelled</h2>
            <p className="text-3xl font-bold text-red-500">
              {cancelledCount}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-sm text-gray-500">Documents</h2>
            <p className="text-3xl font-bold text-green-600">
              {documents.length}
            </p>
          </CardContent>
        </Card>

        <Card className="shadow-lg rounded-2xl">
          <CardContent className="p-6">
            <h2 className="text-sm text-gray-500">Account Status</h2>
            <p className="text-xl font-semibold">{user.status}</p>
          </CardContent>
        </Card>
      </div>

      {/* APPOINTMENTS TABLE */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Recent Appointments
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>Payment</TableHead>
                <TableHead>Date</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {appointments.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={4} className="text-center">
                    No appointments found
                  </TableCell>
                </TableRow>
              ) : (
                appointments.map((a: any) => (
                  <TableRow key={a.id}>
                    <TableCell className="truncate max-w-[120px]">
                      {a.id}
                    </TableCell>
                    <TableCell
                      className={
                        a.status === "CANCELLED"
                          ? "text-red-500"
                          : "text-green-600"
                      }
                    >
                      {a.status}
                    </TableCell>
                    <TableCell>{a.paymentStatus}</TableCell>
                    <TableCell>
                      {new Date(a.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>

      {/* DOCUMENT TABLE */}
      <Card className="shadow-xl rounded-2xl">
        <CardContent className="p-6">
          <h2 className="text-xl font-semibold mb-4">
            Legal Documents
          </h2>

          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>ID</TableHead>
                <TableHead>Created At</TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {documents.length === 0 ? (
                <TableRow>
                  <TableCell colSpan={2} className="text-center">
                    No documents available
                  </TableCell>
                </TableRow>
              ) : (
                documents.map((doc: any) => (
                  <TableRow key={doc.id}>
                    <TableCell>{doc.id}</TableCell>
                    <TableCell>
                      {new Date(doc.createdAt).toLocaleString()}
                    </TableCell>
                  </TableRow>
                ))
              )}
            </TableBody>
          </Table>
        </CardContent>
      </Card>
    </div>
  );
}
