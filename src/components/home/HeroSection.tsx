"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    tl.fromTo(
      subtitleRef.current,
      { y: 50, opacity: 0 },
      { y: 0, opacity: 1, duration: 1 }
    )
      .fromTo(
        titleRef.current,
        { y: 80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1 },
        "-=0.5"
      )
      .fromTo(
        btnRef.current,
        { scale: 0.8, opacity: 0 },
        { scale: 1, opacity: 1, duration: 0.6 },
        "-=0.3"
      );
  }, []);

  return (
    <section className="relative h-screen flex items-center text-white overflow-hidden">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/images/hero/law-hero.jpg')",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70"></div>

      {/* Content */}
      <div className="relative z-10 px-6 md:px-20 max-w-4xl">
        <p
          ref={subtitleRef}
          className="uppercase tracking-widest text-gray-300 mb-4"
        >
          Full Range
        </p>

        <h1
          ref={titleRef}
          className="text-4xl md:text-6xl font-bold leading-tight mb-6"
        >
          Corporate <br /> Law Matters
        </h1>

        <button
          ref={btnRef}
          className="border border-white px-8 py-3 hover:bg-white hover:text-black transition duration-300"
        >
          View More
        </button>
      </div>
    </section>
  );
};

export default HeroSection;