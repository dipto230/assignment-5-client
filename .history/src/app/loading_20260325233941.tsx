"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function GlobalLoading() {
  const dotsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!dotsRef.current) return;

    const tl = gsap.timeline({ repeat: -1, defaults: { ease: "power1.inOut" } });
    const dots = dotsRef.current.children;

    tl.to(dots[0], { y: -6, duration: 0.3 })
      .to(dots[0], { y: 0, duration: 0.3 })
      .to(dots[1], { y: -6, duration: 0.3 }, "<0.15")
      .to(dots[1], { y: 0, duration: 0.3 })
      .to(dots[2], { y: -6, duration: 0.3 }, "<0.15")
      .to(dots[2], { y: 0, duration: 0.3 });

    return () => tl.kill();
  }, []);

  return (
    <div className="fixed inset-0 z-50 flex flex-col justify-center items-center bg-white">
      <h1 className="text-gray-900 text-2xl md:text-4xl font-semibold mb-6 tracking-wide">
        Loading
      </h1>

      {/* Minimal dots */}
      <div ref={dotsRef} className="flex space-x-2">
        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
        <span className="w-3 h-3 bg-gray-800 rounded-full"></span>
      </div>
    </div>
  );
}