'use client';

import React, { useState } from 'react';
import { motion } from 'motion/react';
import { Calendar, Plus, Phone } from 'lucide-react';
import { BrandButton } from '../common/BrandButton';

interface FaqItem {
  number: string;
  question: string;
  answer: string;
}

const FAQ_ITEMS: FaqItem[] = [
  {
    number: '01.',
    question: 'What services does AlphaLinkx offer?',
    answer:
      'We architect end-to-end digital growth systems: high-performance custom web development (Next.js, React, Three.js), Generative & Answer Engine Optimization (AEO/GEO for ChatGPT, Perplexity, and Google AI Overviews), Google Maps 3-Pack local dominance, and conversion-first paid acquisition.',
  },
  {
    number: '02.',
    question: 'How soon can I expect results?',
    answer:
      'Paid search campaigns and high-intent landing pages drive qualified leads within 48 to 72 hours of launch. High-performance web builds deploy in 4 to 8 weeks. Organic search authority, local rankings, and AI citations compound visibly between months 2 and 4.',
  },
  {
    number: '03.',
    question: 'Can you work with my existing website?',
    answer:
      'Yes. We can perform deep technical audits, reconstruct critical conversion funnels, and optimize Core Web Vitals on your current stack. If legacy architecture is bottlenecking growth, we execute seamless zero-downtime migrations to modern, scalable frameworks.',
  },
  {
    number: '04.',
    question: 'How is pricing determined?',
    answer:
      'We operate on transparent, milestone-locked sprint agreements and strategic retainers starting at $3,500. Pricing is calibrated strictly by project scope, technical complexity, and target market size—with zero surprise fees or hidden hourly markups.',
  },
  {
    number: '05.',
    question: 'How do we get started?',
    answer:
      'Book a free 30-minute discovery call using the card on the right or complete our brief. We analyze your current metrics, identify architectural leaks, and deliver a scope-locked execution blueprint within 24 to 48 hours.',
  },
];

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-20 bg-[#F8EEE8] border-b border-[#DAD1CC] overflow-clip"
    >
      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN: FAQs Eyebrow + Exact Heading + Bigger, Prominent FAQs
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-7 flex flex-col transform-gpu"
          >
            {/* Eyebrow: // FAQ */}
            <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#FF5400] uppercase tracking-[0.22em] mb-2.5 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="tracking-[0.24em]">FAQ</span>
            </div>

            {/* Heading: Two26 Headline */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] mb-7 sm:mb-9">
              <span className="block text-[#000000]">Your questions.</span>
              <span className="block text-[#FF5400]">Clear answers.</span>
            </h2>

            {/* Accordion List with Controlled Width for Clean Breathing Space */}
            <div className="w-full lg:max-w-[510px] xl:max-w-[610px] space-y-3 sm:space-y-3.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, y: 16 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.1 }}
                    transition={{ duration: 0.5, delay: idx * 0.06, ease: [0.16, 1, 0.3, 1] }}
                    className={`rounded-[18px] sm:rounded-[22px] transition-all duration-300 border ${isOpen
                        ? 'bg-[#FDF8F5] border-[#FF5400] shadow-sm'
                        : 'bg-[#FDF8F5] border-[#DAD1CC] hover:border-[#FF5400] hover:bg-[#F3EEEB]'
                      }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full px-5 sm:px-7 py-4 sm:py-[22px] text-left flex items-center justify-between gap-3 sm:gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FF5400] rounded-[18px] sm:rounded-[22px]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-5 pr-2">
                        {/* Number */}
                        <span className="font-mono font-bold text-[13.5px] sm:text-[15px] md:text-[16px] text-[#FF5400] group-hover:text-[#FF5400] transition-colors shrink-0">
                          {faq.number}
                        </span>

                        {/* Question Text */}
                        <span className="font-sans font-bold text-[15px] sm:text-[16.5px] md:text-[17.5px] text-[#000000] tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-[#FF5400] group-hover:text-[#FF5400] shrink-0 transition-transform duration-300 ${isOpen ? 'rotate-45' : ''
                          }`}
                      >
                        <Plus className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
                      </div>
                    </button>

                    {/* Animated Answer Body */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-5 sm:px-7 ${isOpen
                        ? 'max-h-96 pb-5 sm:pb-6 pt-1 opacity-100'
                        : 'max-h-0 pb-0 pt-0 opacity-0'
                        }`}
                    >
                      <p className="font-sans text-[14px] sm:text-[15px] text-[#333333] leading-relaxed border-t border-[#DAD1CC] pt-3.5">
                        {faq.answer}
                      </p>
                    </div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>

          {/* =========================================================================
              RIGHT COLUMN: Sticky Discovery Booking Card Aligned with "Your questions."
             ========================================================================= */}
          <motion.div
            initial={{ opacity: 0, y: 24, scale: 0.98 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true, amount: 0.15 }}
            transition={{ duration: 0.85, delay: 0.15, ease: [0.16, 1, 0.3, 1] }}
            className="lg:col-span-5 lg:pt-[28px] lg:self-stretch"
          >
            <div className="lg:sticky lg:top-7">
              <div className="relative rounded-[26px] sm:rounded-[34px] p-6 sm:p-8 xl:p-10 bg-[#000000] border border-[#000000] shadow-[0_20px_50px_rgba(0,0,0,0.18)] overflow-hidden text-white">
                {/* Top ambient orange blur */}
                <div className="absolute top-0 right-0 w-56 h-56 bg-[#FF5400]/[0.12] rounded-full blur-3xl pointer-events-none" />

                {/* Recreated Crisp White AlphaLinkx Corner Mark (Cropped at Top-Right Edge) */}
                <svg
                  aria-hidden="true"
                  viewBox="0 0 422 415"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                  className="absolute -top-1 right-0 w-[108px] h-[108px] sm:w-[126px] sm:h-[126px] xl:w-[140px] xl:h-[140px] pointer-events-none select-none z-10"
                >
                  {/* Right vertical stem ("l") */}
                  <path
                    d="M393 6C362 12 330 34 319 68V214C334 252 360 296 393 338V6Z"
                    fill="#FFFFFF"
                  />
                  {/* Upper arch + diagonal swoosh ("a") */}
                  <path
                    d="M34 212C58 148 112 105 174 105C238 105 276 154 311 230C342 296 376 340 422 368V403C416 407 402 407 383 407C348 400 318 378 289 335C266 298 248 258 233 230C204 176 168 164 132 167C96 170 62 186 34 212Z"
                    fill="#FFFFFF"
                  />
                  {/* Lower crescent bowl ("a") */}
                  <path
                    d="M141 185C106 208 95 236 95 268C95 308 128 340 168 340C198 340 226 320 245 286L276 347C250 385 208 408 158 408C82 408 24 348 24 274C24 224 62 192 141 185Z"
                    fill="#FFFFFF"
                  />
                </svg>

                {/* Card Top Row: Glowing Calendar Badge */}
                <div className="flex items-start justify-between relative z-10">
                  {/* Glowing Calendar Badge */}
                  <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1A1A1A] border border-[#FF5400]/40 flex items-center justify-center text-[#FF5400] shadow-[0_0_22px_rgba(255,84,0,0.22)] shrink-0">
                    <Calendar className="w-6 h-6 sm:w-7 sm:h-7 stroke-[1.8]" />
                  </div>
                </div>

                {/* Headings */}
                <div className="relative z-10 mt-8 sm:mt-10">
                  <h3 className="font-display font-extrabold text-[22px] sm:text-[25px] lg:text-[24px] xl:text-[27px] text-white leading-[1.18] tracking-tight">
                    Still have questions?<br />
                    Let’s talk about your goals.
                  </h3>

                  {/* Subtitle */}
                  <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#A1A1AA] leading-relaxed mt-3 max-w-[380px]">
                    Tell us about your business. We&apos;ll help you find the right next step.
                  </p>
                </div>

                {/* Action Buttons Row */}
                <div className="relative z-10 mt-7 sm:mt-8 flex items-center gap-4 sm:gap-5 xl:gap-6 flex-wrap">
                  {/* Glowing Orange Pill Button: BOOK A CALL ↗ */}
                  <BrandButton to="/contact" variant="orange">
                    BOOK A CALL
                  </BrandButton>

                  {/* Call Now with Phone Icon */}
                  <a
                    href="tel:+18005555465"
                    aria-label="Call AlphaLinkx"
                    className="inline-flex items-center gap-2.5 font-sans font-semibold text-[14px] sm:text-[15px] text-white hover:text-[#FF5400] transition-colors py-2 group"
                  >
                    <Phone className="w-4 h-4 text-white group-hover:text-[#FF5400] transition-colors stroke-[2.2]" />
                    <span>Call Now</span>
                  </a>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
