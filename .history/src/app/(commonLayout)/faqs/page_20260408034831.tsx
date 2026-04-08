"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
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
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  useEffect(() => {
    if (!ref.current) return;

    // Use gsap.utils.toArray to ensure proper typing
    const items = gsap.utils.toArray<HTMLElement>(".fade-up", ref.current);

    if (items.length === 0) return;

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
      className="min-h-screen grid md:grid-cols-2 bg-[#f9f9f9]"
    >
      {/* LEFT SIDE (FAQ CONTENT) */}
      <div className="flex flex-col justify-center px-6 md:px-20 py-20">
        <div className="fade-up">
          <p className="text-sm tracking-[4px] text-[#b89b72] uppercase">
            Support
          </p>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-4 mb-10">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-5">
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;

            return (
              <div
                key={i}
                className="fade-up border rounded-xl bg-white overflow-hidden shadow-sm hover:shadow-xl transition"
              >
                {/* QUESTION */}
                <button
                  onClick={() =>
                    setOpenIndex(isOpen ? null : i)
                  }
                  className="w-full flex justify-between items-center px-6 py-5 text-left"
                >
                  <span className="font-semibold text-gray-800">
                    {faq.q}
                  </span>

                  <span className="text-[#b89b72] text-xl">
                    {isOpen ? "−" : "+"}
                  </span>
                </button>

                {/* ANSWER */}
                <div
                  className={`px-6 overflow-hidden transition-all duration-500 ${
                    isOpen ? "max-h-40 pb-5" : "max-h-0"
                  }`}
                >
                  <p className="text-gray-600 leading-relaxed">
                    {faq.a}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* BOOKING FLOW */}
        <div className="fade-up mt-14">
          <h3 className="text-xl font-serif text-gray-800 mb-6">
            Booking Process
          </h3>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center text-sm">
            {["Login", "Choose Lawyer", "Select Slot", "Payment"].map(
              (step, i) => (
                <div
                  key={i}
                  className="bg-white border rounded-lg py-4 shadow hover:shadow-lg transition"
                >
                  <p className="text-[#b89b72] font-semibold">{i + 1}</p>
                  <p className="text-gray-600 mt-1">{step}</p>
                </div>
              )
            )}
          </div>
        </div>
      </div>

      {/* RIGHT SIDE (IMAGE + OVERLAY) */}
      <div className="relative hidden md:block">
        {/* Background Image */}
        <Image
          src="/images/about.jpg"
          alt="FAQ"
          fill
          className="object-cover"
        />

        {/* Dark overlay */}
        <div className="absolute inset-0 bg-black/60"></div>

        {/* Text overlay */}
        <div className="fade-up absolute inset-0 flex flex-col justify-center items-center text-center text-white px-10">
          <h2 className="text-3xl md:text-4xl font-serif mb-6">
            Need Help?
          </h2>

          <p className="text-gray-200 max-w-md leading-relaxed">
            Find answers to the most common legal service questions and
            understand how our platform helps you connect with top lawyers
            seamlessly.
          </p>
        </div>
      </div>
    </section>
  );
}