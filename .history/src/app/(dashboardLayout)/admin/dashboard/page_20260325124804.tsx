"use client";

import { useQuery } from "@tanstack/react-query";
import { apiClient } from "@/lib/apiClient";
import { useAuth } from "@/providers/AuthProvider";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function Page() {
  const { user, loading } = useAuth();
  const containerRef = useRef<HTMLDivElement>(null);

  const { data, isLoading: queryLoading } = useQuery({
    queryKey: ["stats", user?.id],
    enabled: !!user,
    queryFn: async () => {
      const res = await apiClient.get("/api/v1/stats");
      return res.data;
    },
  });

  const stats = data?.data;

  // 🔥 GSAP animation
  useEffect(() => {
    if (!containerRef.current) return;

    const tl = gsap.timeline();

    tl.from(".fade-up", {
      y: 40,
      opacity: 0,
      duration: 0.8,
      stagger: 0.15,
      ease: "power3.out",
    });

    tl.from(
      ".card",
      {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: "power2.out",
      },
      "-=0.4"
    );
  }, [stats]);

  if (loading)
    return <div className="p-6 text-gray-500">Auth Loading...</div>;
  if (!user)
    return <div className="p-6 text-red-500">No User ❌</div>;
  if (queryLoading)
    return <div className="p-6 text-gray-500">Stats Loading...</div>;

  return (
    <div
      ref={containerRef}
      className="min-h-screen bg-gradient-to-br from-white via-gray-50 to-gray-100 text-gray-900 px-8 py-10"
    >
      {/* HEADER */}
      <div className="mb-12 border-b border-gray-200 pb-6 fade-up">
        <h1 className="text-4xl font-semibold tracking-tight">
          Admin Dashboard
        </h1>
        <p className="text-gray-500 mt-2 text-sm">
          Welcome back, {user.name}
        </p>
      </div>

      {/* STATS */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Total Lawyers", value: stats?.totalLawyers },
          { label: "Total Clients", value: stats?.totalClients },
          { label: "Appointments", value: stats?.totalAppointments },
          { label: "Consultation Notes", value: stats?.totalConsultationNotes },
        ].map((item, i) => (
          <div
            key={i}
            className="card bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-lg hover:-translate-y-1 transition-all duration-300"
          >
            <p className="text-gray-500 text-sm mb-2">{item.label}</p>
            <h2 className="text-3xl font-bold text-gray-900">
              {item.value ?? 0}
            </h2>
          </div>
        ))}
      </div>

      {/* LOWER SECTION */}
      <div className="mt-14 grid md:grid-cols-2 gap-6">
        {/* ADMIN INFO */}
        <div className="card bg-white border border-gray-200 rounded-xl p-6 shadow-sm fade-up">
          <h2 className="text-xl font-semibold mb-4">
            Admin Info
          </h2>

          <div className="space-y-2 text-gray-600 text-sm">
            <p>
              <span className="text-gray-400">Name:</span> {user.name}
            </p>
            <p>
              <span className="text-gray-400">Email:</span> {user.email}
            </p>
            <p>
              <span className="text-gray-400">Role:</span> {user.role}
            </p>
          </div>
        </div>

        {/* DYNAMIC OVERVIEW */}
        <div className="card bg-white border border-gray-200 rounded-xl p-6 shadow-sm fade-up">
          <h2 className="text-xl font-semibold mb-4">
            System Overview
          </h2>

          <div className="space-y-3 text-sm text-gray-600">
            <p>📌 {stats?.totalLawyers} lawyers registered</p>
            <p>👥 {stats?.totalClients} active clients</p>
            <p>📅 {stats?.totalAppointments} appointments scheduled</p>
            <p>📝 {stats?.totalConsultationNotes} consultation notes created</p>
          </div>
        </div>
      </div>
    </div>
  );
}