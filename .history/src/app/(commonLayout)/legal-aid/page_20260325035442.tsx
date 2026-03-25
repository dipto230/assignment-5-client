"use client";

import React, { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const LegalAid = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const leftRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔥 LEFT CONTENT
      gsap.fromTo(
        leftRef.current,
        { y: 60, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 🔥 RIGHT CARD (slide in)
      gsap.fromTo(
        cardRef.current,
        { x: 80, opacity: 0 },
        {
          x: 0,
          opacity: 1,
          duration: 1.4,
          ease: "power3.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );

      // 🔥 BUTTON (late entrance)
      gsap.fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 1,
          delay: 0.3,
          ease: "power2.out",
          scrollTrigger: {
            trigger: sectionRef.current,
            start: "top 80%",
          },
        }
      );
    });

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="relative bg-[#f8f7f4] text-[#1a1a1a] py-32 px-6 md:px-20 overflow-hidden"
    >
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT */}
        <div ref={leftRef}>
          <p className="uppercase tracking-[0.35em] text-[#c8a97e] text-xs mb-6">
            LEGAL AID
          </p>

          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            Trusted Legal Support <br />
            <span className="text-black/70">When It Matters Most</span>
          </h2>

          <p className="text-gray-600 text-lg mb-10 leading-relaxed max-w-lg">
            Strategic legal solutions backed by decades of expertise,
            ensuring absolute discretion and unmatched precision.
          </p>

          <button
            ref={btnRef}
            className="border border-[#c8a97e] text-[#c8a97e] px-12 py-4 tracking-[0.25em] hover:bg-[#c8a97e] hover:text-white transition duration-500"
          >
            GET CONSULTATION
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="flex justify-end">
          <div
            ref={cardRef}
            className="w-[380px] p-10 bg-white border border-gray-200 shadow-lg hover:-translate-y-2 transition duration-500"
          >
            <p className="text-lg italic text-gray-700 leading-relaxed mb-8">
              “Their legal expertise and professionalism exceeded our expectations.
              Every step was handled with precision and complete transparency.”
            </p>

            <div className="w-16 h-[2px] bg-[#c8a97e] mb-6" />

            <h4 className="text-lg font-semibold text-black">
              Jonathan Reeves
            </h4>
            <p className="text-sm text-gray-500 mb-8">
              CEO, Reeves Holdings
            </p>

            <div className="flex justify-between text-sm text-gray-500 border-t border-gray-200 pt-6">
              <span>500+ Cases</span>
              <span>98% Success</span>
              <span>20+ Years</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default LegalAid;
