"use client";

import GlassCard from "@/components/GlassCard";
import { 
  Code2, 
  Database, 
  Layers, 
  Terminal, 
  ExternalLink,
  Activity,
  type LucideIcon,
  ArrowUpRight,
  MapPin,
  Clock,
  Rocket,
  Sparkles,
  ArrowRight,
  Zap
} from "lucide-react";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";
import SkillsMarquee from "@/components/SkillsMarquee";

const Earth = dynamic(() => import("@/components/Earth"), { ssr: false });

export default function Home() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  });

  const y = useTransform(scrollYProgress, [0, 1], ["0%", "50%"]);
  const opacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);

  return (
    <main ref={containerRef} className="min-h-screen font-sans relative z-10">
      
      {/* ═══════════════════════════════════════════ */}
      {/*  HERO SECTION — Full-width Greeting        */}
      {/* ═══════════════════════════════════════════ */}
      <section className="min-h-screen flex items-center justify-center px-4 md:px-8 relative">
        <motion.div 
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="max-w-5xl w-full text-center space-y-8"
        >
          {/* Profile Image + Badge */}
          <motion.div 
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="flex flex-col items-center gap-4"
          >
            <div className="relative">
              <div className="w-28 h-28 rounded-full overflow-hidden border-2 border-white/20 shadow-[0_0_60px_-10px_theme('colors.cyan.500/40')]">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img 
                  src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&q=80&w=400" 
                  alt="Nawod Sanjana" 
                  className="w-full h-full object-cover"
                />
              </div>
              <div className="absolute -bottom-1 -right-1 w-8 h-8 bg-green-500 rounded-full border-4 border-black flex items-center justify-center">
                <Zap size={14} className="text-white" />
              </div>
            </div>
            
            <div className="flex items-center gap-2 bg-white/5 border border-white/10 rounded-full px-4 py-1.5 backdrop-blur-md">
              <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
              <span className="text-green-400 text-xs font-bold tracking-widest uppercase">Available for Freelance</span>
            </div>
          </motion.div>

          {/* Main Heading */}
          <div className="space-y-4">
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-gray-400 text-lg md:text-xl"
            >
              Hello, I&apos;m
            </motion.p>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
              className="text-6xl md:text-9xl font-bold text-white font-[family-name:var(--font-outfit)] leading-[0.9] tracking-tight"
            >
              Nawod{" "}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-500">
                Sanjana
              </span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto leading-relaxed"
            >
              a <span className="text-white font-semibold">Full Stack Developer</span>
            </motion.p>
          </div>

          {/* CTAs */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="flex flex-wrap gap-4 justify-center pt-4"
          >
            <Link href="/contact" data-cursor="Chat">
              <motion.button
                whileHover={{ scale: 1.05, boxShadow: "0 0 30px rgba(6,182,212,0.3)" }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-black rounded-full font-bold flex items-center gap-2 hover:bg-cyan-50 transition-colors text-lg"
              >
                Let&apos;s Talk <ArrowUpRight size={20} />
              </motion.button>
            </Link>
            <Link href="/projects" data-cursor="View">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white/5 text-white border border-white/20 rounded-full font-bold backdrop-blur-md hover:bg-white/10 transition-colors text-lg"
              >
                View Work
              </motion.button>
            </Link>
          </motion.div>
        </motion.div>

        {/* Scroll indicator */}
        <motion.div 
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5 }}
          className="absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        >
          <span className="text-gray-600 text-xs tracking-widest uppercase">Scroll</span>
          <motion.div 
            animate={{ y: [0, 8, 0] }}
            transition={{ repeat: Infinity, duration: 1.5 }}
            className="w-5 h-8 border-2 border-gray-600 rounded-full flex justify-center pt-1.5"
          >
            <div className="w-1 h-2 bg-gray-500 rounded-full" />
          </motion.div>
        </motion.div>
      </section>

      {/* Skills Marquee Ticker */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mb-8">
        <GlassCard className="py-6 px-0 bg-black/40 overflow-hidden">
          <SkillsMarquee />
        </GlassCard>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  BENTO GRID                                */}
      {/* ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 auto-rows-[minmax(180px,auto)]">
          
          {/* 🌎 EARTH GLOBE */}
          <GlassCard className="col-span-1 md:col-span-2 row-span-2 p-0 relative overflow-hidden bg-black/60" delay={0.1}>
            <div className="absolute top-6 left-6 z-10 space-y-2">
              <div className="flex items-center gap-2 text-cyan-400">
                <MapPin size={16} className="animate-bounce" />
                <span className="text-xs font-bold tracking-widest uppercase">Based in Sri Lanka</span>
              </div>
              <h3 className="text-2xl md:text-3xl font-bold text-white font-[family-name:var(--font-outfit)]">
                Work From <br/>
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
                  Anywhere
                </span>
              </h3>
              <div className="flex items-center gap-2 text-gray-400 text-sm mt-2">
                <Clock size={14} />
                <span>Any timezone, any time</span>
              </div>
            </div>
            <div className="w-full h-full min-h-[400px]">
              <Earth />
            </div>
            <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-black/50 to-transparent z-10 pointer-events-none" />
            <div className="absolute bottom-6 left-6 right-6 z-10 flex gap-3">
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs text-gray-300 flex items-center gap-2">
                <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse" />
                Remote Ready
              </div>
              <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-4 py-2 text-xs text-gray-300">
                🌍 Global Clients
              </div>
            </div>
          </GlassCard>

          {/* EXPERIENCE TIMELINE */}
          <GlassCard className="col-span-1 md:col-span-2 row-span-1 p-8 flex flex-col justify-center gap-6" delay={0.2}>
            <div className="flex items-center justify-between border-b border-white/10 pb-4">
               <h3 className="text-xl font-semibold text-white flex items-center gap-2">
                  <Activity className="text-cyan-400" size={20} /> Career Trajectory
               </h3>
               <span className="text-xs text-gray-500 uppercase tracking-wider">2+ Years Exp</span>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative">
              <ExperienceItem 
                role="Software Developer" 
                company="JP Morgan & Chase" 
                desc="Python, Version Control, System Debugging" 
                year="2023 - Present"
              />
              <ExperienceItem 
                role="Full Stack Developer" 
                company="DEVTOWN" 
                desc="CI/CD, SQL Optimization, Mobile Responsiveness" 
                year="2022 - 2023"
              />
            </div>
          </GlassCard>

          {/* TECH STACK */}
          <GlassCard className="col-span-1 md:col-span-1 row-span-1 p-6 flex flex-col items-center justify-center text-center space-y-6 bg-gradient-to-b from-white/5 to-black/40" delay={0.3}>
            <div className="text-gray-400 text-xs uppercase tracking-[0.2em]">Tech Stack</div>
            <div className="flex flex-col gap-4 w-full">
               <SkillRow icon={Code2} label="React & Next.js" level="Expert" color="text-cyan-400" />
               <SkillRow icon={Terminal} label="Python & AI" level="Advanced" color="text-yellow-400" />
               <SkillRow icon={Database} label="SQL & NoSQL" level="Proficient" color="text-green-400" />
               <SkillRow icon={Layers} label="DevOps" level="Intermediate" color="text-purple-400" />
            </div>
          </GlassCard>

          {/* STATS */}
          <GlassCard className="col-span-1 md:col-span-1 p-6 flex flex-col justify-between bg-gradient-to-br from-purple-900/10 to-transparent" delay={0.35}>
             <div>
                 <div className="text-5xl font-bold text-white mb-2">06+</div>
                 <div className="text-gray-400 text-sm uppercase tracking-wider">Major Projects</div>
             </div>
             <div className="text-right">
                 <div className="text-5xl font-bold text-white mb-2">100%</div>
                 <div className="text-gray-400 text-sm uppercase tracking-wider">Commitment</div>
             </div>
          </GlassCard>

        </div>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  UPCOMING PROJECTS / NEXT VENTURES         */}
      {/* ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mt-8">
        <GlassCard className="p-8 md:p-12 bg-black/40" delay={0.4}>
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-10 gap-4">
            <div>
              <div className="flex items-center gap-2 text-purple-400 mb-2">
                <Rocket size={18} />
                <span className="text-xs font-bold tracking-[0.2em] uppercase">Coming Soon</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)]">
                Next Ventures
              </h2>
              <p className="text-gray-400 mt-2 max-w-lg">
                Exciting projects in the pipeline. Stay tuned for launch.
              </p>
            </div>
            <Link href="/projects" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider shrink-0">
              All Projects <ArrowUpRight size={16} />
            </Link>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <UpcomingProject 
              title="AI Code Reviewer"
              description="An intelligent tool that reviews pull requests, suggests improvements, and catches bugs using LLMs."
              status="In Development"
              progress={65}
              tags={["Python", "GPT-4", "GitHub API"]}
            />
            <UpcomingProject 
              title="Portfolio V2 — 3D"
              description="Next iteration of this portfolio with full 3D scenes, interactive timeline, and immersive project tours."
              status="Designing"
              progress={30}
              tags={["Three.js", "Blender", "GSAP"]}
            />
            <UpcomingProject 
              title="SaaS Analytics Dashboard"
              description="Real-time business intelligence platform with custom widgets, team collaboration, and automated reports."
              status="Planning"
              progress={15}
              tags={["Next.js", "Supabase", "Chart.js"]}
            />
          </div>
        </GlassCard>
      </section>

      {/* ═══════════════════════════════════════════ */}
      {/*  FEATURED WORK                             */}
      {/* ═══════════════════════════════════════════ */}
      <section className="px-4 md:px-8 max-w-7xl mx-auto mt-8 pb-32">
        <GlassCard className="p-8 bg-black/40" delay={0.5}>
           <div className="flex justify-between items-end mb-8">
                <div>
                    <div className="flex items-center gap-2 text-cyan-400 mb-2">
                      <Sparkles size={18} />
                      <span className="text-xs font-bold tracking-[0.2em] uppercase">Case Studies</span>
                    </div>
                    <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)]">
                        Featured Work
                    </h2>
                    <p className="text-gray-400 mt-2">Projects that define my engineering journey.</p>
                </div>
                <Link href="/projects" className="text-cyan-400 hover:text-white transition-colors flex items-center gap-1 text-sm font-bold uppercase tracking-wider">
                    View All <ArrowUpRight size={16} />
                </Link>
           </div>
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <ProjectCard 
                title="Deepfake Detection" 
                category="AI / Deep Learning" 
                borderColor="border-purple-500/30"
                hoverColor="hover:border-purple-500"
                image="https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800"
              />
              <ProjectCard 
                title="Stock Price Data Feed" 
                category="Real-time Visualization" 
                borderColor="border-blue-500/30"
                hoverColor="hover:border-blue-500"
                image="https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800"
              />
              <ProjectCard 
                title="Brain Tumor Segmentation" 
                category="Medical AI" 
                borderColor="border-cyan-500/30"
                hoverColor="hover:border-cyan-500"
                image="https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800"
              />
           </div>
        </GlassCard>
      </section>

    </main>
  );
}

