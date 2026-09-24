"use client";

import { motion } from "framer-motion";

interface AnimatedProgressBarProps {
  progress: number; // 0 to 100
  colorClassName?: string;
  heightClassName?: string;
}

export function AnimatedProgressBar({
  progress,
  colorClassName = "bg-emerald-500",
  heightClassName = "h-2.5",
}: AnimatedProgressBarProps) {
  const clamped = Math.min(100, Math.max(0, progress));

  return (
    <div className={`w-full bg-slate-200 dark:bg-slate-800 rounded-full overflow-hidden ${heightClassName}`}>
      <motion.div
        className={`${heightClassName} ${colorClassName} rounded-full`}
        initial={{ width: 0 }}
        animate={{ width: `${clamped}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
