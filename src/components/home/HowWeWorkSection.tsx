import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProcessPhase {
  number: string;
  title: string;
  stepName: string;
  deliverable: string;
  description: string;
  renderIcon: () => React.ReactNode;
}

const PHASES: ProcessPhase[] = [
  {
    number: '01',
    title: 'Discover & Map',
    stepName: 'DISCOVER',
    deliverable: '360° Technical & GEO Moat Blueprint',
    description: 'Comprehensive audit of technical debt, competitor authority, search intent capture, and Generative Engine (GEO) answer gaps.',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="11" cy="11" r="8" />
        <line x1="21" y1="21" x2="16.65" y2="16.65" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    stepName: 'STRATEGIZE',
    deliverable: 'Information Architecture & Paid Playbook',
    description: 'Architecting custom site structure, high-intent topical clusters, conversion wireframes, and omnichannel paid acquisition funnels.',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <circle cx="12" cy="12" r="10" />
        <polygon points="16.24 7.76 14.12 14.12 7.76 16.24 9.88 9.88 16.24 7.76" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build & Launch',
    stepName: 'BUILD',
    deliverable: 'Production Deployment & Campaign Ignition',
    description: 'Sub-second frontend engineering, headless CMS integration, automated CRM tracking, and synchronized ad campaign ignition.',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <polyline points="16 18 22 12 16 6" />
        <polyline points="8 6 2 12 8 18" />
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scale & Compound',
    stepName: 'SCALE',
    deliverable: 'Real-Time Telemetry & Blended Profit Scaling',
    description: 'Server-side CAPI telemetry, aggressive CRO experimentation, and continuous search dominance to multiply revenue non-linearly.',
    renderIcon: () => (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-5 h-5">
        <line x1="18" y1="20" x2="18" y2="10" />
        <line x1="12" y1="20" x2="12" y2="4" />
        <line x1="6" y1="20" x2="6" y2="14" />
      </svg>
    ),
  },
];

/**
 * HOW WE WORK — SCROLL-DRIVEN 3D CLIMB & POPUP PHASES
 * 
 * Recreates the exact terminal design from user reference:
 * - Left column: Typographic phases that pop up and expand as you scroll
 * - Right column: Diagonal staircase cards (01 Discover, 02 Strategize, 03 Build, 04 Scale)
 *   with real physical slab depth, glowing orange under-glow, connecting laser beam,
 *   and top glowing ALPHA ↗ marker!
 * - Scroll-linked smooth elevation: steps rise up step-by-step as you scroll through the section.
 */
