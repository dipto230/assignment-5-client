"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function HeroFooter() {
  const heroBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!heroBgRef.current) return;

    gsap.to(heroBgRef.current, {
      opacity: 0,
      scrollTrigger: {
        trigger: heroBgRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
      },
    });
  }, []);

  return (
    <section className="relative h-screen w-full overflow-hidden">
      
      {/* HERO BG */}
      <div ref={heroBgRef} className="absolute inset-0">
        <Image
          src="/images/hero1.jpg"
          alt="hero"
          fill
          priority
          className="object-cover"
        />
        <div className="absolute inset-0 bg-black/40" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4">
        <h1 className="text-5xl font-serif mb-4">
          HIRING NEW INTERNS
        </h1>
        <p className="max-w-xl mb-6 opacity-90">
          We are hiring at the moment. For all our current vacancies,
          see lower on this page.
        </p>
        <button className="border px-6 py-2 tracking-widest">
          APPLY TODAY
        </button>
      </div>
    </section>
  );
}
