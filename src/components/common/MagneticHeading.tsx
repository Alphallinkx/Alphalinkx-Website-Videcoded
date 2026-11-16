'use client';

import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';

interface MagneticHeadingProps {
  children: React.ReactNode;
  as?: 'h1' | 'h2' | 'h3';
  className?: string;
  maxOffset?: number;
}

export const MagneticHeading: React.FC<MagneticHeadingProps> = ({
  children,
  as: Component = 'h2',
  className = '',
  maxOffset = 4.5,
}) => {
  const wrapperRef = useRef<HTMLDivElement>(null);
  const orangeRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const wrapper = wrapperRef.current;
    const orange = orangeRef.current;
    if (!wrapper || !orange) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    const handlePointerMove = (e: PointerEvent) => {
      const rect = wrapper.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;

      const dx = e.clientX - centerX;
      const dy = e.clientY - centerY;

      const distance = Math.hypot(dx, dy);
      const maxRadius = Math.max(rect.width, rect.height) / 2 || 120;

      const intensity = Math.min(1, Math.max(0.2, distance / maxRadius));
      const angle = Math.atan2(dy, dx);

      const targetX = Math.cos(angle) * (intensity * maxOffset);
      const targetY = Math.sin(angle) * (intensity * maxOffset);

      gsap.to(orange, {
        x: targetX,
        y: targetY,
        duration: 0.2,
        ease: 'power1.out',
        overwrite: 'auto',
      });
    };

    const handlePointerLeave = () => {
      gsap.to(orange, {
        x: 0,
        y: 0,
        duration: 0.6,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    };

    wrapper.addEventListener('pointermove', handlePointerMove);
    wrapper.addEventListener('pointerleave', handlePointerLeave);

    return () => {
      wrapper.removeEventListener('pointermove', handlePointerMove);
      wrapper.removeEventListener('pointerleave', handlePointerLeave);
    };
  }, [maxOffset]);

  return (
    <div
      ref={wrapperRef}
      className={`relative inline-flex items-center justify-center select-none cursor-default ${className}`}
    >
      {/* Primary Black Ink Heading (Front) */}
      <Component className="relative z-10 text-[#000000] uppercase font-display font-black tracking-[-0.03em] leading-[0.85] pointer-events-none">
        {children}
      </Component>

      {/* Offset Orange Shadow Heading (Back) */}
      <Component
        ref={orangeRef}
        aria-hidden="true"
        className="absolute inset-0 z-0 text-[#FF5400] uppercase font-display font-black tracking-[-0.03em] leading-[0.85] pointer-events-none will-change-transform"
      >
        {children}
      </Component>
    </div>
  );
};

export default MagneticHeading;
