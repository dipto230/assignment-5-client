"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", href: "/dashboard/lawyer/dashboard" },
  { label: "Appointments", href: "/dashboard/lawyer/dashboard/appointment" },
  { label: "My Schedule", href: "/dashboard/lawyer/dashboard/my-schedule" },
  { label: "Consultation Notes", href: "/dashboard/lawyer/dashboard/consultationNote" },
  { label: "My Reviews", href: "/dashboard/lawyer/dashboard/my-reviews" },
];

export default function LawyerSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  const handleLogout = () => {
    localStorage.removeItem("token");
    router.push("/login");
  };

  return (
    <div className="flex flex-col w-64 h-screen border-r bg-background p-4">
      <div>
        <h2 className="text-lg font-bold mb-6">Lawyer Panel</h2>

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

      {/* Logout section */}
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
