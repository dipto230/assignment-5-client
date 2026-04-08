/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PracticeAreaHighlight = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("https://assignment-5-backend-sepia.vercel.app/api/v1/practiceArea")
      .then((res) => res.json())
      .then((res) => setData(res.data || []));
  }, []);

  return (
    <section className="py-24 bg-gradient-to-b from-white via-[#f8f6f2] to-white">
      
      {/* Header */}
      <div className="text-center mb-16">
        <h2 className="text-4xl md:text-5xl font-serif tracking-wide text-gray-800 mb-4">
          Practice Areas
        </h2>

        <div className="w-16 h-[2px] bg-[#c8a97e] mx-auto mb-4 shadow-[0_0_8px_rgba(200,169,126,0.4)]" />

        <p className="text-gray-500 max-w-xl mx-auto">
          Explore our expertise across multiple legal domains with precision,
          trust, and excellence.
        </p>
      </div>

     
      <div className="flex flex-wrap justify-center gap-6 max-w-5xl mx-auto">

        {data.slice(0, 6).map((item: any, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative px-8 py-3 rounded-full border border-gray-200 bg-white/70 backdrop-blur-md shadow-md cursor-pointer overflow-hidden transition duration-500 hover:scale-105 hover:shadow-[0_10px_30px_rgba(0,0,0,0.1)]"
          >
            {/* 🔥 soft gold glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-[#c8a97e]/0 via-[#c8a97e]/10 to-[#c8a97e]/0 opacity-0 group-hover:opacity-100 transition duration-500" />

         
            <div className="absolute inset-0 rounded-full border border-[#c8a97e]/0 group-hover:border-[#c8a97e]/40 transition duration-500" />

           
            <span className="relative z-10 font-medium tracking-wide text-gray-700 group-hover:text-[#c8a97e] transition duration-300">
              {item.title}
            </span>

           
            <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-[1px] bg-[#c8a97e] group-hover:w-3/4 transition-all duration-500" />
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default PracticeAreaHighlight;
