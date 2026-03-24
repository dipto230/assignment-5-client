"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function AboutUsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const tl = gsap.timeline({
      defaults: { ease: "power3.out" },
    });

    tl.from(
      ".about-img",
      {
        x: -60,
        opacity: 0,
        duration: 1,
        immediateRender: false,
      }
    ).from(
      ".about-content",
      {
        y: 30,
        opacity: 0,
        stagger: 0.12,
        duration: 0.9,
        immediateRender: false,
      },
      "-=0.7"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-28 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center px-6">

        {/* LEFT IMAGE */}
        <div className="relative w-full h-[500px] md:h-[600px] overflow-hidden rounded-3xl about-img">
          <Image
            src="/images/about.jpg"
            alt="About us"
            fill
            sizes="(max-width: 768px) 100vw, 50vw"
            className="object-cover"
            priority
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="about-content text-xs tracking-[6px] text-[#b89b72] uppercase mb-5">
            About Us
          </p>

          <h2 className="about-content text-4xl md:text-5xl font-serif text-gray-900 mb-8 leading-tight">
            A Legacy of Trust <br /> & Legal Excellence
          </h2>

          <div className="about-content w-16 h-[2px] bg-[#b89b72] mb-8"></div>

          <p className="about-content text-gray-600 mb-6 leading-relaxed text-lg">
            We are committed to delivering exceptional legal services with
            precision, integrity, and dedication.
          </p>

          <p className="about-content text-gray-600 mb-10 leading-relaxed">
            With years of experience, we ensure every case is handled with care
            and professionalism.
          </p>

          {/* STATS */}
          <div className="about-content flex items-center gap-10 mb-10">
            <div>
              <h4 className="text-2xl font-semibold text-[#b89b72]">25+</h4>
              <p className="text-sm text-gray-500">Years</p>
            </div>

            <div>
              <h4 className="text-2xl font-semibold text-[#b89b72]">500+</h4>
              <p className="text-sm text-gray-500">Cases</p>
            </div>

            <div>
              <h4 className="text-2xl font-semibold text-[#b89b72]">100%</h4>
              <p className="text-sm text-gray-500">Trust</p>
            </div>
          </div>

          {/* BUTTON */}
          <button className="about-content border border-[#b89b72] text-[#b89b72] px-10 py-4 rounded-full font-semibold hover:bg-[#b89b72] hover:text-white transition duration-300">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}