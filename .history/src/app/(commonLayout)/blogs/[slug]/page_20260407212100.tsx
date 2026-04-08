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
    <section>
      {/* HERO */}
      <div className="relative h-[400px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/70 flex items-center justify-center px-4">
          <h1 className="text-white text-3xl md:text-5xl font-serif text-center max-w-3xl">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-3xl mx-auto px-6 py-16">
        <p className="whitespace-pre-line text-gray-700 text-lg leading-8">
          {blog.content}
        </p>

        <Link
          href="/blogs"
          className="inline-block mt-10 border px-6 py-2 rounded-full text-[#b89b72] hover:bg-[#b89b72] hover:text-white"
        >
          ← Back to Blogs
        </Link>

        {/* RELATED */}
        <div className="mt-16">
          <h3 className="text-2xl mb-6 font-semibold">Related Blogs</h3>

          <div className="grid md:grid-cols-2 gap-4">
            {blogs
              .filter((b) => b.slug !== slug)
              .map((b) => (
                <Link
                  key={b.slug}
                  href={`/blogs/${b.slug}`}
                  className="block p-4 border rounded hover:shadow"
                >
                  {b.title}
                </Link>
              ))}
          </div>
        </div>
      </div>
    </section>
  );
}