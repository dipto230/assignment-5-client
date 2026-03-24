"use client";

import { useEffect, useState } from "react";

const PracticeAreaHighlight = () => {
  const [data, setData] = useState<any[]>([]); // ✅ FIX

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/practiceArea")
      .then((res) => res.json())
      .then((res) => setData(res.data || [])); // ✅ safety
  }, []);

  return (
    <section className="py-16 bg-gray-50">
      
      <h2 className="text-3xl font-bold text-center mb-10">
        Practice Areas
      </h2>

      <div className="flex flex-wrap justify-center gap-4">
        
        
        {data.slice(0, 6).map((item: any) => (
          <div
            key={item.id}
            className="px-5 py-3 rounded-full bg-white shadow hover:bg-blue-600 hover:text-white transition cursor-pointer"
          >
            {item.title}
          </div>
        ))}

      </div>
    </section>
  );
};

export default PracticeAreaHighlight;