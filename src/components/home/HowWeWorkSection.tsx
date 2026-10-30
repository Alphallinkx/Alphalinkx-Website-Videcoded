import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProcessPhase {
  number: string;
  title: string;
  stepName: string;
  deliverable: string;
  description: string;
  tag: string;
  renderIcon: () => React.ReactNode;
}

const PHASES: ProcessPhase[] = [
  {
    number: '01',
    title: 'Discover & Map',
    stepName: 'DISCOVER',
    deliverable: '360° Technical & GEO Moat Blueprint',
    description: 'Comprehensive audit of technical debt, competitor authority, search intent capture, and Generative Engine (GEO) answer gaps.',
    tag: 'DIAGNOSTIC TELEMETRY',
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
    tag: 'SYSTEM ARCHITECTURE',
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
    tag: 'PRODUCTION SPRINT',
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
    tag: 'COMPOUND VELOCITY',
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
 * HOW WE WORK — SCROLL-DRIVEN SPATIAL 3D CLIMB & POPUP PHASES
 *
 * Ultra-modern, unboxed architectural spatial design:
 * - NO outer restrictive box around the steps: floating freely in infinite 3D perspective space
 * - Physical floating glass slabs with real extruded depth, specular highlights, and radiant under-glow
 * - Open holographic energy conduit laser beam connecting all 4 levels to the ALPHA ↗ apex
 * - Left column: interactive popup phases with smooth scroll sync
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

  // 4 Staircase Platform Coordinates in Open Spatial Canvas (diagonal climb bottom-left to top-right)
  const platformPositions = [
    { left: '2%', top: '64%', zIndex: 40 },
    { left: '25%', top: '44%', zIndex: 30 },
    { left: '48%', top: '25%', zIndex: 20 },
    { left: '70%', top: '6%', zIndex: 10 },
  ];

  return (
    <div
      ref={containerRef}
      id="process"
      className="relative min-h-[300vh] sm:min-h-[340vh] bg-[#0A0A0B] selection:bg-[#FC6603] selection:text-black overflow-x-clip"
    >
      {/* Pinned Viewport Container */}
      <div className="sticky top-0 h-screen flex flex-col justify-between overflow-hidden py-6 sm:py-8 lg:py-10 border-b border-white/[0.08]">
        {/* Top Ambient Subtle Hairline Accent */}
        <div
          aria-hidden="true"
          className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/35 to-transparent pointer-events-none"
        />

        <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 w-full flex-1 flex flex-col justify-between">
          {/* ================= SECTION HEADER ================= */}
          <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 pb-5 sm:pb-6 border-b border-white/[0.06] shrink-0">
            {/* Left: Eyebrow + Huge Bricolage Heading */}
            <div className="max-w-3xl">
              <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center gap-2">
                <span className="font-bold">//</span>
                <span className="text-white/70">06 OUR PROCESS</span>
              </div>

              <h2
                id="process-heading"
                className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-white tracking-[-0.03em] leading-[1.08]"
              >
                FOUR LEVELS. <span className="text-[#FC6603]">ONE CLIMB.</span>
              </h2>
            </div>

            {/* Right: Short Intro Paragraph + Full Process Link */}
            <div className="max-w-md flex flex-col justify-end">
              <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#A1A1AA] leading-relaxed mb-2.5">
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

          {/* ================= TWO-COLUMN INTERACTIVE SPATIAL ROW ================= */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-10 xl:gap-14 items-center flex-1 my-auto py-2 sm:py-4">
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
                      role="button"
                      tabIndex={0}
                      aria-label={`Jump to stage ${phase.number} - ${phase.title}`}
                      className={`group relative py-3.5 sm:py-4 lg:py-4.5 border-b border-white/[0.08] cursor-pointer transition-all duration-300 select-none ${
                        idx === 0 ? 'border-t border-white/[0.08]' : ''
                      }`}
                    >
                      {/* Left Active Orange Bar */}
                      <div
                        className={`absolute left-0 top-0 bottom-0 w-[3px] bg-[#FC6603] transition-all duration-300 ${
                          isActive
                            ? 'opacity-100 shadow-[0_0_14px_#FC6603]'
                            : isPast
                            ? 'opacity-35'
                            : 'opacity-0'
                        }`}
                      />

                      {/* Header Row: Number + Phase Title */}
                      <div className="flex items-center justify-between gap-4 pl-3.5 sm:pl-4">
                        <div className="flex items-baseline gap-3 sm:gap-4.5">
                          {/* DM Mono Number */}
                          <span
                            className={`font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] transition-colors duration-300 ${
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
                            className={`font-display font-extrabold text-xl sm:text-2xl md:text-[27px] tracking-[-0.02em] uppercase transition-colors duration-300 leading-tight ${
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

                        {/* Status Beacon / Micro Badge */}
                        <div className="shrink-0 flex items-center gap-2">
                          {isActive && (
                            <span className="hidden sm:inline-block font-mono text-[9px] font-semibold text-[#FC6603] uppercase tracking-[0.18em] px-2 py-0.5 rounded-full bg-[#FC6603]/10 border border-[#FC6603]/30">
                              {phase.tag}
                            </span>
                          )}
                          <span
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-[#FC6603] ring-4 ring-[#FC6603]/20 shadow-[0_0_10px_#FC6603]'
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
                            className="overflow-hidden pl-3.5 sm:pl-4"
                          >
                            <div className="pt-2.5 sm:pt-3">
                              {/* Short Description */}
                              <p className="font-sans text-[13px] sm:text-[13.5px] text-[#A1A1AA] leading-relaxed max-w-lg">
                                {phase.description}
                              </p>

                              {/* Deliverable Badge */}
                              <div className="mt-3 inline-flex items-center gap-2 px-3 py-1.5 rounded-lg bg-white/[0.03] border border-white/[0.08] font-mono text-[10px] sm:text-[10.5px] font-bold text-[#FC6603] tracking-[0.14em] uppercase">
                                <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] shadow-[0_0_6px_#FC6603]" />
                                <span>DELIVERABLE —</span>
                                <span className="text-white/90 normal-case tracking-normal font-sans font-medium text-[12px] sm:text-[12.5px]">
                                  {phase.deliverable}
                                </span>
                              </div>
                            </div>
                          </motion.div>
                        )}
                      </AnimatePresence>
                    </div>
                  );
                })}
              </div>

              {/* Bottom Level Navigation & Direct Step Buttons */}
              <div className="mt-6 pt-3 flex items-center justify-between font-mono text-[11px]">
                <div className="flex items-center gap-2 text-white/50 tracking-[0.16em] uppercase">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] animate-pulse" />
                  <span className="text-[10px] sm:text-[11px]">SCROLL TO CLIMB OR SELECT</span>
                </div>

                <div className="flex items-center gap-1.5">
                  {PHASES.map((_, i) => (
                    <button
                      key={i}
                      type="button"
                      onClick={() => scrollToLevel(i)}
                      aria-label={`Jump to level 0${i + 1}`}
                      className={`w-7 h-7 sm:w-8 sm:h-8 rounded-lg border font-mono text-[10.5px] sm:text-[11px] font-bold transition-all cursor-pointer ${
                        activeLevel === i
                          ? 'bg-[#FC6603] text-black border-[#FC6603] shadow-[0_0_12px_rgba(252,102,3,0.55)] scale-105'
                          : 'bg-white/[0.03] text-white/50 border-white/10 hover:border-[#FC6603]/40 hover:text-white'
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              </div>
            </div>

            {/* ================= RIGHT COLUMN: UNBOXED 3D SPATIAL ASCENT ================= */}
            <div className="lg:col-span-7 relative flex items-center justify-center order-1 lg:order-2 w-full">
              {/*
                OPEN 3D SPATIAL CANVAS
                NO OUTER RESTRICTIVE BOX: The floating platforms breathe directly into the section space!
              */}
              <div className="relative w-full max-w-[660px] h-[390px] sm:h-[460px] md:h-[510px] flex items-center justify-center select-none [perspective:1200px]">
                {/* Floating Top Spatial Telemetry (Free in space, no box border) */}
                <div className="absolute top-0 inset-x-2 sm:inset-x-6 z-20 flex items-center justify-between font-mono text-[10px] sm:text-[11px] tracking-[0.2em] uppercase">
                  <div className="flex items-center gap-2.5 text-white/80">
                    <span className="w-2 h-2 rounded-full bg-[#FC6603] shadow-[0_0_10px_#FC6603] animate-ping opacity-75" />
                    <span className="w-2 h-2 rounded-full bg-[#FC6603] shadow-[0_0_8px_#FC6603] -ml-4" />
                    <span className="font-bold text-white/90">THE ASCENT</span>
                    <span className="text-white/30 hidden sm:inline">|</span>
                    <span className="text-white/50 text-[9.5px] hidden sm:inline">LIVE PROTOCOL</span>
                  </div>

                  <div className="flex items-center gap-2 text-white/70">
                    <span className="text-white/40 text-[9px] hidden sm:inline">CURRENT STAGE</span>
                    <span className="text-[#FC6603] font-bold">LEVEL 0{activeLevel + 1} / 04</span>
                  </div>
                </div>

                {/* Subtle Floor Spatial Grid Lines fading softly outward */}
                <div
                  aria-hidden="true"
                  className="absolute inset-x-0 bottom-[-10px] h-[260px] pointer-events-none opacity-25"
                  style={{
                    backgroundImage: `
                      linear-gradient(rgba(252, 102, 3, 0.18) 1px, transparent 1px),
                      linear-gradient(90deg, rgba(252, 102, 3, 0.18) 1px, transparent 1px)
                    `,
                    backgroundSize: '36px 36px',
                    transform: 'perspective(400px) rotateX(72deg) scale(1.5)',
                    transformOrigin: 'bottom center',
                    maskImage: 'radial-gradient(ellipse at 50% 100%, black 20%, transparent 75%)',
                  }}
                />

                {/* Rising Spatial Ember Dust */}
                <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
                  {[
                    { left: '12%', bottom: '15%', duration: 4.2, delay: 0 },
                    { left: '28%', bottom: '30%', duration: 5.1, delay: 1.1 },
                    { left: '50%', bottom: '45%', duration: 3.8, delay: 0.5 },
                    { left: '68%', bottom: '58%', duration: 4.6, delay: 1.8 },
                    { left: '86%', bottom: '72%', duration: 4.0, delay: 1.3 },
                  ].map((p, i) => (
                    <span
                      key={i}
                      className="absolute w-[2px] h-[2px] rounded-full bg-[#FC6603] shadow-[0_0_8px_#FC6603]"
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

                {/* Energy Laser Beam Guide (Climbing freely between platforms) */}
                <svg
                  aria-hidden="true"
                  className="absolute inset-0 w-full h-full pointer-events-none z-10 overflow-visible"
                >
                  <defs>
                    <linearGradient id="laserBeamFull" x1="0%" y1="100%" x2="100%" y2="0%">
                      <stop offset="0%" stopColor="#FC6603" stopOpacity="0.4" />
                      <stop offset="100%" stopColor="#FFA34D" stopOpacity="0.7" />
                    </linearGradient>
                    <filter id="laserBeamGlow" x="-20%" y="-20%" width="140%" height="140%">
                      <feGaussianBlur stdDeviation="3" result="blur" />
                      <feMerge>
                        <feMergeNode in="blur" />
                        <feMergeNode in="SourceGraphic" />
                      </feMerge>
                    </filter>
                  </defs>

                  {/* Faint Dashed Baseline Path */}
                  <line
                    x1="16%"
                    y1="76%"
                    x2="84%"
                    y2="18%"
                    stroke="url(#laserBeamFull)"
                    strokeWidth="1.5"
                    strokeDasharray="4 4"
                    className="opacity-50"
                  />

                  {/* Active Laser Segment with Neon Glow */}
                  <line
                    x1="16%"
                    y1="76%"
                    x2={`${16 + (activeLevel / 3) * 68}%`}
                    y2={`${76 - (activeLevel / 3) * 58}%`}
                    stroke="#FC6603"
                    strokeWidth="2.5"
                    filter="url(#laserBeamGlow)"
                    className="transition-all duration-500 ease-out"
                  />

                  {/* Traveling Pulse Node on Current Level */}
                  <circle
                    cx={`${16 + (activeLevel / 3) * 68}%`}
                    cy={`${76 - (activeLevel / 3) * 58}%`}
                    r="4"
                    fill="#FFFFFF"
                    stroke="#FC6603"
                    strokeWidth="2.5"
                    className="transition-all duration-500 ease-out drop-shadow-[0_0_10px_#FC6603]"
                  />
                </svg>

                {/* Top-Right ALPHA ↗ Pinnacle Apex (Floating freely in space) */}
                <div
                  className={`absolute right-4 sm:right-8 top-3 sm:top-5 z-20 flex items-center gap-2.5 transition-all duration-500 ${
                    activeLevel === 3 ? 'scale-110 opacity-100' : 'opacity-65 hover:opacity-100'
                  }`}
                >
                  {/* Concentric Rotating Orbital Beacon */}
                  <div className="relative flex items-center justify-center">
                    <div
                      className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-dashed flex items-center justify-center transition-all duration-500 ${
                        activeLevel === 3
                          ? 'border-[#FC6603] bg-[#FC6603]/25 shadow-[0_0_24px_rgba(252,102,3,0.7)] animate-spin-slow'
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

                    {/* Outer Echo Ring on Max Level */}
                    {activeLevel === 3 && (
                      <span
                        aria-hidden="true"
                        className="absolute inset-0 rounded-full border border-[#FC6603]/60 animate-ping opacity-60 pointer-events-none"
                      />
                    )}
                  </div>

                  {/* ALPHA Apex Label */}
                  <div className="flex flex-col">
                    <div
                      className={`font-mono text-[11px] sm:text-[11.5px] font-extrabold tracking-[0.18em] uppercase flex items-center gap-1 transition-colors duration-500 ${
                        activeLevel === 3 ? 'text-[#FC6603] drop-shadow-[0_0_8px_rgba(252,102,3,0.5)]' : 'text-white/50'
                      }`}
                    >
                      <span>ALPHA</span>
                      <span className="text-[13px]">↗</span>
                    </div>
                    <span className="font-mono text-[8.5px] text-white/35 tracking-[0.14em]">APEX COMPOUND</span>
                  </div>
                </div>

                {/* Volumetric Floor Glow Tracking Active Platform (No box clipping!) */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none transition-all duration-700 ease-out z-0"
                  style={{
                    left: platformPositions[activeLevel].left,
                    top: platformPositions[activeLevel].top,
                    width: '320px',
                    height: '220px',
                    transform: 'translate(-40px, -20px)',
                    background:
                      'radial-gradient(ellipse at center, rgba(252,102,3,0.38) 0%, rgba(252,102,3,0.12) 45%, transparent 75%)',
                  }}
                />

                {/* ================= 4 FLOATING STAIRCASE SLABS ================= */}
                <div
                  className="relative w-full h-full z-10 transition-transform duration-700"
                  style={{
                    transform: prefersReduced
                      ? 'none'
                      : 'rotateX(8deg) rotateY(-6deg) rotateZ(1deg)',
                    transformStyle: 'preserve-3d',
                  }}
                >
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
                        className="absolute cursor-pointer transition-all duration-500 ease-out select-none group"
                        style={{
                          left: pos.left,
                          top: pos.top,
                          zIndex: isActive ? 50 : pos.zIndex,
                          transform: isActive
                            ? 'translate3d(0, -18px, 40px) scale(1.05)'
                            : isPast
                            ? 'translate3d(0, -6px, 10px) scale(0.99)'
                            : 'translate3d(0, 0, 0) scale(0.96)',
                        }}
                      >
                        {/* 3D Physical Extruded Shadow Layer */}
                        <div
                          aria-hidden="true"
                          className={`absolute inset-0 rounded-2xl transition-all duration-500 pointer-events-none -z-10 ${
                            isActive
                              ? 'translate-y-4 bg-black/90 shadow-[0_20px_45px_rgba(0,0,0,0.95),0_0_35px_rgba(252,102,3,0.45)]'
                              : 'translate-y-2 bg-black/75 shadow-[0_12px_24px_rgba(0,0,0,0.8)]'
                          }`}
                        />

                        {/* Slab Surface: Ultra-Refined Smoked Glass & Rim Lighting */}
                        <div
                          className={`relative w-[190px] sm:w-[225px] md:w-[245px] lg:w-[255px] h-[100px] sm:h-[115px] md:h-[125px] rounded-2xl p-4 sm:p-4.5 flex flex-col justify-between backdrop-blur-xl transition-all duration-500 ${
                            isActive
                              ? 'bg-gradient-to-br from-[#1A1B24]/95 via-[#13141C]/95 to-[#0E0F15]/95 border-2 border-[#FC6603] shadow-[0_0_35px_rgba(252,102,3,0.4),inset_0_1px_2px_rgba(255,255,255,0.4)]'
                              : isPast
                              ? 'bg-[#101117]/80 border border-[#FC6603]/30 hover:border-[#FC6603]/60 hover:bg-[#14151F]/90'
                              : 'bg-[#0E0F14]/70 border border-white/[0.08] hover:border-white/25 hover:bg-[#12131A]/85'
                          }`}
                        >
                          {/* Top Specular Rim Reflection */}
                          <div
                            aria-hidden="true"
                            className="absolute top-0 inset-x-4 h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent pointer-events-none"
                          />

                          {/* Card Top: Number + Tool Icon */}
                          <div className="flex items-start justify-between">
                            {/* Number: Solid metallic gradient when active, architectural wireframe stroke when inactive */}
                            <span
                              className={`font-display font-black text-3xl sm:text-4xl md:text-[44px] leading-none transition-all duration-500 ${
                                isActive
                                  ? 'bg-gradient-to-br from-[#FFA34D] via-[#FC6603] to-[#D84C00] bg-clip-text text-transparent drop-shadow-[0_0_14px_rgba(252,102,3,0.6)]'
                                  : 'text-transparent [-webkit-text-stroke:1.25px_rgba(255,255,255,0.3)] group-hover:[-webkit-text-stroke:1.25px_rgba(255,255,255,0.5)]'
                              }`}
                            >
                              {phase.number}
                            </span>

                            {/* Top Right Tool Icon */}
                            <div
                              className={`p-1.5 rounded-lg transition-all duration-300 ${
                                isActive
                                  ? 'text-[#FC6603] bg-[#FC6603]/15 shadow-[0_0_12px_rgba(252,102,3,0.4)]'
                                  : 'text-white/40 group-hover:text-white/70'
                              }`}
                            >
                              {phase.renderIcon()}
                            </div>
                          </div>

                          {/* Card Bottom: Status Beacon + Step Name */}
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-1.5 font-mono text-[10.5px] sm:text-[11.5px] font-bold tracking-[0.18em] uppercase">
                              <span
                                className={`w-1.5 h-1.5 rounded-full transition-all duration-300 ${
                                  isActive
                                    ? 'bg-[#FC6603] shadow-[0_0_8px_#FC6603]'
                                    : isPast
                                    ? 'bg-[#FC6603]/60'
                                    : 'bg-white/20 group-hover:bg-white/50'
                                }`}
                              />
                              <span
                                className={`transition-colors duration-300 ${
                                  isActive ? 'text-white font-extrabold' : isPast ? 'text-white/70' : 'text-white/40 group-hover:text-white/70'
                                }`}
                              >
                                {phase.stepName}
                              </span>
                            </div>

                            {/* Active Mini Waveform / Telemetry */}
                            {isActive && (
                              <div className="flex items-center gap-0.5" title="Execution Active">
                                <span className="w-[2px] h-2 bg-[#FC6603] animate-pulse rounded-full" />
                                <span className="w-[2px] h-3.5 bg-[#FC6603] animate-pulse rounded-full [animation-delay:150ms]" />
                                <span className="w-[2px] h-2.5 bg-[#FC6603] animate-pulse rounded-full [animation-delay:300ms]" />
                              </div>
                            )}
                          </div>
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Floating Bottom Holographic Readout (No box, pure open space) */}
                <div className="absolute bottom-1 inset-x-2 sm:inset-x-6 z-20 flex items-center justify-between font-mono text-[9.5px] sm:text-[10px] tracking-[0.18em] uppercase text-white/50">
                  <div className="flex items-center gap-2">
                    <span className="text-[#FC6603] font-bold">[</span>
                    <span className="text-white/80">
                      0{activeLevel + 1} — {PHASES[activeLevel].title.toUpperCase()}
                    </span>
                    <span className="text-[#FC6603] font-bold">]</span>
                  </div>

                  <div className="flex items-center gap-1.5 text-[#FC6603]">
                    <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] animate-pulse" />
                    <span className="font-semibold tracking-[0.14em]">AUTO-SCROLL SYNC</span>
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

      {/* Global CSS keyframes for floating ember particles & slow spin */}
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
            transform: translateY(-28px) scale(1.3);
            opacity: 0.15;
          }
        }
        @keyframes spinSlow {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        .animate-spin-slow {
          animation: spinSlow 12s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default HowWeWorkSection;
