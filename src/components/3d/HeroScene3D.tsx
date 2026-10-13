import React, { useRef, useMemo, Suspense } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float, MeshDistortMaterial } from '@react-three/drei';
import * as THREE from 'three';

// Central Abstract Brand Sculpture
function BrandSculpture() {
  const meshRef = useRef<THREE.Mesh>(null);
  const innerRef = useRef<THREE.Mesh>(null);
  const ringRef = useRef<THREE.Group>(null);

  useFrame((state) => {
    const t = state.clock.getElapsedTime();
    const mouseX = state.mouse.x * 0.4;
    const mouseY = state.mouse.y * 0.4;

    if (meshRef.current) {
      meshRef.current.rotation.x = THREE.MathUtils.lerp(meshRef.current.rotation.x, t * 0.2 + mouseY, 0.05);
      meshRef.current.rotation.y = THREE.MathUtils.lerp(meshRef.current.rotation.y, t * 0.25 + mouseX, 0.05);
    }

    if (innerRef.current) {
      innerRef.current.rotation.x = -t * 0.3;
      innerRef.current.rotation.z = t * 0.2;
    }

    if (ringRef.current) {
      ringRef.current.rotation.z = t * 0.15;
      ringRef.current.rotation.x = Math.PI / 4 + Math.sin(t * 0.5) * 0.1;
    }
  });

  return (
    <group position={[0, 0, 0]}>
      {/* Outer Torus Knot with Electric Orange Material */}
      <mesh ref={meshRef} scale={1.2}>
        <torusKnotGeometry args={[1.35, 0.38, 128, 32, 2, 3]} />
        <meshPhysicalMaterial
          color="#FC6603"
          emissive="#7C2D12"
          emissiveIntensity={0.6}
          roughness={0.2}
          metalness={0.85}
          clearcoat={1}
          clearcoatRoughness={0.1}
          reflectivity={0.9}
        />
      </mesh>

      {/* Inner Glowing Crystal Core */}
      <mesh ref={innerRef} scale={0.65}>
        <icosahedronGeometry args={[1.2, 1]} />
        <MeshDistortMaterial
          color="#FFA055"
          emissive="#FC6603"
          emissiveIntensity={0.9}
          roughness={0.1}
          metalness={0.3}
          distort={0.3}
          speed={2}
          wireframe={true}
        />
      </mesh>

      {/* Orbiting Orbital Halo Ring */}
      <group ref={ringRef}>
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <torusGeometry args={[2.7, 0.025, 16, 100]} />
          <meshBasicMaterial color="#FC6603" transparent opacity={0.6} />
        </mesh>
        {/* Orbital Beacon Nodes */}
        <mesh position={[2.7, 0, 0]}>
          <sphereGeometry args={[0.09, 16, 16]} />
          <meshBasicMaterial color="#FFFFFF" />
        </mesh>
        <mesh position={[-2.7, 0, 0]}>
          <sphereGeometry args={[0.07, 16, 16]} />
          <meshBasicMaterial color="#FC6603" />
        </mesh>
      </group>
    </group>
  );
}

// Glowing Interactive Atmospheric Particle Field
function ParticleField({ count = 180 }: { count?: number }) {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, colors] = useMemo(() => {
    const pos = new Float32Array(count * 3);
    const col = new Float32Array(count * 3);
    const orange = new THREE.Color('#FC6603');
    const white = new THREE.Color('#FFFFFF');
    const amber = new THREE.Color('#FFB066');

    for (let i = 0; i < count; i++) {
      // Spread across spherical volume
      const r = 3.5 + Math.random() * 5.0;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);

      pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
      pos[i * 3 + 2] = r * Math.cos(phi);

      const choice = Math.random();
      const c = choice > 0.6 ? orange : choice > 0.3 ? amber : white;
      col[i * 3] = c.r;
      col[i * 3 + 1] = c.g;
      col[i * 3 + 2] = c.b;
    }
    return [pos, col];
  }, [count]);

  useFrame((state) => {
    if (pointsRef.current) {
      pointsRef.current.rotation.y = state.clock.getElapsedTime() * 0.04;
      pointsRef.current.rotation.x = state.clock.getElapsedTime() * 0.02;
    }
  });

  return (
    <points ref={pointsRef}>
      <bufferGeometry>
        <bufferAttribute
          attach="attributes-position"
          count={positions.length / 3}
          array={positions}
          itemSize={3}
        />
        <bufferAttribute
          attach="attributes-color"
          count={colors.length / 3}
          array={colors}
          itemSize={3}
        />
      </bufferGeometry>
      <pointsMaterial
        size={0.05}
        vertexColors
        transparent
        opacity={0.8}
        blending={THREE.AdditiveBlending}
      />
    </points>
  );
}

export const HeroScene3D: React.FC = () => {
  return (
    <div className="w-full h-full relative cursor-grab active:cursor-grabbing select-none">
      <Canvas
        camera={{ position: [0, 0, 6.2], fov: 45 }}
        dpr={[1, 1.5]}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <ambientLight intensity={0.6} />
        {/* Key Lighting with Brand Glow */}
        <directionalLight position={[10, 10, 5]} intensity={1.5} color="#FFFFFF" />
        <pointLight position={[-6, -4, 2]} intensity={2.2} color="#FC6603" distance={15} />
        <pointLight position={[4, 5, -3]} intensity={1.5} color="#FF9933" distance={12} />

        <Suspense fallback={null}>
          <Float speed={1.8} rotationIntensity={0.6} floatIntensity={0.8}>
            <BrandSculpture />
          </Float>
          <ParticleField />
        </Suspense>
      </Canvas>
    </div>
  );
};
