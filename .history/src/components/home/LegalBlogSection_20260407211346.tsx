"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const blogs = [
  {
    slug: "how-to-file-case",
    title: "How to File a Legal Case in India",
    desc: "Step-by-step guide to filing a legal case with proper documentation.",
    image: "/images/blog1.jpg",
  },
  {
    slug: "corporate-law-basics",
    title: "Corporate Law Basics for Startups",
    desc: "Everything startup founders should know about legal compliance.",
    image: "/images/blog2.jpg",
  },
  {
    slug: "contract-mistakes",
    title: "Top Mistakes in Legal Contracts",
    desc: "Avoid common legal mistakes while drafting agreements.",
    image: "/images/blog3.jpg",
  },
];

export default function LegalBlogSection() {
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;

    const items = el.querySelectorAll(".fade-up");

    gsap.fromTo(
      items,
      { y: 80, opacity: 0 },
      {
        y: 0,
        opacity: 1,
        duration: 1,
        stagger: 0.2,
        scrollTrigger: {
          trigger: el,
          start: "top 80%",
        },
      }
    );
  }, []);

  return (
    <section ref={sectionRef} className="bg-[#f8f8f8] py-20 px-6 md:px-20">
      <div className="flex justify-between items-center mb-12 fade-up">
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
          className="text-[#b89b72] border border-[#b89b72] px-5 py-2 rounded-full hover:bg-[#b89b72] hover:text-white transition"
        >
          View All →
        </Link>
      </div>

      <div className="grid md:grid-cols-3 gap-8">
        {blogs.map((blog) => (
          <Link
            href={`/blogs/${blog.slug}`}
            key={blog.slug}
            className="fade-up group bg-white rounded-xl overflow-hidden shadow-md hover:shadow-xl transition"
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
              <h3 className="text-xl font-semibold group-hover:text-[#b89b72]">
                {blog.title}
              </h3>

              <p className="text-gray-600 text-sm mt-3">{blog.desc}</p>

              <span className="inline-block mt-4 text-[#b89b72]">
                Read More →
              </span>
            </div>
          </Link>
        ))}
      </div>
    </section>
  );
}