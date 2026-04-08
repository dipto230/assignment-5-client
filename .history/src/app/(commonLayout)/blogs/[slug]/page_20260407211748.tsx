import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    slug: "corporate-law-basics",
    title: "Corporate Law Basics for Startups",
    image: "/images/blog2.jpg",
    content: `Corporate law is essential for startups...`,
  },
  {
    slug: "how-to-file-case",
    title: "How to File a Legal Case",
    image: "/images/blog1.jpg",
    content: `Steps to file a legal case...`,
  },
  {
    slug: "contract-mistakes",
    title: "Top Mistakes in Legal Contracts",
    image: "/images/blog3.jpg",
    content: `Common contract mistakes...`,
  },
];

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  // ✅ MUST DO THIS
  const { slug } = await params;

  const blog = blogs.find((b) => b.slug === slug);

  if (!blog) {
    return <div className="p-20 text-center">Blog not found</div>;
  }

  return (
    <section>
      <div className="relative h-[350px]">
        <Image src={blog.image} alt={blog.title} fill className="object-cover" />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-white text-4xl font-serif text-center">
            {blog.title}
          </h1>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-6 py-16">
        <p className="whitespace-pre-line text-gray-700 text-lg">
          {blog.content}
        </p>

        <Link
          href="/blogs"
          className="inline-block mt-10 text-[#b89b72] border px-6 py-2 rounded-full hover:bg-[#b89b72] hover:text-white"
        >
          ← Back to Blogs
        </Link>
      </div>
    </section>
  );
}