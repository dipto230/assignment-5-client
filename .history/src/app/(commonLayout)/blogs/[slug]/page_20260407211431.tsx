import Image from "next/image";
import Link from "next/link";

const blogs = [
  {
    slug: "corporate-law-basics",
    title: "Corporate Law Basics for Startups",
    image: "/images/blog2.jpg",
    content: `
Corporate law is essential for startups to ensure compliance.

1. Register your company properly
2. Maintain legal documents
3. Protect IP
4. Follow tax laws
    `,
  },
  {
    slug: "how-to-file-case",
    title: "How to File a Legal Case",
    image: "/images/blog1.jpg",
    content: `
1. Consult a lawyer
2. Prepare documents
3. File case
4. Attend hearings
    `,
  },
  {
    slug: "contract-mistakes",
    title: "Top Mistakes in Legal Contracts",
    image: "/images/blog3.jpg",
    content: `
1. Undefined terms
2. Missing clauses
3. No dispute policy
4. No lawyer review
    `,
  },
];

export default function BlogDetails({
  params,
}: {
  params: { slug: string };
}) {
  const blog = blogs.find((b) => b.slug === params.slug);

  if (!blog) {
    return <div className="p-20 text-center">Blog not found</div>;
  }

  return (
    <section>
      {/* HERO */}
      <div className="relative h-[350px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-white text-4xl font-serif text-center">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
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