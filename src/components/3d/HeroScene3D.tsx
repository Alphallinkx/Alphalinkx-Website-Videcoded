import React, { useRef, useEffect } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { Environment, Lightformer, ContactShadows } from '@react-three/drei';
import * as THREE from 'three';

const ORANGE = '#ff6b00';
const DARK_CHROME = '#141414';

interface LinksProps {
  scroll: React.MutableRefObject<number>;
}

/**
 * Three interlocking links — "Linkx": connected digital systems.
 * Interlocks at scroll = 0, unlinks smoothly on scroll down, and relinks on scroll up.
 */
function Links({ scroll }: LinksProps) {
  const group = useRef<THREE.Group>(null);
  const leftLinkRef = useRef<THREE.Mesh>(null);
  const centerLinkRef = useRef<THREE.Mesh>(null);
  const rightLinkRef = useRef<THREE.Mesh>(null);

  // Track viewport to scale responsively on mobile
  const { viewport } = useThree();

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    const currentScroll = Math.max(0, scroll.current);

    // Responsive scaling based on viewport width (mobile-friendly)
    const targetScale = Math.min(1.0, Math.max(0.56, viewport.width / 6.8));
    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.exp(-6 * dt));

    // Base Group Rotation & Motion
    // Follows mouse pointer gently and tilts with scroll
    const targetRotX = state.pointer.y * 0.28 + currentScroll * 0.85 + 0.18;
    const targetRotY = t * 0.14 + state.pointer.x * 0.45;
    g.rotation.x += (targetRotX - g.rotation.x) * (1 - Math.exp(-4.5 * dt));
    g.rotation.y += (targetRotY - g.rotation.y) * (1 - Math.exp(-4.5 * dt));
    g.position.y = Math.sin(t * 0.6) * 0.08 - currentScroll * 1.1;

    // Smooth Unlinking / Relinking Physics
    // As currentScroll increases, left and right links pull away outward.
    // At scroll = 0: left = -1.25, center = 0, right = +1.25 (interlocked).
    // As scroll increases: left and right slide clear beyond the center link loops (> 2.3), fully uncoupling.
    // When scroll returns to 0: they smoothly thread back into the center loop and lock.
    const unlinkingFactor = 1 - Math.exp(-5.5 * dt);
    const separation = currentScroll * 2.65;

    // 1. Left Link (Orange)
    if (leftLinkRef.current) {
      const targetLeftX = -1.25 - separation;
      const targetLeftY = separation * 0.32;
      const targetLeftZ = separation * 0.18;
      leftLinkRef.current.position.x += (targetLeftX - leftLinkRef.current.position.x) * unlinkingFactor;
      leftLinkRef.current.position.y += (targetLeftY - leftLinkRef.current.position.y) * unlinkingFactor;
      leftLinkRef.current.position.z += (targetLeftZ - leftLinkRef.current.position.z) * unlinkingFactor;

      // Dynamic uncoupling tilt
      const targetLeftRotZ = currentScroll * 0.45;
      const targetLeftRotY = -currentScroll * 0.35;
      leftLinkRef.current.rotation.z += (targetLeftRotZ - leftLinkRef.current.rotation.z) * unlinkingFactor;
      leftLinkRef.current.rotation.y += (targetLeftRotY - leftLinkRef.current.rotation.y) * unlinkingFactor;
    }

    // 2. Center Link (Dark Chrome)
    if (centerLinkRef.current) {
      // Once tension releases, center link slightly drops and rolls
      const targetCenterY = -separation * 0.28;
      const targetCenterRotX = Math.PI / 2 + currentScroll * 0.35;
      const targetCenterRotZ = currentScroll * 0.25;

      centerLinkRef.current.position.y += (targetCenterY - centerLinkRef.current.position.y) * unlinkingFactor;
      centerLinkRef.current.rotation.x += (targetCenterRotX - centerLinkRef.current.rotation.x) * unlinkingFactor;
      centerLinkRef.current.rotation.z += (targetCenterRotZ - centerLinkRef.current.rotation.z) * unlinkingFactor;
    }

    // 3. Right Link (Orange)
    if (rightLinkRef.current) {
      const targetRightX = 1.25 + separation;
      const targetRightY = -separation * 0.32;
      const targetRightZ = -separation * 0.18;
      rightLinkRef.current.position.x += (targetRightX - rightLinkRef.current.position.x) * unlinkingFactor;
      rightLinkRef.current.position.y += (targetRightY - rightLinkRef.current.position.y) * unlinkingFactor;
      rightLinkRef.current.position.z += (targetRightZ - rightLinkRef.current.position.z) * unlinkingFactor;

      // Symmetrical uncoupling tilt
      const targetRightRotZ = -currentScroll * 0.45;
      const targetRightRotY = currentScroll * 0.35;
      rightLinkRef.current.rotation.z += (targetRightRotZ - rightLinkRef.current.rotation.z) * unlinkingFactor;
      rightLinkRef.current.rotation.y += (targetRightRotY - rightLinkRef.current.rotation.y) * unlinkingFactor;
    }
  });

  return (
    <group ref={group} rotation={[0.2, 0, 0.3]}>
      {/* 01. Left Ring — Vibrant Glossy Orange */}
      <mesh ref={leftLinkRef} position={[-1.25, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1, 0.28, 48, 128]} />
        <meshPhysicalMaterial
          color={ORANGE}
          metalness={0.35}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>

      {/* 02. Center Ring — Deep Glossy Obsidian Chrome, Interlocking Horizontally */}
      <mesh ref={centerLinkRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1, 0.28, 48, 128]} />
        <meshPhysicalMaterial
          color={DARK_CHROME}
          metalness={0.92}
          roughness={0.24}
          clearcoat={0.7}
          clearcoatRoughness={0.15}
          reflectivity={0.95}
        />
      </mesh>

      {/* 03. Right Ring — Vibrant Glossy Orange */}
      <mesh ref={rightLinkRef} position={[1.25, 0, 0]} rotation={[0, 0, 0]} castShadow receiveShadow>
        <torusGeometry args={[1, 0.28, 48, 128]} />
        <meshPhysicalMaterial
          color={ORANGE}
          metalness={0.35}
          roughness={0.22}
          clearcoat={1}
          clearcoatRoughness={0.15}
          reflectivity={0.9}
        />
      </mesh>
    </group>
  );
}

