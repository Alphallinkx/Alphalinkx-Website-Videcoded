'use client';

import React, { useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

function BrokenChainScene() {
  const link1Ref = useRef<THREE.Mesh>(null);
  const link2Ref = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (link1Ref.current && link2Ref.current) {
      link1Ref.current.rotation.y += delta * 0.5;
      link1Ref.current.rotation.z += delta * 0.2;
      link2Ref.current.rotation.y -= delta * 0.4;
      link2Ref.current.rotation.x += delta * 0.3;
    }
  });

  return (
    <group>
      <mesh ref={link1Ref} position={[-1.6, 0.4, 0]} rotation={[0.4, 0.2, -0.6]}>
        <torusGeometry args={[1.2, 0.3, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#FF5A1F"
          emissive="#FF8A3D"
          emissiveIntensity={0.8}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
      <mesh ref={link2Ref} position={[1.6, -0.4, 0]} rotation={[-0.5, 0.8, 0.5]}>
        <torusGeometry args={[1.2, 0.3, 16, 32, Math.PI * 1.5]} />
        <meshStandardMaterial
          color="#33333A"
          emissive="#1A1A1E"
          emissiveIntensity={0.2}
          metalness={0.9}
          roughness={0.2}
        />
      </mesh>
    </group>
  );
}

export default function BrokenChainCanvas() {
  return (
    <Canvas
      camera={{ position: [0, 0, 6], fov: 45 }}
      dpr={[1, 1.5]}
      gl={{ antialias: true, alpha: true }}
    >
      <ambientLight intensity={0.6} />
      <pointLight position={[5, 5, 5]} color="#FF5A1F" intensity={3} />
      <pointLight position={[-5, -5, -2]} color="#708090" intensity={2} />
      <Float speed={1.8} rotationIntensity={0.4} floatIntensity={0.5}>
        <BrokenChainScene />
      </Float>
    </Canvas>
  );
}
