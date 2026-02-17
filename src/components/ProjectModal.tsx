"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
    title: string;
    category: string;
    description: string;
    tech: string[];
    image: string;
    link: string;
};

type ProjectModalProps = {
    project: Project | null;
    onClose: () => void;
};

import { createPortal } from "react-dom";

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
        return () => setMounted(false);
    }, []);

    // Lock scrolling when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [project]);

    if (!mounted) return null;

    return createPortal(
        <AnimatePresence>
            {project && (
                <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 md:p-8">
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                    />

                    {/* Modal Content */}
                    <motion.div
                        initial={{ opacity: 0, scale: 0.8, y: 100, rotateX: 20 }}
                        animate={{ opacity: 1, scale: 1, y: 0, rotateX: 0 }}
                        exit={{ opacity: 0, scale: 0.8, y: 100, rotateX: 20 }}
                        transition={{ type: "spring", damping: 20, stiffness: 300, mass: 0.8 }}
                        className="relative z-[10000] w-full max-w-5xl max-h-[90dvh] overflow-y-auto bg-stone-950/90 border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden outline outline-1 outline-white/5 scrollbar-hide"
                    >
                        {/* Decorative 'Cyber' Elements */}
                        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-50" />
                        
                         {/* Close Button Mobile */}
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 backdrop-blur-md rounded-full text-white md:hidden border border-white/10"
                        >
                            <X size={20} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-[45%] h-64 md:h-auto relative bg-gray-900 overflow-hidden group">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-80 md:opacity-40" />
                            
                            {/* Floating Tech Badges on Image */}
                            <div className="absolute bottom-4 left-4 flex flex-wrap gap-2">
                                {project.tech.slice(0, 3).map((t) => (
                                    <span key={t} className="px-2 py-1 bg-black/60 backdrop-blur-md border border-white/10 rounded text-xs text-cyan-300 font-mono">
                                        {t}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-[55%] p-6 md:p-10 flex flex-col relative">
                             {/* Background Glow */}
                             <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/5 rounded-full blur-3xl pointer-events-none -translate-y-1/2 translate-x-1/2" />

                             <div className="flex justify-between items-start mb-4 md:mb-6">
                                <div>
                                    <div className="flex items-center gap-2 mb-2">
                                        <div className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse" />
                                        <span className="text-xs font-bold tracking-widest uppercase text-cyan-400">
                                            {project.category}
                                        </span>
                                    </div>
                                    <h2 className="text-2xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)] leading-tight">
                                        {project.title}
                                    </h2>
                                </div>
                                <button 
                                    onClick={onClose} 
                                    className="hidden md:block p-2 text-gray-400 hover:text-white hover:bg-white/5 rounded-full transition-all"
                                >
                                    <X size={24} />
                                </button>
                             </div>

                             <div className="w-12 h-1 bg-gradient-to-r from-cyan-500 to-purple-500 rounded-full mb-6" />

                             <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-8 flex-grow">
                                 {project.description}
                             </p>
                             
                             <div className="mb-8 p-4 bg-white/5 rounded-xl border border-white/5">
                                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                    <Code size={16} className="text-purple-400" /> Full Tech Stack
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 bg-black/40 border border-white/10 rounded text-xs text-gray-300 hover:border-cyan-500/30 transition-colors">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                             </div>

                             <div className="mt-auto flex gap-4">
                                 <Link 
                                    href={project.link} 
                                    className="flex-1 bg-cyan-600 hover:bg-cyan-500 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-cyan-500/20 hover:shadow-cyan-500/40 active:scale-95"
                                 >
                                    Live Demo <ExternalLink size={18} />
                                 </Link>
                                 <Link 
                                    href={project.link} 
                                    className="flex-1 bg-white/5 border border-white/10 text-white font-bold py-3.5 px-6 rounded-xl flex items-center justify-center gap-2 hover:bg-white/10 hover:border-white/20 transition-all active:scale-95"
                                 >
                                    GitHub <Github size={18} />
                                 </Link>
                             </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>,
        document.body
    );
}
