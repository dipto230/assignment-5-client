"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-white">
      <div className="w-full max-w-md text-center px-6">
        
        {/* ✅ Success Icon */}
        <div className="flex justify-center mb-6">
          <div className="w-14 h-14 flex items-center justify-center rounded-full bg-black text-white text-xl">
            ✓
          </div>
        </div>

        {/* ✅ Title */}
        <h1 className="text-xl font-semibold text-black mb-2">
          Payment successful
        </h1>

        {/* ✅ Subtitle */}
        <p className="text-sm text-gray-500 mb-8">
          Your appointment has been confirmed.
        </p>

        {/* ✅ Button */}
        <button
          onClick={() => router.push("/dashboard")}
          className="w-full py-2.5 rounded-full bg-black text-white text-sm font-medium transition hover:opacity-80"
        >
          Go to dashboard
        </button>

        {/* ✅ subtle note */}
        <p className="text-[11px] text-gray-400 mt-4">
          Redirecting automatically...
        </p>
      </div>
    </div>
  );
}