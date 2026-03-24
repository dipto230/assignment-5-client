"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { Scale, Gavel, Building2, Briefcase } from "lucide-react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Stats data
const stats = [
  { id: 1, icon: Briefcase, value: 5678, label: "Solved Cases" },
  { id: 2, icon: Building2, value: 25, label: "Partners" },
  { id: 3, icon: Scale, value: 20, label: "Staff Members" },
  { id: 4, icon: Gavel, value: 50, label: "Top Lawyers" },
];

export default function PremiumStatsSection() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [startCount, setStartCount] = useState(false);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".fade-up");

    gsap.fromTo(
      items,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
          onEnter: () => setStartCount(true),
        },
      }
    );
  }, []);

  return (
    <section
      ref={sectionRef}
      className="grid md:grid-cols-2 min-height: 500px"
    >
      {/* LEFT SIDE */}
      <div className="bg-[#f4f4f4] flex flex-col justify-center px-6 md:px-20 py-16">
        <div className="fade-up">
          <div className="text-6xl text-[#b89b72] mb-6">“</div>

          <h2 className="text-3xl md:text-4xl font-serif tracking-wide mb-6 text-gray-800">
            BEST LEGAL SERVICE I RECEIVED
          </h2>

          <p className="text-gray-600 leading-relaxed max-w-md">
            As far as this work was concerned, I can say that my wife and I
            have been extremely impressed with the efficiency and
            professionalism.
          </p>

          {/* Avatar with next/image */}
          <div className="flex items-center gap-4 mt-8">
            <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-[#b89b72] shadow-lg hover:scale-110 transition duration-300">
              <Image
                src="/images/client.jpg"
                alt="Anthony Johnson"
                width={48}
                height={48}
                className="object-cover w-full h-full"
              />
            </div>

            <div>
              <h4 className="font-semibold text-[#b89b72]">
                Anthony Johnson
              </h4>
              <p className="text-sm text-gray-500">Client</p>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="bg-[#1f1f1f] text-white grid grid-cols-2">
        {stats.map((stat) => {
          const Icon = stat.icon;

          return (
            <div
              key={stat.id}
              className="fade-up flex flex-col items-center justify-center border border-gray-700 py-10"
            >
              <Icon size={40} className="text-[#b89b72] mb-4" />

              <h3 className="text-3xl font-bold">
                {startCount ? <Counter end={stat.value} /> : 0}
              </h3>

              <p className="text-sm text-gray-400 mt-2 uppercase tracking-widest">
                {stat.label}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

// Counter
function Counter({ end }: { end: number }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    let start = 0;
    const duration = 2000;
    const increment = end / (duration / 16);

    const counter = setInterval(() => {
      start += increment;
      if (start >= end) {
        setCount(end);
        clearInterval(counter);
      } else {
        setCount(Math.floor(start));
      }
    }, 16);

    return () => clearInterval(counter);
  }, [end]);

  return <span>{count}</span>;
}