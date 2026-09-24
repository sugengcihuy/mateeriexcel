import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belajar Excel Ayya",
  description: "Platform Interaktif Belajar Microsoft Excel dari Dasar hingga Mahir.",
  openGraph: {
    title: "Belajar Excel Ayya",
    description: "Platform Interaktif Belajar Microsoft Excel dari Dasar hingga Mahir.",
    siteName: "Belajar Excel Ayya",
  },
  twitter: {
    card: "summary_large_image",
    title: "Belajar Excel Ayya",
    description: "Platform Interaktif Belajar Microsoft Excel dari Dasar hingga Mahir.",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className="h-full">
      <body className={`${inter.className} h-full bg-slate-950 text-slate-100 flex flex-col antialiased`}>
        <Navbar />
        <main className="flex-1">{children}</main>
        <footer className="py-6 border-t border-[#E0CFFC] bg-white text-center text-xs font-bold text-[#2D2342] shadow-sm">
          Dev By Tama &bull; Belajar Excel Ayya &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
