"use client";

import React, { useState } from "react";
import { SubtopicData } from "@/types/module";
import { ExerciseData } from "@/types/exercise";
import { LessonContent } from "./LessonContent";
import { ExercisePanel } from "./ExercisePanel";
import Link from "next/link";
import { ArrowLeft, ChevronRight, Trophy, Sparkles, BookOpen } from "lucide-react";

interface LessonWorkspaceProps {
  lessonTitle: string;
  moduleTitle: string;
  subtopics: SubtopicData[];
  exerciseMap: Record<string, ExerciseData>;
  nextLessonUrl?: string;
}

export function LessonWorkspace({
  lessonTitle,
  moduleTitle,
  subtopics,
  exerciseMap,
  nextLessonUrl,
}: LessonWorkspaceProps) {
  const [activeSubtopicId, setActiveSubtopicId] = useState<string>(
    subtopics && subtopics.length > 0 ? subtopics[0].id : ""
  );

  const activeSubtopic =
    subtopics.find((s) => s.id === activeSubtopicId) || subtopics[0];

  // Resolve exercises for active subtopic
  const activeExerciseList: ExerciseData[] = [];
  if (activeSubtopic && activeSubtopic.exercises) {
    for (const exId of activeSubtopic.exercises) {
      if (exerciseMap[exId]) {
        activeExerciseList.push(exerciseMap[exId]);
      }
    }
  }

  return (
    <div className="min-h-screen bg-[#FFF0F5] text-[#2D2342] py-8 space-y-6">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-6">
        {/* Top Breadcrumb Navigation */}
        <div className="flex items-center gap-2 text-xs font-bold text-[#2D2342] bg-white/90 p-3 rounded-2xl border-2 border-[#FFC8DD] shadow-sm">
          <Link href="/modules" className="hover:text-[#FF758F] flex items-center gap-1 font-black">
            <ArrowLeft className="w-3.5 h-3.5" />
            <span>Daftar Pelajaran</span>
          </Link>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-slate-600 font-bold">{moduleTitle}</span>
          <ChevronRight className="w-3.5 h-3.5 text-slate-400" />
          <span className="text-[#FF758F] font-black">{lessonTitle}</span>
        </div>

        {/* Sub-Topic Top Navigation Bar */}
        {subtopics && subtopics.length > 0 && (
          <div className="bg-white p-3.5 rounded-3xl border-2 border-[#FFC8DD] shadow-md space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-[#2D2342] uppercase tracking-wider flex items-center gap-1.5">
                <BookOpen className="w-4 h-4 text-[#FF758F]" />
                <span>Pilih Sub-Materi & Latihan:</span>
              </span>
              <span className="text-xs font-mono font-black text-[#FF758F] bg-[#FFF0F5] px-3 py-1 rounded-full border border-[#FFADAD]">
                3 Soal Per Formula
              </span>
            </div>

            <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
              {subtopics.map((st) => {
                const isActive = st.id === activeSubtopicId;
                const isUjian = st.id === "ujian-campuran";

                return (
                  <button
                    key={st.id}
                    type="button"
                    onClick={() => setActiveSubtopicId(st.id)}
                    className={`px-5 py-2.5 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-2 ${
                      isActive
                        ? isUjian
                          ? "bg-[#FFC8DD] text-[#2D2342] border-2 border-[#FF758F] shadow-md scale-105"
                          : "bg-[#FFC8DD] text-[#2D2342] border-2 border-[#FFADAD] shadow-md scale-105"
                        : isUjian
                        ? "bg-[#FFF1C1] border border-[#FFD6A5] text-[#2D2342] hover:bg-[#FFD6A5]/60"
                        : "bg-[#FAF5FF] border border-[#E0CFFC] text-[#2D2342] hover:bg-[#E0CFFC]/40"
                    }`}
                  >
                    {isUjian ? (
                      <Trophy className="w-4 h-4 text-amber-700" />
                    ) : (
                      <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
                    )}
                    <span>{st.title}</span>
                  </button>
                );
              })}
            </div>
          </div>
        )}

        {/* Main Grid Workspace Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Reading Content for Active Subtopic */}
          <div className="lg:col-span-5 space-y-6">
            {activeSubtopic ? (
              <LessonContent
                title={activeSubtopic.title}
                subtitle={activeSubtopic.subtitle}
                sections={activeSubtopic.sections || []}
              />
            ) : (
              <div className="p-6 bg-white rounded-3xl border-2 border-[#FFC8DD] shadow-md">
                <h2 className="font-black text-lg text-[#2D2342]">{lessonTitle}</h2>
              </div>
            )}
          </div>

          {/* Right Column: Interactive Sandbox & Exercise Panel for Active Subtopic */}
          <div className="lg:col-span-7 space-y-6 bg-white p-6 rounded-3xl border-2 border-[#FFC8DD] shadow-md">
            <ExercisePanel exerciseList={activeExerciseList} nextLessonUrl={nextLessonUrl} />
          </div>
        </div>
      </div>
    </div>
  );
}