// ══════════════════════════════════════════
// Sub-components
// ══════════════════════════════════════════

function SkillRow({ icon: Icon, label, level, color }: { icon: LucideIcon; label: string; level: string; color: string }) {
  return (
    <div className="flex items-center gap-4 w-full group">
      <div className={`p-2 bg-white/5 rounded-lg border border-white/10 ${color}`}>
        <Icon size={18} />
      </div>
      <div className="flex-grow">
        <div className="text-sm font-medium text-white group-hover:text-cyan-400 transition-colors">{label}</div>
        <div className="h-1 w-full bg-white/10 rounded-full mt-1 overflow-hidden">
            <div className={`h-full bg-current opacity-50 ${color.replace('text', 'bg')}`} style={{ width: level === 'Expert' ? '95%' : level === 'Advanced' ? '85%' : '70%' }} />
        </div>
      </div>
    </div>
  )
}

function ExperienceItem({ role, company, desc, year }: { role: string; company: string; desc: string; year: string }) {
  return (
    <div className="flex gap-4 group">
        <div className="flex flex-col items-center">
            <div className="w-3 h-3 rounded-full bg-cyan-500/50 border border-cyan-500" />
            <div className="w-px h-full bg-gradient-to-b from-cyan-500/50 to-transparent my-1" />
        </div>
        <div>
            <div className="text-xs text-gray-500 font-mono mb-1">{year}</div>
            <div className="text-white font-bold text-lg group-hover:text-cyan-400 transition-colors">{role}</div>
            <div className="text-sm text-gray-300 mb-1">{company}</div>
            <div className="text-xs text-gray-500">{desc}</div>
        </div>
    </div>
  )
}

