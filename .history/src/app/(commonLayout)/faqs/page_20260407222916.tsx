"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const faqs = [
  {
    q: "How to book a lawyer?",
    a: "First login to your account, then select a lawyer, choose available time slot and confirm booking.",
  },
  {
    q: "Is consultation free?",
    a: "Some lawyers offer free consultation, but most require a fixed fee depending on expertise.",
  },
  {
    q: "How payment works?",
    a: "After selecting your slot, you’ll be redirected to secure payment. Once paid, your appointment is confirmed.",
  },
];

export default function FAQPage() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".faq-item");

    gsap.fromTo(
      items,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="bg-[#f9f9f9] min-h-screen px-6 md:px-20 py-20"
    >
      {/* HEADER */}
      <div className="text-center mb-16">
        <p className="text-sm tracking-[4px] text-[#b89b72] uppercase">
          Support
        </p>
        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-4">
          Frequently Asked Questions
        </h2>
      </div>

      {/* FAQ LIST */}
      <div className="max-w-4xl mx-auto space-y-6">
        {faqs.map((faq, i) => (
          <div
            key={i}
            className="faq-item bg-white p-6 rounded-xl shadow-md border hover:shadow-xl transition duration-300"
          >
            <h3 className="text-lg font-semibold text-[#b89b72] mb-3">
              {faq.q}
            </h3>
            <p className="text-gray-600 leading-relaxed">{faq.a}</p>
          </div>
        ))}
      </div>

      {/* EXTRA HIGHLIGHT (FLOW) */}
      <div className="mt-20 text-center">
        <h3 className="text-2xl font-serif text-gray-800 mb-6">
          Booking Process
        </h3>

        <div className="flex flex-col md:flex-row justify-center items-center gap-6 text-sm text-gray-600">
          <span className="bg-white px-4 py-2 rounded shadow">
            1. Login
          </span>
          <span>→</span>
          <span className="bg-white px-4 py-2 rounded shadow">
            2. Choose Lawyer
          </span>
          <span>→</span>
          <span className="bg-white px-4 py-2 rounded shadow">
            3. Select Time Slot
          </span>
          <span>→</span>
          <span className="bg-white px-4 py-2 rounded shadow">
            4. Payment
          </span>
        </div>
      </div>
    </section>
  );
}