"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const menu = [
  { label: "Dashboard", href: "/lawyer/dashboard" },
  { label: "Appointments", href: "/lawyer/dashboard/appointment" },
  { label: "My Schedule", href: "/lawyer/dashboard/my-schedule" },
  { label: "Consultation Notes", href: "/lawyer/dashboard/consultationNote" },
  { label: "My Reviews", href: "/lawyer/dashboard/my-reviews" },
];

export default function LawyerSidebar() {
    const pathname = usePathname();

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
        </div>
    );
}