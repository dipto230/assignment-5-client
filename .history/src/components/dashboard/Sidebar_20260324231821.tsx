"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const Sidebar = () => {
  const path = usePathname();

  const linkClass = (href: string) =>
    `px-3 py-2 rounded-md transition ${
      path === href
        ? "bg-blue-600 text-white"
        : "hover:bg-gray-800 text-gray-300"
    }`;

  return (
    <aside className="w-64 bg-black text-white p-6 space-y-6">
      <h2 className="text-xl font-bold">Dashboard</h2>

      <nav className="flex flex-col gap-2 text-sm">
        <Link href="/dashboard" className={linkClass("/dashboard")}>
          Overview
        </Link>

        <Link href="/dashboard/my-profile" className={linkClass("/dashboard/my-profile")}>
          My Profile
        </Link>

        <Link href="/dashboard/change-password" className={linkClass("/dashboard/change-password")}>
          Change Password
        </Link>

        <Link href="/dashboard/book-appointments" className={linkClass("/dashboard/book-appointments")}>
          Book Appointment
        </Link>

        <Link href="/dashboard/my-appointment" className={linkClass("/dashboard/my-appointment")}>
          My Appointments
        </Link>

        <Link href="/dashboard/my-document" className={linkClass("/dashboard/my-document")}>
          My Documents
        </Link>
      </nav>
    </aside>
  );
};

export default Sidebar;