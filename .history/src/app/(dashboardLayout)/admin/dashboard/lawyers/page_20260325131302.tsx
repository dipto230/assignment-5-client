"use client";

import { useState } from "react";
import { useLawyers } from "@/hooks/useLawyers";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

export default function Page() {
  const router = useRouter();

  const [page, setPage] = useState(1);
  const [sortOrder, setSortOrder] = useState<"asc" | "desc">("asc");

  const { data, isLoading } = useLawyers({
    page,
    limit: 5,
    sortBy: "experience",
    sortOrder,
  });

  const lawyers = data?.data?.data || [];
  const meta = data?.data?.meta;

  if (isLoading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-8 bg-white min-h-screen">
      
      {/* HEADER */}
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-2xl font-semibold">Lawyers</h1>

        <button
          onClick={() =>
            setSortOrder(sortOrder === "asc" ? "desc" : "asc")
          }
          className="border px-4 py-2 rounded-md text-sm hover:bg-gray-100"
        >
          Sort: {sortOrder.toUpperCase()}
        </button>
      </div>

      {/* TABLE */}
      <div className="border rounded-lg overflow-hidden">
        <table className="w-full text-sm">
          <thead className="bg-gray-50 text-left">
            <tr>
              <th className="p-3">Name</th>
              <th className="p-3">Email</th>
              <th className="p-3">Fee</th>
              <th className="p-3">Experience</th>
              <th className="p-3 text-right">Actions</th> {/* 🔥 ADD */}
            </tr>
          </thead>

          <tbody>
            {lawyers.map((lawyer: any) => (
              <tr
                key={lawyer.id}
                className="border-t hover:bg-gray-50 transition"
              >
                <td className="p-3">{lawyer.name}</td>
                <td className="p-3">{lawyer.user?.email}</td>
                <td className="p-3">{lawyer.consultationFee}</td>
                <td className="p-3">{lawyer.experience} yrs</td>

                {/* 🔥 ACTION BUTTONS */}
                <td className="p-3 text-right space-x-3">
                  <button
                    onClick={() =>
                      router.push(`/dashboard/lawyers/${lawyer.id}/edit`)
                    }
                    className="text-blue-600 hover:underline"
                  >
                    Edit
                  </button>

                  <button
                    onClick={async () => {
                      const confirmDelete = confirm("Delete this lawyer?");
                      if (!confirmDelete) return;

                      await apiClient.delete(`/api/v1/lawyers/${lawyer.id}`);
                      window.location.reload();
                    }}
                    className="text-red-500 hover:underline"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* PAGINATION */}
      <div className="flex justify-between items-center mt-6">
        <button
          disabled={page === 1}
          onClick={() => setPage((p) => p - 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Prev
        </button>

        <p className="text-sm">
          Page {meta?.page} of {meta?.totalPage}
        </p>

        <button
          disabled={page === meta?.totalPage}
          onClick={() => setPage((p) => p + 1)}
          className="px-4 py-2 border rounded disabled:opacity-40"
        >
          Next
        </button>
      </div>
    </div>
  );
}