import { useQuery } from "@tanstack/react-query";
import { lawyerService } from "@/services/lawyer.service";

export const useLawyers = () => {
  return useQuery({
    queryKey: ["lawyers"],
    queryFn: async () => {
      const res = await lawyerService.getAll();
      return res.data;
    },
  });
};