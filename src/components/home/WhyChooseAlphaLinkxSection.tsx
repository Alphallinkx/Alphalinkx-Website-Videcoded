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
    <section className="relative py-14 sm:py-16 md:py-20 bg-[#060709] border-t border-white/[0.06] overflow-hidden">
      {/* Background glow accent */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[300px] bg-[#FC6603]/[0.035] rounded-full blur-[140px] pointer-events-none" />

      <div className="relative max-w-[1100px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-8 sm:mb-10">
          {/* Eyebrow Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#18181A] border border-white/[0.1] mb-4 shadow-sm">
            <span className="w-1.5 h-1.5 rounded-full bg-[#FC6603] shadow-[0_0_8px_#FC6603]" />
            <span className="font-mono text-[11px] font-semibold tracking-[0.16em] uppercase text-zinc-300">
              // WHY ALPHALINXX
            </span>
          </div>

          {/* Heading */}
          <h2 className="font-display font-extrabold text-[30px] sm:text-[38px] md:text-[44px] tracking-tight leading-[1.12]">
            <span className="text-white block">Built to turn visibility</span>
            <span className="text-[#FC6603] block mt-0.5">into measurable momentum.</span>
          </h2>

          {/* Subtitle */}
          <p className="mt-3 text-[13px] sm:text-[14px] text-[#A1A1AA] font-sans leading-relaxed max-w-xl mx-auto">
            Strategy, design and growth execution—connected by one clear direction.
          </p>
        </div>

        {/* Two Cards Grid - exact proportions matching reference image (col-span-4 vs col-span-8) */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-5 sm:gap-6 items-stretch">
          {/* Left Card: Strategy with a reason (using user's high-res card background) */}
          <div className="lg:col-span-4 relative rounded-[28px] sm:rounded-[32px] overflow-hidden shadow-2xl border border-stone-200/30 flex flex-col justify-between min-h-[420px] sm:min-h-[450px]">
            {/* Full-bleed background image with subtle texture, peach glow, and ribbon */}
            <img
              src="/assets/why-left-card-bg.jpg"
              alt="Strategy with a reason"
              className="absolute inset-0 w-full h-full object-cover object-bottom select-none pointer-events-none"
            />

            {/* Content overlay */}
            <div className="relative z-10 p-7 sm:p-8 flex flex-col justify-between h-full">
              <div>
                <h3 className="font-display font-extrabold text-[26px] sm:text-[30px] text-[#111113] leading-[1.08] tracking-tight">
                  Strategy<br />with a reason.
                </h3>

                {/* Slashed List */}
                <ul className="mt-5 sm:mt-6 space-y-2 font-mono text-[12px] sm:text-[13px]">
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
                <div className="mt-5 sm:mt-6">
                  <Link
                    to="/contact"
                    className="group inline-flex items-center gap-1.5 text-[11px] sm:text-[12px] font-mono font-bold tracking-[0.16em] uppercase text-[#FC6603] border-b border-[#FC6603] pb-0.5 hover:text-[#e05300] hover:border-[#e05300] transition-colors"
                  >
                    <span>START A PROJECT</span>
                    <span className="inline-block transition-transform duration-200 group-hover:translate-x-0.5 group-hover:-translate-y-0.5">
                      ↗
                    </span>
                  </Link>
                </div>
              </div>

              {/* Bottom spacer to let the ribbon art breathe */}
              <div className="h-28 sm:h-32 pointer-events-none" />
            </div>
          </div>

          {/* Right Card: Us vs. the usual */}
          <div className="lg:col-span-8 relative rounded-[28px] sm:rounded-[32px] p-6 sm:p-8 md:p-9 bg-[#121214] border border-white/[0.08] flex flex-col justify-between shadow-[0_20px_50px_rgba(0,0,0,0.5)] min-h-[420px] sm:min-h-[450px]">
            <div>
              {/* Header inside right card */}
              <div className="mb-4 sm:mb-5">
                <h3 className="font-display font-extrabold text-[26px] sm:text-[30px] text-white leading-tight tracking-tight">
                  Us vs. the usual.
                </h3>
                <p className="text-[#A1A1AA] text-[12px] sm:text-[13px] font-sans mt-1">
                  The difference is how the work stays connected.
                </p>
              </div>

              {/* Comparison Table */}
              <div className="relative mt-2">
                {/* Table Header */}
                <div className="grid grid-cols-12 items-end pb-2.5 text-right">
                  <div className="col-span-6 sm:col-span-7" />
                  <div className="col-span-3 sm:col-span-2 text-center">
                    <span className="font-mono text-[10px] sm:text-[11px] font-medium tracking-[0.14em] uppercase text-[#71717A]">
                      OTHERS
                    </span>
                  </div>
                  <div className="col-span-3 sm:col-span-3 text-center">
                    <span className="font-mono text-[10px] sm:text-[11px] font-bold tracking-[0.14em] uppercase text-white">
                      ALPHALINXX
                    </span>
                  </div>
                </div>

                {/* Table Body Container with Highlight Column */}
                <div className="relative">
                  {/* Glowing Highlight Box strictly framing the ALPHALINXX column */}
                  <div
                    className="absolute top-[-30px] right-0 w-[25%] bottom-[-6px] rounded-2xl border border-[#FC6603] bg-[#FC6603]/[0.04] pointer-events-none shadow-[0_0_24px_rgba(252,102,3,0.18)]"
                    style={{ zIndex: 0 }}
                  />

                  {/* Rows */}
                  <div className="relative z-10 divide-y divide-white/[0.07]">
                    {COMPARISON_ROWS.map((row, idx) => (
                      <div
                        key={idx}
                        className="grid grid-cols-12 items-center py-2.5 sm:py-3 transition-colors hover:bg-white/[0.02]"
                      >
                        {/* Feature Title */}
                        <div className="col-span-6 sm:col-span-7 pr-2">
                          <span className="text-white font-medium text-[13px] sm:text-[14px] tracking-tight">
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
                          <div className="w-5 h-5 rounded-full bg-[#FC6603] flex items-center justify-center text-white shadow-[0_0_10px_rgba(252,102,3,0.45)]">
                            <Check className="w-3 h-3 stroke-[3] text-white" />
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom CTA Button */}
            <div className="pt-6 sm:pt-7 flex justify-center">
              <Link
                to="/contact"
                className="group inline-flex items-center gap-2 px-7 sm:px-8 py-2.5 sm:py-3 rounded-full bg-white text-black font-mono font-bold text-[11px] sm:text-[12px] tracking-[0.14em] uppercase hover:bg-[#FC6603] hover:text-white transition-all duration-300 shadow-md hover:shadow-[0_0_25px_rgba(252,102,3,0.4)]"
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
