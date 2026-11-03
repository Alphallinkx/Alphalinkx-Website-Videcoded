import React, { useState, useEffect, useRef } from 'react';
import { STATS } from '../../content/siteContent';

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
      className="relative py-28 md:py-40 bg-[#FC6603] border-b border-black/10 overflow-hidden"
    >
      {/* Subtle depth lighting on orange background */}
      <div
        aria-hidden="true"
        className="absolute inset-0 pointer-events-none overflow-hidden"
      >
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-white/[0.08] rounded-full blur-[140px]" />
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-black/[0.12] rounded-full blur-[120px]" />
      </div>

      <div className="relative z-10 max-w-[1400px] mx-auto px-6 md:px-10">
        {/* Section Header */}
        <div className="max-w-2xl mb-20">
          <span className="font-mono text-[12px] font-bold uppercase tracking-[0.2em] text-black flex items-center gap-2">
            <span className="text-black/60">//</span>
            <span>07 VERIFIED METRICS</span>
          </span>
          <h2 className="font-display font-extrabold text-3xl sm:text-4xl md:text-5xl lg:text-[54px] text-white tracking-[-0.02em] leading-[1.1] mt-2">
            Results backed by telemetry.
          </h2>
          <p className="font-sans text-[16px] text-white/90 mt-3 leading-[1.6]">
            Every metric captured directly from production deployments and verified revenue pipelines.
          </p>
        </div>

        {/* 4 Huge Count-Up Numbers in Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-10">
          {STATS.map((stat, idx) => (
            <div
              key={idx}
              className="flex flex-col p-8 rounded-3xl bg-[#0A0A0B]/90 border border-black/15 hover:border-black/35 backdrop-blur-xl transition-all duration-300 shadow-[0_20px_45px_rgba(0,0,0,0.22)] hover:-translate-y-1 hover:shadow-[0_25px_55px_rgba(0,0,0,0.3)] group"
            >
              <div className="flex items-baseline gap-1">
                <span className="font-display font-extrabold text-5xl sm:text-6xl md:text-7xl text-white tracking-[-0.03em] tabular-nums group-hover:text-[#FC6603] transition-colors">
                  {isInView ? stat.number : '0'}
                </span>
                {stat.suffix && (
                  <span className="font-display font-extrabold text-3xl sm:text-4xl text-[#FC6603]">
                    {stat.suffix}
                  </span>
                )}
              </div>

              <h3 className="font-display font-bold text-lg sm:text-xl text-white tracking-[-0.01em] mt-4">
                {stat.label}
              </h3>

              <p className="font-sans text-[16px] text-[#A1A1AA] mt-2 leading-[1.6]">
                {stat.wittyCaption}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
