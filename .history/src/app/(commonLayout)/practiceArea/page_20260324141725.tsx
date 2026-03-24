import { getPracticeAreas } from "@/lib/getPracticeAreas";
import Link from "next/link";

export default async function PracticeArea() {
  const data = await getPracticeAreas();

  return (
    <section className="py-20 px-6 bg-gradient-to-b from-white to-gray-50">
      
      {/* HEADER */}
      <div className="text-center mb-14">
        <h1 className="text-4xl font-bold">
          Our Legal Services
        </h1>
        <p className="text-gray-500 mt-3">
          Explore all the practice areas we specialize in
        </p>
      </div>

      {/* GRID */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
        
        {data.map((item: any) => (
          <Link key={item.id} href={`/practiceArea/${item.id}`}>
            
            <div className="group p-6 rounded-2xl border bg-white shadow-sm hover:shadow-2xl transition duration-300 cursor-pointer relative overflow-hidden">
              
              {/* Glow */}
              <div className="absolute inset-0 bg-linear-to-r from-blue-500/0 to-indigo-500/0 group-hover:from-blue-500/10 group-hover:to-indigo-500/10 transition duration-500"></div>

              {/* Icon or Initial */}
              <div className="mb-4">
                {item.icon ? (
                  <img
                    src={item.icon}
                    className="w-12 h-12 rounded-full object-cover"
                  />
                ) : (
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">
                    {item.title.charAt(0)}
                  </div>
                )}
              </div>

              {/* Title */}
              <h3 className="font-semibold text-gray-800 group-hover:text-blue-600 transition">
                {item.title}
              </h3>

              {/* Bottom line animation */}
              <div className="absolute bottom-0 left-0 h-1 w-0 bg-blue-600 group-hover:w-full transition-all duration-300"></div>

            </div>

          </Link>
        ))}

      </div>
    </section>
  );
}