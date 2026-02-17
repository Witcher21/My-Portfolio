"use client";

import { motion, AnimatePresence } from "framer-motion";
import { X, ExternalLink, Github, Code } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

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

export default function ProjectModal({ project, onClose }: ProjectModalProps) {
    
    // Lock scrolling when modal is open
    useEffect(() => {
        if (project) {
            document.body.style.overflow = "hidden";
        } else {
            document.body.style.overflow = "unset";
        }
        return () => { document.body.style.overflow = "unset"; };
    }, [project]);

    return (
        <AnimatePresence>
            {project && (
                <>
                    {/* Backdrop */}
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        onClick={onClose}
                        className="fixed inset-0 bg-black/80 backdrop-blur-md z-[60] flex items-center justify-center p-4 md:p-8"
                    />

                    {/* Modal Content */}
                    <motion.div
                        layoutId={`project-${project.title}`} // Shared layout ID if we could link from card
                        initial={{ opacity: 0, scale: 0.9, y: 50 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 50 }}
                        transition={{ type: "spring", damping: 25, stiffness: 300 }}
                        className="fixed z-[70] w-full max-w-4xl max-h-[90vh] overflow-y-auto bg-black border border-white/10 rounded-3xl shadow-2xl flex flex-col md:flex-row overflow-hidden left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2"
                    >
                        {/* Close Button Mobile */}
                        <button 
                            onClick={onClose} 
                            className="absolute top-4 right-4 z-20 p-2 bg-black/50 rounded-full text-white md:hidden"
                        >
                            <X size={24} />
                        </button>

                        {/* Image Section */}
                        <div className="w-full md:w-1/2 h-64 md:h-auto relative bg-gray-900">
                             {/* eslint-disable-next-line @next/next/no-img-element */}
                            <img 
                                src={project.image} 
                                alt={project.title} 
                                className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60 md:hidden" />
                        </div>

                        {/* Details Section */}
                        <div className="w-full md:w-1/2 p-8 md:p-10 flex flex-col bg-stone-950/90 backdrop-blur-3xl">
                             <div className="flex justify-between items-start mb-6">
                                <div>
                                    <span className="text-xs font-bold tracking-widest uppercase text-cyan-400 mb-2 block">
                                        {project.category}
                                    </span>
                                    <h2 className="text-3xl md:text-4xl font-bold text-white font-[family-name:var(--font-outfit)]">
                                        {project.title}
                                    </h2>
                                </div>
                                <button 
                                    onClick={onClose} 
                                    className="hidden md:block text-gray-400 hover:text-white transition-colors"
                                >
                                    <X size={28} />
                                </button>
                             </div>

                             <p className="text-gray-300 text-lg leading-relaxed mb-8">
                                 {project.description}
                             </p>
                             
                             <div className="mb-8">
                                <h3 className="text-sm font-semibold text-white mb-3 flex items-center gap-2">
                                    <Code size={16} className="text-purple-400" /> Technologies
                                </h3>
                                <div className="flex flex-wrap gap-2">
                                    {project.tech.map((t) => (
                                        <span key={t} className="px-3 py-1 bg-white/5 border border-white/10 rounded-md text-sm text-gray-300">
                                            {t}
                                        </span>
                                    ))}
                                </div>
                             </div>

                             <div className="mt-auto flex gap-4">
                                 <Link 
                                    href={project.link} 
                                    className="flex-1 bg-white text-black font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-gray-200 transition-colors"
                                 >
                                    View Live <ExternalLink size={18} />
                                 </Link>
                                 <Link 
                                    href={project.link} 
                                    className="flex-1 bg-white/5 border border-white/10 text-white font-bold py-3 px-6 rounded-full flex items-center justify-center gap-2 hover:bg-white/10 transition-colors"
                                 >
                                    Source Code <Github size={18} />
                                 </Link>
                             </div>
                        </div>
                    </motion.div>
                </>
            )}
        </AnimatePresence>
    );
}
