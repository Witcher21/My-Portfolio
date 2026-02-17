"use client";

import { motion, useScroll, useTransform } from "framer-motion";
import { useRef, useState, Suspense } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, Html } from "@react-three/drei";
import * as THREE from "three";

// Skills with devicon CDN - organized in 3 rows
const skillRows = [
  [
    { name: "React", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/react/react-original.svg" },
    { name: "Next.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nextjs/nextjs-original.svg" },
    { name: "TypeScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/typescript/typescript-original.svg" },
    { name: "Tailwind CSS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/tailwindcss/tailwindcss-original.svg" },
    { name: "JavaScript", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/javascript/javascript-original.svg" },
    { name: "HTML5", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/html5/html5-original.svg" },
    { name: "CSS3", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/css3/css3-original.svg" },
    { name: "Node.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/nodejs/nodejs-original.svg" },
    { name: "Express", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/express/express-original.svg" },
  ],
  [
    { name: "Python", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/python/python-original.svg" },
    { name: "MongoDB", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/mongodb/mongodb-original.svg" },
    { name: "PostgreSQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/postgresql/postgresql-original.svg" },
    { name: "Firebase", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/firebase/firebase-plain.svg" },
    { name: "TensorFlow", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/tensorflow/tensorflow-original.svg" },
    { name: "Docker", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/docker/docker-original.svg" },
    { name: "Git", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/git/git-original.svg" },
    { name: "Redux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/redux/redux-original.svg" },
    { name: "Figma", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/figma/figma-original.svg" },
  ],
  [
    { name: "AWS", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/amazonwebservices/amazonwebservices-original-wordmark.svg" },
    { name: "Flutter", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/flutter/flutter-original.svg" },
    { name: "GitHub", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/github/github-original.svg" },
    { name: "Linux", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/linux/linux-original.svg" },
    { name: "Three.js", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/threejs/threejs-original.svg" },
    { name: "GraphQL", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/graphql/graphql-plain.svg" },
    { name: "Sass", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/sass/sass-original.svg" },
    { name: "Kotlin", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon/icons/kotlin/kotlin-original.svg" },
    { name: "Rust", icon: "https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/rust/rust-original.svg" },
  ],
];

// 3D Software Engineer at Computer - Scroll controlled
function SoftwareEngineerScene({ scrollProgress }: { scrollProgress: number }) {
  const groupRef = useRef<THREE.Group>(null!);
  const [currentTime, setCurrentTime] = useState(new Date());

  // Update time every second
  useFrame(() => {
    if (groupRef.current) {
      // Increased to 4 full rotations (8π) for more obvious spinning
      groupRef.current.rotation.y = scrollProgress * Math.PI * 8;
      groupRef.current.rotation.x = Math.sin(scrollProgress * Math.PI * 2) * 0.15;
    }
    
    // Update time every frame (will update display every second due to Date precision)
    setCurrentTime(new Date());
  });

  return (
    <Float speed={1} rotationIntensity={0.1} floatIntensity={0.3}>
      <group ref={groupRef}>
        {/* Desk */}
        <mesh position={[0, -0.8, 0]}>
          <boxGeometry args={[3.5, 0.1, 2]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.6} />
        </mesh>

        {/* Laptop Base */}
        <mesh position={[0, -0.7, 0.2]} rotation={[0, 0, 0]}>
          <boxGeometry args={[2, 0.05, 1.4]} />
          <meshStandardMaterial color="#2a2a2a" roughness={0.3} metalness={0.7} />
        </mesh>

        {/* Laptop Keyboard with keys */}
        <mesh position={[0, -0.67, 0.2]}>
          <boxGeometry args={[1.8, 0.02, 1.2]} />
          <meshStandardMaterial color="#0a0a0a" />
        </mesh>

        {/* Laptop Screen Frame */}
        <mesh position={[0, 0, -0.5]} rotation={[-0.15, 0, 0]}>
          <boxGeometry args={[2, 1.5, 0.03]} />
          <meshStandardMaterial color="#0a0a0a" roughness={0.2} metalness={0.9} />
        </mesh>

        {/* Screen Display - Glowing cyan */}
        <mesh position={[0, 0, -0.48]} rotation={[-0.15, 0, 0]}>
          <planeGeometry args={[1.85, 1.35]} />
          <meshBasicMaterial color="#06b6d4" opacity={0.95} transparent />
        </mesh>

        {/* Code lines on screen */}
        {[0.3, 0.15, 0, -0.15, -0.3].map((y, i) => (
          <mesh key={i} position={[-0.4 + i * 0.1, y, -0.47]} rotation={[-0.15, 0, 0]}>
            <planeGeometry args={[0.4 + Math.random() * 0.4, 0.025]} />
            <meshBasicMaterial color={i % 3 === 0 ? "#a855f7" : i % 3 === 1 ? "#ec4899" : "#10b981"} />
          </mesh>
        ))}

        {/* Person - Neck */}
        <mesh position={[0, 0.15, 0.75]}>
          <cylinderGeometry args={[0.08, 0.1, 0.15, 16]} />
          <meshStandardMaterial color="#ffdbac" roughness={0.7} />
        </mesh>

        {/* Person - Head (more oval) */}
        <mesh position={[0, 0.35, 0.75]} scale={[1, 1.15, 1]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#ffdbac" roughness={0.8} />
        </mesh>

        {/* Hair */}
        <mesh position={[0, 0.48, 0.75]} scale={[1.05, 0.6, 1.05]}>
          <sphereGeometry args={[0.22, 32, 32]} />
          <meshStandardMaterial color="#1a1a1a" roughness={0.9} />
        </mesh>

        {/* Glasses - Left Lens */}
        <mesh position={[-0.1, 0.36, 0.93]}>
          <torusGeometry args={[0.06, 0.008, 8, 16]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Glasses - Right Lens */}
        <mesh position={[0.1, 0.36, 0.93]}>
          <torusGeometry args={[0.06, 0.008, 8, 16]} />
          <meshStandardMaterial color="#222222" metalness={0.9} roughness={0.1} />
        </mesh>

        {/* Glasses Bridge */}
        <mesh position={[0, 0.36, 0.93]}>
          <cylinderGeometry args={[0.005, 0.005, 0.08, 8]} />
          <meshStandardMaterial color="#222222" />
        </mesh>

        {/* Person - Torso (hoodie style) */}
        <mesh position={[0, -0.15, 0.7]}>
          <boxGeometry args={[0.6, 0.7, 0.45]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>

        {/* Hoodie collar */}
        <mesh position={[0, 0.12, 0.7]}>
          <cylinderGeometry args={[0.12, 0.15, 0.08, 16]} />
          <meshStandardMaterial color="#1e40af" roughness={0.8} />
        </mesh>

        {/* Left Shoulder */}
        <mesh position={[-0.35, 0.05, 0.7]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>

        {/* Right Shoulder */}
        <mesh position={[0.35, 0.05, 0.7]}>
          <sphereGeometry args={[0.12, 16, 16]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>

        {/* Left Arm (upper) */}
        <mesh position={[-0.4, -0.1, 0.5]} rotation={[0.6, 0, 0.2]}>
          <cylinderGeometry args={[0.07, 0.065, 0.4, 16]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>

        {/* Left Forearm */}
        <mesh position={[-0.35, -0.4, 0.25]} rotation={[1.2, 0, 0.1]}>
          <cylinderGeometry args={[0.06, 0.055, 0.35, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Right Arm (upper) */}
        <mesh position={[0.4, -0.1, 0.5]} rotation={[0.6, 0, -0.2]}>
          <cylinderGeometry args={[0.07, 0.065, 0.4, 16]} />
          <meshStandardMaterial color="#1e3a8a" roughness={0.8} />
        </mesh>

        {/* Right Forearm */}
        <mesh position={[0.35, -0.4, 0.25]} rotation={[1.2, 0, -0.1]}>
          <cylinderGeometry args={[0.06, 0.055, 0.35, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Left Hand on keyboard */}
        <mesh position={[-0.35, -0.63, 0.15]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Right Hand on keyboard */}
        <mesh position={[0.35, -0.63, 0.15]}>
          <sphereGeometry args={[0.08, 16, 16]} />
          <meshStandardMaterial color="#ffdbac" />
        </mesh>

        {/* Coffee Cup */}
        <mesh position={[1.3, -0.65, 0.3]}>
          <cylinderGeometry args={[0.12, 0.1, 0.3, 20]} />
          <meshStandardMaterial color="#d4d4d4" roughness={0.3} />
        </mesh>

        {/* Coffee liquid */}
        <mesh position={[1.3, -0.56, 0.3]}>
          <cylinderGeometry args={[0.11, 0.11, 0.12, 20]} />
          <meshStandardMaterial color="#3e2723" />
        </mesh>

        {/* Cup handle */}
        <mesh position={[1.42, -0.65, 0.3]} rotation={[0, 0, Math.PI / 2]}>
          <torusGeometry args={[0.08, 0.015, 8, 16, Math.PI]} />
          <meshStandardMaterial color="#d4d4d4" roughness={0.3} />
        </mesh>

        {/* Floating code particles */}
        <mesh position={[-1.5, 0.5, 0]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#06b6d4" transparent opacity={0.7} />
        </mesh>
        <mesh position={[1.5, 0.3, -0.5]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#a855f7" transparent opacity={0.7} />
        </mesh>
        <mesh position={[0, 1, 1]}>
          <sphereGeometry args={[0.04, 16, 16]} />
          <meshBasicMaterial color="#ec4899" transparent opacity={0.7} />
        </mesh>

        {/* Digital Clock Display - 3D HTML element */}
        <Html position={[-1.3, 0.5, -0.3]} transform occlude>
          <div className="bg-black/90 border border-cyan-400/40 rounded-lg px-4 py-2 backdrop-blur-md shadow-lg">
            <div className="text-cyan-400 font-mono text-xs font-bold tracking-wider">
              {currentTime.toLocaleTimeString('en-US', { hour12: true, hour: '2-digit', minute: '2-digit', second: '2-digit' })}
            </div>
            <div className="text-gray-400 font-mono text-[8px] text-center mt-0.5">
              {currentTime.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}
            </div>
          </div>
        </Html>
      </group>
    </Float>
  );
}

export default function SkillsSpinner() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"],
  });

  // Simple scroll-linked slide animation
  const row1X = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [400, 80, 0, -80, -400]);
  const row2X = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [-400, -80, 0, 80, 400]);
  const row3X = useTransform(scrollYProgress, [0, 0.2, 0.5, 0.8, 1], [300, 60, 0, -60, -300]);
  const allOpacity = useTransform(scrollYProgress, [0.15, 0.3, 0.7, 0.85], [0, 1, 1, 0]);

  // Get scroll progress as a number for crystal rotation
  const [scrollProgress, setScrollProgress] = useState(0);
  
  // Update scroll progress state
  scrollYProgress.on("change", (latest) => setScrollProgress(latest));

  return (
    <div ref={containerRef} className="w-full py-32 px-4 flex flex-col items-center gap-12 overflow-visible">
      
      {/* Header */}
      <motion.div style={{ opacity: allOpacity }} className="text-center space-y-3">
        <span className="text-[11px] font-bold tracking-[0.5em] uppercase text-gray-600">
          MY SKILLS
        </span>
        <h2 className="text-5xl md:text-7xl font-bold text-white font-[family-name:var(--font-outfit)]">
          The Secret{" "}
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-rose-400 via-amber-300 to-yellow-200">
            Sauce
          </span>
        </h2>
      </motion.div>

      {/* 3D Software Engineer - Always Visible */}
      <div className="w-full h-[280px] md:h-[380px] relative">
        <Canvas camera={{ position: [0, 0, 7], fov: 45 }} gl={{ antialias: true, alpha: true }} style={{ background: "transparent" }}>
          <ambientLight intensity={0.6} />
          <directionalLight position={[5, 5, 5]} intensity={1.2} />
          <directionalLight position={[-3, -2, -5]} intensity={0.4} color="#a855f7" />
          <pointLight position={[0, 2, 4]} intensity={0.6} color="#06b6d4" />
          <Suspense fallback={null}>
            <SoftwareEngineerScene scrollProgress={scrollProgress} />
          </Suspense>
        </Canvas>
        <div className="absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
          <div className="w-60 h-60 md:w-80 md:h-80 rounded-full blur-[80px] opacity-20"
            style={{ background: "radial-gradient(circle, #06b6d4 0%, #a855f7 50%, transparent 100%)" }}
          />
        </div>
      </div>

      {/* Skill Icons - Simple rows with scroll animation */}
      <div className="w-full max-w-5xl space-y-4 relative" style={{ zIndex: 1 }}>
        {skillRows.map((row, rowIndex) => {
          const xMotion = rowIndex === 0 ? row1X : rowIndex === 1 ? row2X : row3X;
          return (
            <motion.div
              key={rowIndex}
              style={{ x: xMotion, opacity: allOpacity }}
              className="flex justify-center gap-3 flex-wrap"
            >
              {row.map((skill) => (
                <SkillTile key={skill.name} skill={skill} />
              ))}
            </motion.div>
          );
        })}
      </div>
    </div>
  );
}

function SkillTile({ skill }: { skill: { name: string; icon: string } }) {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div 
      className="relative inline-block"
      onMouseEnter={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
      style={{ zIndex: showTooltip ? 100 : 1 }}
    >
      <motion.div
        whileHover={{ scale: 1.15, y: -6 }}
        whileTap={{ scale: 0.95 }}
        className="w-14 h-14 md:w-16 md:h-16 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center hover:bg-white/10 hover:border-white/20 transition-all duration-300 cursor-pointer"
        style={{
          boxShadow: showTooltip 
            ? "0 10px 40px -10px rgba(6,182,212,0.4), 0 0 0 1px rgba(255,255,255,0.15)" 
            : "0 2px 8px -2px rgba(0,0,0,0.3)",
        }}
      >
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={skill.icon}
          alt={skill.name}
          className="w-7 h-7 md:w-8 md:h-8 object-contain transition-transform duration-300"
          style={{ transform: showTooltip ? "scale(1.1)" : "scale(1)" }}
          loading="lazy"
        />
      </motion.div>

      {/* Tooltip - ALWAYS rendered, positioned absolutely */}
      {showTooltip && (
        <div
          className="absolute left-1/2 -bottom-10 pointer-events-none z-[200]"
          style={{ 
            transform: "translateX(-50%)",
            animation: "fadeInUp 0.2s ease-out"
          }}
        >
          <div className="bg-black/95 border border-cyan-400/30 text-white text-[11px] font-semibold px-3 py-1.5 rounded-lg whitespace-nowrap shadow-[0_0_20px_-5px_rgba(6,182,212,0.3)] backdrop-blur-md">
            {skill.name}
          </div>
        </div>
      )}
    </div>
  );
}
