'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { usePathname } from 'next/navigation';
import Lenis from 'lenis';
import { Navbar } from './Navbar';
import { Footer } from './Footer';
import { CustomCursor } from '../common/CustomCursor';
import { Preloader } from '../common/Preloader';
import { GrainOverlay } from '../common/GrainOverlay';
import { ScrollProgressBar } from '../common/ScrollProgressBar';

function SmoothScrollManager() {
  const pathname = usePathname();

  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    const isTouch = typeof window !== 'undefined' && (window.matchMedia('(pointer: coarse)').matches || 'ontouchstart' in window);
    if (prefersReducedMotion || isTouch) return;

    const lenis = new Lenis({
      duration: 1.1,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 0,
      syncTouch: false,
    });

    (window as any).lenis = lenis;

    let rafId: number | null = null;
    function raf(time: number) {
      if (document.hidden) {
        rafId = null;
        return;
      }
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    }
    rafId = requestAnimationFrame(raf);

    const handleVisibilityChange = () => {
      if (!document.hidden && rafId === null) {
        rafId = requestAnimationFrame(raf);
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);

    // Global anchor click interceptor for smooth scrolling to sections
    const handleAnchorClick = (e: MouseEvent) => {
      const target = (e.target as HTMLElement).closest('a');
      if (!target) return;

      const href = target.getAttribute('href');
      if (!href) return;

      const isHash = href.startsWith('#') && href.length > 1;
      const isHomeHash = href.startsWith('/#') && (window.location.pathname === '/' || window.location.pathname === '');

      if (isHash || isHomeHash) {
        const hash = isHash ? href : href.slice(1);
        try {
          const element = document.querySelector(hash) as HTMLElement | null;
          if (element) {
            e.preventDefault();
            lenis.scrollTo(element, {
              offset: -75,
              duration: 1.3,
              easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
            history.pushState(null, '', hash);
          }
        } catch {
          // Ignore invalid selector strings
        }
      }
    };

    document.addEventListener('click', handleAnchorClick, { capture: true });

    return () => {
      document.removeEventListener('click', handleAnchorClick, { capture: true });
      document.removeEventListener('visibilitychange', handleVisibilityChange);
      if (rafId !== null) cancelAnimationFrame(rafId);
      lenis.destroy();
      delete (window as any).lenis;
    };
  }, []);

  // Sync scroll on route change
  useEffect(() => {
    if (typeof window !== 'undefined' && window.location.hash) {
      try {
        const element = document.querySelector(window.location.hash) as HTMLElement | null;
        if (element) {
          const timer = setTimeout(() => {
            (window as any).lenis?.scrollTo(element, {
              offset: -75,
              duration: 1.2,
              easing: (t: number) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            });
          }, 120);
          return () => clearTimeout(timer);
        }
      } catch {
        // Ignore invalid hash
      }
    }
    (window as any).lenis?.scrollTo(0, { immediate: true });
  }, [pathname]);

  return null;
}

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <>
      {mounted && (
        <>
          {/* Smooth momentum scrolling manager */}
          <SmoothScrollManager />

          {/* 01. Terminal Preloader with Curtain Split */}
          <Preloader />

          {/* 02. Subtle Film-Grain Noise Overlay */}
          <GrainOverlay />

          {/* 03. Thin Orange Top Scroll Progress Line */}
          <ScrollProgressBar />

          {/* 04. Custom Cursor with Lerp Ring and Context Labels */}
          <CustomCursor />
        </>
      )}

      <div className="flex flex-col min-h-screen bg-[#0A0A0B] text-[#F5F5F4] antialiased selection:bg-[#FF5A1F] selection:text-black">
        <Navbar />

        <div className="flex-1 flex flex-col">
          <Suspense fallback={null}>{children}</Suspense>
        </div>

        <Footer />
      </div>
    </>
  );
}
