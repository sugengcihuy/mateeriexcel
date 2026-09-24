import { NextResponse } from "next/server";
import { getAllModules } from "@/lib/content-loader";

export async function GET() {
  try {
    const modules = getAllModules();
    return NextResponse.json({ modules });
  } catch (error) {
    console.error("Fetch modules error:", error);
    return NextResponse.json({ error: "Gagal mengambil katalog modul" }, { status: 500 });
  }
}
