"use client";

import { useLawyers } from "@/hooks/useLawyers";
import DataTable from "@/components/shared/DataTable";

export default function Page() {
  const { data, isLoading } = useLawyers();

  if (isLoading) return <p>Loading...</p>;

  const columns = ["name", "email", "consultationFee", "experience"];

  return (
    <div>
      <h1 className="text-xl font-bold mb-4">Lawyers</h1>
      <DataTable columns={columns} data={data?.data || []} />
    </div>
  );
}