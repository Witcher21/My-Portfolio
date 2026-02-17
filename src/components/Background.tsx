"use client";

import { useMemo, useRef } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import * as THREE from "three";

function Particles() {
  const count = 2000;
  const mesh = useRef<THREE.Points>(null!);

  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
        // Spread particles across a wide volume
        const x = (Math.random() - 0.5) * 15;
        const y = (Math.random() - 0.5) * 15;
        const z = (Math.random() - 0.5) * 15;
        
        positions[i * 3] = x;
        positions[i * 3 + 1] = y;
        positions[i * 3 + 2] = z;
    }
    return positions;
  }, [count]);

  useFrame((state, delta) => {
    if (mesh.current) {
      mesh.current.rotation.y -= delta * 0.05;
      mesh.current.rotation.x -= delta * 0.02;
    }
  });

  return (
    <points ref={mesh}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={particlesPosition.length / 3}
          array={particlesPosition}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.02}
        color="#06b6d4" // Cyan-500
        sizeAttenuation
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        transparent
        opacity={0.6}
      />
    </points>
  );
}

function Shards() {
  const group = useRef<THREE.Group>(null!);
  
  const shardsData = useMemo(() => {
    return new Array(30).fill(0).map(() => ({
      position: [
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10,
        (Math.random() - 0.5) * 10
      ] as [number, number, number],
      rotation: [
        Math.random() * Math.PI,
        Math.random() * Math.PI,
        0
      ] as [number, number, number],
      scale: Math.random() * 0.5 + 0.2
    }));
  }, []);

  useFrame((state, delta) => {
    if (group.current) {
        // Slow rotation of the entire shard system
      group.current.rotation.y += delta * 0.03;
      group.current.rotation.z += delta * 0.01;
    }
  });

  return (
    <group ref={group}>
      {shardsData.map((data, i) => (
        <mesh key={i} position={data.position} rotation={data.rotation} scale={data.scale}>
          <tetrahedronGeometry args={[0.3, 0]} />
          <meshBasicMaterial 
            color="#8b5cf6" // Violet-500
            wireframe 
            transparent 
            opacity={0.1} 
          />
        </mesh>
      ))}
    </group>
  );
}

export default function Background() {
  return (
    <div className="fixed inset-0 -z-10 w-full h-full bg-black pointer-events-none">
      <Canvas camera={{ position: [0, 0, 5], fov: 45 }}>
        <Particles />
        <Shards />
      </Canvas>
    </div>
  );
}
