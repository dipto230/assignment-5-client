import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import QueryProviders from '@/providers/QueryProvider';
import { AuthProvider } from '@/providers/AuthProvider';


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "LawHive",
  description: "Our platform connects individuals with experienced lawyers for seamless legal consultations and bookings. Users can browse verified lawyers, schedule appointments, and receive expert advice—all in one place. Whether it’s civil, criminal, or corporate matters, our goal is to make legal support accessible, reliable, and convenient for everyone.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <QueryProviders>
    <AuthProvider>

 
            {children}
            </AuthProvider>

        </QueryProviders>

      </body>
    </html>
  );
}
