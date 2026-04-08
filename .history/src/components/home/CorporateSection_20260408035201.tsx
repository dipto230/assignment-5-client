"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CorporateSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);
  const linesRef = useRef<HTMLParagraphElement[]>([]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // TITLE ANIMATION
      gsap.from(".corp-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      // LINE BY LINE TEXT ANIMATION
      if (linesRef.current.length > 0) {
        gsap.from(linesRef.current, {
          y: 40,
          opacity: 0,
          duration: 1,
          stagger: 0.25,
          ease: "power3.out",
        });
      }

      // BUTTON ANIMATION
      gsap.from(".corp-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.8,
        ease: "power3.out",
      });

      // IMAGE SLIDER ANIMATION
      if (sliderRef.current) {
        gsap.to(sliderRef.current, {
          x: "-100%",
          duration: 20,
          ease: "linear",
          repeat: -1,
        });
      }
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="next-section"
      className="grid md:grid-cols-2 min-h-[80vh]"
    >
      {/* LEFT SIDE */}
      <div className="flex flex-col justify-center px-10 py-16 bg-[#f8f6f2]">
        <span className="text-sm tracking-widest text-gray-500 mb-4">
          LEGAL SOLUTIONS PLATFORM
        </span>

        {/* GRADIENT TITLE */}
        <h2 className="corp-title text-4xl md:text-5xl font-serif font-semibold leading-tight mb-6 bg-gradient-to-r from-gray-800 via-[#c8a97e] to-gray-800 bg-clip-text text-transparent">
          Connect With Trusted Lawyers & Get Expert Legal Advice
        </h2>

        {/* LINE BY LINE TEXT */}
        <div className="space-y-3 mb-8 max-w-lg text-gray-600 leading-relaxed">
          <p
            ref={(el) => {
              if (el) linesRef.current[0] = el; // TS-safe
            }}
            className="hover:text-[#c8a97e] transition duration-300"
          >
            Easily{" "}
            <span className="font-medium hover:drop-shadow-[0_0_6px_rgba(200,169,126,0.8)] transition">
              book experienced lawyers
            </span>{" "}
            and schedule consultations tailored to your legal needs.
          </p>

          <p
            ref={(el) => {
              if (el) linesRef.current[1] = el;
            }}
            className="hover:text-[#c8a97e] transition duration-300"
          >
            Get access to{" "}
            <span className="font-medium hover:drop-shadow-[0_0_6px_rgba(200,169,126,0.8)] transition">
              verified legal professionals
            </span>{" "}
            across corporate, civil, and criminal law domains.
          </p>

          <p
            ref={(el) => {
              if (el) linesRef.current[2] = el;
            }}
            className="hover:text-[#c8a97e] transition duration-300"
          >
            Experience a{" "}
            <span className="font-medium hover:drop-shadow-[0_0_6px_rgba(200,169,126,0.8)] transition">
              secure and seamless platform
            </span>{" "}
            designed for modern legal solutions.
          </p>
        </div>

        <button className="corp-btn border border-gray-800 px-6 py-3 w-fit tracking-wide hover:bg-black hover:text-white transition">
          REQUEST FREE CONSULTATION
        </button>
      </div>

      {/* RIGHT SIDE IMAGE SLIDER */}
      <div className="relative overflow-hidden">
        <div ref={sliderRef} className="flex w-[300%] h-full">
          <div className="relative w-full h-[80vh]">
            <Image
              src="/images/corporate.jpg"
              alt="corporate meeting"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-[80vh]">
            <Image
              src="/images/corporate2.jpg"
              alt="corporate law"
              fill
              className="object-cover"
            />
          </div>

          <div className="relative w-full h-[80vh]">
            <Image
              src="/images/corporate3.jpg"
              alt="legal team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;