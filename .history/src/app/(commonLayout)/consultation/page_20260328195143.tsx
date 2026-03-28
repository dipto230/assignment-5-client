/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { useSearchParams, useRouter } from "next/navigation";

export default function ConsultationPage() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const [lawyers, setLawyers] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);
  const [totalPages, setTotalPages] = useState(1);
  const [practice, setPractice] = useState("");

  const page = Number(searchParams.get("page")) || 1;
  const limit = 8;

  // ✅ FETCH DATA (fixed)
  useEffect(() => {
    let isMounted = true;

    const fetchLawyers = async () => {
      setLoading(true);

      try {
        const res = await fetch(
          `https://assignment-5-backend-sepia.vercel.app/api/v1/lawyers?page=${page}&limit=${limit}&practice=${practice}`
        );

        const data = await res.json();

        if (isMounted) {
          setLawyers(data?.data?.data || []);
          setTotalPages(data?.data?.meta?.totalPages || 1);
        }
      } catch (error) {
        console.error("Failed to fetch lawyers:", error);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchLawyers();

    return () => {
      isMounted = false;
    };
  }, [page, practice]);


  const changePage = (newPage: number) => {
    router.push(`?page=${newPage}`);
  };

  return (
    <div className="max-w-7xl mx-auto px-6 mt-24">
      {/* HEADER */}
      <div className="mb-6 flex justify-between items-center">
        <div>
          <h1 className="text-3xl font-semibold">Find a Lawyer</h1>
          <p className="text-gray-500 text-sm mt-1">
            Browse experienced professionals
          </p>
        </div>

        {/* FILTER */}
        <select
          value={practice}
          onChange={(e) => {
            setPractice(e.target.value);
            router.push("?page=1");
          }}
          className="border px-3 py-2 rounded"
        >
          <option value="">All Practice</option>
          <option value="Cyber Law">Cyber Law</option>
          <option value="Banking Law">Banking Law</option>
          <option value="Constitutional Law">Constitutional Law</option>
          <option value="International Law">International Law</option>
        </select>
      </div>

      {/* LOADING */}
      {loading ? (
        <div className="text-center mt-20 text-gray-400">
          Loading lawyers...
        </div>
      ) : (
        <>
          {/* GRID */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
            {lawyers.map((lawyer) => {
              const initial = lawyer.name?.charAt(0).toUpperCase();

              return (
                <Link
                  key={lawyer.id}
                  href={`/consultation/lawyer/${lawyer.id}`}
                  className="group"
                >
                  <div className="space-y-3">
                    {/* IMAGE */}
                    <div className="w-full h-44 bg-gray-100 flex items-center justify-center overflow-hidden">
                      {lawyer.profilePhoto ? (
                        <Image
                           src={lawyer.profilePhoto?.trim()}
                          alt={lawyer.name}
                          width={400}
                          height={300}
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

                      <div className="flex justify-between pt-2 text-sm">
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

          {/* PAGINATION */}
          <div className="flex justify-center items-center gap-2 mt-12">
            {/* PREV */}
            <button
              onClick={() => changePage(page - 1)}
              disabled={page === 1}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Prev
            </button>

            {/* PAGE NUMBERS */}
            {[...Array(totalPages)].map((_, i) => (
              <button
                key={i}
                onClick={() => changePage(i + 1)}
                className={`px-4 py-2 border rounded ${
                  page === i + 1 ? "bg-black text-white" : ""
                }`}
              >
                {i + 1}
              </button>
            ))}

            {/* NEXT */}
            <button
              onClick={() => changePage(page + 1)}
              disabled={page === totalPages}
              className="px-4 py-2 border rounded disabled:opacity-40"
            >
              Next
            </button>
          </div>

          {/* EMPTY */}
          {lawyers.length === 0 && (
            <p className="text-center text-gray-400 mt-20">
              No lawyers found
            </p>
          )}
        </>
      )}
    </div>
  );
}