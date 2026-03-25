"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalLoading() {
  const loaderRef = useRef<HTMLDivElement>(null);
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    // GSAP timeline for smooth looping animation
    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });
    const dots = dotsRef.current.children;

    tl.to(dots[0], { y: -10, duration: 0.3 })
      .to(dots[0], { y: 0, duration: 0.3 })
      .to(dots[1], { y: -10, duration: 0.3 }, "<0.15")
      .to(dots[1], { y: 0, duration: 0.3 })
      .to(dots[2], { y: -10, duration: 0.3 }, "<0.15")
      .to(dots[2], { y: 0, duration: 0.3 });

    return () => tl.kill();
  }, []);

  return (
    <div
      ref={loaderRef}
      className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-gradient-to-br from-purple-600 via-pink-500 to-indigo-500"
    >
      <h1 className="text-white text-3xl md:text-5xl font-extrabold mb-8 tracking-wide drop-shadow-lg">
        Loading...
      </h1>

      {/* Animated dots */}
      <div ref={dotsRef} className="flex space-x-3">
        <span className="w-4 h-4 bg-white rounded-full opacity-80"></span>
        <span className="w-4 h-4 bg-white rounded-full opacity-80"></span>
        <span className="w-4 h-4 bg-white rounded-full opacity-80"></span>
      </div>

      {/* Optional glowing effect */}
      <div className="absolute bottom-16 w-24 h-1 bg-white rounded-full opacity-20 animate-pulse"></div>
    </div>
  );
}