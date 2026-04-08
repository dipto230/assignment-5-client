import { apiClient } from "@/lib/apiClient";

export const refreshTokenClient = async () => {
  try {
    await apiClient.post("/auth/refresh-token");
    return true;
  } catch {
    return false;
  }
};