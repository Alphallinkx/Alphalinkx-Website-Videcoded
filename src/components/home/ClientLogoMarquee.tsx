import React, { useState } from 'react';
import { motion, useReducedMotion } from 'motion/react';

interface Partner {
  id: string;
  name: string;
  category: 'all' | 'ads' | 'cloud' | 'commerce';
  categoryLabel: string;
  tier: string;
  telemetry: string;
  accentColor: string;
  renderLogo: () => React.ReactNode;
}

const PARTNER_LIST: Partner[] = [
  {
    id: 'google-partner',
    name: 'Google Partner',
    category: 'ads',
    categoryLabel: 'SEARCH & PERFORMANCE',
    tier: 'PREMIER',
    telemetry: 'API v17 · ACTIVE PIPELINE',
    accentColor: '#4285F4',
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
    name: 'Meta Business',
    category: 'ads',
    categoryLabel: 'MEDIA PARTNER & CAPI',
    tier: 'BADGED',
    telemetry: 'SERVER-SIDE CAPI 100%',
    accentColor: '#0081FB',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#0081FB]" aria-hidden="true">
        <path d="M12 15.35c-1.42 1.63-2.73 2.65-4.18 2.65-2.58 0-4.32-2.14-4.32-5.32 0-3.34 1.83-5.68 4.54-5.68 1.67 0 3.03 1.07 4.26 2.67 1.23-1.6 2.59-2.67 4.26-2.67 2.71 0 4.54 2.34 4.54 5.68 0 3.18-1.74 5.32-4.32 5.32-1.45 0-2.76-1.02-4.18-2.65zm-1.48-1.67C9.37 12.08 8.42 10 7.36 10c-1.32 0-2.16 1.28-2.16 3.08 0 1.77.86 2.92 2.16 2.92.83 0 1.77-.73 3.16-2.32zm2.96 0c1.39 1.59 2.33 2.32 3.16 2.32 1.3 0 2.16-1.15 2.16-2.92 0-1.8-.84-3.08-2.16-3.08-1.06 0-2.01 2.08-3.16 3.68z" />
      </svg>
    ),
  },
  {
    id: 'shopify-plus',
    name: 'Shopify Plus',
    category: 'commerce',
    categoryLabel: 'ENTERPRISE COMMERCE',
    tier: 'PLUS TIER',
    telemetry: 'HEADLESS HYDROGEN READY',
    accentColor: '#96BF48',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path fill="#96BF48" d="M18.8 6.6c-.1-.3-.3-.4-.5-.4s-.4.1-.7.2l-2.4 1.5-1.5-3.3c-.2-.4-.6-.7-1.1-.7H12c-.2 0-.4.1-.4.3 0 .4.4.9.4 1.3 0 2.1-1.6 3.2-3.1 3.2h-.5L7.2 4.8c-.1-.3-.4-.5-.7-.5h-.9c-.2 0-.3.1-.4.3l-2.5 14c-.1.5.3 1 1 1.1h15.2c.5 0 .9-.4.9-.9l-.9-12.2zm-6.2 3.8c-.8 0-1.5-.7-1.5-1.5 0-.5.2-.9.5-1.2.6-.5 1.5-.3 1.8.4.1.3.1.5.1.8 0 .8-.4 1.5-.9 1.5z" />
      </svg>
    ),
  },
  {
    id: 'vercel-enterprise',
    name: 'Vercel Enterprise',
    category: 'cloud',
    categoryLabel: 'CLOUD & EDGE NETWORK',
    tier: 'ENTERPRISE',
    telemetry: '<40MS GLOBAL TTFB',
    accentColor: '#FFFFFF',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
        <path d="M12 2L24 22H0L12 2Z" />
      </svg>
    ),
  },
  {
    id: 'openai-ecosystem',
    name: 'OpenAI Ecosystem',
    category: 'cloud',
    categoryLabel: 'GENERATIVE AI & GEO',
    tier: 'API TIER 5',
    telemetry: 'DIRECT LLM RETRIEVAL',
    accentColor: '#10A37F',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 stroke-white fill-none stroke-[1.5]" aria-hidden="true">
        <path d="M21.2 10.4a5.2 5.2 0 0 0-.4-3.7 5.4 5.4 0 0 0-4.6-2.7 5.1 5.1 0 0 0-2.3.5 5.3 5.3 0 0 0-4.2-2 5.4 5.4 0 0 0-5.1 3.8 5.2 5.2 0 0 0-2.4 3.7 5.3 5.3 0 0 0 .9 5.3 5.3 5.3 0 0 0 .4 3.7 5.4 5.4 0 0 0 4.6 2.7 5.1 5.1 0 0 0 2.3-.5 5.3 5.3 0 0 0 4.2 2 5.4 5.4 0 0 0 5.1-3.8 5.2 5.2 0 0 0 2.4-3.7 5.3 5.3 0 0 0-.9-5.3z" strokeLinejoin="round" />
        <path d="M12 8.5v7m-3.5-5.5l7 4m-7 0l7-4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'nextjs',
    name: 'Next.js Architecture',
    category: 'cloud',
    categoryLabel: 'HYPER-PERFORMANCE WEB',
    tier: 'PRODUCTION',
    telemetry: 'APP ROUTER · RSC 60FPS',
    accentColor: '#FFFFFF',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-white" aria-hidden="true">
        <path d="M12 0C5.37 0 0 5.37 0 12s5.37 12 12 12 12-5.37 12-12S18.63 0 12 0zm5.72 17.65L9.67 7.5H8.25v9h1.5v-7.14l7.15 9.38c-.37.33-.76.64-1.18.91zM14.5 7.5h1.5v5.82l-1.5-1.95V7.5z" />
      </svg>
    ),
  },
  {
    id: 'supabase',
    name: 'Supabase',
    category: 'cloud',
    categoryLabel: 'REALTIME DATABASE & AUTH',
    tier: 'STACK',
    telemetry: 'POSTGRES ROW-SECURITY',
    accentColor: '#3ECF8E',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path fill="#3ECF8E" d="M13.2 23.3c-.6.7-1.7.3-1.8-.6L10.2 13H1.9c-.8 0-1.3-.8-.9-1.5L10.8.7c.6-.7 1.7-.3 1.8.6l1.2 9.7h8.3c.8 0 1.3.8.9 1.5l-9.8 10.8z" />
      </svg>
    ),
  },
  {
    id: 'stripe-verified',
    name: 'Stripe Verified',
    category: 'commerce',
    categoryLabel: 'GLOBAL BILLING & PAYMENTS',
    tier: 'LEVEL 1',
    telemetry: 'PCI-DSS LEVEL 1 VAULT',
    accentColor: '#635BFF',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#635BFF]" aria-hidden="true">
        <path d="M13.976 9.15c0-.98-.79-1.46-2.09-1.46-1.87 0-4.22.68-6.08 1.76V3.82c2.05-.88 4.24-1.32 6.42-1.32 5.09 0 8.65 2.59 8.65 7.08 0 6.94-9.56 5.82-9.56 8.81 0 1.15.98 1.63 2.37 1.63 2.17 0 4.96-.91 6.99-2.08v5.67c-2.3.99-4.81 1.49-7.33 1.49-5.33 0-8.98-2.64-8.98-7.18-.01-7.23 9.61-6.04 9.61-8.77z" />
      </svg>
    ),
  },
  {
    id: 'hubspot',
    name: 'HubSpot',
    category: 'commerce',
    categoryLabel: 'CRM & PIPELINE SYNC',
    tier: 'CERTIFIED',
    telemetry: 'TWO-WAY PIPELINE SYNC',
    accentColor: '#FF7A59',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0 fill-[#FF7A59]" aria-hidden="true">
        <path d="M17.4 6.7V4.2c.9-.4 1.5-1.3 1.5-2.3 0-1.4-1.1-2.5-2.5-2.5s-2.5 1.1-2.5 2.5c0 1 .6 1.9 1.5 2.3v2.5c-1.3.4-2.4 1.2-3.1 2.3L6.3 6.4c.1-.3.2-.6.2-.9 0-1.7-1.3-3-3-3s-3 1.3-3 3 1.3 3 3 3c.5 0 .9-.1 1.3-.3l4.5 2.7c-.5.8-.8 1.8-.8 2.8s.3 2 .8 2.8l-4.5 2.7c-.4-.2-.8-.3-1.3-.3-1.7 0-3 1.3-3 3s1.3 3 3 3 3-1.3 3-3c0-.3-.1-.6-.2-.9l6.5-2.6c.7 1.1 1.8 1.9 3.1 2.3v2.5c-.9.4-1.5 1.3-1.5 2.3 0 1.4 1.1 2.5 2.5 2.5s2.5-1.1 2.5-2.5c0-1-.6-1.9-1.5-2.3v-2.5c2.4-.8 4.1-3 4.1-5.7s-1.7-4.9-4.1-5.7zm-1 8.5c-1.8 0-3.2-1.4-3.2-3.2s1.4-3.2 3.2-3.2 3.2 1.4 3.2 3.2-1.4 3.2-3.2 3.2z" />
      </svg>
    ),
  },
  {
    id: 'cloudflare',
    name: 'Cloudflare',
    category: 'cloud',
    categoryLabel: 'GLOBAL EDGE & DDOS DEFENSE',
    tier: 'SECURITY',
    telemetry: 'ANYCAST DNS · 300+ POPS',
    accentColor: '#F38020',
    renderLogo: () => (
      <svg viewBox="0 0 24 24" className="w-5 h-5 shrink-0" aria-hidden="true">
        <path fill="#F38020" d="M18.4 10.3c-.4-.7-.9-1.3-1.6-1.7-.8-.5-1.7-.7-2.6-.7-.9 0-1.8.3-2.6.8-.7.5-1.3 1.1-1.6 1.9-.5-.2-1-.3-1.5-.3-1.1 0-2.2.5-3 1.3-.7.8-1.1 1.9-1.1 3 0 .2 0 .4.1.7-1.1.2-2.1.9-2.7 1.9-.6 1-.7 2.2-.4 3.3.3 1.1 1.1 2 2.1 2.5.7.3 1.4.4 2.2.4h14.1c1.2 0 2.4-.5 3.3-1.4.9-.9 1.4-2.1 1.4-3.3 0-1.8-1.1-3.4-2.7-4.1-.2-1.7-1.3-3.2-3-4.1z" />
        <path fill="#FAAE40" d="M19.9 14.5c-.2-.1-.4-.2-.6-.2h-.9c-.2 0-.3.1-.3.3 0 .4.1.8.1 1.2 0 1.5-.6 2.9-1.7 3.9-.2.2-.2.4 0 .6l.6.6c.1.1.3.1.4 0 1.4-1.3 2.2-3.1 2.2-5 0-.5-.1-1-.3-1.4 0 0-.1 0-.1 0z" />
      </svg>
    ),
  },
];

