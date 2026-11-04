import React from 'react';
import { Link } from 'react-router-dom';
import { Check, X } from 'lucide-react';

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
    <section className="relative py-20 sm:py-24 md:py-28 bg-[#060709] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow accents */}
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[350px] bg-[#FC6603]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1180px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#161618] border border-white/[0.12] mb-5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] shadow-[0_0_8px_#FC6603]" />
            <span className="font-mono text-[11px] sm:text-[12px] font-semibold tracking-[0.16em] uppercase text-zinc-300">
              // WHY ALPHALINXX
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-extrabold text-[32px] sm:text-[42px] md:text-[50px] tracking-tight leading-[1.12]">
            <span className="text-white block">Built to turn visibility</span>
            <span className="text-[#FC6603] block mt-0.5">into measurable momentum.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-4 text-[14px] sm:text-[16px] text-[#A1A1AA] font-sans leading-relaxed max-w-2xl mx-auto">
            Strategy, design and growth execution—connected by one clear direction.
          </p>
        </div>

        {/* Two Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-stretch">
          {/* Left Card: Strategy with a reason */}
          <div className="lg:col-span-5 relative rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 md:p-10 bg-gradient-to-br from-[#FAF3EC] via-[#F6ECE2] to-[#EFE1D1] text-[#0A0A0B] flex flex-col justify-between overflow-hidden shadow-2xl border border-stone-200/40 min-h-[440px] sm:min-h-[480px]">
            {/* Subtle top-right warm apricot glow */}
            <div
              className="absolute -top-16 -right-16 w-64 h-64 rounded-full pointer-events-none opacity-60"
              style={{
                background: 'radial-gradient(circle, rgba(254, 207, 179, 0.7) 0%, transparent 70%)',
              }}
            />

            {/* Top Content */}
            <div className="relative z-10">
              <h3 className="font-display font-extrabold text-[28px] sm:text-[34px] md:text-[38px] text-[#111113] leading-[1.08] tracking-tight">
                Strategy<br />with a reason.
              </h3>

              {/* Slashed List */}
              <ul className="mt-6 sm:mt-7 space-y-2.5 sm:space-y-3 font-mono text-[13px] sm:text-[14px]">
                {[
                  'Business-first thinking',
                  'Tailored execution',
                  'Transparent communication',
                  'Long-term partnership',
                ].map((item, idx) => (
                  <li key={idx} className="flex items-center text-[#18181B]">
                    <span className="text-[#FC6603] font-bold mr-2 tracking-tighter">//</span>
                    <span className="font-medium tracking-tight">{item}</span>
                  </li>
                ))}
              </ul>

              {/* Action Link */}
              <div className="mt-7 sm:mt-8">
                <Link
                  to="/contact"
                  className="group inline-flex items-center gap-1.5 text-[12px] sm:text-[13px] font-mono font-bold tracking-[0.16em] uppercase text-[#FC6603] border-b border-[#FC6603] pb-0.5 hover:text-[#e05300] hover:border-[#e05300] transition-colors"
                >
                  <span>START A PROJECT</span>
                  <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                    ↗
                  </span>
                </Link>
              </div>
            </div>

            {/* Bottom Artwork: 3D Intertwined Ribbon */}
            <div className="relative z-10 mt-auto pt-6 flex justify-end items-end -mr-2 -mb-2 pointer-events-none">
              <img
                src="/assets/why-ribbon.png"
                alt="AlphaLinkx Strategy Ribbon"
                className="w-[200px] sm:w-[230px] md:w-[245px] object-contain drop-shadow-md select-none"
                loading="lazy"
              />
            </div>
          </div>

          {/* Right Card: Us vs. the usual */}
          <div className="lg:col-span-7 relative rounded-[28px] sm:rounded-[32px] p-7 sm:p-9 md:p-10 bg-[#121214] border border-white/[0.08] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
            <div>
              {/* Header inside right card */}
              <div className="mb-6 sm:mb-8">
                <h3 className="font-display font-extrabold text-[28px] sm:text-[34px] md:text-[38px] text-white leading-tight tracking-tight">
                  Us vs. the usual.
                </h3>
                <p className="text-[#A1A1AA] text-[13px] sm:text-[14px] font-sans mt-1">
                  The difference is how the work stays connected.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="relative">
                {/* Table Header */}
                <div className="grid grid-cols-12 items-end pb-3 text-right">
                  <div className="col-span-6 sm:col-span-7" />
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="font-mono text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase text-[#71717A]">
                      OTHERS
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-3 text-center">
                    {/* Aligned with the highlight column */}
                    <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-white">
                      ALPHALINXX
                    </span>
                  </div>
                </div>

                {/* Table Body Container with Highlight Column */}
                <div className="relative">
                  {/* Glowing Highlight Box for ALPHALINXX column */}
                  <div
                    className="absolute top-[-36px] right-0 w-[27%] sm:w-[25%] bottom-[-8px] rounded-2xl border border-[#FC6603] bg-[#FC6603]/[0.04] pointer-events-none shadow-[0_0_24px_rgba(252,102,3,0.18)]"
                    style={{ zIndex: 0 }}
                  />

                  {/* Rows */}
                  <div className="relative z-10 divide-y divide-white/[0.07]">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 items-center py-3.5 sm:py-4 transition-colors hover:bg-white/[0.02]"
                      >
                        {/* Feature Title */}
                        <div className="col-span-6 sm:col-span-7 pr-2">
                          <span className="text-white font-medium text-[13px] sm:text-[15px] tracking-tight">
                            {row.feature}
                          </span>
                        </div>

                        {/* OTHERS Column (Cross) */}
                        <div className="col-span-3 sm:col-span-2 flex items-center justify-center">
                          <X
                            className="w-4 h-4 text-[#52525B]"
                            strokeWidth={2}
                          />
                        </div>

                        {/* ALPHALINXX Column (Orange check circle) */}
                        <div className="col-span-3 sm:col-span-3 flex items-center justify-center">
                          <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-[#FC6603] flex items-center justify-center text-white shadow-[0_0_10px_rgba(252,102,3,0.45)]">
                            <Check className="w-3 h-3 sm:w-3.5 sm:h-3.5 stroke-[3] text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-8 sm:pt-10 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 sm:px-9 py-3 sm:py-3.5 rounded-full bg-white text-black font-mono font-bold text-[12px] sm:text-[13px] tracking-[0.14em] uppercase hover:bg-[#FC6603] hover:text-white transition-all duration-300 shadow-lg hover:shadow-[0_0_25px_rgba(252,102,3,0.4)]"
              >
                <span>WORK WITH ALPHALINXX</span>
                <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                  ↗
                </span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default WhyChooseAlphaLinkxSection;
