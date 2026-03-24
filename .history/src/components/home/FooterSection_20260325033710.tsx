"use client";

import Image from "next/image";

export default function FooterSection() {
  return (
    <footer className="relative text-white overflow-hidden mt-32">
      
      {/* 🔥 BACKGROUND (static premium) */}
      <div className="absolute inset-0">
        <Image
          src="/images/footer-bg.jpg"
          alt="footer bg"
          fill
          className="object-cover"
        />

        {/* premium dark overlay */}
        <div className="absolute inset-0 bg-[#0f0f0f]/95" />
      </div>

      {/* 🔥 CONTENT */}
      <div className="relative z-10 max-w-7xl mx-auto px-6 py-24 grid md:grid-cols-4 gap-12">
        
        {/* LOGO + INFO */}
        <div>
          <h2 className="text-2xl font-serif mb-4 tracking-wide">
            LawHive
          </h2>

          <p className="text-sm opacity-70 mb-3 leading-relaxed">
            48–49 Russell Square  
            <br />
            WC1B 4JP, London
          </p>

          <p className="text-sm opacity-80 mb-1">📞 1 800 643 4300</p>
          <p className="text-sm opacity-80">✉ info@goldenblatt.co.uk</p>
        </div>

        {/* SERVICES */}
        <div>
          <h3 className="mb-5 text-sm tracking-[0.2em] text-[#c8a97e]">
            SERVICES
          </h3>

          <ul className="space-y-3 text-sm opacity-80">
            <li className="hover:text-white transition">Labor & Employment</li>
            <li className="hover:text-white transition">Intellectual Property</li>
            <li className="hover:text-white transition">Construction Law</li>
            <li className="hover:text-white transition">Banking & Finance</li>
          </ul>
        </div>

        {/* LINKS */}
        <div>
          <h3 className="mb-5 text-sm tracking-[0.2em] text-[#c8a97e]">
            LINKS
          </h3>

          <ul className="space-y-3 text-sm opacity-80">
            <li className="hover:text-white transition">Privacy Policy</li>
            <li className="hover:text-white transition">Terms & Conditions</li>
            <li className="hover:text-white transition">Cookie Policy</li>
            <li className="hover:text-white transition">FAQ</li>
          </ul>
        </div>

        {/* CONTACT BOX */}
        <div>
          <h3 className="mb-5 text-sm tracking-[0.2em] text-[#c8a97e]">
            FREE CONSULTATION
          </h3>

          <div className="flex items-center border border-gray-700 hover:border-[#c8a97e] transition">
            <span className="bg-[#c8a97e] text-black px-4 py-3">
              📞
            </span>
            <span className="px-4 py-3 tracking-wide">
              1-800-643-4300
            </span>
          </div>

          <p className="text-xs opacity-50 mt-4 leading-relaxed">
            Calls may be recorded for quality and training purposes.
          </p>
        </div>
      </div>

      {/* 🔥 BOTTOM LINE */}
      <div className="relative z-10 border-t border-white/10 text-center text-xs opacity-50 py-6">
        © 2026 LawHive. All rights reserved.
      </div>
    </footer>
  );
}
