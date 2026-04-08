import Link from "next/link";

const blogs = [
  { slug: "how-to-file-case", title: "How to File a Legal Case" },
  { slug: "corporate-law-basics", title: "Corporate Law Basics" },
  { slug: "contract-mistakes", title: "Contract Mistakes" },
];

export default function BlogsPage() {
  return (
    <div className="py-20 px-6 md:px-20">
      <h1 className="text-4xl font-serif mb-10">All Blogs</h1>

      <div className="space-y-4">
        {blogs.map((blog) => (
          <Link
            key={blog.slug}
            href={`/blogs/${blog.slug}`}
            className="block text-lg text-[#b89b72] hover:underline"
          >
            {blog.title}
          </Link>
        ))}
      </div>
    </div>
  );
}