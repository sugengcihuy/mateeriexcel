"use client";

import React, { useState } from "react";
import { ExerciseData, CellData } from "@/types/exercise";
import { SpreadsheetGrid } from "@/components/spreadsheet/SpreadsheetGrid";
import { FeedbackBanner } from "./FeedbackBanner";
import {
  Send,
  ArrowRight,
  ArrowLeft,
  HelpCircle,
  RotateCcw,
  CheckCircle2,
  XCircle,
  Sparkles,
  Trophy,
  Award,
  AlertCircle,
  BookOpen,
  FileCheck2,
} from "lucide-react";
import confetti from "canvas-confetti";
import Link from "next/link";

interface ExamWorkspaceProps {
  exerciseList: ExerciseData[];
}

interface QuestionResult {
  exerciseId: string;
  taskNumber: number;
  title: string;
  targetCell: string;
  correct: boolean;
  userFormula?: string;
  userValue?: string | number | boolean | null;
  expectedValue: string | number | boolean | null;
  expectedPattern?: string;
  whyWrong?: string;
  howToFix?: string;
  explanation?: string;
}

export function ExamWorkspace({ exerciseList }: ExamWorkspaceProps) {
  const [currentTaskIndex, setCurrentTaskIndex] = useState<number>(0);

  // Store user grid inputs per exercise ID
  const [userGrids, setUserGrids] = useState<Record<string, Record<string, CellData>>>({});
  // Track which tasks have user inputs
  const [answeredTasks, setAnsweredTasks] = useState<Record<string, boolean>>({});

  const [showKissModal, setShowKissModal] = useState<boolean>(false);
  const [showHintTimer, setShowHintTimer] = useState<boolean>(false);

  // Exam result modal states
  const [showUnansweredWarning, setShowUnansweredWarning] = useState<boolean>(false);
  const [showResultsModal, setShowResultsModal] = useState<boolean>(false);
  const [examResults, setExamResults] = useState<{
    score: number;
    total: number;
    percentage: number;
    details: QuestionResult[];
  } | null>(null);

  const [isValidatingSingle, setIsValidatingSingle] = useState<boolean>(false);
  const [singleValidationResult, setSingleValidationResult] = useState<{
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

  const currentExercise = exerciseList[currentTaskIndex] || exerciseList[0];

  // Active grid data for current exercise
  const currentGridData =
    userGrids[currentExercise.id] ||
    JSON.parse(JSON.stringify(currentExercise.dataset?.data || {}));

  const handleGridChange = (newGrid: Record<string, CellData>) => {
    setUserGrids((prev) => ({
      ...prev,
      [currentExercise.id]: newGrid,
    }));

    // Mark task as attempted if target cell is non-empty
    const targetCellKey = currentExercise.expectedAnswer?.targetCell || "C10";
    const cellVal = newGrid[targetCellKey];
    if (cellVal && (cellVal.formula || (cellVal.value !== undefined && cellVal.value !== ""))) {
      setAnsweredTasks((prev) => ({ ...prev, [currentExercise.id]: true }));
    }
  };

  const handleValidateSingle = async () => {
    if (!currentExercise) return;
    setIsValidatingSingle(true);
    try {
      const res = await fetch(`/api/exercises/${currentExercise.id}/validate`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ gridData: currentGridData }),
      });

      const data = await res.json();

      setSingleValidationResult({
        correct: data.correct,
        message: data.message || (data.correct ? "Jawaban kamu bener!" : "Jawaban kamu belum pas."),
        targetCell: data.targetCell,
        whyWrong: data.whyWrong,
        howToFix: data.howToFix,
        hint: data.hint,
      });

      if (data.correct) {
        setAnsweredTasks((prev) => ({ ...prev, [currentExercise.id]: true }));
        confetti({
          particleCount: 100,
          spread: 70,
          origin: { y: 0.6 },
        });
      }
    } catch (err) {
      console.error("Validation error:", err);
    } finally {
      setIsValidatingSingle(false);
    }
  };

  const handleKissConfirmed = () => {
    setShowKissModal(false);
    setShowHintTimer(true);
    setTimeout(() => {
      setShowHintTimer(false);
    }, 1500);
  };

  const handleResetCurrentTask = () => {
    if (currentExercise) {
      const defaultData = JSON.parse(JSON.stringify(currentExercise.dataset?.data || {}));
      setUserGrids((prev) => ({
        ...prev,
        [currentExercise.id]: defaultData,
      }));
      setSingleValidationResult({ correct: null, message: "" });
      setShowHintTimer(false);
    }
  };

  // Evaluate All 30 Questions and Show Results
  const evaluateAllExamQuestions = async () => {
    let correctCount = 0;
    const detailsList: QuestionResult[] = [];

    for (let i = 0; i < exerciseList.length; i++) {
      const ex = exerciseList[i];
      const grid = userGrids[ex.id] || JSON.parse(JSON.stringify(ex.dataset?.data || {}));

      try {
        const res = await fetch(`/api/exercises/${ex.id}/validate`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ gridData: grid }),
        });
        const data = await res.json();

        const isCorrect = Boolean(data.correct);
        if (isCorrect) correctCount++;

        const targetKey = ex.expectedAnswer?.targetCell || "";
        const userCell = grid[targetKey];

        detailsList.push({
          exerciseId: ex.id,
          taskNumber: i + 1,
          title: ex.title || "Soal",
          targetCell: targetKey,
          correct: isCorrect,
          userFormula: userCell?.formula || "",
          userValue: userCell?.value,
          expectedValue: ex.expectedAnswer?.expectedValue ?? "",
          expectedPattern: ex.expectedAnswer?.requiredFormulaPattern,
          whyWrong: data.whyWrong,
          howToFix: data.howToFix,
          explanation: (ex as unknown as { explanation?: string }).explanation,
        });
      } catch (e) {
        console.error(e);
        detailsList.push({
          exerciseId: ex.id,
          taskNumber: i + 1,
          title: ex.title || "Soal",
          targetCell: ex.expectedAnswer?.targetCell || "",
          correct: false,
          expectedValue: ex.expectedAnswer?.expectedValue ?? "",
          whyWrong: "Belum dijawab atau terjadi kesalahan pemeriksaan.",
          howToFix: `Ganti rumus di cell ${ex.expectedAnswer?.targetCell} menjadi ${ex.hint}`,
          explanation: (ex as unknown as { explanation?: string }).explanation,
        });
      }
    }

    const percentage = Math.round((correctCount / exerciseList.length) * 100);

    setExamResults({
      score: correctCount,
      total: exerciseList.length,
      percentage,
      details: detailsList,
    });

    setShowUnansweredWarning(false);
    setShowResultsModal(true);

    if (percentage >= 80) {
      confetti({
        particleCount: 200,
        spread: 100,
        origin: { y: 0.5 },
      });
    }
  };

  const handleStartEvaluateExam = () => {
    const answeredCount = Object.keys(answeredTasks).length;
    if (answeredCount < exerciseList.length) {
      setShowUnansweredWarning(true);
    } else {
      evaluateAllExamQuestions();
    }
  };

  const totalTasks = exerciseList.length;
  const answeredCount = Object.keys(answeredTasks).length;

  return (
    <div className="space-y-6">
      {/* Top Banner & Exam Action Header */}
      <div className="p-6 bg-gradient-to-r from-[#FFC8DD] via-[#E0CFFC] to-[#BDE0FE] rounded-3xl border-2 border-[#FFADAD] shadow-lg flex flex-wrap items-center justify-between gap-4">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="px-3 py-1 bg-white text-[#2D2342] text-xs font-black rounded-full border border-[#DBCDF0] shadow-sm flex items-center gap-1.5">
              <Trophy className="w-3.5 h-3.5 text-amber-600" />
              <span>Ujian Praktik Comprehensive</span>
            </span>
            <span className="px-3 py-1 bg-[#CFFFE5] text-emerald-900 text-xs font-mono font-black rounded-full border border-[#A0E7E5]">
              {answeredCount} / {totalTasks} Soal Diisi
            </span>
          </div>
          <h1 className="text-2xl font-black text-[#2D2342] tracking-tight">
            Ujian Praktik Excel Super Lengkap (30 Soal)
          </h1>
          <p className="text-xs text-slate-700 font-bold max-w-2xl">
            Selesaikan 30 soal tantangan rumus Excel dari Modul 1 sampai Modul 3. Tekan tombol <strong>Lihat Hasil Ujian Praktik</strong> untuk evaluasi nilai dan penjelasan lengkap!
          </p>
        </div>

        <button
          type="button"
          onClick={handleStartEvaluateExam}
          className="px-6 py-3.5 bg-[#2D2342] hover:bg-[#1E172E] text-white font-black text-sm rounded-2xl shadow-xl transition-all border-2 border-[#FFC8DD] flex items-center gap-2 shrink-0 active:scale-95"
        >
          <FileCheck2 className="w-5 h-5 text-[#FF758F]" />
          <span>Lihat Hasil Ujian Praktik</span>
        </button>
      </div>

      {/* Task Switcher Row (1 - 30) */}
      <div className="p-4 bg-white border-2 border-[#E0CFFC] rounded-3xl space-y-3 shadow-md">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-[#FF758F]" />
            <span className="text-xs font-black text-[#2D2342]">
              Pilih Nomor Soal (1 sampai 30)
            </span>
          </div>
          <span className="text-xs font-bold text-slate-500">
            Soal Aktif: {currentTaskIndex + 1} dari {totalTasks}
          </span>
        </div>

        {/* Task Buttons Scrollable Row */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-thin">
          {exerciseList.map((ex, idx) => {
            const isSelected = idx === currentTaskIndex;
            const isAnswered = answeredTasks[ex.id];

            return (
              <button
                key={ex.id}
                type="button"
                onClick={() => {
                  setCurrentTaskIndex(idx);
                  setSingleValidationResult({ correct: null, message: "" });
                }}
                className={`px-3.5 py-2 rounded-2xl text-xs font-black transition-all shrink-0 flex items-center gap-1.5 ${
                  isSelected
                    ? "bg-[#FFC8DD] text-[#2D2342] border-2 border-[#FFADAD] shadow-md scale-105"
                    : isAnswered
                    ? "bg-[#CFFFE5] border border-[#A0E7E5] text-emerald-900 hover:bg-[#A0E7E5]"
                    : "bg-[#FAF5FF] border border-[#E0CFFC] text-[#2D2342] hover:bg-[#E0CFFC]/40"
                }`}
              >
                {isAnswered ? (
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                ) : (
                  <span className="w-2 h-2 rounded-full bg-slate-300" />
                )}
                <span>Soal {idx + 1}</span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Main Exercise Content & Grid */}
      <div className="p-5 bg-white text-[#2D2342] rounded-3xl shadow-md space-y-3 border-2 border-[#E0CFFC]">
        <div className="flex items-center justify-between">
          <span className="px-3.5 py-1 bg-[#FFC8DD] text-[#2D2342] border border-[#FFADAD] rounded-full text-xs font-black">
            {currentExercise.title || `Soal ${currentTaskIndex + 1} dari ${totalTasks}`}
          </span>
          <button
            onClick={handleResetCurrentTask}
            className="flex items-center gap-1 text-xs text-slate-500 hover:text-[#FF758F] font-bold transition-colors"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Reset Soal Ini</span>
          </button>
        </div>
        <h3 className="text-lg font-black text-[#2D2342]">Tugas Ujian:</h3>
        <p className="text-sm text-slate-700 leading-relaxed font-semibold">{currentExercise.instruction}</p>
      </div>

      {/* Spreadsheet Grid Sandbox */}
      <div className="space-y-2">
        <div className="flex items-center justify-between px-1">
          <span className="text-xs font-black text-slate-600 uppercase tracking-wider">
            Lembar Kerja Excel Ujian (Tabel Data Realistis)
          </span>
          <span className="text-xs text-[#FF758F] font-extrabold">
            Ketik di cell target lalu tekan Enter
          </span>
        </div>
        <SpreadsheetGrid
          initialDataset={currentExercise.dataset}
          gridData={currentGridData}
          onGridChange={handleGridChange}
        />
      </div>

      {/* Single Task Feedback Banner */}
      <FeedbackBanner
        correct={singleValidationResult.correct}
        message={singleValidationResult.message}
        targetCell={singleValidationResult.targetCell}
        whyWrong={singleValidationResult.whyWrong}
        howToFix={singleValidationResult.howToFix}
        hint={singleValidationResult.hint}
      />

      {/* Bottom Action Bar */}
      <div className="flex flex-wrap items-center justify-between gap-4 pt-2">
        <button
          type="button"
          onClick={() => setShowKissModal(true)}
          className="flex items-center gap-1.5 text-xs text-[#2D2342] hover:text-[#FF758F] font-extrabold bg-[#FFF1C1] hover:bg-[#FFD6A5] px-4 py-2.5 rounded-full border border-[#FFD6A5] transition-all shadow-sm"
        >
          <HelpCircle className="w-4 h-4 text-amber-700" />
          <span>Butuh Bocoran Rumus?</span>
        </button>

        <div className="flex items-center gap-3">
          <button
            onClick={handleValidateSingle}
            disabled={isValidatingSingle}
            className="flex items-center gap-2 px-5 py-2.5 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] font-black text-xs rounded-2xl shadow-sm border border-[#FFADAD] transition-all disabled:opacity-50"
          >
            <Send className="w-3.5 h-3.5 text-[#2D2342]" />
            <span>{isValidatingSingle ? "Mengecek..." : "Cek Soal Ini"}</span>
          </button>

          {currentTaskIndex > 0 && (
            <button
              onClick={() => {
                setCurrentTaskIndex(currentTaskIndex - 1);
                setSingleValidationResult({ correct: null, message: "" });
              }}
              className="flex items-center gap-1.5 px-4 py-2.5 bg-[#FAF5FF] hover:bg-[#E0CFFC]/50 text-[#2D2342] font-black text-xs rounded-2xl border border-[#E0CFFC] shadow-sm transition-all"
            >
              <ArrowLeft className="w-3.5 h-3.5" />
              <span>Soal Sebelumnya</span>
            </button>
          )}

          {currentTaskIndex < totalTasks - 1 && (
            <button
              onClick={() => {
                setCurrentTaskIndex(currentTaskIndex + 1);
                setSingleValidationResult({ correct: null, message: "" });
              }}
              className="flex items-center gap-1.5 px-5 py-2.5 bg-[#BDE0FE] hover:bg-[#90E0EF] text-[#2D2342] font-black text-xs rounded-2xl shadow-sm border border-[#90E0EF] transition-all"
            >
              <span>Lanjut Soal ${currentTaskIndex + 2}</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>
      </div>

      {/* 1.5s Formula Hint Timer */}
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

      {/* Warning Unanswered Modal */}
      {showUnansweredWarning && (
        <div className="fixed inset-0 z-50 bg-black/50 backdrop-blur-sm flex items-center justify-center p-4 animate-in fade-in duration-200">
          <div className="bg-white border-4 border-amber-400 rounded-3xl p-6 max-w-md w-full text-center space-y-5 shadow-2xl animate-in zoom-in-95 duration-200">
            <div className="w-14 h-14 bg-amber-100 border-2 border-amber-400 rounded-full flex items-center justify-center mx-auto text-amber-700 shadow-sm">
              <AlertCircle className="w-8 h-8" />
            </div>
            <div className="space-y-1">
              <h3 className="text-xl font-black text-[#2D2342]">Masih Ada Soal Belum Diisi!</h3>
              <p className="text-xs text-slate-600 font-bold leading-relaxed">
                Kamu baru mengisi <strong>{answeredCount}</strong> dari <strong>{totalTasks}</strong> soal. Yakin mau langsung lihat hasil ujian sekarang?
              </p>
            </div>
            <div className="flex items-center gap-3 pt-2">
              <button
                type="button"
                onClick={() => setShowUnansweredWarning(false)}
                className="flex-1 py-3 bg-slate-100 hover:bg-slate-200 text-[#2D2342] font-black rounded-2xl border border-slate-300 text-xs transition-all"
              >
                Isi Soal Lagi
              </button>
              <button
                type="button"
                onClick={evaluateAllExamQuestions}
                className="flex-1 py-3 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] font-black rounded-2xl border border-[#FFADAD] text-xs shadow-md transition-all"
              >
                Tetap Lihat Hasil
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Comprehensive Exam Results Modal & Report */}
      {showResultsModal && examResults && (
        <div className="fixed inset-0 z-50 bg-black/60 backdrop-blur-md flex items-center justify-center p-3 sm:p-6 overflow-y-auto animate-in fade-in duration-200">
          <div className="bg-[#FAF5FF] border-4 border-[#E0CFFC] rounded-3xl max-w-4xl w-full p-6 sm:p-8 space-y-6 shadow-2xl max-h-[90vh] overflow-y-auto my-auto animate-in zoom-in-95 duration-200">
            {/* Header Score Summary Card */}
            <div className="p-6 bg-white border-2 border-[#E0CFFC] rounded-3xl text-center space-y-4 shadow-md">
              <div className="w-16 h-16 bg-[#FFC8DD] border-2 border-[#FFADAD] rounded-full flex items-center justify-center mx-auto text-[#2D2342] shadow-md">
                {examResults.percentage >= 80 ? (
                  <Trophy className="w-9 h-9 text-amber-700" />
                ) : (
                  <Award className="w-9 h-9 text-[#FF758F]" />
                )}
              </div>

              <div className="space-y-1">
                <span className="px-3.5 py-1 bg-[#E0CFFC] text-[#2D2342] border border-[#C7CEEA] rounded-full text-xs font-black">
                  {examResults.percentage >= 90
                    ? "🏆 Sepuh Excel Sejati"
                    : examResults.percentage >= 75
                    ? "🌟 Abang-Abangan Excel"
                    : "💪 Pejuang Excel Ayya"}
                </span>
                <h2 className="text-3xl font-black text-[#2D2342]">Hasil Ujian Praktik Comprehensive</h2>
              </div>

              {/* Big Score Display */}
              <div className="inline-flex items-center gap-4 px-6 py-3 bg-[#FFF1C1] border-2 border-[#FFD6A5] rounded-2xl shadow-inner">
                <div>
                  <span className="text-3xl font-black text-[#2D2342]">{examResults.score}</span>
                  <span className="text-sm font-bold text-slate-500"> / {examResults.total} Benar</span>
                </div>
                <div className="w-px h-8 bg-amber-300" />
                <div className="text-2xl font-black text-amber-800">
                  {examResults.percentage}%
                </div>
              </div>
            </div>

            {/* Explanation & Review Section */}
            <div className="space-y-4">
              <div className="flex items-center gap-2 px-1">
                <BookOpen className="w-4 h-4 text-[#FF758F]" />
                <h3 className="text-sm font-black text-[#2D2342] uppercase tracking-wider">
                  Rincian Evaluasi & Penjelasan Belajar (Soal 1 s/d 30)
                </h3>
              </div>

              <div className="space-y-4">
                {examResults.details.map((q) => (
                  <div
                    key={q.exerciseId}
                    className={`p-5 rounded-2xl border-2 transition-all space-y-3 shadow-sm ${
                      q.correct
                        ? "bg-emerald-50/80 border-emerald-300"
                        : "bg-rose-50/80 border-rose-300"
                    }`}
                  >
                    <div className="flex items-center justify-between gap-3">
                      <div className="flex items-center gap-2.5">
                        {q.correct ? (
                          <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0" />
                        ) : (
                          <XCircle className="w-5 h-5 text-rose-600 shrink-0" />
                        )}
                        <span className="font-black text-[#2D2342] text-sm">
                          Soal {q.taskNumber}: {q.title}
                        </span>
                      </div>
                      <span
                        className={`px-3 py-0.5 text-xs font-black rounded-full border ${
                          q.correct
                            ? "bg-emerald-100 text-emerald-900 border-emerald-300"
                            : "bg-rose-100 text-rose-900 border-rose-300"
                        }`}
                      >
                        {q.correct ? "BETUL ✅" : "SALAH ❌"}
                      </span>
                    </div>

                    {/* Formula comparison */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs font-mono bg-white p-3 rounded-xl border border-slate-200">
                      <div>
                        <span className="text-slate-500 font-bold block">Rumus/Isian Kamu:</span>
                        <span className="font-black text-[#2D2342]">
                          {q.userFormula || (q.userValue !== undefined ? String(q.userValue) : "(Kosong)")}
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 font-bold block">Target Jawaban:</span>
                        <span className="font-black text-emerald-800">
                          {String(q.expectedValue)} {q.expectedPattern ? `(Fungsi ${q.expectedPattern})` : ""}
                        </span>
                      </div>
                    </div>

                    {/* Detailed Explanation */}
                    <div className="text-xs text-slate-700 space-y-1 font-medium bg-white/60 p-3 rounded-xl border border-slate-200">
                      {q.correct ? (
                        <div className="text-emerald-900 font-bold">
                          <strong>Penjelasan Kenapa Benar:</strong> Jawaban dan rumus kamu di cell {q.targetCell} sudah 100% tepat. {q.explanation}
                        </div>
                      ) : (
                        <div className="space-y-1">
                          <div className="text-rose-900 font-bold">
                            <strong>Kenapa Salah:</strong> {q.whyWrong || `Hasil perhitungan belum sesuai dengan target ${q.expectedValue}.`}
                          </div>
                          <div className="text-slate-800 font-bold">
                            <strong>Cara Memperbaiki:</strong> {q.howToFix || `Ganti rumus di cell ${q.targetCell}.`}
                          </div>
                          {q.explanation && (
                            <div className="text-slate-600 font-semibold pt-1 border-t border-slate-200 mt-1">
                              <strong>Penjelasan Materi:</strong> {q.explanation}
                            </div>
                          )}
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Modal Bottom Actions */}
            <div className="flex items-center justify-between gap-4 pt-4 border-t-2 border-[#E0CFFC]">
              <button
                type="button"
                onClick={() => setShowResultsModal(false)}
                className="px-5 py-2.5 bg-white hover:bg-slate-50 text-[#2D2342] font-black rounded-2xl border border-[#DBCDF0] text-xs shadow-sm"
              >
                Tutup & Periksa Lembar Kerja
              </button>

              <Link
                href="/modules"
                className="px-6 py-3 bg-[#FFC8DD] hover:bg-[#FFADAD] text-[#2D2342] font-black rounded-2xl border border-[#FFADAD] text-xs shadow-md transition-all flex items-center gap-2"
              >
                <Sparkles className="w-4 h-4" />
                <span>Kembali Ke Daftar Pelajaran</span>
              </Link>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
