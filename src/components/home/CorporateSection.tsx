"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CorporateSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".corp-title", {
        y: 80,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
      });

      gsap.from(".corp-text", {
        y: 60,
        opacity: 0,
        duration: 1,
        delay: 0.2,
      });

      gsap.from(".corp-btn", {
        scale: 0.8,
        opacity: 0,
        duration: 0.6,
        delay: 0.4,
      });

      gsap.from(".corp-img", {
        x: 100,
        opacity: 0,
        duration: 1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid md:grid-cols-2 min-h-[80vh]"
    >
      {/* LEFT */}
      <div className="flex flex-col justify-center px-10 py-16 bg-[#f8f6f2]">
        <span className="corp-text text-sm tracking-widest text-gray-500 mb-4">
          FIELDS OF EXPERTISE
        </span>

        <h2 className="corp-title text-4xl md:text-5xl font-serif font-semibold leading-tight text-gray-800 mb-6">
          Advice on a Full Range of Corporate Law Matters
        </h2>

        <p className="corp-text text-gray-600 mb-8 max-w-lg">
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </p>

        <button className="corp-btn border border-gray-800 px-6 py-3 w-fit tracking-wide hover:bg-black hover:text-white transition">
          REQUEST FREE CONSULTATION
        </button>
      </div>

      {/* RIGHT IMAGE */}
      <div className="relative h-[400px] md:h-auto">
        <Image
  src="/images/corporate.jpg"
  alt="corporate meeting"
  fill
  className="object-cover corp-img"
/>
      </div>
    </section>
  );
};

export default CorporateSection;