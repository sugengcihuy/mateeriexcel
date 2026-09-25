import { getExerciseById } from "@/lib/content-loader";
import { ExamWorkspace } from "@/components/lesson/ExamWorkspace";
import { ExerciseData } from "@/types/exercise";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Trophy } from "lucide-react";

export const revalidate = 0;

export default function UjianPraktikPage() {
  const exerciseList: ExerciseData[] = [];

  for (let i = 1; i <= 30; i++) {
    const numStr = String(i).padStart(2, "0");
    const ex = getExerciseById(`ex-exam-${numStr}`);
    if (ex) {
      exerciseList.push(ex);
    }
  }

  return (
    <div className="min-h-screen bg-[#FAF5FF] text-[#2D2342] py-4 sm:py-8 space-y-4 sm:space-y-6">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 lg:px-8 space-y-4 sm:space-y-6">
        {/* Top Breadcrumb */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D2342] bg-white p-3.5 rounded-2xl border-2 border-[#E0CFFC] shadow-[4px_4px_10px_rgba(210,190,235,0.4),-4px_-4px_10px_rgba(255,255,255,0.9)]">
          <Link href="/modules" className="hover:text-[#FF758F] flex items-center gap-1 font-black transition-colors">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Daftar Pelajaran</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#FF758F] font-black flex items-center gap-1.5">
            <Trophy className="w-3.5 h-3.5 text-amber-600" />
            <span>Ujian Praktik 30 Soal Comprehensive</span>
          </span>
        </div>

        {/* Exam Workspace */}
        <div className="bg-white p-6 rounded-3xl border-2 border-[#E0CFFC] shadow-[8px_8px_20px_rgba(210,190,235,0.4),-8px_-8px_20px_rgba(255,255,255,0.9)]">
          <ExamWorkspace exerciseList={exerciseList} />
        </div>
      </div>
    </div>
  );
}
