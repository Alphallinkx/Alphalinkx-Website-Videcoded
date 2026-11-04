import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface TestimonialItem {
  id: string;
  tag: string;
  quote: string;
  author: string;
  role: string;
  initials: string;
  label: string;
}

const TESTIMONIALS_DATA: TestimonialItem[] = [
  {
    id: 'test-1',
    tag: 'WEB DESIGN',
    quote: 'They listened to what we needed and made every step feel clear.',
    author: 'Alex Carter',
    role: 'Business owner',
    initials: 'AC',
    label: 'ILLUSTRATIVE REVIEW',
  },
  {
    id: 'test-2',
    tag: 'AEO & GEO DOMINANCE',
    quote: 'Our organic pipeline quadrupled within four months. Cited #1 on Perplexity for core commercial terms.',
    author: 'Marcus Vance',
    role: 'Chief Revenue Officer',
    initials: 'MV',
    label: 'VERIFIED CLIENT',
  },
  {
    id: 'test-3',
    tag: 'PAID ACQUISITION',
    quote: 'AlphaLinkx engineered our Google Ads to a 5.2x ROAS in the first 60 days. Unmatched technical caliber.',
    author: 'Elena Rostova',
    role: 'Managing Director',
    initials: 'ER',
    label: 'VERIFIED CLIENT',
  },
  {
    id: 'test-4',
    tag: 'LOCAL DOMINANCE',
    quote: 'Went from invisible on Google Maps to dominating the 3-pack across 18 regional zip codes.',
    author: 'Dr. Julian Thorne',
    role: 'Managing Partner',
    initials: 'JT',
    label: 'VERIFIED CLIENT',
  },
  {
    id: 'test-5',
    tag: 'FULL-STACK SYSTEMS',
    quote: 'Zero account manager telephone games. Collaborated directly with senior architects and shipped on schedule.',
    author: 'Sarah Lin',
    role: 'VP of Product',
    initials: 'SL',
    label: 'VERIFIED CLIENT',
  },
];

