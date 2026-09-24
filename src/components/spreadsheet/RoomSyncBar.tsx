"use client";

import React, { useState, useEffect, useRef } from "react";
import { Users, Wifi, WifiOff, Share2, Check } from "lucide-react";
import { CellData } from "@/types/exercise";

interface RoomSyncBarProps {
  onGridSynced?: (gridData: Record<string, CellData>) => void;
  currentGridData?: Record<string, CellData>;
  activeCellRef?: string;
}

export function RoomSyncBar({
  onGridSynced,
  currentGridData,
  activeCellRef,
}: RoomSyncBarProps) {
  const [roomId, setRoomId] = useState<string>("");
  const [isConnected, setIsConnected] = useState<boolean>(false);
  const [copied, setCopied] = useState<boolean>(false);
  const [connectedCount, setConnectedCount] = useState<number>(1);
  const [userId, setUserId] = useState<string>("");

  const cloudObjIdRef = useRef<string>("");
  const lastLocalUpdateRef = useRef<number>(0);

  // Generate unique userId per browser tab on mount
  useEffect(() => {
    let uid = sessionStorage.getItem("excel_learn_user_id");
    if (!uid) {
      uid = "usr_" + Math.random().toString(36).substring(2, 9);
      sessionStorage.setItem("excel_learn_user_id", uid);
    }
    setUserId(uid);
  }, []);

  // Sync with localStorage on mount & on event
  useEffect(() => {
    const checkRoom = () => {
      if (typeof window !== "undefined") {
        const saved = localStorage.getItem("excel_learn_room_id");
        if (saved) {
          setRoomId(saved);
          setIsConnected(true);
        } else {
          setRoomId("");
          setIsConnected(false);
          setConnectedCount(1);
        }
      }
    };

    checkRoom();
    window.addEventListener("room-id-changed", checkRoom);
    return () => window.removeEventListener("room-id-changed", checkRoom);
  }, []);

  // Send beacon disconnect on tab close/unload
  useEffect(() => {
    if (!isConnected || !roomId || !userId) return;

    const handleUnload = () => {
      try {
        const data = JSON.stringify({ roomId, userId, isDisconnect: true });
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
  }, [isConnected, roomId, userId]);

  // Connect / Join Room
  const handleConnect = (e: React.FormEvent) => {
    e.preventDefault();
    if (!roomId.trim()) return;
    const clean = roomId.trim().toUpperCase();
    setRoomId(clean);
    setIsConnected(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("excel_learn_room_id", clean);
      window.dispatchEvent(new Event("room-id-changed"));
    }
  };

  // Disconnect Room with instant server broadcast & beacon
  const handleDisconnect = async () => {
    if (roomId && userId) {
      try {
        await fetch("/api/room/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId,
            userId,
            isDisconnect: true,
          }),
        });
      } catch (e) {
        console.error(e);
      }
    }
    setIsConnected(false);
    setConnectedCount(1);
    cloudObjIdRef.current = "";
    if (typeof window !== "undefined") {
      localStorage.removeItem("excel_learn_room_id");
      window.dispatchEvent(new Event("room-id-changed"));
    }
  };

  // Fast Poll server and cloud for real-time changes every 350ms when connected
  useEffect(() => {
    if (!isConnected || !roomId || !userId) return;

    const interval = setInterval(async () => {
      try {
        const res = await fetch(`/api/room/sync?roomId=${encodeURIComponent(roomId)}&userId=${encodeURIComponent(userId)}`);
        const data = await res.json();
        
        if (data.success && data.roomState) {
          if (data.roomState.connectedCount) {
            setConnectedCount(data.roomState.connectedCount);
          }
          if (data.roomState.cloudObjectId) {
            cloudObjIdRef.current = data.roomState.cloudObjectId;
          }

          // If changes came from another user, update grid
          if (data.roomState.gridData && onGridSynced) {
            if (Date.now() - lastLocalUpdateRef.current > 400) {
              onGridSynced(data.roomState.gridData);
            }
          }
        }
      } catch (err) {
        console.error("Realtime sync error:", err);
      }
    }, 350);

    return () => clearInterval(interval);
  }, [isConnected, roomId, userId, onGridSynced]);

  // Fast Broadcast cell edit when currentGridData changes
  useEffect(() => {
    if (!isConnected || !roomId || !currentGridData || !userId) return;

    lastLocalUpdateRef.current = Date.now();

    const broadcast = async () => {
      try {
        const res = await fetch("/api/room/sync", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            roomId,
            gridData: currentGridData,
            activeCell: activeCellRef,
            userId,
            updatedBy: "Pengguna Excel",
          }),
        });
        const data = await res.json();
        if (data.success && data.roomState && data.roomState.connectedCount) {
          setConnectedCount(data.roomState.connectedCount);
        }
      } catch (e) {
        console.error(e);
      }
    };

    const timer = setTimeout(broadcast, 50);
    return () => clearTimeout(timer);
  }, [currentGridData, isConnected, roomId, userId, activeCellRef]);

  const copyRoomCode = () => {
    if (!roomId) return;
    navigator.clipboard.writeText(roomId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="p-4 bg-[#E0CFFC]/50 border-2 border-[#DBCDF0] rounded-3xl text-xs flex flex-wrap items-center justify-between gap-3 shadow-md backdrop-blur">
      <div className="flex items-center gap-3">
        <div className="p-2.5 bg-[#FFC8DD] rounded-2xl text-[#2D2342] shadow-sm border border-[#FFADAD]">
          <Users className="w-5 h-5 text-[#2D2342]" />
        </div>
        <div>
          <div className="flex flex-wrap items-center gap-2">
            <span className="font-black text-[#2D2342] text-sm block">Ruang Belajar Bersama (Realtime Sync)</span>
            {isConnected && (
              <span className="inline-flex items-center gap-1.5 px-2.5 py-0.5 bg-emerald-100 text-emerald-800 font-mono font-black text-[11px] rounded-full border border-emerald-300">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-ping" />
                <span>{connectedCount} Orang Terhubung</span>
              </span>
            )}
          </div>
          <span className="text-xs text-slate-600 font-medium">
            Konek dengan teman kamu! Isi cell otomatis ter-update di layar teman kamu saat mengetik.
          </span>
        </div>
      </div>

      {!isConnected ? (
        <form onSubmit={handleConnect} className="flex items-center gap-2">
          <input
            type="text"
            value={roomId}
            onChange={(e) => setRoomId(e.target.value)}
            placeholder="Ketik Kode Ruang (misal: AYYA)"
            className="px-4 py-2 bg-white border-2 border-[#E0CFFC] rounded-2xl text-[#2D2342] placeholder:text-slate-400 font-mono uppercase font-black text-xs outline-none focus:border-[#FFC8DD] transition-all"
          />
          <button
            type="submit"
            className="px-4 py-2 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] font-black rounded-2xl transition-all shadow-sm flex items-center gap-1.5 shrink-0 border border-[#FFADAD]"
          >
            <Wifi className="w-4 h-4 text-[#2D2342]" />
            <span>Konek Ruang</span>
          </button>
        </form>
      ) : (
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-4 py-2 bg-[#CFFFE5] border-2 border-[#A0E7E5] text-[#2D2342] rounded-2xl font-mono font-black text-xs shadow-inner">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500 animate-ping" />
            <span>KODE RUANG: {roomId} ({connectedCount} Orang)</span>
          </div>

          <button
            type="button"
            onClick={copyRoomCode}
            className="p-2 bg-white hover:bg-slate-50 text-[#2D2342] rounded-2xl border border-[#DBCDF0] transition-colors shadow-sm"
            title="Salin Kode Ruang"
          >
            {copied ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-[#FF758F]" />}
          </button>

          <button
            type="button"
            onClick={handleDisconnect}
            className="px-3.5 py-2 bg-[#FFADAD] hover:bg-rose-300 text-[#2D2342] border border-[#FF758F] rounded-2xl font-black transition-colors flex items-center gap-1.5 text-xs shadow-sm"
          >
            <WifiOff className="w-4 h-4" />
            <span>Putus</span>
          </button>
        </div>
      )}
    </div>
  );
}
