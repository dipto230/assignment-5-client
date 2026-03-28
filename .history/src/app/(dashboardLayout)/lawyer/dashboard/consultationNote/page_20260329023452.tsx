"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";

interface ConsultationNote {
  id: string;
  appointmentId: string;
  notes: string;
  followUpDate?: string;
  client: { id: string; name: string };
  lawyer: { id: string; name: string };
}

export default function ConsultationNotesPage() {
  const { user, loading } = useAuth();
  const queryClient = useQueryClient();

  const [newNote, setNewNote] = useState({ appointmentId: "", notes: "", followUpDate: "" });
  const [editNoteId, setEditNoteId] = useState<string | null>(null);
  const [editNoteData, setEditNoteData] = useState({ notes: "", followUpDate: "" });

  // ✅ Fetch my consultation notes
  const { data: notes = [], isLoading, isError, refetch } = useQuery<ConsultationNote[]>({
    queryKey: ["myConsultationNotes", user?.id],
    enabled: !!user?.id,
    queryFn: async () => {
      const res = await apiClient.get("/consultation-notes/my-notes");
      return res.data.data;
    },
  });

  // ✅ Create note
  const createMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.post("/consultation-notes", newNote);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myConsultationNotes", user?.id] });
      setNewNote({ appointmentId: "", notes: "", followUpDate: "" });
    },
  });

  // ✅ Update note
  const updateMutation = useMutation({
    mutationFn: async () => {
      const res = await apiClient.patch(`/consultation-notes/${editNoteId}`, editNoteData);
      return res.data.data;
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["myConsultationNotes", user?.id] });
      setEditNoteId(null);
    },
  });

  // ✅ Delete note
  const deleteMutation = useMutation({
    mutationFn: async (id: string) => {
      const res = await apiClient.delete(`/consultation-notes/${id}`);
      return res.data;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myConsultationNotes", user?.id] }),
  });

  if (loading) return <div className="p-6 text-gray-500">Loading user...</div>;
  if (!user) return <div className="p-6 text-red-500">No User ❌</div>;
  if (isLoading) return <div className="p-6 text-gray-500">Loading consultation notes...</div>;
  if (isError) return <div className="p-6 text-red-500">Error loading consultation notes</div>;

  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <h1 className="text-2xl font-semibold mb-6">My Consultation Notes</h1>

      {/* CREATE NOTE */}
      <div className="mb-6 p-4 bg-white shadow rounded">
        <h2 className="font-medium mb-2">Add New Note</h2>
        <input
          type="text"
          placeholder="Appointment ID"
          className="border rounded px-3 py-2 w-full mb-2"
          value={newNote.appointmentId}
          onChange={(e) => setNewNote({ ...newNote, appointmentId: e.target.value })}
        />
        <textarea
          placeholder="Notes"
          className="border rounded px-3 py-2 w-full mb-2"
          value={newNote.notes}
          onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
        />
        <input
          type="datetime-local"
          placeholder="Follow-up date"
          className="border rounded px-3 py-2 w-full mb-2"
          value={newNote.followUpDate}
          onChange={(e) => setNewNote({ ...newNote, followUpDate: e.target.value })}
        />
        <button
          onClick={() => createMutation.mutate()}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Add Note
        </button>
      </div>

      {/* LIST NOTES */}
      <div>
        <h2 className="text-lg font-medium mb-2">Existing Notes</h2>
        <div className="grid sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-4">
          {notes.map((note) => (
            <div key={note.id} className="border p-4 rounded-lg bg-white shadow-sm hover:shadow-md transition">
              {editNoteId === note.id ? (
                <div>
                  <textarea
                    className="border rounded px-2 py-1 w-full mb-2"
                    value={editNoteData.notes}
                    onChange={(e) => setEditNoteData({ ...editNoteData, notes: e.target.value })}
                  />
                  <input
                    type="datetime-local"
                    className="border rounded px-2 py-1 w-full mb-2"
                    value={editNoteData.followUpDate}
                    onChange={(e) => setEditNoteData({ ...editNoteData, followUpDate: e.target.value })}
                  />
                  <div className="flex gap-2">
                    <button
                      onClick={() => updateMutation.mutate()}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setEditNoteId(null)}
                      className="px-3 py-1 bg-gray-400 text-white rounded hover:bg-gray-500"
                    >
                      Cancel
                    </button>
                  </div>
                </div>
              ) : (
                <div>
                  <p><span className="text-gray-400">Appointment ID:</span> {note.appointmentId}</p>
                  <p><span className="text-gray-400">Notes:</span> {note.notes}</p>
                  {note.followUpDate && <p><span className="text-gray-400">Follow-up:</span> {new Date(note.followUpDate).toLocaleString()}</p>}
                  <p><span className="text-gray-400">Client:</span> {note.client.name}</p>
                  <p><span className="text-gray-400">Lawyer:</span> {note.lawyer.name}</p>
                  <div className="flex gap-2 mt-2">
                    <button
                      onClick={() => {
                        setEditNoteId(note.id);
                        setEditNoteData({
                          notes: note.notes,
                          followUpDate: note.followUpDate ? new Date(note.followUpDate).toISOString().slice(0,16) : "",
                        });
                      }}
                      className="px-3 py-1 bg-yellow-500 text-white rounded hover:bg-yellow-600"
                    >
                      Edit
                    </button>
                    <button
                      onClick={() => deleteMutation.mutate(note.id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      Delete
                    </button>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}