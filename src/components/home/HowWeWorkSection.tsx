import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

interface ProcessPhase {
  number: string;
  title: string;
  deliverable: string;
  description: string;
  specTag: string;
}

const PHASES: ProcessPhase[] = [
  {
    number: '01',
    title: 'Discover & Map',
    deliverable: '360° Technical & GEO Moat Blueprint',
    description: 'Comprehensive audit of technical debt, competitor authority, search intent capture, and Generative Engine (GEO) answer gaps.',
    specTag: 'AUDIT & BLUEPRINT',
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    deliverable: 'Information Architecture & Paid Playbook',
    description: 'Architecting custom site structure, high-intent topical clusters, conversion wireframes, and omnichannel paid acquisition funnels.',
    specTag: 'SYSTEM ARCHITECTURE',
  },
  {
    number: '03',
    title: 'Build & Launch',
    deliverable: 'Production Deployment & Campaign Ignition',
    description: 'Sub-second frontend engineering, headless CMS integration, automated CRM tracking, and synchronized ad campaign ignition.',
    specTag: 'DEPLOYMENT & IGNITION',
  },
  {
    number: '04',
    title: 'Scale & Compound',
    deliverable: 'Real-Time Telemetry & Blended Profit Scaling',
    description: 'Server-side CAPI telemetry, aggressive CRO experimentation, and continuous search dominance to multiply revenue non-linearly.',
    specTag: 'EXPONENTIAL SCALE',
  },
];

/**
 * HOW WE WORK — FOUR LEVELS. ONE CLIMB.
 * 
 * Interactive 3D diagonal staircase climb + typographic phase rows.
 * Features:
 * - 4-second auto-cycle with smooth progress bar
 * - Pause on hover & pause when tab/section is not visible
 * - Interactive platform and row selection with prev/next buttons
 * - CSS 3D diagonal staircase (bottom-left to top-right) with orange under-glow & elevation
 * - Dynamic camera angle shift per level
 * - ALPHA ↗️ marker illuminating at Level 04
 * - Small rising embers (no large blurred orbs)
 * - Full prefers-reduced-motion support
 */
