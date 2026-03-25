"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { LayoutDashboard, User } from "lucide-react";

const menuItems = [
  {
    name: "Overview",
    href: "/dashboard",
    icon: LayoutDashboard,
  },
  {
    name: "My Profile",
    href: "/my-profile",
    icon: User,
  },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="h-screen w-64 border-r bg-background px-4 py-6 flex flex-col">
      
     
      <div className="mb-8">
        <h2 className="text-xl font-bold tracking-tight">LawHive</h2>
        <p className="text-xs text-muted-foreground">Dashboard</p>
      </div>

      {/* 🔥 Menu */}
      <nav className="flex flex-col gap-2">
        {menuItems.map((item) => {
          const active = pathname === item.href;
          const Icon = item.icon;

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2 text-sm transition-all
                ${
                  active
                    ? "bg-primary text-white shadow"
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                }`}
            >
              <Icon size={18} />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* 🔥 Bottom (optional future logout/profile) */}
      <div className="mt-auto pt-6 text-xs text-muted-foreground">
        © 2026 LawHive
      </div>
    </aside>
  );
}