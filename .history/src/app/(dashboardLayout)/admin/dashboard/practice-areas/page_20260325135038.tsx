"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { practiceService } from "@/services/practice.service";

interface PracticeArea {
  id: string;
  title: string;
  description?: string;
}

export default function PracticeAdmin() {
  const queryClient = useQueryClient();
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  // Fetch all practice areas
  const { data, isLoading, error } = useQuery({
    queryKey: ["practiceAreas"],
    queryFn: practiceService.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: (newData: { title: string; description?: string }) =>
      practiceService.create(newData),
    onSuccess: () => {
      queryClient.invalidateQueries(["practiceAreas"]); // refresh list
      setTitle("");
      setDescription("");
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => practiceService.delete(id),
    onSuccess: () => queryClient.invalidateQueries(["practiceAreas"]),
  });

  const handleCreate = (e: React.FormEvent) => {
    e.preventDefault();
    if (!title.trim()) return alert("Title is required");
    createMutation.mutate({ title, description });
  };

  const handleDelete = (id: string) => {
    if (!confirm("Are you sure you want to delete this practice area?")) return;
    deleteMutation.mutate(id);
  };

  if (isLoading) return <div className="p-4">Loading Practice Areas...</div>;
  if (error) return <div className="p-4 text-red-500">Error loading practice areas</div>;

  return (
    <div className="p-8 max-w-2xl mx-auto">
      <h1 className="text-2xl font-bold mb-4">Manage Practice Areas</h1>

      {/* Create Form */}
      <form onSubmit={handleCreate} className="mb-6 space-y-2">
        <input
          type="text"
          placeholder="Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="w-full border p-2 rounded"
          required
        />
        <input
          type="text"
          placeholder="Description (optional)"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="w-full border p-2 rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          {createMutation.isLoading ? "Creating..." : "Create"}
        </button>
      </form>

      {/* List */}
      <h2 className="text-xl font-semibold mb-2">Existing Practice Areas</h2>
      <ul className="space-y-2">
        {data?.data?.map((area: PracticeArea) => (
          <li
            key={area.id}
            className="flex justify-between items-center border p-2 rounded"
          >
            <div>
              <span className="font-medium">{area.title}</span>
              {area.description && (
                <p className="text-gray-600 text-sm">{area.description}</p>
              )}
            </div>
            <button
              onClick={() => handleDelete(area.id)}
              className="bg-red-600 text-white px-3 py-1 rounded"
            >
              Delete
            </button>
          </li>
        ))}
      </ul>

      <p className="mt-4 text-gray-500">
        Total: {data?.data?.length || 0} practice areas
      </p>
    </div>
  );
}