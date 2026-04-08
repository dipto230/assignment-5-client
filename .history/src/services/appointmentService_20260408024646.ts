import { apiClient } from "@/lib/apiClient";

export const appointmentService = {
  getAll: (page = 1, limit = 10) =>
    apiClient.get(`/appointments?page=${page}&limit=${limit}`),
  changeStatus: (id: string, status: string) =>
    apiClient.patch(`/appointments/change-status/${id}`, { status }),
};