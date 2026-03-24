"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import Image from "next/image";

const logos = [
  "/logos/logo1.svg",
  "/logos/logo2.svg",
  "/logos/logo3.svg",
  "/logos/logo4.svg",
  "/logos/logo5.svg"
];

export default function LogoSlider() {
  const sliderRef = useRef<HTMLDivElement>(null);
  const animationRef = useRef<gsap.core.Tween | null>(null);

  useEffect(() => {
    const el = sliderRef.current;
    if (!el) return;

    const totalWidth = el.scrollWidth / 2;

    animationRef.current = gsap.to(el, {
      x: `-=${totalWidth}`,
      duration: 25,
      ease: "none",
      repeat: -1,
    });

    return () => {
      animationRef.current?.kill();
    };
  }, []);

  return (
    <div className="relative w-full overflow-hidden bg-gray-100 py-12">
      
      {/* Left Gradient */}
      <div className="pointer-events-none absolute left-0 top-0 h-full w-32 bg-gradient-to-r from-gray-100 to-transparent z-10" />

      {/* Right Gradient */}
      <div className="pointer-events-none absolute right-0 top-0 h-full w-32 bg-gradient-to-l from-gray-100 to-transparent z-10" />

      {/* Slider */}
      <div
        ref={sliderRef}
        className="flex items-center gap-20 whitespace-nowrap"
        onMouseEnter={() => animationRef.current?.pause()}
        onMouseLeave={() => animationRef.current?.resume()}
      >
        {[...logos, ...logos].map((logo, index) => (
          <div key={index} className="flex-shrink-0">
            <Image
              src={logo}
              alt={`logo-${index}`}
              width={120}
              height={40}
              className="h-12 w-auto opacity-50 hover:opacity-100 transition duration-300 grayscale hover:grayscale-0"
            />
          </div>
        ))}
      </div>
    </div>
  );
}
