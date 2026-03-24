"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // 🔥 cinematic background zoom
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 6, ease: "power2.out" }
    );

    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" }
    )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2, ease: "power3.out" },
        "-=0.8"
      )
      .fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8, ease: "power2.out" },
        "-=0.6"
      );
  }, []);

  return (
    <section className="relative h-screen flex items-center text-white overflow-hidden">
      
      {/* 🔥 Background */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/law-hero.jpg')",
        }}
      />

      {/* 🔥 Premium Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* 🔥 Content */}
      <div className="relative z-10 px-6 md:px-20 max-w-5xl">
        
        {/* Subtitle */}
        <p
          ref={subtitleRef}
          className="uppercase tracking-[0.3em] text-[#c8a97e] text-sm mb-6"
        >
          Full Range Legal Services
        </p>

        {/* Title */}
        <h1
          ref={titleRef}
          className="text-4xl md:text-7xl font-serif leading-tight mb-8"
        >
          Corporate Law <br />
          <span className="text-white/90">Matters</span>
        </h1>

        {/* Divider line (premium touch) */}
        <div className="w-20 h-[2px] bg-[#c8a97e] mb-8" />

        {/* Button */}
        <button
          ref={btnRef}
          className="border border-[#c8a97e] text-[#c8a97e] px-10 py-3 tracking-[0.2em] hover:bg-[#c8a97e] hover:text-black transition duration-500"
        >
          VIEW MORE
        </button>
      </div>
    </section>
  );
};

export default HeroSection;
