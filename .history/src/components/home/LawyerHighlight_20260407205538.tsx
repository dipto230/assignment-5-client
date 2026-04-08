/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { apiClient } from "@/lib/apiClient";

const LawyerHighlight = () => {
  const router = useRouter();
  const [data, setData] = useState<any[]>([]);
  const [selectedLawyer, setSelectedLawyer] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selectedSchedule, setSelectedSchedule] = useState<string | null>(null);
  const [loadingSchedules, setLoadingSchedules] = useState(false);
  const [bookingLoading, setBookingLoading] = useState(false);

  useEffect(() => {
    const fetchLawyers = async () => {
      try {
        const res = await fetch("https://assignment-5-backend-sepia.vercel.app/api/v1/lawyers", {
          credentials: "include",
        });

        const result = await res.json();
        setData(result?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLawyers();
  }, []);

  const handleBookNow = async (lawyer: any) => {
    setSelectedLawyer(lawyer);
    setLoadingSchedules(true);
    setSelectedSchedule(null);

    try {
      const res = await apiClient.get(`/lawyer-schedules?lawyerId=${lawyer.id}`);
      setSchedules(res.data?.data || []);
    } catch (error: any) {
      alert("Failed to load schedules");
    } finally {
      setLoadingSchedules(false);
    }
  };

  const handleConfirmBooking = async () => {
    if (!selectedSchedule) {
      alert("Please select a schedule");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await apiClient.post("/appointments/book-appointment", {
        lawyerId: selectedLawyer.id,
        scheduleId: selectedSchedule,
      });

      const paymentUrl = res.data?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl;
      } else {
        alert("Appointment booked successfully! ✅");
        setSelectedLawyer(null);
        setSelectedSchedule(null);
        setSchedules([]);
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || "Booking failed";
      alert("Error: " + errorMsg);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#f8f6f2] to-white">
      
      {/* Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 mb-12">
        <div>
          <h2 className="text-4xl md:text-5xl font-serif text-gray-800">
            Top Lawyers
          </h2>

          {/* 🔥 strong premium line */}
          <div className="w-24 h-[3px] bg-[#c8a97e] mt-3 rounded-full shadow-[0_0_10px_rgba(200,169,126,0.6)]" />
        </div>

        <Link
          href="/consultation"
          className="text-[#c8a97e] tracking-wide hover:underline"
        >
          View All →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-8 max-w-7xl mx-auto px-4">
        {data.slice(0, 4).map((lawyer: any) => (
          <div
            key={lawyer.id}
            className="group rounded-2xl overflow-hidden backdrop-blur-xl bg-white/60 border border-white/40 shadow-[0_10px_30px_rgba(0,0,0,0.08)] hover:shadow-[0_20px_50px_rgba(0,0,0,0.12)] transition duration-500 hover:-translate-y-2"
          >
            {/* Image */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={
                  lawyer.profilePhoto ||
                  "https://via.placeholder.com/300"
                }
                alt={lawyer.name}
                className="w-full h-full object-cover group-hover:scale-105 transition duration-700"
              />

              {/* subtle overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/10 to-transparent" />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="font-semibold text-lg text-gray-800">
                {lawyer.name}
              </h3>

              <p className="text-sm text-gray-500 mb-2">
                {lawyer.designation}
              </p>

              <p className="text-[#c8a97e] text-sm font-semibold mb-4">
                ৳ {lawyer.consultationFee}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <Link
                  href={`/consultation/lawyer/${lawyer.id}`}
                  className="flex-1 px-3 py-2 rounded-lg bg-white/70 border border-gray-200 text-gray-700 hover:bg-gray-100 transition text-center text-sm font-medium"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleBookNow(lawyer)}
                  className="flex-1 px-3 py-2 rounded-lg bg-[#c8a97e] text-white hover:opacity-90 transition text-sm font-medium shadow-md"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 🔥 Modal untouched */}
      {selectedLawyer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold">Select Schedule</h3>
              <button
                onClick={() => {
                  setSelectedLawyer(null);
                  setSelectedSchedule(null);
                  setSchedules([]);
                }}
                className="text-gray-500 hover:text-gray-700 text-2xl"
              >
                ✕
              </button>
            </div>

            <div className="mb-6 pb-4 border-b">
              <h4 className="font-semibold text-lg">{selectedLawyer.name}</h4>
              <p className="text-sm text-gray-600">{selectedLawyer.designation}</p>
              <p className="text-[#c8a97e] font-medium">
                ৳ {selectedLawyer.consultationFee}
              </p>
            </div>

            {loadingSchedules ? (
              <div className="py-8 text-center text-gray-500">
                Loading schedules...
              </div>
            ) : schedules.length === 0 ? (
              <div className="py-8 text-center text-gray-500">
                No schedules available
              </div>
            ) : (
              <>
                <div className="space-y-2 mb-6">
                  <label className="block text-sm font-medium mb-2">
                    Available Times
                  </label>
                  <div className="max-h-64 overflow-y-auto space-y-2">
                    {schedules.map((schedule) => (
                      <button
                        key={schedule.id}
                        onClick={() => setSelectedSchedule(schedule.scheduleId)}
                        className={`w-full p-3 rounded border-2 transition text-left ${
                          selectedSchedule === schedule.scheduleId
                            ? "border-[#c8a97e] bg-[#f8f6f2]"
                            : "border-gray-300 hover:border-gray-400"
                        }`}
                      >
                        <p className="font-medium">
                          {schedule.schedule?.startDateTime
                            ? new Date(schedule.schedule.startDateTime).toLocaleString()
                            : "No date"}
                        </p>
                      </button>
                    ))}
                  </div>
                </div>

                <div className="flex gap-3">
                  <button
                    onClick={() => {
                      setSelectedLawyer(null);
                      setSelectedSchedule(null);
                      setSchedules([]);
                    }}
                    className="flex-1 px-4 py-2 bg-gray-200 text-gray-700 rounded hover:bg-gray-300 transition font-medium"
                  >
                    Cancel
                  </button>

                  <button
                    onClick={handleConfirmBooking}
                    disabled={!selectedSchedule || bookingLoading}
                    className="flex-1 px-4 py-2 bg-[#c8a97e] text-white rounded hover:opacity-90 disabled:opacity-50 transition font-medium"
                  >
                    {bookingLoading ? "Processing..." : "Proceed to Payment"}
                  </button>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </section>
  );
};

export default LawyerHighlight;
