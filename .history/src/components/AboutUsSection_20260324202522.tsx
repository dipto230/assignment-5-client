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

    tl.from(".about-img", {
      x: -80,
      opacity: 0,
      duration: 1.2,
    }).from(
      ".about-content",
      {
        x: 80,
        opacity: 0,
        duration: 1.2,
        stagger: 0.2,
      },
      "-=1"
    );
  }, []);

  return (
    <section ref={sectionRef} className="py-24 bg-white">
      <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-12 items-center px-6">
        
        {/* LEFT IMAGE */}
        <div className="relative min-h-[500px]">
          <Image
            src="/images/about.jpg" // change image
            alt="About us"
            fill
            className="object-cover rounded-2xl about-img"
          />
        </div>

        {/* RIGHT CONTENT */}
        <div>
          <p className="about-content text-sm tracking-[4px] text-[#b89b72] uppercase mb-3">
            About Us
          </p>

          <h2 className="about-content text-3xl md:text-4xl font-serif text-gray-900 mb-6 leading-snug">
            Dedicated to Justice, <br /> Committed to Excellence
          </h2>

          <p className="about-content text-gray-600 mb-6 leading-relaxed">
            We are a team of experienced legal professionals committed to delivering
            high-quality legal services with integrity, precision, and dedication.
            Our mission is to protect your rights and provide trusted legal guidance.
          </p>

          <p className="about-content text-gray-600 mb-8 leading-relaxed">
            With years of experience across multiple legal disciplines, we ensure
            every client receives personalized attention and the best possible outcome.
          </p>

          {/* FEATURES */}
          <div className="grid grid-cols-2 gap-6 mb-8">
            <div className="about-content">
              <h4 className="text-[#b89b72] text-xl font-semibold">25+</h4>
              <p className="text-sm text-gray-500">Years Experience</p>
            </div>

            <div className="about-content">
              <h4 className="text-[#b89b72] text-xl font-semibold">500+</h4>
              <p className="text-sm text-gray-500">Cases Won</p>
            </div>

            <div className="about-content">
              <h4 className="text-[#b89b72] text-xl font-semibold">50+</h4>
              <p className="text-sm text-gray-500">Expert Lawyers</p>
            </div>

            <div className="about-content">
              <h4 className="text-[#b89b72] text-xl font-semibold">100%</h4>
              <p className="text-sm text-gray-500">Client Satisfaction</p>
            </div>
          </div>

          {/* BUTTON */}
          <button className="about-content bg-[#8b6b4a] text-white px-8 py-4 rounded-md font-semibold hover:bg-[#6f5438] transition">
            Learn More
          </button>
        </div>
      </div>
    </section>
  );
}