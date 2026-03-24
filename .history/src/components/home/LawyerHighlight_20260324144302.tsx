"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

type Lawyer = {
  id: string;
  name: string;
  profilePhoto: string | null;
  experience: number;
  consultationFee: number;
  currentFirm: string;
  designation: string;
};

export default function LawyerHighlight() {
  const [lawyers, setLawyers] = useState<Lawyer[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/v1/lawyers");
        const data = await res.json();
        setLawyers(data?.data?.data || []);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchLawyers();
  }, []);

  if (loading) {
    return <p className="text-center py-10">Loading...</p>;
  }

  const topLawyers = lawyers.slice(0, 4);

  return (
    <div className="max-w-7xl mx-auto px-4 py-12">
      
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-3xl font-bold">Top Lawyers</h2>

        <Link
          href="/consultation"
          className="text-blue-600 hover:underline font-medium"
        >
          View All
        </Link>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {topLawyers.map((lawyer) => (
          <Link
            key={lawyer.id}
            href={`/consultation/lawyer/${lawyer.id}`}
            className="border rounded-xl p-4 shadow hover:shadow-lg transition block"
          >
            <img
              src={
                lawyer.profilePhoto ||
                "https://via.placeholder.com/300x200"
              }
              className="w-full h-40 object-cover rounded-lg mb-3"
            />

            <h3 className="font-semibold">{lawyer.name}</h3>

            <p className="text-sm text-gray-500">
              {lawyer.designation}
            </p>

            <p className="text-sm text-gray-500">
              {lawyer.currentFirm}
            </p>

            <p className="text-sm mt-1">
              {lawyer.experience} yrs experience
            </p>

            <p className="text-blue-600 font-medium mt-2">
              ৳ {lawyer.consultationFee}
            </p>
          </Link>
        ))}
      </div>
    </div>
  );
}