"use client";

import { useEffect, useState } from "react";
import { apiClient } from "@/lib/apiClient";
import { useRouter } from "next/navigation";

interface PracticeArea {
  id: string;
  title: string;
  icon?: string | null;
}

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
    notes: "", // extra field on right side
    availability: "", // extra field on right side
  });

  const [practiceAreas, setPracticeAreas] = useState<PracticeArea[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPracticeAreas = async () => {
      try {
        const res = await apiClient.get("/api/v1/practiceArea");
        setPracticeAreas(res.data.data);
      } catch (error) {
        console.error("Error fetching practice areas", error);
      } finally {
        setLoading(false);
      }
    };
    fetchPracticeAreas();
  }, []);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handlePracticeAreaChange = (id: string) => {
    const alreadySelected = form.practiceAreas.includes(id);
    setForm({
      ...form,
      practiceAreas: alreadySelected
        ? form.practiceAreas.filter((area) => area !== id)
        : [...form.practiceAreas, id],
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await apiClient.post("/api/v1/lawyers/create-lawyer", {
        password: form.password,
        lawyer: {
          name: form.name,
          email: form.email,
          profilePhoto: "",
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
      console.error(error);
      alert(error.response?.data?.message || "Something went wrong");
    }
  };

  if (loading) return <div className="p-8">Loading Practice Areas...</div>;

  return (
    <div className="min-h-screen flex bg-gray-100">
      {/* Left Form Section */}
      <div className="w-2/3 p-8 bg-white">
        <h1 className="text-3xl font-bold mb-6">Create Lawyer</h1>
        <form onSubmit={handleSubmit} className="space-y-4 max-w-lg">
          {/* Basic fields */}
          <input name="name" placeholder="Name" value={form.name} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="email" type="email" placeholder="Email" value={form.email} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="password" type="password" placeholder="Password" value={form.password} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="contactNumber" placeholder="Contact Number" value={form.contactNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="address" placeholder="Address" value={form.address} onChange={handleChange} className="w-full border p-2 rounded" />
          <input name="barRegistrationNumber" placeholder="Bar Registration Number" value={form.barRegistrationNumber} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="experience" type="number" placeholder="Experience (years)" value={form.experience} onChange={handleChange} className="w-full border p-2 rounded" />
          <select name="gender" value={form.gender} onChange={handleChange} className="w-full border p-2 rounded">
            <option value="MALE">Male</option>
            <option value="FEMALE">Female</option>
          </select>
          <input name="consultationFee" type="number" placeholder="Consultation Fee" value={form.consultationFee} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="qualification" placeholder="Qualification" value={form.qualification} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="currentFirm" placeholder="Current Firm" value={form.currentFirm} onChange={handleChange} className="w-full border p-2 rounded" required />
          <input name="designation" placeholder="Designation" value={form.designation} onChange={handleChange} className="w-full border p-2 rounded" required />

          {/* Practice Areas */}
          <div>
            <h2 className="font-semibold mb-2">Practice Areas</h2>
            <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto border p-2 rounded">
              {practiceAreas.map((area) => (
                <label key={area.id} className="flex items-center space-x-2">
                  <input type="checkbox" checked={form.practiceAreas.includes(area.id)} onChange={() => handlePracticeAreaChange(area.id)} />
                  <span>{area.title}</span>
                </label>
              ))}
            </div>
          </div>

          <button className="bg-primary text-white px-4 py-2 rounded mt-4">Create</button>
        </form>
      </div>

      {/* Right Additional Info Section */}
      <div className="w-1/3 p-8 bg-gray-50">
        <h2 className="text-2xl font-bold mb-4">Additional Info</h2>
        <div className="space-y-4">
          <textarea
            name="notes"
            placeholder="Notes or special instructions"
            value={form.notes}
            onChange={handleChange}
            className="w-full border p-2 rounded h-32"
          />
          <input
            name="availability"
            placeholder="Availability (e.g., Mon-Fri 9am-5pm)"
            value={form.availability}
            onChange={handleChange}
            className="w-full border p-2 rounded"
          />
        </div>
      </div>
    </div>
  );
}