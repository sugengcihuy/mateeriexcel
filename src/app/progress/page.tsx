"use client";

import { useState, useEffect } from "react";
import { Trophy, CheckCircle2, Clock } from "lucide-react";
import { AnimatedProgressBar } from "@/components/motion/AnimatedProgressBar";
import { FadeIn } from "@/components/motion/FadeIn";
import { ModuleData } from "@/types/module";

export default function ProgressPage() {
  const [userProgress, setUserProgress] = useState<Record<string, string>>({});
  const [modules, setModules] = useState<ModuleData[]>([]);

  useEffect(() => {
    // Fetch modules catalog
    fetch("/api/modules")
      .then((res) => res.json())
      .then((data) => {
        if (data.modules) setModules(data.modules);
      })
      .catch(console.error);

    // Read progress from localStorage
    try {
      const saved = localStorage.getItem("excel_learn_progress");
      if (saved) {
        setUserProgress(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  const calculateModuleProgress = (mod: ModuleData) => {
    if (!mod.lessons || mod.lessons.length === 0) return 0;
    const completedCount = mod.lessons.filter(
      (les) => userProgress[les.id] === "completed"
    ).length;
    return Math.round((completedCount / mod.lessons.length) * 100);
  };

  const getLevelLabel = (level: string) => {
    switch (level) {
      case "basic":
        return "Tingkat: Adik-adik";
      case "intermediate":
        return "Tingkat: Abang-abangan";
      case "advanced":
        return "Tingkat: Sepuh";
      default:
        return level;
    }
  };

  const totalLessons = modules.reduce((acc, m) => acc + (m.lessons?.length || 0), 0);
  const totalCompleted = Object.values(userProgress).filter((s) => s === "completed").length;
  const overallPercentage = totalLessons > 0 ? Math.round((totalCompleted / totalLessons) * 100) : 0;

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 space-y-10 min-h-screen bg-[#FAF5FF] text-[#2D2342]">
      {/* Header Banner */}
      <div className="bg-white text-[#2D2342] rounded-3xl p-8 sm:p-10 shadow-xl border-2 border-[#E0CFFC] space-y-6">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFC8DD] text-[#2D2342] text-xs font-black rounded-full border border-[#FFADAD]">
              <Trophy className="w-4 h-4 text-amber-700" />
              <span>Dashboard Progres Belajar Excel Ayya</span>
            </div>
            <h1 className="text-3xl font-black text-[#2D2342]">
              Pencapaian Latihan Kamu
            </h1>
            <p className="text-sm text-slate-600 font-medium">
              Progres latihan spreadsheet tersimpan secara otomatis di browser kamu!
            </p>
          </div>

          <div className="bg-[#FAF5FF] p-4 rounded-2xl border-2 border-[#E0CFFC] text-center min-w-[160px] shadow-inner">
            <span className="text-3xl font-black text-[#FF758F]">{overallPercentage}%</span>
            <span className="block text-xs text-slate-600 font-bold mt-1">Total Progres Selesai</span>
          </div>
        </div>

        <AnimatedProgressBar progress={overallPercentage} colorClassName="bg-[#FFC8DD]" heightClassName="h-3" />
      </div>

      {/* Module Breakdown */}
      <div className="space-y-6">
        <h3 className="text-xl font-black text-[#2D2342]">Detail Per Modul</h3>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {modules.map((mod) => {
            const pct = calculateModuleProgress(mod);
            return (
              <FadeIn key={mod.id}>
                <div className="bg-white p-6 rounded-3xl border-2 border-[#E0CFFC] shadow-lg space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="text-xs font-mono text-[#FF758F] uppercase font-black">
                        {getLevelLabel(mod.level)}
                      </span>
                      <h4 className="font-black text-[#2D2342] text-base">{mod.title}</h4>
                    </div>
                    <span className="text-sm font-black text-[#2D2342] font-mono">{pct}%</span>
                  </div>

                  <AnimatedProgressBar progress={pct} colorClassName="bg-[#FFC8DD]" />

                  <div className="pt-2 space-y-2">
                    {mod.lessons?.map((les) => {
                      const isDone = userProgress[les.id] === "completed";
                      return (
                        <div key={les.id} className="flex items-center justify-between text-xs py-2 border-b border-slate-100 last:border-none">
                          <span className="text-slate-700 font-bold">{les.title}</span>
                          {isDone ? (
                            <span className="flex items-center gap-1 text-emerald-600 font-black">
                              <CheckCircle2 className="w-3.5 h-3.5" />
                              <span>Selesai</span>
                            </span>
                          ) : (
                            <span className="flex items-center gap-1 text-slate-400 font-medium">
                              <Clock className="w-3.5 h-3.5" />
                              <span>Belum Selesai</span>
                            </span>
                          )}
                        </div>
                      );
                    })}
                  </div>
                </div>
              </FadeIn>
            );
          })}
        </div>
      </div>
    </div>
  );
}


