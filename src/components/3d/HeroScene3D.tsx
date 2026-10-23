import React, { useRef, useEffect, Suspense } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

const ORANGE = '#ff5a1f';
const DARK_CHROME = '#18181b';

interface LinksProps {
  scroll: React.MutableRefObject<number>;
}

/**
 * Three interlocking links — "Linkx": connected digital systems.
 * Interlocks at scroll = 0, unlinks smoothly on scroll down, and relinks on scroll up.
 * Responsively scales and positions for both mobile and desktop screens.
 */
function Links({ scroll }: LinksProps) {
  const group = useRef<THREE.Group>(null);
  const leftLinkRef = useRef<THREE.Mesh>(null);
  const centerLinkRef = useRef<THREE.Mesh>(null);
  const rightLinkRef = useRef<THREE.Mesh>(null);

  // Track viewport and canvas dimensions
  const { viewport, size } = useThree();

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const g = group.current;
    if (!g) return;

    const t = state.clock.elapsedTime;
    const currentScroll = Math.max(0, scroll.current);
    const isMobile = size.width < 768 || viewport.width < 5.0;

    // Responsive scaling:
    // On mobile screens, scale comfortably to fit portrait screen without clipping
    // On desktop, scale up to 1.0
    const targetScale = isMobile
      ? Math.min(0.55, Math.max(0.42, viewport.width / 5.2))
      : Math.min(1.0, Math.max(0.56, viewport.width / 6.8));

    g.scale.lerp(new THREE.Vector3(targetScale, targetScale, targetScale), 1 - Math.exp(-6 * dt));

    // Base Group Rotation & Motion
    // Follows mouse pointer gently and tilts with scroll
    const targetRotX = state.pointer.y * 0.28 + currentScroll * 0.85 + 0.18;
    const targetRotY = t * 0.14 + state.pointer.x * 0.45;
    g.rotation.x += (targetRotX - g.rotation.x) * (1 - Math.exp(-4.5 * dt));
    g.rotation.y += (targetRotY - g.rotation.y) * (1 - Math.exp(-4.5 * dt));

    // Vertical positioning:
    // Elevated slightly on mobile to center cleanly behind the headline
    const baseYOffset = isMobile ? 0.35 : 0;
    g.position.y = baseYOffset + Math.sin(t * 0.6) * 0.08 - currentScroll * (isMobile ? 0.85 : 1.1);

    // Smooth Unlinking / Relinking Physics
    // As currentScroll increases, left and right links pull away outward.
    const unlinkingFactor = 1 - Math.exp(-5.5 * dt);
    const separation = currentScroll * (isMobile ? 2.0 : 2.65);

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
      <mesh ref={leftLinkRef} position={[-1.25, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.28, 36, 96]} />
        <meshPhysicalMaterial
          color={ORANGE}
          metalness={0.45}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={0.9}
        />
      </mesh>

      {/* 02. Center Ring — Deep Glossy Obsidian Chrome, Interlocking Horizontally */}
      <mesh ref={centerLinkRef} position={[0, 0, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[1, 0.28, 36, 96]} />
        <meshPhysicalMaterial
          color={DARK_CHROME}
          metalness={0.95}
          roughness={0.16}
          clearcoat={0.9}
          clearcoatRoughness={0.1}
          reflectivity={0.95}
        />
      </mesh>

      {/* 03. Right Ring — Vibrant Glossy Orange */}
      <mesh ref={rightLinkRef} position={[1.25, 0, 0]} rotation={[0, 0, 0]}>
        <torusGeometry args={[1, 0.28, 36, 96]} />
        <meshPhysicalMaterial
          color={ORANGE}
          metalness={0.45}
          roughness={0.18}
          clearcoat={1}
          clearcoatRoughness={0.12}
          reflectivity={0.9}
        />
      </mesh>
    </group>
  );
}

/**
 * Dynamically adjusts camera FOV and position for mobile portrait screens
 * to guarantee the full 3D interlocking chain is visible and centered on every device.
 */
function ResponsiveCamera() {
  const { camera, size } = useThree();

  useEffect(() => {
    const isMobile = size.width < 768;
    if (camera instanceof THREE.PerspectiveCamera) {
      if (isMobile) {
        // Mobile portrait: pull camera back and widen FOV so entire chain is centered and clear
        camera.position.set(0, 0.35, 9.8);
        camera.fov = 48;
      } else {
        camera.position.set(0, 0, 7.2);
        camera.fov = 38;
      }
      camera.updateProjectionMatrix();
    }
  }, [camera, size.width, size.height]);

  return null;
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
  const canvasRef = useRef<HTMLCanvasElement>(null);

  // WebGL context loss prevention & recovery
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const handleContextLost = (e: Event) => {
      e.preventDefault();
      console.warn('[HeroScene3D] WebGL context lost. Handling gracefully...');
    };

    const handleContextRestored = () => {
      console.info('[HeroScene3D] WebGL context restored.');
    };

    canvas.addEventListener('webglcontextlost', handleContextLost, false);
    canvas.addEventListener('webglcontextrestored', handleContextRestored, false);

    return () => {
      canvas.removeEventListener('webglcontextlost', handleContextLost);
      canvas.removeEventListener('webglcontextrestored', handleContextRestored);
    };
  }, []);

  return (
    <div className="absolute inset-0 w-full h-full pointer-events-none select-none z-[1] bg-transparent">
      <Canvas
        ref={canvasRef}
        dpr={[1, Math.min(typeof window !== 'undefined' ? window.devicePixelRatio || 1 : 1, 1.75)]}
        camera={{ position: [0, 0, 7.2], fov: 38 }}
        gl={{
          antialias: true,
          alpha: true,
          powerPreference: 'default',
        }}
        onCreated={({ gl }) => {
          // Explicitly clear to 100% transparent black (prevents white canvas flash on mobile)
          gl.setClearColor(0x000000, 0);
        }}
        className="!bg-transparent"
        style={{ background: 'transparent' }}
      >
        <ResponsiveCamera />
        <MouseTracker />

        {/* High-Performance Studio Lighting (100% Mobile GPU Safe, zero FBO overhead) */}
        <ambientLight intensity={0.8} />
        {/* Key directional light from top right */}
        <directionalLight position={[5, 8, 5]} intensity={2.6} color="#ffffff" />
        {/* Cool rim light from rear-left to highlight chrome bevels */}
        <directionalLight position={[-6, -3, -3]} intensity={1.8} color="#94a3b8" />
        {/* Warm orange link accent light */}
        <pointLight position={[3, 2, 4]} intensity={2.8} color="#ff8a3d" />
        {/* Cool obsidian chrome specular kicker */}
        <pointLight position={[-3, 1, 4]} intensity={2.2} color="#ffffff" />
        {/* Rear orange rim glow */}
        <pointLight position={[0, -2, -4]} intensity={2.0} color="#ff5a1f" />

        <Suspense fallback={null}>
          <Links scroll={scroll} />
        </Suspense>
      </Canvas>
    </div>
  );
};

export default HeroScene3D;
