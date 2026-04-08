"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

const features = [
  {
    title: "Verified Lawyers",
    desc: "All lawyers are thoroughly verified to ensure trusted and professional legal services.",
  },
  {
    title: "Secure Booking",
    desc: "Your appointments and data are protected with top-level security and encryption.",
  },
  {
    title: "24/7 Support",
    desc: "Our support team is always ready to assist you anytime you need help.",
  },
  {
    title: "Affordable Pricing",
    desc: "Transparent and flexible pricing plans suitable for every client.",
  },
];

export default function WhyChooseUs() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".fade-up");

    gsap.fromTo(
      items,
      { y: 80, opacity: 0, scale: 0.95 },
      {
        y: 0,
        opacity: 1,
        scale: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power4.out",
      }
    );

    // 👉 Extra smooth right-side animation
    const rightItems = ref.current?.querySelectorAll(".feature-item");

    gsap.fromTo(
      rightItems,
      { x: 60, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        stagger: 0.25,
        duration: 1,
        delay: 0.3,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section ref={ref} className="grid md:grid-cols-2 min-h-screen">
      {/* LEFT SIDE */}
      <div className="relative">
        <Image
          src="/images/scale.jpg"
          alt="Why Choose Us"
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60"></div>

        <div className="fade-up absolute inset-0 flex flex-col justify-center items-center text-center text-white px-10">
          <p className="tracking-[4px] text-[#b89b72] text-sm uppercase">
            Why Choose Us
          </p>

          <h2 className="text-4xl md:text-5xl font-serif mt-4">
            Trusted Legal Platform
          </h2>

          <p className="mt-6 text-gray-200 max-w-md leading-relaxed">
            We provide reliable legal solutions with verified professionals,
            secure booking, and seamless experience for our clients.
          </p>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-[#f9f9f9] flex flex-col justify-center px-6 md:px-20 py-20">
        <div className="grid gap-8">
          {features.map((item, i) => (
            <div
              key={i}
              className="feature-item group border-l-4 border-[#b89b72] pl-6 py-3 
              transition duration-500 ease-out
              hover:translate-x-3 hover:scale-[1.02]"
            >
              <h3 className="text-xl font-semibold text-gray-800 group-hover:text-[#b89b72] transition">
                {item.title}
              </h3>

              <p className="text-gray-600 mt-2 leading-relaxed">
                {item.desc}
              </p>

              {/* subtle line animation */}
              <div className="h-[1px] w-0 bg-[#b89b72] mt-3 group-hover:w-full transition-all duration-500"></div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}