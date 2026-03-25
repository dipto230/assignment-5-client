

export const practiceService = {
  getAll: () => apiClient.get("/practice-area"),
  create: (data: any) => apiClient.post("/practice-area", data),
  delete: (id: string) => apiClient.delete(`/practice-area/${id}`),
};