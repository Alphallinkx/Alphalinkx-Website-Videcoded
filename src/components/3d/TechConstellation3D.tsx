import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, Text } from '@react-three/drei';
import * as THREE from 'three';

interface TechNodeProps {
  position: [number, number, number];
  name: string;
  color?: string;
}

function TechNode({ position, name, color = '#FC6603' }: TechNodeProps) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.x = Math.sin(state.clock.getElapsedTime() + position[0]) * 0.2;
    }
  });

  return (
    <Float speed={2} rotationIntensity={0.5} floatIntensity={0.7} position={position}>
      <mesh ref={meshRef}>
        <sphereGeometry args={[0.22, 24, 24]} />
        <meshStandardMaterial
          color={color}
          emissive={color}
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.8}
        />
      </mesh>
      {/* 3D Label */}
      <Text
        position={[0, 0.42, 0]}
        fontSize={0.2}
        color="#F8FAFC"
        anchorX="center"
        anchorY="middle"
        font="https://fonts.gstatic.com/s/spacegrotesk/v16/V8mQoQDjQSkFtoMM3T6r8E7mF71Q-g.woff"
      >
        {name}
      </Text>
    </Float>
  );
}

function ConstellationCluster() {
  const groupRef = useRef<THREE.Group>(null);

  const nodes: { name: string; pos: [number, number, number]; color: string }[] = [
    { name: 'React 19', pos: [0, 0.2, 0], color: '#61DAFB' },
    { name: 'Three.js / WebGL', pos: [-2.2, 1.2, -0.5], color: '#FC6603' },
    { name: 'TypeScript', pos: [2.3, 1.1, -0.6], color: '#3178C6' },
    { name: 'Node.js & Express', pos: [-1.8, -1.3, 0.4], color: '#68A063' },
    { name: 'PostgreSQL', pos: [1.9, -1.2, 0.5], color: '#336791' },
    { name: 'Autonomous AI', pos: [0, 2.3, -0.2], color: '#FC6603' },
    { name: 'Next.js & Edge', pos: [-3.2, 0, -1], color: '#FFFFFF' },
    { name: 'Tailwind CSS', pos: [3.2, 0, -1], color: '#38BDF8' },
  ];

  useFrame((state) => {
    if (groupRef.current) {
      groupRef.current.rotation.y = state.clock.getElapsedTime() * 0.08 + state.mouse.x * 0.2;
      groupRef.current.rotation.x = state.mouse.y * 0.15;
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
        <TechNode key={i} position={node.pos} name={node.name} color={node.color} />
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
