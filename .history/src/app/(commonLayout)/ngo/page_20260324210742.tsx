"use client";

import { useEffect, useRef } from "react";
import Image from "next/image";
import gsap from "gsap";

export default function NGOPage() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    gsap.to(".fade", {
      y: 0,
      opacity: 1,
      stagger: 0.12,
      duration: 0.9,
      ease: "power3.out",
      delay: 0.2,
    });
  }, []);

  return (
    <main ref={sectionRef} className="bg-white text-gray-900 overflow-hidden">

      {/* HERO */}
      <section className="py-32 text-center px-6">
        <p className="fade opacity-0 translate-y-10 text-xs tracking-[6px] text-[#b89b72] uppercase mb-6">
          NGO
        </p>

        <h1 className="fade opacity-0 translate-y-10 text-4xl md:text-6xl font-serif leading-tight mb-6">
          Justice Beyond <br /> Boundaries
        </h1>

        <p className="fade opacity-0 translate-y-10 max-w-2xl mx-auto text-gray-600 text-lg mb-10">
          We provide free legal support to those who cannot afford it,
          ensuring equal access to justice for every individual.
        </p>

        <button className="fade opacity-0 translate-y-10 border border-[#b89b72] text-[#b89b72] px-10 py-4 rounded-full hover:bg-[#b89b72] hover:text-white transition">
          Support Our Mission
        </button>
      </section>

      {/* PREMIUM IMAGE + TEXT SECTION */}
      <section className="py-28 px-6">
        <div className="max-w-7xl mx-auto grid md:grid-cols-2 gap-16 items-center">

          {/* LEFT BIG IMAGE */}
          <div className="relative w-full h-[400px] md:h-[550px] overflow-hidden rounded-3xl">
            <Image
              src="/images/scale.jpg"
              alt="NGO"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              className="object-cover transition duration-700 hover:scale-105"
              priority
            />
          </div>

          {/* RIGHT TEXT */}
          <div>
            <h2 className="fade opacity-0 translate-y-10 text-3xl md:text-4xl font-serif mb-6">
              Standing for Justice
            </h2>

            <p className="fade opacity-0 translate-y-10 text-gray-600 leading-relaxed text-lg mb-6">
              We believe that justice should be accessible to everyone. Our NGO
              works tirelessly to provide legal support and protect the rights
              of those who need it most.
            </p>

            <p className="fade opacity-0 translate-y-10 text-gray-600 leading-relaxed">
              Through awareness, legal aid, and community programs, we empower
              individuals to stand for their rights and build a fair society.
            </p>
          </div>

        </div>
      </section>

      {/* IMPACT */}
      <section className="py-20 border-t border-gray-200">
        <div className="max-w-5xl mx-auto grid grid-cols-2 md:grid-cols-4 text-center">

          <div className="fade opacity-0 translate-y-10 py-6">
            <h3 className="text-3xl font-semibold text-[#b89b72]">1200+</h3>
            <p className="text-gray-500 text-sm mt-2">People Helped</p>
          </div>

          <div className="fade opacity-0 translate-y-10 py-6">
            <h3 className="text-3xl font-semibold text-[#b89b72]">300+</h3>
            <p className="text-gray-500 text-sm mt-2">Cases Solved</p>
          </div>

          <div className="fade opacity-0 translate-y-10 py-6">
            <h3 className="text-3xl font-semibold text-[#b89b72]">80+</h3>
            <p className="text-gray-500 text-sm mt-2">Volunteers</p>
          </div>

          <div className="fade opacity-0 translate-y-10 py-6">
            <h3 className="text-3xl font-semibold text-[#b89b72]">10+</h3>
            <p className="text-gray-500 text-sm mt-2">Years Service</p>
          </div>

        </div>
      </section>

      {/* SERVICES */}
      <section className="py-28 px-6 max-w-6xl mx-auto">
        <h2 className="fade opacity-0 translate-y-10 text-3xl md:text-4xl font-serif text-center mb-16">
          What We Do
        </h2>

        <div className="grid md:grid-cols-3 gap-10 text-center">

          <div className="fade opacity-0 translate-y-10">
            <h3 className="text-xl font-semibold mb-3">Free Legal Aid</h3>
            <p className="text-gray-600">
              Providing legal assistance to those in need at no cost.
            </p>
          </div>

          <div className="fade opacity-0 translate-y-10">
            <h3 className="text-xl font-semibold mb-3">Awareness Programs</h3>
            <p className="text-gray-600">
              Educating communities about their legal rights.
            </p>
          </div>

          <div className="fade opacity-0 translate-y-10">
            <h3 className="text-xl font-semibold mb-3">Community Support</h3>
            <p className="text-gray-600">
              Helping vulnerable groups access justice and protection.
            </p>
          </div>

        </div>
      </section>

      {/* CTA */}
      <section className="py-32 text-center border-t border-gray-200 px-6">
        <h2 className="fade opacity-0 translate-y-10 text-3xl md:text-4xl font-serif mb-6">
          Be Part of the Change
        </h2>

        <p className="fade opacity-0 translate-y-10 text-gray-600 mb-10">
          Join us in making justice accessible for everyone.
        </p>

        <button className="fade opacity-0 translate-y-10 bg-[#b89b72] text-white px-10 py-4 rounded-full hover:opacity-90 transition">
          Become a Volunteer
        </button>
      </section>

    </main>
  );
}