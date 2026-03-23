"use client";

import Link from "next/link";

const Navbar = () => {
  // 👉 replace this with your auth logic
  const isLoggedIn = true;

  return (
    <header className="absolute top-0 left-0 w-full z-50 px-6 md:px-20 py-4 flex justify-between items-center text-white">
      {/* Logo */}
      <h1 className="text-xl font-bold">LAW FIRM</h1>

      {/* Menu */}
      <nav className="hidden md:flex gap-6">
        <Link href="/">Home</Link>
        <Link href="/about">About</Link>
        <Link href="/services">Services</Link>
      </nav>

      {/* Right side */}
      <div>
        {isLoggedIn ? (
          <div className="flex items-center gap-3">
            <img
              src="/images/profile.png"
              alt="profile"
              className="w-9 h-9 rounded-full border"
            />
            <span className="hidden md:block">Dipto</span>
          </div>
        ) : (
          <Link
            href="/login"
            className="border px-4 py-2 hover:bg-white hover:text-black transition"
          >
            Login
          </Link>
        )}
      </div>
    </header>
  );
};

export default Navbar;