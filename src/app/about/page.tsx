"use client";

import GlassCard from "@/components/GlassCard";
import SkillsSpinner from "@/components/SkillsSpinner";
import { motion } from "framer-motion";
import { 
  Briefcase, 
  GraduationCap, 
  Heart, 
  Linkedin, 
  Github, 
  Twitter,
  ArrowUpRight,
  MapPin
} from "lucide-react";
import Link from "next/link";

const experience = [
  {
    role: "Software Developer",
    company: "JP Morgan & Chase",
    period: "2023 - Present",
    description: "Building trading systems and internal tools using Python. Debugging production issues and managing version control workflows.",
  },
  {
    role: "Full Stack Developer",
    company: "DEVTOWN",
    period: "2022 - 2023",
    description: "Developed responsive web applications with React and Node.js. Implemented CI/CD pipelines and optimized SQL performance.",
  },
];

const education = [
  {
    degree: "BSc (Hons) in Computer Science",
    school: "Informatics Institute of Technology",
    period: "2021 - Present",
    description: "Specializing in AI & Machine Learning. Dean&apos;s List recipient.",
  },
];

export default function AboutPage() {
  return (
    <main className="min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      
      {/* ═══════════ HERO BIO ═══════════ */}
      <section className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {/* Bio text */}
        <GlassCard className="md:col-span-2 p-8 md:p-12 flex flex-col justify-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="text-xs font-bold tracking-[0.3em] uppercase text-purple-400 mb-4 block">
              Know About Me
            </span>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-outfit)]">
              Full-Stack Developer{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-500">
                and a little bit of everything
              </span>
            </h1>
            <p className="text-lg text-gray-300 leading-relaxed mb-4">
              I&apos;m Nawod Sanjana, a proactive full-stack developer passionate about creating 
              dynamic web experiences. From frontend to backend, I thrive on solving complex 
              problems with clean, efficient code. My expertise spans React, Next.js, Python, 
              and AI systems.
            </p>
            <p className="text-lg text-gray-300 leading-relaxed mb-8">
              When I&apos;m not immersed in code, I&apos;m exploring new ideas in machine learning 
              and staying curious about emerging technologies. I believe in waking up each day 
              eager to make a difference!
            </p>

            {/* Social Links */}
            <div className="flex gap-4">
              <SocialLink href="https://linkedin.com" icon={Linkedin} label="LinkedIn" />
              <SocialLink href="https://github.com" icon={Github} label="GitHub" />
              <SocialLink href="https://twitter.com" icon={Twitter} label="Twitter" />
              <Link 
                href="#experience" 
                className="flex items-center gap-2 text-cyan-400 hover:text-white transition-colors text-sm font-bold"
              >
                Work Experience <ArrowUpRight size={16} />
              </Link>
            </div>
          </motion.div>
        </GlassCard>

        {/* Profile Image */}
        <GlassCard className="p-8 flex flex-col items-center justify-center relative overflow-hidden group" delay={0.2}>
          <div className="absolute inset-0 bg-gradient-to-tr from-cyan-500/10 to-purple-500/10 group-hover:from-cyan-500/20 group-hover:to-purple-500/20 transition-colors z-0" />
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.3, type: "spring" }}
            className="relative z-10"
          >
            <div className="w-52 h-52 rounded-2xl overflow-hidden border-2 border-white/20 shadow-[0_0_60px_-10px_theme('colors.cyan.500/30')] rotate-3 group-hover:rotate-0 transition-transform duration-500">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img 
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                alt="Nawod Sanjana" 
                className="w-full h-full object-cover"
              />
            </div>
            <div className="mt-4 text-center">
              <div className="text-white font-bold text-lg">Nawod Sanjana</div>
              <div className="flex items-center justify-center gap-1 text-gray-400 text-sm mt-1">
                <MapPin size={14} className="text-cyan-400" />
                Sri Lanka
              </div>
            </div>
          </motion.div>
        </GlassCard>
      </section>

      {/* ═══════════ SKILLS SPINNER ═══════════ */}
      <section className="mb-12">
        <GlassCard className="py-8 px-4 bg-black/40 overflow-hidden">
          <SkillsSpinner />
        </GlassCard>
      </section>

      {/* ═══════════ EXPERIENCE ═══════════ */}
      <section id="experience" className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <Briefcase className="text-cyan-400" size={24} />
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
            Work Experience
          </h2>
        </div>
        <div className="space-y-6">
          {experience.map((exp, i) => (
            <GlassCard key={i} className="p-8 group hover:border-cyan-500/20 transition-colors" delay={i * 0.15}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-cyan-500/50 border border-cyan-500" />
                    <h3 className="text-xl font-bold text-white group-hover:text-cyan-400 transition-colors">
                      {exp.role}
                    </h3>
                  </div>
                  <div className="text-purple-400 font-semibold ml-6 mb-2">{exp.company}</div>
                  <p className="text-gray-400 ml-6">{exp.description}</p>
                </div>
                <span className="text-xs text-gray-500 font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap self-start">
                  {exp.period}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ═══════════ EDUCATION ═══════════ */}
      <section className="mb-12">
        <div className="flex items-center gap-3 mb-8">
          <GraduationCap className="text-purple-400" size={24} />
          <h2 className="text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
            Education
          </h2>
        </div>
        <div className="space-y-6">
          {education.map((edu, i) => (
            <GlassCard key={i} className="p-8 group hover:border-purple-500/20 transition-colors" delay={i * 0.15}>
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                <div className="flex-grow">
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-3 h-3 rounded-full bg-purple-500/50 border border-purple-500" />
                    <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">
                      {edu.degree}
                    </h3>
                  </div>
                  <div className="text-cyan-400 font-semibold ml-6 mb-2">{edu.school}</div>
                  <p className="text-gray-400 ml-6">{edu.description}</p>
                </div>
                <span className="text-xs text-gray-500 font-mono bg-white/5 px-3 py-1.5 rounded-full border border-white/10 whitespace-nowrap self-start">
                  {edu.period}
                </span>
              </div>
            </GlassCard>
          ))}
        </div>
      </section>

      {/* ═══════════ PHILOSOPHY ═══════════ */}
      <GlassCard className="p-12 text-center">
        <Heart className="text-pink-400 mx-auto mb-4" size={28} />
        <blockquote className="text-2xl md:text-3xl font-light italic text-gray-400 font-[family-name:var(--font-outfit)]">
          &ldquo;Code is not just logic; it is the art of solving problems with elegance and efficiency.&rdquo;
        </blockquote>
      </GlassCard>

    </main>
  );
}

function SocialLink({ href, icon: Icon, label }: { href: string; icon: typeof Linkedin; label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-2 hover:bg-white/10 hover:border-white/20 transition-all text-gray-300 hover:text-white text-sm"
    >
      <Icon size={16} />
      {label}
    </a>
  );
}
