"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroFooter() {
  const imageRef = useRef<HTMLDivElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!imageRef.current || !contentRef.current) return;

    // 🔥 Background subtle zoom (premium feel)
    gsap.to(imageRef.current, {
      scale: 1.15,
      ease: "none",
      scrollTrigger: {
        trigger: imageRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });

    // 🔥 Content fade + slide up
    gsap.fromTo(
      contentRef.current,
      { y: 40, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1.2,
        ease: "power3.out",
      }
    );

    // 🔥 slight parallax on scroll
    gsap.to(contentRef.current, {
      y: -80,
      ease: "none",
      scrollTrigger: {
        trigger: contentRef.current,
        start: "top center",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* HERO BG */}
      <div ref={imageRef} className="absolute inset-0">
        <Image
          src="/images/hero1.jpeg"
          alt="hero"
          fill
          priority
          className="object-cover"
        />

        {/* 🔥 premium dark overlay */}
        <div className="absolute inset-0 bg-black/60" />
      </div>

      {/* CONTENT */}
      <div
        ref={contentRef}
        className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4"
      >
        <h1 className="text-4xl md:text-6xl font-serif tracking-wide mb-4">
          HIRING NEW INTERNS
        </h1>

        <p className="max-w-xl text-sm md:text-base opacity-80 mb-6 leading-relaxed">
          We are hiring at the moment. For all our current vacancies,
          see lower on this page. We are always excited to speak to
          anyone wishing to join the firm.
        </p>

        <button className="border border-white px-8 py-3 tracking-[0.2em] hover:bg-white hover:text-black transition duration-500">
          APPLY TODAY
        </button>
      </div>
    </section>
  );
}
    