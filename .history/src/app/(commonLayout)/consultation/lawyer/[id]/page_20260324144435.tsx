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
    const res = await fetch("http://localhost:5000/api/v1/appointments", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ lawyerId: id, scheduleId: selected }),
    });

    const data = await res.json();

    // 🔥 payment
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

  if (!lawyer) return <p>Loading...</p>;

  return (
    <div className="max-w-5xl mx-auto py-10 px-4">
      <h1 className="text-3xl font-bold">{lawyer.name}</h1>
      <p>{lawyer.designation}</p>
      <p>{lawyer.currentFirm}</p>

      <h2 className="mt-6 font-semibold">Select Schedule</h2>

      <div className="flex gap-2 flex-wrap mt-2">
        {schedules.map((s) => (
          <button
            key={s.id}
            onClick={() => setSelected(s.id)}
            className={`px-3 py-1 border rounded ${
              selected === s.id ? "bg-blue-500 text-white" : ""
            }`}
          >
            {s.startTime}
          </button>
        ))}
      </div>

      <button
        onClick={handleBook}
        className="mt-6 bg-blue-600 text-white px-6 py-2 rounded"
      >
        Book & Pay
      </button>
    </div>
  );
}