'use client';

import React, { useRef, useEffect } from 'react';
import Link from 'next/link';
import gsap from 'gsap';
import { ArrowUpRight } from 'lucide-react';

interface Two26ButtonProps {
  children: React.ReactNode;
  to?: string;
  href?: string;
  onClick?: (e: React.MouseEvent) => void;
  type?: 'button' | 'submit' | 'reset';
  variant?: 'black' | 'orange' | 'cream';
  className?: string;
  disabled?: boolean;
}

export const Two26Button: React.FC<Two26ButtonProps> = ({
  children,
  to,
  href,
  onClick,
  type = 'button',
  variant = 'black',
  className = '',
  disabled = false,
}) => {
  const btnRef = useRef<HTMLAnchorElement & HTMLButtonElement>(null);
  const fillRef = useRef<HTMLSpanElement>(null);
  const arrowRef = useRef<HTMLSpanElement>(null);

  const destination = to || href;

  useEffect(() => {
    const btn = btnRef.current;
    const fill = fillRef.current;
    const arrow = arrowRef.current;
    if (!btn) return;

    const prefersReduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReduced) return;

    let arrowLoop: gsap.core.Timeline | null = null;

    const handleMouseEnter = () => {
      if (fill) {
        gsap.to(fill, {
          scale: 12,
          duration: 0.55,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      if (arrow) {
        gsap.set(arrow, { transformOrigin: 'center center' });
        if (arrowLoop) arrowLoop.kill();

        arrowLoop = gsap.timeline({ repeat: -1, repeatDelay: 0.25 });
        arrowLoop
          .to(arrow, {
            rotation: -28,
            duration: 0.22,
            ease: 'power2.out',
          })
          .to(arrow, {
            rotation: 0,
            duration: 0.4,
            ease: 'back.out(2.5)',
          });
      }
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = btn.getBoundingClientRect();
      const currentX = (gsap.getProperty(btn, 'x') as number) || 0;
      const currentY = (gsap.getProperty(btn, 'y') as number) || 0;

      const originCenterX = rect.left - currentX + rect.width / 2;
      const originCenterY = rect.top - currentY + rect.height / 2;

      const deltaX = e.clientX - originCenterX;
      const deltaY = e.clientY - originCenterY;

      gsap.to(btn, {
        x: deltaX * 0.32,
        y: deltaY * 0.32,
        duration: 0.3,
        ease: 'power2.out',
        overwrite: 'auto',
      });
    };

    const handleMouseLeave = () => {
      if (fill) {
        gsap.to(fill, {
          scale: 0,
          duration: 0.4,
          ease: 'power2.inOut',
          overwrite: 'auto',
        });
      }

      if (arrowLoop) arrowLoop.kill();
      if (arrow) {
        gsap.to(arrow, {
          rotation: 0,
          duration: 0.3,
          ease: 'power2.out',
          overwrite: 'auto',
        });
      }

      gsap.to(btn, {
        x: 0,
        y: 0,
        duration: 0.7,
        ease: 'elastic.out(1.1, 0.4)',
        overwrite: 'auto',
      });
    };

    btn.addEventListener('mouseenter', handleMouseEnter);
    btn.addEventListener('mousemove', handleMouseMove);
    btn.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      btn.removeEventListener('mouseenter', handleMouseEnter);
      btn.removeEventListener('mousemove', handleMouseMove);
      btn.removeEventListener('mouseleave', handleMouseLeave);
      if (arrowLoop) arrowLoop.kill();
    };
  }, []);

  const themeClasses = {
    black: 'bg-[#000000] text-white border border-[#000000]',
    orange: 'bg-[#FF5400] text-white border border-[#FF5400]',
    cream: 'bg-[#FDF8F5] text-[#000000] border border-[#DAD1CC]',
  };

  const badgeBg = {
    black: 'bg-[#FF5400] text-white',
    orange: 'bg-[#000000] text-white',
    cream: 'bg-[#000000] text-white',
  };

  const fillBg = {
    black: 'bg-[#1F1F1F]',
    orange: 'bg-[#EB4D00]',
    cream: 'bg-[#F3EEEB]',
  };

  const baseClasses = `relative inline-flex items-center justify-between gap-3 sm:gap-4 pl-5 sm:pl-6 pr-1.5 sm:pr-2 py-1.5 sm:py-2 rounded-full font-mono text-[13px] sm:text-[14px] font-bold tracking-[0.04em] uppercase overflow-hidden cursor-pointer select-none transition-shadow duration-300 will-change-transform shadow-sm hover:shadow-md ${themeClasses[variant]} ${className}`;

  const innerContent = (
    <>
      {/* Background Expand Fill Layer */}
      <span
        ref={fillRef}
        aria-hidden="true"
        className={`pointer-events-none absolute left-1/2 top-1/2 w-6 h-6 -ml-3 -mt-3 rounded-full scale-0 will-change-transform ${fillBg[variant]}`}
      />

      {/* Button Text */}
      <span className="relative z-10 whitespace-nowrap">{children}</span>

      {/* Circular Arrow Badge */}
      <span
        ref={arrowRef}
        aria-hidden="true"
        className={`relative z-10 w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center shrink-0 will-change-transform ${badgeBg[variant]}`}
      >
        <ArrowUpRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[2.5]" />
      </span>
    </>
  );

  if (destination) {
    if (destination.startsWith('http') || destination.startsWith('mailto:') || destination.startsWith('tel:')) {
      return (
        <a
          ref={btnRef as React.Ref<HTMLAnchorElement>}
          href={destination}
          onClick={onClick}
          className={baseClasses}
          target="_blank"
          rel="noopener noreferrer"
        >
          {innerContent}
        </a>
      );
    }

    return (
      <Link
        ref={btnRef as React.Ref<HTMLAnchorElement>}
        href={destination}
        onClick={onClick}
        className={baseClasses}
      >
        {innerContent}
      </Link>
    );
  }

  return (
    <button
      ref={btnRef as React.Ref<HTMLButtonElement>}
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`${baseClasses} ${disabled ? 'opacity-60 pointer-events-none' : ''}`}
    >
      {innerContent}
    </button>
  );
};

export default Two26Button;
