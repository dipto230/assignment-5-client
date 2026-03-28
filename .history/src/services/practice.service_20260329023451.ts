// services/practice.service.ts
import { apiClient } from "@/lib/apiClient";

export const practiceService = {
  // GET all practice areas
  getAll: () => apiClient.get("/practiceArea"),

  // CREATE new practice area
  create: (data: { title: string; description?: string; icon?: File }) => {
    // If sending file (icon), use FormData
    const formData = new FormData();
    formData.append("title", data.title);
    if (data.description) formData.append("description", data.description);
    if (data.icon) formData.append("file", data.icon);

    return apiClient.post("/practiceArea", formData, {
      headers: { "Content-Type": "multipart/form-data" },
    });
  },

  // DELETE practice area by ID
  delete: (id: string) => apiClient.delete(`/practiceArea/${id}`),
};