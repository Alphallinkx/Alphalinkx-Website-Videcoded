import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';
import { WhyChooseWaveBackground } from './WhyChooseWaveBackground';

interface ComparisonRow {
  feature: string;
  others: boolean;
  alpha: boolean;
}

const COMPARISON_ROWS: ComparisonRow[] = [
  { feature: 'One connected team', others: false, alpha: true },
  { feature: 'Tailored strategy', others: false, alpha: true },
  { feature: 'Conversion-first execution', others: false, alpha: true },
  { feature: 'Direct collaboration', others: false, alpha: true },
  { feature: 'Measurable outcomes', others: false, alpha: true },
];

export const WhyChooseAlphaLinkxSection: React.FC = () => {
  return (
    <section className="relative py-16 sm:py-20 md:py-24 lg:py-28 bg-[#060709] border-t border-white/[0.06] overflow-hidden">
      {/* 3D Animated Undulating Wave Particle Background */}
      <WhyChooseWaveBackground />

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header: Headings on LEFT, Orange CTA on RIGHT (aligned with site header) */}
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 md:gap-8 mb-10 sm:mb-12 lg:mb-14">
          {/* LEFT SIDE: Eyebrow, Heading (matching HowWeWork font sizes), Subtitle */}
          <div className="flex flex-col items-start text-left max-w-2xl">
            {/* Eyebrow: // WHY ALPHALINXX */}
            <div className="font-mono text-[11px] sm:text-[12px] font-semibold text-[#FC6603] uppercase tracking-[0.2em] mb-2 sm:mb-2.5 flex items-center gap-2">
              <span className="font-bold">//</span>
              <span className="text-white/80">WHY ALPHALINXX</span>
            </div>

            {/* Heading: Exact font size from HowWeWorkSection */}
            <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] text-white">
              <span className="block">From visibility</span>
              <span className="block text-[#FC6603]">To momentum.</span>
            </h2>

            {/* Supporting Text */}
            <p className="font-sans text-[15px] sm:text-[16px] text-[#A1A1AA] leading-relaxed mt-2.5 sm:mt-3">
              Strategy, design and growth execution—connected by one clear direction.
            </p>
          </div>

          {/* RIGHT SIDE: Brand CTA Button */}
          <div className="flex items-center gap-3 shrink-0 self-start md:self-center">
            <Link
              to="/contact"
              className="group relative inline-flex items-center gap-3 pl-5 pr-2 sm:pl-7 sm:pr-2.5 py-2.5 sm:py-3 rounded-full bg-[#FC6603] text-white font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.16em] shadow-[0_0_24px_rgba(252,102,3,0.35)] hover:bg-[#ff5500] hover:shadow-[0_0_32px_rgba(252,102,3,0.55)] transition-all duration-300 hover:scale-[1.03] active:scale-[0.98]"
            >
              <span>WORK WITH ALPHALINKX</span>
              <span className="w-7 h-7 sm:w-8 sm:h-8 rounded-full bg-white flex items-center justify-center text-black shrink-0 transition-transform duration-300 group-hover:rotate-45 shadow-sm">
                <svg
                  className="w-3.5 h-3.5"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2.5"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="7" y1="17" x2="17" y2="7"></line>
                  <polyline points="7 7 17 7 17 17"></polyline>
                </svg>
              </span>
            </Link>
          </div>
        </div>

        {/* Two Cards Grid - 1:2 ratio aligned with 1400px header bounds */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 lg:gap-7 xl:gap-8 items-stretch">
          {/* Left Card: Strategy with a reason */}
          <div className="lg:col-span-4 relative rounded-[24px] sm:rounded-[30px] overflow-hidden shadow-2xl border border-stone-200/30 flex flex-col justify-between min-h-[380px] sm:min-h-[420px] lg:min-h-[430px]">
            {/* Full-bleed background image with texture, peach glow, and ribbon artwork */}
            <img
              src="/assets/why-left-card-bg.jpg"
              alt="Strategy with a reason"
              className="absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none"
            />

            {/* Content overlay */}
            <div className="relative z-10 px-6 sm:px-8 lg:px-9 py-7 sm:py-8 flex flex-col justify-start h-full">
              <h3 className="font-display font-extrabold text-[28px] sm:text-[32px] lg:text-[34px] text-[#111113] leading-[1.04] tracking-[-0.03em]">
                Strategy<br />with a reason.
              </h3>

              {/* Slashed List */}
              <ul className="mt-5 sm:mt-6 space-y-2.5 sm:space-y-3 font-mono text-[13px] sm:text-[13.5px]">
                {[
                  'Business-first thinking',
                  'Tailored execution',
                  'Transparent communication',
                  'Long-term partnership',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[#18181B] font-semibold tracking-tight">
                    <span className="text-[#E45D10] font-normal mr-2 tracking-tighter">//</span>
                    <span>{item}</span>
                  </li>
                ))}
              </ul>

              {/* Action Link */}
              <div className="mt-6">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-mono font-bold tracking-[0.16em] uppercase text-[#E45D10] border-b border-[#E45D10] pb-0.5 hover:text-[#fc6603] hover:border-[#fc6603] transition-colors"
                >
                  <span>START A PROJECT</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </div>
          </div>

          {/* Right Card: Us vs. the usual */}
          <div className="lg:col-span-8 relative rounded-[24px] sm:rounded-[30px] px-5 sm:px-8 lg:px-10 py-6 sm:py-8 bg-[#111113] border border-white/[0.08] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              {/* Header inside right card */}
              <div>
                <h3 className="font-display font-extrabold text-[26px] sm:text-[32px] md:text-[34px] text-white leading-tight tracking-[-0.02em]">
                  Us vs. the usual.
                </h3>
                <p className="text-[#A1A1AA] text-[12px] sm:text-[13px] font-mono tracking-[0.02em] mt-1.5">
                  The difference is how the work stays connected.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="relative mt-5 sm:mt-6">
                {/* Glowing Highlight Box strictly framing the ALPHALINXX column */}
                <div
                  className="absolute top-0 right-0 w-[33.3333%] sm:w-[25%] bottom-0 rounded-2xl border border-[#FC6603] bg-[#FC6603]/[0.05] pointer-events-none shadow-[0_0_24px_rgba(252,102,3,0.2)]"
                  style={{ zIndex: 0 }}
                />

                {/* Table Header */}
                <div className="relative z-10 grid grid-cols-12 items-center pt-3 pb-2">
                  <div className="col-span-6 sm:col-span-7" />
                  <div className="col-span-2 text-center">
                    <span className="font-mono text-[10px] sm:text-[12px] font-medium tracking-[0.08em] sm:tracking-[0.14em] uppercase text-[#71717A]">
                      OTHERS
                    </span>
                  </div>
                  <div className="col-span-4 sm:col-span-3 text-center">
                    <span className="font-mono text-[10px] sm:text-[12px] font-bold tracking-[0.08em] sm:tracking-[0.14em] uppercase text-white">
                      ALPHALINXX
                    </span>
                  </div>
                </div>

                {/* Rows with prominent bold labels */}
                <div className="relative z-10 divide-y divide-white/[0.08] pb-1">
                  {COMPARISON_ROWS.map((row, idx) => (
                    <div
                      key={idx}
                      className="grid grid-cols-12 items-center py-3 sm:py-3.5 transition-colors hover:bg-white/[0.02]"
                    >
                      {/* Feature Title */}
                      <div className="col-span-6 sm:col-span-7 pr-2 sm:pr-4">
                        <span className="text-white font-bold text-[13.5px] sm:text-[16px] md:text-[18px] lg:text-[20px] tracking-tight leading-snug block">
                          {row.feature}
                        </span>
                      </div>

                      {/* OTHERS Column (Cross) */}
                      <div className="col-span-2 flex items-center justify-center">
                        <X
                          className="w-4 h-4 sm:w-5 sm:h-5 text-[#71717A]"
                          strokeWidth={2}
                        />
                      </div>

                      {/* ALPHALINXX Column (Orange check circle) */}
                      <div className="col-span-4 sm:col-span-3 flex items-center justify-center">
                        <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FC6603] flex items-center justify-center text-white shadow-[0_0_10px_rgba(252,102,3,0.5)]">
                          <Check className="w-3.5 h-3.5 sm:w-4 sm:h-4 stroke-[3.5] text-white" />
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAlphaLinkxSection;
