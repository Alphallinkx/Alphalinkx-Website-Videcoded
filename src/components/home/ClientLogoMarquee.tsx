import React, { useRef, useEffect, useState } from 'react';
import { useReducedMotion } from 'motion/react';

interface Partner {
  id: string;
  name: string;
  category: string;
  tier: string;
  renderLogo: () => React.ReactNode;
}

const PARTNER_LIST: Partner[] = [
  {
    id: 'google-partner',
    name: 'Google',
    category: 'PREMIER SEARCH & ADS',
    tier: 'PREMIER',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden="true">
        <path fill="#4285F4" d="M23.745 12.27c0-.7-.06-1.4-.19-2.07H12v4.51h6.6c-.29 1.52-1.14 2.8-2.4 3.66v3.05h3.88c2.27-2.09 3.665-5.18 3.665-9.15z" />
        <path fill="#34A853" d="M12 24c3.24 0 5.95-1.08 7.93-2.91l-3.88-3.05c-1.08.72-2.45 1.16-4.05 1.16-3.12 0-5.77-2.1-6.72-4.93H1.26v3.15C3.29 21.43 7.37 24 12 24z" />
        <path fill="#FBBC05" d="M5.28 14.27c-.25-.72-.38-1.49-.38-2.27s.13-1.55.38-2.27V6.58H1.26C.46 8.16 0 9.94 0 12s.46 3.84 1.26 5.42l4.02-3.15z" />
        <path fill="#EA4335" d="M12 4.75c1.77 0 3.35.61 4.6 1.8l3.42-3.42C17.95 1.19 15.24 0 12 0 7.37 0 3.29 2.57 1.26 6.58l4.02 3.15c.95-2.83 3.6-4.98 6.72-4.98z" />
      </svg>
    ),
  },
  {
    id: 'meta-business',
    name: 'Meta',
    category: 'MEDIA BUYING & CAPI',
    tier: 'BADGED',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 fill-[#0081FB]" aria-hidden="true">
        <path d="M12 15.35c-1.42 1.63-2.73 2.65-4.18 2.65-2.58 0-4.32-2.14-4.32-5.32 0-3.34 1.83-5.68 4.54-5.68 1.67 0 3.03 1.07 4.26 2.67 1.23-1.6 2.59-2.67 4.26-2.67 2.71 0 4.54 2.34 4.54 5.68 0 3.18-1.74 5.32-4.32 5.32-1.45 0-2.76-1.02-4.18-2.65zm-1.48-1.67C9.37 12.08 8.42 10 7.36 10c-1.32 0-2.16 1.28-2.16 3.08 0 1.77.86 2.92 2.16 2.92.83 0 1.77-.73 3.16-2.32zm2.96 0c1.39 1.59 2.33 2.32 3.16 2.32 1.3 0 2.16-1.15 2.16-2.92 0-1.8-.84-3.08-2.16-3.08-1.06 0-2.01 2.08-3.16 3.68z" />
      </svg>
    ),
  },
  {
    id: 'shopify-plus',
    name: 'Shopify Plus',
    category: 'ENTERPRISE COMMERCE',
    tier: 'PLUS',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden="true">
        <path fill="#96BF48" d="M18.8 6.6c-.1-.3-.3-.4-.5-.4s-.4.1-.7.2l-2.4 1.5-1.5-3.3c-.2-.4-.6-.7-1.1-.7H12c-.2 0-.4.1-.4.3 0 .4.4.9.4 1.3 0 2.1-1.6 3.2-3.1 3.2h-.5L7.2 4.8c-.1-.3-.4-.5-.7-.5h-.9c-.2 0-.3.1-.4.3l-2.5 14c-.1.5.3 1 1 1.1h15.2c.5 0 .9-.4.9-.9l-.9-12.2zm-6.2 3.8c-.8 0-1.5-.7-1.5-1.5 0-.5.2-.9.5-1.2.6-.5 1.5-.3 1.8.4.1.3.1.5.1.8 0 .8-.4 1.5-.9 1.5z" />
      </svg>
    ),
  },
  {
    id: 'vercel-enterprise',
    name: 'Vercel',
    category: 'CLOUD & EDGE RUNTIME',
    tier: 'ENTERPRISE',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 fill-white" aria-hidden="true">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
  {
    id: 'openai-ecosystem',
    name: 'OpenAI',
    category: 'GENERATIVE AI & GEO',
    tier: 'TIER 5',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 stroke-white fill-none stroke-[1.6]" aria-hidden="true">
        <path d="M21.2 10.4a5.2 5.2 0 0 0-.4-3.7 5.4 5.4 0 0 0-4.6-2.7 5.1 5.1 0 0 0-2.3.5 5.3 5.3 0 0 0-4.2-2 5.4 5.4 0 0 0-5.1 3.8 5.2 5.2 0 0 0-2.4 3.7 5.3 5.3 0 0 0 .9 5.3 5.3 5.3 0 0 0 .4 3.7 5.4 5.4 0 0 0 4.6 2.7 5.1 5.1 0 0 0 2.3-.5 5.3 5.3 0 0 0 4.2 2 5.4 5.4 0 0 0 5.1-3.8 5.2 5.2 0 0 0 2.4-3.7 5.3 5.3 0 0 0-.9-5.3z" strokeLinejoin="round" />
        <path d="M12 8.5v7m-3.5-5.5l7 4m-7 0l7-4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js',
    category: 'HIGH-PERFORMANCE WEB',
    tier: 'OFFICIAL',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 fill-white" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.72 17.65L9.67 7.5H8.25v9h1.5v-7.14l7.15 9.38c-.37.33-.76.64-1.18.91zM14.5 7.5h1.5v5.82l-1.5-1.95V7.5z" />
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'REALTIME DATABASE & AUTH',
    tier: 'STACK',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden="true">
        <path fill="#3ECF8E" d="M13.2 23.3c-.6.7-1.7.3-1.8-.6L10.2 13H1.9c-.8 0-1.3-.8-.9-1.5L10.8.7c.6-.7 1.7-.3 1.8.6l1.2 9.7h8.3c.8 0 1.3.8.9 1.5l-9.8 10.8z" />
      </svg>
    ),
  },
  {
    id: 'stripe-verified',
    name: 'Stripe',
    category: 'PAYMENTS & BILLING',
    tier: 'VERIFIED',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 fill-[#635BFF]" aria-hidden="true">
        <path d="M13.976 9.15c0-.98-.79-1.46-2.09-1.46-1.87 0-4.22.68-6.08 1.76V3.82c2.05-.88 4.24-1.32 6.42-1.32 5.09 0 8.65 2.59 8.65 7.08 0 6.94-9.56 5.82-9.56 8.81 0 1.15.98 1.63 2.37 1.63 2.17 0 4.96-.91 6.99-2.08v5.67c-2.3.99-4.81 1.49-7.33 1.49-5.33 0-8.98-2.64-8.98-7.18-.01-7.23 9.61-6.04 9.61-8.77z" />
      </svg>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'CRM & PIPELINE SYNC',
    tier: 'CERTIFIED',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0 fill-[#FF7A59]" aria-hidden="true">
        <path d="M17.4 6.7V4.2c.9-.4 1.5-1.3 1.5-2.3 0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5c0 1 .6 1.9 1.5 2.3v2.5c-1.3.4-2.4 1.2-3.1 2.3L6.3 6.4c.1-.3.2-.6.2-.9 0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3c.5 0 .9-.1 1.3-.3l4.5 2.7c-.5.8-.8 1.8-.8 2.8s.3 2 .8 2.8l-4.5 2.7c-.4-.2-.8-.3-1.3-.3-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.3-.1-.6-.2-.9l6.5-2.6c.7 1.1 1.8 1.9 3.1 2.3v2.5c-.9.4-1.5 1.3-1.5 2.3 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-1-.6-1.9-1.5-2.3v-2.5c2.4-.8 4.1-3 4.1-5.7s-1.7-4.9-4.1-5.7zm-1 8.5c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2z" />
      </svg>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'GLOBAL EDGE DEFENSE',
    tier: 'SECURITY',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-6 h-6 sm:w-7 sm:h-7 shrink-0" aria-hidden="true">
        <path fill="#F38020" d="M18.4 10.3c-.4-.7-.9-1.3-1.6-1.7-.8-.5-1.7-.7-2.6-.7-.9 0-1.8.3-2.6.8-.7.5-1.3 1.1-1.6 1.9-.5-.2-1-.3-1.5-.3-1.1 0-2.2.5-3 1.3-.7.8-1.1 1.9-1.1 3 0 .2 0 .4.1.7-1.1.2-2.1.9-2.7 1.9-.6 1-.7 2.2-.4 3.3.3 1.1 1.1 2 2.1 2.5.7.3 1.4.4 2.2.4h14.1c1.2 0 2.4-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.8-1.1-3.4-2.7-4.1-.2-1.7-1.3-3.2-3-4.1z" />
        <path fill="#FAAE40" d="M19.9 14.5c-.2-.1-.4-.2-.6-.2h-.9c-.2 0-.3.1-.3.3 0 .4.1.8.1 1.2 0 1.5-.6 2.9-1.7 3.9-.2.2-.2.4 0 .6l.6.6c.1.1.3.1.4 0 1.4-1.3 2.2-3.1 2.2-5 0-.5-.1-1-.3-1.4 0 0-.1 0-.1 0z" />
      </svg>
    ),
  },
];

