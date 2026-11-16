'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticHeading } from '../common/MagneticHeading';
import { Two26Button } from '../common/Two26Button';
import { ArrowLeft, ArrowRight, Quote } from 'lucide-react';

interface Testimonial {
  quote: string;
  name: string;
  role: string;
  company: string;
  initials: string;
  rotation: number;
}

const TESTIMONIALS: Testimonial[] = [
  {
    quote:
      'Working with AlphaLinkx is a bit like brainstorming with your most ambitious partners. Always insightful, always constructive. Our organic leads doubled within 90 days.',
    name: 'Marcus Vance',
    role: 'Founder & CEO',
    company: 'Nexus Robotics',
    initials: 'MV',
    rotation: -3.5,
  },
  {
    quote:
      'They took our outdated enterprise presence and engineered a modern high-performance system that actually converts. Best development investment we have ever made.',
    name: 'Elena Rostova',
    role: 'VP of Growth',
    company: 'Strata Cloud',
    initials: 'ER',
    rotation: 4.2,
  },
  {
    quote:
      'We went from invisible on AI search to the #1 cited recommendation on ChatGPT and Perplexity in our category. The level of technical depth is unmatched.',
    name: 'David Chen',
    role: 'Managing Director',
    company: 'Aura Health Tech',
    initials: 'DC',
    rotation: -4.8,
  },
  {
    quote:
      'Zero agency fluff. Transparent milestones, relentless execution speed, and measurable ROI from sprint one. Highly recommended for brands ready to dominate.',
    name: 'Sarah Jenkins',
    role: 'Chief Marketing Officer',
    company: 'Lumina Luxury Group',
    initials: 'SJ',
    rotation: 3.8,
  },
];

export const Two26Testimonials: React.FC = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  const nextCard = () => {
    setCurrentIndex((prev) => (prev + 1) % TESTIMONIALS.length);
  };

  const prevCard = () => {
    setCurrentIndex((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);
  };

  return (
    <section className="relative w-full py-20 sm:py-28 bg-[#F8EEE8] border-b border-[#DAD1CC] overflow-hidden select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
        {/* Section Header with Dual Magnetic Offset */}
        <div className="text-center mb-16 sm:mb-20">
          <div className="font-mono text-[11px] sm:text-[13px] font-bold text-[#FF5400] uppercase tracking-[0.24em] mb-4">
            // CLIENT VOICES
          </div>
          <MagneticHeading as="h2">
            <span className="block text-[44px] sm:text-[68px] md:text-[88px] lg:text-[104px] tracking-[-0.03em] leading-[0.85]">
              WHAT THEY SAY.
            </span>
          </MagneticHeading>
          <p className="font-sans text-[16px] sm:text-[18px] text-[#333333] mt-6 max-w-xl mx-auto leading-[1.5]">
            Real feedback from founders and growth leaders who trusted us with their core commercial architecture.
          </p>
        </div>

        {/* Stacked Cards Deck Area */}
        <div className="relative w-full max-w-2xl mx-auto aspect-[16/11] sm:aspect-[16/9] min-h-[340px] sm:min-h-[380px] mb-12 sm:mb-16">
          {TESTIMONIALS.map((t, idx) => {
            const order = (idx - currentIndex + TESTIMONIALS.length) % TESTIMONIALS.length;
            const isFront = order === 0;
            const isSecond = order === 1;
            const isThird = order === 2;
            const isVisible = isFront || isSecond || isThird;

            if (!isVisible) return null;

            const zIndex = 30 - order * 10;
            const scale = 1 - order * 0.05;
            const yOffset = order * 12;
            const rotation = isFront ? 0 : order === 1 ? t.rotation : -t.rotation;

            const bgClass = isFront
              ? 'bg-[#FDF8F5] text-[#000000] border-[#DAD1CC] shadow-xl'
              : isSecond
              ? 'bg-[#ECEAE5] text-[#333333] border-[#DAD1CC] shadow-md'
              : 'bg-[#F3EEEB] text-[#555555] border-[#DAD1CC] shadow-sm';

            return (
              <motion.div
                key={t.name}
                initial={false}
                animate={{
                  scale,
                  y: yOffset,
                  rotate: rotation,
                  opacity: 1,
                  zIndex,
                }}
                transition={{
                  duration: 0.65,
                  ease: [0.22, 1, 0.36, 1],
                }}
                onClick={isFront ? nextCard : undefined}
                className={`absolute inset-0 rounded-[28px] sm:rounded-[36px] border p-8 sm:p-12 flex flex-col justify-between cursor-pointer will-change-transform ${bgClass}`}
              >
                {/* Top Quote Icon + Counter */}
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-full bg-[#FF5400]/15 flex items-center justify-center text-[#FF5400]">
                    <Quote className="w-5 h-5 fill-current" />
                  </div>
                  <span className="font-mono text-[13px] font-bold text-[#FF5400]">
                    0{idx + 1} / 0{TESTIMONIALS.length}
                  </span>
                </div>

                {/* Big Display Quote */}
                <p className="font-display font-medium text-[20px] sm:text-[24px] md:text-[28px] leading-[1.2] tracking-[-0.02em] text-[#000000] my-auto">
                  “{t.quote}”
                </p>

                {/* Author Info */}
                <div className="flex items-center gap-4 pt-6 border-t border-[#DAD1CC]/70">
                  <div className="w-12 h-12 rounded-full bg-[#000000] text-white flex items-center justify-center font-display font-bold text-[15px] shrink-0">
                    {t.initials}
                  </div>
                  <div>
                    <div className="font-display font-bold text-[16px] sm:text-[18px] text-[#000000]">
                      {t.name}
                    </div>
                    <div className="font-sans text-[13px] sm:text-[14px] text-[#555555]">
                      {t.role}, <span className="font-bold text-[#000000]">{t.company}</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Deck Navigation Controls */}
        <div className="flex items-center justify-center gap-4 sm:gap-6">
          <button
            type="button"
            onClick={prevCard}
            aria-label="Previous review"
            className="w-12 h-12 rounded-full border border-[#DAD1CC] bg-[#FDF8F5] text-[#000000] flex items-center justify-center hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-colors cursor-pointer shadow-sm"
          >
            <ArrowLeft className="w-5 h-5 stroke-[2]" />
          </button>

          <span className="font-mono text-[13px] font-bold text-[#333333] select-none">
            0{currentIndex + 1} / 0{TESTIMONIALS.length} — CLICK TO SHUFFLE
          </span>

          <button
            type="button"
            onClick={nextCard}
            aria-label="Next review"
            className="w-12 h-12 rounded-full border border-[#DAD1CC] bg-[#FDF8F5] text-[#000000] flex items-center justify-center hover:bg-[#000000] hover:text-white hover:border-[#000000] transition-colors cursor-pointer shadow-sm"
          >
            <ArrowRight className="w-5 h-5 stroke-[2]" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Two26Testimonials;
