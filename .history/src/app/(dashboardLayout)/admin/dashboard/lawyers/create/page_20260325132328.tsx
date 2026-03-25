"use client";

import { useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

export default function CreateLawyer() {
  const router = useRouter();

  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    contactNumber: "",
    address: "",
    barRegistrationNumber: "",
    experience: "",
    gender: "MALE",
    consultationFee: "",
    qualification: "",
    currentFirm: "",
    designation: "",
    practiceAreas: [] as string[],
  });

  const [availablePracticeAreas, setAvailablePracticeAreas] = useState([
    // You can fetch these from backend too
    { id: "uuid-1", title: "Corporate Law" },
    { id: "uuid-2", title: "Criminal Law" },
    { id: "uuid-3", title: "Family Law" },
  ]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePracticeAreaChange = (id: string) => {
    const alreadySelected = form.practiceAreas.includes(id);
    if (alreadySelected) {
      setForm({
        ...form,
        practiceAreas: form.practiceAreas.filter((area) => area !== id),
      });
    } else {
      setForm({ ...form, practiceAreas: [...form.practiceAreas, id] });
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      await apiClient.post("/api/v1/lawyers/create-lawyer", {
        password: form.password,
        lawyer: {
          name: form.name,
          email: form.email,
          profilePhoto: "", // optional
          contactNumber: form.contactNumber,
          address: form.address,
          barRegistrationNumber: form.barRegistrationNumber,
          experience: Number(form.experience),
          gender: form.gender,
          consultationFee: Number(form.consultationFee),
          qualification: form.qualification,
          currentFirm: form.currentFirm,
          designation: form.designation,
        },
        practiceAreas: form.practiceAreas,
      });

      router.push("/admin/dashboard/lawyers");
    } catch (error: any) {
      console.error("Error creating lawyer:", error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  return (
    <div className="p-8 bg-white min-h-screen">
      <h1 className="text-2xl font-semibold mb-6">Create Lawyer</h1>

      <form onSubmit={handleSubmit} className="max-w-lg space-y-4">
        <input
          name="name"
          placeholder="Name"
          value={form.name}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="email"
          placeholder="Email"
          type="email"
          value={form.email}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="contactNumber"
          placeholder="Contact Number"
          value={form.contactNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="address"
          placeholder="Address"
          value={form.address}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <input
          name="barRegistrationNumber"
          placeholder="Bar Registration Number"
          value={form.barRegistrationNumber}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="experience"
          placeholder="Experience (years)"
          type="number"
          value={form.experience}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        />

        <select
          name="gender"
          value={form.gender}
          onChange={handleChange}
          className="w-full border p-2 rounded"
        >
          <option value="MALE">Male</option>
          <option value="FEMALE">Female</option>
        </select>

        <input
          name="consultationFee"
          placeholder="Consultation Fee"
          type="number"
          value={form.consultationFee}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="qualification"
          placeholder="Qualification"
          value={form.qualification}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="currentFirm"
          placeholder="Current Firm"
          value={form.currentFirm}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <input
          name="designation"
          placeholder="Designation"
          value={form.designation}
          onChange={handleChange}
          className="w-full border p-2 rounded"
          required
        />

        <div>
          <label className="block mb-1 font-semibold">Practice Areas:</label>
          {availablePracticeAreas.map((area) => (
            <label key={area.id} className="block">
              <input
                type="checkbox"
                checked={form.practiceAreas.includes(area.id)}
                onChange={() => handlePracticeAreaChange(area.id)}
                className="mr-2"
              />
              {area.title}
            </label>
          ))}
        </div>

        <button className="bg-black text-white px-4 py-2 rounded">
          Create
        </button>
      </form>
    </div>
  );
}