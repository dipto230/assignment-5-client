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

  // 🔥 email fallback system
  const emailFromQuery = searchParams.get("email");
  const finalEmail = email || emailFromQuery;

  const handleVerify = async () => {
    setError(null);
    setSuccess(null);

    // ✅ validation
    if (!otp.trim()) {
      setError("OTP is required");
      return;
    }

    if (otp.length < 4) {
      setError("Invalid OTP");
      return;
    }

    if (!finalEmail) {
      setError("Email is missing");
      return;
    }

    try {
      setIsLoading(true);

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`,
        {
          email: finalEmail,
          otp,
        },
        {
          withCredentials: true,
        }
      );

      const data = res.data;

      if (!data.success) {
        setError(data.message || "Verification failed");
        return;
      }

      // ✅ success
      setSuccess("Email verified successfully 🎉");

      setTimeout(() => {
        router.push("/login");
      }, 1500);
    } catch (err: any) {
      console.error(err);
      setError(
        err?.response?.data?.message ||
          err.message ||
          "Something went wrong"
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="max-w-md mx-auto mt-16 p-6 border rounded-xl shadow-sm space-y-4">
      <h2 className="text-2xl font-semibold text-center">
        Verify Your Email
      </h2>

      <p className="text-sm text-center text-gray-500">
        OTP sent to{" "}
        <span className="font-medium">{finalEmail || "your email"}</span>
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

      {success && (
        <Alert>
          <AlertDescription>{success}</AlertDescription>
        </Alert>
      )}

      <Button
        onClick={handleVerify}
        className="w-full"
        disabled={isLoading}
      >
        {isLoading ? "Verifying..." : "Verify Email"}
      </Button>
    </div>
  );
};

export default VerifyEmailForm;