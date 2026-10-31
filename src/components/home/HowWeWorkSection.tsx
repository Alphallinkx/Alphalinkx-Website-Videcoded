import React, { useState, useRef, useId } from 'react';
import { motion, useInView, useReducedMotion } from 'motion/react';
import { Link } from 'react-router-dom';

/* =========================================================================
   PROCESS PHASES CONFIGURATION (Matching Mockup 1:1)
   ========================================================================= */
interface ProcessStep {
  number: string;
  title: string;
  description: string;
  bottomLabel: string;
  staggerClass: string; // Tailwind desktop vertical offset for wave rhythm
  isDefaultActive?: boolean; // Card 02 in mockup has the signature glowing orange border
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
        {/* Outer subtle concentric radar circle */}
        <circle cx="20" cy="20" r="16" stroke="rgba(255,255,255,0.08)" strokeWidth="1" strokeDasharray="3 3" />

        {/* Magnifying Lens Outer Frame */}
        <circle cx="18" cy="18" r="8" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" />

        {/* Diagonal Lens Handle */}
        <path d="M23.5 23.5L30 30" stroke="#FC6603" strokeWidth="2.2" strokeLinecap="round" />

        {/* Satellite Dot (Top right of lens, exact match to screenshot) */}
        <motion.circle
          cx="26"
          cy="12"
          r="2.5"
          fill="#FC6603"
          initial={prefersReduced ? false : { scale: 0, opacity: 0 }}
          animate={isRevealed ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
          transition={{ duration: 0.4, delay: 0.2 }}
        />
      </svg>
    ),
  },
  {
    number: '02',
    title: 'Strategize & Engineer',
    description: 'Shape the plan, structure and campaigns around your goals.',
    bottomLabel: 'STRATEGY & BLUEPRINT',
    staggerClass: 'lg:translate-y-8', // Staggered down ~32px following the wave
    isDefaultActive: true, // Card 02 has the signature glowing orange border from the mockup
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
          d="M20 20L11 11M20 20L29 11M20 20L11 29M20 20L29 29"
          stroke="rgba(255,255,255,0.3)"
          strokeWidth="1.5"
          strokeLinecap="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.5, delay: 0.15, ease: 'easeOut' }}
        />
        {/* 4 Satellite Planning Nodes */}
        <circle cx="11" cy="11" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="29" cy="11" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="11" cy="29" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        <circle cx="29" cy="29" r="3" fill="#0C0D12" stroke="#F4F4F5" strokeWidth="1.75" />
        {/* Central Hub Node in Brand Orange */}
        <motion.circle
          cx="20"
          cy="20"
          r="4.5"
          fill="#FC6603"
          stroke="#FFFFFF"
          strokeWidth="1.5"
          initial={prefersReduced ? false : { scale: 0.6 }}
          animate={isRevealed ? { scale: 1 } : { scale: 0.6 }}
          transition={{ duration: 0.4, delay: 0.25 }}
        />
      </svg>
    ),
  },
  {
    number: '03',
    title: 'Build & Launch',
    description: 'Bring your website, content and campaigns to life.',
    bottomLabel: 'BUILD & DEPLOY',
    staggerClass: 'lg:translate-y-2', // Staggered ~8px
    renderIcon: (isRevealed, prefersReduced) => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        {/* Left code bracket < */}
        <path d="M11 14L5 20L11 26" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Right code bracket > */}
        <path d="M29 14L35 20L29 26" stroke="#F4F4F5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />

        {/* Center Paper Rocket / Launch Arrow in Brand Orange */}
        <motion.g
          initial={prefersReduced ? false : { x: -3, y: 3, opacity: 0 }}
          animate={isRevealed ? { x: 0, y: 0, opacity: 1 } : { x: -3, y: 3, opacity: 0 }}
          transition={{ duration: 0.5, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
        >
          <path
            d="M26 12L14 18.5L19.5 21.5L26 12Z"
            fill="#FC6603"
          />
          <path
            d="M26 12L21.5 25L19.5 21.5L26 12Z"
            fill="#E05500"
          />
          <path
            d="M19.5 21.5L21.5 25L22.5 20.5L19.5 21.5Z"
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
    staggerClass: 'lg:translate-y-9', // Staggered down ~36px
    renderIcon: (isRevealed, prefersReduced) => (
      <svg
        viewBox="0 0 44 44"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="w-10 h-10"
        aria-hidden="true"
      >
        {/* 4 Rising Chart Bars */}
        <motion.rect
          x="8"
          y="23"
          width="4"
          height="9"
          rx="1"
          fill="#F4F4F5"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3, delay: 0.1 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="15"
          y="18"
          width="4"
          height="14"
          rx="1"
          fill="#F4F4F5"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3, delay: 0.18 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="22"
          y="13"
          width="4"
          height="19"
          rx="1"
          fill="#F4F4F5"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3, delay: 0.26 }}
          style={{ transformOrigin: 'bottom' }}
        />
        <motion.rect
          x="29"
          y="8"
          width="4"
          height="24"
          rx="1"
          fill="#FC6603"
          initial={prefersReduced ? false : { scaleY: 0 }}
          animate={isRevealed ? { scaleY: 1 } : { scaleY: 0 }}
          transition={{ duration: 0.3, delay: 0.34 }}
          style={{ transformOrigin: 'bottom' }}
        />
        {/* Growth Arrow line across top */}
        <motion.path
          d="M8 22L15 17L22 12L31 7"
          stroke="#FC6603"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReduced ? false : { pathLength: 0 }}
          animate={isRevealed ? { pathLength: 1 } : { pathLength: 0 }}
          transition={{ duration: 0.45, delay: 0.3 }}
        />
        {/* Arrowhead */}
        <motion.path
          d="M27 7H31V11"
          stroke="#FC6603"
          strokeWidth="1.75"
          strokeLinecap="round"
          strokeLinejoin="round"
          initial={prefersReduced ? false : { opacity: 0 }}
          animate={isRevealed ? { opacity: 1 } : { opacity: 0 }}
          transition={{ duration: 0.25, delay: 0.5 }}
        />
      </svg>
    ),
  },
];

