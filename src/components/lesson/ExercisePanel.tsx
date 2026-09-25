"use client";

import React, { useState, useEffect } from "react";
import { ExerciseData, CellData } from "@/types/exercise";
import { SpreadsheetGrid } from "@/components/spreadsheet/SpreadsheetGrid";
import { FeedbackBanner } from "./FeedbackBanner";
import { RoomSyncBar } from "@/components/spreadsheet/RoomSyncBar";
import { Send, ArrowRight, HelpCircle, RotateCcw, CheckCircle2, Sparkles, Trophy } from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";
import { PivotBuilder } from "@/components/spreadsheet/PivotBuilder";

interface ExercisePanelProps {
  exerciseList: ExerciseData[];
  nextLessonUrl?: string;
}

export function ExercisePanel({ exerciseList, nextLessonUrl }: ExercisePanelProps) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);
  const [completedTaskIds, setCompletedTaskIds] = useState<Record<string, boolean>>({});

  const currentExercise = exerciseList[currentTaskIndex] || exerciseList[0];

  const [currentGridData, setCurrentGridData] = useState<Record<string, CellData>>(
    currentExercise?.dataset?.data || {}
  );
  const [isValidating, setIsValidating] = useState<boolean>(false);
  const [validationResult, setValidationResult] = useState<{
    correct: boolean | null;
    message: string;
    targetCell?: string;
    whyWrong?: string;
    howToFix?: string;
    hint?: string;
  }>({
    correct: null,
    message: "",
  });
  const [showKissModal, setShowKissModal] = useState<boolean>(false);
  const [showHintTimer, setShowHintTimer] = useState<boolean>(false);

  // Load saved completed tasks from localStorage
  useEffect(() => {
    try {
      const saved = localStorage.getItem("excel_learn_completed_tasks");
      if (saved) {
        setCompletedTaskIds(JSON.parse(saved));
      }
    } catch (e) {
      console.error(e);
    }
  }, []);

  // Reset task index to 0 whenever exerciseList changes (e.g. switching subtopics)
  useEffect(() => {
    setCurrentTaskIndex(0);
  }, [exerciseList]);

  // Cleanly isolate current grid data ONLY to active exercise dataset when switching tasks
  useEffect(() => {
    if (currentExercise) {
      setCurrentGridData(JSON.parse(JSON.stringify(currentExercise.dataset?.data || {})));
      setValidationResult({ correct: null, message: "" });
      setShowHintTimer(false);
    }
  }, [currentExercise, currentTaskIndex]);

  const handleGridChange = (newGrid: Record<string, CellData>) => {
    setCurrentGridData(newGrid);
  };

  const handleRemoteGridSynced = (syncedGrid: Record<string, CellData>) => {
    if (syncedGrid && Object.keys(syncedGrid).length > 0 && currentExercise) {
      const baseDataset = JSON.parse(JSON.stringify(currentExercise.dataset?.data || {}));
      setCurrentGridData({
        ...baseDataset,
        ...syncedGrid,
      });
    }
  };

  const handleValidate = async () => {
    if (!currentExercise) return;
    setIsValidating(true);
    try {
      const res = await fetch(`/api/exercises/${currentExercise.id}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gridData: currentGridData }),
      });

      const data = await res.json();

      setValidationResult({
        correct: data.correct,
        message: data.message || (data.correct ? "Jawaban kamu bener!" : "Jawaban kamu belum pas."),
        targetCell: data.targetCell,
        whyWrong: data.whyWrong,
        howToFix: data.howToFix,
        hint: data.hint,
      });

      if (data.correct) {
        // Update completed task status
        const updated = { ...completedTaskIds, [currentExercise.id]: true };
        setCompletedTaskIds(updated);
        try {
          localStorage.setItem("excel_learn_completed_tasks", JSON.stringify(updated));

          const savedProgress = localStorage.getItem("excel_learn_progress");
          const progressMap = savedProgress ? JSON.parse(savedProgress) : {};
          progressMap[currentExercise.lessonId] = "completed";
          localStorage.setItem("excel_learn_progress", JSON.stringify(progressMap));
        } catch (e) {
          console.error(e);
        }

        confetti({
          particleCount: 120,
          spread: 80,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error("Validation error:", err);
      setValidationResult({
        correct: false,
        message: "Gagal terhubung ke server. Coba klik lagi ya.",
      });
    } finally {
      setIsValidating(false);
    }
  };

  
  const handleOpenKissModal = () => {
    setShowKissModal(true);
  };

  const handleKissConfirmed = () => {
    setShowKissModal(false);
    setShowHintTimer(true);
    setTimeout(() => {
      setShowHintTimer(false);
    }, 1500);
  };

  const handleReset = () => {
    if (currentExercise) {
      setCurrentGridData(currentExercise.dataset?.data || {});
      setValidationResult({ correct: null, message: "" });
      setShowHintTimer(false);
    }
  };

  const totalTasks = exerciseList.length;
  const completedCount = exerciseList.filter((e) => completedTaskIds[e.id]).length;
  const isAllTasksCompleted = totalTasks > 0 && completedCount === totalTasks;

  if (!currentExercise) {
    return <PivotBuilder />;
  }

  return (
    <div className="space-y-6">
      {/* Realtime Room Sync Bar for Ayya & Friend */}
      <RoomSyncBar
        exerciseId={currentExercise?.id}
        currentGridData={currentGridData}
        onGridSynced={handleRemoteGridSynced}
      />

      {/* Task Switcher Selector Bar */}
      <div className="p-4 bg-white border-2 border-[#E0CFFC] rounded-3xl space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF758F]" />
            <span className="text-xs font-black text-[#2D2342]">
              Pilih Tugas Latihan ({completedCount} / {totalTasks} Selesai)
            </span>
          </div>
          {isAllTasksCompleted && (
            <span className="px-3 py-1 bg-[#CFFFE5] text-emerald-800 border border-[#A0E7E5] text-xs font-black rounded-full flex items-center gap-1.5 shadow-sm">
              <Trophy className="w-3.5 h-3.5 text-amber-700" />
              <span>100% Selesai Semua!</span>
            </span>
          )}
        </div>

        {/* Task Buttons Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-thin">
          {exerciseList.map((ex, idx) => {
            const isSelected = idx === currentTaskIndex;
            const isDone = completedTaskIds[ex.id];

            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => setCurrentTaskIndex(idx)}
                className={`px-4 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#FFC8DD] text-[#2D2342] border-2 border-[#FFADAD] shadow-md scale-105"
                    : isDone
                    ? "bg-[#CFFFE5] border border-[#A0E7E5] text-emerald-900 hover:bg-[#A0E7E5]"
                    : "bg-[#FAF5FF] border border-[#E0CFFC] text-[#2D2342] hover:bg-[#E0CFFC]/40"
                }`}
              >
                {isDone ? (
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-400" />
                )}
                <span>Soal {idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Special PivotTable check for Task 10 in Advanced module */}
      {currentExercise.id === "ex-adv-10" ? (
        <PivotBuilder onComplete={() => setCompletedTaskIds((prev) => ({ ...prev, [currentExercise.id]: true }))} />
      ) : (
        <>
          {/* Exercise Instruction Header */}
          <div className="p-5 bg-white text-[#2D2342] rounded-3xl shadow-md space-y-3 border-2 border-[#E0CFFC]">
            <div className="flex items-center justify-between">
              <span className="px-3.5 py-1 bg-[#FFC8DD] text-[#2D2342] border border-[#FFADAD] rounded-full text-xs font-black">
                {currentExercise.title || `Soal ${currentTaskIndex + 1} dari ${totalTasks}`}
              </span>
              <button
                onClick={handleReset}
                className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#FF758F] font-bold transition-colors"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Ulang Soal Ini</span>
              </button>
            </div>
            <h3 className="text-lg font-black text-[#2D2342]">Tugas Kamu:</h3>
            <p className="text-sm text-slate-700 leading-relaxed font-semibold">{currentExercise.instruction}</p>
          </div>

          {/* Spreadsheet Sandbox */}
          <div className="space-y-2">
            <div className="flex items-center justify-between px-1">
              <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
                Lembar Kerja Excel (Tampilan Simpel & Mirip Asli)
              </span>
              <span className="text-xs text-[#FF758F] font-extrabold">
                Ketik di kotak cell lalu tekan Enter
              </span>
            </div>
            <SpreadsheetGrid initialDataset={currentExercise.dataset} gridData={currentGridData} onGridChange={handleGridChange} />
          </div>

          {/* Validation Feedback */}
          <FeedbackBanner
            correct={validationResult.correct}
            message={validationResult.message}
            targetCell={validationResult.targetCell}
            whyWrong={validationResult.whyWrong}
            howToFix={validationResult.howToFix}
            hint={validationResult.hint}
          />

          {/* Action Buttons */}
          <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
            <button
              type="button"
              onClick={handleOpenKissModal}
              className="flex items-center gap-1.5 text-xs text-[#2D2342] hover:text-[#FF758F] font-extrabold bg-[#FFF1C1] hover:bg-[#FFD6A5] px-3.5 py-2 rounded-full border border-[#FFD6A5] transition-all shadow-sm"
            >
              <HelpCircle className="w-4 h-4 text-amber-700" />
              <span>Butuh Bocoran Rumus?</span>
            </button>

            <div className="flex items-center gap-3">
              <button
                onClick={handleValidate}
                disabled={isValidating}
                className="flex items-center gap-2 px-6 py-3 bg-[#FFC8DD] hover:bg-[#FFADAD] active:scale-[0.98] text-[#2D2342] font-black text-sm rounded-2xl shadow-md border border-[#FFADAD] transition-all disabled:opacity-50"
              >
                <Send className="w-4 h-4 text-[#2D2342]" />
                <span>{isValidating ? "Mengecek..." : "Cek Jawaban Aku"}</span>
              </button>

              {validationResult.correct && currentTaskIndex < totalTasks - 1 && (
                <button
                  onClick={() => setCurrentTaskIndex(currentTaskIndex + 1)}
                  className="flex items-center gap-2 px-6 py-3 bg-[#BDE0FE] hover:bg-[#90E0EF] text-[#2D2342] font-black text-sm rounded-2xl shadow-md border border-[#90E0EF] transition-all"
                >
                  <span>Lanjut Ke Soal {currentTaskIndex + 2}</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              )}

              {validationResult.correct && currentTaskIndex === totalTasks - 1 && nextLessonUrl && (
                <Link
                  href={nextLessonUrl}
                  className="flex items-center gap-2 px-6 py-3 bg-[#CFFFE5] hover:bg-[#A0E7E5] text-emerald-900 font-black text-sm rounded-2xl shadow-md border border-[#A0E7E5] transition-all"
                >
                  <Sparkles className="w-4 h-4 text-emerald-700" />
                  <span>Lanjut Ke Modul Berikutnya</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>
              )}
            </div>
          </div>

          {/* Optional Hint Box */}
          {showHintTimer && currentExercise.hint && (
            <div className="p-4 bg-[#FFF1C1] border-2 border-[#FFD6A5] rounded-2xl text-xs text-[#2D2342] leading-relaxed shadow-md animate-in fade-in duration-200">
              <strong className="text-amber-800 font-black">Bocoran Rumus (Tampil 1.5 Detik):</strong> {currentExercise.hint}
            </div>
          )}

          {/* Kiss Dulu Modal Popup */}
          {showKissModal && (
            <div className="fixed inset-0 z-50 bg-black/40 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
              <div className="bg-white border-4 border-[#FF758F] rounded-3xl p-6 max-w-sm w-full text-center space-y-4 shadow-2xl animate-in zoom-in-95 duration-200">
                <h3 className="text-xl font-black text-[#2D2342]">Kiss Dulu</h3>
                <p className="text-[#2D2342] font-black text-sm leading-relaxed">
                  Kiss dluu la bejirrrr
                </p>
                <button
                  type="button"
                  onClick={handleKissConfirmed}
                  className="w-full py-3 bg-[#FFC8DD] hover:bg-[#FFADAD] active:scale-95 text-[#2D2342] font-black rounded-2xl border-2 border-[#FFADAD] shadow-md transition-all text-sm flex items-center justify-center gap-2"
                >
                  <span>Sudah</span>
                </button>
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
}


