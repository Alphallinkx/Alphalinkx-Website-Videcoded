import React, { useEffect, useRef, useState } from 'react';

interface CapabilityItem {
  id: string;
  title: string;
  href: string;
}

const PRIMARY_CAPABILITIES: CapabilityItem[] = [
  { id: '01', title: 'WEB ARCHITECTURE', href: '/services/website-development' },
  { id: '02', title: 'TECHNICAL SEO & AEO', href: '/services/seo' },
  { id: '03', title: 'GENERATIVE ENGINE (GEO)', href: '/services/seo' },
  { id: '04', title: 'PAID SOCIAL & SCALE', href: '/services/digital-marketing' },
  { id: '05', title: 'GOOGLE ADS SUPREMACY', href: '/services/digital-marketing' },
  { id: '06', title: 'FULL-STACK APP DEV', href: '/services/app-development' },
  { id: '07', title: 'BRAND SYSTEMS & DESIGN', href: '/services/graphic-designing' },
  { id: '08', title: 'AUTONOMOUS AI AGENTS', href: '/services/ai-development' },
  { id: '09', title: 'LOCAL GMB DOMINANCE', href: '/services/seo' },
  { id: '10', title: 'CONVERSION ARCHITECTURE', href: '/services/digital-marketing' },
];

export const ServicesTicker: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);

  const currentXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(0);
  const lastMouseXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const setWidthRef = useRef<number>(0);

  const baseSpeed = 0.95; // auto-scroll drift speed

  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const measureWidth = () => {
      if (set1Ref.current) {
        setWidthRef.current = set1Ref.current.offsetWidth;
      }
    };

    measureWidth();
    // Wait for fonts to ensure exact pixel measurement
    if (document.fonts) {
      document.fonts.ready.then(measureWidth);
    }

    window.addEventListener('resize', measureWidth);

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.5);
      lastTime = time;

      const setWidth = setWidthRef.current;

      if (!isDraggingRef.current) {
        // If momentum velocity exists, decelerate smoothly
        if (Math.abs(velocityRef.current) > 0.05) {
          currentXRef.current += velocityRef.current * delta;
          velocityRef.current *= Math.pow(0.92, delta);
        } else {
          velocityRef.current = 0;
          // Normal auto-scroll when not hovered and not dragging
          if (!isHoveredRef.current) {
            currentXRef.current -= baseSpeed * delta;
          }
        }
      }

      // Seamless infinite wrap in both directions
      if (setWidth > 0) {
        while (currentXRef.current <= -setWidth) {
          currentXRef.current += setWidth;
          dragStartPosRef.current += setWidth;
        }
        while (currentXRef.current > 0) {
          currentXRef.current -= setWidth;
          dragStartPosRef.current -= setWidth;
        }
      }

      if (trackRef.current) {
        trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
      }

      animId = requestAnimationFrame(loop);
    };

    animId = requestAnimationFrame(loop);

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', measureWidth);
    };
  }, []);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return; // Only respond to primary click / touch

    isDraggingRef.current = true;
    setIsDragging(true);
    hasMovedRef.current = false;
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = currentXRef.current;
    lastMouseXRef.current = e.clientX;
    velocityRef.current = 0;

    try {
      (e.currentTarget as HTMLElement).setPointerCapture(e.pointerId);
    } catch {
      // safely fallback
    }
  };

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    const deltaX = e.clientX - dragStartXRef.current;
    if (Math.abs(deltaX) > 4) {
      hasMovedRef.current = true;
    }

    // Capture velocity for fluid release flick
    const frameDelta = e.clientX - lastMouseXRef.current;
    velocityRef.current = frameDelta * 0.85;
    lastMouseXRef.current = e.clientX;

    currentXRef.current = dragStartPosRef.current + deltaX;

    const setWidth = setWidthRef.current;
    if (setWidth > 0) {
      while (currentXRef.current <= -setWidth) {
        currentXRef.current += setWidth;
        dragStartPosRef.current += setWidth;
      }
      while (currentXRef.current > 0) {
        currentXRef.current -= setWidth;
        dragStartPosRef.current -= setWidth;
      }
    }

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
    }
  };

  const handlePointerUp = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return;

    isDraggingRef.current = false;
    setIsDragging(false);

    try {
      (e.currentTarget as HTMLElement).releasePointerCapture(e.pointerId);
    } catch {
      // safely fallback
    }
  };

  const handlePointerCancel = (e: React.PointerEvent<HTMLDivElement>) => {
    handlePointerUp(e);
  };

  const handleMouseEnter = () => {
    isHoveredRef.current = true;
  };

  const handleMouseLeave = () => {
    isHoveredRef.current = false;
    if (isDraggingRef.current) {
      isDraggingRef.current = false;
      setIsDragging(false);
    }
  };

  const handleLinkClick = (e: React.MouseEvent) => {
    if (hasMovedRef.current) {
      e.preventDefault();
      e.stopPropagation();
    }
  };

  const renderCapabilitySet = (prefix: string, isFirst = false) => (
    <div
      ref={isFirst ? set1Ref : undefined}
      className="flex shrink-0 items-center"
      aria-hidden={!isFirst}
    >
      {PRIMARY_CAPABILITIES.map((item) => (
        <React.Fragment key={`${prefix}-${item.id}`}>
          <a
            href={item.href}
            onClick={handleLinkClick}
            draggable={false}
            tabIndex={isFirst ? 0 : -1}
            className="group/item inline-flex items-center gap-2.5 sm:gap-3 text-[22px] sm:text-[25px] font-display font-extrabold uppercase tracking-[-0.01em] text-white hover:text-[#FC6603] transition-all duration-200 select-none"
          >
            <span className="font-mono text-[12px] sm:text-[13px] font-semibold text-[#FC6603] px-2 py-0.5 rounded border border-[#FC6603]/35 bg-[#FC6603]/10 tracking-[0.08em] group-hover/item:bg-[#FC6603] group-hover/item:text-black transition-colors duration-200 pointer-events-none">
              {item.id}
            </span>
            <span className="whitespace-nowrap transition-colors pointer-events-none">
              {item.title}
            </span>
          </a>
          <span
            aria-hidden="true"
            className="inline-flex items-center mx-5 sm:mx-8 text-[#FC6603] font-mono font-bold text-[18px] sm:text-[21px] tracking-[0.18em] select-none opacity-85 pointer-events-none"
          >
            //
          </span>
        </React.Fragment>
      ))}
    </div>
  );

  return (
    <section
      ref={containerRef}
      aria-label="Interactive Capabilities Ticker"
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
      onPointerCancel={handlePointerCancel}
      className={`relative py-[20px] bg-[#07080C] border-y border-white/[0.08] overflow-hidden select-none touch-pan-y ${
        isDragging ? 'cursor-grabbing' : 'cursor-grab'
      }`}
    >
      {/* Top Ambient Glow Line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/40 to-transparent pointer-events-none" />

      {/* Central Ambient Radial Glow */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_60%_100%_at_50%_50%,rgba(252,102,3,0.05),transparent_75%)] pointer-events-none" />

      {/* Scrolling Track Container with Smooth Edge Gradient Masks */}
      <div className="relative w-full overflow-hidden [mask-image:linear-gradient(to_right,transparent_0%,black_6%,black_94%,transparent_100%)] pointer-events-none">
        <div
          ref={trackRef}
          className="flex w-max will-change-transform pointer-events-auto"
        >
          {renderCapabilitySet('set1', true)}
          {renderCapabilitySet('set2')}
          {renderCapabilitySet('set3')}
        </div>
      </div>

      {/* Bottom Ambient Line */}
      <div className="absolute bottom-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-white/[0.08] to-transparent pointer-events-none" />
    </section>
  );
};

export default ServicesTicker;
