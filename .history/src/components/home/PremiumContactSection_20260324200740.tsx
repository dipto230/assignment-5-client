"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function PremiumContactSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.from(".img", {
      scale: 1.2,
      opacity: 0,
      duration: 1.5,
      ease: "power3.out",
    });

    gsap.from(".fade", {
      y: 60,
      opacity: 0,
      stagger: 0.15,
      duration: 1,
      delay: 0.3,
      ease: "power3.out",
    });
  }, []);

  return (
    <section
      ref={sectionRef}
      className="py-20 bg-gradient-to-br from-[#f7f7f7] to-[#eaeaea]"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 rounded-3xl overflow-hidden shadow-[0_30px_80px_rgba(0,0,0,0.15)]">

        {/* LEFT IMAGE */}
        <div className="relative h-[500px] md:h-auto group">
          <Image
            src="/images/team.jpg" // change this
            alt="team"
            fill
            className="object-cover img transition duration-700 group-hover:scale-105"
          />

          {/* overlay */}
          <div className="absolute inset-0 bg-black/20"></div>
        </div>

        {/* RIGHT GLASS FORM */}
        <div className="relative p-10 md:p-16 backdrop-blur-xl bg-white/40 border-l border-white/30">

          {/* subtle gradient glow */}
          <div className="absolute inset-0 bg-gradient-to-br from-white/30 to-transparent pointer-events-none"></div>

          <div className="relative">
            <p className="fade text-sm tracking-[4px] text-[#b89b72] mb-3 uppercase">
              Contact Us
            </p>

            <h2 className="fade text-3xl md:text-4xl font-serif mb-8 text-gray-800">
              Request a Free Call Back
            </h2>

            <form className="space-y-4">

              {/* row */}
              <div className="flex gap-4">
                <input
                  type="text"
                  placeholder="Name*"
                  className="fade w-full p-4 rounded-lg bg-white/60 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-[#b89b72] transition"
                />
                <input
                  type="email"
                  placeholder="E-mail*"
                  className="fade w-full p-4 rounded-lg bg-white/60 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-[#b89b72] transition"
                />
              </div>

              <input
                type="text"
                placeholder="Telephone"
                className="fade w-full p-4 rounded-lg bg-white/60 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-[#b89b72]"
              />

              <select className="fade w-full p-4 rounded-lg bg-white/60 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-[#b89b72]">
                <option>Please choose an option</option>
                <option>Legal Advice</option>
                <option>Business Law</option>
                <option>Consultation</option>
              </select>

              <textarea
                rows={4}
                placeholder="Details*"
                className="fade w-full p-4 rounded-lg bg-white/60 backdrop-blur-md border border-white/40 outline-none focus:ring-2 focus:ring-[#b89b72]"
              ></textarea>

              <button
                type="submit"
                className="fade mt-4 bg-gradient-to-r from-[#b89b72] to-[#8b6b4a] text-white px-8 py-4 rounded-lg font-semibold tracking-wide shadow-lg hover:scale-105 hover:shadow-xl transition duration-300"
              >
                Submit
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}