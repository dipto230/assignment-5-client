import React from "react";

const LegalAid = () => {
  return (
    <section className="relative text-white py-28 px-6 md:px-20 overflow-hidden">
      
      {/* 🔥 BACKGROUND IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{
          backgroundImage: "url('/images/legal-bg.jpg')",
        }}
      />

      {/* 🔥 DARK OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-6xl mx-auto grid md:grid-cols-2 gap-16 items-center">
        
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.3em] text-[#c8a97e] text-sm mb-4">
            Legal Aid
          </p>

          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            Trusted Legal Support <br /> When It Matters Most
          </h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            We provide strategic legal solutions backed by years of experience,
            ensuring every client receives tailored guidance with absolute
            confidentiality and precision.
          </p>

          <button className="border border-[#c8a97e] text-[#c8a97e] px-10 py-3 tracking-[0.2em] hover:bg-[#c8a97e] hover:text-black transition duration-500">
            GET CONSULTATION
          </button>
        </div>

        {/* RIGHT - TESTIMONIAL CARD */}
        <div className="backdrop-blur-lg bg-white/5 border border-white/10 p-8 md:p-10">
          
          {/* quote */}
          <p className="text-lg italic text-white/80 leading-relaxed mb-6">
            “Their legal expertise and professionalism exceeded our expectations.
            Every step was handled with precision and complete transparency.”
          </p>

          {/* divider */}
          <div className="w-12 h-[2px] bg-[#c8a97e] mb-6" />

          {/* user */}
          <div>
            <h4 className="font-semibold text-white">
              Jonathan Reeves
            </h4>
            <p className="text-sm text-white/60">
              CEO, Reeves Holdings
            </p>
          </div>

          {/* subtle stats */}
          <div className="mt-8 pt-6 border-t border-white/10 flex justify-between text-sm text-white/70">
            <span>500+ Cases</span>
            <span>98% Success</span>
            <span>20+ Years</span>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LegalAid;
