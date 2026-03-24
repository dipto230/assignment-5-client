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
    <div className="max-w-7xl mx-auto px-6 mt-24">
      {/* HEADER */}
      <div className="mb-10">
        <h1 className="text-3xl font-semibold">Find a Lawyer</h1>
        <p className="text-gray-500 text-sm mt-1">
          Browse experienced professionals and book consultation instantly
        </p>
      </div>

      {/* GRID */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
        {lawyers.map((lawyer: any) => {
          const initial = lawyer.name?.charAt(0).toUpperCase();

          return (
            <Link
              key={lawyer.id}
              href={`/consultation/lawyer/${lawyer.id}`}
              className="group"
            >
              <div className="space-y-3">
                
                {/* IMAGE / AVATAR */}
                <div className="w-full h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                  {lawyer.profilePhoto ? (
                    <img
                      src={lawyer.profilePhoto}
                      className="w-full h-full object-cover group-hover:scale-105 transition"
                    />
                  ) : (
                    <div className="text-3xl font-semibold text-gray-600">
                      {initial}
                    </div>
                  )}
                </div>

                {/* INFO */}
                <div className="space-y-1">
                  <h2 className="font-medium text-lg group-hover:underline">
                    {lawyer.name}
                  </h2>

                  <p className="text-sm text-gray-500">
                    {lawyer.designation}
                  </p>

                  <p className="text-xs text-gray-400">
                    {lawyer.currentFirm}
                  </p>

                  <div className="flex justify-between items-center pt-2 text-sm">
                    <span className="text-gray-500">
                      {lawyer.experience} yrs exp
                    </span>

                    <span className="font-medium">
                      ৳ {lawyer.consultationFee}
                    </span>
                  </div>
                </div>

              </div>
            </Link>
          );
        })}
      </div>

      {/* EMPTY STATE */}
      {lawyers.length === 0 && (
        <p className="text-center text-gray-400 mt-20">
          No lawyers found
        </p>
      )}
    </div>
  );
}