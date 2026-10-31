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
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
        <circle cx="18" cy="18" r="8" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" />
        <path d="M23.5 23.5L30 30" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" />
        <circle cx="26" cy="12" r="2.5" fill="#FC6603" />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    description: 'Shape the plan, structure and campaigns around your goals.',
    bottomLabel: 'STRATEGY & BLUEPRINT',
    isDefaultActive: true, // Card 02 has the signature glowing orange border from mockup
    renderIcon: () => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <path
          d="M20 20L11 11M20 20L29 11M20 20L11 29M20 20L29 29"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
        />
        <circle cx="11" cy="11" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="29" cy="11" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="11" cy="29" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="29" cy="29" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="20" cy="20" r="4.5" fill="#FC6603" stroke="#FFFFFF" strokeWidth="1.5" />
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
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <path d="M11 14L5 20L11 26" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M29 14L35 20L29 26" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        <g>
          <path d="M26 12L14 18.5L19.5 21.5L26 12Z" fill="#FC6603" />
          <path d="M26 12L21.5 25L19.5 21.5L26 12Z" fill="#E05500" />
          <path d="M19.5 21.5L21.5 25L22.5 20.5L19.5 21.5Z" fill="#FFA34D" />
        </g>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scale & Compound',
    description: 'Measure what works. Refine, improve and grow.',
    bottomLabel: 'MEASURE & IMPROVE',
    renderIcon: () => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        <rect x="8" y="23" width="4" height="9" rx="1" fill="#F4F4F5" />
        <rect x="15" y="18" width="4" height="14" rx="1" fill="#F4F4F5" />
        <rect x="22" y="13" width="4" height="19" rx="1" fill="#F4F4F5" />
        <rect x="29" y="8" width="4" height="24" rx="1" fill="#FC6603" />
        <path d="M8 22L15 17L22 12L31 7" stroke="#FC6603" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
        <path d="M27 7H31V11" stroke="#FC6603" strokeWidth="1.75" strokeLinecap="round" strokeLinejoin="round" />
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

  // Settle animation and release will-change ~2200ms after in-view
  useEffect(() => {
    if (isInView && !isSettled) {
      const settleTimer = setTimeout(() => {
        setIsSettled(true);
      }, 2200);
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
            SECTION HEADER
           ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Eyebrow: // HOW WE WORK (0ms: Fades in, letter-spacing settles) */}
          <div className="hww-eyebrow font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center justify-center gap-2">
            <span className="font-bold">//</span>
            <span className="text-white/80">HOW WE WORK</span>
          </div>

          {/* Heading: Four steps. One clear direction. (0-600ms: Reveals upward from mask/clip) */}
          <h2
            id="how-we-work-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-[-0.03em] leading-[1.08] text-white"
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

          {/* Supporting Text (200ms: Fades up 16px) */}
          <p className="hww-subtext font-sans text-[14px] sm:text-[15.5px] text-[#A1A1AA] leading-relaxed mt-3 max-w-lg">
            From understanding your business to building what comes next.
          </p>
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
              const hasOrangeBorder = isHovered || (step.isDefaultActive && hoveredCard === null);

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
                    className={`hww-card-inner relative flex flex-col justify-between h-full min-h-[290px] sm:min-h-[305px] p-5 sm:p-6 rounded-2xl bg-[#0C0D12]/95 border backdrop-blur-md cursor-default select-none transition-all duration-300 ${
                      hasOrangeBorder
                        ? 'border-[#FC6603] shadow-[0_0_28px_rgba(252,102,3,0.22)]'
                        : 'border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {/* Brief orange glow pulse overlay as card lands */}
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
                        <div className="hww-inner-icon p-0.5">
                          {step.renderIcon()}
                        </div>

                        {/* Upper-Right Small Step Number */}
                        <span className="hww-inner-header font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#8E929E]">
                          {step.number}
                        </span>
                      </div>

                      {/* Title with reserved height for natural 2-line wrapping */}
                      <div className="hww-inner-header min-h-[50px] sm:min-h-[54px] flex items-center">
                        <h3 className="font-display font-bold text-lg sm:text-[20px] xl:text-[21px] text-[#F4F4F5] tracking-[-0.01em] leading-snug">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description (+80ms delayed) */}
                      <p className="hww-inner-desc font-sans text-[13px] sm:text-[13.5px] text-[#A1A1AA] leading-relaxed mt-2">
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

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION (1450ms: Fades up last)
           ========================================================================= */}
        <div className="hww-cta-row mt-10 sm:mt-12 lg:mt-14 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
          <span className="font-sans text-[15px] sm:text-[16px] text-white/80 font-normal">
            Ready to take your next step?
          </span>

          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2.5 px-6 sm:px-7 py-3 sm:py-3.5 rounded-full bg-[#FC6603] text-black font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709]"
            data-cursor="CONNECT"
          >
            <span>Let's Talk</span>
            <span className="text-[12px] sm:text-[13px] transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
