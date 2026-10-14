import React, { useRef, useState } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Html } from '@react-three/drei';
import * as THREE from 'three';

interface TechNodeProps {
  position: [number, number, number];
  name: string;
  category: string;
  color?: string;
}

function TechNode({ position, name, category, color = '#FC6603' }: TechNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);

  useFrame((state) => {
    if (meshRef.current) {
      const t = state.clock.getElapsedTime();
      meshRef.current.rotation.x = Math.sin(t + position[0]) * 0.2;
      meshRef.current.rotation.y = Math.cos(t + position[1]) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.4} floatIntensity={0.6} position={position}>
      <mesh
        ref={meshRef}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        scale={hovered ? 1.3 : 1}
      >
        <sphereGeometry args={[0.24, 24, 24]} />
        <meshStandardMaterial
          color={hovered ? '#FFFFFF' : color}
          emissive={color}
          emissiveIntensity={hovered ? 1.2 : 0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>

      {/* HTML Node Label (Self-Contained & Crisp) */}
      <Html position={[0, 0.42, 0]} center distanceFactor={10} zIndexRange={[10, 0]}>
        <div className="select-none pointer-events-none whitespace-nowrap">
          <div className="px-2.5 py-1 rounded-full bg-black/80 backdrop-blur-md border border-white/20 text-[11px] font-mono text-zinc-200 flex items-center gap-1.5 shadow-lg">
            <span
              className="w-1.5 h-1.5 rounded-full"
              style={{ backgroundColor: color }}
            />
            <span className="font-semibold text-white">{name}</span>
          </div>
        </div>
      </Html>
    </Float>
  );
}

function ConstellationCluster() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes: { name: string; category: string; pos: [number, number, number]; color: string }[] = [
    { name: 'React 19', category: 'Frontend', pos: [0, 0.3, 0], color: '#61DAFB' },
    { name: 'Three.js / WebGL', category: 'Creative 3D', pos: [-2.2, 1.2, -0.4], color: '#FC6603' },
    { name: 'TypeScript', category: 'Language', pos: [2.3, 1.1, -0.5], color: '#3178C6' },
    { name: 'Node.js & Express', category: 'Backend', pos: [-1.9, -1.3, 0.4], color: '#68A063' },
    { name: 'PostgreSQL', category: 'Database', pos: [1.9, -1.2, 0.5], color: '#336791' },
    { name: 'Autonomous AI', category: 'Intelligence', pos: [0, 2.3, -0.2], color: '#FC6603' },
    { name: 'Next.js & Edge', category: 'Fullstack', pos: [-3.2, 0, -0.8], color: '#FFFFFF' },
    { name: 'Tailwind CSS', category: 'Styling', pos: [3.2, 0, -0.8], color: '#38BDF8' },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08 + state.mouse.x * 0.25;
      groupRef.current.rotation.x = state.mouse.y * 0.18;
    }
  });

  return (
    <group ref={groupRef}>
      {/* Central Brand Core Orb */}
      <mesh position={[0, 0, 0]}>
        <sphereGeometry args={[0.55, 32, 32]} />
        <meshPhysicalMaterial
          color="#FC6603"
          emissive="#EA580C"
          emissiveIntensity={0.8}
          roughness={0.15}
          metalness={0.9}
        />
      </mesh>

      {/* Orbiting Orbital Rings */}
      <mesh rotation={[Math.PI / 3, 0, 0]}>
        <torusGeometry args={[3.4, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FC6603" transparent opacity={0.3} />
      </mesh>
      <mesh rotation={[-Math.PI / 4, 0, 0]}>
        <torusGeometry args={[2.5, 0.015, 16, 100]} />
        <meshBasicMaterial color="#FFFFFF" transparent opacity={0.2} />
      </mesh>

      {/* Technology Nodes */}
      {nodes.map((node, i) => (
        <TechNode
          key={i}
          position={node.pos}
          name={node.name}
          category={node.category}
          color={node.color}
        />
      ))}
    </group>
  );
}

export const TechConstellation3D: React.FC = () => {
  return (
    <div className="w-full h-[480px] relative select-none">
      <Canvas
        camera={{ position: [0, 0, 7.5], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true }}
      >
        <ambientLight intensity={0.7} />
        <directionalLight position={[5, 10, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[0, 0, 2]} intensity={2.5} color="#FC6603" distance={10} />
        <ConstellationCluster />
      </Canvas>
    </div>
  );
};
