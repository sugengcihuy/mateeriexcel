import { NextResponse } from "next/server";
import { getExerciseById } from "@/lib/content-loader";
import { validateExerciseAnswer } from "@/lib/formula-engine/validators";

export const dynamic = "force-dynamic";

export async function POST(
  req: Request,
  { params }: { params: { id: string } }
) {
  try {
    const exerciseId = params.id;
    const { gridData } = await req.json();

    if (!gridData) {
      return NextResponse.json({ error: "Data spreadsheet wajib dikirim" }, { status: 400 });
    }

    const exercise = getExerciseById(exerciseId);
    if (!exercise) {
      return NextResponse.json({ error: "Soal exercise tidak ditemukan" }, { status: 404 });
    }

    // Server-side validation using HyperFormula
    const result = validateExerciseAnswer(gridData, exercise.expectedAnswer, exercise.multiTargetAnswers);

    return NextResponse.json({
      ...result,
      progressUpdated: true,
    });
  } catch (error) {
    console.error("Exercise validation error:", error);
    return NextResponse.json({ error: "Terjadi kesalahan sistem saat memvalidasi jawaban" }, { status: 500 });
  }
}

