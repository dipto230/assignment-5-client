"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // bg zoom
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 6, ease: "power2.out" }
    );

    // left content animation
    tl.fromTo(
      subtitleRef.current,
      { y: 40, opacity: 0 },
      { y: 0, opacity: 1, duration: 1.2 }
    )
      .fromTo(
        titleRef.current,
        { y: 60, opacity: 0 },
        { y: 0, opacity: 1, duration: 1.2 },
        "-=0.8"
      )
      .fromTo(
        btnRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.8 },
        "-=0.6"
      );

    // 🔥 right card animation
    gsap.fromTo(
      cardRef.current,
      { x: 80, opacity: 0 },
      {
        x: 0,
        opacity: 1,
        duration: 1.2,
        delay: 0.5,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section className="relative h-screen flex items-center text-white overflow-hidden">
      
      {/* BG */}
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/hero/law-hero.jpg')",
        }}
      />

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black/80 via-black/60 to-black/40" />

      {/* Layout */}
      <div className="relative z-10 w-full px-6 md:px-20 grid md:grid-cols-2 items-center">
        
        {/* 🔥 LEFT CONTENT */}
        <div className="max-w-xl">
          <p
            ref={subtitleRef}
            className="uppercase tracking-[0.3em] text-[#c8a97e] text-sm mb-6"
          >
            Full Range Legal Services
          </p>

          <h1
            ref={titleRef}
            className="text-4xl md:text-7xl font-serif leading-tight mb-8"
          >
            Corporate Law <br />
            <span className="text-white/90">Matters</span>
          </h1>

          <div className="w-20 h-[2px] bg-[#c8a97e] mb-8" />

          <button
            ref={btnRef}
            className="border border-[#c8a97e] text-[#c8a97e] px-10 py-3 tracking-[0.2em] hover:bg-[#c8a97e] hover:text-black transition duration-500"
          >
            VIEW MORE
          </button>
        </div>

        {/* 🔥 RIGHT PANEL */}
        <div className="hidden md:flex justify-end">
          <div
            ref={cardRef}
            className="backdrop-blur-md bg-white/5 border border-white/10 p-8 w-[320px]"
          >
            <h3 className="text-lg font-serif mb-4">
              Trusted Legal Expertise
            </h3>

            <p className="text-sm opacity-70 mb-6 leading-relaxed">
              Providing world-class corporate legal solutions for global clients
              with precision and integrity.
            </p>

            {/* stats */}
            <div className="space-y-4">
              <div className="flex justify-between text-sm">
                <span>Cases Won</span>
                <span className="text-[#c8a97e]">98%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Years Experience</span>
                <span className="text-[#c8a97e]">25+</span>
              </div>
              <div className="flex justify-between text-sm">
                <span>Global Clients</span>
                <span className="text-[#c8a97e]">1200+</span>
              </div>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default HeroSection;
