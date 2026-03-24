import Navbar, { AuthProvider } from "@/components/shared/Navbar";






export default function CommonLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <AuthProvider></AuthProvider>
      <Navbar/>
          {children}
      </>
  );
}
