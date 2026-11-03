import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Gauge, BarChart3, RotateCw } from 'lucide-react';
import { STATS } from '../../content/siteContent';

const STAT_META = [
  { index: '01', icon: TrendingUp },
  { index: '02', icon: Gauge },
  { index: '03', icon: BarChart3 },
  { index: '04', icon: RotateCw },
];

export const StatsSection: React.FC = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.25 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section
      ref={sectionRef}
      aria-label="Key Performance Statistics"
      className="relative py-24 sm:py-28 md:py-32 lg:py-36 bg-[#FC6603] overflow-hidden"
    >
      {/* Textured Orange Background Image Overlay */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none select-none overflow-hidden"
      >
        <img
          src="/assets/metrics-orange-bg.jpg"
          alt=""
          className="w-full h-full object-cover object-center"
        />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header: Centered */}
        <div className="max-w-3xl mx-auto text-center mb-16 sm:mb-20 md:mb-24 px-4">
          <div className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#0A0A0B] mb-2 sm:mb-2.5">
            // 07 VERIFIED METRICS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[56px] text-[#0A0A0B] tracking-[-0.03em] leading-[1.08] mt-2">
            <span className="block">Results backed by</span>
            <span className="block">real measurement.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-[#0A0A0B]/80 mt-3 sm:mt-4 max-w-2xl mx-auto leading-relaxed">
            Every metric captured directly from production deployments and verified revenue pipelines.
          </p>
        </div>

        {/* 4 Cards Grid Matching Exact Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 lg:gap-5 xl:gap-6">
          {STATS.map((stat, idx) => {
            const meta = STAT_META[idx] || { index: `0${idx + 1}`, icon: TrendingUp };
            const Icon = meta.icon;

            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-7 sm:p-8 rounded-[24px] bg-[#121214] border border-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_26px_55px_rgba(0,0,0,0.45)] group"
              >
                <div>
                  {/* Top Row: Index + Line Icon */}
                  <div className="flex items-center justify-between mb-8 sm:mb-9">
                    <span className="font-sans font-bold text-white text-[15px] sm:text-[16px] tracking-wide">
                      {meta.index}
                    </span>
                    <div className="text-white/80 group-hover:text-white transition-colors">
                      <Icon className="w-5 h-5 stroke-[1.8]" />
                    </div>
                  </div>

                  {/* Huge Number & Orange Suffix */}
                  <div className="flex items-baseline gap-0.5 mb-5 sm:mb-6">
                    <span className="font-display font-black text-5xl sm:text-6xl lg:text-[52px] xl:text-[64px] text-white tracking-[-0.03em] leading-none tabular-nums">
                      {isInView ? stat.number : '0'}
                    </span>
                    {stat.suffix && (
                      <span className="font-display font-black text-3xl sm:text-4xl lg:text-[34px] xl:text-[42px] text-[#FC6603] leading-none">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Metric Label */}
                  <h3 className="font-display font-bold text-[17px] sm:text-[18px] text-white tracking-tight leading-snug mb-2.5">
                    {stat.label}
                  </h3>

                  {/* Metric Description */}
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A1AA] leading-relaxed">
                    {stat.wittyCaption}
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
