"use client";

import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
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
  const { user, setUser } = useAuth(); // 🔥 IMPORTANT
  const [loading, setLoading] = useState(false);

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

  // 🔥 Prefill user data
  useEffect(() => {
    if (user) {
      form.reset({
        name: user.name || "",
        contactNumber: user.contactNumber || "",
        address: user.address || "",
        occupation: user.occupation || "",
        companyName: user.companyName || "",
        dateOfBirth: user.dateOfBirth || "",
      });
    }
  }, [user, form]);

  const onSubmit = async (data: FormValues) => {
    setLoading(true);

    try {
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

      const res = await fetch(
        "https://assignment-5-backend-nine.vercel.app/api/v1/clients/update-my-profile",
        {
          method: "PATCH",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        }
      );

      console.log("🔥 STATUS:", res.status);

      const result = await res.json();
      console.log("🔥 RESPONSE:", result);

      if (!res.ok) {
        alert(result.message || "Update failed ❌");
        return;
      }

      // 🔥 UPDATE UI INSTANTLY
      if (result?.data) {
        setUser(result.data);
      }

      alert("✅ Profile updated successfully");
    } catch (error) {
      console.error("❌ ERROR:", error);
      alert("Something went wrong");
    } finally {
      setLoading(false);
    }
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

            <Button type="submit" className="w-full" disabled={loading}>
              {loading ? "Updating..." : "Update Profile"}
            </Button>
          </form>
        </div>

      </div>
    </div>
  );
}