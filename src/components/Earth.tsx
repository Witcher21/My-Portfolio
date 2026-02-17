"use client";

import { Canvas, useFrame } from "@react-three/fiber";
import { Html, OrbitControls } from "@react-three/drei";
import { Suspense, useRef, useMemo, useState, useCallback } from "react";
import * as THREE from "three";

// Location data
const LOCATIONS = [
  { name: "Sri Lanka", city: "Colombo", lat: 7.8731, lon: 80.7718, isHome: true, label: "🏠 Home Base" },
  { name: "United States", city: "New York", lat: 40.7128, lon: -74.0060, isHome: false, label: "🗽 New York" },
  { name: "United Kingdom", city: "London", lat: 51.5074, lon: -0.1278, isHome: false, label: "🇬🇧 London" },
  { name: "Japan", city: "Tokyo", lat: 35.6762, lon: 139.6503, isHome: false, label: "🗼 Tokyo" },
  { name: "Australia", city: "Sydney", lat: -33.8688, lon: 151.2093, isHome: false, label: "🇦🇺 Sydney" },
  { name: "Germany", city: "Berlin", lat: 52.5200, lon: 13.4050, isHome: false, label: "🇩🇪 Berlin" },
  { name: "India", city: "Mumbai", lat: 19.0760, lon: 72.8777, isHome: false, label: "🇮🇳 Mumbai" },
  { name: "UAE", city: "Dubai", lat: 25.2048, lon: 55.2708, isHome: false, label: "🏙️ Dubai" },
  { name: "Singapore", city: "Singapore", lat: 1.3521, lon: 103.8198, isHome: false, label: "🇸🇬 Singapore" },
  { name: "Canada", city: "Toronto", lat: 43.6532, lon: -79.3832, isHome: false, label: "🇨🇦 Toronto" },
  { name: "Brazil", city: "São Paulo", lat: -23.5505, lon: -46.6333, isHome: false, label: "🇧🇷 São Paulo" },
  { name: "South Africa", city: "Cape Town", lat: -33.9249, lon: 18.4241, isHome: false, label: "🇿🇦 Cape Town" },
];

function latLonToVector3(lat: number, lon: number, radius: number): THREE.Vector3 {
  const phi = (90 - lat) * (Math.PI / 180);
  const theta = (lon + 180) * (Math.PI / 180);
  const x = -(radius * Math.sin(phi) * Math.cos(theta));
  const z = radius * Math.sin(phi) * Math.sin(theta);
  const y = radius * Math.cos(phi);
  return new THREE.Vector3(x, y, z);
}

