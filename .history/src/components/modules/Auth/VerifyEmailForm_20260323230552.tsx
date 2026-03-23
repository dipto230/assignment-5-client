"use client";

/* eslint-disable @typescript-eslint/no-explicit-any */

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Alert, AlertDescription } from "@/components/ui/alert";

const VerifyEmailForm = ({ email }: { email?: string }) => {
  const [otp, setOtp] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

    const handleVerify = async () => {
      console.log(process.env.NEXT_PUBLIC_API_BASE_URL);

    setError(null);

    try {
      const res = await fetch(
        `${process.env.NEXT_PUBLIC_API_BASE_URL}/auth/verify-email`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            email,
            otp,
          }),
        }
      );

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Verification failed");
        return;
      }

      // ✅ success হলে login page
      router.push("/login");
    } catch (err: any) {
      setError(err.message);
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

      <Button onClick={handleVerify} className="w-full">
        Verify
      </Button>
    </div>
  );
};

export default VerifyEmailForm;
