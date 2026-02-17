"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ScanFace, Fingerprint, X, Sparkles, Terminal, Shield, Wifi, Cpu, Cloud, Database } from "lucide-react";

const QUESTIONS = [
  {
    id: 1,
    text: "Select your primary weapon:",
    options: [
      { label: "<Code />", value: "code", icon: Terminal },
      { label: "Design", value: "design", icon: Sparkles },
      { label: "Data", value: "data", icon: Database },
      { label: "AI Models", value: "ai", icon: ScanFace },
      { label: "Security", value: "security", icon: Shield },
      { label: "Hardware", value: "hardware", icon: Cpu },
      { label: "Cloud", value: "cloud", icon: Cloud },
      { label: "Networks", value: "network", icon: Wifi },
    ]
  }
];

const IDENTITIES: Record<string, { title: string; desc: string; color: string }> = {
  code: { title: "The Code Wizard", desc: "You turn caffeine into clean, efficient algorithms.", color: "text-purple-400" },
  design: { title: "Pixel Perfect", desc: "Your eye for aesthetics is legendary. UI is your canvas.", color: "text-pink-400" },
  data: { title: "The Data Seer", desc: "You see patterns where others see chaos. Data is your ally.", color: "text-blue-400" },
  ai: { title: "Neural Architect", desc: "You speak fluent deep learning. The singularity is near.", color: "text-cyan-400" },
  security: { title: "The White Hat", desc: "Guardian of the digital realm. No firewall can stop you.", color: "text-green-400" },
  hardware: { title: "Silicon Smith", desc: "Master of circuits and sensors. You bridge atoms and bits.", color: "text-amber-400" },
  cloud: { title: "Cloud Walker", desc: "You scale infrastructure to the heavens. Uptime is your religion.", color: "text-sky-400" },
  network: { title: "The Netrunner", desc: "Packet sniffer extraordinaire. You are the connection.", color: "text-orange-400" },
};

const SCAN_STEPS = [
  "Initializing neural link...",
  "Analyzing choice vector...",
  "Calibrating personality matrix...",
  "Decrypting potential...",
  "Match found!"
];

