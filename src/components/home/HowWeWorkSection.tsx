import React, { useState, useEffect, useRef, useId } from 'react';
import { motion, useScroll, useSpring, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

/* =========================================================================
   PROCESS PHASES CONFIGURATION (Single source of truth)
   ========================================================================= */
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bottomLabel: string;
  staggerClass: string; // Tailwind desktop vertical offset for wave rhythm
  renderIcon: (isRevealed: boolean, prefersReduced: boolean | null) => React.ReactNode;
}

const PROCESS_STEPS: ProcessStep[] = [
  {
    number: '01',
    title: 'Discover & Map',
    description: 'Understand your business, audience and opportunities.',
    bottomLabel: 'CLARITY & DIRECTION',
    staggerClass: 'lg:translate-y-0',
    renderIcon: (isRevealed, prefersReduced) => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        {/* Subtle background radar circle */}
        <circle cx="22" cy="22" r="18" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />
        {/* Orbiting pulse scanner ring */}
        <motion.circle
          cx="22"
          cy="22"
          r="14"
          stroke="#FC6603"
          strokeWidth="1.25"
          strokeDasharray="20 70"
          animate={
            isRevealed && !prefersReduced
              ? { rotate: [0, 360] }
              : { rotate: 0 }
          }
          transition={{ duration: 1.6, ease: 'easeOut' }}
          style={{ transformOrigin: '22px 22px' }}
        />
        {/* Main Search Lens */}
        <circle cx="20" cy="20" r="7.5" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" />
        <path d="M25.5 25.5L31 31" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" />
        {/* Glowing orbit dot */}
        <motion.circle
          cx="22"
          cy="8"
          r="2.5"
          fill="#FC6603"
          animate={
            isRevealed && !prefersReduced
              ? { scale: [0, 1.3, 1], opacity: [0, 1, 1] }
              : { scale: 1, opacity: 1 }
          }
          transition={{ duration: 0.6, delay: 0.2 }}
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    description: 'Shape the plan, structure and campaigns around your goals.',
    bottomLabel: 'STRATEGY & BLUEPRINT',
    staggerClass: 'lg:translate-y-8', // ~32px stagger
    renderIcon: (isRevealed, prefersReduced) => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        {/* Connecting planning lines */}
        <motion.path
          d="M22 22L13 14M22 22L31 14M22 22L14 30M22 22L30 30"
          stroke="rgba(255,255,255,0.25)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={isRevealed ? { pathLength: 1 } : { pathLength: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.7, ease: 'easeOut' }}
        />
        {/* Outer orbital planning nodes */}
        <circle cx="13" cy="14" r="3" fill="#0E1017" stroke="#F4F4F5" strokeWidth="1.8" />
        <circle cx="31" cy="14" r="3" fill="#0E1017" stroke="#F4F4F5" strokeWidth="1.8" />
        <circle cx="14" cy="30" r="3" fill="#0E1017" stroke="#F4F4F5" strokeWidth="1.8" />
        <circle cx="30" cy="30" r="3" fill="#0E1017" stroke="#F4F4F5" strokeWidth="1.8" />
        {/* Center Orange Hub Node */}
        <motion.circle
          cx="22"
          cy="22"
          r="4.5"
          fill="#FC6603"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          animate={
            isRevealed && !prefersReduced
              ? { scale: [0.6, 1.25, 1] }
              : { scale: 1 }
          }
          transition={{ duration: 0.5, delay: 0.3 }}
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build & Launch',
    description: 'Bring your website, content and campaigns to life.',
    bottomLabel: 'BUILD & DEPLOY',
    staggerClass: 'lg:translate-y-2', // ~8px stagger
    renderIcon: (isRevealed, prefersReduced) => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        {/* Left code bracket */}
        <path d="M12 15L6 22L12 29" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Right code bracket */}
        <path d="M32 15L38 22L32 29" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        {/* Launch paper rocket / upward arrow in brand orange */}
        <motion.g
          animate={
            isRevealed && !prefersReduced
              ? { x: [-4, 0], y: [4, 0], opacity: [0, 1] }
              : { x: 0, y: 0, opacity: 1 }
          }
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
        >
          <path
            d="M29 14L15 21L21 24.5L29 14Z"
            fill="#FC6603"
          />
          <path
            d="M29 14L23.5 28L21 24.5L29 14Z"
            fill="#E05500"
          />
          <path
            d="M21 24.5L23.5 28L24.5 23L21 24.5Z"
            fill="#FFA34D"
          />
        </motion.g>
      </svg>
    ),
  },
  {
    number: '04',
    title: 'Scale & Compound',
    description: 'Measure what works. Refine, improve and grow.',
    bottomLabel: 'MEASURE & IMPROVE',
    staggerClass: 'lg:translate-y-9', // ~36px stagger
    renderIcon: (isRevealed, prefersReduced) => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        {/* Base line */}
        <line x1="8" y1="34" x2="36" y2="34" stroke="rgba(255,255,255,0.15)" strokeWidth="1.5" strokeLinecap="round" />
        {/* Rising chart bars */}
        <motion.rect
          x="10"
          y="25"
          width="4"
          height="9"
          rx="1"
          fill="#F4F4F5"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="17"
          y="20"
          width="4"
          height="14"
          rx="1"
          fill="#F4F4F5"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="24"
          y="15"
          width="4"
          height="19"
          rx="1"
          fill="#F4F4F5"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.3 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="31"
          y="10"
          width="4"
          height="24"
          rx="1"
          fill="#FC6603"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.4, delay: 0.4 }}
          style={{ transformOrigin: 'bottom' }}
        />
        {/* Growth Arrow line across top */}
        <motion.path
          d="M10 24L17 19L24 14L33 9"
          stroke="#FC6603"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={isRevealed ? { pathLength: 1 } : { pathLength: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.6, delay: 0.35 }}
        />
        {/* Arrowhead */}
        <motion.path
          d="M29 9H33V13"
          stroke="#FC6603"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: prefersReduced ? 1 : 0 }}
          transition={{ duration: 0.3, delay: 0.65 }}
        />
      </svg>
    ),
  },
];

