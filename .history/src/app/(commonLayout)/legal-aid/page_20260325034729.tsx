import React from "react";

const LegalAid = () => {
  return (
    <section className="bg-[#0f0f0f] text-white py-24 px-6 md:px-20">
      
      <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-12 items-center">
        
        {/* LEFT CONTENT */}
        <div>
          <p className="uppercase tracking-[0.3em] text-[#c8a97e] text-sm mb-4">
            Legal Aid
          </p>

          <h2 className="text-3xl md:text-5xl font-serif mb-6 leading-tight">
            Get Expert Legal <br /> Assistance Today
          </h2>

          <p className="text-white/70 mb-8 leading-relaxed">
            Our experienced legal professionals are ready to guide you through
            complex legal matters with precision, discretion, and confidence.
          </p>

          <button className="border border-[#c8a97e] text-[#c8a97e] px-8 py-3 tracking-[0.2em] hover:bg-[#c8a97e] hover:text-black transition duration-500">
            GET CONSULTATION
          </button>
        </div>

        {/* RIGHT CARD */}
        <div className="bg-white/5 border border-white/10 p-8 backdrop-blur-md">
          
          <h3 className="text-xl font-serif mb-6">
            Why Choose Us
          </h3>

          <ul className="space-y-5 text-sm text-white/80">
            <li className="flex items-start gap-3">
              <span className="text-[#c8a97e]">✔</span>
              Experienced & Certified Lawyers
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#c8a97e]">✔</span>
              100% Confidential Consultation
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#c8a97e]">✔</span>
              Fast & Reliable Case Handling
            </li>

            <li className="flex items-start gap-3">
              <span className="text-[#c8a97e]">✔</span>
              Trusted by Global Clients
            </li>
          </ul>
        </div>

      </div>
    </section>
  );
};

export default LegalAid;
