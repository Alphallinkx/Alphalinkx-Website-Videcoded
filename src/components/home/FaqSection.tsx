import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Calendar, Plus, ArrowUpRight } from 'lucide-react';

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
      className="relative py-20 sm:py-24 md:py-28 bg-[#060709] border-t border-white/[0.06] overflow-hidden"
    >
      {/* Background ambient lighting */}
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[700px] h-[400px] bg-[#FC6603]/[0.03] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1240px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =========================================================================
              LEFT COLUMN: FAQs Eyebrow + Exact Heading + Bigger, Prominent FAQs
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Eyebrow: // FAQ */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2.5 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-white/80">FAQ</span>
            </div>

            {/* Heading: Exact font size from previous sections (text-3xl sm:text-4xl md:text-5xl lg:text-[54px]) */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] text-white mb-8 sm:mb-10">
              <span className="block">Your questions.</span>
              <span className="block text-[#FC6603]">Clear answers.</span>
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
              RIGHT COLUMN: Booking Card Placed at Top Right of the Section
             ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-24">
            <div className="relative rounded-[28px] sm:rounded-[32px] p-7 sm:p-8 bg-[#131417] border border-white/[0.08] shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden">
              {/* Subtle top ambient glow */}
              <div className="absolute top-0 right-0 w-44 h-44 bg-[#FC6603]/[0.08] rounded-full blur-3xl pointer-events-none" />

              {/* Card Top Row: Avatar & Brand Mark */}
              <div className="flex items-center justify-between relative z-10">
                {/* Avatar */}
                <div className="w-12 h-12 rounded-xl overflow-hidden border border-white/10 shadow-md bg-stone-900 shrink-0">
                  <img
                    src="/assets/faq-avatar.png"
                    alt="Growth Consultant"
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Brand Mark */}
                <img
                  src="/assets/al-mark-orange.png"
                  alt="AlphaLinkx"
                  className="w-9 h-9 object-contain opacity-75"
                />
              </div>

              {/* Heading */}
              <div className="relative z-10 mt-6">
                <h3 className="font-display font-extrabold text-[22px] sm:text-[25px] text-white leading-tight tracking-tight">
                  Still not sure?<br />
                  Book a free discovery call.
                </h3>

                {/* Subtitle */}
                <p className="font-sans text-[13px] sm:text-[14px] text-[#A1A1AA] leading-relaxed mt-3">
                  Learn more about how we work and how we can help you & your business take the next step.
                </p>
              </div>

              {/* Action Buttons Row */}
              <div className="relative z-10 mt-7 flex items-center gap-3.5 flex-wrap">
                {/* Schedule Now Button with Calendar Badge */}
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-3 pl-2 pr-5 py-2 rounded-full bg-white text-black font-sans font-bold text-[13px] sm:text-[14px] hover:bg-[#FC6603] hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_0_20px_rgba(252,102,3,0.35)]"
                >
                  <span className="w-8 h-8 rounded-full bg-[#FC6603] text-white flex items-center justify-center shrink-0 group-hover:bg-white group-hover:text-[#FC6603] transition-colors shadow-sm">
                    <Calendar className="w-4 h-4 stroke-[2.2]" />
                  </span>
                  <span>Schedule Now</span>
                </Link>

                {/* Call Now Link */}
                <Link
                  to="/contact"
                  className="inline-flex items-center gap-1 font-sans font-semibold text-[13px] sm:text-[14px] text-white/90 hover:text-[#FC6603] transition-colors px-3 py-2"
                >
                  <span>Call Now</span>
                  <ArrowUpRight className="w-4 h-4 opacity-70" />
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FaqSection;
