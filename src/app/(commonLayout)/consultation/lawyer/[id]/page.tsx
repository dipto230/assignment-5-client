/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState, useRef } from "react";
import { useParams, useRouter } from "next/navigation";
import Image from "next/image";
import gsap from "gsap";
import { apiClient } from "@/lib/apiClient";

export default function LawyerDetails() {
  const { id } = useParams();
  const router = useRouter();

  const [lawyer, setLawyer] = useState<any>(null);
  const [schedules, setSchedules] = useState<any[]>([]);
  const [selected, setSelected] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [bookingLoading, setBookingLoading] = useState(false);

  const containerRef = useRef(null);

  // ✅ FETCH DATA
  useEffect(() => {
    let isMounted = true;

    const fetchData = async () => {
      try {
        const [lawyerRes, scheduleRes] = await Promise.all([
          apiClient.get(`/lawyers/${id}`),
          apiClient.get(`/lawyer-schedules?lawyerId=${id}`),
        ]);

        if (isMounted) {
          setLawyer(lawyerRes.data.data);
          setSchedules(scheduleRes.data.data || []);
        }
      } catch (error: any) {
        console.error("Fetch error:", error?.response?.status, error?.message);
      } finally {
        if (isMounted) setLoading(false);
      }
    };

    fetchData();

    return () => {
      isMounted = false;
    };
  }, [id]);

  // ✅ GSAP ANIMATION
  useEffect(() => {
    if (lawyer) {
      gsap.fromTo(
        containerRef.current,
        { opacity: 0, y: 40 },
        { opacity: 1, y: 0, duration: 0.8 }
      );
    }
  }, [lawyer]);

  // ✅ BOOK
  const handleBook = async () => {
    if (!selected) {
      alert("Select a schedule");
      return;
    }

    setBookingLoading(true);

    try {
      const res = await apiClient.post("/appointments/book-appointment", {
        lawyerId: id,
        scheduleId: selected,
      });

      // redirect to payment page
      const paymentUrl = res.data?.data?.paymentUrl;
      if (paymentUrl) {
        window.location.href = paymentUrl; 
      } else {
        alert("Appointment booked successfully ✅");
        router.push("/my-appointments");
      }
    } catch (error: any) {
      const errorMsg = error?.response?.data?.message || error?.message || "Booking failed";
      alert(errorMsg);
      console.error("Booking error:", error);
    } finally {
      setBookingLoading(false);
    }
  };

  if (loading) {
    return (
      <p className="text-center mt-20 text-gray-400">
        Loading lawyer details...
      </p>
    );
  }

  if (!lawyer) {
    return (
      <p className="text-center mt-20 text-red-400">
        Lawyer not found
      </p>
    );
  }

  const initial = lawyer.name?.charAt(0).toUpperCase();

  return (
    <div
      ref={containerRef}
      className="max-w-6xl mx-auto px-6 mt-24 grid md:grid-cols-3 gap-12"
    >
     
      <div className="flex flex-col items-start gap-5">
        {lawyer.profilePhoto ? (
          <div className="relative w-28 h-28">
            <Image
              src={lawyer.profilePhoto}
              alt={lawyer.name}
              fill
              className="rounded-full object-cover"
              sizes="112px"
              priority
            />
          </div>
        ) : (
          <div className="w-28 h-28 flex items-center justify-center rounded-full bg-black text-white text-3xl font-semibold">
            {initial}
          </div>
        )}

        <div>
          <h1 className="text-2xl font-semibold">{lawyer.name}</h1>
          <p className="text-gray-500 text-sm">{lawyer.designation}</p>
          <p className="text-gray-400 text-sm">{lawyer.currentFirm}</p>
        </div>

        <p className="text-sm text-gray-500">📍 {lawyer.address}</p>

        <p className="text-lg font-medium">
          ৳ {lawyer.consultationFee}
        </p>

        <button
          onClick={handleBook}
          disabled={bookingLoading}
          className="mt-4 px-6 py-2 bg-black text-white rounded-full hover:opacity-80 transition disabled:opacity-50"
        >
          {bookingLoading ? "Processing..." : "Book Appointment"}
        </button>
      </div>

  
      <div className="md:col-span-2 space-y-10">
        <div className="space-y-3 text-sm">
          <p><span className="text-gray-400">Experience:</span> {lawyer.experience} years</p>
          <p><span className="text-gray-400">Qualification:</span> {lawyer.qualification}</p>
          <p><span className="text-gray-400">Gender:</span> {lawyer.gender}</p>
          <p><span className="text-gray-400">Bar Reg:</span> {lawyer.barRegistrationNumber}</p>
          <p><span className="text-gray-400">Email:</span> {lawyer.email}</p>
        </div>

        <div>
          <h3 className="text-sm text-gray-400 mb-2">Practice Areas</h3>
          <div className="flex gap-3 flex-wrap">
            {lawyer.practiceAreas.map((p: any) => (
              <span
                key={p.practiceArea.id}
                className="text-sm border-b border-black"
              >
                {p.practiceArea.title}
              </span>
            ))}
          </div>
        </div>

        <div>
          <h3 className="text-sm text-gray-400 mb-3">Select Schedule</h3>

          <div className="flex flex-wrap gap-3">
            {schedules.length === 0 && (
              <p className="text-gray-400">No schedule available</p>
            )}

            {schedules.map((s) => (
              <button
                key={s.id}
                onClick={() => setSelected(s.scheduleId)}
                className={`px-4 py-2 rounded-full text-sm border transition ${
                  selected === s.scheduleId
                    ? "bg-black text-white"
                    : "hover:bg-gray-100"
                }`}
              >
                {s.schedule?.startDateTime
                  ? new Date(s.schedule.startDateTime).toLocaleString()
                  : "No Date"}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}