export const HowWeWorkSection: React.FC = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [activeLevel, setActiveLevel] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  // Scroll Progress across the 300vh container
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 260,
    damping: 32,
    restDelta: 0.001,
  });

  // Synchronize active level based on scroll position
  useEffect(() => {
    const unsubscribe = smoothProgress.on('change', (latest) => {
      let level = 0;
      if (latest < 0.28) {
        level = 0;
      } else if (latest < 0.53) {
        level = 1;
      } else if (latest < 0.78) {
        level = 2;
      } else {
        level = 3;
      }
      setActiveLevel(level);
    });

    return () => unsubscribe();
  }, [smoothProgress]);

  // Smooth click navigation to any level
  const scrollToLevel = (levelIndex: number) => {
    if (!containerRef.current) return;
    const containerTop = containerRef.current.offsetTop;
    const containerHeight = containerRef.current.offsetHeight - window.innerHeight;
    const targetScroll = containerTop + (levelIndex / 3) * containerHeight;
    window.scrollTo({ top: targetScroll, behavior: 'smooth' });
  };

  // 4 Staircase Platform Coordinates (Bottom-Left to Top-Right matching screenshot)
  const platformPositions = [
    { left: '4%', top: '64%', zIndex: 40 },
    { left: '26%', top: '44%', zIndex: 30 },
    { left: '46%', top: '26%', zIndex: 20 },
    { left: '63%', top: '8%', zIndex: 10 },
  ];

  return (
    <div
      ref={containerRef}
      id="process"
      className="relative min-h-[300vh] sm:min-h-[340vh] bg-[#0A0A0B] selection:bg-[#FC6603] selection:text-black"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-6 sm:py-10 border-b border-white/[0.08]">
        {/* Top Ambient Hairline Accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/35 to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 w-full flex-1 flex flex-col justify-between">
          {/* ================= SECTION HEADER ================= */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-6 border-b border-white/[0.06] shrink-0">
            {/* Left: Eyebrow + Huge Bricolage Heading */}
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center gap-2">
                <span className="font-bold">//</span>
                <span className="text-white/70">06 OUR PROCESS</span>
              </div>

              <h2
                id="process-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[58px] text-white tracking-[-0.03em] leading-[1.08]"
              >
                FOUR LEVELS. <span className="text-[#FC6603]">ONE CLIMB.</span>
              </h2>
            </div>

            {/* Right: Short Intro Paragraph + Full Process Link */}
            <div className="max-w-md flex flex-col justify-end">
              <p className="font-sans text-[14px] sm:text-[15px] text-[#A1A1AA] leading-relaxed mb-3">
                We replace fragmented guesswork with an engineered, 4-stage compounding growth framework. Each stage locks in revenue foundations before accelerating spend.
              </p>
              <Link
                to="/about#process"
                className="inline-flex items-center gap-2 font-mono text-[11px] sm:text-[11.5px] font-bold text-[#FC6603] hover:text-white uppercase tracking-[0.16em] transition-colors group"
              >
                <span>See the full process</span>
                <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
              </Link>
            </div>
          </div>

          {/* ================= TWO-COLUMN INTERACTIVE CLIMB ROW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-14 items-center flex-1 my-auto py-4">
            {/* ================= LEFT COLUMN: POPUP PHASES ================= */}
            <div className="lg:col-span-5 flex flex-col justify-center order-2 lg:order-1">
              <div className="space-y-1">
                {PHASES.map((phase, idx) => {
                  const isActive = idx === activeLevel;
                  const isPast = idx < activeLevel;

                  return (
                    <div
                      key={phase.number}
                      onClick={() => scrollToLevel(idx)}
                      className={`group relative py-4 sm:py-5 border-b border-white/[0.08] cursor-pointer transition-all duration-300 ${
                        idx === 0 ? 'border-t border-white/[0.08]' : ''
                      }`}
                    >
                      {/* Left Active Hairline Accent Indicator */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[2.5px] bg-[#FC6603] transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 shadow-[0_0_12px_#FC6603]'
                            : isPast
                            ? 'opacity-40'
                            : 'opacity-0'
                        }`}
                      />

                      {/* Header Row: Number + Phase Title */}
                      <div className="flex items-center justify-between gap-4 pl-3 sm:pl-4">
                        <div className="flex items-baseline gap-3.5 sm:gap-5">
                          {/* DM Mono Number */}
                          <span
                            className={`font-mono text-xs sm:text-sm font-bold tracking-[0.16em] transition-colors duration-300 ${
                              isActive
                                ? 'text-[#FC6603]'
                                : isPast
                                ? 'text-[#FC6603]/60'
                                : 'text-white/30 group-hover:text-white/60'
                            }`}
                          >
                            {phase.number}
                          </span>

                          {/* Large Bricolage Uppercase Title */}
                          <h3
                            className={`font-display font-extrabold text-xl sm:text-2xl md:text-[28px] tracking-[-0.02em] uppercase transition-colors duration-300 leading-tight ${
                              isActive
                                ? 'text-white'
                                : isPast
                                ? 'text-white/70'
                                : 'text-white/30 group-hover:text-white/70'
                            }`}
                          >
                            {phase.title}
                          </h3>
                        </div>

                        {/* Status Beacon */}
                        <div className="shrink-0 flex items-center">
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-[#FC6603] ring-4 ring-[#FC6603]/20 shadow-[0_0_8px_#FC6603]'
                                : isPast
                                ? 'bg-[#FC6603]/60'
                                : 'bg-white/20'
                            }`}
                          />
                        </div>
                      </div>

                      {/* Accordion Expandable Deliverable Content (Pops Up on Scroll) */}
                      <AnimatePresence initial={false}>
                        {isActive && (
                          <motion.div
                            initial={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                            animate={{ opacity: 1, height: 'auto' }}
                            exit={prefersReduced ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                            className="overflow-hidden pl-3 sm:pl-4"
                          >
                            <div className="pt-2.5 sm:pt-3">
                              {/* Short Description */}
                              <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A1AA] leading-relaxed max-w-lg">
                                {phase.description}
                              </p>

                              {/* Deliverable Line */}
                              <div className="mt-2.5 flex items-center gap-2 font-mono text-[10.5px] sm:text-[11px] font-bold text-[#FC6603] tracking-[0.12em] uppercase">
                                <span>YOU RECEIVE —</span>
                                <span className="text-white/90">{phase.deliverable}</span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Level Indicator & Direct Step Buttons */}
              <div className="mt-6 pt-4 flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2 text-white/50 tracking-[0.16em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603]" />
                  <span>SCROLL STEP-BY-STEP OR TAP LEVEL</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {PHASES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollToLevel(i)}
                      aria-label={`Jump to level 0${i + 1}`}
                      className={`w-7 h-7 rounded-lg border font-mono text-[10.5px] font-bold transition-all cursor-pointer ${
                        activeLevel === i
                          ? 'bg-[#FC6603] text-black border-[#FC6603] shadow-[0_0_10px_rgba(252,102,3,0.5)]'
                          : 'bg-white/[0.03] text-white/50 border-white/10 hover:border-[#FC6603]/40 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: 3D THE ASCENT TERMINAL ================= */}
            <div className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2">
              {/* Outer HUD Terminal Container matching reference screenshot */}
              <div className="relative w-full max-w-[560px] h-[380px] sm:h-[440px] md:h-[480px] rounded-3xl bg-[#0B0C10] border border-white/[0.08] p-5 sm:p-7 shadow-[0_20px_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col justify-between">
                {/* HUD Top Corner Brackets & Telemetry */}
                <div className="relative z-20 flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.18em] uppercase">
                  {/* Top-Left: Glowing Dot + Live Ascent */}
                  <div className="flex items-center gap-2 text-white/80">
                    <span className="text-[#FC6603] text-[14px]">┌</span>
                    <span className="w-2 h-2 rounded-full bg-[#FC6603] shadow-[0_0_8px_#FC6603] animate-pulse" />
                    <span>THE ASCENT — LIVE</span>
                  </div>

                  {/* Top-Right: Level Counter */}
                  <div className="flex items-center gap-1.5 text-white/70">
                    <span className="text-[#FC6603]">LEVEL 0{activeLevel + 1} / 04</span>
                    <span className="text-[#FC6603] text-[14px]">┐</span>
                  </div>
                </div>

                {/* Perspective Isometric Floor Grid in Background */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-0 h-[220px] pointer-events-none opacity-30"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(252, 102, 3, 0.15) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(252, 102, 3, 0.15) 1px, transparent 1px)
                    `,
                    backgroundSize: '28px 28px',
                    transform: 'perspective(300px) rotateX(65deg) scale(1.6)',
                    transformOrigin: 'bottom center',
                    maskImage: 'linear-gradient(to top, black 20%, transparent 90%)',
                  }}
                />

                {/* Small Rising Particle Embers */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[
                    { left: '15%', bottom: '20%', duration: 4.5, delay: 0 },
                    { left: '32%', bottom: '35%', duration: 5.2, delay: 1.2 },
                    { left: '55%', bottom: '45%', duration: 3.9, delay: 0.6 },
                    { left: '72%', bottom: '60%', duration: 4.8, delay: 2.0 },
                    { left: '84%', bottom: '75%', duration: 4.1, delay: 1.5 },
                  ].map((p, i) => (
                    <span
                      key={i}
                      className="absolute w-[2px] h-[2px] rounded-full bg-[#FC6603] shadow-[0_0_6px_#FC6603]"
                      style={{
                        left: p.left,
                        bottom: p.bottom,
                        animation: prefersReduced
                          ? 'none'
                          : `ascentEmber ${p.duration}s ease-in-out infinite alternate ${p.delay}s`,
                      }}
                    />
                  ))}
                </div>

                {/* Connecting Laser Beam Line */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10"
                >
                  <defs>
                    <linearGradient id="laserBeamGrad" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FC6603" stopOpacity="0.8" />
                      <stop offset="100%" stopColor="#FFA34D" stopOpacity="1" />
                    </linearGradient>
                  </defs>
                  {/* Laser line climbing from card 1 to card 4 */}
                  <line
                    x1="22%"
                    y1="76%"
                    x2="84%"
                    y2="20%"
                    stroke="url(#laserBeamGrad)"
                    strokeWidth="1.5"
                    strokeDasharray="4 3"
                    className="opacity-70"
                  />
                  {/* Active Laser Line segment based on current active level */}
                  <line
                    x1="22%"
                    y1="76%"
                    x2={`${22 + (activeLevel / 3) * 62}%`}
                    y2={`${76 - (activeLevel / 3) * 56}%`}
                    stroke="#FC6603"
                    strokeWidth="2.5"
                    className="transition-all duration-500 ease-out drop-shadow-[0_0_8px_#FC6603]"
                  />
                </svg>

                {/* Top ALPHA ↗ Pinnacle Marker */}
                <div
                  className={`absolute right-12 sm:right-16 top-10 sm:top-12 z-20 flex items-center gap-2 transition-all duration-500 ${
                    activeLevel === 3 ? 'scale-105' : 'opacity-60'
                  }`}
                >
                  {/* Diamond Icon in Dashed Circle */}
                  <div
                    className={`w-8 h-8 rounded-full border border-dashed flex items-center justify-center transition-all duration-500 ${
                      activeLevel === 3
                        ? 'border-[#FC6603] bg-[#FC6603]/20 shadow-[0_0_16px_rgba(252,102,3,0.6)]'
                        : 'border-white/20 bg-white/[0.02]'
                    }`}
                  >
                    <span
                      className={`text-xs transition-colors duration-500 ${
                        activeLevel === 3 ? 'text-[#FC6603]' : 'text-white/40'
                      }`}
                    >
                      ◆
                    </span>
                  </div>

                  {/* ALPHA text badge */}
                  <div
                    className={`font-mono text-[10.5px] font-bold tracking-[0.16em] uppercase flex items-center gap-1 transition-colors duration-500 ${
                      activeLevel === 3 ? 'text-[#FC6603]' : 'text-white/40'
                    }`}
                  >
                    <span>ALPHA</span>
                    <span className="text-[12px]">↗</span>
                  </div>
                </div>

                {/* Dynamic Radiant Floor Under-Glow beneath the active card */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none transition-all duration-700 ease-out z-0"
                  style={{
                    left: platformPositions[activeLevel].left,
                    top: platformPositions[activeLevel].top,
                    width: '260px',
                    height: '180px',
                    transform: 'translate(-30px, 10px)',
                    background: 'radial-gradient(ellipse at center, rgba(252,102,3,0.32) 0%, rgba(252,102,3,0.1) 45%, transparent 75%)',
                  }}
                />

                {/* 4 STAIRCASE SLABS (Exact Cards from Screenshot) */}
                <div className="relative w-full h-full my-auto z-10">
                  {PHASES.map((phase, idx) => {
                    const isActive = idx === activeLevel;
                    const isPast = idx < activeLevel;
                    const pos = platformPositions[idx];

                    return (
                      <div
                        key={phase.number}
                        onClick={() => scrollToLevel(idx)}
                        role="button"
                        tabIndex={0}
                        aria-label={`Select ${phase.title}`}
                        className="absolute cursor-pointer transition-all duration-500 ease-out select-none"
                        style={{
                          left: pos.left,
                          top: pos.top,
                          zIndex: isActive ? 50 : pos.zIndex,
                          transform: isActive
                            ? 'translateY(-14px) scale(1.04)'
                            : isPast
                            ? 'translateY(-4px) scale(0.99)'
                            : 'translateY(0) scale(0.96)',
                        }}
                      >
                        {/* 3D Physical Extrusion Shadow Layer */}
                        <div
                          aria-hidden="true"
                          className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none -z-10 ${
                            isActive
                              ? 'translate-y-3.5 bg-black/90 shadow-[0_16px_30px_rgba(0,0,0,0.9),0_0_28px_rgba(252,102,3,0.4)]'
                              : 'translate-y-2 bg-black/80 shadow-[0_10px_20px_rgba(0,0,0,0.7)]'
                          }`}
                        />

                        {/* Slab Surface matching screenshot */}
                        <div
                          className={`relative w-[180px] sm:w-[200px] md:w-[215px] h-[95px] sm:h-[105px] md:h-[112px] rounded-2xl p-3.5 sm:p-4 flex flex-col justify-between border backdrop-blur-xl transition-all duration-500 ${
                            isActive
                              ? 'bg-[#15161E]/95 border-[#FC6603] shadow-[0_0_30px_rgba(252,102,3,0.35),inset_0_0_15px_rgba(252,102,3,0.2)]'
                              : isPast
                              ? 'bg-[#101117]/85 border-[#FC6603]/30 hover:border-[#FC6603]/60'
                              : 'bg-[#0E0F14]/75 border-white/[0.08] hover:border-white/20'
                          }`}
                        >
                          {/* Card Top: Number + Icon */}
                          <div className="flex items-start justify-between">
                            {/* Number: Solid orange when active, hollow outline wireframe when inactive! */}
                            <span
                              className={`font-display font-black text-3xl sm:text-4xl md:text-[42px] leading-none transition-all duration-500 ${
                                isActive
                                  ? 'text-[#FC6603] drop-shadow-[0_0_12px_rgba(252,102,3,0.6)]'
                                  : 'text-transparent [-webkit-text-stroke:1.25px_rgba(255,255,255,0.3)]'
                              }`}
                            >
                              {phase.number}
                            </span>

                            {/* Top Right Tool Icon */}
                            <div
                              className={`transition-colors duration-300 ${
                                isActive ? 'text-[#FC6603]' : 'text-white/40'
                              }`}
                            >
                              {phase.renderIcon()}
                            </div>
                          </div>

                          {/* Card Bottom: Glowing Dot + Step Name */}
                          <div className="flex items-center gap-1.5 font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.18em] uppercase">
                            <span
                              className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                isActive
                                  ? 'bg-[#FC6603] shadow-[0_0_6px_#FC6603]'
                                  : isPast
                                  ? 'bg-[#FC6603]/60'
                                  : 'bg-white/20'
                              }`}
                            />
                            <span
                              className={`transition-colors duration-300 ${
                                isActive ? 'text-white' : isPast ? 'text-white/70' : 'text-white/40'
                              }`}
                            >
                              {phase.stepName}
                            </span>
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* HUD Bottom Corner Brackets & Status */}
                <div className="relative z-20 flex items-center justify-between font-mono text-[9.5px] sm:text-[10.5px] tracking-[0.16em] uppercase text-white/60 pt-2">
                  {/* Bottom-Left: Active Step Name */}
                  <div className="flex items-center gap-1">
                    <span className="text-[#FC6603] text-[14px]">└</span>
                    <span>[ 0{activeLevel + 1} — {PHASES[activeLevel].title.toUpperCase()} ]</span>
                  </div>

                  {/* Bottom-Right: Auto-Climb Mode */}
                  <div className="flex items-center gap-1 text-[#FC6603]/80">
                    <span>AUTO-CLIMB ON</span>
                    <span className="text-[#FC6603] text-[14px]">┘</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Minimal Bottom Section Footer Indicator */}
          <div className="pt-3 border-t border-white/[0.04] flex items-center justify-between font-mono text-[10px] text-white/40 tracking-[0.16em] uppercase shrink-0">
            <span>// COMPOUNDING GROWTH ACCELERATION PROTOCOL</span>
            <span>ALPHALINKX CORE PLATFORM</span>
          </div>
        </div>
      </div>

      {/* Global CSS keyframes for floating ember particles */}
      <style>{`
        @keyframes ascentEmber {
          0% {
            transform: translateY(0) scale(0.8);
            opacity: 0.3;
          }
          50% {
            opacity: 0.9;
          }
          100% {
            transform: translateY(-24px) scale(1.2);
            opacity: 0.2;
          }
        }
      `}</style>
    </div>
  );
};

export default HowWeWorkSection;