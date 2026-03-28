/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";

const LawyerHighlight = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("https://assignment-5-backend-sepia.vercel.app/api/v1/lawyers", {
          credentials: "include", // 🔥 IMPORTANT
        });

        const result = await res.json();

        console.log("LAWYERS:", result);

        setData(result?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLawyers();
  }, []);

  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-100">
      
      {/* Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-4xl font-bold">Top Lawyers</h2>

        <Link href="/consultation" className="text-blue-600">
          View All →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {data.slice(0, 4).map((lawyer: any) => (
          <Link
            key={lawyer.id}
            href={`/consultation/lawyer/${lawyer.id}`}
            className="group bg-white rounded-xl shadow-md overflow-hidden"
          >
            <img
              src={
                lawyer.profilePhoto ||
                "https://via.placeholder.com/300"
              }
              className="h-40 w-full object-cover"
            />

            <div className="p-4">
              <h3 className="font-semibold">{lawyer.name}</h3>
              <p className="text-sm text-gray-500">
                {lawyer.designation}
              </p>
              <p className="text-blue-600 text-sm">
                ৳ {lawyer.consultationFee}
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
};

export default LawyerHighlight;