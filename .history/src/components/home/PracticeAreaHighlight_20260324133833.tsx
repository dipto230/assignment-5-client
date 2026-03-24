"use client";

export default function PracticeAreaHighlight({ data }: any) {
  return (
    <section className="py-16 px-6 bg-gray-50">
      <h2 className="text-3xl font-bold text-center mb-10">
        Our Legal Expertise
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
}