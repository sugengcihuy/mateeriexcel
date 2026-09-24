import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "@/styles/globals.css";
import { Navbar } from "@/components/layout/Navbar";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Belajar Excel Ayya — Tempat Belajar Excel Simpel & Seru",
  description:
    "Belajar Microsoft Excel dari dasar sampai mahir langsung praktik di browser. Simpel, cepat, dan gampang dipahami!",
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
        <footer className="py-6 border-t border-slate-900 text-center text-xs text-slate-500">
          Dibuat khusus untuk Ayya &bull; Belajar Excel Ayya &copy; {new Date().getFullYear()}
        </footer>
      </body>
    </html>
  );
}
