import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

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

const STORE_FILE = path.join(process.cwd(), ".room_store.json");

function loadStore(): Record<string, RoomData> {
  try {
    if (fs.existsSync(STORE_FILE)) {
      const raw = fs.readFileSync(STORE_FILE, "utf-8");
      return JSON.parse(raw);
    }
  } catch (e) {
    console.error("Failed to load room store file:", e);
  }
  return {};
}

function saveStore(store: Record<string, RoomData>) {
  try {
    fs.writeFileSync(STORE_FILE, JSON.stringify(store, null, 2), "utf-8");
  } catch (e) {
    console.error("Failed to save room store file:", e);
  }
}

const memoryStore: Record<string, RoomData> = loadStore();

async function getCloudRoom(roomId: string): Promise<RoomData> {
  const cleanId = roomId.toUpperCase().trim();
  
  if (!memoryStore[cleanId]) {
    memoryStore[cleanId] = {
      roomId: cleanId,
      gridDataPerExercise: {},
      updatedAt: Date.now(),
      activeUsers: {},
    };
    saveStore(memoryStore);
  }

  const room = memoryStore[cleanId];

  if (room.cloudObjectId) {
    try {
      const res = await fetch(`https://api.restful-api.dev/objects/${room.cloudObjectId}`, {
        cache: "no-store",
      });
      if (res.ok) {
        const json = await res.json();
        if (json.data) {
          if (json.data.gridDataPerExercise) {
            Object.entries(json.data.gridDataPerExercise).forEach(([exId, gData]) => {
              room.gridDataPerExercise[exId] = {
                ...(room.gridDataPerExercise[exId] || {}),
                ...(gData as Record<string, unknown>),
              };
            });
          }
          if (json.data.updatedAt > room.updatedAt) {
            room.activeCell = json.data.activeCell || room.activeCell;
            room.updatedAt = json.data.updatedAt;
            room.updatedBy = json.data.updatedBy;
          }
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
    (t) => now - t < 8000
  ).length;

  if (room.cloudObjectId && now - room.updatedAt > 2000) {
    try {
      fetch(`https://api.restful-api.dev/objects/${room.cloudObjectId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: `EXCEL_ROOM_${room.roomId}`,
          data: {
            roomId: room.roomId,
            gridDataPerExercise: room.gridDataPerExercise,
            activeCell: room.activeCell,
            updatedBy: room.updatedBy,
            updatedAt: now,
            activeUsers: room.activeUsers,
          },
        }),
      }).catch((e) => console.error(e));
      room.updatedAt = now;
      saveStore(memoryStore);
    } catch (e) {
      console.error(e);
    }
  }

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
      saveStore(memoryStore);
      const connectedCount = Object.values(room.activeUsers).filter(
        (t) => now - t < 8000
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
      (t) => now - t < 8000
    ).length;

    if (isHeartbeat) {
      saveStore(memoryStore);
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

    saveStore(memoryStore);

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
