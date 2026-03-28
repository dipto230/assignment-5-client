import { apiClient } from "@/lib/apiClient";

export const scheduleService = {
  getAll: (page = 1, limit = 10) => apiClient.get(`/schedules?page=${page}&limit=${limit}`),
  create: (payload: any) => apiClient.post(`/schedules`, payload),
  update: (id: string, payload: any) => apiClient.patch(`/schedules/${id}`, payload),
  delete: (id: string) => apiClient.delete(`/schedules/${id}`),
};