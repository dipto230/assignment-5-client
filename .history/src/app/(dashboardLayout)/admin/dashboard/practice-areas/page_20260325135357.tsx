"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { practiceService } from "@/services/practice.service";

export default function PracticeAdminPage() {
  const queryClient = useQueryClient();
  const [newTitle, setNewTitle] = useState("");

  // Fetch all practice areas
  const { data, isLoading } = useQuery({
    queryKey: ["practiceAreas"],
    queryFn: practiceService.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: () => practiceService.create({ title: newTitle }),
    onSuccess: () => {
      queryClient.invalidateQueries(["practiceAreas"]);
      setNewTitle("");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => practiceService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(["practiceAreas"]),
  });

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Practice Areas Admin</h1>

      {/* Create */}
      <div className="mb-6 flex gap-2">
        <input
          type="text"
          placeholder="New Practice Area Title"
          value={newTitle}
          onChange={(e) => setNewTitle(e.target.value)}
          className="border p-2 rounded flex-1"
        />
        <button
          onClick={() => createMutation.mutate()}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Create
        </button>
      </div>

      {/* List */}
      <div className="grid grid-cols-1 gap-4">
        {data?.data.map((area: any) => (
          <div
            key={area.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div>
              <h2 className="font-semibold">{area.title}</h2>
              {area.icon && (
                <img src={area.icon} alt={area.title} className="h-10 w-10 mt-1" />
              )}
            </div>
            <button
              onClick={() => deleteMutation.mutate(area.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}