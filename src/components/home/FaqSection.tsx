import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, ArrowUpRight, Phone } from 'lucide-react';

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
      className="relative py-20 sm:py-24 md:py-28 bg-[#FC6603] overflow-hidden"
    >
      {/* Textured Orange Background Image Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <img
          src="/assets/faq-orange-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
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
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] mb-8 sm:mb-10">
              <span className="block text-[#0A0A0B]">Your questions.</span>
              <span className="block text-white">Clear answers.</span>
            </h2>

            {/* Accordion List with Bigger Layout & Text */}
            <div className="space-y-3.5 sm:space-y-4">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-[22px] transition-all duration-300 border ${
                      isOpen
                        ? 'bg-[#16171B] border-white/20 shadow-xl'
                        : 'bg-[#121316] border-white/[0.08] hover:border-white/[0.16] hover:bg-[#15161A]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full px-6 sm:px-7 py-5 sm:py-5.5 text-left flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] rounded-[22px]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-4 sm:gap-5 pr-2">
                        {/* Number */}
                        <span className="font-mono font-bold text-[14px] sm:text-[15px] md:text-[16px] text-white/75 group-hover:text-white transition-colors shrink-0">
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
                        <Plus className="w-5 h-5 sm:w-5.5 sm:h-5.5 stroke-[2.2]" />
                      </div>
                    </button>

                    {/* Animated Answer Body */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-6 sm:px-7 ${
                        isOpen
                          ? 'max-h-80 pb-6 pt-1 opacity-100'
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
              RIGHT COLUMN: Big Discovery Booking Card in Front of Headings
             ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-[28px] sm:rounded-[34px] p-8 sm:p-9 md:p-10 bg-[#121316] border border-white/[0.08] shadow-[0_25px_60px_rgba(0,0,0,0.6)] overflow-hidden">
              {/* Top ambient orange blur */}
              <div className="absolute top-0 right-0 w-56 h-56 bg-[#FC6603]/[0.09] rounded-full blur-3xl pointer-events-none" />

              {/* Card Top Row: Glowing Calendar Badge & AlphaLinkx Mark */}
              <div className="flex items-start justify-between relative z-10">
                {/* Glowing Calendar Badge */}
                <div className="w-14 h-14 sm:w-15 sm:h-15 rounded-2xl bg-[#1C1410] border border-[#FC6603]/35 flex items-center justify-center text-[#FC6603] shadow-[0_0_22px_rgba(252,102,3,0.22)] shrink-0">
                  <Calendar className="w-7 h-7 stroke-[1.8]" />
                </div>

                {/* AlphaLinkx Mark */}
                <img
                  src="/assets/al-mark-orange.png"
                  alt="AlphaLinkx"
                  className="w-16 h-16 sm:w-20 sm:h-20 object-contain opacity-95 shrink-0 -mt-1 -mr-1"
                />
              </div>

              {/* Headings */}
              <div className="relative z-10 mt-7 sm:mt-8">
                <h3 className="font-display font-extrabold text-[23px] sm:text-[26px] md:text-[28px] text-white leading-[1.18] tracking-tight">
                  Still have questions?<br />
                  Let’s talk about your goals.
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-[13.5px] sm:text-[14.5px] text-[#A1A1AA] leading-relaxed mt-3 max-w-[380px]">
                  Tell us about your business. We&apos;ll help you find the right next step.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="relative z-10 mt-8 flex items-center gap-4 sm:gap-6 flex-wrap">
                {/* Glowing Orange Pill Button: BOOK A CALL ↗ */}
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 pl-6 pr-2.5 py-2.5 rounded-full bg-[#FC6603] text-white font-mono font-bold text-[12px] sm:text-[13px] tracking-[0.12em] uppercase shadow-[0_0_24px_rgba(252,102,3,0.4)] hover:bg-[#ff5500] hover:shadow-[0_0_32px_rgba(252,102,3,0.6)] transition-all duration-300 hover:scale-[1.02]"
                >
                  <span>BOOK A CALL</span>
                  <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-black shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
                  </span>
                </Link>

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
    </section>
  );
};

export default FaqSection;