// Window pointer forwarder helper so mouse tilt works across entire screen
function MouseTracker() {
  const { pointer } = useThree();

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      // Normalize to [-1, 1]
      const nx = (e.clientX / window.innerWidth) * 2 - 1;
      const ny = -(e.clientY / window.innerHeight) * 2 + 1;
      pointer.x = nx;
      pointer.y = ny;
    };

    window.addEventListener('mousemove', handleMouseMove, { passive: true });
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, [pointer]);

  return null;
}

export interface HeroSceneProps {
  scroll: React.MutableRefObject<number>;
}

export const HeroScene3D: React.FC<HeroSceneProps> = ({ scroll }) => {
  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-0">
      <Canvas
        dpr={[1, 1.75]}
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
      >
        <MouseTracker />
        <ambientLight intensity={0.4} />
        <directionalLight position={[4, 6, 5]} intensity={2.4} castShadow />
        <pointLight position={[-4, -2, 3]} intensity={28} color={ORANGE} />
        <pointLight position={[4, 2, -3]} intensity={15} color="#ffffff" />

        <Links scroll={scroll} />

        <ContactShadows
          position={[0, -2.1, 0]}
          opacity={0.55}
          scale={11}
          blur={2.6}
          far={4.5}
        />

        <Environment resolution={256}>
          <Lightformer intensity={3.2} position={[0, 5, -2]} scale={[10, 3, 1]} />
          <Lightformer
            intensity={2.4}
            color={ORANGE}
            position={[-6, 0, 2]}
            rotation-y={Math.PI / 2}
            scale={[12, 2, 1]}
          />
          <Lightformer
            intensity={1.8}
            color="#ffffff"
            position={[6, 1, 2]}
            rotation-y={-Math.PI / 2}
            scale={[12, 1, 1]}
          />
        </Environment>
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
