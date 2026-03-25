import { apiClient } from "@/lib/apiClient";

export const scheduleService = {
  getAll: (page = 1, limit = 10) => apiClient.get(`/api/v1/schedules?page=${page}&limit=${limit}`),
  create: (payload: any) => apiClient.post(`/api/v1/schedules`, payload),
  update: (id: string, payload: any) => apiClient.patch(`/api/v1/schedules/${id}`, payload),
  delete: (id: string) => apiClient.delete(`/api/v1/schedules/${id}`),
};