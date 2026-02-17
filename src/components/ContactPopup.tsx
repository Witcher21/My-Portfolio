"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { X, Send, Sparkles } from "lucide-react";

import { usePathname } from "next/navigation";

export default function ContactPopup() {
  const [isVisible, setIsVisible] = useState(false);
  const [count, setCount] = useState(0);
  const [isStopped, setIsStopped] = useState(false);
  const pathname = usePathname(); // Detect current page

  // Reset stop status on page change (optional, if you want it to reappear on new pages even if closed previously)
  // useEffect(() => { setIsStopped(false); setCount(0); }, [pathname]); 

  useEffect(() => {
    // If user stopped it manually, don't show again in this session
    if (isStopped || count >= 4) return;

    // 1. Show after 8 seconds of silence
    const showTimer = setTimeout(() => {
      setIsVisible(true);
    }, 8000);

    // 2. Hide after being visible for 6 seconds (Total 14s)
    const cycleTimer = setTimeout(() => {
      setIsVisible(false);
      setCount((prev) => prev + 1);
    }, 14000);

    return () => {
      clearTimeout(showTimer);
      clearTimeout(cycleTimer);
    };
  }, [count, isStopped, pathname]); // Re-run effect if pathname changes (resets the 8s timer)

  const handleClose = () => {
    setIsVisible(false);
    setIsStopped(true); // Stop loop if user interacts
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, x: 100, scale: 0.9 }}
          animate={{ opacity: 1, x: 0, scale: 1 }}
          exit={{ opacity: 0, x: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 200, damping: 20 }}
          // Lower z-index to 9000 so CustomCursor (z-100000) is ON TOP
          className="fixed bottom-6 right-6 z-[9000] max-w-sm w-full md:w-auto perspective-1000"
        >
            <div className="relative group">
                {/* Close Button - Floating */}
                <button
                onClick={handleClose}
                className="absolute -top-3 -right-3 p-2 bg-black/80 text-white/70 rounded-full border border-white/10 hover:text-white hover:border-red-500 hover:bg-red-500/20 transition-all z-20 shadow-lg backdrop-blur-md"
                >
                <X size={14} />
                </button>

                <Link href="/contact" onClick={() => setIsVisible(false)}>
                <div className="relative bg-stone-950/80 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-3xl shadow-[0_0_40px_-10px_rgba(6,182,212,0.3)] hover:shadow-[0_0_50px_-5px_rgba(6,182,212,0.5)] hover:border-cyan-400/60 transition-all cursor-pointer overflow-hidden group">
                    
                    {/* Holographic Scanline */}
                    <div className="absolute inset-0 bg-gradient-to-b from-transparent via-cyan-400/5 to-transparent bg-[length:100%_200%] animate-scanline pointer-events-none" />
                    
                    {/* Glow Accents */}
                    <div className="absolute -top-10 -right-10 w-32 h-32 bg-cyan-500/20 rounded-full blur-3xl" />
                    <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-purple-500/20 rounded-full blur-3xl" />

                    <div className="flex items-start gap-4 relative z-10">
                        {/* Avatar / Icon */}
                        <div className="relative">
                            <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-cyan-950 to-black border border-cyan-500/30 flex items-center justify-center shadow-lg group-hover:scale-105 transition-transform duration-300">
                            <Sparkles size={20} className="text-cyan-400 animate-pulse" />
                            </div>
                            {/* Notification Batch */}
                            <div className="absolute -top-1 -right-1 w-4 h-4 bg-red-500 border-2 border-black rounded-full flex items-center justify-center">
                                <span className="text-[8px] font-bold text-white">1</span>
                            </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 space-y-1">
                            <div className="flex justify-between items-center">
                                <h3 className="font-bold text-white text-sm tracking-wide font-[family-name:var(--font-outfit)]">
                                Incoming Request 📡
                                </h3>
                                <span className="text-[10px] text-gray-500 font-mono">Now</span>
                            </div>
                            
                            <p className="text-xs text-gray-300 leading-relaxed font-light">
                            Looking for a high-performance developer? Let&apos;s build something extraordinary.
                            </p>
                            
                            {/* Action Button */}
                            <div className="mt-3 flex items-center gap-2 text-xs font-bold text-cyan-400 group-hover:gap-3 transition-all duration-300 bg-cyan-950/30 py-1.5 px-3 rounded-lg w-fit border border-cyan-500/10 group-hover:border-cyan-500/30">
                                <span>Reply Now</span> <Send size={12} />
                            </div>
                        </div>
                    </div>
                </div>
                </Link>
            </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
