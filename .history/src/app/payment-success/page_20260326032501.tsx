"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function PaymentSuccess() {
  const router = useRouter();

  useEffect(() => {
    // auto redirect after 3 sec
    setTimeout(() => {
      router.push("/dashboard");
    }, 3000);
  }, [router]);

  return (
    <div className="flex items-center justify-center h-screen bg-gray-50">
      <div className="bg-white p-10 rounded-2xl shadow-lg text-center">
        <h1 className="text-2xl font-semibold text-green-600 mb-4">
          Payment Successful ✅
        </h1>

        <p className="text-gray-500 mb-6">
          Redirecting to dashboard...
        </p>

        <button
          onClick={() => router.push("/dashboard")}
          className="px-6 py-2 bg-black text-white rounded-full"
        >
          Go to Dashboard
        </button>
      </div>
    </div>
  );
}