"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

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

    // Intro duration ~ 2.4 seconds for smooth motion graphic experience
    const timer = setTimeout(() => {
      setShowIntro(false);
      try {
        sessionStorage.setItem("has_seen_excel_intro", "true");
      } catch (e) {
        console.error(e);
      }
    }, 2400);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {showIntro && (
        <motion.div
          initial={{ opacity: 1, filter: "blur(0px)" }}
          exit={{ opacity: 0, scale: 1.05, filter: "blur(12px)" }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-[#FAF5FF] overflow-hidden select-none"
        >
          {/* Liquid Ambient Gradient Orbs */}
          <div className="absolute inset-0 pointer-events-none overflow-hidden">
            <motion.div
              animate={{
                scale: [1, 1.25, 1],
                x: [-20, 20, -20],
                y: [-20, 20, -20],
              }}
              transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -top-32 -left-32 w-96 h-96 bg-[#FFC8DD]/50 rounded-full blur-3xl"
            />
            <motion.div
              animate={{
                scale: [1.2, 1, 1.2],
                x: [20, -20, 20],
                y: [20, -20, 20],
              }}
              transition={{ duration: 7, repeat: Infinity, ease: "easeInOut" }}
              className="absolute -bottom-32 -right-32 w-[28rem] h-[28rem] bg-[#E0CFFC]/60 rounded-full blur-3xl"
            />
          </div>

          {/* Motion Graphic Typography Container */}
          <div className="relative z-10 text-center px-4 space-y-5 max-w-2xl mx-auto">
            {/* Main Title: Belajar Excel Ayya */}
            <motion.div
              initial={{ y: 28, opacity: 0, scale: 0.92, filter: "blur(8px)" }}
              animate={{ y: 0, opacity: 1, scale: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.85, ease: [0.175, 0.885, 0.32, 1.275] }}
              className="relative inline-block"
            >
              <h1 className="text-4xl sm:text-6xl font-black text-[#2D2342] tracking-tight leading-none">
                Belajar Excel{" "}
                <span className="relative inline-block bg-gradient-to-r from-[#FF758F] via-[#FF8E9E] to-[#FF477E] bg-clip-text text-transparent drop-shadow-[0_4px_20px_rgba(255,117,143,0.45)]">
                  Ayya
                </span>
              </h1>

              {/* Specular Light Sweep Beam Effect */}
              <motion.div
                initial={{ x: "-100%", opacity: 0 }}
                animate={{ x: "220%", opacity: [0, 1, 1, 0] }}
                transition={{ duration: 1.25, delay: 0.45, ease: "easeInOut" }}
                className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/80 to-transparent skew-x-[-25deg] pointer-events-none mix-blend-overlay"
              />
            </motion.div>

            {/* Subtitle: Developed By Tama */}
            <motion.div
              initial={{ y: 16, opacity: 0, filter: "blur(4px)" }}
              animate={{ y: 0, opacity: 1, filter: "blur(0px)" }}
              transition={{ duration: 0.9, delay: 0.4, ease: [0.16, 1, 0.3, 1] }}
              className="pt-1"
            >
              <span className="px-5 py-2 rounded-full bg-white/80 border-2 border-[#E0CFFC] text-[#2D2342] text-xs sm:text-sm font-black uppercase tracking-[0.25em] shadow-[0_6px_20px_rgba(224,207,252,0.6)] backdrop-blur-md inline-block">
                Developed By Tama
              </span>
            </motion.div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