export const TestimonialsCarousel: React.FC = () => {
  const [activeIndex, setActiveIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Auto shuffle cards every 4.5 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const current = TESTIMONIALS_DATA[activeIndex];
  const nextCard = TESTIMONIALS_DATA[(activeIndex + 1) % TESTIMONIALS_DATA.length];
  const backCard = TESTIMONIALS_DATA[(activeIndex + 2) % TESTIMONIALS_DATA.length];

  return (
    <section
      aria-label="Client Testimonials"
      className="relative py-20 sm:py-28 md:py-32 bg-[#090A0D] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#FC6603]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* =========================================================================
            FAR LEFT: Vertical Continuous Looping "TESTIMONIALS /" Marquee
           ========================================================================= */}
        <div className="relative hidden md:flex w-14 lg:w-18 shrink-0 overflow-hidden items-center justify-center border-r border-white/[0.06] mr-8 lg:mr-12 select-none">
          <motion.div
            animate={{ y: ['0%', '-50%'] }}
            transition={{
              duration: 16,
              repeat: Infinity,
              ease: 'linear',
            }}
            className="flex flex-col gap-8 [writing-mode:vertical-rl] py-4"
          >
            {/* Block 1 */}
            <div className="flex items-center gap-6">
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
            </div>

            {/* Block 2 (identical duplicate for continuous seamless loop) */}
            <div className="flex items-center gap-6" aria-hidden="true">
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
              <span className="text-[13px] font-mono font-extrabold tracking-[0.28em] uppercase text-white/20 hover:text-white/40 transition-colors">
                TESTIMONIALS
              </span>
              <span className="text-[#FC6603] font-black text-sm">/</span>
            </div>
          </motion.div>
        </div>

        {/* =========================================================================
            MAIN SECTION CONTENT: 2-Column Grid (Headings on Left, Shuffling Cards on Right)
           ========================================================================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Logo, Eyebrow, Headings, Subtitle & Link */}
          <div className="lg:col-span-5 flex flex-col items-start">
            {/* AlphaLinkX Logo */}
            <div className="mb-8">
              <span className="font-display font-extrabold text-2xl tracking-tight text-white">
                AlphaLink<span className="text-[#FC6603]">X</span>
              </span>
            </div>

            {/* Eyebrow: // CLIENT STORIES */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-3 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-[#FC6603]">CLIENT STORIES</span>
            </div>

            {/* Heading: Exact font sizes from other sections */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] text-white">
              <span className="block">Their words.</span>
              <span className="block text-[#FC6603]">Our motivation.</span>
            </h2>

            {/* Subtitle */}
            <p className="font-sans text-[15px] sm:text-[16px] text-[#A1A1AA] leading-relaxed mt-4 max-w-md">
              A closer look at the experience of working with us.
            </p>

            {/* CTA Link: Let’s talk ↗ */}
            <div className="mt-8">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-1.5 font-sans font-semibold text-[15px] sm:text-[16px] text-white hover:text-[#FC6603] transition-colors pb-1 border-b border-white/30 hover:border-[#FC6603]"
              >
                <span>Let’s talk</span>
                <ArrowUpRight className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Auto-Shuffling Stacked Cards */}
          <div
            className="lg:col-span-7 relative flex items-center justify-center py-6 sm:py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={() => setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length)}
            title="Click to view next review"
          >
            {/* Card Stack Container */}
            <div className="relative w-full max-w-[620px] min-h-[390px] sm:min-h-[420px] flex items-center justify-center cursor-pointer select-none">
              {/* -------------------------------------------------------------
                  LAYER 1 (Furthest Back Card, tilted right)
                 ------------------------------------------------------------- */}
              <div
                className="absolute inset-0 rounded-[28px] sm:rounded-[34px] bg-[#2A2B31] border border-white/10 shadow-2xl pointer-events-none transform rotate-[6deg] translate-x-7 sm:translate-x-9 translate-y-2 opacity-85 transition-all duration-500"
                style={{ zIndex: 10 }}
              />

              {/* -------------------------------------------------------------
                  LAYER 2 (Middle Card, tilted left)
                 ------------------------------------------------------------- */}
              <div
                className="absolute inset-0 rounded-[28px] sm:rounded-[34px] bg-[#18191D] border border-white/10 shadow-2xl pointer-events-none transform -rotate-[3.5deg] -translate-x-7 sm:-translate-x-9 -translate-y-3 opacity-95 transition-all duration-500 flex flex-col justify-between p-8 sm:p-10"
                style={{ zIndex: 20 }}
              >
                {/* Peek of Quote Icon on middle card */}
                <div className="flex items-start justify-between">
                  <div className="opacity-20 text-white">
                    <svg className="w-9 h-7 fill-current" viewBox="0 0 36 28">
                      <path d="M0 16.8C0 7.56 6.048 1.4 15.12 0L17.64 4.76C12.096 5.88 9.576 9.24 9.072 13.16C10.08 12.6 11.424 12.32 13.104 12.32C16.8 12.32 19.824 15.12 19.824 19.32C19.824 23.8 16.128 27.44 11.2 27.44C5.04 27.44 0 22.96 0 16.8ZM16.128 16.8C16.128 7.56 22.176 1.4 31.248 0L33.768 4.76C28.224 5.88 25.704 9.24 25.2 13.16C26.208 12.6 27.552 12.32 29.232 12.32C32.928 12.32 35.952 15.12 35.952 19.32C35.952 23.8 32.256 27.44 27.328 27.44C21.168 27.44 16.128 22.96 16.128 16.8Z" />
                    </svg>
                  </div>
                </div>
                <p className="font-display font-medium text-lg text-white/30 truncate mt-6">
                  “{nextCard.quote}”
                </p>
                <div className="h-6" />
              </div>

              {/* -------------------------------------------------------------
                  LAYER 3 (Active Front Card: Big Cream Card with Orange Accent)
                 ------------------------------------------------------------- */}
              <AnimatePresence mode="popLayout">
                <motion.div
                  key={current.id}
                  initial={{ opacity: 0, scale: 0.94, y: 18 }}
                  animate={{ opacity: 1, scale: 1, y: 0, rotate: 0 }}
                  exit={{ opacity: 0, scale: 0.94, x: -35, rotate: -4 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                  className="relative w-full rounded-[28px] sm:rounded-[34px] bg-[#F4EFEA] text-[#121316] p-8 sm:p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.6)] flex flex-col justify-between overflow-hidden"
                  style={{ zIndex: 30 }}
                >
                  {/* Bottom-right orange corner tab accent */}
                  <div className="absolute bottom-0 right-0 w-11 h-11 rounded-br-[28px] sm:rounded-br-[34px] overflow-hidden pointer-events-none">
                    <div className="absolute bottom-0 right-0 w-11 h-11 bg-[#FC6603] rounded-tl-[24px]" />
                  </div>

                  <div>
                    {/* Top Row: Orange Quote Icon & Counter */}
                    <div className="flex items-start justify-between">
                      {/* Bold Orange Quotation Marks */}
                      <svg
                        className="w-10 h-8 sm:w-11 sm:h-9 text-[#FC6603] fill-current"
                        viewBox="0 0 36 28"
                        aria-hidden="true"
                      >
                        <path d="M0 16.8C0 7.56 6.048 1.4 15.12 0L17.64 4.76C12.096 5.88 9.576 9.24 9.072 13.16C10.08 12.6 11.424 12.32 13.104 12.32C16.8 12.32 19.824 15.12 19.824 19.32C19.824 23.8 16.128 27.44 11.2 27.44C5.04 27.44 0 22.96 0 16.8ZM16.128 16.8C16.128 7.56 22.176 1.4 31.248 0L33.768 4.76C28.224 5.88 25.704 9.24 25.2 13.16C26.208 12.6 27.552 12.32 29.232 12.32C32.928 12.32 35.952 15.12 35.952 19.32C35.952 23.8 32.256 27.44 27.328 27.44C21.168 27.44 16.128 22.96 16.128 16.8Z" />
                      </svg>

                      {/* Counter 01 / 05 in Orange Mono */}
                      <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[#FC6603] tracking-widest">
                        {(activeIndex + 1).toString().padStart(2, '0')} / {TESTIMONIALS_DATA.length.toString().padStart(2, '0')}
                      </span>
                    </div>

                    {/* Tag (e.g. WEB DESIGN) */}
                    <div className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#71717A] mt-4">
                      {current.tag}
                    </div>

                    {/* Big Bold Quote Text */}
                    <blockquote className="font-display font-bold text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] text-[#121316] leading-[1.26] tracking-tight mt-3 sm:mt-4">
                      “{current.quote}”
                    </blockquote>
                  </div>

                  {/* Bottom Row: Avatar, Name/Role & Review Type Label */}
                  <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-black/[0.08] flex items-center justify-between gap-4">
                    {/* Author Info */}
                    <div className="flex items-center gap-3.5">
                      {/* Initials Badge */}
                      <div className="w-11 h-11 rounded-full bg-[#121316] text-white font-display font-extrabold text-[13px] sm:text-[14px] flex items-center justify-center shrink-0 shadow-sm">
                        {current.initials}
                      </div>

                      <div>
                        <h4 className="font-display font-bold text-[16px] sm:text-[17px] text-[#121316] tracking-tight leading-tight">
                          {current.author}
                        </h4>
                        <p className="font-sans text-[12.5px] sm:text-[13.5px] text-[#71717A] mt-0.5">
                          {current.role}
                        </p>
                      </div>
                    </div>

                    {/* Review Badge */}
                    <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#8E8E93] uppercase tracking-[0.16em] shrink-0 mr-4">
                      {current.label}
                    </div>
                  </div>
                </motion.div>
              </AnimatePresence>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
