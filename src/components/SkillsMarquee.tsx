"use client";

import { motion } from "framer-motion";
import { 
  Code2, 
  Database, 
  BrainCircuit, 
  Terminal, 
  Layers, 
  Server, 
  Globe, 
  Smartphone,
  Cpu,
  GitBranch,
  Cloud,
  Palette,
  type LucideIcon
} from "lucide-react";

const skills = [
  { name: "React", icon: Code2, color: "#61DAFB" },
  { name: "Next.js", icon: Layers, color: "#FFFFFF" },
  { name: "TypeScript", icon: Terminal, color: "#3178C6" },
  { name: "Python", icon: BrainCircuit, color: "#3776AB" },
  { name: "Node.js", icon: Server, color: "#339933" },
  { name: "TensorFlow", icon: Cpu, color: "#FF6F00" },
  { name: "PostgreSQL", icon: Database, color: "#4169E1" },
  { name: "MongoDB", icon: Database, color: "#47A248" },
  { name: "Docker", icon: Cloud, color: "#2496ED" },
  { name: "Git", icon: GitBranch, color: "#F05032" },
  { name: "Flutter", icon: Smartphone, color: "#02569B" },
  { name: "Tailwind CSS", icon: Palette, color: "#06B6D4" },
  { name: "AWS", icon: Globe, color: "#FF9900" },
  { name: "FastAPI", icon: Server, color: "#009688" },
];

function SkillPill({ name, icon: Icon, color }: { name: string; icon: LucideIcon; color: string }) {
  return (
    <div className="flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-full whitespace-nowrap hover:bg-white/10 hover:border-white/20 transition-all group cursor-default select-none">
      <Icon size={20} style={{ color }} className="group-hover:scale-110 transition-transform" />
      <span className="text-sm font-medium text-gray-300 group-hover:text-white transition-colors">{name}</span>
    </div>
  )
}

export default function SkillsMarquee() {
  // Duplicate the skills array for seamless looping
  const allSkills = [...skills, ...skills];
  
  return (
    <div className="w-full space-y-4 overflow-hidden">
      {/* Header */}
      <div className="text-center mb-8">
        <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400 mb-2 block">
          My Skills
        </span>
        <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)]">
          The Secret Sauce
        </h2>
      </div>

      {/* Row 1 — scrolls left */}
      <div className="relative">
        {/* Fade edges */}
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-4"
          animate={{ x: ["0%", "-50%"] }}
          transition={{ 
            x: { repeat: Infinity, repeatType: "loop", duration: 30, ease: "linear" }
          }}
        >
          {allSkills.map((skill, i) => (
            <SkillPill key={`row1-${i}`} {...skill} />
          ))}
        </motion.div>
      </div>

      {/* Row 2 — scrolls right */}
      <div className="relative">
        <div className="absolute left-0 top-0 bottom-0 w-24 bg-gradient-to-r from-black to-transparent z-10 pointer-events-none" />
        <div className="absolute right-0 top-0 bottom-0 w-24 bg-gradient-to-l from-black to-transparent z-10 pointer-events-none" />
        
        <motion.div 
          className="flex gap-4"
          animate={{ x: ["-50%", "0%"] }}
          transition={{ 
            x: { repeat: Infinity, repeatType: "loop", duration: 35, ease: "linear" }
          }}
        >
          {[...allSkills].reverse().map((skill, i) => (
            <SkillPill key={`row2-${i}`} {...skill} />
          ))}
        </motion.div>
      </div>
    </div>
  );
}
