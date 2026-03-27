"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient"; // <- use your axios instance

interface Review {
  id: string;
  appointmentId: string;
  rating: number;
  comment: string;
  lawyer: { id: string; user: { name: string } };
  client: { id: string; user: { name: string } };
}

interface NewReview {
  appointmentId: string;
  rating: number;
  comment: string;
}

export default function ReviewsPage() {
  const queryClient = useQueryClient();
  const [newReview, setNewReview] = useState<NewReview>({
    appointmentId: "",
    rating: 1,
    comment: "",
  });
  const [editReviewId, setEditReviewId] = useState<string | null>(null);

  // --- Queries ---
  const { data: reviews = [], isLoading } = useQuery<Review[]>({
    queryKey: ["myReviews"],
    queryFn: async () => {
      const { data } = await apiClient.get("/api/v1/reviews/my-reviews");
      return data.data;
    },
  });

  // --- Mutations ---
  const createReviewMutation = useMutation({
    mutationFn: (payload: NewReview) => apiClient.post("/api/v1/reviews", payload),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myReviews"] }),
  });

  const updateReviewMutation = useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<NewReview> }) =>
      apiClient.patch(`/api/v1/reviews/${id}`, data),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myReviews"] }),
  });

  const deleteReviewMutation = useMutation({
    mutationFn: (id: string) => apiClient.delete(`/api/v1/reviews/${id}`),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["myReviews"] }),
  });

  // --- Handlers ---
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (editReviewId) {
      updateReviewMutation.mutate({ id: editReviewId, data: newReview });
      setEditReviewId(null);
    } else {
      createReviewMutation.mutate(newReview);
    }
    setNewReview({ appointmentId: "", rating: 1, comment: "" });
  };

  const handleEdit = (review: Review) => {
    setEditReviewId(review.id);
    setNewReview({
      appointmentId: review.appointmentId,
      rating: review.rating,
      comment: review.comment,
    });
  };

  const handleDelete = (id: string) => deleteReviewMutation.mutate(id);

  if (isLoading) return <div>Loading reviews...</div>;

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">My Reviews</h1>

      {/* Review Form */}
      <form onSubmit={handleSubmit} className="mb-6 flex gap-2 flex-wrap">
        <input
          type="text"
          placeholder="Appointment ID"
          value={newReview.appointmentId}
          onChange={(e) =>
            setNewReview({ ...newReview, appointmentId: e.target.value })
          }
          className="border p-2"
          required
        />
        <input
          type="number"
          min={1}
          max={5}
          value={newReview.rating}
          onChange={(e) =>
            setNewReview({ ...newReview, rating: +e.target.value })
          }
          className="border p-2 w-20"
          required
        />
        <input
          type="text"
          placeholder="Comment"
          value={newReview.comment}
          onChange={(e) =>
            setNewReview({ ...newReview, comment: e.target.value })
          }
          className="border p-2 flex-1"
          required
        />
        <button
          type="submit"
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          {editReviewId ? "Update Review" : "Create Review"}
        </button>
      </form>

      {/* Reviews Table */}
      <table className="w-full border">
        <thead>
          <tr className="bg-gray-100">
            <th className="border p-2">Appointment ID</th>
            <th className="border p-2">Rating</th>
            <th className="border p-2">Comment</th>
            <th className="border p-2">Actions</th>
          </tr>
        </thead>
        <tbody>
          {reviews.map((review: Review) => (
            <tr key={review.id}>
              <td className="border p-2">{review.appointmentId}</td>
              <td className="border p-2">{review.rating}</td>
              <td className="border p-2">{review.comment}</td>
              <td className="border p-2 flex gap-2">
                <button
                  className="bg-yellow-400 text-white px-2 py-1 rounded"
                  onClick={() => handleEdit(review)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-2 py-1 rounded"
                  onClick={() => handleDelete(review.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}