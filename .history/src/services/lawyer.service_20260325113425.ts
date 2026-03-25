import { apiClient } from "@/lib/apiClient";


export const lawyerService = {
  getAll: (query?: string) => apiClient.get(`/lawyer${query || ""}`),
  getById: (id: string) => apiClient.get(`/lawyer/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/lawyer/${id}`, data),
  delete: (id: string) => apiClient.delete(`/lawyer/${id}`),
};