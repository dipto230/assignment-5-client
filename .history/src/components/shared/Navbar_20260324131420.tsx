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

/* =========================
   🔥 TYPES
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

/* =========================
   🔥 CONTEXT
========================= */

const AuthContext = createContext<AuthContextType>({
  user: null,
  setUser: () => {},
  loading: true,
});

export const useAuth = () => useContext(AuthContext);

const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const fetchUser = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/v1/auth/me", {
        credentials: "include",
      });

      const json = await res.json();
      setUser(json?.data);
    } catch {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUser();
  }, []);

  return (
    <AuthContext.Provider value={{ user, setUser, loading }}>
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
  const dropdownRef = useRef<HTMLDivElement>(null);

  // 🔥 Get first letter
  const getInitial = () => {
    if (user?.name) return user.name.charAt(0).toUpperCase();
    if (user?.email) return user.email.charAt(0).toUpperCase();
    return "U";
  };

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

  const getDashboardLink = () => {
    if (!user?.role) return "/";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
      return "/admin/dashboard";
    if (user.role === "LAWYER") return "/lawyer/dashboard";
    return "/dashboard";
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
    <nav className="flex items-center justify-between px-6 py-3 border-b bg-white shadow-sm sticky top-0 z-50">
      
      {/* Logo */}
      <Link href="/" className="text-xl font-bold">
        Law<span className="text-blue-600">Connect</span>
      </Link>

      <div className="hidden md:flex gap-6 text-sm font-medium">
        <Link href="/consultation">Consultation</Link>
        <Link href="/legal-aid">Legal Aid</Link>
        <Link href="/ngo">NGO</Link>
      </div>

   
      <div className="relative" ref={dropdownRef}>
        {user ? (
          <>
            {/* 🔥 Avatar Button */}
            <button
              type="button"
              aria-label="Open user menu"
              title="Open user menu"
              onClick={() => setOpen(!open)}
              className="flex items-center justify-center w-10 h-10 rounded-full hover:bg-gray-100 transition"
            >
              {user?.image ? (
                <Image
                  src={user.image}
                  width={40}
                  height={40}
                  className="rounded-full object-cover"
                  alt="User avatar"
                />
              ) : (
                <div className="w-10 h-10 flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-indigo-600 text-white font-bold">
                  {getInitial()}
                </div>
              )}
            </button>

      
            {open && (
              <div className="absolute right-0 mt-2 w-52 bg-white border rounded-xl shadow-lg">
                
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
                  type="button"
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
              <button
                type="button"
                className="px-4 py-1.5 border rounded hover:bg-gray-100"
              >
                Login
              </button>
            </Link>

            <Link href="/register">
              <button
                type="button"
                className="px-4 py-1.5 bg-blue-600 text-white rounded hover:bg-blue-700"
              >
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