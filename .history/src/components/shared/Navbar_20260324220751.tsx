"use client";

import Link from "next/link";
import Image from "next/image";
import { useAuth } from "@/context/AuthProvider";
import { useState } from "react";

const Navbar = () => {
  const { user, setUser, loading } = useAuth();
  const [open, setOpen] = useState(false);

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });

    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav className="fixed top-0 w-full bg-white shadow px-8 py-4 flex justify-between items-center z-50">
      {/* LOGO */}
      <Link href="/" className="text-2xl font-bold">
        Law<span className="text-blue-600">Hive</span>
      </Link>

      {/* RIGHT SIDE */}
      <div className="relative">
        {/* 🔥 IMPORTANT: loading হলে কিছুই দেখাবে না */}
        {loading ? null : user ? (
          <>
            {/* USER AVATAR */}
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full bg-blue-600 text-white flex items-center justify-center font-bold"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  width={40}
                  height={40}
                  alt="avatar"
                  className="rounded-full"
                />
              ) : (
                getInitial()
              )}
            </button>

            {/* DROPDOWN */}
            {open && (
              <div className="absolute right-0 mt-3 w-48 bg-white shadow-lg rounded">
                <Link
                  href="/dashboard"
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
          /* 🔥 USER না থাকলে ONLY এইটা দেখাবে */
          <div className="flex gap-4">
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
};

export default Navbar;