function LocationMarker({ location, isActive, onHover, onClick }: {
  location: typeof LOCATIONS[0];
  isActive: boolean;
  onHover: (name: string | null) => void;
  onClick: (name: string) => void;
}) {
  const markerRef = useRef<THREE.Group>(null!);
  const pos = useMemo(() => latLonToVector3(location.lat, location.lon, 2.05), [location]);
  const isHome = location.isHome;

  useFrame((state) => {
    if (markerRef.current) {
      const s = 1 + Math.sin(state.clock.elapsedTime * (isHome ? 3 : 2)) * 0.2;
      markerRef.current.scale.setScalar(s);
    }
  });

  return (
    <group position={pos}>
      {/* INVISIBLE large hit area — MUCH easier to click/hover */}
      <mesh
        onPointerOver={(e) => { e.stopPropagation(); onHover(location.name); document.body.style.cursor = "pointer"; }}
        onPointerOut={(e) => { e.stopPropagation(); onHover(null); document.body.style.cursor = "auto"; }}
        onClick={(e) => { e.stopPropagation(); onClick(location.name); }}
      >
        <sphereGeometry args={[0.25, 16, 16]} />
        <meshBasicMaterial transparent opacity={0} depthWrite={false} />
      </mesh>

      {/* Visible marker elements */}
      <group ref={markerRef}>
        {/* Glowing core */}
        <mesh>
          <sphereGeometry args={[isHome ? 0.1 : 0.06, 16, 16]} />
          <meshBasicMaterial 
            color={isHome ? "#22d3ee" : isActive ? "#c084fc" : "#06b6d4"} 
            transparent 
            opacity={isActive || isHome ? 1 : 0.8} 
          />
        </mesh>

        {/* Ring 1 */}
        <mesh>
          <ringGeometry args={[isHome ? 0.13 : 0.08, isHome ? 0.18 : 0.11, 32]} />
          <meshBasicMaterial 
            color={isHome ? "#06b6d4" : isActive ? "#a855f7" : "#06b6d4"} 
            transparent 
            opacity={isActive ? 0.7 : 0.3} 
            side={THREE.DoubleSide} 
          />
        </mesh>

        {/* Ring 2 (home & active only) */}
        {(isHome || isActive) && (
          <mesh>
            <ringGeometry args={[0.22, 0.26, 32]} />
            <meshBasicMaterial 
              color={isHome ? "#06b6d4" : "#a855f7"} 
              transparent 
              opacity={0.15} 
              side={THREE.DoubleSide} 
            />
          </mesh>
        )}
      </group>

      {/* Tooltip */}
      {isActive && (
        <Html
          position={[0, 0.35, 0]}
          center
          style={{ pointerEvents: "none", userSelect: "none" }}
          zIndexRange={[100, 0]}
        >
          <div className="animate-fadeIn" style={{
            background: "rgba(0,0,0,0.92)",
            backdropFilter: "blur(12px)",
            border: "1px solid rgba(255,255,255,0.15)",
            borderRadius: "12px",
            padding: "10px 16px",
            whiteSpace: "nowrap",
            boxShadow: "0 0 30px -5px rgba(6,182,212,0.4)",
            minWidth: "120px",
            textAlign: "center"
          }}>
            <div style={{ color: "#fff", fontWeight: 700, fontSize: "14px" }}>
              {location.label}
            </div>
            <div style={{ color: "#22d3ee", fontSize: "10px", fontFamily: "monospace", marginTop: "2px" }}>
              {Math.abs(location.lat).toFixed(1)}°{location.lat >= 0 ? "N" : "S"}, {Math.abs(location.lon).toFixed(1)}°{location.lon >= 0 ? "E" : "W"}
            </div>
            {isHome && (
              <div style={{ color: "#4ade80", fontSize: "10px", marginTop: "4px", display: "flex", alignItems: "center", justifyContent: "center", gap: "4px" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "#22c55e", display: "inline-block" }} />
                Currently here
              </div>
            )}
          </div>
        </Html>
      )}
    </group>
  );
}

