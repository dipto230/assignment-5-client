import AdminSidebar from "@/components/AdminSidebar";







export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
   <AdminSidebar
          {children}
      </>
  );
}
