"use client";

import Image from "next/image";
import { useEffect, useRef } from "react";
import gsap from "gsap";

const CorporateSection = () => {
  const sectionRef = useRef<HTMLDivElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      // 🔥 LEFT SIDE PREMIUM STAGGER ANIMATION
      gsap.from(".corp-text", {
        y: 40,
        opacity: 0,
        duration: 1,
        stagger: 0.2,
        ease: "power3.out",
      });

      gsap.from(".corp-title", {
        y: 80,
        opacity: 0,
        duration: 1.2,
        ease: "power4.out",
      });

      gsap.from(".corp-btn", {
        y: 20,
        opacity: 0,
        duration: 0.8,
        delay: 0.6,
        ease: "power3.out",
      });

      // 🔥 IMAGE SLIDER
      gsap.to(sliderRef.current, {
        x: "-100%",
        duration: 20,
        ease: "linear",
        repeat: -1,
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section
      ref={sectionRef}
      id="next-section"
      className="grid md:grid-cols-2 min-h-[80vh]"
    >
      {/* LEFT */}
      <div className="flex flex-col justify-center px-10 py-16 bg-[#f8f6f2]">
        <span className="corp-text text-sm tracking-widest text-gray-500 mb-4">
          FIELDS OF EXPERTISE
        </span>

        <h2 className="corp-title text-4xl md:text-5xl font-serif font-semibold leading-tight text-gray-800 mb-6">
          Advice on a Full Range of Corporate Law Matters
        </h2>

        <p className="corp-text text-gray-600 mb-8 max-w-lg">
          Bring to the table win-win survival strategies to ensure proactive
          domination. At the end of the day, going forward, a new normal that
          has evolved from generation X is on the runway heading towards a
          streamlined cloud solution.
        </p>

        <button className="corp-btn border border-gray-800 px-6 py-3 w-fit tracking-wide hover:bg-black hover:text-white transition">
          REQUEST FREE CONSULTATION
        </button>
      </div>

      {/* RIGHT IMAGE SLIDER */}
      <div className="relative overflow-hidden">
        <div
          ref={sliderRef}
          className="flex w-[300%] h-full"
        >
          {/* IMAGE 1 */}
          <div className="relative w-full h-[80vh]">
            <Image
              src="/images/corporate.jpg"
              alt="corporate meeting"
              fill
              className="object-cover"
            />
          </div>

          {/* IMAGE 2 */}
          <div className="relative w-full h-[80vh]">
            <Image
              src="/images/corporate2.jpg"
              alt="corporate law"
              fill
              className="object-cover"
            />
          </div>

          {/* IMAGE 3 */}
          <div className="relative w-full h-[80vh]">
            <Image
              src="/images/corporate3.jpg"
              alt="legal team"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default CorporateSection;