function Globe() {
  const groupRef = useRef<THREE.Group>(null!);
  const [activeLocation, setActiveLocation] = useState<string | null>("Sri Lanka");

  // Grid lines
  const gridLines = useMemo(() => {
    const lines: THREE.Vector3[][] = [];
    for (let lat = -80; lat <= 80; lat += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lon = 0; lon <= 360; lon += 2) pts.push(latLonToVector3(lat, lon, 2.01));
      lines.push(pts);
    }
    for (let lon = 0; lon < 360; lon += 20) {
      const pts: THREE.Vector3[] = [];
      for (let lat = -90; lat <= 90; lat += 2) pts.push(latLonToVector3(lat, lon, 2.01));
      lines.push(pts);
    }
    return lines;
  }, []);

  // Continent dots
  const landDots = useMemo(() => {
    const dots: THREE.Vector3[] = [];
    const regions = [
      { latRange: [10, 60], lonRange: [60, 140], density: 200 },
      { latRange: [35, 70], lonRange: [-10, 40], density: 120 },
      { latRange: [-35, 35], lonRange: [-20, 50], density: 160 },
      { latRange: [15, 70], lonRange: [-170, -50], density: 170 },
      { latRange: [-55, 12], lonRange: [-80, -35], density: 130 },
      { latRange: [-40, -12], lonRange: [110, 155], density: 70 },
      { latRange: [6, 10], lonRange: [79, 82], density: 25 },
    ];
    regions.forEach((r) => {
      for (let i = 0; i < r.density; i++) {
        const lat = r.latRange[0] + Math.random() * (r.latRange[1] - r.latRange[0]);
        const lon = r.lonRange[0] + Math.random() * (r.lonRange[1] - r.lonRange[0]);
        dots.push(latLonToVector3(lat, lon, 2.02));
      }
    });
    return dots;
  }, []);

  // Arcs from Sri Lanka to other locations
  const arcs = useMemo(() => {
    const home = LOCATIONS[0];
    return LOCATIONS.filter(l => !l.isHome).map((loc) => {
      const start = latLonToVector3(home.lat, home.lon, 2.03);
      const end = latLonToVector3(loc.lat, loc.lon, 2.03);
      const mid = start.clone().add(end).multiplyScalar(0.5).normalize().multiplyScalar(3.0);
      return { name: loc.name, points: new THREE.QuadraticBezierCurve3(start, mid, end).getPoints(40) };
    });
  }, []);

  const handleHover = useCallback((name: string | null) => {
    if (name) setActiveLocation(name);
  }, []);

  const handleClick = useCallback((name: string) => {
    setActiveLocation(prev => prev === name ? null : name);
  }, []);

  // Slow auto-rotation
  useFrame((_, delta) => {
    if (groupRef.current) {
      groupRef.current.rotation.y += delta * 0.08;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Transparent sphere */}
      <mesh>
        <sphereGeometry args={[2, 64, 64]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.03} side={THREE.DoubleSide} />
      </mesh>

      {/* Grid */}
      {gridLines.map((pts, i) => (
        <line key={`g-${i}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={pts.length}
              array={new Float32Array(pts.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial color="#06b6d4" transparent opacity={0.06} />
        </line>
      ))}

      {/* Land dots */}
      <points>
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={landDots.length}
            array={new Float32Array(landDots.flatMap(p => [p.x, p.y, p.z]))}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial size={0.035} color="#06b6d4" sizeAttenuation transparent opacity={0.7} blending={THREE.AdditiveBlending} depthWrite={false} />
      </points>

      {/* Connection arcs */}
      {arcs.map((arc) => (
        <line key={`arc-${arc.name}`}>
          <bufferGeometry>
            <bufferAttribute
              attach="attributes-position"
              count={arc.points.length}
              array={new Float32Array(arc.points.flatMap(p => [p.x, p.y, p.z]))}
              itemSize={3}
            />
          </bufferGeometry>
          <lineBasicMaterial 
            color={activeLocation === arc.name ? "#a855f7" : "#06b6d4"} 
            transparent 
            opacity={activeLocation === arc.name ? 0.7 : 0.08} 
          />
        </line>
      ))}

      {/* Location markers */}
      {LOCATIONS.map((loc) => (
        <LocationMarker
          key={loc.name}
          location={loc}
          isActive={activeLocation === loc.name}
          onHover={handleHover}
          onClick={handleClick}
        />
      ))}

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.3, 32, 32]} />
        <meshBasicMaterial color="#06b6d4" transparent opacity={0.04} side={THREE.BackSide} />
      </mesh>
    </group>
  );
}

export default function Earth() {
  return (
    <div className="w-full h-full min-h-[300px]" style={{ cursor: "grab" }}>
      <Canvas
        camera={{ position: [0, 0, 5.5], fov: 45 }}
        gl={{ antialias: true, alpha: true }}
        style={{ background: "transparent" }}
      >
        <ambientLight intensity={0.5} />
        {/* OrbitControls for smooth drag rotation + zoom */}
        <OrbitControls
          enableZoom={true}
          enablePan={false}
          enableDamping={true}
          dampingFactor={0.1}
          rotateSpeed={0.5}
          minDistance={4}
          maxDistance={8}
          autoRotate={false}
        />
        <Suspense fallback={null}>
          <Globe />
        </Suspense>
      </Canvas>
    </div>
  );
}
