import React, { useState } from 'react';
import { FAQS } from '../../content/siteContent';

export const FaqSection: React.FC = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggle = (idx: number) => {
    setOpenIndex(openIndex === idx ? null : idx);
  };

  return (
    <section
      id="faq"
      aria-label="Frequently Asked Questions"
      className="relative py-28 md:py-36 bg-[#0A0A0B] border-b border-white/[0.08]"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F]">
              // 09 QUESTIONS & ANSWERS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-[-0.02em] leading-[1.1] mt-2">
              Frequently asked questions.
            </h2>
          </div>
          <p className="font-sans text-[16px] text-[#C2C2C2] max-w-sm leading-[1.6]">
            Clear answers on AI search, local map pack rankings, deployment timelines, and engagement terms.
          </p>
        </div>

        {/* Accordion Rows */}
        <div className="max-w-4xl mx-auto divide-y divide-white/10 border-y border-white/10">
          {FAQS.map((faq, idx) => {
            const isOpen = openIndex === idx;

            return (
              <div key={idx} className="transition-colors">
                <button
                  type="button"
                  onClick={() => toggle(idx)}
                  className="w-full py-8 text-left flex items-center justify-between gap-6 group focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-[#FF5A1F]"
                  aria-expanded={isOpen}
                >
                  <span className="font-display font-bold text-xl sm:text-2xl text-white tracking-[-0.01em] group-hover:text-[#FF5A1F] transition-colors">
                    {faq.question}
                  </span>

                  {/* Rotating "+" to "x" icon */}
                  <div
                    className={`w-9 h-9 rounded-full border border-white/15 group-hover:border-[#FF5A1F] flex items-center justify-center text-white shrink-0 transition-transform duration-300 ${
                      isOpen ? 'rotate-45 border-[#FF5A1F] text-[#FF5A1F]' : ''
                    }`}
                  >
                    <span className="text-xl font-light leading-none">+</span>
                  </div>
                </button>

                {/* Animated Answer Body */}
                <div
                  className={`overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-96 pb-8 opacity-100' : 'max-h-0 pb-0 opacity-0'
                  }`}
                >
                  <p className="font-sans text-[16px] text-[#C2C2C2] leading-[1.6] max-w-3xl">
                    {faq.answer}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
