import { apiClient } from "@/lib/apiClient";

export const scheduleService = {
  getAll: (query?: string) => apiClient.get(`/schedule${query || ""}`),
  create: (data: any) => apiClient.post("/schedule", data),
  update: (id: string, data: any) => apiClient.patch(`/schedule/${id}`, data),
  delete: (id: string) => apiClient.delete(`/schedule/${id}`),
};