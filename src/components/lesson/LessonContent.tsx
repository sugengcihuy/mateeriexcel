"use client";

import React from "react";
import { BookOpen, CheckCircle, HelpCircle } from "lucide-react";

interface Section {
  type: "concept" | "tip" | "warning";
  heading: string;
  body: string;
}

interface LessonContentProps {
  title: string;
  subtitle?: string;
  sections: Section[];
}

export function LessonContent({ title, subtitle, sections }: LessonContentProps) {
  return (
    <div className="space-y-6 bg-slate-900 p-6 rounded-2xl border border-slate-800 shadow-sm text-slate-100">
      <div className="border-b border-slate-800 pb-4">
        <div className="inline-flex items-center gap-2 px-3 py-1 bg-emerald-950 text-emerald-400 text-xs font-semibold rounded-full border border-emerald-800 mb-3">
          <BookOpen className="w-3.5 h-3.5" />
          <span>Penjelasan Singkat</span>
        </div>
        <h1 className="text-2xl font-bold text-slate-100">{title}</h1>
        {subtitle && <p className="text-sm text-slate-400 mt-1">{subtitle}</p>}
      </div>

      <div className="space-y-5">
        {sections.map((sec, idx) => {
          if (sec.type === "tip") {
            return (
              <div
                key={idx}
                className="p-4 bg-emerald-950/40 border border-emerald-800 rounded-xl text-slate-200"
              >
                <div className="flex items-center gap-2 font-bold text-emerald-400 text-sm mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-400" />
                  {sec.heading}
                </div>
                <p className="text-xs leading-relaxed opacity-90">{sec.body}</p>
              </div>
            );
          }

          if (sec.type === "warning") {
            return (
              <div
                key={idx}
                className="p-4 bg-amber-950/40 border border-amber-800 rounded-xl text-slate-200"
              >
                <div className="flex items-center gap-2 font-bold text-amber-400 text-sm mb-1">
                  <HelpCircle className="w-4 h-4 text-amber-400" />
                  {sec.heading}
                </div>
                <p className="text-xs leading-relaxed opacity-90 whitespace-pre-line">{sec.body}</p>
              </div>
            );
          }

          return (
            <div key={idx} className="space-y-2">
              <h3 className="text-base font-bold text-slate-100">{sec.heading}</h3>
              <p className="text-sm text-slate-300 leading-relaxed whitespace-pre-line">
                {sec.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
