import React, { useState, useEffect, useRef, useId } from 'react';
import { Link } from 'react-router-dom';

/* =========================================================================
   PROCESS PHASES CONFIGURATION
   ========================================================================= */
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bottomLabel: string;
  isDefaultActive?: boolean; // Card 02 in mockup has the signature glowing orange border
  renderIcon: () => React.ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover & Map',
    description: 'Understand your business, audience and opportunities.',
    bottomLabel: 'CLARITY & DIRECTION',
    renderIcon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full shrink-0"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hww-lens-bg" cx="45%" cy="45%" r="60%">
            <stop offset="0%" stopColor="#FC6603" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#FC6603" stopOpacity="0" />
          </radialGradient>
          <linearGradient id="hww-sweep-cone" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FC6603" stopOpacity="0.45" />
            <stop offset="100%" stopColor="#FC6603" stopOpacity="0" />
          </linearGradient>
        </defs>

        {/* Background Soft Optical Glow */}
        <circle cx="20" cy="20" r="14" fill="url(#hww-lens-bg)" />

        {/* Outer Coordinate Target Grid / Orbit */}
        <circle cx="20" cy="20" r="17" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="20" cy="20" r="13" stroke="rgba(255, 255, 255, 0.18)" strokeWidth="1" />

        {/* Micro Optics Reticle Crosshairs */}
        <line x1="20" y1="9" x2="20" y2="12" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="20" y1="28" x2="20" y2="31" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="9" y1="20" x2="12" y2="20" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.2" strokeLinecap="round" />
        <line x1="28" y1="20" x2="31" y2="20" stroke="rgba(255, 255, 255, 0.55)" strokeWidth="1.2" strokeLinecap="round" />
        <circle cx="20" cy="20" r="1.5" fill="#FFFFFF" opacity="0.75" />

        {/* Live 360° Rotating Radar Sweep Line */}
        <g className="hww-icon-sweep">
          <line x1="20" y1="20" x2="33" y2="20" stroke="#FC6603" strokeWidth="2" strokeLinecap="round" />
          <polygon points="20,20 33,14 33,20" fill="url(#hww-sweep-cone)" />
        </g>

        {/* Expanding Sonar Ping Waves from Discovery Target */}
        <circle cx="27" cy="14" r="3" className="stroke-[#FC6603] fill-none hww-icon-ping" />

        {/* Detected Opportunity Beacon */}
        <circle cx="27" cy="14" r="2.5" fill="#FC6603" className="hww-beacon-pulse" />

        {/* Main Magnifier Lens Frame (Bold High-Contrast Off-White) */}
        <circle cx="20" cy="20" r="12" stroke="#FFFFFF" strokeWidth="2.4" strokeLinecap="round" />

        {/* Heavy Precision Tactical Handle in Brand Orange */}
        <path d="M28.5 28.5L38.5 38.5" stroke="#FC6603" strokeWidth="3.2" strokeLinecap="round" />
        {/* Specular grip highlight */}
        <path d="M33 33L37.5 37.5" stroke="#FFFFFF" strokeWidth="1.4" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    description: 'Shape the plan, structure and campaigns around your goals.',
    bottomLabel: 'STRATEGY & BLUEPRINT',
    renderIcon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full shrink-0"
        aria-hidden="true"
      >
        <defs>
          <radialGradient id="hww-core-glow" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FC6603" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FC6603" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Subtle Architectural Orbit / Alignment Boundary */}
        <circle cx="24" cy="24" r="17" stroke="rgba(255, 255, 255, 0.12)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Neutral Circuit Bus Lines */}
        <line x1="24" y1="24" x2="24" y2="9" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="39" y2="24" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="24" y2="39" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />
        <line x1="24" y1="24" x2="9" y2="24" stroke="rgba(255, 255, 255, 0.25)" strokeWidth="2" strokeLinecap="round" />

        {/* 45-degree diagonal interconnection traces */}
        <path d="M13 13L24 24L35 13M13 35L24 24L35 35" stroke="rgba(252, 102, 3, 0.2)" strokeWidth="1" />

        {/* Flowing Animated Data Packets (Orange energy pulses moving along buses) */}
        <line x1="24" y1="24" x2="24" y2="9" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" className="hww-circuit-flow" />
        <line x1="24" y1="24" x2="39" y2="24" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" className="hww-circuit-flow" />
        <line x1="24" y1="24" x2="24" y2="39" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" className="hww-circuit-flow" />
        <line x1="24" y1="24" x2="9" y2="24" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" className="hww-circuit-flow" />

        {/* 4 Satellite Strategy Nodes (High contrast off-white rings with dark centers) */}
        <circle cx="24" cy="9" r="3.5" fill="#0C0D12" stroke="#FFFFFF" strokeWidth="2.2" />
        <circle cx="24" cy="9" r="1.5" fill="#FC6603" />

        <circle cx="39" cy="24" r="3.5" fill="#0C0D12" stroke="#FFFFFF" strokeWidth="2.2" />
        <circle cx="39" cy="24" r="1.5" fill="#FC6603" />

        <circle cx="24" cy="39" r="3.5" fill="#0C0D12" stroke="#FFFFFF" strokeWidth="2.2" />
        <circle cx="24" cy="39" r="1.5" fill="#FC6603" />

        <circle cx="9" cy="24" r="3.5" fill="#0C0D12" stroke="#FFFFFF" strokeWidth="2.2" />
        <circle cx="9" cy="24" r="1.5" fill="#FC6603" />

        {/* Central Pulsing Sonar Ring */}
        <circle cx="24" cy="24" r="5" className="stroke-[#FC6603] fill-none hww-icon-ping" />

        {/* Ambient Core Radial Glow */}
        <circle cx="24" cy="24" r="10" fill="url(#hww-core-glow)" />

        {/* Central Engineering Nexus Core in Brand Orange */}
        <circle cx="24" cy="24" r="5.5" fill="#FC6603" stroke="#FFFFFF" strokeWidth="2" className="hww-core-pulsing" />
        <circle cx="24" cy="24" r="2" fill="#FFFFFF" />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build & Launch',
    description: 'Bring your website, content and campaigns to life.',
    bottomLabel: 'BUILD & DEPLOY',
    renderIcon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hww-shuttle-wing" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFA34D" />
            <stop offset="100%" stopColor="#FC6603" />
          </linearGradient>
          <linearGradient id="hww-shuttle-dark" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FC6603" />
            <stop offset="100%" stopColor="#D84F00" />
          </linearGradient>
        </defs>

        {/* Code Brackets < and > (Bold, High-Contrast White) */}
        <path
          d="M12 15L5 24L12 33"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M36 15L43 24L36 33"
          stroke="#FFFFFF"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Supersonic Launch Shuttle & Propulsion Exhaust */}
        <g className="hww-rocket-anim">
          {/* Animated Plasma Thruster Trails (Firing at 225°) */}
          <line
            x1="20"
            y1="28"
            x2="12"
            y2="36"
            stroke="#FC6603"
            strokeWidth="2.2"
            strokeLinecap="round"
            className="hww-thrust-flow"
          />
          <line
            x1="23"
            y1="31"
            x2="17"
            y2="37"
            stroke="#FFA34D"
            strokeWidth="1.6"
            strokeLinecap="round"
            className="hww-thrust-flow"
          />

          {/* Thruster Engine Glow Core */}
          <circle cx="21" cy="28.5" r="2.5" fill="#FC6603" className="hww-beacon-pulse" />
          <circle cx="21" cy="28.5" r="1.2" fill="#FFFFFF" />

          {/* Aerodynamic Launch Craft / Shuttle Body Facets (Facing 45° Northeast) */}
          {/* Main Port Wing */}
          <path
            d="M34 14L15 22.5L22 26.5L34 14Z"
            fill="url(#hww-shuttle-wing)"
          />
          {/* Starboard Underwing Facet */}
          <path
            d="M34 14L27 32L22 26.5L34 14Z"
            fill="url(#hww-shuttle-dark)"
          />
          {/* Center Dorsal Spine / Cockpit Keel */}
          <path
            d="M34 14L23.5 25.5L22 26.5L34 14Z"
            fill="#FFFFFF"
            opacity="0.85"
          />
          {/* Nosecone Apex Specular Point */}
          <circle cx="34" cy="14" r="1" fill="#FFFFFF" />
        </g>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scale & Compound',
    description: 'Measure what works. Refine, improve and grow.',
    bottomLabel: 'MEASURE & IMPROVE',
    isDefaultActive: true, // Glow animation stays on the last card 04
    renderIcon: () => (
      <svg
        viewBox="0 0 48 48"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-full h-full shrink-0"
        aria-hidden="true"
      >
        <defs>
          <linearGradient id="hww-bar-active" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#FFA34D" />
            <stop offset="60%" stopColor="#FC6603" />
            <stop offset="100%" stopColor="#D84F00" />
          </linearGradient>
          <radialGradient id="hww-apex-flare" cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#FC6603" stopOpacity="0.5" />
            <stop offset="100%" stopColor="#FC6603" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Baseline Floor Foundation */}
        <line
          x1="6"
          y1="41"
          x2="42"
          y2="41"
          stroke="rgba(255, 255, 255, 0.22)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />

        {/* 4 Ascending Metric Columns (Clean, bold, solid off-white and glowing orange) */}
        {/* Bar 1 (Initial Baseline) */}
        <rect x="7.5" y="29" width="6" height="12" rx="1.5" fill="#E4E4E7" opacity="0.85" />

        {/* Bar 2 (Validated Traction) */}
        <rect x="15.5" y="22" width="6" height="19" rx="1.5" fill="#F4F4F5" opacity="0.95" />

        {/* Bar 3 (System Scaling) */}
        <rect x="23.5" y="15" width="6" height="26" rx="1.5" fill="#FFFFFF" />

        {/* Bar 4 (Apex Compound Velocity - Brand Orange with specular top) */}
        <rect
          x="31.5"
          y="8"
          width="6.5"
          height="33"
          rx="1.5"
          fill="url(#hww-bar-active)"
          stroke="#FC6603"
          strokeWidth="1"
        />
        {/* Bar 4 Specular Top Cap */}
        <rect x="32" y="8.5" width="5.5" height="1.5" rx="0.75" fill="#FFFFFF" opacity="0.8" />

        {/* Exponential Compounding Growth Vector (Smooth upward sweeping curve) */}
        <path
          d="M8 28 C 15 26, 23 18, 38 8"
          stroke="#FC6603"
          strokeWidth="2.6"
          strokeLinecap="round"
          className="hww-curve-flow"
        />

        {/* Dynamic Velocity Arrowhead at Apex */}
        <path
          d="M30 8H38V16"
          stroke="#FC6603"
          strokeWidth="2.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        />

        {/* Ambient Glow Aura at Apex */}
        <circle cx="38" cy="8" r="9" fill="url(#hww-apex-flare)" pointerEvents="none" />

        {/* Pulsing Sonar Ping Ripple from Milestone Peak */}
        <circle cx="38" cy="8" r="3.5" className="stroke-[#FC6603] fill-none hww-icon-ping" />

        {/* Apex Milestone Beacon Flare */}
        <circle cx="38" cy="8" r="2.8" fill="#FFFFFF" stroke="#FC6603" strokeWidth="1.5" className="hww-apex-node" />
      </svg>
    ),
  },
];

