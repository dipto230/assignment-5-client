"use client";

import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface Review {
  id: string;
  appointmentId: string;
  rating: number;
  comment: string;
  client?: any;
  lawyer?: any;
  appointment?: any;
}

// Fetch current user's reviews
const fetchMyReviews = async (): Promise<Review[]> => {
  const { data } = await axios.get("http://localhost:5000/api/v1/reviews/my-reviews", {
    withCredentials: true, // send cookies if your auth uses them
  });
  return data.data;
};

export default function ReviewsPage() {
  const queryClient = useQueryClient();

  const { data: reviews, isLoading } = useQuery(["myReviews"], fetchMyReviews);

  const [newReview, setNewReview] = useState({ appointmentId: "", rating: 1, comment: "" });
  const [editReviewId, setEditReviewId] = useState<string | null>(null);
  const [editReview, setEditReview] = useState({ rating: 1, comment: "" });

  // Create review
  const createMutation = useMutation(
    (payload: typeof newReview) =>
      axios.post("http://localhost:5000/api/v1/reviews", payload, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myReviews"]);
        setNewReview({ appointmentId: "", rating: 1, comment: "" });
      },
    }
  );

  // Update review
  const updateMutation = useMutation(
    (payload: { id: string; data: typeof editReview }) =>
      axios.patch(`http://localhost:5000/api/v1/reviews/${payload.id}`, payload.data, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myReviews"]);
        setEditReviewId(null);
      },
    }
  );

  // Delete review
  const deleteMutation = useMutation(
    (id: string) => axios.delete(`http://localhost:5000/api/v1/reviews/${id}`, { withCredentials: true }),
    {
      onSuccess: () => {
        queryClient.invalidateQueries(["myReviews"]);
      },
    }
  );

  if (isLoading) return <p>Loading reviews...</p>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">My Reviews</h1>

      {/* Create Review Form */}
      <div className="mb-6 p-4 border rounded">
        <h2 className="font-semibold mb-2">Add New Review</h2>
        <input
          type="text"
          placeholder="Appointment ID"
          value={newReview.appointmentId}
          onChange={(e) => setNewReview({ ...newReview, appointmentId: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <input
          type="number"
          placeholder="Rating 1-5"
          min={1}
          max={5}
          value={newReview.rating}
          onChange={(e) => setNewReview({ ...newReview, rating: Number(e.target.value) })}
          className="border p-2 w-full mb-2"
        />
        <textarea
          placeholder="Comment"
          value={newReview.comment}
          onChange={(e) => setNewReview({ ...newReview, comment: e.target.value })}
          className="border p-2 w-full mb-2"
        />
        <button
          onClick={() => createMutation.mutate(newReview)}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Add Review
        </button>
      </div>

      {/* Reviews List */}
      <div>
        {reviews?.map((review) => (
          <div key={review.id} className="border p-4 mb-4 rounded">
            {editReviewId === review.id ? (
              <>
                <input
                  type="number"
                  min={1}
                  max={5}
                  value={editReview.rating}
                  onChange={(e) => setEditReview({ ...editReview, rating: Number(e.target.value) })}
                  className="border p-2 mb-2 w-full"
                />
                <textarea
                  value={editReview.comment}
                  onChange={(e) => setEditReview({ ...editReview, comment: e.target.value })}
                  className="border p-2 mb-2 w-full"
                />
                <button
                  onClick={() =>
                    updateMutation.mutate({ id: review.id, data: editReview })
                  }
                  className="bg-green-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Save
                </button>
                <button
                  onClick={() => setEditReviewId(null)}
                  className="bg-gray-300 px-4 py-2 rounded"
                >
                  Cancel
                </button>
              </>
            ) : (
              <>
                <p>
                  <strong>Appointment:</strong> {review.appointmentId}
                </p>
                <p>
                  <strong>Rating:</strong> {review.rating}
                </p>
                <p>
                  <strong>Comment:</strong> {review.comment}
                </p>
                <button
                  onClick={() => {
                    setEditReviewId(review.id);
                    setEditReview({ rating: review.rating, comment: review.comment });
                  }}
                  className="bg-yellow-500 text-white px-4 py-2 mr-2 rounded"
                >
                  Edit
                </button>
                <button
                  onClick={() => deleteMutation.mutate(review.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded"
                >
                  Delete
                </button>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}