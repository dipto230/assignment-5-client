"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

export default function EditLawyerPage() {
  const { id } = useParams();
  const router = useRouter();

  const [loading, setLoading] = useState(true);

  const [form, setForm] = useState({
    name: "",
    contactNumber: "",
    experience: "",
    consultationFee: "",
    currentFirm: "",
    designation: "",
  });

  // 🔥 FETCH LAWYER DATA
  useEffect(() => {
    const fetchLawyer = async () => {
      try {
        const res = await apiClient.get(`/api/v1/lawyers/${id}`);
        const data = res.data.data;

        setForm({
          name: data.name || "",
          contactNumber: data.contactNumber || "",
          experience: data.experience || "",
          consultationFee: data.consultationFee || "",
          currentFirm: data.currentFirm || "",
          designation: data.designation || "",
        });
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    if (id) fetchLawyer();
  }, [id]);

  // 🔥 UPDATE HANDLER
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    try {
      await apiClient.patch(`/api/v1/lawyers/${id}`, {
        lawyer: {
          name: form.name,
          contactNumber: form.contactNumber,
          experience: Number(form.experience),
          consultationFee: Number(form.consultationFee),
          currentFirm: form.currentFirm,
          designation: form.designation,
        },
      });

      router.push("/dashboard/lawyers");
    } catch (err) {
      console.error(err);
    }
  };

  if (loading) return <div className="p-6">Loading...</div>;

  return (
    <div className="min-h-screen bg-white p-8">
      {/* HEADER */}
      <div className="mb-8 border-b pb-4">
        <h1 className="text-2xl font-semibold">Edit Lawyer</h1>
        <p className="text-sm text-gray-500">
          Update lawyer information
        </p>
      </div>

      {/* FORM */}
      <form
        onSubmit={handleSubmit}
        className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-3xl"
      >
        <input
          value={form.name}
          onChange={(e) =>
            setForm({ ...form, name: e.target.value })
          }
          placeholder="Name"
          className="border p-3 rounded-md"
        />

        <input
          value={form.contactNumber}
          onChange={(e) =>
            setForm({ ...form, contactNumber: e.target.value })
          }
          placeholder="Contact Number"
          className="border p-3 rounded-md"
        />

        <input
          value={form.experience}
          onChange={(e) =>
            setForm({ ...form, experience: e.target.value })
          }
          placeholder="Experience (years)"
          className="border p-3 rounded-md"
        />

        <input
          value={form.consultationFee}
          onChange={(e) =>
            setForm({
              ...form,
              consultationFee: e.target.value,
            })
          }
          placeholder="Consultation Fee"
          className="border p-3 rounded-md"
        />

        <input
          value={form.currentFirm}
          onChange={(e) =>
            setForm({ ...form, currentFirm: e.target.value })
          }
          placeholder="Current Firm"
          className="border p-3 rounded-md"
        />

        <input
          value={form.designation}
          onChange={(e) =>
            setForm({ ...form, designation: e.target.value })
          }
          placeholder="Designation"
          className="border p-3 rounded-md"
        />

        {/* ACTIONS */}
        <div className="col-span-2 flex gap-4 mt-4">
          <button
            type="submit"
            className="bg-black text-white px-6 py-2 rounded-md"
          >
            Update
          </button>

          <button
            type="button"
            onClick={() => router.push("/dashboard/lawyers")}
            className="border px-6 py-2 rounded-md"
          >
            Cancel
          </button>
        </div>
      </form>
    </div>
  );
}