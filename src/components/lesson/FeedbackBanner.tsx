"use client";

import { CheckCircle2, XCircle, Lightbulb, HelpCircle, ArrowRightCircle, Sparkles } from "lucide-react";
import { FadeIn } from "@/components/motion/FadeIn";

interface FeedbackBannerProps {
  correct: boolean | null;
  message: string;
  targetCell?: string;
  whyWrong?: string;
  howToFix?: string;
  hint?: string;
}

export function FeedbackBanner({
  correct,
  message,
  targetCell,
  whyWrong,
  howToFix,
  hint,
}: FeedbackBannerProps) {
  if (correct === null) return null;

  return (
    <FadeIn direction="up">
      <div
        className={`p-5 rounded-3xl border-2 shadow-md transition-all space-y-3 ${
          correct
            ? "bg-[#CFFFE5] border-[#A0E7E5] text-[#2D2342]"
            : "bg-[#FFADAD]/30 border-[#FFADAD] text-[#2D2342]"
        }`}
      >
        <div className="flex items-start gap-3">
          {correct ? (
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-[#A0E7E5] shadow-sm">
              <CheckCircle2 className="w-6 h-6 text-emerald-600" />
            </div>
          ) : (
            <div className="w-10 h-10 rounded-2xl bg-white flex items-center justify-center shrink-0 border border-[#FFADAD] shadow-sm">
              <XCircle className="w-6 h-6 text-rose-500" />
            </div>
          )}

          <div className="flex-1 space-y-2">
            <div className="flex items-center gap-2">
              <h4 className="font-black text-base flex items-center gap-1.5 text-[#2D2342]">
                {correct ? (
                  <>
                    <Sparkles className="w-4 h-4 text-emerald-700" />
                    <span>Horeee! Jawaban Kamu Bener Banget!</span>
                  </>
                ) : (
                  <>
                    <Lightbulb className="w-4 h-4 text-amber-700" />
                    <span>Waduh, Dikit Lagi Nih!</span>
                  </>
                )}
              </h4>
              {targetCell && (
                <span className="px-2.5 py-0.5 bg-white border border-[#E0CFFC] text-xs font-mono font-black rounded-lg text-[#2D2342]">
                  Cell {targetCell}
                </span>
              )}
            </div>

            <p className="text-xs sm:text-sm font-semibold leading-relaxed text-[#2D2342]">{message}</p>

            {/* Error Breakdown Explanation */}
            {!correct && (whyWrong || howToFix) && (
              <div className="mt-3 p-4 bg-white rounded-2xl border border-[#FFADAD] space-y-2 text-xs shadow-sm">
                {whyWrong && (
                  <div className="flex items-start gap-2 text-[#2D2342]">
                    <HelpCircle className="w-4 h-4 shrink-0 text-rose-500 mt-0.5" />
                    <div>
                      <strong className="text-rose-700 font-black">Kenapa Salah:</strong> {whyWrong}
                    </div>
                  </div>
                )}
                {howToFix && (
                  <div className="flex items-start gap-2 text-[#2D2342] pt-2 border-t border-slate-100">
                    <ArrowRightCircle className="w-4 h-4 shrink-0 text-emerald-600 mt-0.5" />
                    <div>
                      <strong className="text-emerald-800 font-black">Harusnya Gimana:</strong> {howToFix}
                    </div>
                  </div>
                )}
              </div>
            )}

            {!correct && hint && (
              <div className="mt-2 pt-2 border-t border-[#FFADAD]/60 flex items-start gap-2 text-xs font-bold text-amber-900">
                <Lightbulb className="w-4 h-4 shrink-0 text-amber-600" />
                <span>
                  <strong>Petunjuk:</strong> {hint}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </FadeIn>
  );
}


