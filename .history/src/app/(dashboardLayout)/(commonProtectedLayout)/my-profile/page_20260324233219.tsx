"use client";

import { useForm } from "react-hook-form";
import { useEffect } from "react";
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
      name: "",
      contactNumber: "",
      address: "",
      occupation: "",
      companyName: "",
      dateOfBirth: "",
    },
  });

  // 🔥 Prefill fix
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        contactNumber: user.contactNumber || "",
        address: user.address || "",
      });
    }
  }, [user]);

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
    <div className="p-6">
      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">

        {/* 🔥 LEFT: PROFILE INFO */}
        <div className="bg-white rounded-2xl shadow p-6 space-y-3 h-fit">
          <h2 className="text-2xl font-bold mb-4">My Profile</h2>

          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
          <p><strong>Role:</strong> {user?.role}</p>
          <p><strong>Phone:</strong> {user?.contactNumber || "N/A"}</p>
          <p><strong>Address:</strong> {user?.address || "N/A"}</p>
        </div>

        {/* 🔥 RIGHT: FORM */}
        <div className="bg-white rounded-2xl shadow p-6">
          <h3 className="text-xl font-semibold mb-6">Update Profile</h3>

          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-5">

            <div className="space-y-2">
              <Label>Name</Label>
              <Input {...form.register("name")} />
            </div>

            <div className="space-y-2">
              <Label>Contact Number</Label>
              <Input {...form.register("contactNumber")} />
            </div>

            <div className="space-y-2">
              <Label>Address</Label>
              <Input {...form.register("address")} />
            </div>

            <div className="space-y-2">
              <Label>Occupation</Label>
              <Input {...form.register("occupation")} />
            </div>

            <div className="space-y-2">
              <Label>Company Name</Label>
              <Input {...form.register("companyName")} />
            </div>

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
    </div>
  );
}