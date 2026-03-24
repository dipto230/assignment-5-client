import Navbar from "@/components/shared/Navbar";






export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider>
      <Navbar/>
        {children}
        </AuthProvider>
      </>
  );
}
