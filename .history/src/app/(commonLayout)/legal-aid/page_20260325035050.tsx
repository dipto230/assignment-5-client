import React from "react";

const LegalAid = () => {
  return (
    <section className="relative text-white py-32 px-6 md:px-20 overflow-hidden">
      
      {/* 🔥 BG IMAGE */}
      <div
        className="absolute inset-0 bg-cover bg-center scale-110"
        style={{
          backgroundImage: "url('/images/legal-bg.jpg')",
        }}
      />

      {/* 🔥 DARK + GRADIENT OVERLAY */}
      <div className="absolute inset-0 bg-black/80" />
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/70 to-transparent" />

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto grid md:grid-cols-2 gap-20 items-center">
        
        {/* LEFT */}
        <div>
          <p className="uppercase tracking-[0.35em] text-[#c8a97e] text-xs mb-6">
            LEGAL AID
          </p>

          <h2 className="text-4xl md:text-6xl font-serif leading-tight mb-8">
            Trusted Legal Support <br />
            <span className="text-white/80">When It Matters Most</span>
          </h2>

          <p className="text-white/60 text-lg mb-10 leading-relaxed max-w-lg">
            Strategic legal solutions backed by decades of expertise,
            ensuring absolute discretion and unmatched precision.
          </p>

          <button className="border border-[#c8a97e] text-[#c8a97e] px-12 py-4 tracking-[0.25em] hover:bg-[#c8a97e] hover:text-black transition duration-500">
            GET CONSULTATION
          </button>
        </div>

        {/* RIGHT - REAL PREMIUM CARD */}
        <div className="flex justify-end">
          <div className="relative w-[380px] p-10 backdrop-blur-xl bg-white/5 border border-white/10 shadow-[0_0_40px_rgba(200,169,126,0.15)]">
            
            {/* subtle glow */}
            <div className="absolute inset-0 border border-[#c8a97e]/20 pointer-events-none" />

            <p className="text-lg italic text-white/80 leading-relaxed mb-8">
              “Their legal expertise and professionalism exceeded our expectations.
              Every step was handled with precision and complete transparency.”
            </p>

            <div className="w-16 h-[2px] bg-[#c8a97e] mb-6" />

            <h4 className="text-lg font-semibold">
              Jonathan Reeves
            </h4>
            <p className="text-sm text-white/50 mb-8">
              CEO, Reeves Holdings
            </p>

            <div className="flex justify-between text-sm text-white/60 border-t border-white/10 pt-6">
              <span>500+ Cases</span>
              <span>98% Success</span>
              <span>20+ Years</span>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
};

export default LegalAid;
