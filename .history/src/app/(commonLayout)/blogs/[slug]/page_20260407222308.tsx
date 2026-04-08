import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/blogs";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return (
      <div className="p-20 text-center text-red-500 text-xl">
        Blog not found
      </div>
    );
  }

  return (
    <section className="bg-[#f8f7f4] text-[#1a1a1a]">
      
      {/* HERO */}
      <div className="relative h-[420px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center px-6">
          <h1 className="text-white text-4xl md:text-6xl font-serif font-semibold text-center max-w-4xl leading-tight tracking-wide">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* CONTENT SPLIT */}
      <div className="max-w-7xl mx-auto px-6 md:px-12 py-20 grid md:grid-cols-2 gap-16 items-start">
        
        {/* LEFT SIDE - TEXT */}
        <div>
          <h2 className="text-3xl md:text-4xl font-serif font-semibold mb-6 leading-snug">
            Insight & Perspective
          </h2>

          <p className="text-gray-700 text-lg leading-8 whitespace-pre-line">
            {blog.content}
          </p>

          <Link
            href="/blogs"
            className="inline-block mt-10 border border-[#b89b72] px-6 py-2 rounded-full text-[#b89b72] hover:bg-[#b89b72] hover:text-white transition"
          >
            ← Back to Blogs
          </Link>
        </div>

        {/* RIGHT SIDE - IMAGE + HIGHLIGHT */}
        <div className="space-y-6">
          <div className="relative h-[300px] w-full rounded-2xl overflow-hidden shadow-lg">
            <Image
              src={blog.image}
              alt={blog.title}
              fill
              className="object-cover"
            />
          </div>

          <div className="bg-white p-6 rounded-2xl shadow-md border">
            <h3 className="text-xl font-semibold mb-3 font-serif">
              Key Takeaway
            </h3>
            <p className="text-gray-600 leading-7">
              Strong legal foundations and structured decisions are what
              differentiate successful ventures from risky ones. Precision,
              compliance, and clarity define long-term growth.
            </p>
          </div>
        </div>
      </div>

      {/* RELATED BLOGS */}
      <div className="max-w-6xl mx-auto px-6 md:px-12 pb-20">
        <h3 className="text-3xl font-serif font-semibold mb-10">
          Related Insights
        </h3>

        <div className="grid md:grid-cols-3 gap-6">
          {blogs
            .filter((b) => b.slug !== slug)
            .slice(0, 3)
            .map((b) => (
              <Link
                key={b.slug}
                href={`/blogs/${b.slug}`}
                className="group block border rounded-2xl overflow-hidden bg-white hover:shadow-xl transition"
              >
                <div className="relative h-40 w-full">
                  <Image
                    src={b.image}
                    alt={b.title}
                    fill
                    className="object-cover group-hover:scale-105 transition"
                  />
                </div>

                <div className="p-4">
                  <h4 className="font-semibold text-lg group-hover:text-[#b89b72] transition">
                    {b.title}
                  </h4>
                </div>
              </Link>
            ))}
        </div>
      </div>
    </section>
  );
}