/**
 * HOW WE WORK — SMOOTH WAVE ENTRANCE ANIMATION SYSTEM
 *
 * Requirements fulfilled:
 * 1. TRIGGER: IntersectionObserver, threshold 0.25, rootMargin: '0px 0px -8% 0px'. Plays ONCE only.
 * 2. TIMELINE (~1.9s total):
 *    - 0ms: Eyebrow // HOW WE WORK fades in, letter-spacing settles.
 *    - 0-600ms: Heading lines reveal upward from clip mask (line 1 first, line 2 delayed 120ms).
 *    - 200ms: Subtext fades up 16px.
 *    - 300ms: Orange wavy line draws in left-to-right (1300ms, cubic-bezier(0.16, 1, 0.3, 1)).
 *    - 400ms: Card 01 wave entrance (rotates -1deg, crests, dips, settles at 0px).
 *    - 550ms: Card 02 wave entrance (rotates 1deg, crests, dips, settles at 32px).
 *    - 700ms: Card 03 wave entrance (rotates -1deg, crests, dips, settles at 8px).
 *    - 850ms: Card 04 wave entrance (rotates 1deg, crests, dips, settles at 36px).
 *    - 1450ms: Bottom divider + Prompt + LET'S TALK CTA fade up last.
 * 3. Exact wave keyframes with calc(var(--final-y) - 12px) crest, calc(var(--final-y) + 3px) dip.
 * 4. Inner content stagger starting 200ms after each card starts.
 * 5. Brief orange border glow as each card lands, fading over 800ms. Card 02 retains its default active glow.
 * 6. Smoothness rules: translate3d(), will-change removed after animationend, backface-visibility: hidden.
 * 7. Fallbacks: .hww-anim-ready ensures cards are visible if JS fails; 2.5s safety timeout.
 */
