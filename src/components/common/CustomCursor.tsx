import React, { useEffect, useRef, useState } from 'react';

export const CustomCursor: React.FC = () => {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLDivElement>(null);
  const [cursorText, setCursorText] = useState<string>('');
  const [isHovered, setIsHovered] = useState<boolean>(false);
  const [isVisible, setIsVisible] = useState<boolean>(false);

  useEffect(() => {
    // Disable on touch devices or reduced motion
    const isTouch = window.matchMedia('(pointer: coarse)').matches;
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (isTouch || prefersReducedMotion) return;

    let mouseX = -100;
    let mouseY = -100;
    let ringX = -100;
    let ringY = -100;
    let isRunning = true;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      if (!isVisible) setIsVisible(true);

      // Check for cursor text triggers
      const target = e.target as HTMLElement | null;
      const cursorTarget = target?.closest('[data-cursor]') as HTMLElement | null;
      if (cursorTarget) {
        const text = cursorTarget.getAttribute('data-cursor') || '';
        setCursorText(text);
        setIsHovered(true);
      } else {
        const isClickable = target?.closest('a, button, input, [role="button"]');
        setCursorText('');
        setIsHovered(Boolean(isClickable));
      }
    };

    const onMouseLeave = () => {
      setIsVisible(false);
    };

    window.addEventListener('mousemove', onMouseMove, { passive: true });
    document.addEventListener('mouseleave', onMouseLeave);

    // RAF loop for smooth lerping
    const render = () => {
      if (!isRunning) return;

      if (dotRef.current) {
        dotRef.current.style.transform = `translate3d(${mouseX}px, ${mouseY}px, 0)`;
      }

      // Lerp for trailing ring
      ringX += (mouseX - ringX) * 0.18;
      ringY += (mouseY - ringY) * 0.18;

      if (ringRef.current) {
        ringRef.current.style.transform = `translate3d(${ringX}px, ${ringY}px, 0)`;
      }

      requestAnimationFrame(render);
    };

    const reqId = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      cancelAnimationFrame(reqId);
      window.removeEventListener('mousemove', onMouseMove);
      document.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [isVisible]);

  const isTouch = typeof window !== 'undefined' && window.matchMedia('(pointer: coarse)').matches;
  if (isTouch) return null;

  return (
    <div
      aria-hidden="true"
      className={`pointer-events-none fixed inset-0 z-[100] transition-opacity duration-300 ${
        isVisible ? 'opacity-100' : 'opacity-0'
      }`}
    >
      {/* Precision center dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 w-2 h-2 -ml-1 -mt-1 rounded-full bg-[#FF5A1F] mix-blend-difference pointer-events-none transition-transform will-change-transform z-10"
      />

      {/* Trailing reactive ring */}
      <div
        ref={ringRef}
        className={`fixed top-0 left-0 rounded-full border border-[#FF5A1F]/60 flex items-center justify-center pointer-events-none will-change-transform transition-[width,height,margin,background-color] duration-200 ease-out ${
          cursorText
            ? 'w-20 h-20 -ml-10 -mt-10 bg-[#FF5A1F]/20 backdrop-blur-sm border-[#FF5A1F]'
            : isHovered
            ? 'w-12 h-12 -ml-6 -mt-6 bg-[#FF5A1F]/10 border-[#FF5A1F]'
            : 'w-8 h-8 -ml-4 -mt-4 bg-transparent'
        }`}
      >
        {cursorText && (
          <span
            ref={labelRef}
            className="text-[10px] font-mono font-bold tracking-widest text-white uppercase select-none"
          >
            {cursorText}
          </span>
        )}
      </div>
    </div>
  );
};
