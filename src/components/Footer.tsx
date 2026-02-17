"use client";

import { Github, Linkedin, Mail, Twitter } from "lucide-react";
import Link from "next/link";
import { type LucideIcon } from "lucide-react";

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="relative z-10 w-full border-t border-white/5 bg-black/40 backdrop-blur-xl mt-20 pb-24 md:pb-12">
      <div className="max-w-7xl mx-auto px-6 py-12 flex flex-col md:flex-row justify-between items-center gap-6">
        
        <div className="text-center md:text-left">
            <h3 className="text-xl font-bold text-white font-[family-name:var(--font-outfit)]">Nawod Sanjana</h3>
            <p className="text-sm text-gray-500 mt-2">
                Engineering the Future with AI & Code.
            </p>
        </div>

        <div className="flex gap-6">
            <FooterLink href="https://github.com/nawod2202" icon={Github} label="GitHub" />
            <FooterLink href="#" icon={Linkedin} label="LinkedIn" />
            <FooterLink href="#" icon={Twitter} label="Twitter" />
            <FooterLink href="mailto:nawodsanjana@gmail.com" icon={Mail} label="Email" />
        </div>

        <div className="text-sm text-gray-600">
            &copy; {currentYear} All rights reserved.
        </div>

      </div>
    </footer>
  );
}

function FooterLink({ href, icon: Icon, label }: { href: string; icon: LucideIcon; label: string }) {
    return (
        <Link 
            href={href} 
            className="text-gray-400 hover:text-cyan-400 transition-colors"
            aria-label={label}
        >
            <Icon size={20} />
        </Link>
    )
}
