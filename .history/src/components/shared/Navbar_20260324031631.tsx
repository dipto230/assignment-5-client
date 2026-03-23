import Link from "next/link";
import { getUserInfo } from "@/lib/refreshToken";

export default async function Navbar() {
  const data = await getUserInfo();

  const user = data?.user; // 🔥 THIS IS THE FIX

  const getDashboardLink = () => {
    if (!user?.role) return "/";
    if (user.role === "ADMIN" || user.role === "SUPER_ADMIN")
      return "/admin/dashboard";
    if (user.role === "LAWYER") return "/lawyer/dashboard";
    return "/dashboard";
  };

  return (
    <nav className="flex justify-between px-6 py-3 border bg-white">
      
      {/* Logo */}
      <Link href="/" className="font-bold text-lg">
        Law<span className="text-blue-600">Connect</span>
      </Link>

      {/* Menu */}
      <div className="flex gap-6 text-sm">
        <Link href="/consultation">Consultation</Link>
        <Link href="/legal-aid">Legal Aid</Link>
        <Link href="/ngo">NGO</Link>
      </div>

      {/* Right Side */}
      <div>
        {user ? (
          <div className="flex items-center gap-4">
            
            {/* 👤 Email */}
            <span className="text-sm text-gray-600">
              {user.email}
            </span>

            {/* Dashboard */}
            <Link
              href={getDashboardLink()}
              className="px-3 py-1 border rounded"
            >
              Dashboard
            </Link>

            {/* Profile */}
            <Link
              href="/my-profile"
              className="px-3 py-1 border rounded"
            >
              Profile
            </Link>
          </div>
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