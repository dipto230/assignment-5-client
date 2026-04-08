"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { useAuth } from "@/providers/AuthProvider";
import { useRouter } from "next/navigation";

const Navbar = () => {
  const { user, logout, loading } = useAuth();
  const router = useRouter();

  const [open, setOpen] = useState(false);
  const [search, setSearch] = useState("");
  const [chatOpen, setChatOpen] = useState(false);
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<{ role: "user" | "ai"; text: string }[]>([]);
  const [suggestions, setSuggestions] = useState<any[]>([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [mounted, setMounted] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  useEffect(() => setMounted(true), []);

  // NAVBAR ANIMATION
  useEffect(() => {
    if (navRef.current) {
      gsap.fromTo(
        navRef.current,
        { y: -80, opacity: 0 },
        { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
      );
    }
  }, []);

  useEffect(() => {
    if (open && dropdownRef.current) {
      gsap.fromTo(
        dropdownRef.current,
        { y: -10, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.3 }
      );
    }
  }, [open]);

  useEffect(() => {
    const handleScroll = () => {
      if (!navRef.current) return;
      if (window.scrollY > 50) navRef.current.classList.add("py-2", "shadow-lg");
      else navRef.current.classList.remove("py-2", "shadow-lg");
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await logout();
  };

  // AI SEARCH
  const handleSearch = async () => {
    if (!search) return;
    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/search`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query: search }),
      });
      const data = await res.json();
      console.log("🔍 SEARCH RESULT:", data);
    } catch (err) {
      console.error(err);
    }
  };

  // AUTO SUGGESTION
  useEffect(() => {
    if (!search) return setSuggestions([]);
    const delay = setTimeout(async () => {
      try {
        const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/search`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ query: search }),
        });
        const data = await res.json();
        setSuggestions(data?.data?.data || []);
        setShowSuggestions(true);
      } catch (err) {
        console.error(err);
      }
    }, 400);
    return () => clearTimeout(delay);
  }, [search]);

  // AI CHAT
  const sendMessage = async () => {
    if (!chatInput) return;
    const newMessages = [...messages, { role: "user" as "user", text: chatInput }];
    setMessages(newMessages);

    try {
      const res = await fetch(`${process.env.NEXT_PUBLIC_API_BASE_URL}/ai/chat`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: chatInput }),
      });
      const data = await res.json();
      setMessages([...newMessages, { role: "ai" as "ai", text: data.data }]);
    } catch (err) {
      console.error(err);
    }
    setChatInput("");
  };

  // ✅ FIX: prevent crash on first load
  if (!mounted || loading) return null;

  return (
    <>
      <nav
        ref={navRef}
        className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b transition-all duration-300 px-8 py-4 flex justify-between items-center"
      >
        {/* LOGO */}
        <Link href="/" className="text-2xl font-bold tracking-wide hover:scale-105 transition">
          Law<span className="text-blue-600">Hive</span>
        </Link>

        {/* NAV LINKS */}
        <div className="hidden md:flex gap-6 text-sm font-medium items-center">
          {/* SEARCH */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search lawyer..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              onFocus={() => setShowSuggestions(true)}
              onBlur={() => setTimeout(() => setShowSuggestions(false), 200)}
              onKeyDown={(e) => e.key === "Enter" && handleSearch()}
              className="px-4 py-1.5 rounded-full border text-sm outline-none focus:ring-2 focus:ring-blue-500 w-56"
            />

            {showSuggestions && suggestions.length > 0 && (
              <div className="absolute top-10 left-0 w-full bg-white shadow-xl rounded-md border z-50 max-h-60 overflow-y-auto">
                {suggestions.map((lawyer) => (
                  <div
                    key={lawyer.id || lawyer._id}
                    onClick={() => {
                      const id = lawyer.id || lawyer._id;
                      if (!id) return console.error("ID missing:", lawyer);
                      router.push(`/consultation/lawyer/${id}`);
                      setShowSuggestions(false);
                      setSearch("");
                    }}
                    className="px-4 py-3 hover:bg-gray-100 cursor-pointer"
                  >
                    <div className="font-medium">{lawyer.name}</div>
                    <div className="text-xs text-gray-500">
                      {lawyer.practiceAreas?.[0]?.practiceArea?.title}
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* AI CHAT BUTTON */}
          <button
            onClick={() => setChatOpen(true)}
            className="px-3 py-1.5 bg-black text-white rounded-full text-xs hover:bg-gray-800"
          >
            AI Chat
          </button>

          {/* SERVICES */}
          <div className="relative group">
            <span className="cursor-pointer">Services</span>
            <div className="absolute top-10 left-0 w-52 bg-white shadow-xl rounded-md opacity-0 invisible group-hover:opacity-100 group-hover:visible transition">
              <Link href="/practiceArea" className="block px-5 py-3 hover:bg-gray-100">
                Practice Area
              </Link>
              <Link href="/consultation" className="block px-5 py-3 hover:bg-gray-100">
                Consultation
              </Link>
            </div>
          </div>

          {["About Us", "Legal Aid", "NGO", "FAQs"].map((item) => (
            <Link key={item} href={`/${item.toLowerCase().replace(" ", "-")}`}>
              {item}
            </Link>
          ))}
        </div>

        {/* USER */}
        <div className="relative">
          {user ? (
            <>
              <button
                onClick={() => setOpen(!open)}
                className="w-10 h-10 rounded-full bg-blue-600 text-white"
              >
                {user?.image ? (
                  <Image
                    src={user.image || "/images/default-avatar.png"}
                    width={40}
                    height={40}
                    className="rounded-full"
                    alt="avatar"
                  />
                ) : (
                  getInitial()
                )}
              </button>

              {/* ✅ FIX: removed dropdownRef.current */}
              {open && (
                <div
                  ref={dropdownRef}
                  className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-xl border"
                >
                  <div className="px-4 py-2 text-xs border-b">
                    {user?.role}
                  </div>

                  <Link href="/dashboard" className="block px-4 py-3 hover:bg-gray-100">
                    Dashboard
                  </Link>

                  <Link href="/my-profile" className="block px-4 py-3 hover:bg-gray-100">
                    My Profile
                  </Link>

                  <button
                    onClick={handleLogout}
                    className="w-full text-left px-4 py-3 text-red-500 hover:bg-red-100"
                  >
                    Logout
                  </button>
                </div>
              )}
            </>
          ) : (
            <div className="flex gap-4">
              <Link href="/login">
                <button className="px-4 py-1.5 border rounded hover:bg-gray-100">
                  Login
                </button>
              </Link>

              <Link href="/register">
                <button className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700">
                  Register
                </button>
              </Link>
            </div>
          )}
        </div>
      </nav>

      {/* AI CHAT */}
      {chatOpen && (
        <div className="fixed bottom-5 right-5 w-80 bg-white shadow-2xl rounded-xl flex flex-col z-50">
          <div className="flex justify-between items-center p-3 border-b">
            <span className="font-semibold">AI Assistant</span>
            <button onClick={() => setChatOpen(false)}>✕</button>
          </div>

          <div className="h-64 overflow-y-auto p-3 space-y-2">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded text-sm ${
                  msg.role === "user"
                    ? "bg-blue-100 text-right"
                    : "bg-gray-100 text-left"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex border-t">
            <input
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              className="flex-1 px-3 py-2 text-sm outline-none"
              placeholder="Ask something..."
            />
            <button onClick={sendMessage} className="px-3 bg-blue-600 text-white">
              Send
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
