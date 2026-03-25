import Sidebar from "@/components/dashboard/Sidebar";






export default function AdminDashboardLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <Sidebar/>
          {children}
      </>
  );
}
