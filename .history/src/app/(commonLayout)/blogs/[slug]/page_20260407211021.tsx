import Image from "next/image";
import Link from "next/link";

const blogData: Record<string, any> = {
  "corporate-law-basics": {
    title: "Corporate Law Basics for Startups",
    image: "/images/blog2.jpg",
    content: `
      Corporate law is essential for startups to ensure compliance and smooth operations.

      1. Register your company properly
      2. Maintain legal documentation
      3. Protect intellectual property
      4. Follow tax regulations

      Ignoring these can lead to serious legal consequences.
    `,
  },

  "how-to-file-case": {
    title: "How to File a Legal Case",
    image: "/images/blog1.jpg",
    content: `
      Filing a case involves several steps:

      1. Consult a lawyer
      2. Prepare documents
      3. File petition in court
      4. Attend hearings

      Always ensure proper legal guidance.
    `,
  },
};

type Props = {
  params: { slug: string };
};

export default function BlogDetails({ params }: Props) {
  const blog = blogData[params.slug];

  if (!blog) {
    return <div className="p-20 text-center">Blog not found</div>;
  }

  return (
    <section className="bg-white">
      {/* HERO */}
      <div className="relative h-[300px] md:h-[400px]">
        <Image
          src={blog.image}
          alt={blog.title}
          fill
          className="object-cover"
        />

        <div className="absolute inset-0 bg-black/60 flex items-center justify-center">
          <h1 className="text-white text-3xl md:text-5xl font-serif text-center px-4">
            {blog.title}
          </h1>
        </div>
      </div>

      {/* CONTENT */}
      <div className="max-w-4xl mx-auto px-6 md:px-0 py-16">
        <p className="text-gray-700 leading-relaxed whitespace-pre-line text-lg">
          {blog.content}
        </p>

        {/* Back Button */}
        <Link
          href="/blogs"
          className="inline-block mt-10 text-[#b89b72] border border-[#b89b72] px-6 py-2 rounded-full hover:bg-[#b89b72] hover:text-white transition"
        >
          ← Back to Blogs
        </Link>
      </div>
    </section>
  );
}