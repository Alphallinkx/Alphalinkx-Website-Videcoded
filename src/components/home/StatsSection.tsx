import React, { useState, useEffect, useRef } from 'react';
import { TrendingUp, Gauge, BarChart3, RotateCw } from 'lucide-react';
import { STATS } from '../../content/siteContent';

const STAT_META = [
  { index: '01', icon: TrendingUp, animClass: 'anim-metric-trend' },
  { index: '02', icon: Gauge, animClass: 'anim-metric-gauge' },
  { index: '03', icon: BarChart3, animClass: 'anim-metric-bars' },
  { index: '04', icon: RotateCw, animClass: 'anim-metric-rotate' },
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
      className="relative py-[80px] bg-[#FC6603] overflow-hidden"
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

      <div className="relative z-10 max-w-[1360px] mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header: Centered & Compact spacing */}
        <div className="max-w-3xl mx-auto text-center mb-9 sm:mb-10 px-4">
          <div className="font-mono text-[11px] sm:text-[12px] font-bold uppercase tracking-[0.22em] text-[#0A0A0B] mb-2 sm:mb-2.5">
            // 07 VERIFIED METRICS
          </div>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] tracking-[-0.03em] leading-[1.08] mt-2">
            <span className="block text-[#0A0A0B]">Results backed by</span>
            <span className="block text-white">real measurement.</span>
          </h2>
          <p className="font-sans text-[15px] sm:text-[16px] text-white/90 mt-3 sm:mt-3.5 max-w-2xl mx-auto leading-relaxed">
            Every metric captured directly from production deployments and verified revenue pipelines.
          </p>
        </div>

        {/* 4 Cards Grid Matching Exact Mockup */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-5 lg:gap-5 xl:gap-6">
          {STATS.map((stat, idx) => {
            const meta = STAT_META[idx] || {
              index: `0${idx + 1}`,
              icon: TrendingUp,
              animClass: 'anim-metric-trend',
            };
            const Icon = meta.icon;

            return (
              <div
                key={idx}
                className="flex flex-col justify-between p-7 sm:p-8 rounded-[26px] bg-[#121214] border border-white/5 shadow-[0_20px_45px_rgba(0,0,0,0.35)] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_55px_rgba(0,0,0,0.45)] group min-h-[300px]"
              >
                <div>
                  {/* Top Row: Index + Line Icon */}
                  <div className="flex items-center justify-between mb-7 sm:mb-8">
                    <span className="font-sans font-bold text-white text-[16px] sm:text-[17px] tracking-wide">
                      {meta.index}
                    </span>
                    <div className="text-white/90 group-hover:text-white group-hover:scale-110 transition-all duration-300">
                      <Icon className={`w-7 h-7 sm:w-8 sm:h-8 stroke-[1.9] ${meta.animClass}`} />
                    </div>
                  </div>

                  {/* Huge Number & Orange Suffix */}
                  <div className="flex items-baseline gap-0.5 mb-4 sm:mb-5">
                    <span className="font-display font-black text-5xl sm:text-6xl lg:text-[54px] xl:text-[62px] text-white tracking-[-0.03em] leading-none tabular-nums">
                      {isInView ? stat.number : '0'}
                    </span>
                    {stat.suffix && (
                      <span className="font-display font-black text-3xl sm:text-4xl lg:text-[36px] xl:text-[42px] text-[#FC6603] leading-none ml-0.5">
                        {stat.suffix}
                      </span>
                    )}
                  </div>

                  {/* Metric Label */}
                  <h3 className="font-display font-bold text-[17px] sm:text-[18px] text-white tracking-tight leading-snug mb-2">
                    {stat.label}
                  </h3>

                  {/* Metric Description */}
                  <p className="font-sans text-[13.5px] sm:text-[14px] text-[#A1A1AA] leading-[1.5]">
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