export default function CyberScanner() {
  const [isOpen, setIsOpen] = useState(false);
  const [step, setStep] = useState<"intro" | "question" | "scanning" | "result">("intro");
  const [scanProgress, setScanProgress] = useState(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [result, setResult] = useState<typeof IDENTITIES["code"] | null>(null);

  const startProcess = () => {
    setStep("question");
  };

  const handleAnswer = (value: string) => {
    setSelectedOption(value);
    setStep("scanning");
    setScanProgress(0);
  };

  useEffect(() => {
    if (step === "scanning") {
      if (scanProgress < SCAN_STEPS.length) {
        const timeout = setTimeout(() => {
          setScanProgress((prev) => prev + 1);
        }, 800);
        return () => clearTimeout(timeout);
      } else {
        // Scan complete
        setStep("result");
        if (selectedOption) {
            setResult(IDENTITIES[selectedOption]);
        }
      }
    }
  }, [step, scanProgress, selectedOption]);

  const reset = () => {
    setStep("intro");
    setSelectedOption(null);
    setResult(null);
    setScanProgress(0);
  };

  return (
    <>
      {/* Trigger Button - Floating fun icon */}
      <motion.button
        whileHover={{ scale: 1.1, rotate: 5 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 left-6 z-40 w-14 h-14 bg-black/50 backdrop-blur-md border border-cyan-500/30 rounded-full flex items-center justify-center group overflow-hidden shadow-[0_0_20px_rgba(6,182,212,0.2)] hover:shadow-[0_0_30px_rgba(6,182,212,0.4)] transition-all"
      >
        <div className="absolute inset-0 bg-cyan-500/10 rounded-full animate-ping opacity-20" />
        <ScanFace className="text-cyan-400 group-hover:text-white transition-colors" size={28} />
        
        {/* Tooltip */}
        <span className="absolute left-16 bg-black/90 text-cyan-400 text-xs font-bold px-3 py-1.5 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap border border-cyan-500/20 translate-x-2 group-hover:translate-x-0 duration-300 pointer-events-none">
          Identify Yourself
        </span>
      </motion.button>

      {/* Scanner Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm"
          >
            {/* Click outside to close */}
            <div className="absolute inset-0" onClick={() => setIsOpen(false)} />

            <motion.div
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              className="relative w-full max-w-md md:max-w-xl bg-black border border-cyan-500/30 rounded-2xl overflow-hidden shadow-2xl"
            >
              {/* Decorative Header */}
              <div className="bg-cyan-500/5 px-6 py-4 border-b border-cyan-500/20 flex justify-between items-center">
                <div className="flex items-center gap-2">
                  <Terminal size={16} className="text-cyan-500" />
                  <span className="text-xs font-mono text-cyan-400 tracking-widest uppercase">
                    CYBER_IDENTITY_SCANNER_V2.0
                  </span>
                </div>
                <button
                  onClick={() => setIsOpen(false)}
                  className="text-gray-500 hover:text-white transition-colors"
                >
                  <X size={18} />
                </button>
              </div>

              <div className="p-8 flex flex-col items-center justify-center min-h-[400px]">
                {/* Intro Step */}
                {step === "intro" && (
                  <div className="text-center space-y-6">
                    <div className="relative w-32 h-32 mx-auto">
                      <div className="absolute inset-0 border-2 border-dashed border-cyan-500/30 rounded-full animate-[spin_10s_linear_infinite]" />
                      <div className="absolute inset-2 border-2 border-cyan-500/50 rounded-full animate-[ping_3s_ease-out_infinite] opacity-20" />
                      <button
                        onClick={startProcess}
                        className="absolute inset-0 flex items-center justify-center text-cyan-400 hover:text-white hover:scale-105 transition-all duration-300 bg-cyan-500/10 rounded-full hover:bg-cyan-500/20"
                      >
                        <Fingerprint size={48} />
                      </button>
                    </div>
                    <h3 className="text-2xl font-bold text-white font-[family-name:var(--font-outfit)]">
                      Identify Yourself
                    </h3>
                    <p className="text-gray-400 text-sm max-w-xs mx-auto">
                      We need to verify your developer class.
                    </p>
                    <button
                      onClick={startProcess}
                      className="px-8 py-3 bg-cyan-600 hover:bg-cyan-500 text-white font-bold rounded-xl shadow-lg shadow-cyan-500/20 transition-all active:scale-95"
                    >
                      BEGIN ANALYSIS
                    </button>
                  </div>
                )}

                {/* Question Step */}
                {step === "question" && (
                  <motion.div
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    className="w-full space-y-6"
                  >
                    <h3 className="text-xl font-bold text-white text-center font-[family-name:var(--font-outfit)]">
                      {QUESTIONS[0].text}
                    </h3>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                      {QUESTIONS[0].options.map((option) => (
                        <button
                          key={option.value}
                          onClick={() => handleAnswer(option.value)}
                          className="flex flex-col items-center gap-2 p-3 bg-white/5 border border-white/10 rounded-xl hover:bg-cyan-500/10 hover:border-cyan-500/50 transition-all group"
                        >
                          <option.icon size={20} className="text-gray-400 group-hover:text-cyan-400" />
                          <span className="text-xs font-medium text-gray-300 group-hover:text-white text-center">
                            {option.label}
                          </span>
                        </button>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Scanning Step */}
                {step === "scanning" && (
                  <div className="text-center space-y-8 w-full">
                    <div className="relative w-full h-40 bg-cyan-900/10 rounded-xl overflow-hidden border border-cyan-500/30">
                      <div className="absolute inset-0 opacity-20" 
                        style={{ 
                          backgroundImage: 'linear-gradient(#06b6d4 1px, transparent 1px), linear-gradient(90deg, #06b6d4 1px, transparent 1px)', 
                          backgroundSize: '20px 20px' 
                        }} 
                      />
                      <motion.div
                        animate={{ top: ["0%", "100%", "0%"] }}
                        transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
                        className="absolute left-0 w-full h-1 bg-cyan-400 shadow-[0_0_20px_rgba(6,182,212,1)] z-10"
                      />
                      <div className="absolute inset-0 flex items-center justify-center opacity-50">
                        <ScanFace size={80} className="text-cyan-500/40" />
                      </div>
                    </div>

                    <motion.div
                      key={scanProgress}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-cyan-400 font-mono text-sm tracking-wider"
                    >
                      {SCAN_STEPS[Math.min(scanProgress, SCAN_STEPS.length - 1)]}
                      <span className="animate-pulse">_</span>
                    </motion.div>
                  </div>
                )}

                {/* Result Step */}
                {step === "result" && result && (
                  <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-center space-y-6"
                  >
                    <div className="w-24 h-24 mx-auto bg-gradient-to-br from-cyan-500/20 to-purple-500/20 rounded-full flex items-center justify-center border-2 border-cyan-500/50 shadow-[0_0_30px_rgba(6,182,212,0.3)]">
                      <Sparkles size={40} className="text-cyan-400" />
                    </div>
                    
                    <div className="space-y-2">
                      <h4 className="text-gray-400 text-xs font-bold uppercase tracking-widest">
                        IDENTITY CONFIRMED
                      </h4>
                      <h2 className={`text-3xl md:text-4xl font-bold font-[family-name:var(--font-outfit)] ${result.color}`}>
                        {result.title}
                      </h2>
                      <p className="text-gray-300 text-base md:text-lg">
                        {result.desc}
                      </p>
                    </div>

                    <button
                      onClick={reset}
                      className="mt-4 px-6 py-2 border border-white/10 hover:bg-white/5 rounded-lg text-sm text-gray-400 hover:text-white transition-all underline decoration-cyan-500/50"
                    >
                      Scan Another
                    </button>
                  </motion.div>
                )}
              </div>

              {/* Decorative corners */}
              <div className="absolute top-0 left-0 w-4 h-4 border-t-2 border-l-2 border-cyan-500" />
              <div className="absolute top-0 right-0 w-4 h-4 border-t-2 border-r-2 border-cyan-500" />
              <div className="absolute bottom-0 left-0 w-4 h-4 border-b-2 border-l-2 border-cyan-500" />
              <div className="absolute bottom-0 right-0 w-4 h-4 border-b-2 border-r-2 border-cyan-500" />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
