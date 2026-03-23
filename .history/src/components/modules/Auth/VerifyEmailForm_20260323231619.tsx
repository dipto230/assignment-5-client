"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { httpClient } from "@/lib/axios/httpClient";

const VerifyEmailForm = ({ email }: { email?: string }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();

  const handleVerify = async () => {
    setError(null);

    // ✅ basic validation
    if (!otp) {
      setError("OTP is required");
      return;
    }

    if (!email) {
      setError("Email is missing");
      return;
    }

    try {
      setIsLoading(true);

      // ✅ USE httpClient (important)
      const res = await httpClient.post("/auth/verify-email", {
        email,
        otp,
      });

      if (!res.success) {
        setError(res.message || "Verification failed");
        return;
      }

      // ✅ success
      router.push("/login");
    } catch (err: any) {
      console.error(err);
      setError(err?.response?.data?.message || err.message);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 space-y-4">
      <h2 className="text-xl font-semibold text-center">Verify Email</h2>

      <p className="text-sm text-center text-gray-500">
        OTP sent to: {email}
      </p>

      <Input
        placeholder="Enter OTP"
        value={otp}
        onChange={(e) => setOtp(e.target.value)}
      />

      {error && (
        <Alert variant="destructive">
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleVerify}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
};

export default VerifyEmailForm;
