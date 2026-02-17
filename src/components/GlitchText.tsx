"use client";

import { motion } from "framer-motion";
import { useState } from "react";

interface GlitchTextProps {
  text: string;
  className?: string;
}

export default function GlitchText({ text, className = "" }: GlitchTextProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className={`relative inline-block font-bold cursor-default select-none ${className}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Main Text */}
      <span className="relative z-10">{text}</span>

      {/* Glitch Layer 1 (Red/Cyan Offset) */}
      <motion.span
        className="absolute top-0 left-0 text-cyan-400 opacity-70 z-0 mix-blend-screen"
        animate={isHovered ? {
          x: [-2, 2, -1, 3, 0],
          y: [1, -1, 2, -2, 0],
          opacity: [0.5, 0.8, 0.5],
        } : { x: 0, y: 0, opacity: 0 }}
        transition={{ duration: 0.2, repeat: Infinity, repeatType: "mirror" }}
      >
        {text}
      </motion.span>

      {/* Glitch Layer 2 (Blue/Purple Offset) */}
      <motion.span
        className="absolute top-0 left-0 text-red-500 opacity-70 z-0 mix-blend-screen"
        animate={isHovered ? {
            x: [2, -2, 1, -3, 0],
            y: [-1, 1, -2, 2, 0],
            opacity: [0.5, 0.8, 0.5],
        } : { x: 0, y: 0, opacity: 0 }}
        transition={{ duration: 0.3, repeat: Infinity, repeatType: "mirror" }}
      >
        {text}
      </motion.span>

      {/* Random Slice Glitch (Clip Path) */}
        {isHovered && (
            <>
                <motion.span 
                    className="absolute inset-0 bg-white text-black z-20 pointer-events-none mix-blend-difference"
                    initial={{ clipPath: 'inset(50% 0 50% 0)' }}
                    animate={{ clipPath: ['inset(10% 0 80% 0)', 'inset(80% 0 5% 0)', 'inset(30% 0 60% 0)', 'inset(50% 0 50% 0)'] }}
                    transition={{ duration: 0.4, repeat: Infinity }}
                >
                    {text}
                </motion.span>
            </>
        )}
    </div>
  );
}
