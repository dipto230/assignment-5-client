"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/providers/AuthProvider"; // adjust path

type FormValues = {
  name: string;
  contactNumber: string;
  address: string;
  occupation: string;
  companyName: string;
  dateOfBirth: string;
};

export default function MyProfilePage() {
  const { user } = useAuth();
  const { register, handleSubmit } = useForm<FormValues>();

  const onSubmit = async (data: FormValues) => {
    const payload = {
      clientInfo: {
        name: data.name,
        contactNumber: data.contactNumber,
        address: data.address,
      },
      clientProfile: {
        occupation: data.occupation,
        companyName: data.companyName,
        dateOfBirth: data.dateOfBirth,
      },
    };

    console.log("🔥 FINAL PAYLOAD:", payload);

    await fetch("http://localhost:5000/api/v1/clients/update-my-profile", {
      method: "PATCH",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });
  };

  return (
    <div className="max-w-3xl mx-auto p-6 space-y-8">
      
      {/* 🔥 PROFILE CARD */}
      <div className="bg-white rounded-xl shadow p-6">
        <h2 className="text-2xl font-bold mb-4">My Profile</h2>

        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Phone:</strong> {user?.contactNumber || "N/A"}</p>
        <p><strong>Address:</strong> {user?.address || "N/A"}</p>
      </div>

      {/* 🔥 UPDATE FORM */}
      <div className="bg-white rounded-xl shadow p-6">
        <h3 className="text-xl font-semibold mb-4">Update Profile</h3>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
          
          <input
            placeholder="Name"
            defaultValue={user?.name}
            {...register("name")}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Phone"
            defaultValue={user?.contactNumber}
            {...register("contactNumber")}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Address"
            defaultValue={user?.address}
            {...register("address")}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Occupation"
            {...register("occupation")}
            className="w-full border p-2 rounded"
          />

          <input
            placeholder="Company"
            {...register("companyName")}
            className="w-full border p-2 rounded"
          />

          <input
            type="date"
            {...register("dateOfBirth")}
            className="w-full border p-2 rounded"
          />

          <button className="w-full bg-blue-600 text-white py-2 rounded">
            Update Profile
          </button>
        </form>
      </div>

    </div>
  );
}