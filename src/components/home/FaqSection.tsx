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
            <span className="font-mono text-xs uppercase tracking-widest text-[#FF5A1F]">
              // 09 QUESTIONS
            </span>
            <h2 className="font-display font-black text-4xl sm:text-6xl text-white tracking-tighter uppercase mt-2">
              CLARITY ON THE PROTOCOL.
            </h2>
          </div>
          <p className="font-mono text-xs text-[#8A8A8E] max-w-sm uppercase leading-relaxed">
            Straight answers on AI search, Google Maps local ranking, deployment velocity, and retainer scopes.
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
                  <span className="font-display font-bold text-xl sm:text-2xl text-white group-hover:text-[#FF5A1F] transition-colors">
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
                  <p className="text-sm sm:text-base text-[#8A8A8E] leading-relaxed max-w-3xl">
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
