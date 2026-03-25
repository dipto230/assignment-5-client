"use client";

import { useState, ChangeEvent } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import Image from "next/image";
import { practiceService } from "@/services/practice.service";

export default function PracticeAdminPage() {
  const queryClient = useQueryClient();

  // Form state
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [newIcon, setNewIcon] = useState<File | null>(null);

  // Fetch all practice areas
  const { data, isLoading } = useQuery({
    queryKey: ["practiceAreas"],
    queryFn: practiceService.getAll,
  });

  // Create mutation
  const createMutation = useMutation({
    mutationFn: () =>
      practiceService.create({
        title: newTitle,
        description: newDescription,
        icon: newIcon || undefined,
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["practiceAreas"] });
      setNewTitle("");
      setNewDescription("");
      setNewIcon(null);
    },
  });

  // Delete mutation
  const deleteMutation = useMutation({
    mutationFn: (id: string) => practiceService.delete(id),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["practiceAreas"] }),
  });

  // Handle file change
  const handleFileChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setNewIcon(e.target.files[0]);
    }
  };

  if (isLoading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-4xl mx-auto">
      <h1 className="text-3xl font-bold mb-6">Practice Areas Admin</h1>

      {/* Create Form */}
      <div className="mb-6 border p-4 rounded bg-gray-50">
        <h2 className="font-semibold mb-2">Add New Practice Area</h2>
        <div className="flex flex-col gap-2">
          <input
            type="text"
            placeholder="Title"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            className="border p-2 rounded"
          />
          <input
            type="text"
            placeholder="Description (optional)"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            className="border p-2 rounded"
          />
          <input type="file" onChange={handleFileChange} className="border p-2 rounded" />
          <button
            onClick={() => createMutation.mutate()}
            className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
          >
            Create
          </button>
        </div>
      </div>

      {/* List of Practice Areas */}
      <div className="grid grid-cols-1 gap-4">
        {data?.data.map((area: any) => (
          <div
            key={area.id}
            className="flex items-center justify-between border p-4 rounded"
          >
            <div className="flex items-center gap-4">
              {area.icon && (
                <Image
                  src={area.icon}
                  alt={area.title}
                  width={40}
                  height={40}
                  className="rounded"
                />
              )}
              <div>
                <h2 className="font-semibold">{area.title}</h2>
                {area.description && <p className="text-sm text-gray-600">{area.description}</p>}
              </div>
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