"use client";

import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function NewsletterSection() {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const items = ref.current?.querySelectorAll(".fade-up");

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
      className="relative py-24 px-6 md:px-20 bg-[#111]"
    >
      {/* Background glow */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(184,155,114,0.15),transparent_70%)]"></div>

      <div className="relative max-w-4xl mx-auto text-center">
        {/* Heading */}
        <div className="fade-up">
          <p className="text-sm tracking-[4px] text-[#b89b72] uppercase">
            Newsletter
          </p>

          <h2 className="text-4xl md:text-5xl font-serif text-white mt-4">
            Get Legal Tips in Your Inbox
          </h2>

          <p className="text-gray-400 mt-6 max-w-xl mx-auto leading-relaxed">
            Stay updated with the latest legal insights, expert advice, and
            important updates directly from our platform.
          </p>
        </div>

        {/* Input */}
        <form className="fade-up mt-10 flex flex-col md:flex-row items-center gap-4 justify-center">
          <input
            type="email"
            placeholder="Enter your email address"
            className="w-full md:w-96 px-5 py-3 rounded-md bg-white/10 border border-gray-600 text-white placeholder-gray-400 focus:outline-none focus:border-[#b89b72] transition"
          />

          <button
            type="submit"
            className="px-6 py-3 bg-[#b89b72] text-black font-semibold rounded-md hover:bg-[#a68a5f] transition"
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