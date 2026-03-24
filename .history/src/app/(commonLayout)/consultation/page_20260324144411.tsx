"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function ConsultationPage() {
  const [lawyers, setLawyers] = useState([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/lawyers")
      .then((res) => res.json())
      .then((data) => setLawyers(data?.data?.data || []));
  }, []);

  return (
    <div className="max-w-7xl mx-auto px-4 py-10">
      <h1 className="text-3xl font-bold mb-8">All Lawyers</h1>

      <div className="grid md:grid-cols-4 gap-6">
        {lawyers.map((lawyer: any) => (
          <Link
            key={lawyer.id}
            href={`/consultation/lawyer/${lawyer.id}`}
            className="border p-4 rounded-xl"
          >
            <img
              src={lawyer.profilePhoto}
              className="h-40 w-full object-cover rounded"
            />

            <h2 className="mt-2 font-semibold">{lawyer.name}</h2>
            <p className="text-sm">{lawyer.designation}</p>
          </Link>
        ))}
      </div>
    </div>
  );
}