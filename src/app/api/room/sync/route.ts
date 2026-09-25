import { NextResponse } from "next/server";

export const dynamic = "force-dynamic";

interface RoomData {
  roomId: string;
  gridDataPerExercise: Record<string, Record<string, unknown>>;
  activeCell?: string;
  updatedAt: number;
  updatedBy?: string;
  activeUsers: Record<string, number>;
  cloudObjectId?: string;
}

const memoryStore: Record<string, RoomData> = {};

async function getCloudRoom(roomId: string): Promise<RoomData> {
  const cleanId = roomId.toUpperCase().trim();
  
  if (!memoryStore[cleanId]) {
    memoryStore[cleanId] = {
      roomId: cleanId,
      gridDataPerExercise: {},
      updatedAt: Date.now(),
      activeUsers: {},
    };
  }

  const room = memoryStore[cleanId];

  if (room.cloudObjectId) {
    try {
      const res = await fetch(`https://api.restful-api.dev/objects/${room.cloudObjectId}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data && json.data.updatedAt > room.updatedAt) {
          room.gridDataPerExercise = json.data.gridDataPerExercise || room.gridDataPerExercise;
          room.activeCell = json.data.activeCell || room.activeCell;
          room.updatedAt = json.data.updatedAt;
          room.updatedBy = json.data.updatedBy;
          if (json.data.activeUsers) {
            room.activeUsers = { ...json.data.activeUsers, ...room.activeUsers };
          }
        }
      }
    } catch (e) {
      console.error("Cloud fetch error:", e);
    }
  }

  return room;
}

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const roomId = (searchParams.get("roomId") || "DEFAULT").toUpperCase();
  const userId = searchParams.get("userId") || "";
  const exerciseId = searchParams.get("exerciseId") || "default";

  const room = await getCloudRoom(roomId);

  const now = Date.now();
  if (userId) {
    room.activeUsers[userId] = now;
  }

  const connectedCount = Object.values(room.activeUsers).filter(
    (t) => now - t < 3500
  ).length;

  const exerciseGridData = room.gridDataPerExercise[exerciseId] || {};

  return NextResponse.json({
    success: true,
    roomState: {
      roomId: room.roomId,
      gridData: exerciseGridData,
      exerciseId,
      activeCell: room.activeCell,
      updatedAt: room.updatedAt,
      updatedBy: room.updatedBy,
      connectedCount: Math.max(1, connectedCount),
      cloudObjectId: room.cloudObjectId || "",
    },
  });
}

export async function POST(req: Request) {
  try {
    const { roomId, exerciseId = "default", gridData, activeCell, updatedBy, userId, isHeartbeat, isDisconnect } = await req.json();

    if (!roomId) {
      return NextResponse.json({ error: "Kode Ruang wajib diisi" }, { status: 400 });
    }

    const cleanRoomId = String(roomId).toUpperCase().trim();
    const room = await getCloudRoom(cleanRoomId);

    const now = Date.now();

    if (isDisconnect && userId) {
      delete room.activeUsers[userId];
      const connectedCount = Object.values(room.activeUsers).filter(
        (t) => now - t < 3500
      ).length;

      return NextResponse.json({
        success: true,
        roomState: {
          roomId: room.roomId,
          gridData: room.gridDataPerExercise[exerciseId] || {},
          connectedCount: Math.max(1, connectedCount),
        },
      });
    }

    if (userId) {
      room.activeUsers[userId] = now;
    }

    const connectedCount = Object.values(room.activeUsers).filter(
      (t) => now - t < 3500
    ).length;

    if (isHeartbeat) {
      return NextResponse.json({
        success: true,
        roomState: {
          roomId: room.roomId,
          gridData: room.gridDataPerExercise[exerciseId] || {},
          exerciseId,
          activeCell: room.activeCell,
          updatedAt: room.updatedAt,
          updatedBy: room.updatedBy,
          connectedCount: Math.max(1, connectedCount),
          cloudObjectId: room.cloudObjectId || "",
        },
      });
    }

    if (gridData && exerciseId && Object.keys(gridData).length > 0) {
      room.gridDataPerExercise[exerciseId] = {
        ...(room.gridDataPerExercise[exerciseId] || {}),
        ...gridData,
      };
    }
    room.activeCell = activeCell || room.activeCell;
    room.updatedBy = updatedBy || "Pengguna Excel";
    room.updatedAt = now;

    try {
      const payload = {
        name: `EXCEL_ROOM_${cleanRoomId}`,
        data: {
          roomId: cleanRoomId,
          gridDataPerExercise: room.gridDataPerExercise,
          activeCell: room.activeCell,
          updatedBy: room.updatedBy,
          updatedAt: room.updatedAt,
          activeUsers: room.activeUsers,
        },
      };

      if (!room.cloudObjectId) {
        const createRes = await fetch("https://api.restful-api.dev/objects", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        if (createRes.ok) {
          const createJson = await createRes.json();
          room.cloudObjectId = createJson.id;
        }
      } else {
        await fetch(`https://api.restful-api.dev/objects/${room.cloudObjectId}`, {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
      }
    } catch (err) {
      console.error("Cloud sync save error:", err);
    }

    return NextResponse.json({
      success: true,
      roomState: {
        roomId: room.roomId,
        gridData: room.gridDataPerExercise[exerciseId] || {},
        exerciseId,
        activeCell: room.activeCell,
        updatedAt: room.updatedAt,
        updatedBy: room.updatedBy,
        connectedCount: Math.max(1, connectedCount),
        cloudObjectId: room.cloudObjectId || "",
      },
    });
  } catch (error) {
    console.error("Room sync error:", error);
    return NextResponse.json({ error: "Gagal menyinkronkan data ruang" }, { status: 500 });
  }
}
