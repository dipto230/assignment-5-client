"use client";

import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/blogs";

export default function LegalBlogSection() {
  return (
    <section className="bg-[#f9f9f9] py-20 px-6 md:px-20">
      <div className="flex justify-between items-center mb-12">
        <div>
          <p className="text-sm tracking-[3px] text-[#b89b72] uppercase">
            Legal Resources
          </p>
          <h2 className="text-3xl md:text-4xl font-serif mt-3 text-gray-800">
            Latest Legal Insights & Blogs
          </h2>
        </div>

        <Link
          href="/blogs"
          className="border border-[#b89b72] px-5 py-2 rounded-full text-[#b89b72] hover:bg-[#b89b72] hover:text-white"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow hover:shadow-xl transition"
          >
            <div className="relative h-56">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-110 transition"
              />
            </div>

            <div className="p-6">
              <h3 className="text-lg font-semibold group-hover:text-[#b89b72]">
                {blog.title}
              </h3>
              <p className="text-sm text-gray-600 mt-2">
                {blog.content.slice(0, 80)}...
              </p>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}