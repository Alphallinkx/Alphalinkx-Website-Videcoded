import React, { useState } from 'react';
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
      className="relative py-20 sm:py-24 md:py-28 bg-[#FC6603] overflow-clip"
    >
      {/* Static Textured Orange Background Image (fixed height prevents zoom/shift when accordions expand) */}
      <div
        aria-hidden="true"
        className="absolute inset-x-0 top-0 h-[1550px] sm:h-[1350px] lg:h-[1150px] min-h-full pointer-events-none select-none overflow-hidden"
      >
        <img
          src="/assets/faq-orange-bg.jpg"
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-cover object-top"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-10 xl:gap-16 items-start">
          {/* =========================================================================
              LEFT COLUMN: FAQs Eyebrow + Exact Heading + Bigger, Prominent FAQs
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Eyebrow: // FAQ */}
            <div className="font-mono text-[11px] sm:text-[12px] font-bold text-[#0A0A0B] uppercase tracking-[0.22em] mb-2.5 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="tracking-[0.24em]">FAQ</span>
            </div>

            {/* Heading: Adjusted for orange background (Black + Crisp White) */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] mb-7 sm:mb-9">
              <span className="block text-[#0A0A0B]">Your questions.</span>
              <span className="block text-white">Clear answers.</span>
            </h2>

            {/* Accordion List with Controlled Width for Clean Breathing Space */}
            <div className="w-full lg:max-w-[510px] xl:max-w-[610px] space-y-3 sm:space-y-3.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-[18px] sm:rounded-[22px] transition-all duration-300 border ${
                      isOpen
                        ? 'bg-[#16171B] border-white/20 shadow-xl'
                        : 'bg-[#121316] border-white/[0.08] hover:border-white/[0.16] hover:bg-[#15161A]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full px-5 sm:px-7 py-4 sm:py-[22px] text-left flex items-center justify-between gap-3 sm:gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] rounded-[18px] sm:rounded-[22px]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3.5 sm:gap-5 pr-2">
                        {/* Number */}
                        <span className="font-mono font-bold text-[13.5px] sm:text-[15px] md:text-[16px] text-white/75 group-hover:text-white transition-colors shrink-0">
                          {faq.number}
                        </span>

                        {/* Question Text - Bigger, bolder, prominent */}
                        <span className="font-sans font-bold text-[15px] sm:text-[16.5px] md:text-[17.5px] text-white tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-white/70 group-hover:text-white shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-[#FC6603]' : ''
                        }`}
                      >
                        <Plus className="w-5 h-5 sm:w-[22px] sm:h-[22px] stroke-[2.2]" />
                      </div>
                    </button>

                    {/* Animated Answer Body */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-5 sm:px-7 ${
                        isOpen
                          ? 'max-h-96 pb-5 sm:pb-6 pt-1 opacity-100'
                          : 'max-h-0 pb-0 pt-0 opacity-0'
                      }`}
                    >
                      <p className="font-sans text-[14px] sm:text-[15px] text-[#A1A1AA] leading-relaxed border-t border-white/[0.08] pt-3.5">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Sticky Discovery Booking Card Aligned with "Your questions."
             ========================================================================= */}
          <div className="lg:col-span-5 lg:pt-[28px] lg:self-stretch">
            <div className="lg:sticky lg:top-7">
              <div className="relative rounded-[26px] sm:rounded-[34px] p-6 sm:p-8 xl:p-10 bg-[#121316] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Top ambient orange blur */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#FC6603]/[0.08] rounded-full blur-3xl pointer-events-none" />

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
                <div className="w-12 h-12 sm:w-14 sm:h-14 rounded-2xl bg-[#1C1410] border border-[#FC6603]/35 flex items-center justify-center text-[#FC6603] shadow-[0_0_22px_rgba(252,102,3,0.22)] shrink-0">
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
                  className="inline-flex items-center gap-2.5 font-sans font-semibold text-[14px] sm:text-[15px] text-white hover:text-[#FC6603] transition-colors py-2 group"
                >
                  <Phone className="w-4 h-4 text-white group-hover:text-[#FC6603] transition-colors stroke-[2.2]" />
                  <span>Call Now</span>
                </a>
              </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
