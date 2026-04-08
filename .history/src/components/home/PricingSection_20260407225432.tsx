"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const plans = [
  {
    name: "Free Consultation",
    price: "0",
    desc: "Basic legal guidance for quick help",
    features: [
      "15 min consultation",
      "Basic legal advice",
      "Email support",
    ],
    highlight: false,
  },
  {
    name: "Premium Legal Advice",
    price: "499",
    desc: "In-depth consultation with experts",
    features: [
      "1 hour consultation",
      "Expert lawyer guidance",
      "Priority support",
    ],
    highlight: true,
  },
  {
    name: "Subscription Model",
    price: "999/mo",
    desc: "Ongoing legal support for businesses",
    features: [
      "Unlimited consultations",
      "Dedicated lawyer",
      "24/7 support",
    ],
    highlight: false,
  },
];

export default function PricingSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".fade-up");

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
      className="bg-[#f9f9f9] py-24 px-6 md:px-20"
    >
      {/* HEADER */}
      <div className="text-center mb-16 fade-up">
        <p className="text-sm tracking-[4px] text-[#b89b72] uppercase">
          Pricing
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-gray-800 mt-4">
          Consultation Plans
        </h2>

        <p className="text-gray-600 mt-6 max-w-xl mx-auto">
          Choose a plan that fits your legal needs. Transparent pricing with no hidden costs.
        </p>
      </div>

      {/* CARDS */}
      <div className="grid md:grid-cols-3 gap-8">
        {plans.map((plan, i) => (
          <div
            key={i}
            className={`fade-up relative rounded-2xl p-8 border transition duration-300 
            ${
              plan.highlight
                ? "bg-black text-white scale-105 shadow-2xl"
                : "bg-white hover:shadow-xl"
            }`}
          >
            {/* Highlight badge */}
            {plan.highlight && (
              <span className="absolute top-4 right-4 text-xs bg-[#b89b72] text-black px-3 py-1 rounded-full">
                Popular
              </span>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3">
              {plan.name}
            </h3>

            {/* Price */}
            <h2 className="text-4xl font-light mb-4">
              ₹{plan.price}
            </h2>

            <p
              className={`text-sm mb-6 ${
                plan.highlight ? "text-gray-300" : "text-gray-600"
              }`}
            >
              {plan.desc}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2">
                  <span className="text-[#b89b72]">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <button
              className={`w-full py-3 rounded-md font-semibold transition
              ${
                plan.highlight
                  ? "bg-[#b89b72] text-black hover:bg-[#a68a5f]"
                  : "bg-black text-white hover:bg-gray-800"
              }`}
            >
              Book Now
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}