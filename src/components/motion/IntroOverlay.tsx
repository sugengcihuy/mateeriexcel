"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { FileSpreadsheet, Sparkles } from "lucide-react";

export function IntroOverlay() {
  const [showIntro, setShowIntro] = useState<boolean>(true);

  useEffect(() => {
    try {
      const hasSeen = sessionStorage.getItem("has_seen_excel_intro");
      if (hasSeen) {
        setShowIntro(false);
        return;
      }
    } catch (e) {
      console.error(e);
    }

    const timer = setTimeout(() => {
      setShowIntro(false);
      try {
        sessionStorage.setItem("has_seen_excel_intro", "true");
      } catch (e) {
        console.error(e);
      }
    }, 1300);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5FF]"
        >
          <div className="text-center space-y-4">
            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
              className="inline-flex items-center justify-center w-20 h-20 rounded-3xl bg-white border-2 border-[#FFC8DD] shadow-[8px_8px_20px_rgba(210,190,235,0.5),-8px_-8px_20px_rgba(255,255,255,1)] text-[#FF758F]"
            >
              <FileSpreadsheet className="w-10 h-10" />
            </motion.div>

            <motion.div
              initial={{ y: 10, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="space-y-1"
            >
              <h2 className="text-2xl font-black text-[#2D2342]">
                Belajar Excel <span className="text-[#FF758F]">Ayya</span>
              </h2>
              <div className="flex items-center justify-center gap-1 text-xs font-bold text-slate-500">
                <Sparkles className="w-3.5 h-3.5 text-[#FF758F]" />
                <span>Menyiapkan Lembar Kerja...</span>
              </div>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
