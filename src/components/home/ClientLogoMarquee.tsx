'use client';

import React, { useRef, useEffect, useState, useCallback } from 'react';
import { motion, useReducedMotion } from 'motion/react';

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

// Matches original 0.9px/frame @ 60fps = 54px/sec drift speed
const SPEED_PX_PER_SEC = 54;

/**
 * Compositor-Driven Enterprise Partners Marquee
 * - Runs auto-drift via Web Animations API (0ms main-thread JS frames when scrolling/viewing)
 * - No CSS mask-image or per-item drop-shadow filter passes that stall GPU compositing
 * - Seamless pointer drag & inertia handoff
 */
export const ClientLogoMarquee: React.FC = () => {
  const trackRef = useRef<HTMLDivElement>(null);
  const set1Ref = useRef<HTMLDivElement>(null);

  const [isDragging, setIsDragging] = useState(false);
  const prefersReduced = useReducedMotion();

  const waapiRef = useRef<Animation | null>(null);
  const setWidthRef = useRef(0);
  const currentXRef = useRef(0);
  const isHoveredRef = useRef(false);
  const isDraggingRef = useRef(false);
  const dragStartXRef = useRef(0);
  const dragStartPosRef = useRef(0);
  const lastMouseXRef = useRef(0);
  const velocityRef = useRef(0);
  const inertiaRafRef = useRef<number | null>(null);

  const normalizeX = (x: number, setWidth: number) => {
    if (setWidth <= 0) return x;
    let wrapped = x % setWidth;
    if (wrapped > 0) wrapped -= setWidth;
    return wrapped;
  };

  const stopWaapi = useCallback(() => {
    if (waapiRef.current) {
      waapiRef.current.cancel();
      waapiRef.current = null;
    }
  }, []);

  const stopInertia = useCallback(() => {
    if (inertiaRafRef.current !== null) {
      cancelAnimationFrame(inertiaRafRef.current);
      inertiaRafRef.current = null;
    }
  }, []);

  const startWaapiFrom = useCallback(
    (offsetX: number) => {
      const track = trackRef.current;
      const setWidth = setWidthRef.current;
      if (!track || setWidth <= 0 || prefersReduced) return;

      stopWaapi();
      track.style.transform = '';

      const wrappedX = normalizeX(offsetX, setWidth);
      currentXRef.current = wrappedX;

      const durationMs = (setWidth / SPEED_PX_PER_SEC) * 1000;
      const anim = track.animate(
        [
          { transform: 'translate3d(0px, 0, 0)' },
          { transform: `translate3d(-${setWidth}px, 0, 0)` },
        ],
        {
          duration: durationMs,
          iterations: Infinity,
          easing: 'linear',
        }
      );

      anim.currentTime = (-wrappedX / setWidth) * durationMs;
      if (isHoveredRef.current) {
        anim.pause();
      }
      waapiRef.current = anim;
    },
    [prefersReduced, stopWaapi]
  );

  const readCurrentX = (): number => {
    const track = trackRef.current;
    if (!track) return currentXRef.current;
    try {
      const matrix = new DOMMatrix(getComputedStyle(track).transform);
      return normalizeX(matrix.m41, setWidthRef.current);
    } catch {
      return currentXRef.current;
    }
  };

  useEffect(() => {
    const measureAndStart = () => {
      if (!set1Ref.current) return;
      const w = set1Ref.current.offsetWidth;
      if (w > 0 && w !== setWidthRef.current) {
        setWidthRef.current = w;
        if (!isDraggingRef.current && inertiaRafRef.current === null) {
          startWaapiFrom(currentXRef.current);
        }
      }
    };

    measureAndStart();
    if (document.fonts) {
      document.fonts.ready.then(measureAndStart);
    }

    const ro =
      typeof ResizeObserver !== 'undefined' && set1Ref.current
        ? new ResizeObserver(measureAndStart)
        : null;
    if (ro && set1Ref.current) ro.observe(set1Ref.current);

    return () => {
      ro?.disconnect();
      stopInertia();
      stopWaapi();
    };
  }, [startWaapiFrom, stopInertia, stopWaapi]);

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (e.button !== 0) return;

    stopInertia();
    const liveX = waapiRef.current ? readCurrentX() : currentXRef.current;
    stopWaapi();

    currentXRef.current = liveX;
    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${liveX}px, 0, 0)`;
    }

    isDraggingRef.current = true;
    setIsDragging(true);
    dragStartXRef.current = e.clientX;
    dragStartPosRef.current = liveX;
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
    const frameDelta = e.clientX - lastMouseXRef.current;
    velocityRef.current = frameDelta * 0.85;
    lastMouseXRef.current = e.clientX;

    const wrapped = normalizeX(dragStartPosRef.current + deltaX, setWidthRef.current);
    currentXRef.current = wrapped;

    if (trackRef.current) {
      trackRef.current.style.transform = `translate3d(${wrapped}px, 0, 0)`;
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

    // Brief inertia deceleration on RAF only until velocity decays, then hand back to GPU WAAPI
    if (Math.abs(velocityRef.current) > 0.25) {
      let lastTime = performance.now();
      const glide = (now: number) => {
        const delta = Math.min((now - lastTime) / 16.666, 2.5);
        lastTime = now;

        currentXRef.current = normalizeX(
          currentXRef.current + velocityRef.current * delta,
          setWidthRef.current
        );
        velocityRef.current *= Math.pow(0.92, delta);

        if (trackRef.current) {
          trackRef.current.style.transform = `translate3d(${currentXRef.current}px, 0, 0)`;
        }

        if (Math.abs(velocityRef.current) > 0.1) {
          inertiaRafRef.current = requestAnimationFrame(glide);
        } else {
          inertiaRafRef.current = null;
          startWaapiFrom(currentXRef.current);
        }
      };
      inertiaRafRef.current = requestAnimationFrame(glide);
    } else {
      startWaapiFrom(currentXRef.current);
    }
  };

  const renderPartnerLockup = (partner: Partner, keySuffix: string) => (
    <div key={`${partner.id}-${keySuffix}`} className="flex items-center gap-6 sm:gap-8 md:gap-9 shrink-0">
      <div className="group relative flex items-center gap-3 sm:gap-3.5 select-none py-1.5 px-1 cursor-grab active:cursor-grabbing">
        {/* Authentic SVG Logo (no CSS blur filter during motion) */}
        <div className="w-7 h-7 sm:w-8 sm:h-8 flex items-center justify-center shrink-0 transition-transform duration-200 group-hover:scale-110">
          {partner.renderLogo()}
        </div>

        {/* Identity & Technical Category */}
        <div className="flex flex-col min-w-0">
          <div className="flex items-center gap-2">
            <span className="font-display font-extrabold text-[14.5px] sm:text-[16px] text-white tracking-tight whitespace-nowrap leading-none transition-colors group-hover:text-[#0A0A0B] [text-shadow:0_1px_2px_rgba(0,0,0,0.2)]">
              {partner.name}
            </span>
            <span className="font-mono text-[8px] sm:text-[8.5px] font-bold text-[#0A0A0B]/85 group-hover:text-[#0A0A0B] tracking-[0.14em] uppercase px-1.5 py-0.5 rounded border border-black/15 bg-black/10 group-hover:bg-black/20 transition-colors leading-none">
              {partner.tier}
            </span>
          </div>

          <span className="font-mono text-[9px] sm:text-[9.5px] font-bold text-[#0A0A0B] tracking-[0.16em] uppercase whitespace-nowrap mt-1 leading-none">
            {partner.category}
          </span>
        </div>
      </div>

      {/* Modern Hairline Divider */}
      <div className="h-5 w-[1px] bg-gradient-to-b from-transparent via-black/20 to-transparent shrink-0" aria-hidden="true" />
    </div>
  );

  return (
    <section
      aria-label="Trusted by and infrastructure partners"
      className="relative py-3 sm:py-4 bg-[#FC6603] border-y border-black/10 overflow-hidden select-none [contain:layout_style_paint]"
    >
      <div
        onMouseEnter={() => {
          isHoveredRef.current = true;
          waapiRef.current?.pause();
        }}
        onMouseLeave={() => {
          isHoveredRef.current = false;
          if (!isDraggingRef.current && inertiaRafRef.current === null && !prefersReduced) {
            waapiRef.current?.play();
          }
        }}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
        onPointerUp={handlePointerUp}
        onPointerCancel={handlePointerUp}
        className={`relative w-full overflow-hidden flex items-center touch-pan-y ${
          isDragging ? 'cursor-grabbing' : 'cursor-grab'
        }`}
      >
        {/* Lightweight Edge Fade Overlays (replaces GPU-heavy CSS mask-image) */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 left-0 w-[8%] z-10 bg-gradient-to-r from-[#FC6603] to-transparent"
        />
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-y-0 right-0 w-[8%] z-10 bg-gradient-to-l from-[#FC6603] to-transparent"
        />

        {/* Compositor-Accelerated Stream (2 sets: ~5,000px total) */}
        <motion.div
          ref={trackRef}
          initial={{ opacity: 0, y: 14 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.2 }}
          transition={{ duration: 0.75, ease: [0.16, 1, 0.3, 1] }}
          className="flex shrink-0 items-center will-change-transform py-1"
        >
          <div ref={set1Ref} className="flex shrink-0 items-center gap-6 sm:gap-8 md:gap-9 pr-6 sm:pr-8 md:pr-9">
            {PARTNER_LIST.map((partner) => renderPartnerLockup(partner, 's1'))}
          </div>

          <div className="flex shrink-0 items-center gap-6 sm:gap-8 md:gap-9 pr-6 sm:pr-8 md:pr-9" aria-hidden="true">
            {PARTNER_LIST.map((partner) => renderPartnerLockup(partner, 's2'))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default ClientLogoMarquee;
