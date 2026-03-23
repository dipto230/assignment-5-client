"use client";

import Link from "next/link";
import { useEffect, useState, useRef } from "react";

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: "ADMIN" | "SUPER_ADMIN" | "LAWYER" | "USER";
  image?: string;
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 Fetch user
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch(
          "http://localhost:5000/api/v1/auth/me",
          {
            credentials: "include",
          }
        );

        const json = await res.json();
        setUser(json?.data); // ✅ correct structure
      } catch {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // 🔥 Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(e.target as Node)
      ) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () =>
      document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  // 🔥 Role based routing
  const getDashboardLink = () => {
    if (!user?.role) return "/";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
      return "/admin/dashboard";
    if (user.role === "LAWYER") return "/lawyer/dashboard";
    return "/dashboard";
  };

  // 🔥 Logout
  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm sticky top-0 z-50">
      
      {/* 🔥 Logo */}
      <Link href="/" className="text-xl font-bold">
        Law<span className="text-blue-600">Connect</span>
      </Link>

      {/* 🔥 Menu */}
      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="/consultation">Consultation</Link>
        <Link href="/legal-aid">Legal Aid</Link>
        <Link href="/ngo">NGO</Link>
      </div>

      {/* 🔥 Right */}
      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            {/* 👤 Avatar + Name */}
            <button
              onClick={() => setOpen(!open)}
              className="flex items-center gap-2 border px-3 py-1.5 rounded-full hover:bg-gray-100 transition"
            >
              <img
                src={user?.image || "/default-avatar.png"}
                className="w-8 h-8 rounded-full object-cover"
                alt="avatar"
              />
              <span className="text-sm hidden md:block">
                {user?.name || user?.email}
              </span>
            </button>

            {/* 🔽 Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg overflow-hidden animate-in fade-in zoom-in-95">
                
                {/* Role Badge */}
                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  {user.role}
                </div>

                <Link
                  href={getDashboardLink()}
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                <Link
                  href="/my-profile"
                  className="block px-4 py-2 hover:bg-gray-100"
                >
                  My Profile
                </Link>

                <button
                  onClick={handleLogout}
                  className="w-full text-left px-4 py-2 text-red-500 hover:bg-red-100"
                >
                  Logout
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="flex gap-3">
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
  );
}