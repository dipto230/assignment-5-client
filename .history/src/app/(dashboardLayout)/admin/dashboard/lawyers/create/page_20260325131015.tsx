"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function CreateLawyer() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    experience: "",
    consultationFee: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();

    await apiClient.post("/api/v1/lawyers", {
      lawyer: {
        name: form.name,
        contactNumber: form.contactNumber,
        experience: Number(form.experience),
        consultationFee: Number(form.consultationFee),
      },
    });

    router.push("/dashboard/lawyers");
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">
        Create Lawyer
      </h1>

      <form
        onSubmit={handleSubmit}
        className="max-w-md space-y-4"
      >
        <input
          placeholder="Name"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
        />

        <input
          placeholder="Contact"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, contactNumber: e.target.value })
          }
        />

        <input
          placeholder="Experience"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
        />

        <input
          placeholder="Fee"
          className="w-full border p-2 rounded"
          onChange={(e) =>
            setForm({ ...form, consultationFee: e.target.value })
          }
        />

        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}