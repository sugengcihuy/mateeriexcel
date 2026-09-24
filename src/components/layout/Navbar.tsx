"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSpreadsheet, BookOpen, Trophy, Sparkles, Users, X, Check, Wifi, Share2 } from "lucide-react";
import { motion } from "framer-motion";

export function Navbar() {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const isModules = pathname.startsWith("/modules");
  const isProgress = pathname.startsWith("/progress");

  const [showRoomModal, setShowRoomModal] = useState<boolean>(false);
  const [inputRoomId, setInputRoomId] = useState<string>("");
  const [activeRoomId, setActiveRoomId] = useState<string>("");
  const [copied, setCopied] = useState<boolean>(false);

  const handleConnectRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRoomId.trim()) return;
    const clean = inputRoomId.trim().toUpperCase();
    setActiveRoomId(clean);
    if (typeof window !== "undefined") {
      localStorage.setItem("excel_learn_room_id", clean);
      window.dispatchEvent(new Event("room-id-changed"));
    }
  };

  const handleDisconnect = () => {
    setActiveRoomId("");
    if (typeof window !== "undefined") {
      localStorage.removeItem("excel_learn_room_id");
      window.dispatchEvent(new Event("room-id-changed"));
    }
  };

  const copyRoomCode = () => {
    if (!activeRoomId) return;
    navigator.clipboard.writeText(activeRoomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <>
      <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-[#E0CFFC] shadow-sm">
        <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 h-16 flex items-center justify-between gap-2 overflow-x-auto no-scrollbar">
          {/* Brand Logo */}
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 bg-[#E0CFFC] group-hover:bg-[#FFC8DD] rounded-2xl flex items-center justify-center text-[#2D2342] shadow-sm transition-all border border-[#DBCDF0]">
              <FileSpreadsheet className="w-5 h-5 text-[#2D2342]" />
            </div>
            <span className="font-black text-base sm:text-xl text-[#2D2342] tracking-tight whitespace-nowrap">
              Belajar Excel <span className="animated-gradient-text underline decoration-[#FFC8DD] underline-offset-4">Ayya</span>
            </span>
          </Link>

          {/* Nav Links with Framer Motion layoutId Spring Sliding Indicator */}
          <nav className="relative flex items-center gap-2 text-sm font-bold text-[#2D2342]">
            <Link
              href="/modules"
              className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-2 select-none outline-none focus:outline-none ${
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
              className={`relative px-4 py-2 rounded-full flex items-center gap-1.5 transition-all duration-300 ease-[cubic-bezier(0.16,1,0.3,1)] border-2 select-none outline-none focus:outline-none ${
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

          {/* Action Buttons: Konek Realtime & Mulai Belajar (Shown only on Home) */}
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={() => setShowRoomModal(true)}
              className="flex items-center gap-2 px-3.5 py-2 bg-[#E0CFFC] hover:bg-[#DBCDF0] text-[#2D2342] text-xs font-extrabold rounded-xl border border-[#C7CEEA] transition-all shadow-sm"
            >
              <Users className="w-4 h-4 text-[#FF758F]" />
              <span>{activeRoomId ? `Ruang: ${activeRoomId}` : "Konek Belajar Bareng"}</span>
            </button>

            {isHome && (
              <Link
                href="/modules"
                className="hidden sm:flex items-center gap-1.5 px-4 py-2 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] text-xs font-black rounded-xl transition-all shadow-sm border border-[#FFADAD]"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>Mulai Belajar</span>
              </Link>
            )}
          </div>
        </div>
      </header>

      {/* Pop-up Modal Realtime Room Sync */}
      {showRoomModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/50 backdrop-blur-sm">
          <div className="bg-white rounded-3xl max-w-md w-full p-6 shadow-2xl border-2 border-[#E0CFFC] space-y-5 relative">
            <button
              type="button"
              onClick={() => setShowRoomModal(false)}
              className="absolute top-4 right-4 p-1.5 rounded-full hover:bg-[#FAF5FF] text-slate-400 hover:text-slate-700"
            >
              <X className="w-5 h-5" />
            </button>

            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-2xl bg-[#E0CFFC] flex items-center justify-center text-[#2D2342]">
                <Users className="w-5 h-5 text-[#FF758F]" />
              </div>
              <div>
                <h3 className="text-lg font-black text-[#2D2342]">Konek Belajar Realtime</h3>
                <p className="text-xs text-slate-500 font-medium">
                  Belajar bareng teman kamu! Tiap ada perubahan di cell, layar teman kamu otomatis ke-update.
                </p>
              </div>
            </div>

            {!activeRoomId ? (
              <form onSubmit={handleConnectRoom} className="space-y-4">
                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-slate-700 block">
                    Masukkan Kode Ruang (Bebas, misal: AYYA):
                  </label>
                  <input
                    type="text"
                    value={inputRoomId}
                    onChange={(e) => setInputRoomId(e.target.value)}
                    placeholder="Contoh: AYYA-123"
                    className="w-full px-4 py-2.5 bg-[#FAF5FF] border-2 border-[#E0CFFC] rounded-2xl text-[#2D2342] font-mono uppercase font-black text-sm outline-none focus:border-[#FFC8DD] transition-all"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] font-black rounded-2xl transition-all shadow-md flex items-center justify-center gap-2 text-sm border border-[#FFADAD]"
                >
                  <Wifi className="w-4 h-4" />
                  <span>Konek Ke Ruang Sekarang</span>
                </button>
              </form>
            ) : (
              <div className="p-4 bg-[#CFFFE5] border-2 border-[#A0E7E5] rounded-2xl space-y-4 text-center">
                <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-100 text-emerald-800 rounded-full font-mono font-black text-xs border border-emerald-300">
                  <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
                  <span>KODE RUANG AKTIF: {activeRoomId}</span>
                </div>
                <p className="text-xs text-slate-700 font-medium">
                  Bagikan kode <strong>{activeRoomId}</strong> ini ke teman kamu supaya kalian terhubung realtime!
                </p>

                <div className="flex items-center justify-center gap-2">
                  <button
                    type="button"
                    onClick={copyRoomCode}
                    className="px-4 py-2 bg-white hover:bg-slate-50 text-[#2D2342] font-bold rounded-xl border border-emerald-300 text-xs flex items-center gap-1.5 shadow-sm"
                  >
                    {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#FF758F]" />}
                    <span>{copied ? "Kode Tersalin!" : "Salin Kode Ruang"}</span>
                  </button>

                  <button
                    type="button"
                    onClick={handleDisconnect}
                    className="px-4 py-2 bg-[#FFADAD] hover:bg-rose-300 text-[#2D2342] font-bold rounded-xl text-xs"
                  >
                    Putus Koneksi
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
}
