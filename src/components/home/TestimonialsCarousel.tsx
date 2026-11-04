import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';

interface Review {
  category: string;
  quote: string;
  name: string;
  role: string;
  initials: string;
}

const REVIEWS: Review[] = [
  {
    category: 'WEB DESIGN',
    quote: 'They listened to what we needed and made every step feel clear.',
    name: 'Alex Carter',
    role: 'Business owner',
    initials: 'AC',
  },
  {
    category: 'BRAND STRATEGY',
    quote: 'Our brand finally feels like us. Thoughtful, clear and built with purpose.',
    name: 'Jordan Lee',
    role: 'Founder',
    initials: 'JL',
  },
  {
    category: 'DEVELOPMENT',
    quote: 'The details made the difference. Everything feels simpler to use.',
    name: 'Sam Taylor',
    role: 'Product lead',
    initials: 'ST',
  },
  {
    category: 'COLLABORATION',
    quote: 'We always knew what was happening, and what was coming next.',
    name: 'Morgan Ellis',
    role: 'Marketing lead',
    initials: 'ME',
  },
  {
    category: 'DIGITAL EXPERIENCE',
    quote: 'From the first conversation to launch, it felt like one connected team.',
    name: 'Casey Brooks',
    role: 'Business owner',
    initials: 'CB',
  },
];

const INTERVAL = 6000;
const pad = (n: number) => String(n).padStart(2, '0');

