import { useQuery } from "@tanstack/react-query";
import { adminService } from "@/services/admin.service";

export const useAdmins = () => {
  return useQuery({
    queryKey: ["admins"],
    queryFn: async () => {
      const res = await adminService.getAll();
      return res.data;
    },
  });
};