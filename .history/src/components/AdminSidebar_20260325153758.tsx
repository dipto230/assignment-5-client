"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
 // oponal, your logout function

const menu = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Lawyers", href: "/admin/dashboard/lawyers" },
  { label: "Create Lawyer", href: "/admin/dashboard/lawyers/create" },
  { label: "Practice Areas", href: "/admin/dashboard/practice-areas" },
  { label: "Schedules", href: "/admin/dashboard/schedules-managment" },
  { label: "Appointments", href: "/admin/dashboard/appointments" },
  { label: "Payments", href: "/admin/dashboard/payment-managment" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    // Clear any auth tokens or session here
    // Example: signOut() if you have an auth provider
    localStorage.removeItem("token"); // or whatever you use
    router.push("/login"); // redirect to login
  };

  return (
    <div className="flex flex-col w-64 h-screen border-r bg-background p-4">
      <div>
        <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

        <nav className="space-y-2">
          {menu.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className={cn(
                "block rounded-md px-3 py-2 text-sm transition",
                pathname === item.href ? "bg-primary text-white" : "hover:bg-muted"
              )}
            >
              {item.label}
            </Link>
          ))}
        </nav>
      </div>

      {/* Logout section at the bottom */}
      <div className="mt-auto pt-4 border-t">
        <button
          onClick={handleLogout}
          className="w-full text-left px-3 py-2 text-sm rounded-md bg-red-600 text-white hover:bg-red-700 transition"
        >
          Logout
        </button>
      </div>
    </div>
  );
}