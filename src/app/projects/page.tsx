"use client";

import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { ExternalLink, Github, ArrowRight } from "lucide-react";
import Link from "next/link";
import { useState } from "react";
import ProjectModal from "@/components/ProjectModal";

const projects = [
  {
    title: "Deepfake Video Detection",
    category: "AI & Deep Learning",
    description: "An advanced system utilizing Convolutional Neural Networks (CNNs) to analyze video frames and detect manipulated content with high accuracy. Built for security and media verification.",
    tech: ["Python", "TensorFlow", "OpenCV", "React"],
    image: "https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    title: "Real-Time Stock Feed",
    category: "FinTech Visualization",
    description: "High-frequency stock market dashboard processing live WebSocket data streams. Features interactive charts, portfolio tracking, and instant alerts.",
    tech: ["Next.js", "WebSocket", "D3.js", "Tailwind"],
    image: "https://images.unsplash.com/photo-1642790106117-e829e14a795f?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    title: "Brain Tumor Segmentation",
    category: "Medical Imaging AI",
    description: "AI-powered tool assisting radiologists by segmenting tumors from MRI scans with pixel-perfect precision using U-Net architecture.",
    tech: ["PyTorch", "FastAPI", "Docker", "React"],
    image: "https://images.unsplash.com/photo-1559757175-5700dde675bc?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    title: "E-Commerce Microservices",
    category: "Backend Architecture",
    description: "Scalable e-commerce backend built with microservices architecture, featuring independent service scaling, event-driven communication, and robust API gateway.",
    tech: ["Node.js", "Docker", "Kubernetes", "Redis"],
    image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    title: "Smart Home IoT Hub",
    category: "IoT & Automation",
    description: "Centralized control dashboard for smart home devices. Supports MQTT protocol for real-time communication with sensors and actuators.",
    tech: ["Flutter", "Firebase", "MQTT", "C++"],
    image: "https://images.unsplash.com/photo-1558002038-1055907df827?auto=format&fit=crop&q=80&w=800",
    link: "#"
  },
  {
    title: "Voice Assistant AI",
    category: "NLP & Voice",
    description: "Personalized voice assistant capable of understanding natural language commands to perform tasks, fetch information, and control system utilities.",
    tech: ["Python", "NLTK", "SpeechRecognition", "React Native"],
    image: "https://images.unsplash.com/photo-1589254065878-42c9da997008?auto=format&fit=crop&q=80&w=800",
    link: "#"
  }
];

export default function ProjectsPage() {
  const [selectedProject, setSelectedProject] = useState<typeof projects[0] | null>(null);

  return (
    <main className="min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto">
      <div className="mb-12">
        <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-4xl md:text-6xl font-bold text-white mb-4 font-[family-name:var(--font-outfit)]"
        >
            Selected Works
        </motion.h1>
        <p className="text-gray-400 max-w-2xl text-lg">
            A curation of projects demonstrating expertise in AI, Full Stack Development, and System Architecture.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {projects.map((project, index) => (
            <GlassCard key={index} className="group flex flex-col h-full overflow-hidden border-white/5 bg-white/5" delay={index * 0.1}>
                {/* Project Image */}
                <div 
                    onClick={() => setSelectedProject(project)}
                    className="h-48 w-full relative overflow-hidden cursor-pointer"
                >
                    <div className="absolute inset-0 bg-cyan-900/20 group-hover:bg-transparent transition-colors duration-500 z-10" />
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img 
                      src={project.image} 
                      alt={project.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-700" 
                    />
                </div>

                <div className="p-6 flex flex-col flex-grow">
                    <div className="flex justify-between items-start mb-4">
                        <span className="text-[10px] font-bold tracking-widest uppercase text-cyan-400 bg-cyan-950/50 px-3 py-1 rounded-full border border-cyan-500/20">
                            {project.category}
                        </span>
                        <div className="flex gap-3">
                            <Link href={project.link} className="text-gray-400 hover:text-white transition-colors">
                                <Github size={18} />
                            </Link>
                            <Link href={project.link} className="text-gray-400 hover:text-white transition-colors">
                                <ExternalLink size={18} />
                            </Link>
                        </div>
                    </div>

                    <h3 
                        onClick={() => setSelectedProject(project)}
                        className="text-xl font-bold text-white mb-3 group-hover:text-cyan-400 transition-colors cursor-pointer"
                    >
                        {project.title}
                    </h3>
                    
                    <p className="text-sm text-gray-400 leading-relaxed mb-6 flex-grow">
                        {project.description}
                    </p>

                    <div className="flex flex-wrap gap-2 mt-auto">
                        {project.tech.map((t, i) => (
                            <span key={i} className="text-[10px] text-gray-300 font-mono bg-white/5 px-2 py-1 rounded border border-white/10">
                                {t}
                            </span>
                        ))}
                    </div>
                    
                    <div 
                        onClick={() => setSelectedProject(project)}
                        className="mt-6 pt-4 border-t border-white/5 flex items-center text-xs font-medium text-cyan-400 group-hover:translate-x-1 transition-transform cursor-pointer"
                    >
                        View Details <ArrowRight size={14} className="ml-1" />
                    </div>
                </div>
            </GlassCard>
        ))}
      </div>

      <ProjectModal 
        project={selectedProject} 
        onClose={() => setSelectedProject(null)} 
      />
    </main>
  );
}
