"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

const HeroSection = () => {
  const subtitleRef = useRef<HTMLParagraphElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const btnRef = useRef<HTMLButtonElement>(null);
  const bgRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const extraTextRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const tl = gsap.timeline();

    // bg zoom
    gsap.fromTo(
      bgRef.current,
      { scale: 1.1 },
      { scale: 1, duration: 6, ease: "power2.out" }
    );

    // left animation
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

    // right card
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

    // stagger text
    gsap.fromTo(
      extraTextRef.current?.children,
      { y: 20, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 0.8,
        stagger: 0.2,
        delay: 1,
        ease: "power3.out",
      }
    );

    // slider
    gsap.to(sliderRef.current, {
      x: "-50%",
      duration: 20,
      ease: "linear",
      repeat: -1,
    });
  }, []);

  // scroll
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

          <div className="w-16 h-[2px] bg-[#c8a97e] mb-8 shadow-[0_0_10px_rgba(200,169,126,0.6)]" />

      
          <p className="text-white/60 text-sm md:text-base leading-relaxed mb-8 max-w-md">
            Delivering strategic legal solutions for high-stakes corporate
            matters, backed by decades of expertise and a commitment to
            excellence.
          </p>

          
          <div className="flex items-center gap-6 mb-10 text-xs tracking-[0.2em] text-white/40">
            <span>Trusted by Fortune 500</span>
            <span className="w-1 h-1 bg-[#c8a97e] rounded-full" />
            <span>Global Presence</span>
          </div>

          <button
            ref={btnRef}
            onClick={handleScroll}
            className="group relative overflow-hidden border border-[#c8a97e]/60 px-10 py-3 tracking-[0.25em] text-[#c8a97e] transition-all duration-500"
          >
            <span className="absolute inset-0 bg-[#c8a97e] translate-y-full group-hover:translate-y-0 transition-transform duration-500" />
            <span className="relative z-10 group-hover:text-black transition">
              VIEW MORE
            </span>
          </button>
        </div>

      
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

            <div ref={extraTextRef} className="mb-6 space-y-3">
              <p className="text-xs uppercase tracking-[0.3em] text-[#c8a97e]">
                Why Choose Us
              </p>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-[#c8a97e] rounded-full" />
                <span>Top-tier corporate advisors</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-[#c8a97e] rounded-full" />
                <span>Confidential & secure process</span>
              </div>

              <div className="flex items-center gap-2 text-sm">
                <div className="w-1.5 h-1.5 bg-[#c8a97e] rounded-full" />
                <span>Global legal partnerships</span>
              </div>

              <div className="text-xs text-white/60 leading-relaxed border-t border-white/10 pt-4">
                Our firm blends decades of legal excellence with modern strategy,
                ensuring every client receives elite-level representation tailored
                to complex corporate challenges.
              </div>
            </div>

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

     
      <div className="absolute bottom-0 left-0 w-full overflow-hidden border-t border-white/10 bg-black/40 backdrop-blur-md">
        <div
          ref={sliderRef}
          className="flex whitespace-nowrap text-sm tracking-[0.3em] text-white/60 py-4"
        >
          {[...Array(2)].map((_, i) => (
            <div key={i} className="flex gap-16 px-10">
              <span>Corporate Law</span>
              <span>Legal Advisory</span>
              <span>Global Compliance</span>
              <span>Contract Management</span>
              <span>Litigation Support</span>
              <span>Intellectual Property</span>
            </div>
          ))}
        </div>
      </div>

    </section>
  );
};

export default HeroSection;
