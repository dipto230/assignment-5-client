"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function PremiumContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline();

    tl.from(".img", {
      scale: 1.1,
      opacity: 0,
      duration: 1.2,
      ease: "power3.out",
    }).from(
      ".fade",
      {
        y: 40,
        opacity: 0,
        stagger: 0.15,
        duration: 1,
        ease: "power3.out",
      },
      "-=0.8"
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-[#f7f7f7]"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 rounded-2xl overflow-hidden shadow-lg">
        
        {/* LEFT IMAGE (NO OVERLAY) */}
        <div className="relative min-h-[500px] md:min-h-full">
          <Image
            src="/images/team.jpg.jpg"
            alt="team"
            fill
            priority
            className="object-cover img"
          />
        </div>

        {/* RIGHT FORM */}
        <div className="p-10 md:p-16">
          <p className="fade text-sm tracking-[4px] text-[#b89b72] mb-3 uppercase">
            Contact Us
          </p>

          <h2 className="fade text-3xl md:text-4xl font-serif mb-8 text-gray-900">
            Request a Free Call Back
          </h2>

          <form className="space-y-4">
            
            <div className="flex gap-4">
              <input
                type="text"
                placeholder="Name*"
                className="fade w-full p-4 rounded-md bg-gray-100 border outline-none focus:ring-2 focus:ring-[#b89b72]"
              />
              <input
                type="email"
                placeholder="E-mail*"
                className="fade w-full p-4 rounded-md bg-gray-100 border outline-none focus:ring-2 focus:ring-[#b89b72]"
              />
            </div>

            <input
              type="text"
              placeholder="Telephone"
              className="fade w-full p-4 rounded-md bg-gray-100 border outline-none focus:ring-2 focus:ring-[#b89b72]"
            />

            <select className="fade w-full p-4 rounded-md bg-gray-100 border outline-none focus:ring-2 focus:ring-[#b89b72]">
              <option>Please choose an option</option>
              <option>Legal Advice</option>
              <option>Business Law</option>
              <option>Consultation</option>
            </select>

            <textarea
              rows={4}
              placeholder="Details*"
              className="fade w-full p-4 rounded-md bg-gray-100 border outline-none focus:ring-2 focus:ring-[#b89b72]"
            ></textarea>

            <button
              type="submit"
              className="fade bg-[#8b6b4a] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#6f5438] transition"
            >
              Submit
            </button>
          </form>
        </div>
      </div>
    </section>
  );
}