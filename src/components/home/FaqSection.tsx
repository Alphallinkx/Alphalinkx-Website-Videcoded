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
    question: 'What digital marketing services do you offer?',
    answer:
      'We provide full-stack growth systems: high-performance custom web development (Next.js, React), Generative & Answer Engine Optimization (AEO/GEO for ChatGPT & Perplexity), Google Maps 3-Pack local dominance, and conversion-first paid acquisition.',
  },
  {
    number: '02.',
    question: 'How long does it take to see results?',
    answer:
      'Paid search and high-intent landing pages start generating pipeline within the first 48 hours. Technical web builds deploy in 4 to 8 weeks. Organic search authority and AI engine citations compound visibly within 60 to 90 days.',
  },
  {
    number: '03.',
    question: 'What is your pricing structure?',
    answer:
      'We work on transparent, milestone-locked sprint agreements and strategic monthly retainers starting at $3,500. No hidden hourly fees or surprise markups—every scope is tied directly to verified revenue pipeline metrics.',
  },
  {
    number: '04.',
    question: 'Do you provide website design and development?',
    answer:
      'Yes. Every digital experience is engineered in-house from high-fidelity Figma prototypes to production React/Three.js code, optimized for sub-second Core Web Vitals, conversion architecture, and long-term scalability.',
  },
  {
    number: '05.',
    question: 'How do we get started and kick off our project?',
    answer:
      'Book a 30-minute discovery call below or complete our multi-step brief. We review your current metrics, run a preliminary technical audit, and deliver a scope-locked execution blueprint within 24 to 48 hours.',
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
      <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[600px] h-[350px] bg-[#FC6603]/[0.025] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative z-10 max-w-[1140px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* =========================================================================
              LEFT COLUMN: FAQs Header + Accordion Cards
             ========================================================================= */}
          <div className="lg:col-span-7 flex flex-col">
            {/* Eyebrow: { 13 } # FAQs */}
            <div className="font-mono text-[12px] sm:text-[13px] font-semibold mb-3 flex items-center gap-1.5 tracking-wider">
              <span className="text-[#FC6603]">{'{ 13 }'}</span>
              <span className="text-white/80"># FAQs</span>
            </div>

            {/* Heading: Everything You Need to Know */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl lg:text-[44px] text-white tracking-tight leading-[1.12] mb-8">
              Everything You Need<br />to Know
            </h2>

            {/* Accordion List */}
            <div className="space-y-3 sm:space-y-3.5">
              {FAQ_ITEMS.map((faq, idx) => {
                const isOpen = openIndex === idx;

                return (
                  <div
                    key={idx}
                    className={`rounded-[20px] transition-all duration-300 border ${
                      isOpen
                        ? 'bg-[#16171B] border-white/20 shadow-lg'
                        : 'bg-[#131417] border-white/[0.06] hover:border-white/[0.14] hover:bg-[#15161A]'
                    }`}
                  >
                    <button
                      type="button"
                      onClick={() => toggle(idx)}
                      className="w-full px-5 sm:px-6 py-4 sm:py-4.5 text-left flex items-center justify-between gap-4 group focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[#FC6603] rounded-[20px]"
                      aria-expanded={isOpen}
                    >
                      <div className="flex items-center gap-3 sm:gap-4 pr-2">
                        {/* Number */}
                        <span className="font-mono font-bold text-[13px] sm:text-[14px] text-white/70 group-hover:text-white transition-colors shrink-0">
                          {faq.number}
                        </span>

                        {/* Question Text */}
                        <span className="font-sans font-semibold text-[14px] sm:text-[15px] text-white/95 group-hover:text-white tracking-tight leading-snug">
                          {faq.question}
                        </span>
                      </div>

                      {/* Expand / Collapse Icon */}
                      <div
                        className={`w-7 h-7 sm:w-8 sm:h-8 rounded-full flex items-center justify-center text-white/60 group-hover:text-white shrink-0 transition-transform duration-300 ${
                          isOpen ? 'rotate-45 text-[#FC6603]' : ''
                        }`}
                      >
                        <Plus className="w-4 h-4 sm:w-5 sm:h-5 stroke-[2]" />
                      </div>
                    </button>

                    {/* Animated Answer Body */}
                    <div
                      className={`overflow-hidden transition-all duration-300 ease-in-out px-5 sm:px-6 ${
                        isOpen
                          ? 'max-h-72 pb-5 pt-1 opacity-100'
                          : 'max-h-0 pb-0 pt-0 opacity-0'
                      }`}
                    >
                      <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A1AA] leading-relaxed border-t border-white/[0.08] pt-3">
                        {faq.answer}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* =========================================================================
              RIGHT COLUMN: Booking / Free Discovery Call Card
             ========================================================================= */}
          <div className="lg:col-span-5 lg:sticky lg:top-28">
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