/**
 * REDESIGNED CLIENT & INFRASTRUCTURE PARTNERS CAROUSEL
 * 
 * Features:
 * - Authentic vector brand SVGs (Google, Meta, Shopify, Vercel, OpenAI, Next.js, Supabase, Stripe, HubSpot, Cloudflare)
 * - Precision dark obsidian cards with live telemetry data
 * - Interactive category filtering ([ALL], [SEARCH & ADS], [CLOUD & AI], [COMMERCE & CRM])
 * - Hardware-accelerated infinite marquee with pause-on-hover & manual play/pause control
 * - Seamless edge feathering & 100% responsive fluid scaling
 */
export const ClientLogoMarquee: React.FC = () => {
  const [selectedFilter, setSelectedFilter] = useState<'all' | 'ads' | 'cloud' | 'commerce'>('all');
  const [isPaused, setIsPaused] = useState<boolean>(false);
  const prefersReduced = useReducedMotion();

  // Filter chips configuration
  const filterOptions = [
    { key: 'all', label: 'ALL PLATFORMS (10)' },
    { key: 'ads', label: 'SEARCH & PERFORMANCE' },
    { key: 'cloud', label: 'CLOUD & AI INFRA' },
    { key: 'commerce', label: 'COMMERCE & CRM' },
  ] as const;

  // Render individual partner card
  const renderCard = (partner: Partner, keySuffix: string) => {
    const isMatch = selectedFilter === 'all' || partner.category === selectedFilter;

    return (
      <div
        key={`${partner.id}-${keySuffix}`}
        className={`group relative flex flex-col justify-between p-5 rounded-2xl transition-all duration-300 w-[290px] sm:w-[320px] md:w-[340px] shrink-0 border backdrop-blur-xl cursor-pointer ${
          isMatch
            ? 'bg-[#111114]/80 hover:bg-[#151722]/95 border-white/[0.08] hover:border-[#FC6603]/50 hover:shadow-[0_0_32px_rgba(252,102,3,0.12)] -translate-y-0.5 hover:-translate-y-1.5'
            : 'bg-[#0E0F12]/40 border-white/[0.03] opacity-35 hover:opacity-75'
        }`}
      >
        {/* Top Hairline Glow on Hover */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/40 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
        />

        {/* Card Header: Brand Logo & Tier Badge */}
        <div className="flex items-center justify-between gap-3 mb-4">
          <div className="flex items-center gap-3">
            {/* Illuminated Logo Tile */}
            <div className="w-10 h-10 rounded-xl bg-white/[0.03] border border-white/10 group-hover:border-[#FC6603]/40 group-hover:bg-[#FC6603]/10 flex items-center justify-center p-2 transition-all duration-300 shadow-inner">
              {partner.renderLogo()}
            </div>
            <div>
              <span className="font-display font-bold text-[15px] sm:text-[16px] text-white tracking-[-0.01em] block group-hover:text-white transition-colors">
                {partner.name}
              </span>
              <span className="font-mono text-[10px] font-semibold text-[#FC6603] tracking-[0.16em] uppercase block">
                {partner.categoryLabel}
              </span>
            </div>
          </div>

          {/* Tier Monogram Chip */}
          <span className="font-mono text-[9.5px] font-bold text-white/50 group-hover:text-white/80 tracking-[0.12em] uppercase px-2 py-1 rounded-md bg-white/[0.03] border border-white/[0.08] shrink-0">
            {partner.tier}
          </span>
        </div>

        {/* Bottom Telemetry Bar */}
        <div className="pt-3 border-t border-white/[0.06] flex items-center justify-between font-mono text-[10.5px]">
          <div className="flex items-center gap-2 text-white/60 group-hover:text-white/90 transition-colors">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] animate-pulse" />
            <span className="tracking-[0.08em]">{partner.telemetry}</span>
          </div>

          {/* Direct Pipeline Signal Bars */}
          <div className="flex items-end gap-[2px] h-3 shrink-0" aria-hidden="true" title="Signal: Optimal">
            <div className="w-[2px] h-1.5 bg-[#FC6603] rounded-full" />
            <div className="w-[2px] h-2 bg-[#FC6603] rounded-full" />
            <div className="w-[2px] h-2.5 bg-[#FC6603] rounded-full" />
            <div className="w-[2px] h-3 bg-[#FC6603] rounded-full" />
          </div>
        </div>
      </div>
    );
  };

  return (
    <section
      aria-labelledby="partners-heading"
      className="relative py-16 sm:py-20 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden select-none"
    >
      {/* Top Ambient Glow Line */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/25 to-transparent pointer-events-none"
      />

      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 mb-8 sm:mb-10">
        {/* ================= HEADER HUD ================= */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 pb-6 border-b border-white/[0.06]">
          <div>
            {/* Section Tag */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-white/70">TRUSTED BY & INFRASTRUCTURE PARTNERS</span>
            </div>

            {/* Display Heading */}
            <h2
              id="partners-heading"
              className="font-display font-extrabold text-2xl sm:text-3xl md:text-4xl text-white tracking-[-0.02em] leading-tight"
            >
              Enterprise Stack. <span className="text-[#FC6603]">Certified Integrations.</span>
            </h2>
          </div>

          {/* Right Controls & Telemetry */}
          <div className="flex flex-wrap items-center gap-3">
            {/* Live Synchronized Pill */}
            <div className="flex items-center gap-2 px-3.5 py-1.5 rounded-xl bg-white/[0.03] border border-white/[0.08] font-mono text-[11px] tracking-[0.14em] uppercase text-white/70">
              <span className="w-2 h-2 rounded-full bg-[#FC6603] animate-ping" />
              <span>[ CERTIFIED & INTEGRATED ]</span>
            </div>

            {/* Play / Pause Toggle Button */}
            <button
              type="button"
              onClick={() => setIsPaused((prev) => !prev)}
              aria-label={isPaused ? 'Resume partner carousel' : 'Pause partner carousel'}
              className="px-3 py-1.5 rounded-xl bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.08] hover:border-[#FC6603]/40 font-mono text-[11px] tracking-[0.14em] uppercase text-white/70 hover:text-white transition-all flex items-center gap-1.5 cursor-pointer"
            >
              {isPaused ? (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-[#FC6603]">
                    <polygon points="5 3 19 12 5 21 5 3" />
                  </svg>
                  <span>RESUME</span>
                </>
              ) : (
                <>
                  <svg viewBox="0 0 24 24" fill="currentColor" className="w-3 h-3 text-white/60">
                    <rect x="6" y="4" width="4" height="16" />
                    <rect x="14" y="4" width="4" height="16" />
                  </svg>
                  <span>PAUSE</span>
                </>
              )}
            </button>
          </div>
        </div>

        {/* ================= CATEGORY FILTER TABS ================= */}
        <div className="flex items-center gap-2 sm:gap-2.5 overflow-x-auto no-scrollbar pt-5">
          {filterOptions.map((opt) => {
            const isActive = selectedFilter === opt.key;
            return (
              <button
                key={opt.key}
                type="button"
                onClick={() => setSelectedFilter(opt.key)}
                className={`px-3.5 py-1.5 rounded-full font-mono text-[10.5px] sm:text-[11px] font-semibold tracking-[0.14em] uppercase transition-all duration-200 shrink-0 cursor-pointer ${
                  isActive
                    ? 'bg-[#FC6603] text-black shadow-[0_0_16px_rgba(252,102,3,0.35)]'
                    : 'bg-white/[0.03] hover:bg-white/[0.06] text-white/60 hover:text-white border border-white/[0.08]'
                }`}
              >
                {opt.label}
              </button>
            );
          })}
        </div>
      </div>

      {/* ================= INFINITE HARDWARE-ACCELERATED CAROUSEL ================= */}
      <div
        className="relative w-full overflow-hidden flex items-center group/marquee [mask-image:linear-gradient(to_right,transparent,black_8%,black_92%,transparent)]"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        {/* Track 1 (Primary Stream) */}
        <div
          className={`flex shrink-0 items-center gap-4 sm:gap-5 md:gap-6 py-2 will-change-transform ${
            prefersReduced
              ? ''
              : isPaused
              ? 'animate-none'
              : 'animate-[marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused]'
          }`}
        >
          {PARTNER_LIST.map((partner) => renderCard(partner, 't1'))}
        </div>

        {/* Track 2 (Duplicate for Seamless Infinite Loop) */}
        <div
          aria-hidden="true"
          className={`flex shrink-0 items-center gap-4 sm:gap-5 md:gap-6 py-2 pl-4 sm:pl-5 md:pl-6 will-change-transform ${
            prefersReduced
              ? 'hidden'
              : isPaused
              ? 'animate-none'
              : 'animate-[marquee_40s_linear_infinite] group-hover/marquee:[animation-play-state:paused]'
          }`}
        >
          {PARTNER_LIST.map((partner) => renderCard(partner, 't2'))}
        </div>
      </div>

      {/* ================= BOTTOM VERIFICATION BANNER ================= */}
      <div className="max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 mt-8 sm:mt-10">
        <div className="flex flex-wrap items-center justify-between gap-4 pt-5 border-t border-white/[0.06] font-mono text-[10.5px] sm:text-[11px] text-white/50 tracking-[0.14em] uppercase">
          <div className="flex items-center gap-2 text-white/70">
            <span className="text-[#FC6603] font-bold">//</span>
            <span>DIRECT ENTERPRISE PIPELINES</span>
          </div>

          <div className="flex flex-wrap items-center gap-4 sm:gap-6">
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
              <span>ZERO-LATENCY APIS</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
              <span>PCI-DSS & SOC2 LEVEL</span>
            </span>
            <span className="flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
              <span>100% SECURE TOKENS</span>
            </span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ClientLogoMarquee;