function UpcomingProject({ title, description, status, progress, tags }: { title: string; description: string; status: string; progress: number; tags: string[] }) {
  return (
    <motion.div 
      whileHover={{ y: -4 }}
      className="bg-white/5 border border-white/10 rounded-2xl p-6 flex flex-col gap-4 group hover:border-purple-500/30 transition-all relative overflow-hidden"
    >
      {/* Status badge */}
      <div className="flex justify-between items-center">
        <span className="text-[10px] font-bold tracking-widest uppercase text-purple-400 bg-purple-950/50 px-3 py-1 rounded-full border border-purple-500/20 flex items-center gap-1.5">
          <div className="w-1.5 h-1.5 rounded-full bg-purple-400 animate-pulse" />
          {status}
        </span>
        <span className="text-xs text-gray-500 font-mono">{progress}%</span>
      </div>

      {/* Title */}
      <h3 className="text-xl font-bold text-white group-hover:text-purple-400 transition-colors">{title}</h3>
      
      {/* Description */}
      <p className="text-sm text-gray-400 leading-relaxed flex-grow">{description}</p>
      
      {/* Progress bar */}
      <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden">
        <motion.div 
          initial={{ width: 0 }}
          whileInView={{ width: `${progress}%` }}
          transition={{ duration: 1.5, delay: 0.3 }}
          className="h-full rounded-full bg-gradient-to-r from-purple-500 to-cyan-400"
        />
      </div>

      {/* Tags */}
      <div className="flex flex-wrap gap-2">
        {tags.map((tag) => (
          <span key={tag} className="text-[10px] text-gray-400 font-mono bg-white/5 px-2 py-1 rounded border border-white/5">
            {tag}
          </span>
        ))}
      </div>

      {/* Notify button */}
      <div className="flex items-center text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform cursor-pointer mt-2">
        Get Notified <ArrowRight size={14} className="ml-1" />
      </div>

      {/* Decorative glow */}
      <div className="absolute -top-16 -right-16 w-40 h-40 bg-purple-500/5 rounded-full blur-3xl group-hover:bg-purple-500/10 transition-colors pointer-events-none" />
    </motion.div>
  )
}

function ProjectCard({ title, category, borderColor, hoverColor, image }: { title: string; category: string; borderColor: string; hoverColor: string; image: string }) {
  return (
    <Link href="/projects" data-cursor="Open">
      <div className={`relative h-64 rounded-2xl overflow-hidden group border border-white/5 ${borderColor} ${hoverColor} transition-all cursor-pointer`}>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={image} alt={title} className="absolute inset-0 w-full h-full object-cover transition-transform duration-700 group-hover:scale-110" />
          <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-80 group-hover:opacity-60 transition-opacity" />
          
          <div className="absolute bottom-0 left-0 p-6 w-full">
              <div className="text-xs text-cyan-400 uppercase tracking-wider mb-1 opacity-0 translate-y-2 group-hover:opacity-100 group-hover:translate-y-0 transition-all duration-300 font-bold">
                  {category}
              </div>
              <h4 className="text-xl font-bold text-white group-hover:-translate-y-1 transition-transform">{title}</h4>
          </div>
      </div>
    </Link>
  )
}
