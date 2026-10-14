import React, { useState, useRef, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import { NETWORK_STEPS } from '../../content/siteContent';

// 3D Constellation Scene of 4 glowing nodes connected by light beams
function ConstellationScene({ activeStep }: { activeStep: number }) {
  const groupRef = useRef<THREE.Group>(null);
  const nodes = [
    [-2.4, 1.2, 0],
    [-0.8, -1.0, 0.4],
    [1.0, 1.0, -0.2],
    [2.5, -0.8, 0.2],
  ] as const;

  useFrame((_, delta) => {
    if (groupRef.current) {
      // Subtle float and camera follow
      groupRef.current.rotation.y += delta * 0.15;
    }
  });

  return (
    <group ref={groupRef}>
      {/* 4 Nodes */}
      {nodes.map((pos, idx) => {
        const isActive = idx === activeStep;

        return (
          <group key={idx} position={pos}>
            {/* Outer pulse sphere */}
            <mesh scale={isActive ? [1.5, 1.5, 1.5] : [1, 1, 1]}>
              <sphereGeometry args={[0.28, 16, 16]} />
              <meshStandardMaterial
                color={isActive ? '#FF5A1F' : '#4A4A52'}
                emissive={isActive ? '#FF8A3D' : '#1A1A1E'}
                emissiveIntensity={isActive ? 1.8 : 0.2}
                metalness={0.9}
                roughness={0.1}
              />
            </mesh>

            {/* Glowing ring around active node */}
            {isActive && (
              <mesh rotation={[Math.PI / 2, 0, 0]}>
                <ringGeometry args={[0.45, 0.52, 32]} />
                <meshBasicMaterial color="#FF5A1F" side={THREE.DoubleSide} />
              </mesh>
            )}
          </group>
        );
      })}

      {/* Connecting light beams between consecutive nodes */}
      {nodes.slice(0, -1).map((startPos, idx) => {
        const endPos = nodes[idx + 1];
        const isPastOrCurrent = idx < activeStep;
        const p1 = new THREE.Vector3(...startPos);
        const p2 = new THREE.Vector3(...endPos);
        const distance = p1.distanceTo(p2);
        const midPoint = p1.clone().add(p2).multiplyScalar(0.5);

        // Calculate rotation pointing from p1 to p2
        const orientation = new THREE.Matrix4();
        orientation.lookAt(p1, p2, new THREE.Vector3(0, 1, 0));
        const rotEuler = new THREE.Euler().setFromRotationMatrix(orientation);

        return (
          <mesh key={`beam-${idx}`} position={midPoint} rotation={[rotEuler.x + Math.PI / 2, rotEuler.y, rotEuler.z]}>
            <cylinderGeometry args={[0.02, 0.02, distance, 8]} />
            <meshStandardMaterial
              color={isPastOrCurrent ? '#FF5A1F' : '#33333A'}
              emissive={isPastOrCurrent ? '#FF8A3D' : '#111115'}
              emissiveIntensity={isPastOrCurrent ? 1.4 : 0.15}
            />
          </mesh>
        );
      })}
    </group>
  );
}

export const NetworkProcessSection: React.FC = () => {
  const [activeStep, setActiveStep] = useState(0);
  const containerRef = useRef<HTMLElement>(null);

  // Allow clicking nodes or auto cycling
  const nextStep = () => setActiveStep((prev) => (prev + 1) % NETWORK_STEPS.length);
  const prevStep = () => setActiveStep((prev) => (prev - 1 + NETWORK_STEPS.length) % NETWORK_STEPS.length);

  return (
    <section
      ref={containerRef}
      id="process"
      aria-label="The 3D Network Process"
      className="relative py-24 md:py-36 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F]">
              // 06 THE NETWORK
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl text-white tracking-tighter uppercase mt-2">
              4-NODE EXECUTION CYCLE.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8A8A8E] max-w-sm uppercase leading-relaxed">
            Light signals pulse across each stage of delivery, from initial telemetry audit to compounding global scale.
          </p>
        </div>

        {/* 3D Visualizer & Step Information Split */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          {/* Left: 3D Constellation Canvas (Col 7) */}
          <div className="lg:col-span-7 h-[360px] sm:h-[480px] rounded-3xl bg-[#111113]/90 border border-white/10 relative overflow-hidden shadow-2xl flex items-center justify-center">
            {/* Top Scene Label */}
            <div className="absolute top-6 left-6 z-10 font-mono text-[11px] text-[#8A8A8E] uppercase tracking-wider flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-[#FF5A1F] animate-ping" />
              <span>INTERACTIVE 3D CONSTELLATION GRAPH</span>
            </div>

            <Canvas
              camera={{ position: [0, 0, 5.5], fov: 45 }}
              dpr={[1, 1.5]}
              gl={{ antialias: true, alpha: true }}
            >
              <ambientLight intensity={0.6} />
              <pointLight position={[5, 5, 5]} color="#FF8A3D" intensity={3} />
              <pointLight position={[-5, -5, -3]} color="#505060" intensity={2} />
              <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.4}>
                <ConstellationScene activeStep={activeStep} />
              </Float>
            </Canvas>

            {/* Bottom Scrubber Pill Buttons */}
            <div className="absolute bottom-6 left-6 right-6 z-10 flex items-center justify-between">
              <div className="flex gap-2">
                {NETWORK_STEPS.map((step, idx) => (
                  <button
                    key={step.number}
                    type="button"
                    onClick={() => setActiveStep(idx)}
                    className={`px-3 py-1.5 rounded-full font-mono text-xs font-bold transition-all ${
                      idx === activeStep
                        ? 'bg-[#FF5A1F] text-black shadow-[0_0_15px_#FF5A1F]'
                        : 'bg-white/5 text-[#8A8A8E] hover:text-white border border-white/10'
                    }`}
                  >
                    {step.number}
                  </button>
                ))}
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={prevStep}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10"
                  aria-label="Previous step"
                >
                  ←
                </button>
                <button
                  type="button"
                  onClick={nextStep}
                  className="w-8 h-8 rounded-full bg-white/5 border border-white/10 text-white flex items-center justify-center hover:bg-white/10"
                  aria-label="Next step"
                >
                  →
                </button>
              </div>
            </div>
          </div>

          {/* Right: Step Description & Deliverable Card (Col 5) */}
          <div className="lg:col-span-5 flex flex-col justify-between p-8 sm:p-10 rounded-3xl bg-[#111113] border border-white/10 shadow-2xl">
            <div>
              <div className="flex items-center justify-between pb-6 border-b border-white/10">
                <span className="font-mono text-xs text-[#FF5A1F] font-bold tracking-widest uppercase">
                  NODE {NETWORK_STEPS[activeStep].number} OF 04
                </span>
                <span className="font-mono text-xs text-[#8A8A8E]">
                  PHASE // {activeStep + 1}
                </span>
              </div>

              <h3 className="font-display font-black text-3xl sm:text-4xl text-white tracking-tight mt-6">
                {NETWORK_STEPS[activeStep].title}
              </h3>
              <p className="font-mono text-xs sm:text-sm text-[#FF8A3D] mt-2">
                {NETWORK_STEPS[activeStep].subtitle}
              </p>

              <p className="text-sm sm:text-base text-[#8A8A8E] mt-6 leading-relaxed">
                {NETWORK_STEPS[activeStep].description}
              </p>
            </div>

            <div className="mt-8 pt-6 border-t border-white/10">
              <span className="font-mono text-[10px] text-[#8A8A8E] uppercase tracking-wider block mb-1">
                KEY DELIVERABLE ARTIFACT:
              </span>
              <div className="p-4 rounded-xl bg-white/[0.04] border border-white/5 font-mono text-xs text-white flex items-center justify-between">
                <span>{NETWORK_STEPS[activeStep].deliverable}</span>
                <span className="text-[#FF5A1F] font-bold">READY</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
