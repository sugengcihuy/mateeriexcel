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
    <div className="space-y-6 bg-white p-6 rounded-3xl border-2 border-[#FFC8DD] shadow-md text-[#2D2342]">
      <div className="border-b border-[#E0CFFC] pb-4">
        <div className="inline-flex items-center gap-2 px-3.5 py-1 bg-[#FFC8DD] text-[#2D2342] text-xs font-black rounded-full border border-[#FFADAD] mb-3 shadow-sm">
          <BookOpen className="w-3.5 h-3.5 text-[#FF758F]" />
          <span>Penjelasan Singkat</span>
        </div>
        <h1 className="text-2xl font-black text-[#2D2342]">{title}</h1>
        {subtitle && <p className="text-sm text-slate-600 mt-1 font-semibold">{subtitle}</p>}
      </div>

      <div className="space-y-5">
        {sections.map((sec, idx) => {
          if (sec.type === "tip") {
            return (
              <div
                key={idx}
                className="p-4 bg-[#CFFFE5] border border-[#A0E7E5] rounded-2xl text-[#2D2342] shadow-sm"
              >
                <div className="flex items-center gap-2 font-black text-emerald-800 text-sm mb-1">
                  <CheckCircle className="w-4 h-4 text-emerald-600" />
                  {sec.heading}
                </div>
                <p className="text-xs leading-relaxed font-semibold">{sec.body}</p>
              </div>
            );
          }

          if (sec.type === "warning") {
            return (
              <div
                key={idx}
                className="p-4 bg-[#FFF1C1] border border-[#FFD6A5] rounded-2xl text-[#2D2342] shadow-sm"
              >
                <div className="flex items-center gap-2 font-black text-amber-900 text-sm mb-1">
                  <HelpCircle className="w-4 h-4 text-amber-600" />
                  {sec.heading}
                </div>
                <p className="text-xs leading-relaxed font-semibold whitespace-pre-line">{sec.body}</p>
              </div>
            );
          }

          return (
            <div key={idx} className="space-y-2">
              <h3 className="text-base font-black text-[#2D2342]">{sec.heading}</h3>
              <p className="text-sm text-slate-700 leading-relaxed font-semibold whitespace-pre-line">
                {sec.body}
              </p>
            </div>
          );
        })}
      </div>
    </div>
  );
}