/**
 * CARDLESS MODERN ENTERPRISE PARTNERS MARQUEE
 * 
 * Design Architecture:
 * - 100% Card-Free: Eliminates visual box fatigue on the page.
 * - Floating Organic Lockups: Authentic vector logos + bold typography + technical descriptors.
 * - Luminous Hover Aura: Subtle radial ambient glow behind logos without card borders.
 * - Buttery Smooth Physics: rAnimationFrame momentum drag & drop with zero-jump hover freeze.
 * - Clean Enterprise Header: Minimalist telemetry HUD without distracting pause buttons.
 */
export const ClientLogoMarquee: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  // Animation & Physics Tracking Refs (zero React re-render overhead)
  const currentXRef = useRef<number>(0);
  const isHoveredRef = useRef<boolean>(false);
  const isDraggingRef = useRef<boolean>(false);
  const dragStartXRef = useRef<number>(0);
  const dragStartPosRef = useRef<number>(0);
  const lastMouseXRef = useRef<number>(0);
  const velocityRef = useRef<number>(0);
  const hasMovedRef = useRef<boolean>(false);
  const setWidthRef = useRef<number>(0);

  // Auto-scroll drift speed in pixels per 60fps frame
  const baseSpeed = 0.9;

  // 120 FPS Momentum Physics & Infinite Wrap Loop
  useEffect(() => {
    let animId: number;
    let lastTime = performance.now();

    const measureWidth = () => {
      if (set1Ref.current) {
        setWidthRef.current = set1Ref.current.offsetWidth;
      }
    };

    measureWidth();
    if (document.fonts) {
      document.fonts.ready.then(measureWidth);
    }
    window.addEventListener('resize', measureWidth);

    const loop = (time: number) => {
      const delta = Math.min((time - lastTime) / 16.666, 2.5);
      lastTime = time;

      const setWidth = setWidthRef.current;

      if (!isDraggingRef.current) {
        // Momentum deceleration on release
        if (Math.abs(velocityRef.current) > 0.05) {
          currentXRef.current += velocityRef.current * delta;
          velocityRef.current *= Math.pow(0.92, delta);
        } else {
          velocityRef.current = 0;
          // Normal auto-drift when not hovered and prefersReduced is false
          if (!isHoveredRef.current && !prefersReduced) {
            currentXRef.current -= baseSpeed * delta;
          }
        }
      }

      // Infinite wrap in both directions
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
  }, [prefersReduced]);

  // Pointer Grab Handlers
  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

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
    if (Math.abs(deltaX) > 3) {
      hasMovedRef.current = true;
    }

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

  // Card-Free Floating Partner Lockup
  const renderPartnerLockup = (partner: Partner, keySuffix: string) => (
    <div key={`${partner.id}-${keySuffix}`} className="flex items-center gap-10 sm:gap-14 md:gap-16 shrink-0">
      <div className="group relative flex items-center gap-3 sm:gap-3.5 select-none py-3 px-2 cursor-grab active:cursor-grabbing">
        {/* Subtle Ambient Radial Aura behind Logo on Hover */}
        <div
          aria-hidden="true"
          className="absolute -inset-2 rounded-2xl bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.18)_0%,transparent_70%)] opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />

        {/* Authentic SVG Logo */}
        <div className="relative w-8 h-8 sm:w-9 sm:h-9 flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:scale-110 drop-shadow-[0_2px_10px_rgba(0,0,0,0.5)]">
          {partner.renderLogo()}
        </div>

        {/* Identity & Technical Category */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-[15px] sm:text-[17px] text-white/90 group-hover:text-white transition-colors tracking-tight whitespace-nowrap leading-none">
              {partner.name}
            </span>
            <span className="font-mono text-[8.5px] font-bold text-white/40 group-hover:text-white/80 tracking-[0.14em] uppercase px-1.5 py-0.5 rounded border border-white/[0.08] bg-white/[0.02] transition-colors leading-none">
              {partner.tier}
            </span>
          </div>

          <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#FC6603]/90 group-hover:text-[#FC6603] tracking-[0.16em] uppercase whitespace-nowrap mt-1 leading-none transition-colors">
            {partner.category}
          </span>
        </div>
      </div>

      {/* Modern Hairline Divider */}
      <div className="h-6 w-[1px] bg-gradient-to-b from-transparent via-white/10 to-transparent shrink-0" aria-hidden="true" />
    </div>
  );

  return (
    <section
      aria-label="Trusted by and infrastructure partners"
      className="relative py-12 sm:py-16 bg-[#0A0A0B] border-b border-white/[0.06] overflow-hidden select-none"
    >
      {/* Top Hairline Ambient Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/20 to-transparent pointer-events-none"
      />

      {/* ================= CLEAN ENTERPRISE HEADER (NO PAUSE BUTTON) ================= */}
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 mb-8 sm:mb-10 flex items-center justify-between font-mono text-[11px] sm:text-[12px] font-medium tracking-[0.2em] uppercase">
        <div className="flex items-center gap-2 text-white/70">
          <span className="text-[#FC6603] font-bold">//</span>
          <span className="text-white/80">TRUSTED BY & INFRASTRUCTURE PARTNERS</span>
        </div>

        {/* Status Pill with Pulsing Live Beacon */}
        <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-white/[0.02] border border-white/[0.06] text-white/50 text-[10px] sm:text-[11px] tracking-[0.16em]">
          <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] animate-pulse" />
          <span className="hidden sm:inline">[ CERTIFIED & INTEGRATED ]</span>
          <span className="sm:hidden">[ CERTIFIED ]</span>
        </div>
      </div>

      {/* ================= CARDLESS FLOATING PARTNERS STRIP ================= */}
      <div
        ref={containerRef}
        onMouseEnter={() => {
          isHoveredRef.current = true;
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full overflow-hidden flex items-center [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)] touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Hardware-accelerated GPU Stream */}
        <div
          ref={trackRef}
          className="flex shrink-0 items-center will-change-transform py-2"
        >
          {/* Set 1 (Measured for seamless wrap) */}
          <div ref={set1Ref} className="flex shrink-0 items-center gap-10 sm:gap-14 md:gap-16 pr-10 sm:pr-14 md:pr-16">
            {PARTNER_LIST.map((partner) => renderPartnerLockup(partner, 's1'))}
          </div>

          {/* Set 2 (Duplicate for continuous seamless loop) */}
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 md:gap-16 pr-10 sm:pr-14 md:pr-16" aria-hidden="true">
            {PARTNER_LIST.map((partner) => renderPartnerLockup(partner, 's2'))}
          </div>

          {/* Set 3 (Buffer for ultra-wide displays & backward dragging) */}
          <div className="flex shrink-0 items-center gap-10 sm:gap-14 md:gap-16 pr-10 sm:pr-14 md:pr-16" aria-hidden="true">
            {PARTNER_LIST.map((partner) => renderPartnerLockup(partner, 's3'))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogoMarquee;