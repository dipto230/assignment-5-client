"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return; // ensure the section exists

    // Select all elements with fade-up inside this section
    const items = gsap.utils.toArray<HTMLElement>(
      ref.current.querySelectorAll(".fade-up")
    );

    if (items.length === 0) return; // nothing to animate

    gsap.fromTo(
      items,
      { y: 60, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        stagger: 0.2,
        duration: 1,
        ease: "power3.out",
      }
    );
  }, []);

  return (
    <section
      ref={ref}
      className="relative py-24 px-6 md:px-20 bg-[#f8f7f4] pb-5"
    >
      {/* Soft luxury glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,114,0.12),transparent_70%)]"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <div className="fade-up">
          <p className="text-sm tracking-[4px] text-[#b89b72] uppercase">
            Newsletter
          </p>

          <h2 className="text-4xl md:text-5xl font-serif text-gray-900 mt-4">
            Get Legal Tips in Your Inbox
          </h2>

          <p className="text-gray-600 mt-6 max-w-xl mx-auto leading-relaxed">
            Stay updated with the latest legal insights, expert advice, and
            important updates directly from our platform.
          </p>
        </div>

        {/* Input Card */}
        <form className="fade-up mt-12 flex flex-col md:flex-row items-center gap-4 justify-center bg-white border border-gray-200 shadow-xl rounded-xl px-4 py-4 backdrop-blur-md">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-96 px-5 py-3 rounded-md bg-transparent border border-gray-300 text-gray-800 placeholder-gray-400 focus:outline-none focus:border-[#b89b72] transition"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-[#b89b72] text-white font-semibold rounded-md hover:bg-[#a68a5f] transition shadow-md"
          >
            Subscribe
          </button>
        </form>

        {/* Small note */}
        <p className="fade-up text-xs text-gray-500 mt-6">
          We respect your privacy. No spam, only valuable content.
        </p>
      </div>
    </section>
  );
}