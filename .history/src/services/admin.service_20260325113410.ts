

export const adminService = {
  getAll: () => apiClient.get("/admin"),
  getById: (id: string) => apiClient.get(`/admin/${id}`),
  update: (id: string, data: any) => apiClient.patch(`/admin/${id}`, data),
  delete: (id: string) => apiClient.delete(`/admin/${id}`),
};