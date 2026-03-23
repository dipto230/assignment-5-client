"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VerifyEmailForm = ({ email }: { email?: string }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const router = useRouter();
  const searchParams = useSearchParams();

  const finalEmail = email || searchParams.get("email");

  const handleVerify = async () => {
    setError(null);
    setSuccess(null);

    if (!otp || otp.length < 4) {
      setError("Invalid OTP");
      return;
    }

    if (!finalEmail) {
      setError("Email missing");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`,
        { email: finalEmail, otp },
        { withCredentials: true }
      );

      if (!res.data.success) {
        setError(res.data.message);
        return;
      }

      setSuccess("Email verified successfully 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      setError(
        err?.response?.data?.message || err.message || "Error occurred"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-xl space-y-4">
      <h2 className="text-xl font-semibold text-center">
        Verify Email
      </h2>

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

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Button onClick={handleVerify} disabled={isLoading} className="w-full">
        {isLoading ? "Verifying..." : "Verify"}
      </Button>
    </div>
  );
};

export default VerifyEmailForm;