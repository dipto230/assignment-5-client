"use client";

import { useAdmins } from "@/hooks/useAdmins";
import DataTable from "@/components/shared/DataTable";

export default function Page() {
  const { data, isLoading } = useAdmins();

  if (isLoading) return <p>Loading...</p>;

  const columns = ["name", "email", "role", "status"];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Admins</h1>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}