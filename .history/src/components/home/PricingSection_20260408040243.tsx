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
  if (!ref.current) return; // ensure the section exists

  // Select all fade-up elements inside this section
  const items = gsap.utils.toArray<HTMLElement>(
    ref.current.querySelectorAll(".fade-up")
  );

  if (items.length === 0) return; // nothing to animate

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
      className="bg-[#f8f7f4] py-24 px-6 md:px-20"
    >
      {/* HEADER */}
      <div className="text-center mb-16 fade-up">
        <p className="text-sm tracking-[4px] text-[#b89b72] uppercase">
          Pricing
        </p>

        <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4">
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
            className={`fade-up relative rounded-2xl p-8 transition duration-500
            backdrop-blur-xl border border-white/40 shadow-lg
            bg-white/60 hover:shadow-2xl hover:-translate-y-2
            ${plan.highlight ? "scale-105 ring-1 ring-[#b89b72]/40" : ""}
            `}
          >
            {/* Highlight badge */}
            {plan.highlight && (
              <span className="absolute top-4 right-4 text-xs bg-[#b89b72] text-white px-3 py-1 rounded-full shadow">
                Popular
              </span>
            )}

            {/* Title */}
            <h3 className="text-xl font-semibold mb-3 text-gray-800">
              {plan.name}
            </h3>

            {/* Price */}
            <h2 className="text-4xl font-light mb-4 text-gray-900">
              ₹{plan.price}
            </h2>

            <p className="text-sm mb-6 text-gray-600">
              {plan.desc}
            </p>

            {/* Features */}
            <ul className="space-y-3 mb-8">
              {plan.features.map((f, idx) => (
                <li key={idx} className="flex items-center gap-2 text-gray-700">
                  <span className="text-[#b89b72]">✔</span>
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            {/* CTA */}
            <a
              href="mailto:diptoroy230305@gmail.com"
              className="block w-full text-center py-3 rounded-md font-semibold transition
              bg-[#b89b72] text-white hover:bg-[#a68a5f] shadow-md"
            >
              Contact Now
            </a>
          </div>
        ))}
      </div>
    </section>
  );
}