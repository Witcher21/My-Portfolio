"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import { Home, User, Briefcase, Mail } from "lucide-react";

const navItems = [
  { name: "Home", path: "/", icon: Home },
  { name: "About", path: "/about", icon: User },
  { name: "Projects", path: "/projects", icon: Briefcase },
  { name: "Contact", path: "/contact", icon: Mail },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 w-full max-w-md px-4">
      <div className="bg-black/40 backdrop-blur-2xl border border-white/10 rounded-full p-2 shadow-2xl flex items-center justify-between relative overflow-hidden ring-1 ring-white/5">
        {/* Animated Background for Active Item - Optional refinement could be added here */}
        
        {navItems.map((item) => {
          const isActive = pathname === item.path;
          const Icon = item.icon;
          
          return (
            <Link
              key={item.path}
              href={item.path}
              className={cn(
                "relative flex items-center gap-2 px-6 py-3 rounded-full transition-all duration-300 group",
                isActive ? "text-black" : "text-gray-400 hover:text-white"
              )}
            >
              {isActive && (
                <motion.div
                  layoutId="activeNav"
                  className="absolute inset-0 bg-cyan-400 rounded-full"
                  transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                />
              )}
              <span className="relative z-10 flex items-center gap-2">
                <Icon size={18} strokeWidth={isActive ? 2.5 : 2} />
                {isActive && <span className="text-sm font-semibold">{item.name}</span>}
              </span>
            </Link>
          );
        })}
      </div>
    </div>
  );
}
