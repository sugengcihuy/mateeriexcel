"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { FileSpreadsheet, BookOpen, Trophy, Sparkles, Users, X, Check, Wifi, Share2, WifiOff } from "lucide-react";
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
  const [connectedCount, setConnectedCount] = useState<number>(1);
  const [userId, setUserId] = useState<string>("");

  useEffect(() => {
    let uid = sessionStorage.getItem("excel_learn_user_id");
    if (!uid) {
      uid = "usr_" + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem("excel_learn_user_id", uid);
    }
    setUserId(uid);
  }, []);

  // Listen to room-id-changed event across components
  useEffect(() => {
    const checkRoom = () => {
      if (typeof window !== "undefined") {
        const savedRoom = localStorage.getItem("excel_learn_room_id");
        const savedConn = localStorage.getItem("excel_learn_room_connected");
        if (savedRoom && savedConn === "true") {
          setActiveRoomId(savedRoom);
        } else {
          setActiveRoomId(savedRoom || "");
          setConnectedCount(1);
        }
      }
    };

    checkRoom();
    window.addEventListener("room-id-changed", checkRoom);
    return () => window.removeEventListener("room-id-changed", checkRoom);
  }, []);

  // Send beacon disconnect on tab close
  useEffect(() => {
    if (!activeRoomId || !userId) return;

    const handleUnload = () => {
      try {
        const data = JSON.stringify({ roomId: activeRoomId, userId, isDisconnect: true });
        navigator.sendBeacon("/api/room/sync", data);
      } catch (e) {
        console.error(e);
      }
    };

    window.addEventListener("beforeunload", handleUnload);
    window.addEventListener("pagehide", handleUnload);

    return () => {
      window.removeEventListener("beforeunload", handleUnload);
      window.removeEventListener("pagehide", handleUnload);
    };
  }, [activeRoomId, userId]);

  // Fast Poll server for live connected users count (every 500ms)
  useEffect(() => {
    if (!activeRoomId || !userId) return;

    const poll = async () => {
      try {
        const res = await fetch(`/api/room/sync?roomId=${encodeURIComponent(activeRoomId)}&userId=${encodeURIComponent(userId)}`);
        const data = await res.json();
        if (data.success && data.roomState && data.roomState.connectedCount) {
          setConnectedCount(data.roomState.connectedCount);
        }
      } catch (e) {
        console.error(e);
      }
    };

    poll();
    const interval = setInterval(poll, 500);
    return () => clearInterval(interval);
  }, [activeRoomId, userId]);

  const handleConnectRoom = (e: React.FormEvent) => {
    e.preventDefault();
    if (!inputRoomId.trim()) return;
    const clean = inputRoomId.trim().toUpperCase();
    setActiveRoomId(clean);
    if (typeof window !== "undefined") {
      localStorage.setItem("excel_learn_room_id", clean);
      localStorage.setItem("excel_learn_room_connected", "true");
      window.dispatchEvent(new Event("room-id-changed"));
    }
  };

  const handleDisconnect = async () => {
    if (activeRoomId && userId) {
      try {
        await fetch("/api/room/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId: activeRoomId,
            userId,
            isDisconnect: true,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    }
    setActiveRoomId("");
    setConnectedCount(1);
    if (typeof window !== "undefined") {
      localStorage.removeItem("excel_learn_room_connected");
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
      <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-[#E0CFFC] shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          {/* Main Top Header Row (Logo on left, Room Button on right) */}
          <div className="h-16 flex items-center justify-between gap-3">
            {/* Brand Logo - Always Prominent Normal Size */}
            <Link href="/" className="flex items-center gap-2.5 group shrink-0">
              <div className="w-10 h-10 bg-[#E0CFFC] group-hover:bg-[#FFC8DD] rounded-2xl flex items-center justify-center text-[#2D2342] shadow-sm transition-all border border-[#DBCDF0]">
                <FileSpreadsheet className="w-5 h-5 text-[#2D2342]" />
              </div>
              <span className="font-black text-lg sm:text-xl text-[#2D2342] tracking-tight whitespace-nowrap">
                Belajar Excel <span className="animated-gradient-text underline decoration-[#FFC8DD] underline-offset-4">Ayya</span>
              </span>
            </Link>

            {/* Nav Links for Desktop (hidden on mobile) */}
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

            {/* Action Buttons: Konek Realtime */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={() => setShowRoomModal(true)}
                className="flex items-center gap-1.5 px-3.5 py-2 bg-[#E0CFFC] hover:bg-[#DBCDF0] text-[#2D2342] text-xs font-black rounded-2xl border border-[#C7CEEA] transition-all shadow-sm whitespace-nowrap"
              >
                <Users className="w-4 h-4 text-[#FF758F]" />
                <span>{activeRoomId ? `Ruang: ${activeRoomId} (${connectedCount} Orang)` : "Konek Belajar Bareng"}</span>
              </button>

              {isHome && (
                <Link
                  href="/modules"
                  className="hidden md:flex items-center gap-1.5 px-4 py-2 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] text-xs font-black rounded-2xl transition-all shadow-sm border border-[#FFADAD] whitespace-nowrap"
                >
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>Mulai Belajar</span>
                </Link>
              )}
            </div>
          </div>

          {/* Mobile Sub-Header Nav Bar (Only shown on Mobile <768px) */}
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
                  <span>KODE RUANG AKTIF: {activeRoomId} ({connectedCount} Orang Terhubung)</span>
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
                    className="px-4 py-2 bg-[#FFADAD] hover:bg-rose-300 text-[#2D2342] font-bold rounded-xl text-xs flex items-center gap-1.5"
                  >
                    <WifiOff className="w-4 h-4" />
                    <span>Putus Koneksi</span>
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