/**
 * HOW WE WORK — HORIZONTAL 4-CARD WAVE PROCESS
 *
 * Implements the exact design mockup:
 * - Centered section header: "Four steps. One clear direction."
 * - 4 staggered cards in one horizontal desktop row
 * - Flowing orange wave curve with circular connection nodes behind the cards
 * - Natural scroll reveal: cards only pop up while scrolling down, and stay visible permanently
 * - Responsive 2x2 on tablet and vertical connected timeline on mobile
 * - Icon micro-animations upon reveal
 * - Bottom CTA: "Ready to take your next step? [LET'S TALK ↗]"
 */
export const HowWeWorkSection: React.FC = () => {
  const sectionRef = useRef<HTMLElement>(null);
  const cardsContainerRef = useRef<HTMLOListElement>(null);
  const prefersReduced = useReducedMotion();
  const filterId = useId();

  // Track which cards have been revealed.
  // CRITICAL REQUIREMENT: Once a card is revealed while scrolling DOWN, it stays revealed!
  // It NEVER hides when scrolling up.
  const [revealedCards, setRevealedCards] = useState<boolean[]>([
    !!prefersReduced,
    !!prefersReduced,
    !!prefersReduced,
    !!prefersReduced,
  ]);

  // Track hover state for fine-pointer feedback
  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Natural scroll mapping for the decorative wave curve
  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ['start 75%', 'end 55%'],
  });

  const smoothProgress = useSpring(scrollYProgress, {
    stiffness: 180,
    damping: 26,
    restDelta: 0.001,
  });

  // Track scroll progression to reveal cards sequentially while scrolling down
  useEffect(() => {
    if (prefersReduced) {
      setRevealedCards([true, true, true, true]);
      return;
    }

    const unsubscribe = smoothProgress.on('change', (latest) => {
      // Thresholds for steps 01, 02, 03, 04
      const t1 = latest >= 0.08;
      const t2 = latest >= 0.28;
      const t3 = latest >= 0.48;
      const t4 = latest >= 0.68;

      setRevealedCards((prev) => {
        const next0 = prev[0] || t1;
        const next1 = prev[1] || t2;
        const next2 = prev[2] || t3;
        const next3 = prev[3] || t4;

        if (
          next0 === prev[0] &&
          next1 === prev[1] &&
          next2 === prev[2] &&
          next3 === prev[3]
        ) {
          return prev;
        }
        return [next0, next1, next2, next3];
      });
    });

    return () => unsubscribe();
  }, [smoothProgress, prefersReduced]);

  // Fast scroll fallback / IntersectionObserver safeguard
  useEffect(() => {
    if (!sectionRef.current || prefersReduced) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && entry.intersectionRatio > 0.35) {
            setRevealedCards([true, true, true, true]);
          }
        });
      },
      { threshold: [0.35, 0.65] }
    );

    observer.observe(sectionRef.current);
    return () => observer.disconnect();
  }, [prefersReduced]);

  return (
    <section
      ref={sectionRef}
      id="how-we-work"
      aria-labelledby="how-we-work-heading"
      className="relative w-full bg-[#060709] py-20 sm:py-24 lg:py-28 overflow-x-clip selection:bg-[#FC6603] selection:text-black border-b border-white/[0.08]"
    >
      {/* Background radial atmosphere glow (subtle, non-distracting) */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.06)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 w-full">
        {/* =========================================================================
            SECTION HEADER (Centered)
           ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-14 sm:mb-16 lg:mb-20">
          {/* Eyebrow */}
          <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-3 flex items-center justify-center gap-2">
            <span className="font-bold">//</span>
            <span className="text-white/80">HOW WE WORK</span>
          </div>

          {/* Centered Heading */}
          <h2
            id="how-we-work-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] tracking-[-0.03em] leading-[1.08] text-white"
          >
            <span>Four steps.</span>
            <br />
            <span className="text-[#FC6603]">One clear direction.</span>
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-[15px] sm:text-[16px] text-[#A1A1AA] leading-relaxed mt-4 max-w-lg">
            From understanding your business to building what comes next.
          </p>

          {/* Scroll Cue (Hidden on small mobile where screen is compact) */}
          <div
            aria-hidden="true"
            className="hidden sm:flex flex-col items-center gap-1.5 mt-7 text-[#A1A1AA]/60 font-mono text-[10.5px] tracking-[0.2em] uppercase select-none"
          >
            <span>SCROLL TO UNFOLD</span>
            <motion.span
              animate={prefersReduced ? {} : { y: [0, 4, 0] }}
              transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}
              className="text-[#FC6603] text-xs"
            >
              ↓
            </motion.span>
          </div>
        </div>

        {/* =========================================================================
            CARDS STAGE WITH CONNECTING WAVE (Semantic Ordered List)
           ========================================================================= */}
        <div className="relative w-full">
          {/*
            DESKTOP SVG WAVE CONNECTOR (Behind the cards)
            Coordinates calculated based on card horizontal positions & vertical wave rhythm.
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

            {/* Glowing Orange Progress Wave Line (Mapped to Scroll Progress) */}
            <motion.path
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
              style={{
                pathLength: prefersReduced ? 1 : smoothProgress,
              }}
            />

            {/* Circular Connection Nodes at Card Edges */}
            {[
              { cx: 15, cy: 175, active: revealedCards[0] },
              { cx: 285, cy: 175, active: revealedCards[0] },
              { cx: 320, cy: 207, active: revealedCards[1] },
              { cx: 590, cy: 207, active: revealedCards[1] },
              { cx: 625, cy: 183, active: revealedCards[2] },
              { cx: 895, cy: 183, active: revealedCards[2] },
              { cx: 930, cy: 209, active: revealedCards[3] },
              { cx: 1200, cy: 209, active: revealedCards[3] },
            ].map((node, i) => (
              <g key={i}>
                {/* Outer Ring */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="6.5"
                  stroke={node.active ? '#FC6603' : 'rgba(255,255,255,0.2)'}
                  strokeWidth="1.5"
                  fill="#060709"
                  className="transition-colors duration-500"
                />
                {/* Center Core Dot */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="3"
                  fill={node.active ? '#FC6603' : 'rgba(255,255,255,0.3)'}
                  className="transition-colors duration-500"
                />
              </g>
            ))}
          </svg>

          {/*
            TABLET SVG CONNECTOR (md to lg, 2x2 grid)
          */}
          <svg
            aria-hidden="true"
            viewBox="0 0 600 680"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="hidden md:block lg:hidden absolute inset-0 w-full h-full pointer-events-none z-0 overflow-visible"
            preserveAspectRatio="none"
          >
            {/* Base line connecting 01 -> 02 -> 03 -> 04 */}
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
            {/* Progress line */}
            <motion.path
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
              style={{
                pathLength: prefersReduced ? 1 : smoothProgress,
              }}
            />
          </svg>

          {/*
            MOBILE VERTICAL CONNECTOR (Single column along left edge)
          */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-4 top-8 bottom-8 w-[2px] bg-white/[0.08] pointer-events-none z-0"
          >
            <motion.div
              className="w-full bg-[#FC6603] origin-top shadow-[0_0_8px_#FC6603]"
              style={{
                height: '100%',
                scaleY: prefersReduced ? 1 : smoothProgress,
              }}
            />
          </div>

          {/*
            RESPONSIVE 4-CARD CONTAINER
            - Desktop: 4 equal-width cards in 1 horizontal row with stagger rhythm
            - Tablet: 2x2 grid
            - Mobile: 1 column stack (with pl-7 to give clearance to mobile vertical connector)
          */}
          <ol
            ref={cardsContainerRef}
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5 xl:gap-6 relative z-10 list-none p-0 m-0 pl-7 sm:pl-8 md:pl-0"
          >
            {PROCESS_STEPS.map((step, idx) => {
              const isRevealed = revealedCards[idx];
              const isHovered = hoveredCard === idx;

              return (
                <li
                  key={step.number}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`flex flex-col ${step.staggerClass}`}
                >
                  <motion.div
                    // Pop up only while scrolling down, and stays revealed permanently
                    initial={
                      prefersReduced
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 32, scale: 0.97 }
                    }
                    animate={
                      isRevealed || prefersReduced
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 32, scale: 0.97 }
                    }
                    transition={{
                      duration: 0.55,
                      ease: [0.16, 1, 0.3, 1], // Smooth premium ease-out without bounce
                    }}
                    className={`relative flex flex-col justify-between h-full min-h-[300px] sm:min-h-[315px] p-6 sm:p-7 rounded-2xl bg-[#0E1017]/95 border backdrop-blur-md transition-all duration-300 cursor-default select-none ${
                      isHovered
                        ? '-translate-y-1 border-[#FC6603]/60 shadow-[0_10px_30px_rgba(252,102,3,0.15)]'
                        : 'border-white/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.5)]'
                    }`}
                  >
                    {/* Top spec rim highlight */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    />

                    {/* ================= CARD HEADER: Icon (Left) & Step Number (Right) ================= */}
                    <div>
                      <div className="flex items-center justify-between mb-5">
                        {/* Upper-Left Icon with micro-animation */}
                        <div className="p-1 rounded-xl bg-white/[0.02]">
                          {step.renderIcon(isRevealed, prefersReduced)}
                        </div>

                        {/* Upper-Right Small Step Number */}
                        <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#FC6603]">
                          {step.number}
                        </span>
                      </div>

                      {/* Title (Bricolage Grotesque) with reserved height for natural 2-line wrapping */}
                      <div className="min-h-[56px] flex items-center">
                        <h3 className="font-display font-bold text-xl sm:text-[22px] text-[#F4F4F5] tracking-[-0.01em] leading-snug">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description (Schibsted Grotesk) */}
                      <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A1AA] leading-relaxed mt-2.5">
                        {step.description}
                      </p>
                    </div>

                    {/* ================= CARD FOOTER: Subtle Divider & Bottom Label ================= */}
                    <div className="pt-4 mt-6 border-t border-white/[0.08]">
                      <span className="font-mono text-[10px] sm:text-[10.5px] font-semibold text-white/50 tracking-[0.18em] uppercase">
                        {step.bottomLabel}
                      </span>
                    </div>
                  </motion.div>
                </li>
              );
            })}
          </ol>
        </div>

        {/* =========================================================================
            BOTTOM CALL-TO-ACTION (Centered below cards)
           ========================================================================= */}
        <div className="mt-16 sm:mt-20 lg:mt-24 pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
          {/* Prompt text */}
          <span className="font-sans text-[15px] sm:text-[16px] text-white/80 font-normal">
            Ready to take your next step?
          </span>

          {/* Primary CTA Button (matches brand styling & navigates to /contact) */}
          <Link
            to="/contact"
            className="group relative inline-flex items-center gap-2.5 px-7 py-3.5 rounded-full bg-[#FC6603] text-black font-mono text-[11.5px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-white hover:text-black hover:shadow-[0_0_32px_rgba(255,255,255,0.4)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] focus-visible:ring-offset-2 focus-visible:ring-offset-[#060709]"
            data-cursor="CONNECT"
          >
            <span>LET’S TALK</span>
            <span className="text-[13px] font-bold transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
              ↗
            </span>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default HowWeWorkSection;
