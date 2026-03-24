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
    if (!selected) return alert("Select a schedule");

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

  const initial = lawyer.name?.charAt(0).toUpperCase();

  return (
    <div className="max-w-6xl mx-auto py-10 px-4 grid md:grid-cols-3 gap-8">

      {/* LEFT SIDE */}
      <div className="bg-white shadow-xl rounded-2xl p-6 flex flex-col items-center text-center">

        {/* Avatar */}
        {lawyer.profilePhoto ? (
          <img
            src={lawyer.profilePhoto}
            className="w-32 h-32 rounded-full object-cover border"
          />
        ) : (
          <div className="w-32 h-32 flex items-center justify-center rounded-full bg-blue-600 text-white text-4xl font-bold">
            {initial}
          </div>
        )}

        {/* Name */}
        <h2 className="mt-4 text-xl font-bold">{lawyer.name}</h2>
        <p className="text-gray-500">{lawyer.designation}</p>

        <p className="text-sm text-gray-500 mt-2">
          📍 {lawyer.address}
        </p>

        <p className="mt-3 font-semibold text-blue-600">
          💰 {lawyer.consultationFee} BDT
        </p>

        {/* BUTTON */}
        <button
          onClick={handleBook}
          className="mt-6 w-full bg-blue-600 text-white py-2 rounded-xl font-semibold hover:bg-blue-700 transition"
        >
          Book & Pay
        </button>
      </div>

      {/* RIGHT SIDE */}
      <div className="md:col-span-2 space-y-6">

        {/* DETAILS */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-semibold text-lg mb-4">Details</h3>

          <div className="grid grid-cols-2 gap-4 text-sm">
            <p><span className="text-gray-500">Experience:</span> {lawyer.experience} years</p>
            <p><span className="text-gray-500">Gender:</span> {lawyer.gender}</p>
            <p><span className="text-gray-500">Qualification:</span> {lawyer.qualification}</p>
            <p><span className="text-gray-500">Firm:</span> {lawyer.currentFirm}</p>
            <p><span className="text-gray-500">Bar Reg:</span> {lawyer.barRegistrationNumber}</p>
            <p><span className="text-gray-500">Email:</span> {lawyer.email}</p>
          </div>
        </div>

        {/* PRACTICE AREAS */}
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-semibold mb-3">Practice Areas</h3>

          <div className="flex flex-wrap gap-2">
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
        <div className="bg-white shadow rounded-xl p-6">
          <h3 className="font-semibold mb-3">Select Schedule</h3>

          <div className="flex flex-wrap gap-3">
            {schedules.length === 0 && (
              <p className="text-gray-500">No schedule available</p>
            )}

            {schedules.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.id)}
                className={`px-4 py-2 rounded-lg border ${
                  selected === s.id
                    ? "bg-blue-600 text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {new Date(s.startTime).toLocaleString()}
              </button>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
}