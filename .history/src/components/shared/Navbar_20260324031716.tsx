"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type User = {
  name?: string;
  email?: string;
  role?: "ADMIN" | "SUPER_ADMIN" | "LAWYER" | "USER";
};

export default function Navbar() {
  const [user, setUser] = useState<User | null>(null);
  const [open, setOpen] = useState(false);

  // 🔥 fetch user from server
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const res = await fetch("/api/me"); // 👉 we create this
        const data = await res.json();
        setUser(data);
      } catch (err) {
        setUser(null);
      }
    };

    fetchUser();
  }, []);

  // 🔥 role based dashboard
  const getDashboardLink = () => {
    if (!user?.role) return "/";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
      return "/admin/dashboard";
    if (user.role === "LAWYER") return "/lawyer/dashboard";
    return "/dashboard";
  };

  const handleLogout = async () => {
    await fetch("/api/logout");
    window.location.reload();
  };

  return (
    <nav className="flex items-center justify-between px-6 py-3 border-b shadow-sm bg-white">
      
      {/* 🔥 Logo */}
      <Link href="/" className="text-xl font-bold">
        Law<span className="text-blue-600">Connect</span>
      </Link>

      {/* 🔥 Menu */}
      <div className="hidden md:flex gap-6 text-sm">
        <Link href="/consultation">Consultation</Link>
        <Link href="/legal-aid">Legal Aid</Link>
        <Link href="/ngo">NGO</Link>
      </div>

      {/* 🔥 Right Side */}
      <div className="relative">
        {user ? (
          <>
            {/* 👤 Profile */}
            <button
              onClick={() => setOpen(!open)}
              className="px-3 py-1.5 border rounded-full"
            >
              {user.name || "User"}
            </button>

            {/* 🔽 Dropdown */}
            {open && (
              <div className="absolute right-0 mt-2 w-48 bg-white border rounded shadow">
                
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
              <button className="px-4 py-1.5 border rounded">
                Login
              </button>
            </Link>

            <Link href="/register">
              <button className="px-4 py-1.5 bg-blue-600 text-white rounded">
                Register
              </button>
            </Link>
          </div>
        )}
      </div>
    </nav>
  );
}