export const TestimonialsCarousel: React.FC = () => {
  const [index, setIndex] = useState(0);
  const [manualPause, setManualPause] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [focused, setFocused] = useState(false);
  const [visible, setVisible] = useState(true);
  const [isTabHidden, setIsTabHidden] = useState(false);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [elapsed, setElapsed] = useState(0);
  const [announcement, setAnnouncement] = useState('');

  const sectionRef = useRef<HTMLElement>(null);
  const reviewAreaRef = useRef<HTMLDivElement>(null);
  const deckRef = useRef<HTMLDivElement>(null);
  const touchStartRef = useRef<{ x: number; y: number } | null>(null);
  const lastTimeRef = useRef<number>(performance.now());
  const elapsedRef = useRef(0);
  const isPausedRef = useRef(false);

  // Track reduced motion preference
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    setReducedMotion(mq.matches);
    if (mq.matches) setManualPause(true);

    const handler = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches);
      if (e.matches) setManualPause(true);
    };
    mq.addEventListener('change', handler);
    return () => mq.removeEventListener('change', handler);
  }, []);

  // Track tab visibility
  useEffect(() => {
    const handler = () => setIsTabHidden(document.hidden);
    document.addEventListener('visibilitychange', handler);
    return () => document.removeEventListener('visibilitychange', handler);
  }, []);

  // Track viewport intersection
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  const isPaused =
    manualPause || hovered || focused || !visible || isTabHidden || reducedMotion;
  isPausedRef.current = isPaused;

  const changeReview = (target: number, isManual = false) => {
    elapsedRef.current = 0;
    setElapsed(0);
    setIndex(target);
    lastTimeRef.current = performance.now();

    if (isManual) {
      setAnnouncement(
        `Review ${target + 1} of ${REVIEWS.length}. ${REVIEWS[target].quote} Illustrative review.`
      );
    }
  };

  // Autoplay timer with RAF for silky-smooth progress sync
  useEffect(() => {
    let animId: number;

    const tick = (now: number) => {
      const delta = Math.min(now - lastTimeRef.current, 100);
      lastTimeRef.current = now;

      if (!isPausedRef.current) {
        elapsedRef.current += delta;
        setElapsed(elapsedRef.current);

        if (elapsedRef.current >= INTERVAL) {
          elapsedRef.current = 0;
          setElapsed(0);
          setIndex((prev) => (prev + 1) % REVIEWS.length);
        }
      }

      animId = requestAnimationFrame(tick);
    };

    lastTimeRef.current = performance.now();
    animId = requestAnimationFrame(tick);

    return () => cancelAnimationFrame(animId);
  }, []);

  // Touch swipe support on deck
  const handlePointerDown = (e: React.PointerEvent) => {
    if (e.pointerType !== 'mouse') {
      touchStartRef.current = { x: e.clientX, y: e.clientY };
    }
  };

  const handlePointerUp = (e: React.PointerEvent) => {
    if (!touchStartRef.current) return;
    const dx = e.clientX - touchStartRef.current.x;
    const dy = e.clientY - touchStartRef.current.y;
    touchStartRef.current = null;

    if (Math.abs(dx) > 45 && Math.abs(dx) > Math.abs(dy)) {
      if (dx < 0) {
        changeReview((index + 1) % REVIEWS.length, true);
      } else {
        changeReview((index + REVIEWS.length - 1) % REVIEWS.length, true);
      }
    }
  };

  // Keyboard navigation
  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'ArrowRight') {
      e.preventDefault();
      changeReview((index + 1) % REVIEWS.length, true);
    } else if (e.key === 'ArrowLeft') {
      e.preventDefault();
      changeReview((index + REVIEWS.length - 1) % REVIEWS.length, true);
    }
  };

  return (
    <section
      ref={sectionRef}
      id="testimonials"
      aria-labelledby="testimonials-title"
      className="relative isolation-isolate overflow-hidden min-h-[720px] lg:min-h-[780px] xl:min-h-[840px] flex items-center py-20 lg:py-24 xl:py-28 bg-[#0B0B0C] text-[#F7F7F5]"
      style={{
        backgroundImage:
          'radial-gradient(ellipse at 65% 50%, rgba(25, 19, 15, 0.45), transparent 62%)',
      }}
    >
      {/* Subtle Noise Texture Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none opacity-[0.035]"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 180 180' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.8' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23fff' filter='url(%23n)' opacity='.8' d='M0 0h180v180H0z'/%3E%3C/svg%3E")`,
        }}
      />

      {/* =========================================================================
          ZONE 1: FAR LEFT VERTICAL OVERSIZED MARQUEE WITH EXPANDED LETTER SPACING
         ========================================================================= */}
      <div
        aria-hidden="true"
        className="pointer-events-none select-none z-0
          max-md:absolute max-md:left-0 max-md:right-0 max-md:top-2 max-md:w-full max-md:h-[70px]
          md:absolute md:left-[2.5vw] lg:left-[3vw] md:top-0 md:bottom-0 md:w-[8vw] md:min-w-[80px] md:max-w-[125px]
          overflow-hidden"
        style={{
          maskImage:
            typeof window !== 'undefined' && window.innerWidth < 768
              ? 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'
              : 'linear-gradient(transparent, #000 10%, #000 90%, transparent)',
          WebkitMaskImage:
            typeof window !== 'undefined' && window.innerWidth < 768
              ? 'linear-gradient(90deg, transparent, #000 8%, #000 92%, transparent)'
              : 'linear-gradient(transparent, #000 10%, #000 90%, transparent)',
        }}
      >
        <div
          className={`flex w-full ${isPaused ? '[animation-play-state:paused]' : ''}
            max-md:w-max max-md:flex-row max-md:animate-[marquee-x_28s_linear_infinite]
            md:flex-col md:animate-[marquee-y_30s_linear_infinite]`}
        >
          {/* Loop Group 1 */}
          <div className="flex max-md:flex-row max-md:gap-[28px] max-md:pr-[28px] md:flex-col md:items-center md:gap-8 md:pb-8">
            <span
              className="font-display font-extrabold text-[#646464] tracking-[0.2em] sm:tracking-[0.25em] leading-none select-none
                max-md:text-[56px] max-md:[writing-mode:horizontal-tb]
                md:text-[clamp(54px,4.8vw,86px)] md:[writing-mode:vertical-rl]"
            >
              TESTIMONIALS
            </span>
            <b className="font-normal text-[#FC6603] leading-none select-none max-md:text-[42px] md:text-[58px] my-1 md:my-2">
              /
            </b>
            <span
              className="font-display font-extrabold text-[#646464] tracking-[0.2em] sm:tracking-[0.25em] leading-none select-none
                max-md:text-[56px] max-md:[writing-mode:horizontal-tb]
                md:text-[clamp(54px,4.8vw,86px)] md:[writing-mode:vertical-rl]"
            >
              TESTIMONIALS
            </span>
            <b className="font-normal text-[#FC6603] leading-none select-none max-md:text-[42px] md:text-[58px] my-1 md:my-2">
              /
            </b>
          </div>

          {/* Loop Group 2 (Exact duplicate for seamless looping) */}
          <div
            className="flex max-md:flex-row max-md:gap-[28px] max-md:pr-[28px] md:flex-col md:items-center md:gap-8 md:pb-8"
            aria-hidden="true"
          >
            <span
              className="font-display font-extrabold text-[#646464] tracking-[0.2em] sm:tracking-[0.25em] leading-none select-none
                max-md:text-[56px] max-md:[writing-mode:horizontal-tb]
                md:text-[clamp(54px,4.8vw,86px)] md:[writing-mode:vertical-rl]"
            >
              TESTIMONIALS
            </span>
            <b className="font-normal text-[#FC6603] leading-none select-none max-md:text-[42px] md:text-[58px] my-1 md:my-2">
              /
            </b>
            <span
              className="font-display font-extrabold text-[#646464] tracking-[0.2em] sm:tracking-[0.25em] leading-none select-none
                max-md:text-[56px] max-md:[writing-mode:horizontal-tb]
                md:text-[clamp(54px,4.8vw,86px)] md:[writing-mode:vertical-rl]"
            >
              TESTIMONIALS
            </span>
            <b className="font-normal text-[#FC6603] leading-none select-none max-md:text-[42px] md:text-[58px] my-1 md:my-2">
              /
            </b>
          </div>
        </div>
      </div>

      {/* =========================================================================
          MAIN CONTAINER: 2-COLUMN GRID WITH GENEROUS SPACIOUS GAP
         ========================================================================= */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-6 sm:px-8 md:pl-[10vw] lg:pl-[11vw] md:pr-[4vw] lg:pr-[5vw]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-14 lg:gap-20 xl:gap-28 items-center">
          {/* =========================================================================
              ZONE 2: MIDDLE LEFT SECTION INTRODUCTION & WRITE A REVIEW BUTTON
             ========================================================================= */}
          <header className="lg:col-span-5 flex flex-col items-start pt-14 md:pt-0 pb-4 lg:pb-16 max-w-[430px]">
            {/* Eyebrow */}
            <p className="font-mono text-[12px] font-medium tracking-[0.16em] text-[#FC6603] uppercase mb-4 sm:mb-5">
              // CLIENT STORIES
            </p>

            {/* Two-Line Heading */}
            <h2
              id="testimonials-title"
              className="font-display font-bold text-[clamp(36px,3.4vw,56px)] leading-[1.03] tracking-[-0.04em] text-white mb-5 sm:mb-6"
            >
              Their words.
              <span className="block text-[#FC6603]">Our motivation.</span>
            </h2>

            {/* Supporting Text */}
            <p className="font-sans text-[16px] sm:text-[17px] text-[#AAAAAA] leading-[1.6] max-w-[370px] mb-8 sm:mb-9">
              A closer look at the experience of working with us.
            </p>

            {/* CTA Button: Write a review */}
            <div>
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3.5 pl-6 pr-2.5 py-2.5 sm:pl-7 sm:pr-3 sm:py-3 rounded-full bg-[#16171B] border border-white/[0.14] text-white hover:border-[#FC6603] hover:bg-[#1C1D22] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_28px_rgba(252,102,3,0.35)] hover:scale-[1.02] active:scale-[0.98] focus-visible:outline-2 focus-visible:outline-[#FC6603] focus-visible:outline-offset-4"
              >
                <span className="font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.14em] text-white group-hover:text-[#FC6603] transition-colors">
                  Write a review
                </span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FC6603] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                  <svg
                    className="w-3.5 h-3.5 stroke-[2.5]"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="7" y1="17" x2="17" y2="7" />
                    <polyline points="7 7 17 7 17 17" />
                  </svg>
                </span>
              </Link>
            </div>
          </header>

          {/* =========================================================================
              ZONE 3: RIGHT LAYERED SHUFFLING CARDS & CONTROLS
             ========================================================================= */}
          <div
            ref={reviewAreaRef}
            role="region"
            aria-roledescription="carousel"
            aria-label="Client reviews"
            tabIndex={0}
            onPointerEnter={(e) => {
              if (e.pointerType === 'mouse') setHovered(true);
            }}
            onPointerLeave={() => setHovered(false)}
            onFocus={() => setFocused(true)}
            onBlur={(e) => {
              if (!reviewAreaRef.current?.contains(e.relatedTarget as Node)) {
                setFocused(false);
              }
            }}
            onKeyDown={handleKeyDown}
            className="lg:col-span-7 w-full max-w-[570px] lg:max-w-[590px] ml-auto justify-self-end pt-4 lg:pt-8 focus-visible:outline-none"
          >
            {/* 3D Overlapping Card Deck with Silky Smooth Slot Transitions */}
            <div
              ref={deckRef}
              onPointerDown={handlePointerDown}
              onPointerUp={handlePointerUp}
              onPointerCancel={() => {
                touchStartRef.current = null;
              }}
              className="relative w-full aspect-[411/254] max-md:min-h-[290px] [container-type:inline-size] touch-pan-y [perspective:1400px] isolation-isolate select-none"
            >
              {REVIEWS.map((r, i) => {
                const slot = (i - index + REVIEWS.length) % REVIEWS.length;
                const isFront = slot === 0;
                const isMiddle = slot === 1;
                const isRear = slot === 2;
                const isExited = slot === REVIEWS.length - 1;

                // Color themes matching the approved design
                const cardTheme = isFront
                  ? 'bg-[#F5EFE5] text-[#191919] border border-white/40 shadow-[0_14px_30px_rgba(0,0,0,0.2)]'
                  : isMiddle
                  ? 'bg-[#B9B2A8] text-[#71695F] border border-white/20 shadow-[0_8px_20px_rgba(0,0,0,0.12)]'
                  : 'bg-[#292827] text-[#77736E] border border-white/[0.08] shadow-none';

                return (
                  <motion.article
                    key={r.name}
                    initial={false}
                    animate={{
                      x: isFront
                        ? '0%'
                        : isMiddle
                        ? '7%'
                        : isRear
                        ? '-9%'
                        : isExited
                        ? '24%'
                        : '-12%',
                      y: isFront
                        ? '0%'
                        : isMiddle
                        ? '-0.5%'
                        : isRear
                        ? '-6%'
                        : isExited
                        ? '-12%'
                        : '-8%',
                      rotate: isFront
                        ? 0
                        : isMiddle
                        ? -5
                        : isRear
                        ? -7
                        : isExited
                        ? 9
                        : -9,
                      scale: isFront ? 1 : isMiddle ? 0.98 : isRear ? 1 : 0.94,
                      opacity: isFront || isMiddle || isRear ? 1 : 0,
                      zIndex: isFront ? 30 : isMiddle ? 20 : isRear ? 10 : 0,
                    }}
                    transition={
                      reducedMotion
                        ? { duration: 0.05 }
                        : {
                            duration: 0.78,
                            ease: [0.22, 0.68, 0.2, 1],
                          }
                    }
                    data-slot={slot}
                    aria-hidden={!isFront}
                    aria-roledescription="slide"
                    aria-label={`${i + 1} of ${REVIEWS.length}`}
                    className={`review-card absolute inset-0 rounded-[5cqw] p-[5.5cqw_7cqw_5cqw] overflow-hidden flex flex-col will-change-transform transition-colors duration-500 ${cardTheme}`}
                    style={{ pointerEvents: isFront ? 'auto' : 'none' }}
                  >
                    {/* Subtle Paper Texture Overlay */}
                    <div
                      aria-hidden="true"
                      className="absolute inset-0 pointer-events-none opacity-[0.04]"
                      style={{
                        backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 120 120' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='.7' numOctaves='3' stitchTiles='stitch'/%3E%3C/filter%3E%3Cpath fill='%23888888' filter='url(%23n)' d='M0 0h120v120H0z'/%3E%3C/svg%3E")`,
                      }}
                    />

                    {/* Small Orange Curved Accent in Bottom-Right Corner (Fades out when not front) */}
                    <div
                      aria-hidden="true"
                      className={`absolute bottom-0 right-0 w-[9cqw] h-[9cqw] bg-[#FC6603] rounded-tl-full pointer-events-none transition-opacity duration-500 ${
                        isFront ? 'opacity-100' : 'opacity-0'
                      }`}
                    />

                    {/* Card Top Row: Quotation Icon & Counter */}
                    <div className="flex items-center justify-between mb-[3cqw] relative z-10">
                      <svg
                        className={`w-[8cqw] h-[5.5cqw] transition-colors duration-500 ${
                          isFront ? 'fill-[#FC6603]' : 'fill-[#77736E]'
                        }`}
                        viewBox="0 0 52 42"
                        aria-hidden="true"
                      >
                        <path d="M0 42V21C0 8 8 1 22 0v10C15 11 12 15 12 21h10v21H0zm30 0V21C30 8 38 1 52 0v10c-7 1-10 5-10 11h10v21H30z" />
                      </svg>
                      <span
                        className={`font-mono text-[2.35cqw] transition-colors duration-500 ${
                          isFront ? 'text-[#D65300]' : 'text-[#77736E]'
                        }`}
                      >
                        {pad(i + 1)} / {pad(REVIEWS.length)}
                      </span>
                    </div>

                    {/* Category Label */}
                    <p className="font-mono font-bold text-[2.6cqw] leading-[1.2] tracking-[0.08em] uppercase mb-[1.8cqw] relative z-10">
                      {r.category}
                    </p>

                    {/* Testimonial Quote */}
                    <blockquote className="font-display font-medium text-[6.5cqw] leading-[1.1] tracking-[-0.04em] mb-[4cqw] max-w-full relative z-10">
                      “{r.quote}”
                    </blockquote>

                    {/* Author Footer */}
                    <footer className="mt-auto flex items-center gap-[3.4cqw] border-t border-[#262626]/20 pt-[3.5cqw] relative z-10">
                      {/* Initials Avatar */}
                      <div
                        aria-hidden="true"
                        className="w-[7.8cqw] h-[7.8cqw] shrink-0 bg-[#232323] text-white rounded-full grid place-items-center text-[2.6cqw] font-bold"
                      >
                        {r.initials}
                      </div>

                      {/* Name & Role */}
                      <div className="border-l border-[#262626]/20 pl-[3.4cqw]">
                        <div className="font-sans font-bold text-[3.2cqw] leading-tight mb-[0.5cqw] text-inherit">
                          {r.name}
                        </div>
                        <div className="font-sans text-[2.6cqw] text-[#726C65] leading-tight">
                          {r.role}
                        </div>
                      </div>

                      {/* Illustrative Sample Label */}
                      <span className="ml-auto font-mono text-[2cqw] tracking-[0.035em] text-[#766E64] text-right whitespace-nowrap leading-[1.4]">
                        ILLUSTRATIVE REVIEW
                      </span>
                    </footer>
                  </motion.article>
                );
              })}
            </div>

            {/* =========================================================================
                CONTROLS: PROGRESS INDICATORS, COUNTER, AND TRANSPORT BUTTONS
               ========================================================================= */}
            <div className="flex items-center gap-3 sm:gap-5 mt-10 sm:mt-12">
              {/* Counter: 01 / 05 */}
              <span
                className="font-mono text-[12px] text-[#A1A1AA] whitespace-nowrap min-w-[58px] select-none"
                aria-hidden="true"
              >
                {pad(index + 1)} / {pad(REVIEWS.length)}
              </span>

              {/* Clickable Progress Segments */}
              <div
                className="flex-1 flex gap-1.5 sm:gap-2"
                role="tablist"
                aria-label="Choose a review"
              >
                {REVIEWS.map((r, i) => {
                  const isCurrent = i === index;
                  const scaleX = isCurrent ? Math.max(0.05, elapsed / INTERVAL) : 0;

                  return (
                    <button
                      key={i}
                      type="button"
                      role="tab"
                      aria-selected={isCurrent}
                      aria-label={`Show review ${i + 1}: ${r.category.toLowerCase()}`}
                      onClick={() => changeReview(i, true)}
                      className="group relative h-6 flex-1 bg-transparent border-0 py-2.5 px-0 cursor-pointer focus-visible:outline-2 focus-visible:outline-[#FC6603] focus-visible:outline-offset-2"
                    >
                      {/* Base Track */}
                      <span className="absolute left-0 right-0 top-2.5 h-1 bg-[#454544] rounded-full transition-colors group-hover:bg-[#5A5A58]" />
                      {/* Active Progress Bar */}
                      <span
                        className="block h-1 relative origin-left bg-[#FC6603] rounded-full transition-transform duration-75 ease-linear"
                        style={{
                          transform: `scaleX(${scaleX})`,
                        }}
                      />
                    </button>
                  );
                })}
              </div>

              {/* Transport Buttons: Previous, Pause/Play, Next */}
              <div className="flex items-center gap-2 sm:gap-2.5">
                {/* Previous Button */}
                <button
                  type="button"
                  onClick={() =>
                    changeReview((index + REVIEWS.length - 1) % REVIEWS.length, true)
                  }
                  aria-label="Previous review"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#888888] bg-transparent text-[#EEEEEE] grid place-items-center transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#FC6603] focus-visible:outline-offset-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M20 12H4m7-7-7 7 7 7" />
                  </svg>
                </button>

                {/* Pause / Play Toggle Button */}
                <button
                  type="button"
                  disabled={reducedMotion}
                  onClick={() => setManualPause((prev) => !prev)}
                  aria-label={
                    reducedMotion
                      ? 'Animations disabled by reduced-motion preference'
                      : manualPause
                      ? 'Play animations'
                      : 'Pause animations'
                  }
                  className={`w-9 h-9 sm:w-10 sm:h-10 rounded-full grid place-items-center transition-all duration-200 hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#FC6603] focus-visible:outline-offset-2 ${
                    manualPause
                      ? 'bg-transparent border border-[#888888] text-white hover:bg-white/[0.08]'
                      : 'bg-[#FC6603] border border-[#FC6603] text-white shadow-[0_0_15px_rgba(252,102,3,0.3)]'
                  }`}
                >
                  {manualPause ? (
                    <svg
                      className="w-4 h-4 ml-0.5"
                      viewBox="0 0 24 24"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  ) : (
                    <svg
                      className="w-4 h-4"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth="2.5"
                      aria-hidden="true"
                    >
                      <path d="M8 5v14M16 5v14" />
                    </svg>
                  )}
                </button>

                {/* Next Button */}
                <button
                  type="button"
                  onClick={() => changeReview((index + 1) % REVIEWS.length, true)}
                  aria-label="Next review"
                  className="w-9 h-9 sm:w-10 sm:h-10 rounded-full border border-[#888888] bg-transparent text-[#EEEEEE] grid place-items-center transition-all duration-200 hover:bg-white/[0.08] hover:-translate-y-0.5 focus-visible:outline-2 focus-visible:outline-[#FC6603] focus-visible:outline-offset-2"
                >
                  <svg
                    className="w-4 h-4"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="1.8"
                    aria-hidden="true"
                  >
                    <path d="M4 12h16m-7-7 7 7-7 7" />
                  </svg>
                </button>
              </div>
            </div>

            {/* Screen Reader Live Announcement */}
            <p className="sr-only" aria-live="polite" aria-atomic="true">
              {announcement}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
