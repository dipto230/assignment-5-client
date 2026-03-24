"use client";

import Image from "next/image";
import Link from "next/link";
import {
  createContext,
  useContext,
  useEffect,
  useState,
  useRef,
} from "react";
import gsap from "gsap";

/* =========================
   🔥 TYPES + CONTEXT SAME
========================= */

type User = {
  id?: string;
  name?: string;
  email?: string;
  role?: "ADMIN" | "SUPER_ADMIN" | "LAWYER" | "USER";
  image?: string;
};

type AuthContextType = {
  user: User | null;
  setUser: (user: User | null) => void;
  loading: boolean;
};

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/v1/auth/me", {
      credentials: "include",
    })
      .then((res) => res.json())
      .then((json) => setUser(json?.data))
      .catch(() => setUser(null));
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading: false }}>
      {children}
    </AuthContext.Provider>
  );
};

/* =========================
   🔥 NAVBAR
========================= */

const NavbarContent = () => {
  const { user, setUser } = useAuth();
  const [open, setOpen] = useState(false);

  const navRef = useRef<HTMLDivElement>(null);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

  /* 🔥 GSAP ENTRY ANIMATION */
  useEffect(() => {
    gsap.fromTo(
      navRef.current,
      { y: -80, opacity: 0 },
      { y: 0, opacity: 1, duration: 1, ease: "power3.out" }
    );
  }, []);


  useEffect(() => {
    if (open) {
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

      if (window.scrollY > 50) {
        navRef.current.classList.add("py-2", "shadow-lg");
      } else {
        navRef.current.classList.remove("py-2", "shadow-lg");
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogout = async () => {
    await fetch("http://localhost:5000/api/v1/auth/logout", {
      method: "POST",
      credentials: "include",
    });
    setUser(null);
    window.location.href = "/";
  };

  return (
    <nav
      ref={navRef}
      className="fixed top-0 w-full z-50 backdrop-blur-md bg-white/70 border-b transition-all duration-300 px-8 py-4 flex justify-between items-center"
    >
   
      <Link
        href="/"
        className="text-2xl font-bold tracking-wide hover:scale-105 transition"
      >
        Law<span className="text-blue-600">Hive</span>
      </Link>

    
      <div className="hidden md:flex gap-10 text-sm font-medium">
        {["Consultation", "Legal Aid", "NGO"].map((item) => (
          <Link
            key={item}
            href={`/${item.toLowerCase().replace(" ", "-")}`}
            className="relative group"
          >
            {item}
            <span className="absolute left-0 -bottom-1 w-0 h-[2px] bg-blue-600 transition-all group-hover:w-full"></span>
          </Link>
        ))}
      </div>

  
      <div className="relative">
        {user ? (
          <>
            <button
              onClick={() => setOpen(!open)}
              className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold hover:scale-110 transition"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  width={40}
                  height={40}
                  className="rounded-full"
                  alt="avatar"
                />
              ) : (
                getInitial()
              )}
            </button>

            {open && (
              <div
                ref={dropdownRef}
                className="absolute right-0 mt-3 w-56 bg-white rounded-xl shadow-2xl border overflow-hidden"
              >
                <div className="px-4 py-2 text-xs text-gray-500 border-b">
                  {user.role}
                </div>

                <Link
                  href="/dashboard"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
                  Dashboard
                </Link>

                <Link
                  href="/my-profile"
                  className="block px-4 py-3 hover:bg-gray-100"
                >
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
  );
};



export default function Navbar() {
  return (
    <AuthProvider>
      <NavbarContent />
    </AuthProvider>
  );
}