export const HowWeWorkSection: React.FC = () => {
  const [activeLevel, setActiveLevel] = useState<number>(0);
  const [progress, setProgress] = useState<number>(0);
  const prefersReduced = useReducedMotion();

  const sectionRef = useRef<HTMLElement>(null);
  const isHoveredRef = useRef<boolean>(false);
  const isVisibleRef = useRef<boolean>(true);
  const isInViewRef = useRef<boolean>(true);
  const lastTimeRef = useRef<number>(performance.now());
  const progressRef = useRef<number>(0);

  const CYCLE_DURATION = 4000; // 4 seconds per level

  // Select a level and restart timer progress
  const selectLevel = useCallback((level: number) => {
    setActiveLevel((level + PHASES.length) % PHASES.length);
    progressRef.current = 0;
    setProgress(0);
    lastTimeRef.current = performance.now();
  }, []);

  const handlePrev = useCallback(() => {
    selectLevel(activeLevel - 1);
  }, [activeLevel, selectLevel]);

  const handleNext = useCallback(() => {
    selectLevel(activeLevel + 1);
  }, [activeLevel, selectLevel]);

  // Tab visibility detection
  useEffect(() => {
    const handleVisibilityChange = () => {
      isVisibleRef.current = document.visibilityState === 'visible';
      if (isVisibleRef.current) {
        lastTimeRef.current = performance.now();
      }
    };
    document.addEventListener('visibilitychange', handleVisibilityChange);
    return () => document.removeEventListener('visibilitychange', handleVisibilityChange);
  }, []);

  // Section in-view detection via IntersectionObserver
  useEffect(() => {
    if (!sectionRef.current) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        isInViewRef.current = entry.isIntersecting;
        if (entry.isIntersecting) {
          lastTimeRef.current = performance.now();
        }
      },
      { threshold: 0.15 }
    );
    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, []);

  // 60fps auto-cycle animation loop with progress interpolation
  useEffect(() => {
    if (prefersReduced) return;

    let animId: number;

    const tick = (now: number) => {
      const delta = now - lastTimeRef.current;
      lastTimeRef.current = now;

      // Only advance progress if visible, in view, and not hovered
      if (isVisibleRef.current && isInViewRef.current && !isHoveredRef.current) {
        progressRef.current += delta;
        if (progressRef.current >= CYCLE_DURATION) {
          progressRef.current = 0;
          setActiveLevel((prev) => (prev + 1) % PHASES.length);
        }
        setProgress(Math.min((progressRef.current / CYCLE_DURATION) * 100, 100));
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, [prefersReduced]);

  // Camera angle transforms based on active level (slight upward shift per level)
  const cameraAngles = [
    { rotateX: 52, rotateZ: -28, translateY: 16 },
    { rotateX: 49, rotateZ: -26, translateY: 4 },
    { rotateX: 46, rotateZ: -24, translateY: -8 },
    { rotateX: 43, rotateZ: -22, translateY: -22 },
  ];
  const currentAngle = cameraAngles[activeLevel] || cameraAngles[0];

  // Platform coordinates along diagonal staircase (bottom-left to top-right)
  const platformCoords = [
    { x: -110, y: 105, z: 0 },
    { x: -35, y: 35, z: 45 },
    { x: 40, y: -35, z: 90 },
    { x: 115, y: -105, z: 135 },
  ];

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="process-heading"
      className="relative py-20 sm:py-24 md:py-32 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden select-none"
      onMouseEnter={() => {
        isHoveredRef.current = true;
      }}
      onMouseLeave={() => {
        isHoveredRef.current = false;
        lastTimeRef.current = performance.now();
      }}
    >
      {/* Top Hairline Ambient Accent */}
      <div
        aria-hidden="true"
        className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-[#FC6603]/30 to-transparent pointer-events-none"
      />

      {/* Subtle Background Radial Ambient Glow */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[480px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.05)_0%,transparent_70%)] pointer-events-none blur-3xl"
      />

      <div className="relative z-10 max-w-[1440px] 2xl:max-w-[1600px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10">
        {/* ================= SECTION HEADER ================= */}
        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-8 mb-16 sm:mb-20 md:mb-24 pb-8 border-b border-white/[0.06]">
          {/* Left: Eyebrow + Huge Bricolage Heading */}
          <div className="max-w-3xl">
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-white/70">06 OUR PROCESS</span>
            </div>

            <h2
              id="process-heading"
              className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl lg:text-[64px] text-white tracking-[-0.03em] leading-[1.05]"
            >
              FOUR LEVELS. <span className="text-[#FC6603]">ONE CLIMB.</span>
            </h2>
          </div>

          {/* Right: Short Intro Paragraph + Full Process Link */}
          <div className="max-w-md flex flex-col justify-end">
            <p className="font-sans text-[15px] sm:text-[16px] text-[#A1A1AA] leading-relaxed mb-4">
              We replace fragmented guesswork with an engineered, 4-stage compounding growth framework. Each stage locks in revenue foundations before accelerating spend.
            </p>
            <Link
              to="/about#process"
              className="inline-flex items-center gap-2 font-mono text-[11.5px] sm:text-[12px] font-bold text-[#FC6603] hover:text-white uppercase tracking-[0.16em] transition-colors group"
            >
              <span>See the full process</span>
              <span className="transition-transform duration-200 group-hover:translate-x-1">→</span>
            </Link>
          </div>
        </div>

        {/* ================= TWO-COLUMN ROW ================= */}
        {/* Mobile: 3D scene stacks above the rows (flex-col-reverse lg:grid) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
          {/* ================= LEFT COLUMN: 4 TYPOGRAPHIC PHASE ROWS ================= */}
          <div className="lg:col-span-6 flex flex-col order-2 lg:order-1">
            {PHASES.map((phase, idx) => {
              const isActive = idx === activeLevel;

              return (
                <div
                  key={phase.number}
                  onClick={() => selectLevel(idx)}
                  className={`group relative py-6 sm:py-7 border-b border-white/[0.08] cursor-pointer transition-colors duration-300 ${
                    idx === 0 ? 'border-t border-white/[0.08]' : ''
                  }`}
                >
                  {/* Left Active Hairline Accent Indicator */}
                  <div
                    className={`absolute left-0 top-0 bottom-0 w-[2px] bg-[#FC6603] transition-opacity duration-300 ${
                      isActive ? 'opacity-100 shadow-[0_0_8px_#FC6603]' : 'opacity-0'
                    }`}
                  />

                  {/* Header Row: Number + Phase Title */}
                  <div className="flex items-center justify-between gap-4 pl-3 sm:pl-4">
                    <div className="flex items-baseline gap-4 sm:gap-6">
                      {/* DM Mono Number */}
                      <span
                        className={`font-mono text-sm sm:text-base font-bold tracking-[0.16em] transition-colors duration-300 ${
                          isActive ? 'text-[#FC6603]' : 'text-white/40 group-hover:text-white/70'
                        }`}
                      >
                        {phase.number}
                      </span>

                      {/* Large Bricolage Uppercase Title */}
                      <h3
                        className={`font-display font-extrabold text-2xl sm:text-3xl md:text-[34px] tracking-[-0.02em] uppercase transition-colors duration-300 leading-tight ${
                          isActive ? 'text-white' : 'text-white/40 group-hover:text-white/80'
                        }`}
                      >
                        {phase.title}
                      </h3>
                    </div>

                    {/* Active State Beacon / Arrow */}
                    <div className="shrink-0 flex items-center gap-2">
                      <span
                        className={`font-mono text-[10px] font-semibold tracking-[0.16em] uppercase px-2 py-0.5 rounded transition-all duration-300 ${
                          isActive
                            ? 'bg-[#FC6603]/15 text-[#FC6603] border border-[#FC6603]/40'
                            : 'opacity-0 text-white/30'
                        }`}
                      >
                        {phase.specTag}
                      </span>
                    </div>
                  </div>

                  {/* Accordion Expandable Content for Active Phase */}
                  <AnimatePresence initial={false}>
                    {isActive && (
                      <motion.div
                        initial={prefersReduced ? { opacity: 1, height: 'auto' } : { opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={prefersReduced ? { opacity: 0, height: 0 } : { opacity: 0, height: 0 }}
                        transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden pl-3 sm:pl-4"
                      >
                        <div className="pt-3 sm:pt-4">
                          {/* Short Description */}
                          <p className="font-sans text-[14px] sm:text-[15px] text-[#A1A1AA] leading-relaxed max-w-xl">
                            {phase.description}
                          </p>

                          {/* Deliverable Line in Brand Orange */}
                          <div className="mt-3.5 flex items-center gap-2 font-mono text-[11px] sm:text-[12px] font-bold text-[#FC6603] tracking-[0.14em] uppercase">
                            <span className="text-[#FC6603] font-extrabold">YOU RECEIVE —</span>
                            <span className="text-white/90">{phase.deliverable}</span>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}

            {/* Bottom Progress HUD & Navigation Buttons */}
            <div className="mt-8 pt-4 flex items-center justify-between gap-4">
              {/* Level Indicator & Progress Bar */}
              <div className="flex-1 max-w-xs">
                <div className="flex items-center justify-between font-mono text-[10.5px] uppercase tracking-[0.16em] text-white/50 mb-2">
                  <span>LEVEL {PHASES[activeLevel].number} / 04</span>
                  <span>{Math.round(progress)}%</span>
                </div>
                {/* Thin Animated Progress Bar */}
                <div className="h-[2px] w-full bg-white/[0.08] rounded-full overflow-hidden">
                  <div
                    className="h-full bg-[#FC6603] transition-all duration-100 ease-linear shadow-[0_0_8px_#FC6603]"
                    style={{ width: `${progress}%` }}
                  />
                </div>
              </div>

              {/* Round Prev / Next Navigation Buttons */}
              <div className="flex items-center gap-2.5">
                <button
                  type="button"
                  onClick={handlePrev}
                  aria-label="Previous level"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#FC6603]/60 hover:bg-[#FC6603]/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="15 18 9 12 15 6" />
                  </svg>
                </button>
                <button
                  type="button"
                  onClick={handleNext}
                  aria-label="Next level"
                  className="w-10 h-10 rounded-full border border-white/10 bg-white/[0.03] hover:border-[#FC6603]/60 hover:bg-[#FC6603]/10 text-white/70 hover:text-white flex items-center justify-center transition-all duration-200 cursor-pointer active:scale-95 shadow-sm"
                >
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4">
                    <polyline points="9 18 15 12 9 6" />
                  </svg>
                </button>
              </div>
            </div>
          </div>

          {/* ================= RIGHT COLUMN: 3D DIAGONAL STAIRCASE CLIMB ================= */}
          <div className="lg:col-span-6 relative flex items-center justify-center order-1 lg:order-2 min-h-[440px] sm:min-h-[500px] md:min-h-[540px]">
            {/* 3D Scene Wrapper with Perspective */}
            <div
              className="relative w-full max-w-[500px] h-[440px] sm:h-[480px] md:h-[520px] flex items-center justify-center"
              style={{ perspective: '1200px' }}
            >
              {/* Rising Small Ember Particles (No large blurred orbs) */}
              <div aria-hidden="true" className="absolute inset-0 pointer-events-none overflow-hidden">
                {[
                  { left: '20%', duration: 4.2, delay: 0 },
                  { left: '35%', duration: 5.1, delay: 1.2 },
                  { left: '50%', duration: 3.8, delay: 0.5 },
                  { left: '65%', duration: 4.9, delay: 2.1 },
                  { left: '78%', duration: 4.4, delay: 1.6 },
                  { left: '42%', duration: 5.6, delay: 2.8 },
                  { left: '28%', duration: 3.9, delay: 3.2 },
                  { left: '85%', duration: 4.7, delay: 0.8 },
                ].map((particle, i) => (
                  <span
                    key={i}
                    className="absolute bottom-0 w-[2.5px] h-[2.5px] rounded-full bg-[#FC6603] shadow-[0_0_6px_#FC6603] opacity-0"
                    style={{
                      left: particle.left,
                      animation: prefersReduced
                        ? 'none'
                        : `processEmberRise ${particle.duration}s cubic-bezier(0.25, 1, 0.5, 1) infinite ${particle.delay}s`,
                    }}
                  />
                ))}
              </div>

              {/* 3D Isometric Stage with Camera Shift */}
              <div
                className="relative w-full h-full flex items-center justify-center will-change-transform"
                style={{
                  transformStyle: 'preserve-3d',
                  transform: prefersReduced
                    ? 'rotateX(48deg) rotateZ(-26deg)'
                    : `rotateX(${currentAngle.rotateX}deg) rotateZ(${currentAngle.rotateZ}deg) translateY(${currentAngle.translateY}px)`,
                  transition: 'transform 0.8s cubic-bezier(0.16, 1, 0.3, 1)',
                }}
              >
                {/* Thin Orange Light Beam running up the climb */}
                <div
                  aria-hidden="true"
                  className="absolute pointer-events-none"
                  style={{
                    width: '340px',
                    height: '2px',
                    transform: 'translate3d(0, 0, 60px) rotate(-45deg)',
                    background: 'linear-gradient(90deg, rgba(252,102,3,0.15) 0%, rgba(252,102,3,0.9) 60%, #FFFFFF 100%)',
                    boxShadow: '0 0 12px rgba(252,102,3,0.7)',
                  }}
                />

                {/* 4 Dark Glass Platforms Floating in Staircase Climb */}
                {PHASES.map((phase, idx) => {
                  const isActive = idx === activeLevel;
                  const isPast = idx < activeLevel;
                  const coord = platformCoords[idx];

                  // Active platform lifts upward in 3D space
                  const liftZ = isActive ? 28 : isPast ? 8 : 0;
                  const liftY = isActive ? -12 : 0;

                  return (
                    <div
                      key={phase.number}
                      onClick={() => selectLevel(idx)}
                      role="button"
                      tabIndex={0}
                      aria-label={`Select ${phase.title}`}
                      className="absolute cursor-pointer will-change-transform transition-all duration-500 ease-out"
                      style={{
                        width: '180px',
                        height: '92px',
                        transform: `translate3d(${coord.x}px, ${coord.y + liftY}px, ${coord.z + liftZ}px)`,
                        transformStyle: 'preserve-3d',
                      }}
                    >
                      {/* 3D Glass Platform Slab */}
                      <div
                        className={`relative w-full h-full rounded-2xl p-4 flex flex-col justify-between transition-all duration-500 border backdrop-blur-xl ${
                          isActive
                            ? 'bg-[#151722]/95 border-[#FC6603] shadow-[0_20px_45px_-8px_rgba(252,102,3,0.45),0_0_30px_rgba(252,102,3,0.3),inset_0_0_15px_rgba(252,102,3,0.25)]'
                            : isPast
                            ? 'bg-[#101117]/85 border-[#FC6603]/30 shadow-[0_15px_30px_rgba(0,0,0,0.7),0_0_16px_rgba(252,102,3,0.15)]'
                            : 'bg-[#0E0F14]/70 border-white/[0.08] shadow-[0_15px_30px_rgba(0,0,0,0.6)] hover:border-white/20'
                        }`}
                      >
                        {/* Top Platform Bar: Monogram + Status Beacon */}
                        <div className="flex items-center justify-between">
                          <div
                            className={`w-7 h-7 rounded-lg font-mono text-[11px] font-bold flex items-center justify-center transition-colors duration-300 ${
                              isActive
                                ? 'bg-[#FC6603] text-black shadow-[0_0_12px_#FC6603]'
                                : isPast
                                ? 'bg-[#FC6603]/20 text-[#FC6603] border border-[#FC6603]/40'
                                : 'bg-white/[0.04] text-white/50 border border-white/10'
                            }`}
                          >
                            {phase.number}
                          </div>

                          {/* Live Status Beacon */}
                          <div
                            className={`w-2 h-2 rounded-full transition-all duration-300 ${
                              isActive
                                ? 'bg-[#FC6603] shadow-[0_0_8px_#FC6603] ring-4 ring-[#FC6603]/20'
                                : isPast
                                ? 'bg-[#FC6603]/60'
                                : 'bg-white/20'
                            }`}
                          />
                        </div>

                        {/* Bottom Platform Label */}
                        <div>
                          <span
                            className={`font-display font-extrabold text-[13.5px] uppercase tracking-tight block transition-colors duration-300 ${
                              isActive ? 'text-white' : isPast ? 'text-white/80' : 'text-white/40'
                            }`}
                          >
                            {phase.title}
                          </span>
                          <span className="font-mono text-[8.5px] uppercase tracking-[0.16em] text-[#FC6603] block mt-0.5">
                            LEVEL {phase.number}
                          </span>
                        </div>

                        {/* Under-Glow Neon Accent Plate */}
                        <div
                          aria-hidden="true"
                          className={`absolute -inset-1 rounded-2xl pointer-events-none transition-opacity duration-500 -z-10 ${
                            isActive
                              ? 'opacity-100 bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.35)_0%,transparent_70%)]'
                              : 'opacity-0'
                          }`}
                        />
                      </div>
                    </div>
                  );
                })}

                {/* Top ALPHA ↗️ Pinnacle Marker */}
                <div
                  className="absolute will-change-transform transition-all duration-500 ease-out"
                  style={{
                    transform: 'translate3d(155px, -150px, 175px)',
                    transformStyle: 'preserve-3d',
                  }}
                >
                  <div
                    className={`px-4 py-2 rounded-xl border font-mono text-[11px] font-bold tracking-[0.18em] uppercase flex items-center gap-1.5 transition-all duration-500 ${
                      activeLevel === 3
                        ? 'bg-[#FC6603] text-black border-[#FC6603] shadow-[0_0_30px_rgba(252,102,3,0.7),0_0_60px_rgba(252,102,3,0.35)] scale-110'
                        : 'bg-[#12131A]/85 text-white/50 border-white/10 shadow-[0_10px_20px_rgba(0,0,0,0.7)]'
                    }`}
                  >
                    <span>ALPHA</span>
                    <span className="text-[12px] font-extrabold">↗</span>
                    {activeLevel === 3 && (
                      <span className="w-1.5 h-1.5 rounded-full bg-black animate-ping ml-1" />
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Global CSS for lightweight 60fps particle rise */}
      <style>{`
        @keyframes processEmberRise {
          0% {
            transform: translate3d(0, 0, 0) scale(0.6);
            opacity: 0;
          }
          15% {
            opacity: 0.9;
          }
          80% {
            opacity: 0.7;
          }
          100% {
            transform: translate3d(0, -420px, 0) scale(1.3);
            opacity: 0;
          }
        }
      `}</style>
    </section>
  );
};

export default HowWeWorkSection;