export const HowWeWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const filterId = useId();

  const [isAnimReady, setIsAnimReady] = useState(false);
  const [isInView, setIsInView] = useState(false);
  const [isSettled, setIsSettled] = useState(false);
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  useEffect(() => {
    // 1. Mark ready for JS-driven hidden starting state
    setIsAnimReady(true);

    const section = sectionRef.current;
    if (!section) return;

    // Check reduced motion
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
      setIsInView(true);
      setIsSettled(true);
      return;
    }

    let hasTriggered = false;
    const triggerEntrance = () => {
      if (hasTriggered) return;
      hasTriggered = true;
      setIsInView(true);

      // Clean up observer and listeners once triggered (plays ONCE only)
      if (observer) {
        observer.disconnect();
      }
      window.removeEventListener('scroll', handleScrollCheck);
      window.removeEventListener('resize', handleScrollCheck);
      if (onScreenSafetyTimeout) {
        clearTimeout(onScreenSafetyTimeout);
      }
    };

    // 2. IntersectionObserver: threshold 0.25, rootMargin "0px 0px -8% 0px"
    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0];
        if (entry && (entry.isIntersecting || entry.intersectionRatio >= 0.25)) {
          triggerEntrance();
        }
      },
      {
        threshold: [0, 0.15, 0.25],
        rootMargin: '0px 0px -8% 0px',
      }
    );

    observer.observe(section);

    // 3. Robust scroll / Lenis check for smooth scroll arrival or pre-scrolled page refresh
    const handleScrollCheck = () => {
      if (hasTriggered || !sectionRef.current) return;
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      // Triggers when ~25% of section is inside viewport accounting for rootMargin
      if (rect.top <= vh * 0.75 && rect.bottom >= 0) {
        triggerEntrance();
      }
    };

    window.addEventListener('scroll', handleScrollCheck, { passive: true });
    window.addEventListener('resize', handleScrollCheck, { passive: true });

    // Initial check in case user refreshed directly at #process
    handleScrollCheck();

    // 4. Fallback: if observer hasn't fired after 2.5s WHILE the section is on screen, force in-view
    let onScreenSafetyTimeout: ReturnType<typeof setTimeout> | null = null;
    const checkSafetyLoop = setInterval(() => {
      if (hasTriggered || !sectionRef.current) {
        clearInterval(checkSafetyLoop);
        return;
      }
      const rect = sectionRef.current.getBoundingClientRect();
      const vh = window.innerHeight || document.documentElement.clientHeight;
      const isOnScreen = rect.top < vh && rect.bottom > 0;

      if (isOnScreen && !onScreenSafetyTimeout) {
        onScreenSafetyTimeout = setTimeout(() => {
          if (!hasTriggered) {
            triggerEntrance();
          }
        }, 2500);
      }
    }, 400);

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScrollCheck);
      window.removeEventListener('resize', handleScrollCheck);
      clearInterval(checkSafetyLoop);
      if (onScreenSafetyTimeout) {
        clearTimeout(onScreenSafetyTimeout);
      }
    };
  }, []);

  // Settle animation and release will-change ~2600ms after in-view (synced with Card 04 wave landing)
  useEffect(() => {
    if (isInView && !isSettled) {
      const settleTimer = setTimeout(() => {
        setIsSettled(true);
      }, 2600);
      return () => clearTimeout(settleTimer);
    }
  }, [isInView, isSettled]);

  return (
    <section
      ref={sectionRef}
      id="process"
      aria-labelledby="how-we-work-heading"
      className={`hww-section relative w-full bg-[#060709] py-14 sm:py-16 lg:py-20 overflow-x-clip selection:bg-[#FC6603] selection:text-black border-b border-white/[0.08] ${
        isAnimReady ? 'hww-anim-ready' : ''
      } ${isInView ? 'hww-in-view' : ''} ${isSettled ? 'hww-settled' : ''}`}
    >
      {/* Background ambient radial glow matching mockup */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.06)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 w-full">
        {/* =========================================================================
            SECTION HEADER: HEADINGS ON LEFT, CTA ON RIGHT
           ========================================================================= */}
        <div className="flex flex-col sm:flex-row items-start sm:items-end justify-between gap-6 sm:gap-8 mb-10 sm:mb-12 lg:mb-14">
          {/* LEFT SIDE: Section Eyebrow, Heading, and Subtext */}
          <div className="flex flex-col items-start text-left max-w-xl">
            {/* Eyebrow: // HOW WE WORK */}
            <div className="hww-eyebrow font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-white/80">HOW WE WORK</span>
            </div>

            {/* Heading: Four steps. One clear direction. */}
            <h2
              id="how-we-work-heading"
              className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] text-white"
            >
              <span className="block overflow-hidden pb-1">
                <span className="hww-heading-line hww-line-1">Four steps.</span>
              </span>
              <span className="block overflow-hidden pb-1">
                <span className="hww-heading-line hww-line-2 text-[#FC6603]">
                  One clear direction.
                </span>
              </span>
            </h2>

            {/* Supporting Text */}
            <p className="hww-subtext font-sans text-[15px] sm:text-[16px] text-[#A1A1AA] leading-relaxed mt-2.5 max-w-md">
              From understanding your business to building what comes next.
            </p>
          </div>

          {/* RIGHT SIDE: Brand CTA Button */}
          <div className="hww-cta-row flex items-center gap-3 shrink-0 self-start sm:self-end pb-1">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 pl-6 pr-2 sm:pl-7 sm:pr-2.5 py-2.5 sm:py-3 rounded-full bg-[#FC6603] text-white font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-[#ff5500] hover:shadow-[0_0_32px_rgba(252,102,3,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709]"
              data-cursor="CONNECT"
            >
              <span>LET'S TALK</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-black shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* =========================================================================
            CARDS STAGE WITH FLOWING WAVE CONNECTOR
           ========================================================================= */}
        <div className="relative w-full my-auto">
          {/*
            DESKTOP CONTINUOUS SVG WAVE (Behind cards)
            Draws smoothly across from left to right (300ms, duration 1300ms)
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 1200 420"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden lg:block absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <defs>
              <linearGradient id={`${filterId}-waveGlow`} x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#FC6603" stopOpacity="0.8" />
                <stop offset="50%" stopColor="#FFA34D" stopOpacity="1" />
                <stop offset="100%" stopColor="#FC6603" stopOpacity="0.9" />
              </linearGradient>
              <filter id={`${filterId}-neon`} x="-10%" y="-30%" width="120%" height="160%">
                <feGaussianBlur stdDeviation="3.5" result="blur" />
                <feMerge>
                  <feMergeNode in="blur" />
                  <feMergeNode in="SourceGraphic" />
                </feMerge>
              </filter>
            </defs>

            {/* Subtle Neutral Base Wave Line */}
            <path
              d="
                M -30,225
                C 0,220 5,178 15,175
                L 285,175
                C 292,175 295,235 305,235
                C 312,235 315,210 320,207
                L 590,207
                C 596,207 600,230 608,230
                C 616,230 620,186 625,183
                L 895,183
                C 902,183 906,232 914,232
                C 922,232 925,212 930,209
                L 1200,209
                C 1215,209 1235,175 1250,165
              "
              stroke="rgba(255, 255, 255, 0.12)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />

            {/* Glowing Orange Wave Line with Smooth Entrance Draw */}
            <path
              pathLength={1000}
              d="
                M -30,225
                C 0,220 5,178 15,175
                L 285,175
                C 292,175 295,235 305,235
                C 312,235 315,210 320,207
                L 590,207
                C 596,207 600,230 608,230
                C 616,230 620,186 625,183
                L 895,183
                C 902,183 906,232 914,232
                C 922,232 925,212 930,209
                L 1200,209
                C 1215,209 1235,175 1250,165
              "
              stroke={`url(#${filterId}-waveGlow)`}
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              filter={`url(#${filterId}-neon)`}
              className="hww-wave-path"
            />

            {/* Circular Connection Nodes at Card Edges */}
            {[
              { cx: 15, cy: 175 },
              { cx: 285, cy: 175 },
              { cx: 320, cy: 207 },
              { cx: 590, cy: 207 },
              { cx: 625, cy: 183 },
              { cx: 895, cy: 183 },
              { cx: 930, cy: 209 },
              { cx: 1200, cy: 209 },
            ].map((node, i) => (
              <g key={i}>
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="6.5"
                  stroke="#FC6603"
                  strokeWidth="1.5"
                  fill="#060709"
                />
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="3"
                  fill="#FC6603"
                  className={`hww-node-dot hww-node-dot-${i}`}
                />
              </g>
            ))}
          </svg>

          {/*
            TABLET SVG CONNECTOR (md: 2x2 grid)
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 680"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            preserveAspectRatio="none"
          >
            <path
              d="
                M 10,160
                L 280,160
                C 300,160 305,160 320,160
                L 580,160
                C 600,160 610,320 300,340
                C 0,360 10,500 20,500
                L 280,500
                C 300,500 305,500 320,500
                L 580,500
              "
              stroke="rgba(255, 255, 255, 0.10)"
              strokeWidth="2"
              fill="none"
              strokeLinecap="round"
            />
            <path
              pathLength={1000}
              d="
                M 10,160
                L 280,160
                C 300,160 305,160 320,160
                L 580,160
                C 600,160 610,320 300,340
                C 0,360 10,500 20,500
                L 280,500
                C 300,500 305,500 320,500
                L 580,500
              "
              stroke="#FC6603"
              strokeWidth="2.5"
              fill="none"
              strokeLinecap="round"
              className="hww-wave-path"
            />
          </svg>

          {/*
            MOBILE VERTICAL CONNECTOR (Along left edge)
          */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-3 top-8 bottom-8 w-[2px] bg-white/[0.08] pointer-events-none z-0 overflow-hidden"
          >
            <div className="hww-wave-path-mobile w-full h-full bg-[#FC6603] origin-top shadow-[0_0_8px_#FC6603]" />
          </div>

          {/*
            RESPONSIVE 4-CARD CONTAINER
            Rides the wave in left-to-right (400ms, 550ms, 700ms, 850ms)
          */}
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 relative z-10 list-none p-0 m-0 pl-6 sm:pl-8 md:pl-0">
            {PROCESS_STEPS.map((step, idx) => {
              const isHovered = hoveredCard === idx;
              // Card 04 only receives permanent active orange border once wave entrance animation settles
              const hasOrangeBorder = isHovered || (step.isDefaultActive && isSettled && hoveredCard === null);

              return (
                <li
                  key={step.number}
                  className={`hww-card-slot hww-card-slot-${idx} flex flex-col`}
                  style={{
                    zIndex: 10 + idx,
                  }}
                >
                  <div
                    onMouseEnter={() => setHoveredCard(idx)}
                    onMouseLeave={() => setHoveredCard(null)}
                    className={`group hww-card-inner relative flex flex-col justify-between h-full min-h-[290px] sm:min-h-[305px] p-5 sm:p-6 rounded-2xl bg-[#0C0D12]/95 border backdrop-blur-md cursor-default select-none transition-all duration-300 ${
                      hasOrangeBorder
                        ? 'border-[#FC6603] shadow-[0_0_28px_rgba(252,102,3,0.22)]'
                        : 'border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {/* Orange wave glow overlay (pulses across cards and stays on card 04) */}
                    <div
                      aria-hidden="true"
                      className="hww-card-glow-overlay pointer-events-none absolute inset-0 rounded-2xl"
                    />

                    {/* Top specular rim reflection */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    />

                    {/* ================= CARD HEADER ================= */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        {/* Upper-Left Icon with soft pop (200ms after card starts) */}
                        <div className="hww-inner-icon shrink-0">
                          <div
                            className={`w-12 h-12 sm:w-14 sm:h-14 rounded-2xl p-2 sm:p-2.5 flex items-center justify-center relative overflow-hidden transition-all duration-300 shadow-[inset_0_1px_1px_rgba(255,255,255,0.12)] ${
                              hasOrangeBorder
                                ? 'bg-[#FC6603]/[0.08] border border-[#FC6603]/50 shadow-[0_0_20px_rgba(252,102,3,0.25)]'
                                : 'bg-white/[0.04] border border-white/[0.12] group-hover:border-[#FC6603]/40 group-hover:bg-[#FC6603]/[0.06] group-hover:shadow-[0_0_20px_rgba(252,102,3,0.2)]'
                            }`}
                          >
                            {/* Specular top rim reflection */}
                            <div
                              aria-hidden="true"
                              className="absolute top-0 inset-x-2 h-[1px] bg-gradient-to-r from-transparent via-white/25 to-transparent pointer-events-none"
                            />
                            {step.renderIcon()}
                          </div>
                        </div>

                        {/* Upper-Right Small Step Number */}
                        <span className="hww-inner-header font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#8E929E]">
                          {step.number}
                        </span>
                      </div>

                      {/* Title with reserved height for natural 2-line wrapping */}
                      <div className="hww-inner-header min-h-[58px] sm:min-h-[64px] flex items-center">
                        <h3 className="font-display font-bold text-[25px] text-[#F4F4F5] tracking-[-0.02em] leading-[1.2]">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description (+80ms delayed) */}
                      <p className="hww-inner-desc font-sans text-[16px] text-[#A1A1AA] leading-relaxed mt-2.5">
                        {step.description}
                      </p>
                    </div>

                    {/* ================= CARD FOOTER ================= */}
                    <div className="hww-inner-divider pt-3.5 mt-5 border-t border-white/[0.08]">
                      <span className="hww-inner-label font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#8E929E] tracking-[0.18em] uppercase">
                        {step.bottomLabel}
                      </span>
                    </div>
                  </div>
                </li>
              );
            })}
          </ol>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
