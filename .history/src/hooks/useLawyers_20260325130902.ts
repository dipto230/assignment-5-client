"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";

interface Params {
  page?: number;
  limit?: number;
  sortBy?: string;
  sortOrder?: "asc" | "desc";
}

export const useLawyers = (params: Params) => {
  return useQuery({
    queryKey: ["lawyers", params],
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/lawyers", {
        params,
      });
      return res.data;
    },
  });
};