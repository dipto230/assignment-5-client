"use client";

import { useForm } from "react-hook-form";
import { useAuth } from "@/providers/AuthProvider";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

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

  const form = useForm<FormValues>({
    defaultValues: {
      name: user?.name || "",
      contactNumber: user?.contactNumber || "",
      address: user?.address || "",
      occupation: "",
      companyName: "",
      dateOfBirth: "",
    },
  });

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
      <div className="bg-white rounded-2xl shadow p-6 space-y-2">
        <h2 className="text-2xl font-bold mb-2">My Profile</h2>

        <p><strong>Name:</strong> {user?.name}</p>
        <p><strong>Email:</strong> {user?.email}</p>
        <p><strong>Role:</strong> {user?.role}</p>
        <p><strong>Phone:</strong> {user?.contactNumber || "N/A"}</p>
        <p><strong>Address:</strong> {user?.address || "N/A"}</p>
      </div>

      {/* 🔥 SHADCN FORM */}
      <div className="bg-white rounded-2xl shadow p-6">
        <h3 className="text-xl font-semibold mb-6">Update Profile</h3>

        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

          {/* Name */}
          <div className="space-y-2">
            <Label>Name</Label>
            <Input {...form.register("name")} />
          </div>

          {/* Phone */}
          <div className="space-y-2">
            <Label>Contact Number</Label>
            <Input {...form.register("contactNumber")} />
          </div>

          {/* Address */}
          <div className="space-y-2">
            <Label>Address</Label>
            <Input {...form.register("address")} />
          </div>

          {/* Occupation */}
          <div className="space-y-2">
            <Label>Occupation</Label>
            <Input {...form.register("occupation")} />
          </div>

          {/* Company */}
          <div className="space-y-2">
            <Label>Company Name</Label>
            <Input {...form.register("companyName")} />
          </div>

          {/* DOB */}
          <div className="space-y-2">
            <Label>Date of Birth</Label>
            <Input type="date" {...form.register("dateOfBirth")} />
          </div>

          <Button type="submit" className="w-full">
            Update Profile
          </Button>
        </form>
      </div>
    </div>
  );
}