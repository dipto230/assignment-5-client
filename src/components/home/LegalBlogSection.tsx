"use client";

import Image from "next/image";
import Link from "next/link";
import { blogs } from "@/lib/blogs";

export default function LegalBlogSection() {
  return (
    <section className="bg-[#f9f9f9] py-20 px-6 md:px-20">
      
      {/* Header */}
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
          className="border border-[#b89b72] px-5 py-2 rounded-full text-[#b89b72] hover:bg-[#b89b72] hover:text-white transition"
        >
          View All →
        </Link>
      </div>

      {/* Blog Grid (Only 4 blogs) */}
      <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
        {blogs.slice(0, 4).map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition duration-300"
          >
            {/* Image */}
            <div className="relative h-52 overflow-hidden">
              <Image
                src={blog.image}
                alt={blog.title}
                fill
                className="object-cover group-hover:scale-110 transition duration-500"
              />
            </div>

            {/* Content */}
            <div className="p-5">
              <h3 className="text-lg font-semibold text-gray-800 group-hover:text-[#b89b72] transition">
                {blog.title}
              </h3>

              <p className="text-sm text-gray-600 mt-2">
                {blog.content.slice(0, 80)}...
              </p>

              <span className="inline-block mt-4 text-sm text-[#b89b72] font-medium">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}