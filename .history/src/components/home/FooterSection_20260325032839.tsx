"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import Image from "next/image";

gsap.registerPlugin(ScrollTrigger);

export default function FooterSection() {
  const footerBgRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!footerBgRef.current) return;

    gsap.fromTo(
      footerBgRef.current,
      { opacity: 0 },
      {
        opacity: 1,
        scrollTrigger: {
          trigger: footerBgRef.current,
          start: "top bottom",
          end: "top center",
          scrub: true,
        },
      }
    );
  }, []);

  return (
    <footer className="relative text-white overflow-hidden">
      
      {/* FOOTER BG */}
      <div ref={footerBgRef} className="absolute inset-0 opacity-0">
        <Image
          src="/images/footer-bg.jpeg"
          alt="footer bg"
          fill
          className="object-cover"
        />
        <div className="absolute inset-0 bg-[#1f1f1f]/95" />
      </div>

      {/* CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-20 grid md:grid-cols-4 gap-10">
        
        <div>
          <h2 className="text-xl font-serif mb-4">GOLDENBLATT</h2>
          <p className="text-sm opacity-70 mb-2">
            48-49 Russell Square, WC1B 4JP
          </p>
          <p className="text-sm">📞 1 800 643 4300</p>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">SERVICES</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Labor and Employment</li>
            <li>Intellectual Property</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">LINKS</h3>
          <ul className="space-y-2 text-sm opacity-80">
            <li>Privacy Policy</li>
            <li>FAQ</li>
          </ul>
        </div>

        <div>
          <h3 className="mb-4 font-semibold">CONTACT</h3>
          <p>1-800-643-4300</p>
        </div>
      </div>

      <div className="relative z-10 text-center text-xs opacity-50 pb-6">
        © 2026 Goldenblatt
      </div>
    </footer>
  );
}
