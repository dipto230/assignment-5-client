"use client";

import { useAuth } from "@/providers/AuthProvider";

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
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-2">
        Welcome, {user.name}
      </h1>
      <p className="text-gray-500 mb-8">{user.email}</p>

      <div className="grid md:grid-cols-4 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-medium">Appointments</h2>
          <p className="text-3xl text-blue-600">{appointments.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-medium">Cancelled</h2>
          <p className="text-3xl text-red-500">{cancelledCount}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-medium">Documents</h2>
          <p className="text-3xl text-green-600">{documents.length}</p>
        </div>

        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-medium">Role</h2>
          <p className="text-xl">{user.role}</p>
        </div>
      </div>
    </div>
  );
}