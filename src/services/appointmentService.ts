import { apiClient } from "@/lib/apiClient";

export const appointmentService = {
  getAll: (page = 1, limit = 10) =>
    apiClient.get(`/api/v1/appointments?page=${page}&limit=${limit}`),
  changeStatus: (id: string, status: string) =>
    apiClient.patch(`/api/v1/appointments/change-status/${id}`, { status }),
};