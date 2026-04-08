import Link from "next/link";
import { blogs } from "@/lib/blogs";

export default function BlogsPage() {
  return (
    <div className="py-20 px-6 md:px-20">
      <h1 className="text-4xl font-serif mb-10">All Blogs</h1>

      <div className="grid md:grid-cols-2 gap-6">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="block p-6 border rounded-lg hover:shadow"
          >
            <h2 className="text-xl font-semibold text-[#b89b72]">
              {blog.title}
            </h2>
          </Link>
        ))}
      </div>
    </div>
  );
}