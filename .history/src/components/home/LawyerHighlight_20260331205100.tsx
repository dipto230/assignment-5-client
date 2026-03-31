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
        console.log("LAWYERS:", result);
        setData(result?.data?.data || []);
      } catch (error) {
        console.error(error);
      }
    };

    fetchLawyers();
  }, []);

  // Open booking modal and fetch schedules
  const handleBookNow = async (lawyer: any) => {
    setSelectedLawyer(lawyer);
    setLoadingSchedules(true);
    setSelectedSchedule(null);

    try {
      const res = await apiClient.get(`/lawyer-schedules?lawyerId=${lawyer.id}`);
      setSchedules(res.data?.data || []);
    } catch (error: any) {
      console.error("Error fetching schedules:", error);
      alert("Failed to load schedules");
    } finally {
      setLoadingSchedules(false);
    }
  };

  // Handle booking confirmation
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
      console.error("Booking error:", error);
    } finally {
      setBookingLoading(false);
    }
  };

  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-100">
      {/* Header */}
      <div className="flex justify-between items-center max-w-7xl mx-auto px-4 mb-10">
        <h2 className="text-4xl font-bold">Top Lawyers</h2>

        <Link href="/consultation" className="text-blue-600 hover:underline">
          View All →
        </Link>
      </div>

      {/* Cards */}
      <div className="grid md:grid-cols-4 gap-6 max-w-7xl mx-auto px-4">
        {data.slice(0, 4).map((lawyer: any) => (
          <div
            key={lawyer.id}
            className="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition"
          >
            {/* Image */}
            <img
              src={
                lawyer.profilePhoto ||
                "https://via.placeholder.com/300"
              }
              className="h-40 w-full object-cover"
              alt={lawyer.name}
            />

            {/* Content */}
            <div className="p-4">
              <h3 className="font-semibold text-lg">{lawyer.name}</h3>
              <p className="text-sm text-gray-500 mb-2">
                {lawyer.designation}
              </p>
              <p className="text-blue-600 text-sm font-medium mb-4">
                ৳ {lawyer.consultationFee}
              </p>

              {/* Buttons */}
              <div className="flex gap-2">
                <Link
                  href={`/consultation/lawyer/${lawyer.id}`}
                  className="flex-1 px-3 py-2 bg-gray-100 text-gray-700 rounded hover:bg-gray-200 transition text-center text-sm font-medium"
                >
                  View Details
                </Link>

                <button
                  onClick={() => handleBookNow(lawyer)}
                  className="flex-1 px-3 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition text-sm font-medium"
                >
                  Book Now
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Booking Modal */}
      {selectedLawyer && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-lg shadow-xl max-w-md w-full p-6">
            {/* Header */}
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

            {/* Lawyer Info */}
            <div className="mb-6 pb-4 border-b">
              <h4 className="font-semibold text-lg">{selectedLawyer.name}</h4>
              <p className="text-sm text-gray-600">{selectedLawyer.designation}</p>
              <p className="text-blue-600 font-medium">৳ {selectedLawyer.consultationFee}</p>
            </div>

            {/* Schedules */}
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
                            ? "border-blue-600 bg-blue-50"
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

                {/* Action Buttons */}
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
                    className="flex-1 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50 disabled:cursor-not-allowed transition font-medium"
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