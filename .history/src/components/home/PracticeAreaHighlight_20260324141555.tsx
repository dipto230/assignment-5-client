"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";

const PracticeAreaHighlight = () => {
  const [data, setData] = useState<any[]>([]);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/practiceArea")
      .then((res) => res.json())
      .then((res) => setData(res.data || []));
  }, []);

  return (
    <section className="py-20 bg-linear-to-b from-white to-gray-100">
      
      {/* Header */}
      <div className="text-center mb-12">
        <h2 className="text-4xl font-bold tracking-tight">
          Practice Areas
        </h2>
        <p className="text-gray-500 mt-2">
          Explore our expertise across multiple legal domains
        </p>
      </div>

      {/* Items */}
      <div className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto">
        
        {data.slice(0, 6).map((item: any, index) => (
          <motion.div
            key={item.id}
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
            className="group relative px-6 py-3 rounded-full bg-white/70 backdrop-blur-md border border-gray-200 shadow-md cursor-pointer overflow-hidden"
          >
            {/* Glow effect */}
            <div className="absolute inset-0 bg-linear-to-b from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition duration-500"></div>

            {/* Text */}
            <span className="relative z-10 font-medium text-gray-700 group-hover:text-blue-600 transition">
              {item.title}
            </span>

            {/* Bottom line */}
            <div className="absolute bottom-0 left-0 w-0 h-[2px] bg-blue-600 group-hover:w-full transition-all duration-300"></div>
          </motion.div>
        ))}

      </div>
    </section>
  );
};

export default PracticeAreaHighlight;