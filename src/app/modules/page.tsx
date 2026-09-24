import Link from "next/link";
import { getAllModules } from "@/lib/content-loader";
import { BookOpen, ChevronRight, Sparkles, Zap, Trophy } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

export const revalidate = 0;

export default function ModulesCatalogPage() {
  const modules = getAllModules();

  const getLevelBadge = (level: string) => {
    switch (level) {
      case "basic":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFC8DD] text-[#2D2342] text-xs font-black rounded-full border border-[#FFADAD]">
            <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
            <span>Tingkat: Adik-adik</span>
          </span>
        );
      case "intermediate":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#BDE0FE] text-[#2D2342] text-xs font-black rounded-full border border-[#90E0EF]">
            <Zap className="w-3.5 h-3.5 text-blue-600" />
            <span>Tingkat: Abang-abangan</span>
          </span>
        );
      case "advanced":
        return (
          <span className="inline-flex items-center gap-1.5 px-3 py-1 bg-[#FFD6A5] text-[#2D2342] text-xs font-black rounded-full border border-[#FFB5A7]">
            <Trophy className="w-3.5 h-3.5 text-amber-700" />
            <span>Tingkat: Sepuh</span>
          </span>
        );
      default:
        return null;
    }
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-screen bg-[#FAF5FF] text-[#2D2342]">
      {/* Header */}
      <div className="border-b-2 border-[#E0CFFC] pb-8 space-y-3">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-[#E0CFFC] text-[#2D2342] text-xs font-extrabold rounded-full border border-[#C7CEEA]">
          <BookOpen className="w-3.5 h-3.5 text-[#FF758F]" />
          <span>Pilih Tingkatan Kamu</span>
        </div>
        <h1 className="text-3xl font-black text-[#2D2342] tracking-tight">
          Daftar Pelajaran Belajar Excel Ayya
        </h1>
        <p className="text-sm text-slate-600 font-medium max-w-2xl">
          Tinggal pilih tingkatan materi yang mau kamu pelajari di bawah ini. Dari tingkat Adik-adik, Abang-abangan, sampai tingkat Sepuh!
        </p>
      </div>

      {/* Modules List */}
      <div className="space-y-8">
        {modules.map((mod, idx) => (
          <FadeIn key={mod.id} delay={idx * 0.1}>
            <div className="bg-white rounded-3xl border-2 border-[#E0CFFC] shadow-lg p-6 sm:p-8 space-y-6 hover:border-[#FFC8DD] transition-all">
              <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E0CFFC] pb-4">
                <div className="space-y-1">
                  <div className="flex items-center gap-3">
                    {getLevelBadge(mod.level)}
                    <span className="text-xs text-slate-500 font-mono font-bold">Modul 0{mod.order}</span>
                  </div>
                  <h2 className="text-2xl font-black text-[#2D2342] pt-1">{mod.title}</h2>
                </div>
              </div>

              <p className="text-sm text-slate-600 font-medium leading-relaxed">{mod.description}</p>

              {/* Lessons Grid */}
              <div className="space-y-3 pt-2">
                <h4 className="text-xs font-black text-slate-500 uppercase tracking-wider">
                  Topik Pelajaran ({mod.lessons.length}):
                </h4>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {mod.lessons.map((les) => (
                    <Link
                      key={les.id}
                      href={`/modules/${mod.slug}/${les.slug}`}
                      className="group flex items-center justify-between p-4 bg-[#FAF5FF] border-2 border-[#E0CFFC] rounded-2xl hover:bg-[#FFC8DD]/20 hover:border-[#FFC8DD] transition-all"
                    >
                      <div className="space-y-1">
                        <div className="flex items-center gap-2">
                          <span className="w-6 h-6 rounded-lg bg-[#E0CFFC] text-[#2D2342] border border-[#C7CEEA] text-xs font-black flex items-center justify-center font-mono">
                            {les.order}
                          </span>
                          <h5 className="font-bold text-[#2D2342] text-sm group-hover:text-[#FF758F] transition-colors">
                            {les.title}
                          </h5>
                        </div>
                        {les.summary && (
                          <p className="text-xs text-slate-500 line-clamp-1 pl-8 font-medium">
                            {les.summary}
                          </p>
                        )}
                      </div>
                      <ChevronRight className="w-5 h-5 text-slate-400 group-hover:text-[#FF758F] group-hover:translate-x-1 transition-all shrink-0 ml-2" />
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          </FadeIn>
        ))}
      </div>
    </div>
  );
}


