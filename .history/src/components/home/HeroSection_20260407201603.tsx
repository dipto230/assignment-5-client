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

  
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 6, ease: "power2.out" }
    );

  
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


  const handleScroll = () => {
    const section = document.getElementById("next-section");
    section?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section className="relative h-screen flex items-center text-white overflow-hidden">
      
   
      <div
        ref={bgRef}
        className="absolute inset-0 bg-cover bg-center scale-105"
        style={{
          backgroundImage: "url('/images/hero/law-hero.jpg')",
        }}
      />

    
      <div className="absolute inset-0 bg-gradient-to-r from-black/90 via-black/70 to-black/40" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_50%,rgba(200,169,126,0.15),transparent_60%)]" />

     
      <div className="relative z-10 w-full px-6 md:px-20 grid md:grid-cols-2 items-center">
        
      
        <div className="max-w-xl">
          <p
            ref={subtitleRef}
            className="uppercase tracking-[0.35em] text-[#c8a97e] text-xs md:text-sm mb-6"
          >
            Full Range Legal Services
          </p>

          <h1
            ref={titleRef}
            className="text-4xl md:text-7xl font-serif leading-[1.1] mb-8"
          >
            Corporate Law <br />
            <span className="text-white/80">Matters</span>
          </h1>

         
          <div className="w-16 h-[2px] bg-[#c8a97e] mb-10 shadow-[0_0_10px_rgba(200,169,126,0.6)]" />

          <button
            ref={btnRef}
            onClick={handleScroll}
            className="group relative overflow-hidden border border-[#c8a97e]/60 px-10 py-3 tracking-[0.25em] text-[#c8a97e] transition-all duration-500"
          >
            {/* hover bg */}
            <span className="absolute inset-0 bg-[#c8a97e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />

            {/* text */}
            <span className="relative z-10 group-hover:text-black transition">
              VIEW MORE
            </span>
          </button>
        </div>

        {/* RIGHT */}
        <div className="hidden md:flex justify-end">
          <div
            ref={cardRef}
            className="backdrop-blur-xl bg-white/[0.04] border border-white/10 p-8 w-[340px] rounded-xl shadow-2xl hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)] transition duration-500"
          >
            <h3 className="text-lg font-serif mb-4 tracking-wide">
              Trusted Legal Expertise
            </h3>

            <p className="text-sm opacity-70 mb-6 leading-relaxed">
              Providing world-class corporate legal solutions for global clients
              with precision and integrity.
            </p>

            {/* stats */}
            <div className="space-y-4">
              {[
                ["Cases Won", "98%"],
                ["Years Experience", "25+"],
                ["Global Clients", "1200+"],
              ].map((item, i) => (
                <div
                  key={i}
                  className="flex justify-between text-sm border-b border-white/10 pb-2"
                >
                  <span>{item[0]}</span>
                  <span className="text-[#c8a97e] font-semibold">
                    {item[1]}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;
