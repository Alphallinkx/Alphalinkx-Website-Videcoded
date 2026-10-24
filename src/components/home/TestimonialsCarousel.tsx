import React, { useState } from 'react';
import { TESTIMONIALS } from '../../content/siteContent';

export const TestimonialsCarousel: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);

  const next = () => setActiveIdx((prev) => (prev + 1) % TESTIMONIALS.length);
  const prev = () => setActiveIdx((prev) => (prev - 1 + TESTIMONIALS.length) % TESTIMONIALS.length);

  return (
    <section
      aria-label="Client Endorsements and Testimonials"
      className="relative py-28 md:py-36 bg-[#0A0A0B] border-b border-white/[0.08] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 pb-8 border-b border-white/10 gap-6">
          <div>
            <span className="font-mono text-[12px] font-medium uppercase tracking-[0.18em] text-[#FF5A1F]">
              // 08 ENDORSEMENTS
            </span>
            <h2 className="font-display font-extrabold text-3xl sm:text-5xl md:text-6xl text-white tracking-[-0.02em] leading-[1.1] mt-2">
              Proof from the front lines.
            </h2>
          </div>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={prev}
              className="w-12 h-12 rounded-full border border-white/15 bg-[#111113] hover:border-[#FF5A1F] text-white flex items-center justify-center transition-colors"
              aria-label="Previous review"
            >
              ←
            </button>
            <button
              type="button"
              onClick={next}
              className="w-12 h-12 rounded-full border border-white/15 bg-[#111113] hover:border-[#FF5A1F] text-white flex items-center justify-center transition-colors"
              aria-label="Next review"
            >
              →
            </button>
          </div>
        </div>

        {/* 3D Tilt Cards Carousel */}
        <div
          className="grid grid-cols-1 md:grid-cols-3 gap-8"
          data-cursor="DRAG"
        >
          {TESTIMONIALS.map((item, idx) => {
            const isHighlighted = idx === activeIdx;

            return (
              <div
                key={item.id}
                onClick={() => setActiveIdx(idx)}
                className={`group relative p-8 sm:p-10 rounded-3xl bg-[#111113] border transition-all duration-300 flex flex-col justify-between cursor-pointer ${
                  isHighlighted
                    ? 'border-[#FF5A1F]/70 shadow-[0_0_40px_rgba(255,90,31,0.15)] scale-[1.02]'
                    : 'border-white/10 hover:border-white/20'
                }`}
              >
                {/* Verified Metric Badge */}
                <div className="flex items-center justify-between pb-6 border-b border-white/5">
                  <span className="font-mono text-[12px] text-[#FF5A1F] uppercase tracking-[0.18em] font-medium">
                    VERIFIED CLIENT
                  </span>
                  <span className="font-mono text-[12px] text-emerald-400 font-medium bg-emerald-500/10 px-2.5 py-0.5 rounded-full border border-emerald-500/20 tracking-[0.18em]">
                    {item.verifiedMetric}
                  </span>
                </div>

                {/* Quote Body */}
                <p className="font-sans text-[16px] sm:text-[17px] text-[#C2C2C2] my-8 leading-[1.6]">
                  "{item.quote}"
                </p>

                {/* Author Info */}
                <div className="pt-6 border-t border-white/5 flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gradient-to-tr from-[#FF5A1F] to-[#FF8A3D] text-black font-display font-extrabold text-sm flex items-center justify-center shrink-0">
                    {item.author.slice(0, 2).toUpperCase()}
                  </div>
                  <div>
                    <h4 className="font-display font-bold text-base text-white tracking-[-0.01em]">
                      {item.author}
                    </h4>
                    <p className="font-mono text-[12px] font-medium text-[#8A8A8E] uppercase tracking-[0.18em] mt-0.5">
                      {item.role} • {item.company}
                    </p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
