import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { ArrowUpRight } from 'lucide-react';
import { motion } from 'framer-motion';

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
  const [isShuffling, setIsShuffling] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const isShufflingRef = useRef(false);
  isShufflingRef.current = isShuffling;

  // Trigger shuffle animation: Front card swipes right and tucks behind upcoming card
  const handleShuffle = () => {
    if (isShufflingRef.current) return;
    setIsShuffling(true);

    // 650ms matches the swipe-right-then-back transition duration
    setTimeout(() => {
      setActiveIndex((prev) => (prev + 1) % TESTIMONIALS_DATA.length);
      setIsShuffling(false);
    }, 650);
  };

  // Auto-shuffle cards every 4.8 seconds (pauses on hover)
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      handleShuffle();
    }, 4800);
    return () => clearInterval(interval);
  }, [isPaused]);

  // Responsive swipe distance: ~240px on desktop, ~170px on mobile
  const swipeDistance = typeof window !== 'undefined' && window.innerWidth < 640 ? 170 : 250;

  // Derive the 3 cards currently visible in the stack
  const total = TESTIMONIALS_DATA.length;
  const frontCard = TESTIMONIALS_DATA[activeIndex];
  const upcomingCard = TESTIMONIALS_DATA[(activeIndex + 1) % total];
  const backCard = TESTIMONIALS_DATA[(activeIndex + 2) % total];

  // Helper renderer for a single testimonial card
  const renderCardContent = (item: TestimonialItem, indexNumber: number) => (
    <div className="relative w-full h-full flex flex-col justify-between">
      {/* Curved orange corner tab accent */}
      <div className="absolute bottom-0 right-0 w-11 h-11 rounded-br-[28px] sm:rounded-br-[34px] overflow-hidden pointer-events-none">
        <div className="absolute bottom-0 right-0 w-11 h-11 bg-[#FC6603] rounded-tl-[24px]" />
      </div>

      <div>
        {/* Top Row: Orange Quotation Marks & Index Counter */}
        <div className="flex items-start justify-between">
          <svg
            className="w-10 h-8 sm:w-11 sm:h-9 text-[#FC6603] fill-current"
            viewBox="0 0 36 28"
            aria-hidden="true"
          >
            <path d="M0 16.8C0 7.56 6.048 1.4 15.12 0L17.64 4.76C12.096 5.88 9.576 9.24 9.072 13.16C10.08 12.6 11.424 12.32 13.104 12.32C16.8 12.32 19.824 15.12 19.824 19.32C19.824 23.8 16.128 27.44 11.2 27.44C5.04 27.44 0 22.96 0 16.8ZM16.128 16.8C16.128 7.56 22.176 1.4 31.248 0L33.768 4.76C28.224 5.88 25.704 9.24 25.2 13.16C26.208 12.6 27.552 12.32 29.232 12.32C32.928 12.32 35.952 15.12 35.952 19.32C35.952 23.8 32.256 27.44 27.328 27.44C21.168 27.44 16.128 22.96 16.128 16.8Z" />
          </svg>

          <span className="font-mono text-[12px] sm:text-[13px] font-bold text-[#FC6603] tracking-widest">
            {indexNumber.toString().padStart(2, '0')} / {total.toString().padStart(2, '0')}
          </span>
        </div>

        {/* Category Tag */}
        <div className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.2em] text-[#71717A] mt-4">
          {item.tag}
        </div>

        {/* Big Bold Quote Text */}
        <blockquote className="font-display font-bold text-[22px] sm:text-[26px] md:text-[30px] lg:text-[32px] text-[#121316] leading-[1.26] tracking-tight mt-3 sm:mt-4">
          “{item.quote}”
        </blockquote>
      </div>

      {/* Bottom Row: Initials Badge, Name/Role & Review Type */}
      <div className="pt-6 sm:pt-8 mt-6 sm:mt-8 border-t border-black/[0.08] flex items-center justify-between gap-4">
        <div className="flex items-center gap-3.5">
          <div className="w-11 h-11 rounded-full bg-[#121316] text-white font-display font-extrabold text-[13px] sm:text-[14px] flex items-center justify-center shrink-0 shadow-sm">
            {item.initials}
          </div>

          <div>
            <h4 className="font-display font-bold text-[16px] sm:text-[17px] text-[#121316] tracking-tight leading-tight">
              {item.author}
            </h4>
            <p className="font-sans text-[12.5px] sm:text-[13.5px] text-[#71717A] mt-0.5">
              {item.role}
            </p>
          </div>
        </div>

        <div className="font-mono text-[10px] sm:text-[11px] font-semibold text-[#8E8E93] uppercase tracking-[0.16em] shrink-0 mr-4">
          {item.label}
        </div>
      </div>
    </div>
  );

  return (
    <section
      aria-label="Client Testimonials"
      className="relative py-20 sm:py-28 md:py-32 bg-[#090A0D] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Subtle ambient lighting */}
      <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[600px] h-[400px] bg-[#FC6603]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 w-full max-w-[1380px] mx-auto px-4 sm:px-6 lg:px-8 flex">
        {/* =========================================================================
            FAR LEFT: Bigger, Clean Two-Word "TESTIMONIALS / TESTIMONIALS" Text
           ========================================================================= */}
        <div className="relative hidden md:flex w-20 lg:w-24 shrink-0 items-center justify-center border-r border-white/[0.08] mr-8 lg:mr-14 select-none">
          <div className="[writing-mode:vertical-rl] flex items-center justify-center gap-8 py-8 tracking-[0.24em] uppercase font-mono font-black text-2xl lg:text-3xl text-white/20 select-none">
            <span>TESTIMONIALS</span>
            <span className="text-[#FC6603] font-black text-3xl">/</span>
            <span>TESTIMONIALS</span>
          </div>
        </div>

        {/* =========================================================================
            MAIN SECTION CONTENT: 2-Column Grid (Headings on Left, Shuffling Cards on Right)
           ========================================================================= */}
        <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14 items-center">
          {/* LEFT COLUMN: Eyebrow, Headings, Subtitle & Write a review Button */}
          <div className="lg:col-span-5 flex flex-col items-start">
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

            {/* CTA Button: Write a review */}
            <div className="mt-8 sm:mt-10">
              <Link
                to="/contact"
                className="group relative inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 sm:pl-7 sm:pr-3 sm:py-3 rounded-full bg-[#16171B] border border-white/[0.14] text-white hover:border-[#FC6603] hover:bg-[#1C1D22] transition-all duration-300 shadow-[0_4px_24px_rgba(0,0,0,0.5)] hover:shadow-[0_0_28px_rgba(252,102,3,0.35)] hover:scale-[1.02] active:scale-[0.98]"
              >
                <span className="font-mono text-[12px] sm:text-[13px] font-bold uppercase tracking-[0.14em] text-white group-hover:text-[#FC6603] transition-colors">
                  Write a review
                </span>
                <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-[#FC6603] text-white flex items-center justify-center shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                  <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
                </span>
              </Link>
            </div>
          </div>

          {/* RIGHT COLUMN: Auto-Shuffling Stacked Cards with Swipe-Right Animation */}
          <div
            className="lg:col-span-7 relative flex items-center justify-center py-6 sm:py-8"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onClick={handleShuffle}
            title="Click to shuffle to next review"
          >
            {/* Card Stack Container */}
            <div className="relative w-full max-w-[620px] min-h-[390px] sm:min-h-[420px] flex items-center justify-center cursor-pointer select-none">
              {/* -----------------------------------------------------------------
                  CARD 3: Furthest Back Card (Tilted right -> moves to Middle)
                 ----------------------------------------------------------------- */}
              <motion.div
                key={`back-${backCard.id}`}
                className="absolute inset-0 rounded-[28px] sm:rounded-[34px] bg-[#2A2B31] border border-white/10 shadow-2xl overflow-hidden p-8 sm:p-10 md:p-12"
                initial={false}
                animate={
                  isShuffling
                    ? {
                        x: -28,
                        y: -12,
                        rotate: -3.5,
                        scale: 0.95,
                        zIndex: 15,
                        opacity: 0.95,
                      }
                    : {
                        x: 28,
                        y: 8,
                        rotate: 6,
                        scale: 0.91,
                        zIndex: 10,
                        opacity: 0.85,
                      }
                }
                transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
              >
                {/* Dark charcoal veil */}
                <div className="absolute inset-0 bg-[#2A2B31] opacity-95 pointer-events-none" />
              </motion.div>

              {/* -----------------------------------------------------------------
                  CARD 2: Middle Card (Tilted left -> steps forward to Front)
                 ----------------------------------------------------------------- */}
              <motion.div
                key={`upcoming-${upcomingCard.id}`}
                className="absolute inset-0 rounded-[28px] sm:rounded-[34px] bg-[#F4EFEA] text-[#121316] border border-white/10 shadow-2xl overflow-hidden p-8 sm:p-10 md:p-12"
                initial={false}
                animate={
                  isShuffling
                    ? {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1.0,
                        zIndex: 25,
                      }
                    : {
                        x: -28,
                        y: -12,
                        rotate: -3.5,
                        scale: 0.95,
                        zIndex: 20,
                      }
                }
                transition={{ duration: 0.65, ease: [0.25, 1, 0.5, 1] }}
              >
                {renderCardContent(upcomingCard, ((activeIndex + 1) % total) + 1)}

                {/* Dark veil that smoothly fades out as this card steps forward */}
                <motion.div
                  className="absolute inset-0 bg-[#18191D] pointer-events-none"
                  initial={false}
                  animate={{ opacity: isShuffling ? 0 : 0.92 }}
                  transition={{ duration: 0.5, ease: 'easeInOut' }}
                />
              </motion.div>

              {/* -----------------------------------------------------------------
                  CARD 1: Front Active Card (Swipes Right then tucks to Back)
                 ----------------------------------------------------------------- */}
              <motion.div
                key={`front-${frontCard.id}`}
                className="relative w-full rounded-[28px] sm:rounded-[34px] bg-[#F4EFEA] text-[#121316] p-8 sm:p-10 md:p-12 shadow-[0_30px_70px_rgba(0,0,0,0.6)] overflow-hidden"
                initial={false}
                animate={
                  isShuffling
                    ? {
                        x: [0, swipeDistance, 28],
                        y: [0, -6, 8],
                        rotate: [0, 9, 6],
                        scale: [1.0, 0.98, 0.91],
                        zIndex: [30, 30, 10],
                      }
                    : {
                        x: 0,
                        y: 0,
                        rotate: 0,
                        scale: 1.0,
                        zIndex: 30,
                      }
                }
                transition={
                  isShuffling
                    ? {
                        duration: 0.65,
                        times: [0, 0.42, 1],
                        ease: [0.25, 1, 0.5, 1],
                      }
                    : { duration: 0.2 }
                }
              >
                {renderCardContent(frontCard, activeIndex + 1)}

                {/* Dark veil that fades in as this card tucks behind to the back */}
                {isShuffling && (
                  <motion.div
                    className="absolute inset-0 bg-[#2A2B31] pointer-events-none"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: [0, 0.4, 0.92] }}
                    transition={{ duration: 0.65, times: [0, 0.4, 1] }}
                  />
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default TestimonialsCarousel;
