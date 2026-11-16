'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MagneticHeading } from '../common/MagneticHeading';
import { Two26Button } from '../common/Two26Button';
import { Plus } from 'lucide-react';

interface FaqItem {
  q: string;
  a: string;
}

const FAQS: FaqItem[] = [
  {
    q: 'How does your sprint engagement model work?',
    a: 'We work in dedicated, scope-locked 2 to 4-week execution sprints. Each sprint has defined deliverables, fixed pricing, and daily transparency. No endless billing hours or scope creep.',
  },
  {
    q: 'How fast can we expect measurable traction?',
    a: 'High-intent search campaigns and conversion landing pages deliver pipeline activity within 72 hours of launch. Custom Next.js web applications ship in 3 to 6 weeks. Generative AI citation dominance and topical authority compound visibly over 60 to 90 days.',
  },
  {
    q: 'Can you work with our existing stack or redesign from scratch?',
    a: 'Both. If your existing architecture is fundamentally sound, we perform targeted conversion audits and funnel rebuilds. If legacy tech is bottle-necking your growth, we execute a zero-downtime migration to modern Next.js and headless infrastructure.',
  },
  {
    q: 'How does Generative Engine Optimization (GEO/AEO) work?',
    a: 'When prospective buyers ask ChatGPT, Perplexity, or Google AI for recommendations, these models query verified knowledge graphs and citation consensus. We engineer structured entity profiles, topical citation clusters, and authority anchors that ensure the AI presents your company as the definitive solution.',
  },
  {
    q: 'What is the investment required to work with AlphaLinkx?',
    a: 'Sprint agreements start at $3,500. Retainers and complete enterprise digital overhauls are calibrated by scope and market competition. We provide locked, itemized blueprints before any contract is signed.',
  },
];

export const Two26Faq: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section id="faq" className="relative w-full py-20 sm:py-28 bg-[#F8EEE8] border-b border-[#DAD1CC] select-none">
      <div className="max-w-[1360px] mx-auto px-6 sm:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
          {/* Left Column: Heading + Booking Card */}
          <div className="lg:col-span-5 flex flex-col">
            <div className="font-mono text-[11px] sm:text-[13px] font-bold text-[#FF5400] uppercase tracking-[0.24em] mb-4">
              // FAQ
            </div>

            <MagneticHeading as="h2">
              <span className="block text-[38px] sm:text-[54px] md:text-[68px] tracking-[-0.03em] leading-[0.88]">
                THINGS YOU
              </span>
              <span className="block text-[38px] sm:text-[54px] md:text-[68px] tracking-[-0.03em] leading-[0.88]">
                MIGHT ASK.
              </span>
            </MagneticHeading>

            <p className="font-sans text-[16px] text-[#333333] mt-6 max-w-md leading-relaxed mb-8 sm:mb-10">
              Clear answers to common questions about our engineering standards, turnaround timelines, and commercial results.
            </p>

            {/* Direct Booking Pill Card */}
            <div className="rounded-[24px] sm:rounded-[32px] p-6 sm:p-8 bg-[#000000] text-white border border-[#000000] shadow-lg">
              <span className="font-mono text-[11px] font-bold text-[#FF5400] uppercase tracking-[0.2em] block mb-2">
                Have a unique question?
              </span>
              <h3 className="font-display font-bold text-2xl text-white tracking-tight mb-4">
                Let’s discuss your exact goals on a discovery call.
              </h3>
              <p className="font-sans text-[14px] text-[#A1A1AA] leading-relaxed mb-6">
                30-minute direct conversation with an engineering partner. No sales fluff.
              </p>
              <Two26Button to="/contact" variant="orange">
                Schedule a Call
              </Two26Button>
            </div>
          </div>

          {/* Right Column: Accordion Items */}
          <div className="lg:col-span-7 space-y-3.5 sm:space-y-4">
            {FAQS.map((item, idx) => {
              const isOpen = openIndex === idx;

              return (
                <div
                  key={idx}
                  className={`rounded-[18px] sm:rounded-[24px] border transition-all duration-300 overflow-hidden ${
                    isOpen
                      ? 'bg-[#FDF8F5] border-[#FF5400] shadow-sm'
                      : 'bg-[#FDF8F5] border-[#DAD1CC] hover:border-[#FF5400] hover:bg-[#F3EEEB]'
                  }`}
                >
                  <button
                    type="button"
                    onClick={() => toggle(idx)}
                    className="w-full p-6 sm:p-7 text-left flex items-center justify-between gap-4 cursor-pointer focus-visible:outline-none"
                    aria-expanded={isOpen}
                  >
                    <div className="flex items-center gap-4 pr-2">
                      <span className="font-mono text-[13px] sm:text-[14px] font-bold text-[#FF5400] shrink-0">
                        0{idx + 1}.
                      </span>
                      <span className="font-display font-bold text-[17px] sm:text-[20px] text-[#000000] tracking-tight leading-snug">
                        {item.q}
                      </span>
                    </div>

                    <div
                      className={`w-8 h-8 rounded-full flex items-center justify-center shrink-0 border transition-transform duration-300 ${
                        isOpen
                          ? 'bg-[#FF5400] border-[#FF5400] text-white rotate-45'
                          : 'bg-[#F8EEE8] border-[#DAD1CC] text-[#000000]'
                      }`}
                    >
                      <Plus className="w-4 h-4 stroke-[2.2]" />
                    </div>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
                        className="overflow-hidden"
                      >
                        <div className="px-6 sm:px-7 pb-6 pt-1 border-t border-[#DAD1CC]/60">
                          <p className="font-sans text-[15px] sm:text-[16px] text-[#333333] leading-relaxed">
                            {item.a}
                          </p>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Two26Faq;
