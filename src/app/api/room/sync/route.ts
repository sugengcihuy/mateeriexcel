import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

// In-memory room store for real-time collaboration between Ayya & friend
const roomStore: Record<
  string,
  {
    roomId: string;
    gridData: Record<string, unknown>;
    activeCell?: string;
    updatedAt: number;
    updatedBy?: string;
  }
> = {};


export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = (searchParams.get("roomId") || "default").toUpperCase();

  const roomState = roomStore[roomId] || {
    roomId,
    gridData: {},
    updatedAt: Date.now(),
  };

  return NextResponse.json({ success: true, roomState });
}

export async function POST(req: Request) {
  try {
    const { roomId, gridData, activeCell, updatedBy } = await req.json();

    if (!roomId) {
      return NextResponse.json({ error: "Kode Ruang (Room ID) wajib diisi" }, { status: 400 });
    }

    const cleanRoomId = String(roomId).toUpperCase().trim();

    roomStore[cleanRoomId] = {
      roomId: cleanRoomId,
      gridData: gridData || {},
      activeCell,
      updatedBy: updatedBy || "Teman Belajar",
      updatedAt: Date.now(),
    };

    return NextResponse.json({
      success: true,
      roomState: roomStore[cleanRoomId],
    });
  } catch (error) {
    console.error("Room sync error:", error);
    return NextResponse.json({ error: "Gagal menyinkronkan data ruang" }, { status: 500 });
  }
}