/**
 * HOW WE WORK — COMPACT WAVE PROCESS SECTION
 *
 * Key fixes:
 * 1. Removed extra padding & height: Clean, compact spacing that fits naturally in page flow.
 * 2. Animation triggers ONLY WHEN REACHING THE CARDS: Targeted directly to cardsContainerRef with
 *    a threshold ensuring the user is actually looking at the cards when the wave draws and the cards pop up!
 * 3. Smoother wave pop-up: Cards emerge sequentially along the linking wave (01 -> 02 -> 03 -> 04).
 * 4. Removed distracting rotating animations: Clean, crisp, one-time micro-animations.
 * 5. Exact site CTA button styling: pill rounded-full, brand orange, hover white glow, matching DiagnosisSection.
 */
export const HowWeWorkSection: React.FC = () => {
  const cardsContainerRef = useRef<HTMLDivElement>(null);
  const prefersReduced = useReducedMotion();
  const filterId = useId();

  // Trigger animation ONLY when the user reaches the cards area
  const areCardsInView = useInView(cardsContainerRef, {
    once: true,
    amount: 0.25,
    margin: '0px 0px -40px 0px',
  });

  const [hoveredCard, setHoveredCard] = useState<number | null>(null);

  // Stagger delays for wave sequence (01 -> 02 -> 03 -> 04)
  const cardDelays = [0.12, 0.28, 0.44, 0.6];

  return (
    <section
      id="process"
      aria-labelledby="how-we-work-heading"
      className="relative w-full bg-[#060709] py-14 sm:py-16 lg:py-20 overflow-x-clip selection:bg-[#FC6603] selection:text-black border-b border-white/[0.08]"
    >
      {/* Background ambient radial glow matching mockup */}
      <div
        aria-hidden="true"
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[450px] bg-[radial-gradient(ellipse_at_center,rgba(252,102,3,0.06)_0%,transparent_70%)] pointer-events-none"
      />

      <div className="relative z-10 max-w-[1400px] mx-auto px-4 sm:px-6 md:px-8 xl:px-10 w-full">
        {/* =========================================================================
            SECTION HEADER (Centered - Clean & Compact)
           ========================================================================= */}
        <div className="flex flex-col items-center text-center max-w-2xl mx-auto mb-10 sm:mb-12 lg:mb-14">
          {/* Eyebrow: // HOW WE WORK */}
          <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center justify-center gap-2">
            <span className="font-bold">//</span>
            <span className="text-white/80">HOW WE WORK</span>
          </div>

          {/* Heading: Four steps. One clear direction. */}
          <h2
            id="how-we-work-heading"
            className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[52px] tracking-[-0.03em] leading-[1.08] text-white"
          >
            <span>Four steps.</span>
            <br />
            <span className="text-[#FC6603]">One clear direction.</span>
          </h2>

          {/* Supporting Text */}
          <p className="font-sans text-[14px] sm:text-[15.5px] text-[#A1A1AA] leading-relaxed mt-3 max-w-lg">
            From understanding your business to building what comes next.
          </p>
        </div>

        {/* =========================================================================
            CARDS STAGE WITH FLOWING WAVE CONNECTOR
            Animation activates ONLY when cardsContainerRef enters view!
           ========================================================================= */}
        <div ref={cardsContainerRef} className="relative w-full my-auto">
          {/*
            DESKTOP CONTINUOUS SVG WAVE (Behind cards)
            Draws smoothly across from left to right as the cards enter view.
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
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={areCardsInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />

            {/* Circular Connection Nodes at Card Edges with Sequential Glow */}
            {[
              { cx: 15, cy: 175, delay: 0.12 },
              { cx: 285, cy: 175, delay: 0.2 },
              { cx: 320, cy: 207, delay: 0.28 },
              { cx: 590, cy: 207, delay: 0.36 },
              { cx: 625, cy: 183, delay: 0.44 },
              { cx: 895, cy: 183, delay: 0.52 },
              { cx: 930, cy: 209, delay: 0.6 },
              { cx: 1200, cy: 209, delay: 0.72 },
            ].map((node, i) => (
              <g key={i}>
                {/* Outer Ring */}
                <circle
                  cx={node.cx}
                  cy={node.cy}
                  r="6.5"
                  stroke="#FC6603"
                  strokeWidth="1.5"
                  fill="#060709"
                  className="transition-colors duration-500"
                />
                {/* Center Core Dot */}
                <motion.circle
                  cx={node.cx}
                  cy={node.cy}
                  r="3"
                  fill="#FC6603"
                  initial={prefersReduced ? false : { scale: 0 }}
                  animate={areCardsInView ? { scale: 1 } : { scale: 0 }}
                  transition={{ duration: 0.3, delay: node.delay }}
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
              initial={prefersReduced ? false : { pathLength: 0 }}
              animate={areCardsInView ? { pathLength: 1 } : { pathLength: 0 }}
              transition={{ duration: 1.0, ease: [0.16, 1, 0.3, 1] }}
            />
          </svg>

          {/*
            MOBILE VERTICAL CONNECTOR (Along left edge)
          */}
          <div
            aria-hidden="true"
            className="md:hidden absolute left-3 top-8 bottom-8 w-[2px] bg-white/[0.08] pointer-events-none z-0"
          >
            <motion.div
              className="w-full bg-[#FC6603] origin-top shadow-[0_0_8px_#FC6603]"
              initial={prefersReduced ? false : { scaleY: 0 }}
              animate={areCardsInView ? { scaleY: 1 } : { scaleY: 0 }}
              transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1] }}
              style={{ height: '100%' }}
            />
          </div>

          {/*
            RESPONSIVE 4-CARD CONTAINER
            Cards emerge smoothly when user reaches here!
          */}
          <ol className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 xl:gap-5 relative z-10 list-none p-0 m-0 pl-6 sm:pl-8 md:pl-0">
            {PROCESS_STEPS.map((step, idx) => {
              const isHovered = hoveredCard === idx;
              const hasOrangeBorder = isHovered || (step.isDefaultActive && hoveredCard === null);

              return (
                <li
                  key={step.number}
                  onMouseEnter={() => setHoveredCard(idx)}
                  onMouseLeave={() => setHoveredCard(null)}
                  className={`flex flex-col ${step.staggerClass}`}
                  style={{
                    zIndex: 10 + idx, // Stacking allows cards to emerge fluidly in wave order
                  }}
                >
                  <motion.div
                    // Smooth, wave-like pop-up animation running ONLY when user reaches this section
                    initial={
                      prefersReduced
                        ? false
                        : { opacity: 0, y: 40, scale: 0.95 }
                    }
                    animate={
                      areCardsInView || prefersReduced
                        ? { opacity: 1, y: 0, scale: 1 }
                        : { opacity: 0, y: 40, scale: 0.95 }
                    }
                    transition={{
                      duration: 0.65,
                      delay: prefersReduced ? 0 : cardDelays[idx],
                      ease: [0.16, 1, 0.3, 1], // Buttery smooth ease-out curve
                    }}
                    className={`relative flex flex-col justify-between h-full min-h-[290px] sm:min-h-[305px] p-5 sm:p-6 rounded-2xl bg-[#0C0D12]/95 border backdrop-blur-md transition-all duration-300 cursor-default select-none ${
                      hasOrangeBorder
                        ? 'border-[#FC6603] shadow-[0_0_28px_rgba(252,102,3,0.22)] -translate-y-1'
                        : 'border-white/[0.12] shadow-[0_4px_20px_rgba(0,0,0,0.5)] hover:-translate-y-1 hover:border-[#FC6603]/60'
                    }`}
                  >
                    {/* Top specular rim reflection */}
                    <div
                      aria-hidden="true"
                      className="absolute top-0 inset-x-6 h-[1px] bg-gradient-to-r from-transparent via-white/15 to-transparent pointer-events-none"
                    />

                    {/* ================= CARD HEADER: Icon (Left) & Step Number (Right) ================= */}
                    <div>
                      <div className="flex items-center justify-between mb-4">
                        {/* Upper-Left Icon with micro-animation */}
                        <div className="p-0.5">
                          {step.renderIcon(areCardsInView, prefersReduced)}
                        </div>

                        {/* Upper-Right Small Step Number in Mono */}
                        <span className="font-mono text-xs sm:text-[13px] font-bold tracking-[0.16em] text-[#8E929E]">
                          {step.number}
                        </span>
                      </div>

                      {/* Title (Bricolage Grotesque) with reserved height for natural 2-line wrapping */}
                      <div className="min-h-[50px] sm:min-h-[54px] flex items-center">
                        <h3 className="font-display font-bold text-lg sm:text-[20px] xl:text-[21px] text-[#F4F4F5] tracking-[-0.01em] leading-snug">
                          {step.title}
                        </h3>
                      </div>

                      {/* Description (Schibsted Grotesk) */}
                      <p className="font-sans text-[13px] sm:text-[13.5px] text-[#A1A1AA] leading-relaxed mt-2">
                        {step.description}
                      </p>
                    </div>

                    {/* ================= CARD FOOTER: Subtle Divider & Bottom Label ================= */}
                    <div className="pt-3.5 mt-5 border-t border-white/[0.08]">
                      <span className="font-mono text-[9.5px] sm:text-[10px] font-semibold text-[#8E929E] tracking-[0.18em] uppercase">
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
            BOTTOM CALL-TO-ACTION (Exact Match to Diagnosis / Previous Sections)
           ========================================================================= */}
        <div className="mt-10 sm:mt-12 lg:mt-14 pt-6 sm:pt-8 border-t border-white/[0.06] flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-6 text-center">
          {/* Prompt text */}
          <span className="font-sans text-[15px] sm:text-[16px] text-white/80 font-normal">
            Ready to take your next step?
          </span>

          {/* Primary CTA Button (Exact site styling: rounded-full pill, brand orange, hover glow) */}
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
