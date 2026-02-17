"use client";

import GlassCard from "@/components/GlassCard";
import { motion } from "framer-motion";
import { Mail, MapPin, Phone, Send, Github, Linkedin, Twitter, type LucideIcon } from "lucide-react";
import { useState } from "react";

// Removed emailjs import as we are using fetch for FormSubmit.co

export default function ContactPage() {
  const [formState, setFormState] = useState({ name: "", email: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const response = await fetch("https://formsubmit.co/ajax/nawodsanjana@gmail.com", {
        method: "POST",
        headers: { 
          'Content-Type': 'application/json',
          'Accept': 'application/json'
        },
        body: JSON.stringify({
          name: formState.name,
          email: formState.email,
          message: formState.message,
          _subject: `New Portfolio Message from ${formState.name}`, // Custom subject
        })
      });

      const result = await response.json();

      if (response.ok) {
        alert("Message sent successfully! I will get back to you soon.");
        setFormState({ name: "", email: "", message: "" });
      } else {
        alert("Something went wrong. Please try again later.");
        console.error("Form error:", result);
      }
    } catch (error) {
      console.error("Submission error:", error);
      alert("Failed to send message. Please check your internet connection.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <main className="min-h-screen pt-24 pb-32 px-4 md:px-8 max-w-7xl mx-auto flex flex-col md:flex-row gap-12 items-start justify-center">
      
      {/* Contact Info */}
      <div className="w-full md:w-1/3 space-y-8">
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
        >
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 font-[family-name:var(--font-outfit)]">
                Let&apos;s Talk
            </h1>
            <p className="text-gray-400 text-lg leading-relaxed mb-8">
                Have a project in mind or want to collaborate on the next big AI idea? I&apos;m always open to discussing new opportunities.
            </p>
        </motion.div>

        <div className="space-y-6">
            <ContactItem icon={Mail} label="Email" value="nawodsanjana@gmail.com" href="mailto:nawodsanjana@gmail.com" />
            <ContactItem icon={Phone} label="Phone" value="+94 70 217 8776" href="tel:+94702178776" />
            <ContactItem icon={MapPin} label="Location" value="Colombo, Sri Lanka" />
        </div>

        <div className="flex gap-4 pt-8">
            <SocialIcon icon={Github} href="https://github.com/nawod2202" />
            <SocialIcon icon={Linkedin} href="#" />
            <SocialIcon icon={Twitter} href="#" />
        </div>
      </div>

      {/* Contact Form */}
      <GlassCard className="w-full md:w-2/3 p-8 md:p-12 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-64 h-64 bg-cyan-500/10 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2 pointer-events-none" />
        
        <form onSubmit={handleSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Name</label>
                    <input 
                        type="text" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                        placeholder="John Doe"
                        value={formState.name}
                        onChange={(e) => setFormState({...formState, name: e.target.value})}
                    />
                </div>
                <div className="space-y-2">
                    <label className="text-sm font-medium text-gray-400 ml-1">Email</label>
                    <input 
                        type="email" 
                        required
                        className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600"
                        placeholder="john@example.com"
                        value={formState.email}
                        onChange={(e) => setFormState({...formState, email: e.target.value})}
                    />
                </div>
            </div>

            <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-1">Message</label>
                <textarea 
                    required
                    rows={6}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white focus:outline-none focus:border-cyan-500/50 focus:bg-white/10 transition-all placeholder:text-gray-600 resize-none"
                    placeholder="Tell me about your project..."
                    value={formState.message}
                    onChange={(e) => setFormState({...formState, message: e.target.value})}
                />
            </div>

            <motion.button
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
                disabled={isSubmitting}
                className="w-full bg-gradient-to-r from-cyan-600 to-blue-600 hover:from-cyan-500 hover:to-blue-500 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all disabled:opacity-70 disabled:cursor-not-allowed"
            >
                {isSubmitting ? (
                    <span className="animate-pulse">Sending...</span>
                ) : (
                    <>
                        Send Message <Send size={18} />
                    </>
                )}
            </motion.button>
        </form>
      </GlassCard>

    </main>
  );
}

function ContactItem({ icon: Icon, label, value, href }: { icon: LucideIcon; label: string; value: string; href?: string }) {
    const content = (
        <div className="flex items-center gap-4 group cursor-pointer">
            <div className="p-3 bg-white/5 rounded-full border border-white/10 group-hover:bg-cyan-500/20 group-hover:border-cyan-500/50 transition-all">
                <Icon size={20} className="text-gray-400 group-hover:text-cyan-400 transition-colors" />
            </div>
            <div>
                <div className="text-xs text-gray-500 uppercase tracking-wider">{label}</div>
                <div className="text-white font-medium group-hover:text-cyan-400 transition-colors">{value}</div>
            </div>
        </div>
    );

    return href ? <a href={href}>{content}</a> : <div className="cursor-default">{content}</div>;
}

function SocialIcon({ icon: Icon, href }: { icon: LucideIcon; href: string }) {
    return (
        <a 
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="p-3 bg-white/5 rounded-full border border-white/10 hover:bg-white/10 hover:border-white/20 hover:-translate-y-1 transition-all"
        >
            <Icon size={20} className="text-gray-400 hover:text-white" />
        </a>
    )
}
