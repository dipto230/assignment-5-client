import { useQuery } from "@tanstack/react-query";
import { lawyerService } from "@/services/lawyer.service";

export const useLawyers = (params?: any) => {
  return useQuery({
    queryKey: ["lawyers", params],
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/lawyer", {
        params,
      });
      return res.data;
    },
  });
};