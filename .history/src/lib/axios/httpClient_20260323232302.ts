import { httpClient } from "@/lib/axios/httpClient";

const handleVerify = async () => {
  setError(null);

  try {
    const res = await httpClient.post("/auth/verify-email", {
      email,
      otp,
    });

    if (!res.success) {
      setError(res.message || "Verification failed");
      return;
    }

    router.push("/login");
  } catch (err: any) {
    setError(err.message);
  }
};
