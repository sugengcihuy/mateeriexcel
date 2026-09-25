"use client";

import React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSpreadsheet, BookOpen, Trophy, Sparkles } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const isModules = pathname.startsWith("/modules");
  const isProgress = pathname.startsWith("/progress");

  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0CFFC] shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Main Header Row */}
        <div className="h-16 flex items-center justify-between gap-3">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-2.5 group shrink-0">
            <div className="w-10 h-10 bg-[#E0CFFC] group-hover:bg-[#FFC8DD] rounded-2xl flex items-center justify-center text-[#2D2342] shadow-sm transition-all border border-[#DBCDF0]">
              <FileSpreadsheet className="w-5 h-5 text-[#2D2342]" />
            </div>
            <span className="font-black text-lg sm:text-xl text-[#2D2342] tracking-tight whitespace-nowrap">
              Belajar Excel <span className="animated-gradient-text underline decoration-[#FFC8DD] underline-offset-4">Ayya</span>
            </span>
          </Link>

          {/* Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-2 text-sm font-bold text-[#2D2342]">
            <Link
              href="/modules"
              className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-2 select-none outline-none focus:outline-none whitespace-nowrap ${
                isModules
                  ? "border-[#C7CEEA] text-[#2D2342] font-black shadow-sm"
                  : "border-transparent hover:border-[#C7CEEA] bg-transparent text-slate-600 hover:text-[#2D2342]"
              }`}
            >
              {isModules && (
                <motion.div
                  layoutId="navbarActiveIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-[#E0CFFC]/80 rounded-full"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF758F]" />
                <span>Materi & Latihan</span>
              </span>
            </Link>

            <Link
              href="/progress"
              className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-2 select-none outline-none focus:outline-none whitespace-nowrap ${
                isProgress
                  ? "border-[#C7CEEA] text-[#2D2342] font-black shadow-sm"
                  : "border-transparent hover:border-[#C7CEEA] bg-transparent text-slate-600 hover:text-[#2D2342]"
              }`}
            >
              {isProgress && (
                <motion.div
                  layoutId="navbarActiveIndicator"
                  transition={{ type: "spring", stiffness: 380, damping: 30 }}
                  className="absolute inset-0 bg-[#E0CFFC]/80 rounded-full"
                />
              )}
              <span className="relative z-10 flex items-center gap-1.5">
                <Trophy className="w-4 h-4 text-amber-600" />
                <span>Progress Ayya</span>
              </span>
            </Link>
          </nav>

          {/* Action Button */}
          <div className="flex items-center gap-2 shrink-0">
            <Link
              href="/modules"
              className="flex items-center gap-1.5 px-4 py-2 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] text-xs font-black rounded-2xl transition-all shadow-sm border border-[#FFADAD] whitespace-nowrap"
            >
              <Sparkles className="w-3.5 h-3.5" />
              <span>Mulai Belajar</span>
            </Link>
          </div>
        </div>

        {/* Mobile Navigation Row */}
        <div className="md:hidden flex items-center justify-center gap-2 py-2 border-t border-[#E0CFFC]/60">
          <Link
            href="/modules"
            className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all border-2 ${
              isModules
                ? "bg-[#E0CFFC]/80 border-[#C7CEEA] text-[#2D2342]"
                : "bg-transparent border-transparent text-slate-600"
            }`}
          >
            <BookOpen className="w-3.5 h-3.5 text-[#FF758F]" />
            <span>Materi & Latihan</span>
          </Link>

          <Link
            href="/progress"
            className={`px-4 py-1.5 rounded-full text-xs font-black flex items-center gap-1.5 transition-all border-2 ${
              isProgress
                ? "bg-[#E0CFFC]/80 border-[#C7CEEA] text-[#2D2342]"
                : "bg-transparent border-transparent text-slate-600"
            }`}
          >
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Progress Ayya</span>
          </Link>
        </div>
      </div>
    </header>
  );
}
