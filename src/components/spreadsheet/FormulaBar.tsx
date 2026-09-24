"use client";

import React, { useEffect, useState, useRef } from "react";
import { FunctionSquare } from "lucide-react";

interface FormulaBarProps {
  activeCellRef: string;
  value: string;
  onCommit: (val: string) => void;
  onLiveChange?: (val: string) => void;
}

export function FormulaBar({
  activeCellRef,
  value,
  onCommit,
  onLiveChange,
}: FormulaBarProps) {
  const [localVal, setLocalVal] = useState<string>(value);
  const inputRef = useRef<HTMLInputElement>(null);

  // Sync local value when active cell or parent value changes from cell click
  useEffect(() => {
    setLocalVal(value);
  }, [value, activeCellRef]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVal = e.target.value;
    setLocalVal(newVal);
    if (onLiveChange) {
      onLiveChange(newVal);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      onCommit(localVal);
    }
  };

  const handleBlur = () => {
    onCommit(localVal);
  };

  return (
    <div className="flex items-center gap-2 px-3 py-2 bg-[#FAF5FF] border-2 border-[#E0CFFC] rounded-2xl text-sm font-mono shadow-sm w-full">
      <div className="w-14 px-2 py-1 bg-[#FFC8DD] border border-[#FFADAD] rounded-xl text-center font-black text-[#2D2342] select-none text-xs">
        {activeCellRef || "A1"}
      </div>
      <div className="flex items-center gap-1 text-[#2D2342] font-sans font-bold px-1 select-none">
        <FunctionSquare className="w-4 h-4 text-[#FF758F]" />
        <span className="italic text-xs font-black text-[#2D2342]">fx</span>
      </div>
      <input
        ref={inputRef}
        type="text"
        value={localVal}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        onBlur={handleBlur}
        placeholder="Ketik formula di sini (contoh: =SUM(B2:B6) atau =VLOOKUP(...))"
        className="flex-1 px-3 py-1.5 bg-white border border-[#E0CFFC] rounded-xl focus:outline-none focus:border-[#FFC8DD] text-[#2D2342] placeholder:text-slate-400 font-mono text-sm font-bold shadow-inner"
      />
    </div>
  );
}

