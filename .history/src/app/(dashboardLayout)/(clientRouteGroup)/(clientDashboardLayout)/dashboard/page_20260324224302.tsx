"use client";

import { useAuth } from "@/providers/AuthProvider";

export default function Dashboard() {
  const { user, loading } = useAuth();

  if (loading) return <p className="p-10">Loading...</p>;
  if (!user) return <p className="p-10 text-red-600">No user logged in</p>;

  const appointments = user?.client?.appointments || [];
  const documents = user?.client?.legalDocuments || [];

  return (
    <div className="p-10">
      <h1 className="text-3xl font-semibold mb-8">Dashboard</h1>
      <div className="grid md:grid-cols-3 gap-6">
        <div className="p-6 bg-white shadow rounded-xl">
          <h2 className="text-lg font-medium">Appointments</h2>
          <p className="text-3xl text-blue-600">{appointments.length}</p>
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