import React, { useState } from 'react';
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
    category: 'PREMIER // SEARCH & ADS',
    tier: 'PREMIER',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
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
    category: 'MEDIA PARTNER & CAPI',
    tier: 'BADGED',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#0081FB]" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 stroke-white fill-none stroke-[1.5]" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#635BFF]" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#FF7A59]" aria-hidden="true">
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
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path fill="#F38020" d="M18.4 10.3c-.4-.7-.9-1.3-1.6-1.7-.8-.5-1.7-.7-2.6-.7-.9 0-1.8.3-2.6.8-.7.5-1.3 1.1-1.6 1.9-.5-.2-1-.3-1.5-.3-1.1 0-2.2.5-3 1.3-.7.8-1.1 1.9-1.1 3 0 .2 0 .4.1.7-1.1.2-2.1.9-2.7 1.9-.6 1-.7 2.2-.4 3.3.3 1.1 1.1 2 2.1 2.5.7.3 1.4.4 2.2.4h14.1c1.2 0 2.4-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.8-1.1-3.4-2.7-4.1-.2-1.7-1.3-3.2-3-4.1z" />
        <path fill="#FAAE40" d="M19.9 14.5c-.2-.1-.4-.2-.6-.2h-.9c-.2 0-.3.1-.3.3 0 .4.1.8.1 1.2 0 1.5-.6 2.9-1.7 3.9-.2.2-.2.4 0 .6l.6.6c.1.1.3.1.4 0 1.4-1.3 2.2-3.1 2.2-5 0-.5-.1-1-.3-1.4 0 0-.1 0-.1 0z" />
      </svg>
    ),
  },
];

/**
 * ULTRA-MODERN TRUSTED PARTNERS MARQUEE
 * 
 * Perfect Card Layout:
 * - 100% unified height (h-[76px]) across all cards (zero height jump or layout shift)
 * - Authentic vector brand logos in glassmorphic monogram tiles
 * - Single-line bold partner names with monospace category descriptors
 * - Live status badges & telemetry signal meters
 * - Ultra-clean, enterprise-grade header matching AlphaLinkx design language
 */
export const ClientLogoMarquee: React.FC = () => {
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  // Individual Partner Card with guaranteed identical height and proportions
  const renderCard = (partner: Partner, keySuffix: string) => (
    <div
      key={`${partner.id}-${keySuffix}`}
      className="group relative flex items-center justify-between gap-3 px-4 sm:px-5 h-[76px] w-[280px] sm:w-[300px] shrink-0 rounded-2xl bg-[#111114]/75 hover:bg-[#141620]/95 border border-white/[0.08] hover:border-[#FC6603]/50 transition-all duration-300 backdrop-blur-xl cursor-pointer hover:shadow-[0_0_24px_rgba(252,102,3,0.15)] hover:-translate-y-0.5 overflow-hidden"
    >
      {/* Top Hairline Neon Accent on Hover */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
      />

      {/* Left: Authentic Brand SVG Monogram Tile */}
      <div className="flex items-center gap-3 min-w-0">
        <div className="w-10 h-10 rounded-xl bg-white/[0.04] border border-white/10 group-hover:border-[#FC6603]/40 group-hover:bg-[#FC6603]/10 flex items-center justify-center p-2 transition-all duration-300 shrink-0 shadow-inner">
          {partner.renderLogo()}
        </div>

        {/* Center: Partner Name & Category (Single line guaranteed, zero wrap) */}
        <div className="flex flex-col min-w-0">
          <span className="font-display font-bold text-[15px] sm:text-[16px] text-white tracking-[-0.01em] group-hover:text-white transition-colors truncate leading-tight">
            {partner.name}
          </span>
          <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#FC6603] tracking-[0.14em] uppercase truncate mt-0.5">
            {partner.category}
          </span>
        </div>
      </div>

      {/* Right: Tier Badge & 4-Bar Signal Indicator */}
      <div className="flex flex-col items-end gap-1.5 shrink-0 pl-1">
        <span className="font-mono text-[9px] font-bold text-white/50 group-hover:text-white/80 tracking-[0.14em] uppercase px-2 py-0.5 rounded-md bg-white/[0.03] border border-white/[0.08]">
          {partner.tier}
        </span>

        {/* 4-bar direct connection indicator */}
        <div className="flex items-end gap-[2px] h-2.5" aria-hidden="true" title="Direct Pipeline: Active">
          <div className="w-[2px] h-1 bg-[#FC6603] rounded-full" />
          <div className="w-[2px] h-1.5 bg-[#FC6603] rounded-full" />
          <div className="w-[2px] h-2 bg-[#FC6603] rounded-full" />
          <div className="w-[2px] h-2.5 bg-[#FC6603] rounded-full" />
        </div>
      </div>
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

      {/* ================= CLEAN ENTERPRISE HEADER HUD ================= */}
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 mb-8 flex items-center justify-between font-mono text-[11px] sm:text-[12px] font-medium tracking-[0.18em] uppercase">
        <div className="flex items-center gap-2 text-white/70">
          <span className="text-[#FC6603] font-bold">//</span>
          <span className="text-[#A1A1AA]">TRUSTED BY & INFRASTRUCTURE PARTNERS</span>
        </div>

        {/* Right Status Pill with Live Signal Pulse */}
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] text-white/60">
            <span className="w-2 h-2 rounded-full bg-[#FC6603] animate-pulse" />
            <span className="hidden sm:inline">[ CERTIFIED & INTEGRATED ]</span>
            <span className="sm:hidden">[ CERTIFIED ]</span>
          </div>

          {/* Quick Pause / Resume Button */}
          <button
            type="button"
            onClick={() => setIsPaused((prev) => !prev)}
            aria-label={isPaused ? 'Resume partner carousel' : 'Pause partner carousel'}
            className="px-2.5 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#FC6603]/40 text-white/60 hover:text-white transition-all flex items-center gap-1 cursor-pointer"
          >
            {isPaused ? (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-[#FC6603]">
                <polygon points="5 3 19 12 5 21 5 3" />
              </svg>
            ) : (
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-2.5 h-2.5 text-white/60">
                <rect x="6" y="4" width="4" height="16" />
                <rect x="14" y="4" width="4" height="16" />
              </svg>
            )}
            <span className="text-[10px] hidden md:inline">{isPaused ? 'RESUME' : 'PAUSE'}</span>
          </button>
        </div>
      </div>

      {/* ================= SEAMLESS INFINITE MARQUEE TRACK ================= */}
      <div
        className="relative w-full overflow-hidden flex items-center group/marquee [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Track 1 (Primary Flow) */}
        <div
          className={`flex shrink-0 items-center gap-4 sm:gap-5 md:gap-6 py-1 will-change-transform ${
            prefersReduced
              ? ''
              : isPaused
              ? 'animate-none'
              : 'animate-[marquee_36s_linear_infinite] group-hover/marquee:[animation-play-state:paused]'
          }`}
        >
          {PARTNER_LIST.map((partner) => renderCard(partner, 't1'))}
        </div>

        {/* Track 2 (Duplicate for Continuous Seamless Loop) */}
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center gap-4 sm:gap-5 md:gap-6 py-1 pl-4 sm:pl-5 md:pl-6 will-change-transform ${
            prefersReduced
              ? 'hidden'
              : isPaused
              ? 'animate-none'
              : 'animate-[marquee_36s_linear_infinite] group-hover/marquee:[animation-play-state:paused]'
          }`}
        >
          {PARTNER_LIST.map((partner) => renderCard(partner, 't2'))}
        </div>
      </div>
    </section>
  );
};

export default ClientLogoMarquee;