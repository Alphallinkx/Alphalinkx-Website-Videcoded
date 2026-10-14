import React from 'react';
import { CLIENT_LOGOS } from '../../content/siteContent';

export const ClientLogoMarquee: React.FC = () => {
  return (
    <section
      aria-label="Ecosystem and partner logos"
      className="relative py-14 bg-[#0A0A0B] border-b border-white/[0.06] overflow-hidden"
    >
      <div className="max-w-[1400px] mx-auto px-6 md:px-10 mb-8 flex items-center justify-between font-mono text-xs text-[#8A8A8E] uppercase tracking-widest">
        <span className="flex items-center gap-2">
          <span className="text-[#FF5A1F] font-bold">//</span>
          <span>TRUSTED BY & INFRASTRUCTURE PARTNERS</span>
        </span>
        <span className="hidden sm:inline-block text-[#8A8A8E]">
          [ CERTIFIED & INTEGRATED ]
        </span>
      </div>

      {/* Infinite loop marquee */}
      <div className="relative w-full overflow-hidden flex [mask-image:linear-gradient(to_right,transparent,black_15%,black_85%,transparent)]">
        <div className="flex gap-12 sm:gap-16 shrink-0 animate-[marquee_30s_linear_infinite] items-center">
          {CLIENT_LOGOS.concat(CLIENT_LOGOS).map((logo, idx) => (
            <div
              key={`${logo.name}-${idx}`}
              className="group flex items-center gap-3 px-6 py-3 rounded-xl bg-[#111113]/60 border border-white/5 hover:border-[#FF5A1F]/40 transition-all duration-300 cursor-pointer"
            >
              {/* Minimal SVG Monogram Icon */}
              <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:border-[#FF5A1F] group-hover:bg-[#FF5A1F]/10 transition-colors">
                <span className="font-mono text-xs font-bold text-white/70 group-hover:text-[#FF5A1F]">
                  {logo.name.slice(0, 2).toUpperCase()}
                </span>
              </div>
              <div className="flex flex-col">
                <span className="font-display font-bold text-sm tracking-tight text-[#8A8A8E] group-hover:text-white transition-colors">
                  {logo.name}
                </span>
                <span className="font-mono text-[9px] text-[#8A8A8E]/60 uppercase tracking-wider">
                  {logo.type}
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
