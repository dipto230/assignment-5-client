"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", href: "/admin/dashboard" },
  { label: "Lawyers", href: "/admin/dashboard/lawyers" },
  { label: "Practice Areas", href: "/admin/dashboard/practice-areas" },
  { label: "Schedules", href: "/admin/dashboard/schedules" },
  { label: "Clients", href: "/admin/dashboard/clients" },
  { label: "Appointments", href: "/admin/dashboard/appointments" },
  { label: "Payments", href: "/admin/dashboard/payments" },
  { label: "Reviews", href: "/admin/dashboard/reviews" },
];

export default function AdminSidebar() {
  const pathname = usePathname();

  return (
    <div className="w-64 h-screen border-r bg-background p-4">
      <h2 className="text-lg font-bold mb-6">Admin Panel</h2>

      <nav className="space-y-2">
        {menu.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={cn(
              "block rounded-md px-3 py-2 text-sm transition",
              pathname === item.href
                ? "bg-primary text-white"
                : "hover:bg-muted"
            )}
          >
            {item.label}
          </Link>
        ))}
      </nav>
    </div>
  );
}