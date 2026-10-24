import React, { useRef } from 'react';
import { Link } from 'react-router-dom';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';

// 3D Broken Chain Links
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
      {/* Severed Link 1 */}
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

      {/* Severed Link 2 */}
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

export const NotFoundPage: React.FC = () => {
  return (
    <main className="min-h-[85vh] w-full flex flex-col items-center justify-center px-6 py-24 bg-[#0A0A0B] text-center relative overflow-hidden select-none">
      {/* 3D Broken Chain Canvas */}
      <div className="w-full h-72 max-w-lg mx-auto relative">
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
      </div>

      <div className="relative z-10 max-w-xl mx-auto space-y-4">
        <span className="font-mono text-[12px] font-medium text-[#FF5A1F] tracking-[0.18em] uppercase">
          // ERROR 404: CONNECTION SEVERED
        </span>
        <h1 className="font-display font-extrabold text-5xl sm:text-7xl text-white tracking-[-0.03em] uppercase leading-[1.02]">
          SIGNAL UNLINKED.
        </h1>
        <p className="font-sans text-[16px] text-[#C2C2C2] max-w-md mx-auto leading-[1.6]">
          The requested coordinate does not exist or has been disconnected from the growth graph.
        </p>

        <div className="pt-6">
          <Link
            to="/"
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full bg-gradient-to-r from-[#FF5A1F] to-[#FF8A3D] text-black font-mono text-[12px] font-medium uppercase tracking-[0.18em] shadow-[0_0_25px_rgba(255,90,31,0.5)] hover:scale-105 active:scale-95 transition-all"
            data-cursor="RELINK"
          >
            <span>Relink to Home Node</span>
            <span>→</span>
          </Link>
        </div>
      </div>
    </main>
  );
};

export default NotFoundPage;
