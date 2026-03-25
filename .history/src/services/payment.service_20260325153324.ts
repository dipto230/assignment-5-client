// src/services/payment.service.ts
import { apiClient } from "@/lib/apiClient";

export const paymentService = {
  // Fetch all payments with pagination
  getAll: (page = 1, limit = 10) =>
    apiClient.get(`/api/v1/payments?page=${page}&limit=${limit}`),

  // Fetch a single payment by ID
  getById: (id: string) => apiClient.get(`/api/v1/payments/${id}`),

  // Delete a payment by ID
  delete: (id: string) => apiClient.delete(`/api/v1/payments/${id}`),

  // Optional: Create a payment (if needed for admin)
  create: (payload: { appointmentId: string; amount: number }) =>
    apiClient.post(`/api/v1/payments`, payload),
};