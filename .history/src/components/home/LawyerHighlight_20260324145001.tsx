"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

export default function LawyerHighlight() {
  const [lawyers, setLawyers] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/lawyers")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA:", data); // 🔥 check this

        setLawyers(data?.data?.data || []);
      });
  }, []);

  const topLawyers = lawyers.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      <div className="flex justify-between mb-6">
        <h2 className="text-3xl font-bold">Top Lawyers</h2>
        <Link href="/consultation">View All</Link>
      </div>

      <div className="grid md:grid-cols-4 gap-6">
        {topLawyers.map((lawyer) => (
          <Link
            key={lawyer.id}
            href={`/consultation/lawyer/${lawyer.id}`}
            className="border p-4 rounded-xl"
          >
            <img
              src={
                lawyer.profilePhoto ||
                "https://via.placeholder.com/300"
              }
              className="h-40 w-full object-cover rounded"
            />

            <h3 className="mt-2 font-semibold">
              {lawyer.name}
            </h3>

            <p className="text-sm">{lawyer.designation}</p>

            <p className="text-sm text-blue-600">
              ৳ {lawyer.consultationFee}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}