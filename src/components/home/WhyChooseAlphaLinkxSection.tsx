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
    <section className="relative py-12 sm:py-16 md:py-20 bg-[#060709] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FC6603]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1040px] mx-auto px-4 sm:px-6">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-9">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-[#18181A] border border-white/[0.1] mb-3.5 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] shadow-[0_0_8px_#FC6603]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-300">
              // WHY ALPHALINXX
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] md:text-[44px] tracking-tight leading-[1.1]">
            <span className="text-white block">Built to turn visibility</span>
            <span className="text-[#FC6603] block mt-0.5">into measurable momentum.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-2.5 text-[13px] sm:text-[14px] text-[#A1A1AA] font-sans leading-relaxed max-w-xl mx-auto">
            Strategy, design and growth execution—connected by one clear direction.
          </p>
        </div>

        {/* Two Cards Grid - exact 338px : 677px (1:2 ratio) & 428px calibrated height */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Card: Strategy with a reason */}
          <div className="lg:col-span-4 relative rounded-[26px] sm:rounded-[30px] overflow-hidden shadow-2xl border border-stone-200/30 flex flex-col justify-between h-auto lg:h-[430px]">
            {/* Full-bleed background image with texture, peach glow, and ribbon artwork */}
            <img
              src="/assets/why-left-card-bg.jpg"
              alt="Strategy with a reason"
              className="absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none"
            />

            {/* Content overlay */}
            <div className="relative z-10 p-6 sm:p-7 md:p-8 flex flex-col justify-start">
              <h3 className="font-display font-extrabold text-[28px] sm:text-[32px] md:text-[34px] text-[#111113] leading-[1.04] tracking-[-0.03em]">
                Strategy<br />with a reason.
              </h3>

              {/* Slashed List */}
              <ul className="mt-5 space-y-2.5 font-mono text-[13px] sm:text-[13.5px]">
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
              <div className="mt-5">
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
          <div className="lg:col-span-8 relative rounded-[26px] sm:rounded-[30px] p-6 sm:p-7 md:p-8 bg-[#111113] border border-white/[0.08] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] h-auto lg:h-[430px]">
            <div>
              {/* Header inside right card */}
              <div>
                <h3 className="font-display font-extrabold text-[28px] sm:text-[32px] md:text-[34px] text-white leading-tight tracking-[-0.02em]">
                  Us vs. the usual.
                </h3>
                <p className="text-[#A1A1AA] text-[12px] sm:text-[13px] font-mono tracking-[0.02em] mt-1.5">
                  The difference is how the work stays connected.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="relative mt-4 sm:mt-5">
                {/* Table Header */}
                <div className="grid grid-cols-12 items-end pb-2">
                  <div className="col-span-7" />
                  <div className="col-span-2 text-center">
                    <span className="font-mono text-[11px] sm:text-[12px] font-medium tracking-[0.14em] uppercase text-[#71717A]">
                      OTHERS
                    </span>
                  </div>
                  <div className="col-span-3 text-center">
                    <span className="font-mono text-[11px] sm:text-[12px] font-bold tracking-[0.14em] uppercase text-white">
                      ALPHALINXX
                    </span>
                  </div>
                </div>

                {/* Table Body Container with Highlight Box */}
                <div className="relative">
                  {/* Glowing Highlight Box strictly framing the ALPHALINXX column */}
                  <div
                    className="absolute top-[-28px] right-0 w-[25%] bottom-[-4px] rounded-2xl border border-[#FC6603] bg-[#FC6603]/[0.05] pointer-events-none shadow-[0_0_24px_rgba(252,102,3,0.2)]"
                    style={{ zIndex: 0 }}
                  />

                  {/* Rows with prominent bold labels */}
                  <div className="relative z-10 divide-y divide-white/[0.08]">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 items-center py-2.5 sm:py-3 transition-colors hover:bg-white/[0.02]"
                      >
                        {/* Feature Title */}
                        <div className="col-span-7 pr-2">
                          <span className="text-white font-bold text-[14px] sm:text-[16px] md:text-[17px] tracking-tight">
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
                        <div className="col-span-3 flex items-center justify-center">
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

            {/* Bottom CTA Button */}
            <div className="pt-4 sm:pt-5 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-[#FAF5EE] text-[#0A0A0B] font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.14em] uppercase hover:bg-[#FC6603] hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(252,102,3,0.4)]"
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
