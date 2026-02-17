"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { MessageCircle, X } from "lucide-react";

export default function ContactPopup() {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    // Show popup after 10 seconds
    const timer = setTimeout(() => {
      setIsVisible(true);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          initial={{ opacity: 0, y: 100, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          exit={{ opacity: 0, y: 100, scale: 0.9 }}
          transition={{ type: "spring", stiffness: 300, damping: 20 }}
          className="fixed bottom-6 right-6 z-50 max-w-sm w-full md:w-auto"
        >
          <div className="relative group">
            {/* Close Button */}
            <button
              onClick={() => setIsVisible(false)}
              className="absolute -top-3 -right-3 p-1.5 bg-gray-800 text-gray-400 rounded-full border border-gray-700 hover:text-white hover:border-gray-500 transition-colors z-20 shadow-lg"
            >
              <X size={14} />
            </button>

            <Link href="/contact" onClick={() => setIsVisible(false)}>
              <div className="relative bg-black/80 backdrop-blur-xl border border-cyan-500/30 p-5 rounded-2xl shadow-2xl hover:shadow-cyan-500/20 hover:border-cyan-500/50 transition-all cursor-pointer overflow-hidden group">
                
                {/* Glow Effect */}
                <div className="absolute top-0 right-0 w-32 h-32 bg-cyan-500/10 rounded-full blur-2xl -translate-y-1/2 translate-x-1/2" />

                <div className="flex items-start gap-4">
                  {/* Icon/Avatar Placeholder */}
                  <div className="relative">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-600 rounded-full flex items-center justify-center shadow-lg group-hover:scale-110 transition-transform duration-300">
                      <MessageCircle size={24} className="text-white" />
                    </div>
                    {/* Online Status Dot */}
                    <div className="absolute bottom-0 right-0 w-3.5 h-3.5 bg-green-500 border-2 border-black rounded-full shadow-sm animate-pulse" />
                  </div>

                  {/* Text Content */}
                  <div className="flex-1 space-y-1">
                    <h3 className="font-bold text-white text-sm">
                      Need a Developer? 👋
                    </h3>
                    <p className="text-xs text-gray-300 leading-relaxed">
                      I&apos;m available for freelance projects! Let&apos;s build something amazing together.
                    </p>
                    <div className="text-[10px] font-bold text-cyan-400 uppercase tracking-wider mt-2 group-hover:translate-x-1 transition-transform inline-flex items-center gap-1">
                      Send me a message <span>→</span>
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
