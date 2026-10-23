import React, { useRef, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { Float } from '@react-three/drei';
import * as THREE from 'three';
import {
  Cpu,
  Radio,
  MousePointerClick,
  Globe,
  Share2,
  Filter,
  Layers,
  Award,
  Compass,
  TrendingUp,
} from 'lucide-react';

interface LetterIcon3DProps {
  type: string;
  isActive?: boolean;
}

function ShapeForType({ type }: { type: string }) {
  const meshRef = useRef<THREE.Mesh>(null);

  useFrame((_, delta) => {
    if (meshRef.current) {
      meshRef.current.rotation.y += delta * 0.9;
      meshRef.current.rotation.x += delta * 0.4;
    }
  });

  const material = new THREE.MeshStandardMaterial({
    color: '#FF5A1F',
    emissive: '#FF8A3D',
    emissiveIntensity: 0.6,
    metalness: 0.85,
    roughness: 0.2,
    wireframe: false,
  });

  const wireframeMat = new THREE.MeshBasicMaterial({
    color: '#FFFFFF',
    wireframe: true,
    transparent: true,
    opacity: 0.35,
  });

  switch (type) {
    case 'ai-beacon':
      return (
        <group>
          <mesh ref={meshRef}>
            <octahedronGeometry args={[1.3, 0]} />
            <primitive object={material} attach="material" />
            <mesh scale={[1.05, 1.05, 1.05]}>
              <octahedronGeometry args={[1.3, 0]} />
              <primitive object={wireframeMat} attach="material" />
            </mesh>
          </mesh>
        </group>
      );

    case 'radar-pin':
      return (
        <mesh ref={meshRef}>
          <cylinderGeometry args={[0.2, 1.2, 2.2, 16]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'paid-click':
      return (
        <mesh ref={meshRef}>
          <torusKnotGeometry args={[0.8, 0.28, 64, 16]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'hyper-web':
      return (
        <mesh ref={meshRef}>
          <icosahedronGeometry args={[1.2, 1]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'audience-ring':
      return (
        <mesh ref={meshRef}>
          <torusGeometry args={[1.1, 0.3, 16, 32]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'lead-funnel':
      return (
        <mesh ref={meshRef}>
          <dodecahedronGeometry args={[1.2, 0]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'insight-nodes':
      return (
        <mesh ref={meshRef}>
          <boxGeometry args={[1.3, 1.3, 1.3]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'rank-crown':
      return (
        <mesh ref={meshRef}>
          <tetrahedronGeometry args={[1.4, 0]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'geo-prism':
      return (
        <mesh ref={meshRef}>
          <coneGeometry args={[1.1, 2, 8]} />
          <primitive object={material} attach="material" />
        </mesh>
      );

    case 'growth-nexus':
    default:
      return (
        <mesh ref={meshRef}>
          <sphereGeometry args={[1.1, 16, 16]} />
          <primitive object={material} attach="material" />
        </mesh>
      );
  }
}

// Fallback high-performance SVG glyph renderer (saves mobile WebGL context slots)
function GlyphForType({ type, isActive }: { type: string; isActive: boolean }) {
  const iconProps = {
    className: `w-9 h-9 transition-all duration-300 ${
      isActive
        ? 'text-[#FF5A1F] drop-shadow-[0_0_16px_rgba(255,90,31,0.8)] scale-110'
        : 'text-[#8A8A8E] group-hover:text-white'
    }`,
    strokeWidth: 1.5,
  };

  switch (type) {
    case 'ai-beacon':
      return <Cpu {...iconProps} />;
    case 'radar-pin':
      return <Radio {...iconProps} />;
    case 'paid-click':
      return <MousePointerClick {...iconProps} />;
    case 'hyper-web':
      return <Globe {...iconProps} />;
    case 'audience-ring':
      return <Share2 {...iconProps} />;
    case 'lead-funnel':
      return <Filter {...iconProps} />;
    case 'insight-nodes':
      return <Layers {...iconProps} />;
    case 'rank-crown':
      return <Award {...iconProps} />;
    case 'geo-prism':
      return <Compass {...iconProps} />;
    case 'growth-nexus':
    default:
      return <TrendingUp {...iconProps} />;
  }
}

export const LetterIcon3D: React.FC<LetterIcon3DProps> = ({ type, isActive = false }) => {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768 || window.matchMedia('(pointer: coarse)').matches);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  return (
    <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-2xl bg-[#161619]/90 border border-white/10 flex items-center justify-center overflow-hidden shadow-inner relative group">
      {/* On mobile or when inactive on desktop, render sleek animated tech glyph */}
      {isMobile || !isActive ? (
        <div className="flex flex-col items-center justify-center">
          <GlyphForType type={type} isActive={isActive} />
          {isActive && (
            <span className="w-1.5 h-1.5 rounded-full bg-[#FF5A1F] mt-2 animate-ping" />
          )}
        </div>
      ) : (
        /* Only mount 3D WebGL Canvas for the single active panel on desktop to conserve GPU contexts */
        <Canvas
          camera={{ position: [0, 0, 4.5], fov: 45 }}
          dpr={[1, 1.5]}
          gl={{ antialias: true, alpha: true }}
          className="!bg-transparent"
        >
          <ambientLight intensity={0.8} />
          <directionalLight position={[3, 4, 3]} intensity={2.5} color="#FF8A3D" />
          <pointLight position={[-3, -3, 2]} intensity={1.5} color="#FF5A1F" />
          <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <ShapeForType type={type} />
          </Float>
        </Canvas>
      )}
    </div>
  );
};
