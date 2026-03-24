"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function LawyerDetails() {
  const { id } = useParams();
  const [lawyer, setLawyer] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);

  useEffect(() => {
    fetch(`http://localhost:5000/api/v1/lawyers/${id}`)
      .then((res) => res.json())
      .then((data) => setLawyer(data.data));

    fetch(`http://localhost:5000/api/v1/lawyer-schedules?lawyerId=${id}`)
      .then((res) => res.json())
      .then((data) => setSchedules(data.data || []));
  }, [id]);

  const handleBook = async () => {
    if (!selected) return alert("Please select a schedule");

    const res = await fetch("http://localhost:5000/api/v1/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lawyerId: id, scheduleId: selected }),
    });

    const data = await res.json();

    await fetch("http://localhost:5000/api/v1/payments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        appointmentId: data.data.id,
        amount: lawyer.consultationFee,
      }),
    });

    alert("Booking + Payment Successful ✅");
  };

  if (!lawyer) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div className="max-w-6xl mx-auto py-10 px-4">
      
      {/* PROFILE CARD */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex gap-6 items-center">
        <img
          src={lawyer.profilePhoto}
          alt="lawyer"
          className="w-32 h-32 rounded-full object-cover border"
        />

        <div>
          <h1 className="text-3xl font-bold">{lawyer.name}</h1>
          <p className="text-gray-500">{lawyer.designation}</p>
          <p className="text-gray-600">{lawyer.currentFirm}</p>

          <p className="mt-2 text-sm text-gray-500">
            📍 {lawyer.address}
          </p>

          <p className="mt-2 font-semibold text-blue-600">
            💰 {lawyer.consultationFee} BDT
          </p>
        </div>
      </div>

      {/* INFO GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Experience</p>
          <p className="font-bold">{lawyer.experience} years</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Qualification</p>
          <p className="font-bold">{lawyer.qualification}</p>
        </div>

        <div className="bg-gray-100 p-4 rounded-xl">
          <p className="text-sm text-gray-500">Bar Registration</p>
          <p className="font-bold">{lawyer.barRegistrationNumber}</p>
        </div>
      </div>

      {/* PRACTICE AREAS */}
      <div className="mt-6">
        <h2 className="font-semibold text-lg mb-2">Practice Areas</h2>
        <div className="flex gap-2 flex-wrap">
          {lawyer.practiceAreas.map((p: any) => (
            <span
              key={p.practiceArea.id}
              className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full text-sm"
            >
              {p.practiceArea.title}
            </span>
          ))}
        </div>
      </div>

      {/* SCHEDULE */}
      <div className="mt-8">
        <h2 className="font-semibold text-lg mb-3">Select Schedule</h2>

        <div className="flex flex-wrap gap-3">
          {schedules.length === 0 && (
            <p className="text-gray-500">No schedules available</p>
          )}

          {schedules.map((s) => (
            <button
              key={s.id}
              onClick={() => setSelected(s.id)}
              className={`px-4 py-2 rounded-xl border transition ${
                selected === s.id
                  ? "bg-blue-600 text-white shadow-lg"
                  : "hover:bg-gray-100"
              }`}
            >
              {new Date(s.startTime).toLocaleString()}
            </button>
          ))}
        </div>
      </div>

      {/* CTA */}
      <div className="mt-8">
        <button
          onClick={handleBook}
          className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white py-3 rounded-xl text-lg font-semibold hover:scale-[1.02] transition"
        >
          Book & Pay 🚀
        </button>
      </div>
    </div>
  );
}